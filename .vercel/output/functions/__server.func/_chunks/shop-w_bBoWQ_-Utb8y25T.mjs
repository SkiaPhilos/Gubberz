import { n as queryOptions } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM-CziPrtnf.mjs";
import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-BeRm8ylW-_YMKcc_f.mjs";
import { a as numberType, c as stringType, i as literalType, n as booleanType, o as objectType, r as enumType, t as arrayType } from "./_libs/zod-Bbj5tsZ5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-w_bBoWQ_.js
var headphones_default = "/assets/headphones-CyNov5ld.jpg";
var earbuds_default = "/assets/earbuds-CKQ1F9_l.jpg";
var speaker_default = "/assets/speaker-DNQdob37.jpg";
var charger_default = "/assets/charger-CBaTwyt6.jpg";
var powerbank_default = "/assets/powerbank-BvuZXaBT.jpg";
var keyboard_default = "/assets/keyboard-6d1WHU_j.jpg";
var mouse_default = "/assets/mouse-Bzbxos6P.jpg";
var cable_default = "/assets/cable-DoRGqUvc.jpg";
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
(/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString(), (/* @__PURE__ */ new Date()).toISOString();
var getCategories = createServerFn({ method: "GET" }).handler(createSsrRpc("551ccd044b267d9938aaf29ca254a3cee37f775777225ec6ae9cbd9074e502ac"));
var getProducts = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	q: stringType().max(100).optional(),
	cat: stringType().max(60).optional(),
	sort: enumType([
		"new",
		"price-asc",
		"price-desc"
	]).optional(),
	featured: booleanType().optional()
}).parse(d ?? {})).handler(createSsrRpc("291c5c0d75020f7398be6db3e96ff2c4648e55faf9077b5a4c8bfced75cae90f"));
var getProduct = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType().max(120) }).parse(d)).handler(createSsrRpc("8fcb0253bf3c1c167b9da7ce06410812f0527d2f561cf0a09fe48379367bcb16"));
var getStoreSettings = createServerFn({ method: "GET" }).handler(createSsrRpc("6248cfa4b9b924b7ff0d8a3f72c9a5b1d522b340a5209cdea7d6aada219a276b"));
var orderSchema = objectType({
	customer: objectType({
		name: stringType().trim().min(2).max(120),
		phone: stringType().trim().min(10).max(30),
		email: stringType().trim().max(200).email().or(literalType("")),
		address: stringType().trim().min(5).max(500),
		city: stringType().trim().min(2).max(80),
		notes: stringType().trim().max(500)
	}),
	items: arrayType(objectType({
		id: stringType().uuid(),
		qty: numberType().int().min(1).max(99)
	})).min(1).max(50),
	method: enumType([
		"cod",
		"jazzcash",
		"nayapay",
		"easypaisa",
		"bank_transfer",
		"iban",
		"raast"
	]),
	proof: stringType().max(300).nullable()
});
var placeOrder = createServerFn({ method: "POST" }).inputValidator((d) => orderSchema.parse(d)).handler(createSsrRpc("4a5b5c7242d797131b39b6996bbc47cc3c96b91a3cd93e2e1472fab1365fe03a"));
var lookupOrder = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	code: stringType().trim().min(4).max(20),
	phone: stringType().trim().min(10).max(30)
}).parse(d)).handler(createSsrRpc("4b3705fce6c07bcc335433bddd4720335afd1791971bfc151ec35672b27b261e"));
var IMAGES = {
	headphones: headphones_default,
	earbuds: earbuds_default,
	speaker: speaker_default,
	charger: charger_default,
	powerbank: powerbank_default,
	keyboard: keyboard_default,
	mouse: mouse_default,
	cable: cable_default
};
/** Images are stored as keys (bundled art) or full URLs (uploaded later). */
function imageSrc(key) {
	if (!key) return headphones_default;
	if (key.startsWith("http") || key.startsWith("data:")) return key;
	return IMAGES[key] ?? "/assets/headphones-CyNov5ld.jpg";
}
/** Provides multiple gallery photos for any product */
function productGallery(p) {
	if (p.images && p.images.length > 1) return p.images.map((img, idx) => ({
		src: imageSrc(img),
		label: idx === 0 ? "Front view" : idx === 1 ? "Side angle" : `View ${idx + 1}`
	}));
	const primaryKey = p.images[0] ?? "headphones";
	const primarySrc = imageSrc(primaryKey);
	return [
		{
			src: primarySrc,
			label: "Studio Hero"
		},
		{
			src: primarySrc,
			label: "Detailed Profile"
		},
		{
			src: imageSrc(primaryKey === "headphones" ? "earbuds" : primaryKey === "keyboard" ? "mouse" : primaryKey === "charger" ? "cable" : primaryKey === "powerbank" ? "cable" : primaryKey === "speaker" ? "headphones" : "charger"),
			label: "In the Box & Pairings"
		}
	];
}
var PRODUCT_VARIANTS = {
	"hush-pro-headphones": {
		colors: [
			{
				name: "Sage Olive",
				hex: "#6f7d6e"
			},
			{
				name: "Matte Black",
				hex: "#1f2123"
			},
			{
				name: "Sand Beige",
				hex: "#d8cfc4"
			}
		],
		sizes: [{
			name: "Standard (Wireless)",
			extraPrice: 0
		}, {
			name: "Pro Bundle (+Hard Case)",
			extraPrice: 2e3
		}],
		inBox: [
			"Hush Pro ANC Headphones",
			"Braided USB-C Charging Cable (1.2m)",
			"3.5mm Gold-Plated Audio Cable",
			"Protective Carry Pouch",
			"Quick Start Guide"
		]
	},
	"pebble-buds": {
		colors: [
			{
				name: "Chalk White",
				hex: "#f3f4f6"
			},
			{
				name: "Charcoal Grey",
				hex: "#4b5563"
			},
			{
				name: "Sunset Orange",
				hex: "#ea580c"
			}
		],
		sizes: [{
			name: "Standard Charging Case",
			extraPrice: 0
		}, {
			name: "Qi Wireless Case",
			extraPrice: 1500
		}],
		inBox: [
			"Pebble Wireless Earbuds (L/R)",
			"Pocket Charging Case",
			"Silicone Ear Tips (S/M/L)",
			"USB-C Charging Cable"
		]
	},
	"clack-75-keyboard": {
		colors: [
			{
				name: "Warm Ochre",
				hex: "#d97706"
			},
			{
				name: "Industrial Slate",
				hex: "#334155"
			},
			{
				name: "Retro Cream",
				hex: "#e5e7eb"
			}
		],
		sizes: [
			{
				name: "Gateron Yellow (Linear - Smooth)",
				extraPrice: 0
			},
			{
				name: "Gateron Brown (Tactile - Snappy)",
				extraPrice: 500
			},
			{
				name: "Silent Red (Office Friendly)",
				extraPrice: 1e3
			}
		],
		inBox: [
			"Clack 75 Mechanical Keyboard",
			"2.4GHz Wireless Nano Dongle",
			"Coiled USB-C Braided Cable",
			"Keycap & Switch Puller Tool",
			"Extra Accent Keycaps"
		]
	},
	"boombox-mini-speaker": {
		colors: [
			{
				name: "Terracotta Orange",
				hex: "#c2410c"
			},
			{
				name: "Forest Olive",
				hex: "#3f6212"
			},
			{
				name: "Stealth Black",
				hex: "#18181b"
			}
		],
		sizes: [{
			name: "Single Unit",
			extraPrice: 0
		}, {
			name: "Stereo Duo Pack (Pairable)",
			extraPrice: 7500
		}],
		inBox: [
			"Boombox Mini Speaker",
			"Heavy-Duty Carry Loop",
			"Type-C Quick Cable",
			"Instruction Manual"
		]
	},
	"zap-65w-charger": {
		colors: [{
			name: "Arctic White",
			hex: "#f8fafc"
		}, {
			name: "Graphite Black",
			hex: "#27272a"
		}],
		sizes: [{
			name: "65W GaN (3 Ports: 2x Type-C + 1x USB-A)",
			extraPrice: 0
		}, {
			name: "100W GaN (4 Ports: 3x Type-C + 1x USB-A)",
			extraPrice: 2500
		}],
		inBox: [
			"Zap GaN Multi-Port Fast Charger",
			"100W E-Marker Fast Charge Cable (1m)",
			"Warranty Card"
		]
	},
	"brick-20k-power-bank": {
		colors: [{
			name: "Matte Black",
			hex: "#18181b"
		}, {
			name: "Space Grey",
			hex: "#52525b"
		}],
		sizes: [{
			name: "20,000 mAh (22.5W Fast Charge)",
			extraPrice: 0
		}, {
			name: "30,000 mAh Max (65W Laptop Out)",
			extraPrice: 3500
		}],
		inBox: [
			"Brick 20K High-Density Power Bank",
			"Short 30cm Fast USB-C Cable",
			"Travel Pouch"
		]
	},
	"glide-mouse": {
		colors: [
			{
				name: "Sage Olive",
				hex: "#4d534b"
			},
			{
				name: "Chalk White",
				hex: "#e5e5e5"
			},
			{
				name: "Stealth Black",
				hex: "#171717"
			}
		],
		sizes: [{
			name: "Standard Ergonomic",
			extraPrice: 0
		}, {
			name: "Travel Slim",
			extraPrice: 0
		}],
		inBox: [
			"Glide Ergonomic Mouse",
			"USB-A / Type-C Dual Receiver",
			"USB-C Charging Cable"
		]
	},
	"noodle-usb-c-cable": {
		colors: [
			{
				name: "High-Vis Orange",
				hex: "#f97316"
			},
			{
				name: "Braided Charcoal",
				hex: "#27272a"
			},
			{
				name: "Electric Blue",
				hex: "#0284c7"
			}
		],
		sizes: [
			{
				name: "1.2 Metres (Desk/Car)",
				extraPrice: 0
			},
			{
				name: "2.0 Metres (Bedside/Couch)",
				extraPrice: 400
			},
			{
				name: "3.0 Metres (Studio Setup)",
				extraPrice: 800
			}
		],
		inBox: ["Noodle 100W Heavy-Duty Braided Cable", "Silicone Cable Tidy Strap"]
	}
};
function getProductVariants(p) {
	if (PRODUCT_VARIANTS[p.slug]) return PRODUCT_VARIANTS[p.slug];
	return {
		colors: [{
			name: "Standard Edition",
			hex: "#222222"
		}, {
			name: "Minimal White",
			hex: "#f4f4f5"
		}],
		sizes: [{
			name: "Standard",
			extraPrice: 0
		}],
		inBox: [
			`${p.name}`,
			"USB-C Cable",
			"Official Warranty Card"
		]
	};
}
function formatPKR(n) {
	return "Rs " + n.toLocaleString("en-PK");
}
function effectivePrice(p) {
	return p.sale_price != null && p.sale_price < p.price ? p.sale_price : p.price;
}
function availability(p) {
	if (p.stock <= 0) return {
		label: "Sold out",
		tone: "out"
	};
	if (p.stock <= p.low_stock_threshold) return {
		label: `Only ${p.stock} left`,
		tone: "low"
	};
	return {
		label: "In stock",
		tone: "ok"
	};
}
var categoriesQuery = queryOptions({
	queryKey: ["categories"],
	queryFn: () => getCategories()
});
var settingsQuery = queryOptions({
	queryKey: ["settings"],
	queryFn: () => getStoreSettings()
});
var productsQuery = (s = {}) => queryOptions({
	queryKey: ["products", s],
	queryFn: () => getProducts({ data: s })
});
var productQuery = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: () => getProduct({ data: { slug } })
});
//#endregion
export { formatPKR as a, lookupOrder as c, productQuery as d, productsQuery as f, effectivePrice as i, placeOrder as l, categoriesQuery as n, getProductVariants as o, settingsQuery as p, createSsrRpc as r, imageSrc as s, availability as t, productGallery as u };
