import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useWishlist } from "@/lib/discovery";
import { useCart } from "@/lib/cart";
import { formatPKR, imageSrc } from "@/lib/shop";

export function WishlistDrawer() {
  const wishlist = useWishlist();
  const cart = useCart();

  const moveToCart = (item: any) => {
    const ok = cart.add({
      id: item.id,
      slug: item.slug,
      name: item.name,
      image: item.image,
      unitPrice: item.unitPrice,
      listPrice: item.listPrice,
      stock: item.stock,
    });
    if (ok) {
      wishlist.remove(item.id);
      toast.success(`${item.name} moved to bag`);
    } else {
      toast.error("Item is out of stock");
    }
  };

  return (
    <AnimatePresence>
      {wishlist.isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs"
            onClick={() => wishlist.setOpen(false)}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-background p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 fill-destructive text-destructive" />
                <h2 className="text-xl font-extrabold tracking-tight">Saved for Later</h2>
                <span className="font-mono text-xs text-muted-foreground">
                  ({wishlist.count})
                </span>
              </div>
              <button
                onClick={() => wishlist.setOpen(false)}
                className="press rounded-full p-2 text-sm font-semibold hover:bg-surface"
              >
                Close ✕
              </button>
            </div>

            {/* Content */}
            {wishlist.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-muted-foreground">
                  <Heart className="h-8 w-8 stroke-1" />
                </div>
                <h3 className="mt-4 text-lg font-bold">Nothing saved yet</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                  Tap the heart icon on any product card to keep track of gadgets you love.
                </p>
                <button
                  onClick={() => wishlist.setOpen(false)}
                  className="press mt-6 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold text-ink-foreground hover:bg-primary"
                >
                  Explore Gadgets
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto divide-y py-4 [scrollbar-width:none]">
                {wishlist.items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    <Link
                      to="/product/$slug"
                      params={{ slug: item.slug }}
                      onClick={() => wishlist.setOpen(false)}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface p-2 border"
                    >
                      <img
                        src={imageSrc(item.image)}
                        alt={item.name}
                        className="h-full w-full object-contain mix-blend-multiply"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.slug }}
                        onClick={() => wishlist.setOpen(false)}
                        className="font-bold text-sm truncate block hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="font-mono text-xs font-semibold mt-1">
                        {formatPKR(item.unitPrice)}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {item.stock > 0 ? (
                          <span className="text-success font-medium">In Stock</span>
                        ) : (
                          <span className="text-destructive font-medium">Sold Out</span>
                        )}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => moveToCart(item)}
                          disabled={item.stock <= 0}
                          className="press flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-ink-foreground hover:bg-primary disabled:opacity-30"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          <span>Move to Bag</span>
                        </button>
                        <button
                          onClick={() => wishlist.remove(item.id)}
                          className="press p-1.5 text-muted-foreground hover:text-destructive rounded-full hover:bg-surface"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {wishlist.items.length > 0 && (
              <div className="border-t pt-4">
                <Link
                  to="/shop"
                  onClick={() => wishlist.setOpen(false)}
                  className="press flex w-full items-center justify-center gap-2 rounded-full bg-surface py-3 text-xs font-semibold hover:bg-muted"
                >
                  <span>Continue Browsing</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
