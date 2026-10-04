import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "./catalog.functions";

export type WishlistItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  listPrice: number;
  stock: number;
};

export type RecentlyViewedItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number | null;
  shortDescription?: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  count: number;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: (item: WishlistItem) => void;
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
};

type RecentlyViewedContextType = {
  items: RecentlyViewedItem[];
  recordView: (product: Product) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);
const RecentlyViewedContext = createContext<RecentlyViewedContextType | null>(null);

const WISHLIST_STORAGE_KEY = "gubberz_wishlist_v1";
const RECENTLY_VIEWED_STORAGE_KEY = "gubberz_recent_v1";

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const isLoadedRef = React.useRef(false);

  // Safely hydrate from localStorage on the client after mount
  useEffect(() => {
    try {
      const storedW = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedW) setWishlist(JSON.parse(storedW));
      const storedR = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
      if (storedR) setRecentlyViewed(JSON.parse(storedR));
    } catch {
      // ignore
    } finally {
      isLoadedRef.current = true;
    }
  }, []);

  // Sync Wishlist to localStorage only after client-side hydration
  useEffect(() => {
    if (!isLoadedRef.current) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Sync Recently Viewed to localStorage only after client-side hydration
  useEffect(() => {
    if (!isLoadedRef.current) return;
    try {
      localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch {
      // ignore
    }
  }, [recentlyViewed]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [item, ...prev];
    });
  };

  const addWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [item, ...prev];
    });
  };

  const removeWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  const hasWishlist = (id: string) => wishlist.some((i) => i.id === id);

  const recordView = (p: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== p.id);
      const newItem: RecentlyViewedItem = {
        id: p.id,
        slug: p.slug,
        name: p.name,
        image: p.images[0] ?? "",
        price: p.price,
        salePrice: p.sale_price,
        shortDescription: p.short_description,
      };
      return [newItem, ...filtered].slice(0, 8);
    });
  };

  const clearRecentlyViewed = () => setRecentlyViewed([]);

  return (
    <WishlistContext.Provider
      value={{
        items: wishlist,
        count: wishlist.length,
        isOpen: wishlistOpen,
        setOpen: setWishlistOpen,
        toggle: toggleWishlist,
        add: addWishlist,
        remove: removeWishlist,
        has: hasWishlist,
      }}
    >
      <RecentlyViewedContext.Provider
        value={{
          items: recentlyViewed,
          recordView,
          clear: clearRecentlyViewed,
        }}
      >
        {children}
      </RecentlyViewedContext.Provider>
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within DiscoveryProvider");
  return ctx;
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within DiscoveryProvider");
  return ctx;
}
