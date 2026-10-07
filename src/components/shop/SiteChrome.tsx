import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Heart, Search, X, ArrowRight, Truck, Tag, Check, User as UserIcon, LogOut, Shield } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/discovery";
import { useAuth } from "@/hooks/use-auth";
import {
  categoriesQuery,
  effectivePrice,
  formatPKR,
  imageSrc,
  productsQuery,
  settingsQuery,
} from "@/lib/shop";
import basket from "@/assets/characters/basket.png";

export { WishlistDrawer } from "./WishlistDrawer";

function MidnightSaleBanner() {
  const { data: settings } = useQuery(settingsQuery);
  const flash = settings?.flashSale;
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 15 });
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!flash?.targetDate) return;
    const updateCountdown = () => {
      const diff = new Date(flash.targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [flash?.targetDate]);

  if (!flash?.active || dismissed) return null;

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code "${code}" copied to clipboard!`);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white border-b border-amber-500/30 px-4 py-2 text-xs relative overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider animate-pulse">
            ⚡ Flash Drop
          </span>
          <span className="font-bold text-zinc-100 truncate text-xs sm:text-sm">
            {flash.bannerText || "Extra 10% Off With Code MIDNIGHT10"}
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 ml-auto sm:ml-0">
          {/* Ticking Countdown Clock */}
          <div className="flex items-center gap-1 font-mono text-[11px] bg-black/60 px-2.5 py-1 rounded-lg border border-amber-500/30 text-amber-400 font-bold">
            <span className="text-zinc-400 uppercase text-[9px] mr-1">Ends in:</span>
            <span>{pad(timeLeft.hours)}h</span>
            <span>:</span>
            <span>{pad(timeLeft.minutes)}m</span>
            <span>:</span>
            <span className="text-amber-300">{pad(timeLeft.seconds)}s</span>
          </div>

          {/* Copy Promo Code Button */}
          {flash.promoCode && (
            <button
              onClick={() => copyCode(flash.promoCode)}
              className="press flex items-center gap-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 px-2.5 py-1 font-mono font-bold text-[10px] transition-colors cursor-pointer"
              title="Click to copy coupon code"
            >
              <span>Code: {flash.promoCode}</span>
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="text-zinc-500 hover:text-zinc-300 p-0.5 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const cart = useCart();
  const wishlist = useWishlist();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { data: cats } = useQuery(categoriesQuery);
  const { data: allProducts } = useQuery(productsQuery());
  const [q, setQ] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bumping, setBumping] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Filter matching products for autocomplete preview
  const searchResults =
    q.trim().length >= 1
      ? (allProducts || [])
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q.toLowerCase()) ||
              p.short_description?.toLowerCase().includes(q.toLowerCase()) ||
              p.category?.name.toLowerCase().includes(q.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!cart.bump) return;
    setBumping(true);
    const t = setTimeout(() => setBumping(false), 450);
    return () => clearTimeout(t);
  }, [cart.bump]);

  return (
    <>
      <MidnightSaleBanner />
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 md:px-8">
        <Link
          to="/"
          className="group flex items-baseline gap-0.5 text-2xl font-extrabold tracking-tight"
        >
          gubberz
          <span className="inline-block h-2 w-2 rounded-full bg-primary transition-transform duration-300 group-hover:-translate-y-2" />
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link
            to="/shop"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeOptions={{ includeSearch: false }}
          >
            Everything
          </Link>
          {cats?.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={{ cat: c.slug }}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Search with Autocomplete Dropdown */}
        <div ref={searchContainerRef} className="relative ml-auto hidden md:block">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchFocused(false);
              navigate({ to: "/shop", search: { q: q || undefined } });
            }}
            className="relative"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search gadgets…"
              aria-label="Search products"
              className="h-10 w-56 rounded-full bg-surface pl-4 pr-9 text-sm outline-none ring-primary transition-all placeholder:text-muted-foreground focus:w-72 focus:ring-2"
            />
            {q ? (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <Search className="absolute right-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
          </form>

          {/* Autocomplete dropdown preview */}
          {searchFocused && q.trim().length >= 1 && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border bg-background p-3 shadow-2xl">
              <p className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Matches for "{q}"
              </p>
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No matching gadgets found.
                </div>
              ) : (
                <div className="divide-y">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      to="/product/$slug"
                      params={{ slug: item.slug }}
                      onClick={() => {
                        setSearchFocused(false);
                        setQ("");
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-surface rounded-xl transition-colors"
                    >
                      <img
                        src={imageSrc(item.images[0])}
                        alt=""
                        className="h-10 w-10 rounded-lg object-contain bg-surface mix-blend-multiply"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold">{item.name}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">
                          {formatPKR(effectivePrice(item))}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-success font-medium">
                        {item.stock > 0 ? "In Stock" : "Sold Out"}
                      </span>
                    </Link>
                  ))}
                  <Link
                    to="/shop"
                    search={{ q }}
                    onClick={() => {
                      setSearchFocused(false);
                      setQ("");
                    }}
                    className="flex items-center justify-between p-2 pt-3 text-xs font-bold text-primary hover:underline"
                  >
                    <span>View all matching results</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => wishlist.setOpen(true)}
          className="press relative flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground hover:bg-muted"
          aria-label={`Open wishlist, ${wishlist.count} items`}
        >
          <Heart
            className={`h-4 w-4 ${wishlist.count > 0 ? "fill-destructive text-destructive" : ""}`}
          />
          {wishlist.count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white font-mono">
              {wishlist.count}
            </span>
          )}
        </button>

        {/* User Account / Profile Button */}
        <div className="relative">
          {user ? (
            <div>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="press flex h-10 items-center gap-1.5 rounded-full bg-surface px-3 text-xs font-semibold hover:bg-muted"
                title={user.email ?? "Account"}
              >
                <UserIcon className="h-3.5 w-3.5 text-primary" />
                <span className="hidden sm:inline max-w-[90px] truncate">
                  {user.user_metadata?.full_name?.split(" ")[0] || user.email?.split("@")[0]}
                </span>
                {isAdmin && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" title="Admin privileges active" />
                )}
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border bg-background p-2 shadow-xl text-xs space-y-1">
                  <div className="px-3 py-2 border-b">
                    <p className="font-bold truncate">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground truncate">{user.email}</p>
                    {isAdmin && (
                      <span className="mt-1 inline-block rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold text-ink-foreground">
                        Admin
                      </span>
                    )}
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 font-semibold text-primary hover:bg-primary/10"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      <span>Admin Workspace</span>
                    </Link>
                  )}
                  <Link
                    to="/order"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-surface text-foreground"
                  >
                    <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Track Orders</span>
                  </Link>
                  <button
                    onClick={async () => {
                      setAccountMenuOpen(false);
                      await signOut();
                      toast.success("Signed out");
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-destructive hover:bg-destructive/10 text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="press flex h-10 items-center gap-1.5 rounded-full bg-surface px-3.5 text-xs font-semibold text-foreground hover:bg-muted"
            >
              <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Bag Button */}
        <button
          ref={(el) => {
            cart.cartIconRef.current = el;
          }}
          onClick={() => cart.setOpen(true)}
          className={`press relative flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-ink-foreground ${bumping ? "animate-cart-bump" : ""}`}
          aria-label={`Open cart, ${cart.count} items`}
        >
          Bag
          <span className="font-mono text-xs">{cart.count}</span>
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenu(true)}
          className="press text-sm font-medium md:hidden"
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-background p-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold">gubberz</span>
              <button onClick={() => setMenu(false)} className="press text-sm font-medium">
                Close
              </button>
            </div>
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                setMenu(false);
                navigate({ to: "/shop", search: { q: q || undefined } });
              }}
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search gadgets…"
                aria-label="Search products"
                className="h-12 w-full rounded-full bg-surface px-5 outline-none ring-primary focus:ring-2 text-sm"
              />
            </form>

            {/* Mobile Search Autocomplete Preview (Phase 5) */}
            {q.trim().length >= 1 && (
              <div className="mt-3 max-h-60 overflow-y-auto rounded-2xl border bg-surface/80 p-2 space-y-1">
                <p className="px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground">
                  Matching Gadgets ({searchResults.length})
                </p>
                {searchResults.length === 0 ? (
                  <p className="px-2 py-2 text-xs text-muted-foreground">No matches found.</p>
                ) : (
                  searchResults.map((p) => (
                    <Link
                      key={p.id}
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => {
                        setMenu(false);
                        setQ("");
                      }}
                      className="flex items-center gap-3 rounded-xl p-2 hover:bg-background transition-colors"
                    >
                      <img
                        src={imageSrc(p.images[0])}
                        alt=""
                        className="h-10 w-10 rounded-lg object-contain bg-background mix-blend-multiply"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-bold text-foreground">{p.name}</p>
                        <p className="font-mono text-xs font-semibold text-primary">
                          {formatPKR(effectivePrice(p))}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setMenu(false);
                  wishlist.setOpen(true);
                }}
                className="press flex flex-1 items-center justify-center gap-2 rounded-full bg-surface py-2.5 text-xs font-semibold"
              >
                <Heart className="h-4 w-4 fill-destructive text-destructive" />
                <span>Wishlist ({wishlist.count})</span>
              </button>
              <button
                onClick={() => {
                  setMenu(false);
                  cart.setOpen(true);
                }}
                className="press flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-xs font-semibold text-ink-foreground"
              >
                <span>Bag ({cart.count})</span>
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-2">
              {[{ name: "Everything", slug: undefined as string | undefined }, ...(cats ?? [])].map(
                (c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      to="/shop"
                      search={{ cat: c.slug }}
                      onClick={() => setMenu(false)}
                      className="block text-3xl font-bold tracking-tight"
                    >
                      {c.name}
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}

export function CartDrawer() {
  const cart = useCart();
  const { data: settings } = useQuery(settingsQuery);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; pct: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  const FREE_SHIPPING_THRESHOLD = 15000;
  const freeShipping = cart.subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - cart.subtotal);
  const progressPct = Math.min(100, Math.round((cart.subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    // Check against live database coupons + fallback defaults
    const availableCoupons = settings?.coupons || [];
    const matched = availableCoupons.find(
      (c: any) => c.code.toUpperCase() === code && c.active !== false,
    );

    if (matched) {
      if (matched.minOrderAmount && cart.subtotal < matched.minOrderAmount) {
        setPromoError(`Requires minimum order of ${formatPKR(matched.minOrderAmount)}`);
        return;
      }
      setAppliedPromo({ code, pct: matched.discountPercent });
      setPromoError("");
      toast.success(`Coupon ${code} applied: ${matched.discountPercent}% discount!`);
      setPromoInput("");
    } else if (code === "GUBBEROO5" || code === "GUB5") {
      setAppliedPromo({ code: "GUBBEROO5", pct: 5 });
      setPromoError("");
      toast.success(`Gubberoo VIP Coupon applied: 5% discount!`);
      setPromoInput("");
    } else if (code === "MIDNIGHT10") {
      setAppliedPromo({ code: "MIDNIGHT10", pct: 10 });
      setPromoError("");
      toast.success(`Midnight Drop Coupon applied: 10% discount!`);
      setPromoInput("");
    } else if (code === "WELCOME10" || code === "GUBBERZ10") {
      setAppliedPromo({ code: "WELCOME10", pct: 10 });
      setPromoError("");
      toast.success(`Welcome Coupon applied: 10% discount!`);
      setPromoInput("");
    } else if (code === "TECHDROP") {
      setAppliedPromo({ code: "TECHDROP", pct: 15 });
      setPromoError("");
      toast.success(`TechDrop Coupon applied: 15% discount!`);
      setPromoInput("");
    } else {
      setPromoError("Invalid coupon code. Try GUBBEROO5 or MIDNIGHT10");
    }
  };

  const promoDiscount = appliedPromo ? Math.round(cart.subtotal * (appliedPromo.pct / 100)) : 0;
  const effectiveSubtotal = Math.max(0, cart.subtotal - promoDiscount);

  return (
    <AnimatePresence>
      {cart.open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cart.setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Your bag"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h2 className="text-xl font-bold">Your bag</h2>
              <button
                onClick={() => cart.setOpen(false)}
                className="press text-sm text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            {/* FREE SHIPPING PROGRESS BAR */}
            {cart.items.length > 0 && (
              <div className="border-b bg-surface/50 px-6 py-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  {freeShipping ? (
                    <span className="flex items-center gap-1.5 text-success font-bold">
                      <Check className="h-3.5 w-3.5" /> FREE Delivery unlocked!
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      Add <strong className="font-mono text-primary">{formatPKR(amountNeeded)}</strong> more for <strong>FREE shipping</strong>
                    </span>
                  )}
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}

            {cart.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <img src={basket} alt="" width={1024} height={1024} className="w-48" />
                <p className="mt-4 text-2xl font-bold">Well… that's awkward.</p>
                <p className="mt-1 text-muted-foreground">
                  Your bag is empty. Go find something you absolutely don't need.
                </p>
                <Link
                  to="/shop"
                  onClick={() => cart.setOpen(false)}
                  className="press mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground"
                >
                  Start browsing
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {cart.items.map((i) => (
                      <motion.li
                        key={i.id}
                        layout
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-4 py-5"
                      >
                        <img
                          src={imageSrc(i.image)}
                          alt=""
                          width={1024}
                          height={1024}
                          className="h-20 w-20 rounded-2xl bg-surface object-cover mix-blend-multiply"
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <Link
                              to="/product/$slug"
                              params={{ slug: i.slug }}
                              onClick={() => cart.setOpen(false)}
                              className="truncate font-semibold hover:underline"
                            >
                              {i.name}
                            </Link>
                            <span className="font-mono text-sm">
                              {formatPKR(i.unitPrice * i.qty)}
                            </span>
                          </div>
                          {i.listPrice > i.unitPrice && (
                            <span className="font-mono text-xs text-primary">
                              Saving {formatPKR((i.listPrice - i.unitPrice) * i.qty)}
                            </span>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full bg-surface">
                              <button
                                className="press h-8 w-8"
                                onClick={() => cart.setQty(i.id, i.qty - 1)}
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-6 text-center font-mono text-sm">{i.qty}</span>
                              <button
                                className="press h-8 w-8 disabled:opacity-30"
                                disabled={i.qty >= i.stock}
                                onClick={() => cart.setQty(i.id, i.qty + 1)}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => cart.remove(i.id)}
                              className="text-xs text-muted-foreground hover:text-destructive"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* PROMO CODE & SUMMARY */}
                <div className="space-y-3 border-t px-6 py-5 bg-card/50">
                  {/* Promo Code Form */}
                  <form onSubmit={applyPromo} className="space-y-1">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between rounded-xl bg-success/10 border border-success/30 px-3 py-2 text-xs">
                        <span className="flex items-center gap-1.5 font-bold text-success">
                          <Tag className="h-3.5 w-3.5" />
                          <span>{appliedPromo.code} ({appliedPromo.pct}% off applied)</span>
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
                          placeholder="Coupon code (e.g. WELCOME10)"
                          className="h-9 flex-1 rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-1"
                        />
                        <button
                          type="submit"
                          className="press rounded-xl bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {promoError && <p className="text-[11px] text-destructive">{promoError}</p>}
                  </form>

                  {cart.savings > 0 && (
                    <div className="flex justify-between text-xs text-primary font-medium">
                      <span>Store discount</span>
                      <span className="font-mono">−{formatPKR(cart.savings)}</span>
                    </div>
                  )}

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-xs text-success font-medium">
                      <span>Promo code discount</span>
                      <span className="font-mono">−{formatPKR(promoDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-extrabold">
                    <span>Estimated total</span>
                    <span className="font-mono">{formatPKR(effectiveSubtotal)}</span>
                  </div>

                  <p className="text-[11px] text-muted-foreground">
                    Advance payment (JazzCash / NayaPay) saves an additional 5% at checkout.
                  </p>

                  <Link
                    to="/checkout"
                    onClick={() => cart.setOpen(false)}
                    className="press mt-2 block w-full rounded-full bg-primary py-3.5 text-center font-bold text-xs uppercase tracking-wider text-primary-foreground shadow-sm hover:brightness-105"
                  >
                    Proceed to Checkout
                  </Link>

                  <button
                    onClick={() => cart.setOpen(false)}
                    className="w-full py-1 text-xs text-muted-foreground hover:text-foreground text-center"
                  >
                    Keep shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function WhatsAppButton() {
  const { data } = useQuery(settingsQuery);
  const num = data?.whatsapp ?? "923000000000";
  return (
    <a
      href={`https://wa.me/${num}?text=${encodeURIComponent("Hi Gubberz! I have a question.")}`}
      target="_blank"
      rel="noreferrer"
      className="press fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg"
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-primary-foreground" />
      Ask us on WhatsApp
    </a>
  );
}

