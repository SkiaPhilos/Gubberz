import { queryOptions } from "@tanstack/react-query";
import headphones from "@/assets/products/headphones.jpg";
import earbuds from "@/assets/products/earbuds.jpg";
import speaker from "@/assets/products/speaker.jpg";
import charger from "@/assets/products/charger.jpg";
import powerbank from "@/assets/products/powerbank.jpg";
import keyboard from "@/assets/products/keyboard.jpg";
import mouse from "@/assets/products/mouse.jpg";
import cable from "@/assets/products/cable.jpg";
import {
  getCategories,
  getProduct,
  getProducts,
  getStoreSettings,
  type Product,
} from "./catalog.functions";

const IMAGES: Record<string, string> = {
  headphones,
  earbuds,
  speaker,
  charger,
  powerbank,
  keyboard,
  mouse,
  cable,
};

/** Images are stored as keys (bundled art) or full URLs (uploaded later). */
export function imageSrc(key: string | undefined) {
  if (!key) return headphones;
  if (key.startsWith("http") || key.startsWith("data:")) return key;
  return IMAGES[key] ?? headphones;
}

/** Provides multiple gallery photos for any product */
export function productGallery(p: Product): { src: string; label: string }[] {
  // If product already has multiple uploaded images, use them
  if (p.images && p.images.length > 1) {
    return p.images.map((img, idx) => ({
      src: imageSrc(img),
      label: idx === 0 ? "Front view" : idx === 1 ? "Side angle" : `View ${idx + 1}`,
    }));
  }

  const primaryKey = p.images[0] ?? "headphones";
  const primarySrc = imageSrc(primaryKey);

  // Return realistic studio views and accessory detail shots for the product
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
  colors: { name: string; hex: string }[];
  sizes: { name: string; extraPrice?: number }[];
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
    inBox: [
      "Brick 20K High-Density Power Bank",
      "Short 30cm Fast USB-C Cable",
      "Travel Pouch",
    ],
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
    inBox: [
      "Glide Ergonomic Mouse",
      "USB-A / Type-C Dual Receiver",
      "USB-C Charging Cable",
    ],
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
    inBox: [
      "Noodle 100W Heavy-Duty Braided Cable",
      "Silicone Cable Tidy Strap",
    ],
  },
};

export function getProductVariants(p: Product): ProductVariantInfo {
  if (PRODUCT_VARIANTS[p.slug]) {
    return PRODUCT_VARIANTS[p.slug];
  }
  return {
    colors: [
      { name: "Standard Edition", hex: "#222222" },
      { name: "Minimal White", hex: "#f4f4f5" },
    ],
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
