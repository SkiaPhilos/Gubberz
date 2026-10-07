import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const DEFAULT_SUPABASE_URL = "https://csvnjedaklqwgwyeidkm.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_p_FlIPIEnKJ49VbCeRsjzA_0MVh3gR9";

function publicClient() {
  const url =
    process.env["SUPABASE_URL"] ||
    process.env["VITE_SUPABASE_URL"] ||
    DEFAULT_SUPABASE_URL;

  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["SUPABASE_ANON_KEY"] ||
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["VITE_SUPABASE_ANON_KEY"] ||
    DEFAULT_SUPABASE_KEY;

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const PRODUCT_COLS =
  "id,name,slug,sku,brand,short_description,description,price,sale_price,stock,low_stock_threshold,images,specs,features,tags,featured,variants,created_at,category:categories(name,slug)";

export type ProductVariantColor = {
  name: string;
  hex: string;
  image?: string;
};

export type ProductVariantOption = {
  name: string;
  extraPrice: number;
  stock?: number;
  specsNote?: string;
};

export type ProductVariants = {
  colors?: ProductVariantColor[];
  variantType?: string; // e.g. "Size", "Wattage", "Length", "Model", "Storage"
  sizes?: ProductVariantOption[];
  inBox?: string[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  sale_price: number | null;
  stock: number;
  low_stock_threshold: number;
  images: string[];
  specs: Record<string, string>;
  features: string[];
  tags: string[];
  featured: boolean;
  variants?: ProductVariants | any;
  created_at: string;
  category: { name: string; slug: string } | null;
};

export type Category = { id: string; name: string; slug: string; blurb: string | null };

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "cat-audio",
    name: "Audio",
    slug: "audio",
    blurb: "Things that go in, on or near your ears.",
  },
  {
    id: "cat-power",
    name: "Power",
    slug: "power",
    blurb: "Chargers and power banks. Juice, basically.",
  },
  { id: "cat-desk", name: "Desk", slug: "desk", blurb: "Keyboards, mice and desk things." },
  { id: "cat-cables", name: "Cables", slug: "cables", blurb: "The spaghetti of modern life." },
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod-hush-pro",
    name: "Hush Pro Headphones",
    slug: "hush-pro-headphones",
    sku: "GBZ-AUD-001",
    brand: "Gubberz Audio",
    short_description: "Over-ear, noise cancelling, 40h battery",
    description:
      "Big soft cushions, serious noise cancelling and a battery that outlasts your attention span.",
    price: 18999,
    sale_price: 15999,
    stock: 12,
    low_stock_threshold: 3,
    images: ["headphones"],
    specs: { Battery: "40 hours", Connection: "Bluetooth 5.3", Weight: "250 g", Charging: "USB-C" },
    features: [
      "Active noise cancelling",
      "40-hour battery",
      "Fold-flat design",
      "Multipoint pairing",
    ],
    tags: ["wireless", "anc"],
    featured: true,
    created_at: new Date().toISOString(),
    category: { name: "Audio", slug: "audio" },
  },
  {
    id: "prod-pebble-buds",
    name: "Pebble Buds",
    slug: "pebble-buds",
    sku: "GBZ-AUD-002",
    brand: "Gubberz Audio",
    short_description: "True wireless earbuds, pocket-sized case",
    description: "Tiny buds, tiny case, surprisingly big sound.",
    price: 7499,
    sale_price: null,
    stock: 30,
    low_stock_threshold: 3,
    images: ["earbuds"],
    specs: { Battery: "6h + 24h case", Connection: "Bluetooth 5.3", "Water resistance": "IPX4" },
    features: ["Touch controls", "IPX4 sweat resistant", "Low-latency mode"],
    tags: ["wireless"],
    featured: true,
    created_at: new Date().toISOString(),
    category: { name: "Audio", slug: "audio" },
  },
  {
    id: "prod-boombox",
    name: "Boombox Mini Speaker",
    slug: "boombox-mini-speaker",
    sku: "GBZ-AUD-003",
    brand: "Loudish",
    short_description: "Portable speaker, 12h, splash proof",
    description: "Small enough for a backpack, loud enough to annoy the neighbours.",
    price: 9999,
    sale_price: 8499,
    stock: 2,
    low_stock_threshold: 3,
    images: ["speaker"],
    specs: { Battery: "12 hours", Output: "10 W", "Water resistance": "IPX6" },
    features: ["Splash proof", "Stereo pairing", "Built-in mic"],
    tags: ["portable"],
    featured: true,
    created_at: new Date().toISOString(),
    category: { name: "Audio", slug: "audio" },
  },
  {
    id: "prod-zap-65w",
    name: "Zap 65W Charger",
    slug: "zap-65w-charger",
    sku: "GBZ-PWR-001",
    brand: "Zap",
    short_description: "GaN, 3 ports, charges laptops",
    description: "One charger for your laptop, phone and earbuds at the same time.",
    price: 5999,
    sale_price: null,
    stock: 25,
    low_stock_threshold: 3,
    images: ["charger"],
    specs: { Output: "65 W max", Ports: "2x USB-C, 1x USB-A", Tech: "GaN" },
    features: ["GaN — runs cool", "Foldable pins", "Laptop capable"],
    tags: ["gan", "usb-c"],
    featured: false,
    created_at: new Date().toISOString(),
    category: { name: "Power", slug: "power" },
  },
  {
    id: "prod-brick-20k",
    name: "Brick 20K Power Bank",
    slug: "brick-20k-power-bank",
    sku: "GBZ-PWR-002",
    brand: "Zap",
    short_description: "20,000 mAh, 22.5W fast charge",
    description:
      "Charges your phone about four times. Heavier than a sandwich, lighter than regret.",
    price: 6499,
    sale_price: 5499,
    stock: 5,
    low_stock_threshold: 3,
    images: ["powerbank"],
    specs: { Capacity: "20,000 mAh", Output: "22.5 W", Ports: "USB-C, 2x USB-A" },
    features: ["Fast charge", "LED level display", "Charges 3 devices"],
    tags: ["portable"],
    featured: false,
    created_at: new Date().toISOString(),
    category: { name: "Power", slug: "power" },
  },
  {
    id: "prod-clack-75",
    name: "Clack 75 Keyboard",
    slug: "clack-75-keyboard",
    sku: "GBZ-DSK-001",
    brand: "Clack",
    short_description: "75% mechanical, hot-swap, wireless",
    description: "Satisfying thock. Swappable switches. Makes emails feel important.",
    price: 16999,
    sale_price: null,
    stock: 8,
    low_stock_threshold: 3,
    images: ["keyboard"],
    specs: { Layout: "75%", Switches: "Hot-swap, linear", Connection: "Bluetooth / 2.4G / USB-C" },
    features: ["Hot-swappable switches", "Tri-mode wireless", "Gasket mount"],
    tags: ["mechanical"],
    featured: true,
    created_at: new Date().toISOString(),
    category: { name: "Desk", slug: "desk" },
  },
  {
    id: "prod-glide-mouse",
    name: "Glide Mouse",
    slug: "glide-mouse",
    sku: "GBZ-DSK-002",
    brand: "Clack",
    short_description: "Silent clicks, 70 days battery",
    description: "A quiet little mouse that just gets on with it.",
    price: 3499,
    sale_price: 2999,
    stock: 40,
    low_stock_threshold: 3,
    images: ["mouse"],
    specs: { DPI: "800–4000", Battery: "70 days", Connection: "Bluetooth / 2.4G" },
    features: ["Silent clicks", "Multi-device", "Ergonomic shape"],
    tags: ["wireless"],
    featured: false,
    created_at: new Date().toISOString(),
    category: { name: "Desk", slug: "desk" },
  },
  {
    id: "prod-noodle-cable",
    name: "Noodle USB-C Cable",
    slug: "noodle-usb-c-cable",
    sku: "GBZ-CBL-001",
    brand: "Noodle",
    short_description: "Braided, 100W, 2 metres",
    description: "A cable that refuses to fray. 100W, so it handles laptops too.",
    price: 1499,
    sale_price: null,
    stock: 100,
    low_stock_threshold: 3,
    images: ["cable"],
    specs: { Length: "2 m", Power: "100 W", Data: "480 Mbps" },
    features: ["Braided nylon", "100W PD", "Tangle resistant"],
    tags: ["usb-c"],
    featured: false,
    created_at: new Date().toISOString(),
    category: { name: "Cables", slug: "cables" },
  },
];