export function SiteFooter() {
  const { isAdmin } = useAuth();

  return (
    <footer className="mt-32 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="text-5xl font-extrabold tracking-tight">
            gubberz<span className="text-primary">.</span>
          </p>
          <p className="mt-3 max-w-sm text-ink-foreground/60">
            Ordinary gadgets, sold with a bit too much enthusiasm. Delivered across Pakistan.
          </p>
        </div>
        <div className="space-y-2 text-sm text-ink-foreground/70">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-foreground/40">Shop</p>
          <Link to="/shop" className="block hover:text-ink-foreground">
            Everything
          </Link>
          <Link to="/shop" search={{ sort: "new" }} className="block hover:text-ink-foreground">
            New arrivals
          </Link>
          <Link to="/order" className="block hover:text-ink-foreground">
            Track your order
          </Link>
          <Link to="/policies" className="block text-primary hover:underline font-semibold">
            Store Policies & Guarantees
          </Link>
          <Link to="/privacy" className="block hover:text-ink-foreground text-xs text-ink-foreground/60">
            Privacy Policy
          </Link>
          <Link to="/terms" className="block hover:text-ink-foreground text-xs text-ink-foreground/60">
            Terms of Service
          </Link>
        </div>
        <div className="space-y-2 text-sm text-ink-foreground/70">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-foreground/40">
            Pay how you like
          </p>
          <p>Cash on Delivery</p>
          <p>JazzCash · NayaPay — 5% off</p>
          <p>Easypaisa · Bank Transfer / Raast</p>
          {isAdmin && (
            <div className="pt-3 border-t border-ink-foreground/10">
              <Link
                to="/admin"
                className="font-mono text-xs text-primary hover:underline font-semibold flex items-center gap-1.5"
              >
                <span>⚙ Admin Workspace</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
