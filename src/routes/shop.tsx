import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, X, ArrowUpDown, Check } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { categoriesQuery, productsQuery, effectivePrice, formatPKR, imageSrc } from "@/lib/shop";
import { useRecentlyViewed } from "@/lib/discovery";
import lost from "@/assets/characters/lost.png";

const searchSchema = z.object({
  q: z.string().optional(),
  cat: z.string().optional(),
  sort: z.enum(["new", "price-asc", "price-desc"]).optional(),
  priceRange: z.enum(["all", "under-5k", "5k-15k", "over-15k"]).optional(),
  inStockOnly: z.boolean().optional(),
  onSaleOnly: z.boolean().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) =>
    Promise.all([
      context.queryClient.ensureQueryData(productsQuery(deps)),
      context.queryClient.ensureQueryData(categoriesQuery),
    ]),
  head: () => ({
    meta: [
      { title: "Shop all gadgets — Gubberz" },
      {
        name: "description",
        content:
          "Browse headphones, earbuds, speakers, chargers, power banks, keyboards, mice and cables at Gubberz.",
      },
      { property: "og:title", content: "Shop all gadgets — Gubberz" },
      {
        property: "og:description",
        content: "Every gadget we sell, in one place. Search, filter and find something nice.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const { data: products } = useSuspenseQuery(productsQuery(search));
  const { data: cats } = useSuspenseQuery(categoriesQuery);
  const { items: recentlyViewed } = useRecentlyViewed();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const activeCat = cats.find((c) => c.slug === search.cat);

  // Client-side faceted filters
  const filteredProducts = products.filter((p) => {
    const price = effectivePrice(p);
    if (search.priceRange === "under-5k" && price >= 5000) return false;
    if (search.priceRange === "5k-15k" && (price < 5000 || price > 15000)) return false;
    if (search.priceRange === "over-15k" && price <= 15000) return false;
    if (search.inStockOnly && p.stock <= 0) return false;
    if (search.onSaleOnly && (p.sale_price == null || p.sale_price >= p.price)) return false;
    return true;
  });

  const hasActiveFilters = Boolean(
    search.q ||
      search.cat ||
      search.priceRange ||
      search.inStockOnly ||
      search.onSaleOnly,
  );

  const clearAllFilters = () => {
    navigate({
      search: () => ({
        q: undefined,
        cat: undefined,
        sort: "new",
        priceRange: undefined,
        inStockOnly: undefined,
        onSaleOnly: undefined,
      }),
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8 pb-28">
      {/* Eyebrow & Headline */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} {products.length === 1 ? "gadget" : "gadgets"}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="press text-xs font-mono text-primary hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      <h1 className="mt-2 text-5xl font-extrabold tracking-tight md:text-7xl">
        {search.q ? <>“{search.q}”</> : activeCat ? activeCat.name : "Everything"}
      </h1>
      {activeCat?.blurb && (
        <p className="mt-3 text-lg text-muted-foreground">{activeCat.blurb}</p>
      )}

      {/* CATEGORY BAR & SORTING */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b pb-6">
        <Chip
          active={!search.cat}
          onClick={() => navigate({ search: (s) => ({ ...s, cat: undefined }) })}
        >
          All
        </Chip>
        {cats.map((c) => (
          <Chip
            key={c.id}
            active={search.cat === c.slug}
            onClick={() => navigate({ search: (s) => ({ ...s, cat: c.slug }) })}
          >
            {c.name}
          </Chip>
        ))}

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className={`press flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-semibold ${
              filterDrawerOpen || search.priceRange || search.inStockOnly || search.onSaleOnly
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-surface text-foreground hover:bg-muted"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {(search.priceRange || search.inStockOnly || search.onSaleOnly) && (
              <span className="flex h-2 w-2 rounded-full bg-primary" />
            )}
          </button>

          <div className="relative">
            <select
              aria-label="Sort products"
              value={search.sort ?? "new"}
              onChange={(e) =>
                navigate({ search: (s) => ({ ...s, sort: e.target.value as "new" }) })
              }
              className="h-10 rounded-full bg-surface px-4 text-xs font-semibold outline-none ring-primary focus:ring-2"
            >
              <option value="new">Sort: Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* EXPANDABLE FACETED FILTERS DRAWER */}
      {filterDrawerOpen && (
        <div className="mt-4 rounded-3xl border bg-card p-6 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="font-bold text-sm">Refine Gadgets</h3>
            <button
              onClick={() => setFilterDrawerOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Close ✕
            </button>
          </div>

          <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* Price Range */}
            <div>
              <p className="font-mono text-xs uppercase text-muted-foreground mb-2">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "All Prices", val: undefined },
                  { label: "Under Rs 5k", val: "under-5k" as const },
                  { label: "Rs 5k – Rs 15k", val: "5k-15k" as const },
                  { label: "Above Rs 15k", val: "over-15k" as const },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate({ search: (s) => ({ ...s, priceRange: item.val }) })}
                    className={`press rounded-full px-3 py-1.5 text-xs font-medium border ${
                      search.priceRange === item.val || (!search.priceRange && !item.val)
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border/60 bg-surface text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <p className="font-mono text-xs uppercase text-muted-foreground mb-2">Availability</p>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(search.inStockOnly)}
                    onChange={(e) =>
                      navigate({ search: (s) => ({ ...s, inStockOnly: e.target.checked || undefined }) })
                    }
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(search.onSaleOnly)}
                    onChange={(e) =>
                      navigate({ search: (s) => ({ ...s, onSaleOnly: e.target.checked || undefined }) })
                    }
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>On Sale Only</span>
                </label>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-end justify-start sm:justify-end gap-3">
              <button
                onClick={clearAllFilters}
                className="press rounded-full bg-surface px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE FILTER CHIPS */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {search.q && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs">
              Keyword: "{search.q}"
              <button
                onClick={() => navigate({ search: (s) => ({ ...s, q: undefined }) })}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </span>
          )}
          {search.cat && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs">
              Category: {activeCat?.name}
              <button
                onClick={() => navigate({ search: (s) => ({ ...s, cat: undefined }) })}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </span>
          )}
          {search.priceRange && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs">
              Price: {search.priceRange}
              <button
                onClick={() => navigate({ search: (s) => ({ ...s, priceRange: undefined }) })}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </span>
          )}
          {search.inStockOnly && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs">
              In Stock
              <button
                onClick={() => navigate({ search: (s) => ({ ...s, inStockOnly: undefined }) })}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </span>
          )}
          {search.onSaleOnly && (
            <span className="inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs">
              On Sale
              <button
                onClick={() => navigate({ search: (s) => ({ ...s, onSaleOnly: undefined }) })}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}

      {/* PRODUCTS GRID */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <img src={lost} alt="" width={1024} height={1024} className="w-40" />
          <p className="mt-4 text-2xl font-bold">Nothing matches these filters.</p>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your price range, or clear filters to view all gadgets.
          </p>
          <button
            onClick={clearAllFilters}
            className="press mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* RECENTLY VIEWED PRODUCTS CAROUSEL ON SHOP */}
      {recentlyViewed.length > 0 && (
        <section className="mt-28 border-t pt-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            History
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight">Recently viewed gadgets</h2>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
            {recentlyViewed.map((item) => (
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
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`press h-10 rounded-full px-4 text-sm font-medium ${
        active ? "bg-ink text-ink-foreground" : "bg-surface hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}