export const getCategories = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { data, error } = await publicClient()
      .from("categories")
      .select("id,name,slug,blurb")
      .order("sort_order");
    if (error || !data || data.length === 0) {
      return DEFAULT_CATEGORIES;
    }
    return data as Category[];
  } catch {
    return DEFAULT_CATEGORIES;
  }
});

export const getProducts = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) =>
    z
      .object({
        q: z.string().max(100).optional(),
        cat: z.string().max(60).optional(),
        sort: z.enum(["new", "price-asc", "price-desc"]).optional(),
        featured: z.boolean().optional(),
      })
      .parse(d ?? {}),
  )
  .handler(async ({ data }) => {
    try {
      let query = publicClient().from("products").select(PRODUCT_COLS);
      if (data.featured) query = query.eq("featured", true);
      if (data.q) query = query.ilike("name", `%${data.q.replace(/[%_,()]/g, "")}%`);
      if (data.sort === "price-asc") query = query.order("price", { ascending: true });
      else if (data.sort === "price-desc") query = query.order("price", { ascending: false });
      else query = query.order("created_at", { ascending: false });
      const { data: rows, error } = await query;
      if (error || !rows || rows.length === 0) {
        let fallback = [...DEFAULT_PRODUCTS];
        if (data.featured) fallback = fallback.filter((p) => p.featured);
        if (data.q) {
          const needle = data.q.toLowerCase();
          fallback = fallback.filter(
            (p) =>
              p.name.toLowerCase().includes(needle) ||
              p.short_description?.toLowerCase().includes(needle),
          );
        }
        if (data.cat) fallback = fallback.filter((p) => p.category?.slug === data.cat);
        if (data.sort === "price-asc") fallback.sort((a, b) => a.price - b.price);
        else if (data.sort === "price-desc") fallback.sort((a, b) => b.price - a.price);
        return fallback;
      }
      let list = rows as unknown as Product[];
      if (data.cat) list = list.filter((p) => p.category?.slug === data.cat);
      return list;
    } catch {
      let fallback = [...DEFAULT_PRODUCTS];
      if (data.featured) fallback = fallback.filter((p) => p.featured);
      if (data.q) {
        const needle = data.q.toLowerCase();
        fallback = fallback.filter(
          (p) =>
            p.name.toLowerCase().includes(needle) ||
            p.short_description?.toLowerCase().includes(needle),
        );
      }
      if (data.cat) fallback = fallback.filter((p) => p.category?.slug === data.cat);
      if (data.sort === "price-asc") fallback.sort((a, b) => a.price - b.price);
      else if (data.sort === "price-desc") fallback.sort((a, b) => b.price - a.price);
      return fallback;
    }
  });

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string().max(120) }).parse(d))
  .handler(async ({ data }) => {
    try {
      const { data: row, error } = await publicClient()
        .from("products")
        .select(PRODUCT_COLS)
        .eq("slug", data.slug)
        .maybeSingle();
      if (error || !row) {
        return DEFAULT_PRODUCTS.find((p) => p.slug === data.slug) ?? null;
      }
      return (row as unknown as Product) ?? null;
    } catch {
      return DEFAULT_PRODUCTS.find((p) => p.slug === data.slug) ?? null;
    }
  });

