import { Link } from "@tanstack/react-router";
import { Plus, Heart } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog.functions";
import { availability, effectivePrice, formatPKR, imageSrc } from "@/lib/shop";
import { flyToCart, useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/discovery";

export function ProductCard({
  product,
  size = "md",
}: {
  product: Product;
  size?: "md" | "lg";
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const cart = useCart();
  const wishlist = useWishlist();
  const price = effectivePrice(product);
  const onSale = price < product.price;
  const avail = availability(product);
  const isWishlisted = wishlist.has(product.id);

  const add = () => {
    const ok = cart.add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "",
      unitPrice: price,
      listPrice: product.price,
      stock: product.stock,
    });
    if (ok) {
      flyToCart(imgRef.current, cart.cartIconRef.current);
      toast.success(`${product.name} is in your bag`);
    } else {
      toast("That's all we've got", { description: `Only ${product.stock} in stock right now.` });
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlist.toggle({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "",
      unitPrice: price,
      listPrice: product.price,
      stock: product.stock,
    });
    if (!isWishlisted) {
      toast.success(`${product.name} saved to wishlist`);
    } else {
      toast("Removed from wishlist");
    }
  };

  return (
    <article className="group relative flex h-full flex-col justify-between rounded-3xl border border-border/40 bg-card p-4 transition-all duration-300 hover:border-border hover:shadow-md">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div
          className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-surface/80 p-6 ${
            size === "lg" ? "aspect-square md:aspect-[4/5]" : "aspect-square"
          }`}
        >
          <img
            ref={imgRef}
            src={imageSrc(product.images[0])}
            alt={product.name}
            width={1024}
            height={1024}
            loading="lazy"
            className="h-full w-full max-h-64 object-contain mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-safe:group-hover:scale-105 motion-safe:group-hover:-rotate-1 motion-safe:group-active:scale-95"
          />

          {/* Badges */}
          {onSale && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
              −{Math.round((1 - price / product.price) * 100)}%
            </span>
          )}

          {/* Wishlist toggle button */}
          <button
            type="button"
            onClick={toggleWishlist}
            className={`press absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-xs transition-colors hover:bg-background ${
              isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-destructive" : ""}`} />
          </button>

          {avail.tone === "out" && (
            <span className="absolute bottom-3 right-3 rounded-full bg-background/95 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shadow-xs">
              Sold out
            </span>
          )}
        </div>

        <div className="mt-4 px-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold leading-snug group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                {product.short_description}
              </p>
            </div>
            <div className="shrink-0 text-right font-mono text-sm">
              <span className={`font-bold ${onSale ? "text-primary" : "text-foreground"}`}>
                {formatPKR(price)}
              </span>
              {onSale && (
                <p className="text-[11px] text-muted-foreground line-through">
                  {formatPKR(product.price)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 px-1">
        <span
          className={`font-mono text-[11px] uppercase tracking-wider ${
            avail.tone === "ok"
              ? "text-success"
              : avail.tone === "low"
                ? "text-primary font-semibold"
                : "text-destructive"
          }`}
        >
          ● {avail.label}
        </span>

        {avail.tone !== "out" && (
          <Button
            onClick={add}
            size="sm"
            aria-label={`Add ${product.name} to bag`}
            className="press flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-ink-foreground shadow-xs transition-colors hover:bg-primary"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </Button>
        )}
      </div>
    </article>
  );
}
