import { queryOptions } from "@tanstack/react-query";
import {
  getCategories,
  getProduct,
  getProducts,
  getStoreSettings,
  getPublicReviews,
  type Product,
} from "./catalog.functions";

const DEFAULT_SUPABASE_URL = "https://csvnjedaklqwgwyeidkm.supabase.co";

function getBaseSupabaseUrl(): string {
  const url =
    (typeof process !== "undefined" && (process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"])) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
    DEFAULT_SUPABASE_URL;
  return url.replace(/\/+$/, "");
}

function getStorageBucket(): string {
  const bucket =
    (typeof process !== "undefined" && (process.env["STORAGE_BUCKET"] || process.env["VITE_SUPABASE_STORAGE_BUCKET"])) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_STORAGE_BUCKET);
  return bucket || "product-images";
}

// Fallback placeholder data URI
const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' fill='%23f1f5f9'%3E%3Crect width='400' height='400' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%2394a3b8'%3EGubberz Product%3C/text%3E%3C/svg%3E";

const SEED_PRODUCT_NAMES = [
  "headphones",
  "earbuds",
  "speaker",
  "charger",
  "powerbank",
  "keyboard",
  "mouse",
  "cable",
];

/** Images are stored as full URLs (Supabase Storage / CDN) or key references */
export function imageSrc(key: string | undefined): string {
  if (!key) return PLACEHOLDER_IMG;

  let cleanKey = key.trim();

  // If a full URL contains the extra '/products/' subfolder for one of the seed images,
  // fix it to point directly to the root of the bucket where the files were uploaded
  for (const seed of SEED_PRODUCT_NAMES) {
    if (cleanKey.includes(`/product-images/products/${seed}.`)) {
      cleanKey = cleanKey.replace(
        `/product-images/products/${seed}.`,
        `/product-images/${seed}.`,
      );
      break;
    }
  }

  if (cleanKey.startsWith("http://") || cleanKey.startsWith("https://") || cleanKey.startsWith("data:")) {
    return cleanKey;
  }

  const base = getBaseSupabaseUrl();
  const bucket = getStorageBucket();

  // Clean filename: if key doesn't have an extension, append .jpg
  const fileName = cleanKey.includes(".") ? cleanKey : `${cleanKey}.jpg`;

  return `${base}/storage/v1/object/public/${bucket}/${fileName}`;
}

/** Provides multiple gallery photos for any product */
export function productGallery(p: Product): { src: string; label: string }[] {
  const imagesList: { key: string; label: string }[] = [];

  // Add primary images from product
  if (Array.isArray(p.images) && p.images.length > 0) {
    p.images.forEach((img, idx) => {
      imagesList.push({
        key: img,
        label:
          idx === 0
            ? "Studio Hero"
            : idx === 1
              ? "Profile View"
              : idx === 2
                ? "In the Box & Details"
                : `Photo ${idx + 1}`,
      });
    });
  } else {
    imagesList.push({ key: "headphones", label: "Studio Hero" });
  }

  // Include any variant-specific color photos that aren't already in the list
  const v = (p.variants && typeof p.variants === "object" ? p.variants : {}) as any;
  if (Array.isArray(v.colors)) {
    v.colors.forEach((c: any) => {
      if (c.image && !imagesList.some((item) => item.key === c.image)) {
        imagesList.push({
          key: c.image,
          label: `${c.name || "Color"} Edition`,
        });
      }
    });
  }

  // If we have multiple images, return them
  if (imagesList.length > 1) {
    return imagesList.map((item) => ({
      src: imageSrc(item.key),
      label: item.label,
    }));
  }

  // Otherwise, synthesize realistic studio views & accessory pairings
  const primaryKey = imagesList[0]?.key ?? "headphones";
  const primarySrc = imageSrc(primaryKey);
  const secondaryKey =
    primaryKey === "headphones"
      ? "earbuds"
      : primaryKey === "keyboard"
        ? "mouse"
        : primaryKey === "charger"
          ? "cable"
          : primaryKey === "powerbank"
            ? "cable"
            : primaryKey === "speaker"
              ? "headphones"
              : "charger";

  return [
    { src: primarySrc, label: "Studio Hero" },
    { src: primarySrc, label: "Detailed Profile" },
    { src: imageSrc(secondaryKey), label: "In the Box & Pairings" },
  ];
}

export type ProductVariantInfo = {
  colors: { name: string; hex: string; image?: string }[];
  variantType?: string;
  sizes: { name: string; extraPrice?: number; stock?: number; specsNote?: string }[];
  inBox: string[];
};

export const PRODUCT_VARIANTS: Record<string, ProductVariantInfo> = {
  "hush-pro-headphones": {
    colors: [
      { name: "Sage Olive", hex: "#6f7d6e" },
      { name: "Matte Black", hex: "#1f2123" },
      { name: "Sand Beige", hex: "#d8cfc4" },
    ],
    sizes: [
      { name: "Standard (Wireless)", extraPrice: 0 },
      { name: "Pro Bundle (+Hard Case)", extraPrice: 2000 },
    ],
    inBox: [
      "Hush Pro ANC Headphones",
      "Braided USB-C Charging Cable (1.2m)",
      "3.5mm Gold-Plated Audio Cable",
      "Protective Carry Pouch",
      "Quick Start Guide",
    ],
  },
  "pebble-buds": {
    colors: [
      { name: "Chalk White", hex: "#f3f4f6" },
      { name: "Charcoal Grey", hex: "#4b5563" },
      { name: "Sunset Orange", hex: "#ea580c" },
    ],
    sizes: [
      { name: "Standard Charging Case", extraPrice: 0 },
      { name: "Qi Wireless Case", extraPrice: 1500 },
    ],
    inBox: [
      "Pebble Wireless Earbuds (L/R)",
      "Pocket Charging Case",
      "Silicone Ear Tips (S/M/L)",
      "USB-C Charging Cable",
    ],
  },
  "clack-75-keyboard": {
    colors: [
      { name: "Warm Ochre", hex: "#d97706" },
      { name: "Industrial Slate", hex: "#334155" },
      { name: "Retro Cream", hex: "#e5e7eb" },
    ],
    sizes: [
      { name: "Gateron Yellow (Linear - Smooth)", extraPrice: 0 },
      { name: "Gateron Brown (Tactile - Snappy)", extraPrice: 500 },
      { name: "Silent Red (Office Friendly)", extraPrice: 1000 },
    ],
    inBox: [
      "Clack 75 Mechanical Keyboard",
      "2.4GHz Wireless Nano Dongle",
      "Coiled USB-C Braided Cable",
      "Keycap & Switch Puller Tool",
      "Extra Accent Keycaps",
    ],
  },
  "boombox-mini-speaker": {
    colors: [
      { name: "Terracotta Orange", hex: "#c2410c" },
      { name: "Forest Olive", hex: "#3f6212" },
      { name: "Stealth Black", hex: "#18181b" },
    ],
    sizes: [
      { name: "Single Unit", extraPrice: 0 },
      { name: "Stereo Duo Pack (Pairable)", extraPrice: 7500 },
    ],
    inBox: [
      "Boombox Mini Speaker",
      "Heavy-Duty Carry Loop",
      "Type-C Quick Cable",
      "Instruction Manual",
    ],
  },
  "zap-65w-charger": {
    colors: [
      { name: "Arctic White", hex: "#f8fafc" },
      { name: "Graphite Black", hex: "#27272a" },
    ],
    sizes: [
      { name: "65W GaN (3 Ports: 2x Type-C + 1x USB-A)", extraPrice: 0 },
      { name: "100W GaN (4 Ports: 3x Type-C + 1x USB-A)", extraPrice: 2500 },
    ],
    inBox: [
      "Zap GaN Multi-Port Fast Charger",
      "100W E-Marker Fast Charge Cable (1m)",
      "Warranty Card",
    ],
  },
  "brick-20k-power-bank": {
    colors: [
      { name: "Matte Black", hex: "#18181b" },
      { name: "Space Grey", hex: "#52525b" },
    ],
    sizes: [
      { name: "20,000 mAh (22.5W Fast Charge)", extraPrice: 0 },
      { name: "30,000 mAh Max (65W Laptop Out)", extraPrice: 3500 },
    ],
    inBox: ["Brick 20K High-Density Power Bank", "Short 30cm Fast USB-C Cable", "Travel Pouch"],
  },
  "glide-mouse": {
    colors: [
      { name: "Sage Olive", hex: "#4d534b" },
      { name: "Chalk White", hex: "#e5e5e5" },
      { name: "Stealth Black", hex: "#171717" },
    ],
    sizes: [
      { name: "Standard Ergonomic", extraPrice: 0 },
      { name: "Travel Slim", extraPrice: 0 },
    ],
    inBox: ["Glide Ergonomic Mouse", "USB-A / Type-C Dual Receiver", "USB-C Charging Cable"],
  },
  "noodle-usb-c-cable": {
    colors: [
      { name: "High-Vis Orange", hex: "#f97316" },
      { name: "Braided Charcoal", hex: "#27272a" },
      { name: "Electric Blue", hex: "#0284c7" },
    ],
    sizes: [
      { name: "1.2 Metres (Desk/Car)", extraPrice: 0 },
      { name: "2.0 Metres (Bedside/Couch)", extraPrice: 400 },
      { name: "3.0 Metres (Studio Setup)", extraPrice: 800 },
    ],
    inBox: ["Noodle 100W Heavy-Duty Braided Cable", "Silicone Cable Tidy Strap"],
  },
};

export function getProductVariants(p: Product): ProductVariantInfo {
  if (p.variants && typeof p.variants === "object") {
    const v = p.variants as any;
    const colors = Array.isArray(v.colors) && v.colors.length > 0 ? v.colors : [];
    const sizes = Array.isArray(v.sizes) && v.sizes.length > 0 ? v.sizes : [];
    const inBox = Array.isArray(v.inBox) && v.inBox.length > 0 ? v.inBox : undefined;
    if (colors.length > 0 || sizes.length > 0 || inBox) {
      return {
        colors: colors.length > 0 ? colors : [{ name: "Standard", hex: "#1f2123" }],
        variantType:
          typeof v.variantType === "string" && v.variantType ? v.variantType : "Size / Option",
        sizes:
          sizes.length > 0
            ? sizes.map((s: any) => ({
                name: s.name,
                extraPrice: Number(s.extraPrice) || 0,
                stock: typeof s.stock === "number" ? s.stock : undefined,
                specsNote: s.specsNote,
              }))
            : [{ name: "Standard", extraPrice: 0 }],
        inBox: inBox || [`${p.name}`, "Official Packaging", "Warranty Card"],
      };
    }
  }

  if (PRODUCT_VARIANTS[p.slug]) {
    return PRODUCT_VARIANTS[p.slug];
  }
  return {
    colors: [
      { name: "Standard Edition", hex: "#222222" },
      { name: "Minimal White", hex: "#f4f4f5" },
    ],
    variantType: "Size / Option",
    sizes: [{ name: "Standard", extraPrice: 0 }],
    inBox: [`${p.name}`, "USB-C Cable", "Official Warranty Card"],
  };
}

export function formatPKR(n: number) {
  return "Rs " + n.toLocaleString("en-PK");
}

export function effectivePrice(p: Pick<Product, "price" | "sale_price">) {
  return p.sale_price != null && p.sale_price < p.price ? p.sale_price : p.price;
}

export function availability(p: Pick<Product, "stock" | "low_stock_threshold">) {
  if (p.stock <= 0) return { label: "Sold out", tone: "out" as const };
  if (p.stock <= p.low_stock_threshold)
    return { label: `Only ${p.stock} left`, tone: "low" as const };
  return { label: "In stock", tone: "ok" as const };
}

export type ShopSearch = {
  q?: string | undefined;
  cat?: string | undefined;
  sort?: "new" | "price-asc" | "price-desc" | undefined;
};

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: () => getCategories(),
});
export const settingsQuery = queryOptions({
  queryKey: ["settings"],
  queryFn: () => getStoreSettings(),
});
export const productsQuery = (s: ShopSearch & { featured?: boolean } = {}) =>
  queryOptions({ queryKey: ["products", s], queryFn: () => getProducts({ data: s }) });
export const productQuery = (slug: string) =>
  queryOptions({ queryKey: ["product", slug], queryFn: () => getProduct({ data: { slug } }) });
export const publicReviewsQuery = (filters: { productSlug?: string; city?: string } = {}) =>
  queryOptions({
    queryKey: ["public-reviews", filters],
    queryFn: () => getPublicReviews({ data: filters }),
  });