export type PaymentAccount = {
  id: string;
  label: string;
  account_title: string;
  account_number: string;
  enabled: boolean;
  isPlaceholder?: boolean;
};

const DEFAULT_ACCOUNTS: PaymentAccount[] = [
  {
    id: "jazzcash",
    label: "JazzCash",
    account_title: "Gubberz",
    account_number: "+92 327 4393495",
    enabled: true,
  },
  {
    id: "nayapay",
    label: "NayaPay",
    account_title: "Gubberz",
    account_number: "4782 7800 6321 6637",
    enabled: true,
  },
  {
    id: "easypaisa",
    label: "Easypaisa",
    account_title: "Gubberz Store (Placeholder)",
    account_number: "+92 300 1234567",
    enabled: true,
    isPlaceholder: true,
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer / Raast / IBAN",
    account_title: "Gubberz Tech (Placeholder)",
    account_number: "PK89MEZN0001020304050607 · Raast: 923274393495",
    enabled: true,
    isPlaceholder: true,
  },
];

export type PromoCoupon = {
  code: string;
  discountPercent: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  active: boolean;
  description?: string;
};

export const DEFAULT_COUPONS: PromoCoupon[] = [
  {
    code: "GUBBEROO5",
    discountPercent: 5,
    minOrderAmount: 2000,
    usedCount: 14,
    active: true,
    description: "5% off anywhere in Pakistan courtesy of Gubberoo",
  },
  {
    code: "MIDNIGHT10",
    discountPercent: 10,
    minOrderAmount: 5000,
    usedCount: 38,
    active: true,
    description: "10% off during Flash Drops & Midnight Sales",
  },
  {
    code: "WELCOME10",
    discountPercent: 10,
    minOrderAmount: 3000,
    usedCount: 82,
    active: true,
    description: "10% off for first-time Pakistani buyers",
  },
  {
    code: "TECHDROP",
    discountPercent: 15,
    minOrderAmount: 10000,
    usedCount: 21,
    active: true,
    description: "15% VIP drop discount on big desk setups",
  },
];

export type FlashSaleConfig = {
  active: boolean;
  title: string;
  bannerText: string;
  targetDate: string;
  discountPercent: number;
  promoCode: string;
};

