import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  Star,
  MapPin,
  Check,
  Camera,
  Filter,
  Plus,
  ArrowRight,
  ShieldCheck,
  X,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { publicReviewsQuery, productsQuery, formatPKR } from "@/lib/shop";
import { submitCustomerReview } from "@/lib/catalog.functions";
import type { StoredReview } from "@/lib/reviews";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews & Pakistani Desk Setups — Gubberz" },
      {
        name: "description",
        content:
          "Read verified buyer reviews, authentic ratings, and customer desk setup photos from Karachi, Lahore, Islamabad, Rawalpindi, and across Pakistan.",
      },
      { property: "og:title", content: "Customer Reviews & Pakistani Desk Setups — Gubberz" },
      {
        property: "og:description",
        content: "Verified reviews and customer desk setups delivered across Pakistan.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(publicReviewsQuery()),
      context.queryClient.ensureQueryData(productsQuery()),
    ]),
  component: ReviewsPage,
});

const CITIES = [
  "All",
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Faisalabad",
];

function ReviewsPage() {
  const queryClient = useQueryClient();
  const { data: reviews = [] } = useQuery(publicReviewsQuery());
  const { data: products = [] } = useQuery(productsQuery());

  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedRating, setSelectedRating] = useState<number | "all">("all");
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<{ url: string; caption: string } | null>(null);

  // New review form state
  const [form, setForm] = useState({
    productSlug: "",
    productName: "",
    author: "",
    city: "Karachi",
    rating: 5,
    title: "",
    comment: "",
    setupPhoto: "",
  });

  const submitMutation = useMutation({
    mutationFn: (data: Parameters<typeof submitCustomerReview>[0]["data"]) =>
      submitCustomerReview({ data }),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Thank you! Your verified review has been published.");
        queryClient.invalidateQueries({ queryKey: ["public-reviews"] });
        setModalOpen(false);
        setForm({
          productSlug: "",
          productName: "",
          author: "",
          city: "Karachi",
          rating: 5,
          title: "",
          comment: "",
          setupPhoto: "",
        });
      } else {
        toast.error(res.error || "Could not submit review");
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Could not submit review");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.productSlug) {
      toast.error("Please select a gadget");
      return;
    }
    const matchedProduct = products.find((p) => p.slug === form.productSlug);
    submitMutation.mutate({
      ...form,
      productName: matchedProduct?.name || form.productSlug,
      setupPhoto: form.setupPhoto.trim() || undefined,
    });
  };

  // Filter reviews
  const filtered = reviews.filter((r) => {
    if (selectedCity !== "All" && r.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (selectedRating !== "all" && r.rating !== selectedRating) {
      return false;
    }
    if (onlyPhotos && !r.setupPhoto) {
      return false;
    }
    if (selectedProductSlug !== "all" && r.productSlug !== selectedProductSlug) {
      return false;
    }
    return true;
  });

  // Aggregate stats
  const totalCount = reviews.length;
  const avgRating =
    totalCount > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1)
      : "5.0";
  const withPhotosCount = reviews.filter((r) => !!r.setupPhoto).length;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
      {/* HEADER HERO */}
      <div className="border-b border-border/80 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Pakistani Buyer Testimonials
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
              Real Setups. Real Cities. Zero Fluff.
            </h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Customer desk photos, honest opinions, and verified delivery reviews across Karachi, Lahore, Islamabad, Rawalpindi, and beyond.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => {
                if (products.length > 0 && !form.productSlug) {
                  setForm((prev) => ({
                    ...prev,
                    productSlug: products[0].slug,
                    productName: products[0].name,
                  }));
                }
                setModalOpen(true);
              }}
              className="press flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs font-bold text-ink-foreground shadow-md hover:bg-primary transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* METRICS BAR */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-3xl border border-border/80 bg-surface/50 p-6 sm:grid-cols-4 font-mono">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase">Average Rating</span>
            <p className="text-2xl font-black text-foreground flex items-center gap-1.5">
              <span>{avgRating}</span>
              <span className="text-amber-500 text-lg">★</span>
            </p>
            <span className="text-[11px] text-muted-foreground">Across Pakistan</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase">Total Reviews</span>
            <p className="text-2xl font-black text-foreground">{totalCount}</p>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              100% Verified Buyers
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase">Desk Photos</span>
            <p className="text-2xl font-black text-foreground">{withPhotosCount}</p>
            <span className="text-[11px] text-muted-foreground">Community setups</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground uppercase">Delivery Reach</span>
            <p className="text-2xl font-black text-foreground">200+ Cities</p>
            <span className="text-[11px] text-muted-foreground">Via TCS & Trax</span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div className="mt-8 space-y-4">
        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          <span className="text-xs font-mono uppercase text-muted-foreground font-bold shrink-0 mr-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" /> City:
          </span>
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`press shrink-0 rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer ${
                selectedCity === c
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-surface border border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Second Row: Rating, Photos Toggle, Product Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedRating("all")}
              className={`press rounded-lg px-3 py-1 font-semibold cursor-pointer ${
                selectedRating === "all"
                  ? "bg-foreground text-background"
                  : "bg-surface border text-muted-foreground"
              }`}
            >
              All Stars
            </button>
            <button
              onClick={() => setSelectedRating(5)}
              className={`press rounded-lg px-3 py-1 font-semibold flex items-center gap-1 cursor-pointer ${
                selectedRating === 5
                  ? "bg-amber-500 text-zinc-950"
                  : "bg-surface border text-muted-foreground"
              }`}
            >
              <span>5 Stars</span>
              <Star className="h-3 w-3 fill-current" />
            </button>

            <button
              onClick={() => setOnlyPhotos(!onlyPhotos)}
              className={`press rounded-lg px-3 py-1 font-semibold flex items-center gap-1.5 cursor-pointer ${
                onlyPhotos
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface border text-muted-foreground"
              }`}
            >
              <Camera className="h-3 w-3" />
              <span>With Setup Photos ({withPhotosCount})</span>
            </button>
          </div>

          {/* Product Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Gadget:</span>
            <select
              value={selectedProductSlug}
              onChange={(e) => setSelectedProductSlug(e.target.value)}
              className="rounded-xl border bg-surface px-3 py-1.5 text-xs font-medium cursor-pointer"
            >
              <option value="all">All Gadgets</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/80 p-12 text-center space-y-3">
            <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-lg">No reviews match your filters</h3>
            <p className="text-xs text-muted-foreground">
              Try switching your city filter or star rating to view more customer feedback.
            </p>
            <button
              onClick={() => {
                setSelectedCity("All");
                setSelectedRating("all");
                setOnlyPhotos(false);
                setSelectedProductSlug("all");
              }}
              className="press rounded-full bg-surface border px-4 py-2 font-mono text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="group flex flex-col justify-between rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div>
                  {/* Photo if present */}
                  {r.setupPhoto && (
                    <div
                      onClick={() =>
                        setLightboxImg({
                          url: r.setupPhoto!,
                          caption: `${r.author}'s Desk Setup · ${r.city} (${r.productName})`,
                        })
                      }
                      className="relative aspect-[16/10] w-full overflow-hidden bg-surface cursor-pointer group"
                    >
                      <img
                        src={r.setupPhoto}
                        alt={`${r.author}'s desk setup`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground border border-border/60 shadow-xs flex items-center gap-1">
                        <Camera className="h-3 w-3 text-primary" /> Setup Photo
                      </div>
                      <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-mono font-bold text-foreground">
                          Tap to Zoom 🔍
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Review Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {new Date(r.createdAt).toLocaleDateString("en-PK", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-foreground leading-snug">
                      "{r.title}"
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="border-t border-border/60 bg-surface/40 p-4 px-6 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-foreground">{r.author}</span>
                      <span className="text-muted-foreground font-mono ml-1.5 inline-flex items-center gap-0.5">
                        · <MapPin className="h-3 w-3 text-primary" /> {r.city}
                      </span>
                    </div>
                    {r.verified && (
                      <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <Check className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>

                  <Link
                    to="/product/$slug"
                    params={{ slug: r.productSlug }}
                    className="flex items-center justify-between text-xs font-semibold text-primary hover:underline pt-1 border-t border-border/40"
                  >
                    <span className="truncate">{r.productName}</span>
                    <span className="flex items-center gap-1 shrink-0 ml-2 font-mono text-[11px]">
                      View Gear <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden bg-background p-2 border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 text-foreground hover:bg-background cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={lightboxImg.url}
              alt=""
              className="max-h-[80vh] w-auto mx-auto object-contain rounded-2xl"
            />
            <p className="p-3 text-center text-xs font-mono text-muted-foreground">
              {lightboxImg.caption}
            </p>
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl bg-background p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-extrabold text-xl">Review Your Gubberz Gear</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your feedback helps shoppers across Pakistan choose the right setup.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="press rounded-full bg-surface p-2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                  Select Gadget
                </label>
                <select
                  value={form.productSlug}
                  onChange={(e) => {
                    const slug = e.target.value;
                    const matched = products.find((p) => p.slug === slug);
                    setForm((prev) => ({
                      ...prev,
                      productSlug: slug,
                      productName: matched?.name || slug,
                    }));
                  }}
                  className="w-full rounded-xl border bg-background p-2.5 font-semibold text-xs"
                  required
                >
                  <option value="">-- Choose Gadget --</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} ({formatPKR(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="e.g. Daniyal Shah"
                    className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                    City in Pakistan
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
                  >
                    {[
                      "Karachi",
                      "Lahore",
                      "Islamabad",
                      "Rawalpindi",
                      "Peshawar",
                      "Faisalabad",
                      "Multan",
                      "Quetta",
                      "Sialkot",
                      "Gujranwala",
                      "Other Pakistan City",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="press p-1 cursor-pointer"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= form.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-xs font-bold text-muted-foreground ml-2">
                    {form.rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Best noise cancellation for work"
                  className="w-full rounded-xl border bg-background p-2.5 text-xs font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                  Your Honest Experience
                </label>
                <textarea
                  rows={4}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Tell us about build quality, everyday battery life, courier delivery time in your city, etc."
                  className="w-full rounded-xl border bg-background p-2.5 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-mono uppercase text-muted-foreground font-bold mb-1">
                  Customer Desk Setup Photo (Optional URL)
                </label>
                <input
                  type="url"
                  value={form.setupPhoto}
                  onChange={(e) => setForm({ ...form, setupPhoto: e.target.value })}
                  placeholder="https://... (Image URL of your desk or gear)"
                  className="w-full rounded-xl border bg-background p-2.5 font-mono text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="press w-full rounded-2xl bg-primary py-3.5 text-center font-bold text-xs text-primary-foreground shadow-md hover:brightness-110 disabled:opacity-50 cursor-pointer"
                >
                  {submitMutation.isPending ? "Publishing Review…" : "Publish Verified Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
