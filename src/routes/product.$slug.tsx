import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  Flame,
  Clock,
  Plus,
  MessageCircle,
  MapPin,
  Sparkles,
  Heart,
} from "lucide-react";
import {
  availability,
  effectivePrice,
  formatPKR,
  getProductVariants,
  productGallery,
  productQuery,
  productsQuery,
  settingsQuery,
  imageSrc,
} from "@/lib/shop";
import { flyToCart, useCart } from "@/lib/cart";
import { useWishlist, useRecentlyViewed } from "@/lib/discovery";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ context, params }) => {
    const [p] = await Promise.all([
      context.queryClient.ensureQueryData(productQuery(params.slug)),
      context.queryClient.ensureQueryData(productsQuery()),
      context.queryClient.ensureQueryData(settingsQuery),
    ]);
    if (!p) throw notFound();
    return { name: p.name, desc: p.short_description ?? "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Gubberz" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} — Gubberz`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.desc },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.desc },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
});

type Review = {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
};

const INITIAL_REVIEWS: Record<string, Review[]> = {
  default: [
    {
      id: "r1",
      author: "Bilal Khan",
      city: "Karachi",
      rating: 5,
      date: "3 days ago",
      title: "Phenomenal build quality",
      comment: "Honestly shocked at how good this feels. Zero plastic creak and sound is punchy and detailed. Arrived next day.",
      verified: true,
    },
    {
      id: "r2",
      author: "Hamza Riaz",
      city: "Lahore",
      rating: 5,
      date: "1 week ago",
      title: "Worth every rupee",
      comment: "Saved 5% paying via JazzCash in advance. Received tracking number on WhatsApp in under an hour. 10/10 service.",
      verified: true,
    },
    {
      id: "r3",
      author: "Ayesha Malik",
      city: "Islamabad",
      rating: 5,
      date: "2 weeks ago",
      title: "Super aesthetic and reliable",
      comment: "Looks straight out of an editorial design catalogue. Battery life has easily lasted me three straight workdays.",
      verified: true,
    },
    {
      id: "r4",
      author: "Daniyal Shah",
      city: "Rawalpindi",
      rating: 4,
      date: "3 weeks ago",
      title: "Great everyday gear",
      comment: "Clean minimalist packaging with all required cables. Pairing with my laptop and phone was instant.",
      verified: true,
    },
  ],
};

const CITIES_DELIVERY = [
  { city: "Karachi", days: "1 business day", note: "Express dispatch (by 4 PM)" },
  { city: "Lahore", days: "1–2 business days", note: "Express courier" },
  { city: "Islamabad / Rawalpindi", days: "2 business days", note: "Standard courier" },
  { city: "Faisalabad", days: "2–3 business days", note: "Standard courier" },
  { city: "Multan", days: "2–3 business days", note: "Standard courier" },
  { city: "Peshawar", days: "2–4 business days", note: "Standard courier" },
  { city: "Quetta", days: "3–4 business days", note: "Standard courier" },
  { city: "Other Pakistan Cities", days: "3–5 business days", note: "Nationwide tracking" },
];

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(productQuery(slug));
  const { data: allProducts } = useSuspenseQuery(productsQuery());
  const { data: settings } = useSuspenseQuery(settingsQuery);
  const cart = useCart();
  const wishlist = useWishlist();
  const { items: recentlyViewed, recordView } = useRecentlyViewed();

  const imgRef = useRef<HTMLImageElement>(null);
  const buyBoxRef = useRef<HTMLDivElement>(null);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS[slug] ?? INITIAL_REVIEWS.default);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", city: "Karachi", rating: 5, title: "", comment: "" });

  // Bundle state
  const [bundleChecked, setBundleChecked] = useState(true);

  const initialVariant = p ? getProductVariants(p) : null;
  const [selectedColor, setSelectedColor] = useState(initialVariant?.colors[0]?.name ?? "Standard");
  const [selectedSize, setSelectedSize] = useState(initialVariant?.sizes[0]?.name ?? "Standard");

  useEffect(() => {
    if (p) recordView(p);
  }, [p]);

  // Sticky bottom bar trigger on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!buyBoxRef.current) return;
      const rect = buyBoxRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!p) return null;

  const isWishlisted = wishlist.has(p.id);

  const toggleWishlist = () => {
    wishlist.toggle({
      id: p.id,
      slug: p.slug,
      name: p.name,
      image: gallery[0]?.src ?? p.images[0] ?? "",
      unitPrice: totalPrice,
      listPrice: p.price + extraPrice,
      stock: p.stock,
    });
    if (!isWishlisted) toast.success(`${p.name} saved to wishlist`);
    else toast("Removed from wishlist");
  };

  const gallery = productGallery(p);
  const variantInfo = getProductVariants(p);

  const currentSizeObj = variantInfo.sizes.find((s) => s.name === selectedSize);
  const extraPrice = currentSizeObj?.extraPrice ?? 0;

  const basePrice = effectivePrice(p);
  const totalPrice = basePrice + extraPrice;
  const onSale = p.sale_price != null && p.sale_price < p.price;
  const avail = availability(p);
  const advance = Math.round(totalPrice * (1 - settings.advanceDiscount / 100));

  // Determine bundle companion product
  const companion = allProducts.find(
    (item) =>
      item.id !== p.id &&
      (p.slug.includes("headphone") || p.slug.includes("buds")
        ? item.slug.includes("cable") || item.slug.includes("power")
        : p.slug.includes("keyboard")
          ? item.slug.includes("mouse")
          : item.slug.includes("cable") || item.slug.includes("charger")),
  ) ?? allProducts.find((item) => item.id !== p.id);

  const companionPrice = companion ? effectivePrice(companion) : 0;
  const bundleOriginalTotal = totalPrice + companionPrice;
  const bundleDiscountedTotal = Math.round(bundleOriginalTotal * 0.9); // 10% bundle discount

  // Related products
  const relatedProducts = allProducts.filter((item) => item.id !== p.id).slice(0, 4);

  const add = () => {
    const variantLabel = `${selectedColor} / ${selectedSize}`;
    const ok = cart.add(
      {
        id: p.id,
        slug: p.slug,
        name: `${p.name} (${variantLabel})`,
        image: gallery[activeImgIndex]?.src ?? p.images[0] ?? "",
        unitPrice: totalPrice,
        listPrice: p.price + extraPrice,
        stock: p.stock,
        variant: variantLabel,
      },
      qty,
    );
    if (ok) {
      flyToCart(imgRef.current, cart.cartIconRef.current);
      toast.success(`${p.name} added to bag`, {
        description: variantLabel,
        action: { label: "View bag", onClick: () => cart.setOpen(true) },
      });
    } else {
      toast("Not enough in stock", {
        description: `We only have ${p.stock}, and some may already be in your bag.`,
      });
    }
  };

  const addBundle = () => {
    if (!companion) return;
    const ok1 = cart.add(
      {
        id: p.id,
        slug: p.slug,
        name: `${p.name} (${selectedColor})`,
        image: gallery[0]?.src ?? p.images[0] ?? "",
        unitPrice: Math.round(totalPrice * 0.9),
        listPrice: p.price,
        stock: p.stock,
        variant: `${selectedColor} · Bundle 10% Off`,
      },
      1,
    );
    const ok2 = cart.add(
      {
        id: companion.id,
        slug: companion.slug,
        name: `${companion.name} (Bundle Companion)`,
        image: companion.images[0] ?? "",
        unitPrice: Math.round(companionPrice * 0.9),
        listPrice: companion.price,
        stock: companion.stock,
        variant: "Bundle Companion 10% Off",
      },
      1,
    );
    if (ok1 && ok2) {
      toast.success("Bundle added to bag with 10% off!", {
        action: { label: "View bag", onClick: () => cart.setOpen(true) },
      });
    }
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.title || !newReview.comment) {
      toast.error("Please fill in all review fields");
      return;
    }
    const created: Review = {
      id: "rev_" + Date.now(),
      author: newReview.name,
      city: newReview.city,
      rating: newReview.rating,
      date: "Just now",
      title: newReview.title,
      comment: newReview.comment,
      verified: true,
    };
    setReviews([created, ...reviews]);
    setReviewModalOpen(false);
    toast.success("Thank you for your verified review!");
    setNewReview({ name: "", city: "Karachi", rating: 5, title: "", comment: "" });
  };

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const selectedDelivery =
    CITIES_DELIVERY.find((c) => c.city === selectedCity) ?? CITIES_DELIVERY[0];

  return (
    <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8 pb-32">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        {p.category && (
          <>
            <span>/</span>
            <Link to="/shop" search={{ cat: p.category.slug }} className="hover:text-foreground">
              {p.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{p.name}</span>
      </nav>

      {/* MAIN PRODUCT HERO GRID */}
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* LEFT COLUMN: MULTI-IMAGE GALLERY WITH ZOOM */}
        <div className="space-y-4 lg:sticky lg:top-24 h-fit">
          <div
            onClick={() => setLightboxOpen(true)}
            className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-[2.5rem] border border-border/40 bg-surface/85 p-8 shadow-xs transition-all hover:border-primary/40 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImgIndex}
                ref={imgRef}
                src={gallery[activeImgIndex]?.src}
                alt={`${p.name} - ${gallery[activeImgIndex]?.label}`}
                width={1024}
                height={1024}
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                initial={{ opacity: 0.4, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>

            {onSale && (
              <span className="absolute left-6 top-6 rounded-full bg-primary px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                −{Math.round((1 - p.sale_price! / p.price) * 100)}%
              </span>
            )}

            <span className="absolute bottom-5 right-5 rounded-full bg-background/90 px-3 py-1 font-mono text-[11px] font-semibold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              Click to enlarge ↗
            </span>
          </div>

          {/* Multiple Image Thumbnails Screen */}
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImgIndex(idx)}
                className={`press relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-surface p-2 transition-all ${
                  activeImgIndex === idx
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border/60 opacity-70 hover:opacity-100 hover:border-foreground/30"
                }`}
                aria-label={`View photo ${idx + 1}: ${img.label}`}
              >
                <img
                  src={img.src}
                  alt=""
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: BUY BOX & PDP MERCHANDISING */}
        <div className="space-y-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {p.brand && (
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {p.brand}
                </span>
              )}
              {/* STAR RATING BADGE (Feature 1) */}
              <a
                href="#reviews"
                className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted transition-colors"
              >
                <div className="flex text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <span className="font-bold">{avgRating}</span>
                <span className="text-muted-foreground">({reviews.length} reviews)</span>
              </a>
            </div>

            <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {p.name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
              {p.short_description}
            </p>
          </div>

          {/* STOCK URGENCY & SCARCITY INDICATOR (Feature 2) */}
          <div className="flex items-center gap-2 rounded-2xl bg-primary/10 border border-primary/20 px-4 py-2.5 text-xs text-foreground font-medium">
            <Flame className="h-4 w-4 text-primary animate-pulse shrink-0" />
            <span>
              High demand: <strong>5 orders placed in the last 24 hours</strong> across Pakistan.
            </span>
          </div>

          {/* Price & Advance Discount */}
          <div className="rounded-3xl border border-border/50 bg-card p-6">
            <div className="flex items-baseline gap-3">
              <span className={`font-mono text-3xl font-extrabold ${onSale ? "text-primary" : ""}`}>
                {formatPKR(totalPrice)}
              </span>
              {onSale && (
                <span className="font-mono text-muted-foreground line-through text-lg">
                  {formatPKR(p.price + extraPrice)}
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Or</span>
              <span className="font-mono font-bold text-foreground">{formatPKR(advance)}</span>
              <span>with {settings.advanceDiscount}% advance payment discount (JazzCash/NayaPay).</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                  avail.tone === "ok"
                    ? "text-success"
                    : avail.tone === "low"
                      ? "text-primary"
                      : "text-destructive"
                }`}
              >
                ● {avail.label}
              </span>
              <span className="text-xs text-muted-foreground">· Warehouse verified stock</span>
            </div>
          </div>

          {/* CUSTOMIZABLE: COLOR SELECTION */}
          {variantInfo.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Select Colour: <strong className="text-foreground">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {variantInfo.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`press group flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                      selectedColor === c.name
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/20"
                        : "border-border/60 bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/15 shadow-xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                    {selectedColor === c.name && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOMIZABLE: SIZES / EDITIONS / SPECS OPTIONS */}
          {variantInfo.sizes.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Configuration / Edition
              </span>
              <div className="grid gap-2 sm:grid-cols-2">
                {variantInfo.sizes.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedSize(s.name)}
                    className={`press flex items-center justify-between rounded-2xl border p-3.5 text-left text-xs font-semibold transition-all ${
                      selectedSize === s.name
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/20"
                        : "border-border/60 bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="truncate">{s.name}</span>
                    {s.extraPrice && s.extraPrice > 0 ? (
                      <span className="font-mono text-primary font-bold ml-2">
                        +{formatPKR(s.extraPrice)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/80 font-normal ml-2">Included</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BUY BOX & ADD TO BAG */}
          <div ref={buyBoxRef} className="space-y-4">
            {avail.tone !== "out" ? (
              <div className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-12 items-center justify-between rounded-full bg-surface px-3">
                    <button
                      className="press h-9 w-9 rounded-full text-base font-bold hover:bg-muted"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm">{qty}</span>
                    <button
                      className="press h-9 w-9 rounded-full text-base font-bold disabled:opacity-30 hover:bg-muted"
                      disabled={qty >= p.stock}
                      onClick={() => setQty((q) => Math.min(p.stock, q + 1))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={add}
                    className="press flex-1 rounded-full bg-ink py-4 text-center font-semibold text-ink-foreground shadow-md transition-colors hover:bg-primary"
                  >
                    Add to bag · {formatPKR(totalPrice * qty)}
                  </button>

                  <button
                    type="button"
                    onClick={toggleWishlist}
                    className={`press flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isWishlisted
                        ? "border-destructive/30 bg-destructive/10 text-destructive ring-2 ring-destructive/20"
                        : "border-border/60 bg-surface text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-destructive" : ""}`} />
                  </button>
                </div>

                {/* Direct WhatsApp Product Inquiry Button */}
                <a
                  href={`https://wa.me/${(settings?.whatsappNumber ?? "923000000000").replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hi Gubberz! I'm looking at ${p.name} (${selectedColor} / ${selectedSize}) for ${formatPKR(totalPrice)}. Is this in stock for express dispatch to ${selectedCity}?`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="press flex w-full items-center justify-center gap-2 rounded-full border border-success/30 bg-success/10 py-3 text-xs font-bold text-success hover:bg-success hover:text-white transition-all shadow-xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Ask about this gadget on WhatsApp</span>
                </a>
              </div>
            ) : (
              <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive font-medium">
                This gadget is currently sold out. Message us on WhatsApp to reserve the next batch.
              </div>
            )}
          </div>

          {/* ESTIMATED DELIVERY DATE CALCULATOR (Feature 3) */}
          <div className="rounded-3xl border bg-surface/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Estimate Delivery to your city</span>
              </div>
              <span className="flex items-center gap-1 text-xs text-success font-medium">
                <Clock className="h-3.5 w-3.5" /> Order in next 3h
              </span>
            </div>

            <div className="flex gap-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-10 flex-1 rounded-xl bg-background border px-3 text-xs font-medium outline-none ring-primary focus:ring-2"
              >
                {CITIES_DELIVERY.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city} ({c.days})
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-xl bg-background/80 p-3 text-xs flex items-center justify-between">
              <span className="text-muted-foreground">Expected arrival:</span>
              <span className="font-bold text-foreground">
                {selectedDelivery.days} · {selectedDelivery.note}
              </span>
            </div>
          </div>

          {/* VALUE PROPOSITIONS & TRUST SIGNALS */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 rounded-2xl bg-surface/70 p-3 text-xs">
              <Truck className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-bold">Fast Delivery</p>
                <p className="text-muted-foreground">Across Pakistan</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-surface/70 p-3 text-xs">
              <ShieldCheck className="h-5 w-5 text-success shrink-0" />
              <div>
                <p className="font-bold">Genuine Guaranteed</p>
                <p className="text-muted-foreground">Original quality test</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-surface/70 p-3 text-xs">
              <RefreshCw className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="font-bold">7-Day Replacement</p>
                <p className="text-muted-foreground">Hassle-free exchange</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-surface/70 p-3 text-xs">
              <Check className="h-5 w-5 text-foreground shrink-0" />
              <div>
                <p className="font-bold">Cash on Delivery</p>
                <p className="text-muted-foreground">Pay at your doorstep</p>
              </div>
            </div>
          </div>

          {/* Long Description */}
          <div className="border-t pt-8">
            <h3 className="font-bold text-lg">About this gadget</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
          </div>

          {/* Features Bullets */}
          {p.features.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground font-mono">
                Key Highlights
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm font-medium">
                    <span className="text-primary mt-0.5">✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What's in the Box */}
          {variantInfo.inBox.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground font-mono">
                What's in the Box
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {variantInfo.inBox.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical Specifications */}
          {Object.keys(p.specs).length > 0 && (
            <details className="group border-t pt-5" open>
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-base">
                <span>Technical Specifications</span>
                <span className="font-mono text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <dl className="mt-4 divide-y rounded-2xl bg-surface/50 p-4 text-sm">
                {Object.entries(p.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-mono font-medium">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </details>
          )}

          {/* UNIVERSAL COMPATIBILITY CARD */}
          <div className="border-t pt-6 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Universal System Compatibility
            </span>
            <div className="flex flex-wrap gap-2">
              {["iOS / iPhone", "Android", "macOS", "Windows 10/11", "iPadOS", "USB-C PD"].map(
                (os) => (
                  <span
                    key={os}
                    className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-foreground border border-border/60"
                  >
                    <Check className="h-3 w-3 text-success" />
                    <span>{os}</span>
                  </span>
                ),
              )}
            </div>
          </div>

          {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
          <div className="border-t pt-6 space-y-3">
            <h3 className="font-bold text-base">Frequently Asked Questions</h3>
            <div className="divide-y rounded-2xl bg-surface/40 border">
              <details className="group p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold">
                  <span>How does Cash on Delivery (COD) work?</span>
                  <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  No advance payment needed. When the courier rider arrives at your doorstep, you
                  simply pay cash. You will receive an automated WhatsApp dispatch update with live
                  tracking.
                </p>
              </details>

              <details className="group p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold">
                  <span>What is the 7-day replacement guarantee?</span>
                  <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  If your gadget experiences any defect, charging failure, or shipping damage, we
                  arrange a free reverse pickup and replace your item immediately at zero cost.
                </p>
              </details>

              <details className="group p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold">
                  <span>How do I get the {settings.advanceDiscount}% advance discount?</span>
                  <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Select "JazzCash / NayaPay / Bank Transfer" at checkout to instantly save{" "}
                  {settings.advanceDiscount}% on your order. Instructions and account details are
                  displayed directly in the order confirmation screen.
                </p>
              </details>

              <details className="group p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold">
                  <span>Is this 100% genuine and original?</span>
                  <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Yes, every unit is sourced directly through verified distribution partners and
                  individually tested before packing in Karachi.
                </p>
              </details>
            </div>

            <div className="pt-1">
              <Link
                to="/policies"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>Read our full Store Policies & Guarantees</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FREQUENTLY BOUGHT TOGETHER / CROSS-SELL BUNDLE (Feature 4) */}
      {companion && (
        <section className="mt-20 rounded-[2.5rem] border border-border/50 bg-card p-6 md:p-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
            <Sparkles className="h-4 w-4" />
            <span>Frequently Bought Together</span>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            Upgrade your setup & save 10%
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto_1fr_auto] items-center">
            {/* Primary Item */}
            <div className="flex items-center gap-4 rounded-2xl bg-surface/60 p-4">
              <img
                src={gallery[0]?.src}
                alt=""
                className="h-20 w-20 rounded-xl object-contain mix-blend-multiply bg-surface"
              />
              <div>
                <p className="font-bold text-sm">{p.name}</p>
                <p className="font-mono text-sm text-foreground">{formatPKR(totalPrice)}</p>
                <span className="text-[11px] text-muted-foreground">Current selection</span>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface font-bold text-muted-foreground mx-auto">
              +
            </div>

            {/* Companion Item */}
            <div className="flex items-center gap-4 rounded-2xl bg-surface/60 p-4">
              <img
                src={imageSrc(companion.images[0])}
                alt=""
                className="h-20 w-20 rounded-xl object-contain mix-blend-multiply bg-surface"
              />
              <div className="flex-1">
                <p className="font-bold text-sm">{companion.name}</p>
                <p className="font-mono text-sm text-foreground">{formatPKR(companionPrice)}</p>
                <label className="mt-1 flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bundleChecked}
                    onChange={(e) => setBundleChecked(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Include companion</span>
                </label>
              </div>
            </div>

            {/* Bundle Checkout Action */}
            <div className="rounded-2xl bg-surface p-5 text-center md:text-right border border-border/40">
              <p className="text-xs text-muted-foreground">Bundle Price (10% Off)</p>
              <div className="flex items-baseline justify-center md:justify-end gap-2 mt-1">
                <span className="font-mono text-2xl font-extrabold text-primary">
                  {formatPKR(bundleChecked ? bundleDiscountedTotal : totalPrice)}
                </span>
                {bundleChecked && (
                  <span className="font-mono text-sm text-muted-foreground line-through">
                    {formatPKR(bundleOriginalTotal)}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={bundleChecked ? addBundle : add}
                className="press mt-3 w-full rounded-full bg-ink px-6 py-3 font-semibold text-xs text-ink-foreground hover:bg-primary shadow-sm"
              >
                {bundleChecked ? "Add Bundle to Bag" : "Add Selected to Bag"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CUSTOMER REVIEWS & RATINGS SECTION (Feature 1) */}
      <section id="reviews" className="mt-20 scroll-mt-24 border-t pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-black">{avgRating} out of 5</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on {reviews.length} verified customer reviews across Pakistan
            </p>
          </div>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="press rounded-full bg-ink px-6 py-2.5 text-xs font-semibold text-ink-foreground hover:bg-primary"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown Bar */}
        <div className="mt-8 grid gap-2 max-w-md rounded-2xl bg-surface/50 p-4 text-xs font-mono">
          {[
            { stars: "5 Stars", count: reviews.filter((r) => r.rating === 5).length, pct: "80%" },
            { stars: "4 Stars", count: reviews.filter((r) => r.rating === 4).length, pct: "20%" },
            { stars: "3 Stars", count: reviews.filter((r) => r.rating === 3).length, pct: "0%" },
            { stars: "2 Stars", count: reviews.filter((r) => r.rating === 2).length, pct: "0%" },
            { stars: "1 Star", count: reviews.filter((r) => r.rating === 1).length, pct: "0%" },
          ].map((b) => (
            <div key={b.stars} className="flex items-center gap-3">
              <span className="w-16 text-muted-foreground">{b.stars}</span>
              <div className="h-2 flex-1 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: b.pct }} />
              </div>
              <span className="w-6 text-right text-muted-foreground">{b.count}</span>
            </div>
          ))}
        </div>

        {/* Reviews List */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-3xl border bg-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono text-muted-foreground">{r.date}</span>
              </div>
              <h4 className="font-bold text-base">{r.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
              <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs">
                <span className="font-bold">
                  {r.author} · <span className="text-muted-foreground font-normal">{r.city}</span>
                </span>
                {r.verified && (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-success font-semibold">
                    <Check className="h-3 w-3" /> Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED PRODUCTS / YOU MIGHT ALSO LIKE (Feature 6) */}
      <section className="mt-24 border-t pt-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Explore More
            </p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">You might also like</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-primary hover:underline">
            View all gadgets →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <div key={item.id} className="h-full">
              <ProductCard product={item} size="md" />
            </div>
          ))}
        </div>
      </section>

      {/* RECENTLY VIEWED PRODUCTS CAROUSEL */}
      {recentlyViewed.filter((item) => item.id !== p.id).length > 0 && (
        <section className="mt-20 border-t pt-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            History
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight">Recently viewed gadgets</h2>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
            {recentlyViewed
              .filter((item) => item.id !== p.id)
              .map((item) => (
                <Link
                  key={item.id}
                  to="/product/$slug"
                  params={{ slug: item.slug }}
                  className="group flex w-48 shrink-0 flex-col rounded-3xl border bg-card p-3 transition-all hover:border-border hover:shadow-xs"
                >
                  <div className="aspect-square rounded-2xl bg-surface/80 p-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={imageSrc(item.image)}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="mt-3 truncate text-xs font-bold">{item.name}</h4>
                  <p className="mt-0.5 font-mono text-xs text-primary font-bold">
                    {formatPKR(item.price)}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* STICKY ADD TO BAG BOTTOM BAR (Feature 5) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur-md px-5 py-3 shadow-2xl"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={gallery[activeImgIndex]?.src}
                  alt=""
                  className="h-11 w-11 rounded-xl object-contain bg-surface mix-blend-multiply border"
                />
                <div className="min-w-0">
                  <p className="truncate font-bold text-sm">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground font-mono">
                    {selectedColor} · {selectedSize}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right hidden sm:block font-mono">
                  <p className="font-bold text-base text-foreground">{formatPKR(totalPrice)}</p>
                  <p className="text-[10px] text-success">In Stock</p>
                </div>

                <button
                  onClick={add}
                  className="press rounded-full bg-ink px-6 py-2.5 font-semibold text-xs text-ink-foreground hover:bg-primary shadow-sm"
                >
                  Add to bag
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WRITE A REVIEW MODAL */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl">
            <h3 className="text-xl font-extrabold">Write a Customer Review</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Share your experience with {p.name}
            </p>

            <form onSubmit={submitReview} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
                  Overall Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: s })}
                      className="p-1 text-amber-500 focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${s <= newReview.rating ? "fill-current" : "stroke-current text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Zainab A."
                    className="h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
                    City
                  </label>
                  <select
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    className="h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                  >
                    {CITIES_DELIVERY.map((c) => (
                      <option key={c.city} value={c.city}>
                        {c.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
                  Review Headline
                </label>
                <input
                  required
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="e.g. Best headphones I've owned"
                  className="h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">
                  Review Details
                </label>
                <textarea
                  required
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Tell other shoppers what you loved about sound, comfort, delivery, or battery..."
                  className="w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="press rounded-full bg-surface px-4 py-2 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground hover:bg-primary"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox / Zoom Dialog */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[85vh] p-4">
            <img
              src={gallery[activeImgIndex]?.src}
              alt=""
              className="max-h-[80vh] w-auto mx-auto object-contain rounded-2xl"
            />
            <p className="mt-3 text-center text-sm font-mono text-white/80">
              {gallery[activeImgIndex]?.label} · Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