export const DEFAULT_FLASH_SALE: FlashSaleConfig = {
  active: true,
  title: "Midnight Drop",
  bannerText: "⚡ MIDNIGHT DROP · EXTRA 10% OFF WITH CODE MIDNIGHT10 · NATIONWIDE EXPRESS DISPATCH",
  targetDate: new Date(Date.now() + 6 * 3600 * 1000 + 42 * 60 * 1000).toISOString(),
  discountPercent: 10,
  promoCode: "MIDNIGHT10",
};

export const getStoreSettings = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { data } = await publicClient().from("store_settings").select("key,value");
    const map: Record<string, unknown> = {};
    for (const r of data ?? []) map[r.key] = r.value;
    const accountsFromDb = Array.isArray(map["payment_methods"])
      ? (map["payment_methods"] as PaymentAccount[])
      : [];

    // Merge DB accounts with full Phase 2 payment method placeholders
    const mergedAccounts: PaymentAccount[] = [...DEFAULT_ACCOUNTS];
    for (const dbAcc of accountsFromDb) {
      const idx = mergedAccounts.findIndex((a) => a.id === dbAcc.id);
      if (idx >= 0) {
        mergedAccounts[idx] = { ...dbAcc, isPlaceholder: false };
      } else {
        mergedAccounts.push(dbAcc);
      }
    }

    const coupons =
      Array.isArray(map["coupons"]) && (map["coupons"] as any[]).length > 0
        ? (map["coupons"] as PromoCoupon[])
        : DEFAULT_COUPONS;

    const flashSale =
      map["flash_sale"] && typeof map["flash_sale"] === "object"
        ? (map["flash_sale"] as FlashSaleConfig)
        : DEFAULT_FLASH_SALE;

    return {
      whatsapp: String(map["whatsapp_number"] ?? "923274393495"),
      email: String(map["contact_email"] ?? "maniacphilos@gmail.com"),
      advanceDiscount: Number(map["advance_payment_discount_percent"] ?? 5),
      deliveryFee: Number(map["delivery_fee"] ?? 250),
      accounts: mergedAccounts.filter((a) => a.enabled),
      coupons,
      flashSale,
    };
  } catch (err) {
    console.warn("Could not load store settings from database, using defaults:", err);
    return {
      whatsapp: "923274393495",
      email: "maniacphilos@gmail.com",
      advanceDiscount: 5,
      deliveryFee: 250,
      accounts: DEFAULT_ACCOUNTS.filter((a) => a.enabled),
      coupons: DEFAULT_COUPONS,
      flashSale: DEFAULT_FLASH_SALE,
    };
  }
});

const orderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2).max(120),
    phone: z.string().trim().min(10).max(30),
    email: z.string().trim().max(200).email().or(z.literal("")),
    address: z.string().trim().min(5).max(500),
    city: z.string().trim().min(2).max(80),
    notes: z.string().trim().max(500),
  }),
  items: z
    .array(z.object({ id: z.string().uuid(), qty: z.number().int().min(1).max(99) }))
    .min(1)
    .max(50),
  method: z.enum(["cod", "jazzcash", "nayapay", "easypaisa", "bank_transfer", "iban", "raast"]),
  proof: z.string().max(300).nullable(),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => orderSchema.parse(d))
  .handler(async ({ data }) => {
    // Standard db function supports cod, jazzcash, nayapay.
    // Extended placeholder methods are safely bridged and tracked in order notes.
    const isStandardDbMethod = ["cod", "jazzcash", "nayapay"].includes(data.method);
    const dbMethod = isStandardDbMethod ? data.method : "jazzcash";
    const customerNotes = !isStandardDbMethod
      ? `[Payment Method: ${data.method.toUpperCase().replace("_", " ")}] ${data.customer.notes || ""}`.trim()
      : data.customer.notes;

    const { data: res, error } = await publicClient().rpc("place_order", {
      p_customer: { ...data.customer, notes: customerNotes },
      p_items: data.items,
      p_method: dbMethod,
      p_proof: data.proof ?? "",
    });
    if (error) return { ok: false as const, error: error.message.slice(0, 200) };
    return { ok: true as const, code: (res as { code: string }).code };
  });

export type OrderView = {
  code: string;
  status: string;
  customer_name: string;
  city: string;
  payment_method: string;
  subtotal: number;
  discount: number;
  delivery_fee: number;
  total: number;
  created_at: string;
  items: { name: string; image: string | null; unit_price: number; qty: number }[];
};

export const lookupOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({ code: z.string().trim().min(4).max(20), phone: z.string().trim().min(10).max(30) })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { data: res, error } = await publicClient().rpc("lookup_order", {
      p_code: data.code,
      p_phone: data.phone,
    });
    if (error) throw new Error("Could not look up order");
    return (res as OrderView | null) ?? null;
  });
