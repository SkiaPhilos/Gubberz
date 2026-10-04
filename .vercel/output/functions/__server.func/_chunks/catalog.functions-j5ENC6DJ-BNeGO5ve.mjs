import { l as createServerFn } from "./createServerFn-DDDJMFWM-CziPrtnf.mjs";
import { t as createClient } from "./_libs/@supabase/supabase-js-CYPv1zA8.mjs";
import { a as numberType, c as stringType, i as literalType, n as booleanType, o as objectType, r as enumType, t as arrayType } from "./_libs/zod-Bbj5tsZ5.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P-DiPHtqFZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-j5ENC6DJ.js
function publicClient() {
	const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"] || "";
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_ANON_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_ANON_KEY"] || "";
	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const h = new Headers(init?.headers);
			if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
			h.set("apikey", key);
			return fetch(input, {
				...init,
				headers: h
			});
		} }
	});
}
var PRODUCT_COLS = "id,name,slug,sku,brand,short_description,description,price,sale_price,stock,low_stock_threshold,images,specs,features,tags,featured,created_at,category:categories(name,slug)";
var DEFAULT_CATEGORIES = [
	{
		id: "cat-audio",
		name: "Audio",
		slug: "audio",
		blurb: "Things that go in, on or near your ears."
	},
	{
		id: "cat-power",
		name: "Power",
		slug: "power",
		blurb: "Chargers and power banks. Juice, basically."
	},
	{
		id: "cat-desk",
		name: "Desk",
		slug: "desk",
		blurb: "Keyboards, mice and desk things."
	},
	{
		id: "cat-cables",
		name: "Cables",
		slug: "cables",
		blurb: "The spaghetti of modern life."
	}
];
var DEFAULT_PRODUCTS = [
	{
		id: "prod-hush-pro",
		name: "Hush Pro Headphones",
		slug: "hush-pro-headphones",
		sku: "GBZ-AUD-001",
		brand: "Gubberz Audio",
		short_description: "Over-ear, noise cancelling, 40h battery",
		description: "Big soft cushions, serious noise cancelling and a battery that outlasts your attention span.",
		price: 18999,
		sale_price: 15999,
		stock: 12,
		low_stock_threshold: 3,
		images: ["headphones"],
		specs: {
			Battery: "40 hours",
			Connection: "Bluetooth 5.3",
			Weight: "250 g",
			Charging: "USB-C"
		},
		features: [
			"Active noise cancelling",
			"40-hour battery",
			"Fold-flat design",
			"Multipoint pairing"
		],
		tags: ["wireless", "anc"],
		featured: true,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		category: {
			name: "Audio",
			slug: "audio"
		}
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
		specs: {
			Battery: "6h + 24h case",
			Connection: "Bluetooth 5.3",
			"Water resistance": "IPX4"
		},
		features: [
			"Touch controls",
			"IPX4 sweat resistant",
			"Low-latency mode"
		],
		tags: ["wireless"],
		featured: true,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		category: {
			name: "Audio",
			slug: "audio"
		}
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
		specs: {
			Battery: "12 hours",
			Output: "10 W",
			"Water resistance": "IPX6"
		},
		features: [
			"Splash proof",
			"Stereo pairing",
			"Built-in mic"
		],
		tags: ["portable"],
		featured: true,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		category: {
			name: "Audio",
			slug: "audio"
		}
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
		specs: {
			Output: "65 W max",
			Ports: "2x USB-C, 1x USB-A",
			Tech: "GaN"
		},
		features: [
			"GaN — runs cool",
			"Foldable pins",
			"Laptop capable"
		],
		tags: ["gan", "usb-c"],
		featured: false,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		category: {
			name: "Power",
			slug: "power"
		}
	},
	{
		id: "prod-brick-20k",
		name: "Brick 20K Power Bank",
		slug: "brick-20k-power-bank",
		sku: "GBZ-PWR-002",
		brand: "Zap",
		short_description: "20,000 mAh, 22.5W fast charge",
		description: "Charges your phone about four times. Heavier than a sandwich, lighter than regret.",
		price: 6499,
		sale_price: 5499,
		stock: 5,
		low_stock_threshold: 3,
		images: ["powerbank"],
		specs: {
			Capacity: "20,000 mAh",
			Output: "22.5 W",
			Ports: "USB-C, 2x USB-A"
		},
		features: [
			"Fast charge",
			"LED level display",
			"Charges 3 devices"
		],
		tags: ["portable"],
		featured: false,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		category: {
			name: "Power",
			slug: "power"
		}
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
		specs: {
			Layout: "75%",
			Switches: "Hot-swap, linear",
			Connection: "Bluetooth / 2.4G / USB-C"
		},
		features: [
			"Hot-swappable switches",
			"Tri-mode wireless",
			"Gasket mount"
		],
		tags: ["mechanical"],
		featured: true,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		category: {
			name: "Desk",
			slug: "desk"
		}
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
		specs: {
			DPI: "800–4000",
			Battery: "70 days",
			Connection: "Bluetooth / 2.4G"
		},
		features: [
			"Silent clicks",
			"Multi-device",
			"Ergonomic shape"
		],
		tags: ["wireless"],
		featured: false,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		category: {
			name: "Desk",
			slug: "desk"
		}
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
		specs: {
			Length: "2 m",
			Power: "100 W",
			Data: "480 Mbps"
		},
		features: [
			"Braided nylon",
			"100W PD",
			"Tangle resistant"
		],
		tags: ["usb-c"],
		featured: false,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		category: {
			name: "Cables",
			slug: "cables"
		}
	}
];
var getCategories_createServerFn_handler = createServerRpc({
	id: "551ccd044b267d9938aaf29ca254a3cee37f775777225ec6ae9cbd9074e502ac",
	name: "getCategories",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getCategories.__executeServer(opts));
var getCategories = createServerFn({ method: "GET" }).handler(getCategories_createServerFn_handler, async () => {
	try {
		const { data, error } = await publicClient().from("categories").select("id,name,slug,blurb").order("sort_order");
		if (error || !data || data.length === 0) return DEFAULT_CATEGORIES;
		return data;
	} catch {
		return DEFAULT_CATEGORIES;
	}
});
var getProducts_createServerFn_handler = createServerRpc({
	id: "291c5c0d75020f7398be6db3e96ff2c4648e55faf9077b5a4c8bfced75cae90f",
	name: "getProducts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getProducts.__executeServer(opts));
var getProducts = createServerFn({ method: "GET" }).inputValidator((d) => objectType({
	q: stringType().max(100).optional(),
	cat: stringType().max(60).optional(),
	sort: enumType([
		"new",
		"price-asc",
		"price-desc"
	]).optional(),
	featured: booleanType().optional()
}).parse(d ?? {})).handler(getProducts_createServerFn_handler, async ({ data }) => {
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
				fallback = fallback.filter((p) => p.name.toLowerCase().includes(needle) || p.short_description?.toLowerCase().includes(needle));
			}
			if (data.cat) fallback = fallback.filter((p) => p.category?.slug === data.cat);
			if (data.sort === "price-asc") fallback.sort((a, b) => a.price - b.price);
			else if (data.sort === "price-desc") fallback.sort((a, b) => b.price - a.price);
			return fallback;
		}
		let list = rows;
		if (data.cat) list = list.filter((p) => p.category?.slug === data.cat);
		return list;
	} catch {
		let fallback = [...DEFAULT_PRODUCTS];
		if (data.featured) fallback = fallback.filter((p) => p.featured);
		if (data.q) {
			const needle = data.q.toLowerCase();
			fallback = fallback.filter((p) => p.name.toLowerCase().includes(needle) || p.short_description?.toLowerCase().includes(needle));
		}
		if (data.cat) fallback = fallback.filter((p) => p.category?.slug === data.cat);
		if (data.sort === "price-asc") fallback.sort((a, b) => a.price - b.price);
		else if (data.sort === "price-desc") fallback.sort((a, b) => b.price - a.price);
		return fallback;
	}
});
var getProduct_createServerFn_handler = createServerRpc({
	id: "8fcb0253bf3c1c167b9da7ce06410812f0527d2f561cf0a09fe48379367bcb16",
	name: "getProduct",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getProduct.__executeServer(opts));
var getProduct = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ slug: stringType().max(120) }).parse(d)).handler(getProduct_createServerFn_handler, async ({ data }) => {
	try {
		const { data: row, error } = await publicClient().from("products").select(PRODUCT_COLS).eq("slug", data.slug).maybeSingle();
		if (error || !row) return DEFAULT_PRODUCTS.find((p) => p.slug === data.slug) ?? null;
		return row ?? null;
	} catch {
		return DEFAULT_PRODUCTS.find((p) => p.slug === data.slug) ?? null;
	}
});
var DEFAULT_ACCOUNTS = [
	{
		id: "jazzcash",
		label: "JazzCash",
		account_title: "Gubberz",
		account_number: "+92 327 4393495",
		enabled: true
	},
	{
		id: "nayapay",
		label: "NayaPay",
		account_title: "Gubberz",
		account_number: "4782 7800 6321 6637",
		enabled: true
	},
	{
		id: "easypaisa",
		label: "Easypaisa",
		account_title: "Gubberz Store (Placeholder)",
		account_number: "+92 300 1234567",
		enabled: true,
		isPlaceholder: true
	},
	{
		id: "bank_transfer",
		label: "Bank Transfer / Raast / IBAN",
		account_title: "Gubberz Tech (Placeholder)",
		account_number: "PK89MEZN0001020304050607 · Raast: 923274393495",
		enabled: true,
		isPlaceholder: true
	}
];
var getStoreSettings_createServerFn_handler = createServerRpc({
	id: "6248cfa4b9b924b7ff0d8a3f72c9a5b1d522b340a5209cdea7d6aada219a276b",
	name: "getStoreSettings",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getStoreSettings.__executeServer(opts));
var getStoreSettings = createServerFn({ method: "GET" }).handler(getStoreSettings_createServerFn_handler, async () => {
	const { data } = await publicClient().from("store_settings").select("key,value");
	const map = {};
	for (const r of data ?? []) map[r.key] = r.value;
	const accountsFromDb = Array.isArray(map["payment_methods"]) ? map["payment_methods"] : [];
	const mergedAccounts = [...DEFAULT_ACCOUNTS];
	for (const dbAcc of accountsFromDb) {
		const idx = mergedAccounts.findIndex((a) => a.id === dbAcc.id);
		if (idx >= 0) mergedAccounts[idx] = {
			...dbAcc,
			isPlaceholder: false
		};
		else mergedAccounts.push(dbAcc);
	}
	return {
		whatsapp: String(map["whatsapp_number"] ?? "923274393495"),
		email: String(map["contact_email"] ?? "maniacphilos@gmail.com"),
		advanceDiscount: Number(map["advance_payment_discount_percent"] ?? 5),
		deliveryFee: Number(map["delivery_fee"] ?? 250),
		accounts: mergedAccounts.filter((a) => a.enabled)
	};
});
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
var placeOrder_createServerFn_handler = createServerRpc({
	id: "4a5b5c7242d797131b39b6996bbc47cc3c96b91a3cd93e2e1472fab1365fe03a",
	name: "placeOrder",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).inputValidator((d) => orderSchema.parse(d)).handler(placeOrder_createServerFn_handler, async ({ data }) => {
	const isStandardDbMethod = [
		"cod",
		"jazzcash",
		"nayapay"
	].includes(data.method);
	const dbMethod = isStandardDbMethod ? data.method : "jazzcash";
	const customerNotes = !isStandardDbMethod ? `[Payment Method: ${data.method.toUpperCase().replace("_", " ")}] ${data.customer.notes || ""}`.trim() : data.customer.notes;
	const { data: res, error } = await publicClient().rpc("place_order", {
		p_customer: {
			...data.customer,
			notes: customerNotes
		},
		p_items: data.items,
		p_method: dbMethod,
		p_proof: data.proof ?? ""
	});
	if (error) return {
		ok: false,
		error: error.message.slice(0, 200)
	};
	return {
		ok: true,
		code: res.code
	};
});
var lookupOrder_createServerFn_handler = createServerRpc({
	id: "4b3705fce6c07bcc335433bddd4720335afd1791971bfc151ec35672b27b261e",
	name: "lookupOrder",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => lookupOrder.__executeServer(opts));
var lookupOrder = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	code: stringType().trim().min(4).max(20),
	phone: stringType().trim().min(10).max(30)
}).parse(d)).handler(lookupOrder_createServerFn_handler, async ({ data }) => {
	const { data: res, error } = await publicClient().rpc("lookup_order", {
		p_code: data.code,
		p_phone: data.phone
	});
	if (error) throw new Error("Could not look up order");
	return res ?? null;
});
//#endregion
export { getCategories_createServerFn_handler, getProduct_createServerFn_handler, getProducts_createServerFn_handler, getStoreSettings_createServerFn_handler, lookupOrder_createServerFn_handler, placeOrder_createServerFn_handler };
