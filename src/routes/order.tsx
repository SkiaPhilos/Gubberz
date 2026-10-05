import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import {
  Check,
  Package,
  Truck,
  Home,
  Clock,
  Printer,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Search,
  Copy,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { lookupOrder } from "@/lib/catalog.functions";
import { formatPKR, imageSrc, settingsQuery } from "@/lib/shop";

export const Route = createFileRoute("/order")({
  validateSearch: z.object({ code: z.string().optional(), phone: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Track your order — Gubberz" },
      {
        name: "description",
        content: "Check real-time status and delivery updates of your Gubberz order across Pakistan.",
      },
      { property: "og:title", content: "Track your order — Gubberz" },
      { property: "og:description", content: "See where your Gubberz gadgets are." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderPage,
});

const STATUS_LABELS: Record<string, string> = {
  placed: "Order Placed",
  payment_verification: "Checking Advance Payment",
  confirmed: "Confirmed & Approved",
  packed: "Packed at Gubberz HQ",
  shipped: "Dispatched & On Its Way",
  delivered: "Delivered",
  cancelled: "Order Cancelled",
};

const METHOD_LABELS: Record<string, string> = {
  cod: "Cash on delivery",
  jazzcash: "JazzCash Mobile Wallet",
  nayapay: "NayaPay Digital Account",
  easypaisa: "Easypaisa",
  bank_transfer: "Online Bank Transfer / Raast",
  iban: "IBAN Transfer",
  raast: "Raast Instant",
};

const TIMELINE_STEPS = [
  { key: "placed", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: ShieldCheck },
  { key: "packed", label: "Packed", icon: Package },
  { key: "shipped", label: "On Its Way", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

function getStepIndex(status: string) {
  switch (status) {
    case "placed":
      return 0;
    case "payment_verification":
      return 0;
    case "confirmed":
      return 1;
    case "packed":
      return 2;
    case "shipped":
      return 3;
    case "delivered":
      return 4;
    default:
      return 0;
  }
}

function OrderPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/order" });
  const [code, setCode] = useState(search.code ?? "");
  const [phone, setPhone] = useState(search.phone ?? "");
  const enabled = !!search.code && !!search.phone;
  const { data: settings } = useQuery(settingsQuery);
  const { data: order, isFetching } = useQuery({
    queryKey: ["order", search.code, search.phone],
    queryFn: () => lookupOrder({ data: { code: search.code!, phone: search.phone! } }),
    enabled,
  });

  const activeStepIdx = order ? getStepIndex(order.status) : 0;
  const isCancelled = order?.status === "cancelled";

  const trackingUrl =
    typeof window !== "undefined" && order
      ? `${window.location.origin}/order?code=${order.code}&phone=${encodeURIComponent(order.phone)}`
      : "";

  const qrCodeUrl = trackingUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(trackingUrl)}`
    : "";

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:px-8">
      {order ? (
        <div className="space-y-8">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Order Tracking · #{order.code}
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">
                Thanks, {order.customer_name.split(" ")[0]}!
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="press flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs font-semibold hover:bg-muted"
              >
                <Printer className="h-3.5 w-3.5 text-primary" /> Print Invoice
              </button>
              <button
                type="button"
                onClick={() => navigate({ search: {} })}
                className="press rounded-full bg-surface px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                Track another
              </button>
            </div>
          </div>

          {/* REAL-TIME PROGRESS TIMELINE (Phase 4 & 5) */}
          {!isCancelled ? (
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm print:hidden">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <span className="font-mono text-xs uppercase text-muted-foreground">
                    Current Status
                  </span>
                  <p className="text-xl font-extrabold text-foreground">
                    {STATUS_LABELS[order.status] ?? order.status}
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                  {order.city} Delivery
                </span>
              </div>

              {/* Progress Steps Indicator */}
              <div className="mt-6 grid grid-cols-5 gap-2 text-center">
                {TIMELINE_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx <= activeStepIdx;
                  const isCurrent = idx === activeStepIdx;

                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                          isDone
                            ? "bg-primary text-primary-foreground shadow-sm ring-4 ring-primary/20"
                            : "bg-surface text-muted-foreground border border-border"
                        } ${isCurrent ? "scale-110 animate-pulse" : ""}`}
                      >
                        {isDone && !isCurrent ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <span
                        className={`mt-2 font-mono text-[11px] font-semibold leading-tight ${
                          isDone ? "text-foreground font-bold" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-destructive/10 border border-destructive/30 p-6 text-destructive">
              <h3 className="font-bold text-lg">Order Cancelled</h3>
              <p className="text-xs mt-1">This order was cancelled. Please contact customer support if you have questions.</p>
            </div>
          )}

          {/* ITEM BREAKDOWN WITH VARIANTS (Phase 4) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground pb-4 border-b">
              Items in Your Delivery ({order.items.reduce((acc, i) => acc + i.qty, 0)} total)
            </h3>
            <ul className="divide-y">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 py-4">
                  <img
                    src={imageSrc(item.image ?? undefined)}
                    alt={item.name}
                    className="h-16 w-16 rounded-2xl bg-surface object-contain mix-blend-multiply p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
                    {item.variant && (
                      <p className="font-mono text-xs text-primary font-semibold mt-0.5">
                        {item.variant}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                      Qty: <strong>{item.qty}</strong> × {formatPKR(item.unit_price)}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-bold text-foreground">
                    {formatPKR(item.unit_price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price Calculations */}
            <div className="space-y-2 border-t pt-4 text-xs font-mono">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPKR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-primary font-bold">
                  <span>5% Advance Payment Discount</span>
                  <span>−{formatPKR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Nationwide Express Delivery</span>
                <span>{formatPKR(order.delivery_fee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t text-base font-extrabold text-foreground">
                <span>Total Amount Due</span>
                <span className="text-primary">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* DELIVERY & PAYMENT DETAILS */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/80 bg-surface/60 p-5 space-y-2 text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-bold">
                <MapPin className="h-3.5 w-3.5 text-primary" /> Delivery Destination
              </span>
              <p className="font-bold text-sm text-foreground">{order.customer_name}</p>
              <p className="text-muted-foreground leading-relaxed">{order.address}</p>
              <p className="font-mono text-foreground font-semibold">City: {order.city}</p>
              <p className="font-mono text-muted-foreground">Phone: {order.phone}</p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-surface/60 p-5 space-y-2 text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Payment Method
              </span>
              <p className="font-bold text-sm text-foreground">
                {METHOD_LABELS[order.payment_method] ?? order.payment_method}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {order.payment_method === "cod"
                  ? `Please pay ${formatPKR(order.total)} to the courier upon delivery.`
                  : "Advance digital payment verified. Zero cash to be collected by courier."}
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="rounded-full bg-surface px-2.5 py-1 font-mono text-[10px] uppercase font-bold text-foreground">
                  Order Code: {order.code}
                </span>
              </div>
            </div>
          </div>

          {/* DEDICATED PRINTABLE INVOICE / PACKING SLIP SECTION */}
          <div className="hidden print:block border-t pt-8 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight">GUBBERZ GADGETS</h2>
                <p className="text-xs text-muted-foreground">Pakistani Premium Gadgets & Accessories</p>
              </div>
              {qrCodeUrl && (
                <div className="text-center">
                  <img src={qrCodeUrl} alt="Order QR" className="h-20 w-20 mx-auto" />
                  <span className="text-[9px] font-mono">Scan to Track</span>
                </div>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Official Packing Slip · Retain this invoice for warranty and support verification.
            </p>
          </div>

          {/* WHATSAPP ORDER SLIP & DISPATCH DESK */}
          {settings && (
            <div className="print:hidden rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-surface/80 to-surface p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-foreground">
                      WhatsApp Dispatch & Confirmation Desk
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Send your official order slip or payment screenshot to Gubberz packing team for priority dispatch.
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-500/20 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Fast Support
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                    [
                      `*GUBBERZ OFFICIAL ORDER SLIP*`,
                      `Order Code: #${order.code}`,
                      `Customer: ${order.customer_name}`,
                      `Phone: ${order.phone}`,
                      `City: ${order.city}`,
                      `Address: ${order.address}`,
                      ``,
                      `*Items Ordered:*`,
                      ...order.items.map(
                        (i) =>
                          `• ${i.qty}x ${i.name}${i.variant ? ` (${i.variant})` : ""} — ${formatPKR(i.unit_price * i.qty)}`,
                      ),
                      ``,
                      `Subtotal: ${formatPKR(order.subtotal)}`,
                      order.discount > 0 ? `Advance Discount: -${formatPKR(order.discount)}` : null,
                      `Delivery: ${formatPKR(order.delivery_fee)}`,
                      `*Total: ${formatPKR(order.total)}*`,
                      `Payment Method: ${METHOD_LABELS[order.payment_method] ?? order.payment_method}`,
                      `Status: ${STATUS_LABELS[order.status] ?? order.status}`,
                      ``,
                      `Track Online: https://gubberz.pk/order?code=${order.code}&phone=${order.phone}`,
                    ]
                      .filter(Boolean)
                      .join("\n"),
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="press flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-3.5 px-4 text-center font-bold text-xs sm:text-sm text-white shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" /> Send Order Slip to WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const text = [
                      `*GUBBERZ OFFICIAL ORDER SLIP*`,
                      `Order Code: #${order.code}`,
                      `Customer: ${order.customer_name}`,
                      `City: ${order.city}`,
                      `Total: ${formatPKR(order.total)}`,
                      `Payment: ${METHOD_LABELS[order.payment_method] ?? order.payment_method}`,
                      `Items: ${order.items.map((i) => `${i.qty}x ${i.name}`).join(", ")}`,
                      `Track: https://gubberz.pk/order?code=${order.code}&phone=${order.phone}`,
                    ].join("\n");
                    navigator.clipboard.writeText(text);
                    toast.success("Order slip copied to clipboard!");
                  }}
                  className="press flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-background/80 hover:bg-surface py-3.5 px-4 text-center font-bold text-xs sm:text-sm text-foreground shadow-xs transition-colors cursor-pointer"
                >
                  <Copy className="h-4 w-4 text-primary" /> Copy Order Slip & Tracking Link
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border border-border/80 bg-card p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
            <Search className="h-4 w-4" /> Live Pakistan Order Tracking
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            Track your order
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the order code sent to you via SMS/WhatsApp and the phone number provided at checkout.
          </p>

          {enabled && !isFetching && (
            <div className="mt-4 rounded-2xl bg-destructive/10 border border-destructive/30 p-4 text-xs text-destructive">
              We couldn't locate an order with code <strong>"{code}"</strong> and phone{" "}
              <strong>"{phone}"</strong>. Please verify your details or message us on WhatsApp.
            </div>
          )}

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: { code: code.trim(), phone: phone.trim() } });
            }}
          >
            <div>
              <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
                Order Code
              </label>
              <input
                required
                minLength={4}
                maxLength={30}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. GBZ-8F3A2B"
                className="h-12 w-full rounded-2xl bg-surface px-4 font-mono text-sm uppercase outline-none ring-primary focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
                Customer Phone Number
              </label>
              <input
                required
                minLength={10}
                maxLength={30}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0300 1234567"
                className="h-12 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isFetching}
              className="press w-full rounded-full bg-primary py-4 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md disabled:opacity-50"
            >
              {isFetching ? "Locating parcel records…" : "Find my order →"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
