import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  listPrice: number;
  qty: number;
  stock: number;
  variant?: string;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  savings: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => boolean;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  bump: number;
  cartIconRef: React.MutableRefObject<HTMLElement | null>;
};

const Ctx = createContext<CartCtx | null>(null);
const CART_STORAGE_KEY = "gubberz_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const cartIconRef = useRef<HTMLElement | null>(null);
  const isLoadedRef = useRef<boolean>(false);

  // Initialize and load synced cart from localStorage safely after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    } finally {
      isLoadedRef.current = true;
    }
  }, []);

  // Sync to localStorage whenever items change after initial load
  useEffect(() => {
    if (!isLoadedRef.current) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    let ok = true;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const current = existing?.qty ?? 0;
      if (current + qty > item.stock) {
        ok = false;
        return prev;
      }
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, ...item, qty: current + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
    if (ok) setTimeout(() => setBump((b) => b + 1), 550);
    return ok;
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, i.stock)) } : i)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
    const savings = items.reduce((s, i) => s + i.qty * (i.listPrice - i.unitPrice), 0);
    return {
      items,
      count,
      subtotal,
      savings,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
      bump,
      cartIconRef,
    };
  }, [items, open, add, setQty, remove, clear, bump]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}

/** Clones an image and flies it to the cart icon. */
export function flyToCart(img: HTMLElement | null, target: HTMLElement | null) {
  if (!img || !target || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const from = img.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const ghost = img.cloneNode(true) as HTMLElement;
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    zIndex: "100",
    pointerEvents: "none",
    borderRadius: "24px",
    objectFit: "cover",
  });
  document.body.appendChild(ghost);
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const anim = ghost.animate(
    [
      { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
      {
        transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 80}px) scale(0.45) rotate(-12deg)`,
        opacity: 1,
        offset: 0.55,
      },
      { transform: `translate(${dx}px, ${dy}px) scale(0.06) rotate(-24deg)`, opacity: 0.6 },
    ],
    { duration: 600, easing: "cubic-bezier(.5,0,.3,1)" },
  );
  anim.onfinish = () => ghost.remove();
}
