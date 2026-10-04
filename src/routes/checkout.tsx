import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Truck, Tag, Gift, ShieldCheck, CreditCard, Banknote, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/use-auth";
import { placeOrder } from "@/lib/catalog.functions";
import { formatPKR, imageSrc, settingsQuery } from "@/lib/shop";

export const Route = createFileRoute("/checkout")({
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery),
  head: () => ({
    meta: [
      { title: "Secure Checkout — Gubberz" },
      {
        name: "description",
        content: "Enter your delivery details and pay by cash on delivery, JazzCash or NayaPay.",
      },
      { property: "og:title", content: "Checkout — Gubberz" },
      { property: "og:description", content: "Finish your Gubberz order in a minute." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

type Method = "cod" | "jazzcash" | "nayapay" | "easypaisa" | "bank_transfer" | "iban" | "raast";

function Checkout() {
  const cart = useCart();
  const { data: s } = useSuspenseQuery(settingsQuery);
  const navigate = useNavigate();
  const place = useServerFn(placeOrder);
  const [method, setMethod] = useState<Method>("cod");
  const [file, setFile] = useState<File | null>(null);
  const { user, signInWithGoogle, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [isGift, setIsGift] = useState(false);

  // Promo code state
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; pct: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Karachi",
    notes: "",
  });

  // Automatically prefill customer details from authenticated user session or local storage
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        email: user.email || prev.email,
        name:
          prev.name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          (user.email ? user.email.split("@")[0] : ""),
        phone:
          prev.phone ||
          user.user_metadata?.phone ||
          (typeof window !== "undefined" ? localStorage.getItem("gubberz_customer_phone") || "" : ""),
        address:
          prev.address ||
          user.user_metadata?.address ||
          (typeof window !== "undefined" ? localStorage.getItem("gubberz_customer_address") || "" : ""),
        city:
          prev.city ||
          user.user_metadata?.city ||
          (typeof window !== "undefined" ? localStorage.getItem("gubberz_customer_city") || "" : "") ||
          "Karachi",
      }));
    } else if (typeof window !== "undefined") {
      setForm((prev) => ({
        ...prev,
        phone: prev.phone || localStorage.getItem("gubberz_customer_phone") || "",
        address: prev.address || localStorage.getItem("gubberz_customer_address") || "",
        city: prev.city || localStorage.getItem("gubberz_customer_city") || "Karachi",
      }));
    }
  }, [user]);

  const FREE_SHIPPING_THRESHOLD = 15000;
  const isFreeShipping = cart.subtotal >= FREE_SHIPPING_THRESHOLD;
  const deliveryFee = isFreeShipping ? 0 : s.deliveryFee;

  // Apply promo
  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === "WELCOME10" || code === "GUBBERZ10") {
      setAppliedPromo({ code, pct: 10 });
      setPromoError("");
      toast.success(`Coupon ${code} applied: 10% discount!`);
      setPromoInput("");
    } else if (code === "TECHDROP") {
      setAppliedPromo({ code, pct: 15 });
      setPromoError("");
      toast.success(`Coupon ${code} applied: 15% discount!`);
      setPromoInput("");
    } else if (code === "GUB5") {
      setAppliedPromo({ code, pct: 5 });
      setPromoError("");
      toast.success(`Coupon ${code} applied: 5% discount!`);
      setPromoInput("");
    } else {
      setPromoError("Invalid code. Try WELCOME10 or TECHDROP");
    }
  };

  const promoDiscount = appliedPromo ? Math.round(cart.subtotal * (appliedPromo.pct / 100)) : 0;
  const subtotalAfterPromo = Math.max(0, cart.subtotal - promoDiscount);

  const advance = method !== "cod";
  const advanceDiscount = advance ? Math.round((subtotalAfterPromo * s.advanceDiscount) / 100) : 0;
  const total = subtotalAfterPromo - advanceDiscount + deliveryFee;
  const account = s.accounts.find((a) => a.id === method);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (advance && !file) {
      toast.error("Please attach a screenshot of your payment.");
      return;
    }
    setBusy(true);
    try {
      let proof: string | null = null;
      if (file) {
        if (file.size > 5 * 1024 * 1024) throw new Error("Screenshot must be under 5 MB.");
        const ext =
          file.name
            .split(".")
            .pop()
            ?.toLowerCase()
            .replace(/[^a-z0-9]/g, "") || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage
          .from("payment-proofs")
          .upload(path, file, { contentType: file.type });
        if (error) throw new Error("Could not upload your screenshot. Try again.");
        proof = path;
      }

      const notesCombined = [
        isGift ? "[GIFT ORDER] Please include gift packaging" : "",
        form.notes ? form.notes : "",
        appliedPromo ? `[PROMO: ${appliedPromo.code} -${appliedPromo.pct}%]` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const res = await place({
        data: {
          customer: {
            ...form,
            notes: notesCombined,
          },
          items: cart.items.map((i) => ({ id: i.id, qty: i.qty })),
          method,
          proof,
        },
      });
      if (!res.ok) throw new Error(res.error);

      if (typeof window !== "undefined") {
        localStorage.setItem("gubberz_customer_phone", form.phone);
        localStorage.setItem("gubberz_customer_address", form.address);
        localStorage.setItem("gubberz_customer_city", form.city);
      }
      if (user) {
        supabase.auth
          .updateUser({
            data: {
              full_name: form.name,
              phone: form.phone,
              address: form.address,
              city: form.city,
            },
          })
          .catch(() => {});
      }

      cart.clear();
      navigate({ to: "/order", search: { code: res.code, phone: form.phone } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-4xl font-extrabold">Your bag is empty.</h1>
        <p className="mt-2 text-muted-foreground">Add gadgets to your bag before checking out.</p>
        <Link
          to="/shop"
          className="press mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground"
        >
          Start Browsing
        </Link>
      </div>
    );
  }

  const field = (
    k: keyof typeof form,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <label className="block">
      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        {...props}
        value={form[k]}
        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
        className="mt-1 h-12 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2 border border-border/50"
      />
    </label>
  );

  return (
    <form
      onSubmit={submit}
      className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1fr_400px]"
    >
      <div className="space-y-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            Fast & Safe Dispatch
          </span>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight md:text-5xl">Checkout</h1>
        </div>

        {/* FREE SHIPPING BANNER */}
        <div className="rounded-2xl border bg-surface/60 p-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary shrink-0" />
            {isFreeShipping ? (
              <span className="text-success font-bold flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> You've qualified for FREE Delivery across Pakistan!
              </span>
            ) : (
              <span>
                Standard Express Courier across Pakistan: <strong>{formatPKR(s.deliveryFee)}</strong>
              </span>
            )}
          </div>
          <span className="font-mono text-muted-foreground hidden sm:block">1–3 Days</span>
        </div>

        {/* USER AUTH STATUS OR QUICK LOGIN BANNER */}
        {user ? (
          <div className="rounded-2xl border border-success/30 bg-success/5 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/20 text-success font-bold">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-foreground">
                  Signed in as {user.user_metadata?.full_name || user.email}
                </p>
                <p className="text-muted-foreground text-[11px]">
                  Your contact details and delivery preferences are prefilled automatically.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={async () => {
                await signOut();
                toast.success("Signed out of checkout");
              }}
              className="press text-muted-foreground hover:text-foreground font-mono underline text-[11px]"
            >
              Switch account
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-bold text-foreground text-sm flex items-center gap-1.5">
                <UserIcon className="h-4 w-4 text-primary" /> Sign in for fastest checkout
              </p>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                Automatically pre-fill your saved details, track delivery status, and earn perks.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => signInWithGoogle("/checkout")}
                className="press flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-bold text-xs text-ink-foreground shadow-xs hover:bg-primary"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
              <Link
                to="/auth"
                search={{ returnTo: "/checkout" }}
                className="press rounded-full bg-surface px-3.5 py-2 font-semibold text-foreground hover:bg-muted"
              >
                Email Sign In
              </Link>
            </div>
          </div>
        )}

        {/* 1. DELIVERY DETAILS */}
        <section className="space-y-4 rounded-3xl border bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>1. Delivery Information</span>
          </h2>
          {field("name", "Full Name", {
            required: true,
            minLength: 2,
            maxLength: 120,
            autoComplete: "name",
            placeholder: "e.g. Asad Siddiqui",
          })}
          <div className="grid gap-4 sm:grid-cols-2">
            {field("phone", "WhatsApp Phone Number", {
              required: true,
              minLength: 10,
              maxLength: 30,
              type: "tel",
              placeholder: "0300 1234567",
              autoComplete: "tel",
            })}
            {field("email", "Email Address (Optional)", {
              type: "email",
              maxLength: 200,
              autoComplete: "email",
              placeholder: "asad@example.com",
            })}
          </div>
          {field("address", "Complete Street Address & Area", {
            required: true,
            minLength: 5,
            maxLength: 500,
            autoComplete: "street-address",
            placeholder: "House / Flat number, Street, Sector / Area",
          })}
          <div className="grid gap-4 sm:grid-cols-2">
            {field("city", "City", {
              required: true,
              minLength: 2,
              maxLength: 80,
              autoComplete: "address-level2",
              placeholder: "Karachi / Lahore / Islamabad",
            })}

            <label className="block">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Special Delivery Notes
              </span>
              <input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g. Ring bell twice, leave with security"
                className="mt-1 h-12 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2 border border-border/50"
              />
            </label>
          </div>

          {/* GIFT OPTION */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isGift}
                onChange={(e) => setIsGift(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="flex items-center gap-1.5 text-foreground">
                <Gift className="h-4 w-4 text-primary" />
                This order is a gift (pack with care & omit price tags)
              </span>
            </label>
          </div>
        </section>

        {/* 2. PAYMENT METHOD SELECTION */}
        <section className="space-y-4 rounded-3xl border bg-card p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">2. Payment Method</h2>
            <span className="text-xs font-mono text-muted-foreground">Select one</span>
          </div>

          <div className="grid gap-3">
            {/* Cash on Delivery option */}
            <MethodCard
              active={method === "cod"}
              onClick={() => setMethod("cod")}
              icon={<Banknote className="h-5 w-5" />}
              title="Cash on Delivery (COD)"
              sub="Zero upfront payment. Pay the courier rider cash upon delivery at your doorstep."
              badge="Standard"
            />

            {/* Advance payment accounts */}
            {s.accounts.map((a) => (
              <MethodCard
                key={a.id}
                active={method === a.id}
                onClick={() => setMethod(a.id as Method)}
                icon={<CreditCard className="h-5 w-5" />}
                title={a.label}
                sub={`Pay via ${a.label} and get an instant ${s.advanceDiscount}% discount deducted!`}
                badge={`Save ${s.advanceDiscount}%`}
                highlight
              />
            ))}
          </div>

          {/* Advance payment screenshot upload */}
          {advance && account && (
            <div className="mt-4 space-y-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono uppercase text-primary font-bold">
                  Transfer Details for {account.label}
                </p>
                <span className="text-xs font-bold text-success">
                  {s.advanceDiscount}% discount included in total
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-2xl bg-background p-4 border shadow-xs">
                <div>
                  <p className="text-xs text-muted-foreground">{account.account_title}</p>
                  <p className="font-mono text-lg font-bold text-foreground">
                    {account.account_number}
                  </p>
                </div>
                <button
                  type="button"
                  className="press rounded-full bg-ink px-4 py-2 text-xs font-bold text-ink-foreground hover:bg-primary"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(account.account_number.replace(/\s/g, ""))
                      .then(() => toast.success("Account number copied!"))
                  }
                >
                  Copy
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
                  Upload Payment Screenshot / Receipt *
                </label>
                <input
                  type="file"
                  required
                  accept="image/*,application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-xs file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-semibold file:text-ink-foreground hover:file:bg-primary"
                />
              </div>

              {file && file.type.startsWith("image/") && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Payment receipt preview"
                    className="max-h-40 rounded-xl border object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {/* RIGHT COLUMN: ORDER SUMMARY & CHECKOUT BUTTON */}
      <aside className="h-fit space-y-6 rounded-3xl bg-card border p-6 lg:sticky lg:top-24 shadow-sm">
        <h2 className="text-xl font-bold">Order Summary</h2>

        {/* Item List */}
        <ul className="divide-y max-h-72 overflow-y-auto [scrollbar-width:none]">
          {cart.items.map((i) => (
            <li key={i.id} className="py-3 flex items-center gap-3">
              <img
                src={imageSrc(i.image)}
                alt=""
                className="h-12 w-12 rounded-xl object-contain bg-surface mix-blend-multiply border shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold">{i.name}</p>
                <p className="text-[11px] text-muted-foreground">Qty: {i.qty}</p>
              </div>
              <span className="font-mono text-xs font-bold shrink-0">
                {formatPKR(i.unitPrice * i.qty)}
              </span>
            </li>
          ))}
        </ul>

        {/* PROMO / COUPON CODE SECTION */}
        <div className="border-t pt-4 space-y-2">
          <form onSubmit={applyPromo} className="space-y-1">
            {appliedPromo ? (
              <div className="flex items-center justify-between rounded-xl bg-success/10 border border-success/30 px-3 py-2 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-success">
                  <Tag className="h-3.5 w-3.5" />
                  <span>{appliedPromo.code} ({appliedPromo.pct}% off)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setAppliedPromo(null)}
                  className="text-muted-foreground hover:text-destructive text-xs"
                >
                  ✕ Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value);
                    setPromoError("");
                  }}
                  placeholder="Promo code (e.g. WELCOME10)"
                  className="h-10 flex-1 rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-1 border"
                />
                <button
                  type="submit"
                  className="press rounded-xl bg-surface px-3 py-2 text-xs font-semibold hover:bg-muted border"
                >
                  Apply
                </button>
              </div>
            )}
            {promoError && <p className="text-[11px] text-destructive">{promoError}</p>}
          </form>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 border-t pt-4 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-mono font-medium">{formatPKR(cart.subtotal)}</span>
          </div>

          {promoDiscount > 0 && (
            <div className="flex justify-between text-success font-semibold">
              <span>Promo ({appliedPromo?.code})</span>
              <span className="font-mono">−{formatPKR(promoDiscount)}</span>
            </div>
          )}

          {advanceDiscount > 0 && (
            <div className="flex justify-between text-primary font-semibold">
              <span>Advance discount ({s.advanceDiscount}%)</span>
              <span className="font-mono">−{formatPKR(advanceDiscount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className="font-mono font-medium">
              {isFreeShipping ? (
                <span className="text-success font-bold">FREE</span>
              ) : (
                formatPKR(deliveryFee)
              )}
            </span>
          </div>

          <div className="flex justify-between border-t pt-3 text-base font-extrabold">
            <span>Total Payable</span>
            <span className="font-mono text-primary text-xl">{formatPKR(total)}</span>
          </div>
        </div>

        {/* PLACE ORDER BUTTON */}
        <button
          type="submit"
          disabled={busy}
          className="press w-full rounded-full bg-ink py-4 text-center font-bold text-xs uppercase tracking-wider text-ink-foreground shadow-lg transition-colors hover:bg-primary disabled:opacity-60"
        >
          {busy ? "Securing your order…" : `Confirm & Place Order · ${formatPKR(total)}`}
        </button>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
          <ShieldCheck className="h-4 w-4 text-success" />
          <span>7-day replacement · WhatsApp confirmation</span>
        </div>
      </aside>
    </form>
  );
}

function MethodCard({
  active,
  onClick,
  icon,
  title,
  sub,
  badge,
  highlight,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  sub: string;
  badge?: string;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
        active
          ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs"
          : "border-border/60 bg-surface/50 hover:bg-surface"
      }`}
    >
      <div className="mt-0.5 text-primary">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-sm text-foreground">{title}</span>
          {badge && (
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                highlight ? "bg-primary text-primary-foreground" : "bg-surface border text-muted-foreground"
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{sub}</p>
      </div>
    </button>
  );
}
