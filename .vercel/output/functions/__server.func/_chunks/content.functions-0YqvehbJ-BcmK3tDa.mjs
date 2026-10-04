import { l as createServerFn } from "./createServerFn-DDDJMFWM-CziPrtnf.mjs";
import { t as createClient } from "./_libs/@supabase/supabase-js-CYPv1zA8.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P-DiPHtqFZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content.functions-0YqvehbJ.js
function publicClient() {
	const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"] || "";
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_ANON_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_ANON_KEY"] || "";
	return createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
			headers.set("apikey", key);
			return fetch(input, {
				...init,
				headers
			});
		} }
	});
}
var DEFAULT_HOME_SECTIONS = [
	{
		id: "sec-hero",
		section_type: "hero",
		eyebrow: "The New Lineup",
		title: "Ordinary gadgets, built with care.",
		body: "Delivered across Pakistan with cash on delivery and instant advance payment discounts.",
		media_key: "headphones",
		character_key: "sitter",
		product_slugs: [
			"hush-pro-headphones",
			"pebble-buds",
			"boombox-mini-speaker"
		],
		category_slugs: ["audio", "power"],
		cta_label: "Shop Now",
		cta_href: "/shop",
		theme: "paper",
		layout: "standard",
		sort_order: 1,
		published: true,
		settings: {}
	},
	{
		id: "sec-cat-index",
		section_type: "category_index",
		eyebrow: "Browse Catalog",
		title: "Curated by department.",
		body: null,
		media_key: null,
		character_key: null,
		product_slugs: [],
		category_slugs: [
			"audio",
			"power",
			"desk",
			"cables"
		],
		cta_label: "Browse All",
		cta_href: "/shop",
		theme: "paper",
		layout: "standard",
		sort_order: 2,
		published: true,
		settings: {}
	},
	{
		id: "sec-edit",
		section_type: "product_edit",
		eyebrow: "Editorial Pick",
		title: "The Daily Carry.",
		body: "Our favourite daily drivers: mechanical precision, long battery life, and cables that never tangle.",
		media_key: null,
		character_key: null,
		product_slugs: [
			"hush-pro-headphones",
			"clack-75-keyboard",
			"glide-mouse",
			"zap-65w-charger"
		],
		category_slugs: [],
		cta_label: "Shop The Edit",
		cta_href: "/shop",
		theme: "paper",
		layout: "standard",
		sort_order: 3,
		published: true,
		settings: {}
	},
	{
		id: "sec-character",
		section_type: "character",
		eyebrow: "Quality Tested",
		title: "Tested on real ears. Over and over.",
		body: "Every single gadget in the Gubberz collection is checked for real-world battery endurance, drop resistance, and thermal management under Pakistani voltage fluctuations.",
		media_key: null,
		character_key: "sitter",
		product_slugs: [],
		category_slugs: [],
		cta_label: "Learn More",
		cta_href: "/policies",
		theme: "dark",
		layout: "standard",
		sort_order: 4,
		published: true,
		settings: {}
	},
	{
		id: "sec-rail",
		section_type: "product_rail",
		eyebrow: "Trending Now",
		title: "Popular across Pakistan.",
		body: "Fast-moving items with high stock turnover.",
		media_key: null,
		character_key: null,
		product_slugs: [
			"boombox-mini-speaker",
			"brick-20k-power-bank",
			"pebble-buds",
			"noodle-usb-c-cable"
		],
		category_slugs: [],
		cta_label: "View All",
		cta_href: "/shop",
		theme: "paper",
		layout: "standard",
		sort_order: 5,
		published: true,
		settings: {}
	}
];
var getHomeSections_createServerFn_handler = createServerRpc({
	id: "b8e9338a8e2ba564fda443a8f916c84c79a0c5804f0ce1d9ae1d4bd59f16ff61",
	name: "getHomeSections",
	filename: "src/lib/content.functions.ts"
}, (opts) => getHomeSections.__executeServer(opts));
var getHomeSections = createServerFn({ method: "GET" }).handler(getHomeSections_createServerFn_handler, async () => {
	try {
		const { data, error } = await publicClient().from("home_sections").select("id,section_type,eyebrow,title,body,media_key,character_key,product_slugs,category_slugs,cta_label,cta_href,theme,layout,sort_order,published,settings").eq("published", true).order("sort_order");
		if (error || !data || data.length === 0) return DEFAULT_HOME_SECTIONS;
		return data;
	} catch {
		return DEFAULT_HOME_SECTIONS;
	}
});
//#endregion
export { getHomeSections_createServerFn_handler };
