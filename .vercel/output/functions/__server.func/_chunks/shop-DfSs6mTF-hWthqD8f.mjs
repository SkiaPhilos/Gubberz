import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { b as Link, x as useNavigate } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { r as useSuspenseQuery } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { a as formatPKR, f as productsQuery, i as effectivePrice, n as categoriesQuery, s as imageSrc } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { u as SlidersHorizontal } from "./_libs/lucide-react-DxlvYDqj.mjs";
import { n as useRecentlyViewed } from "./discovery-0BgSzSUb-tnoJgiXO.mjs";
import { t as ProductCard } from "./ProductCard-Y97FfztB-Bv_JARig.mjs";
import { n as lost_default, t as Route } from "./shop-DOkzqceB-DsNcWvKG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-DfSs6mTF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/shop.tsx?tsr-split=component";
function Shop() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: "/shop" });
	const { data: products } = useSuspenseQuery(productsQuery(search));
	const { data: cats } = useSuspenseQuery(categoriesQuery);
	const { items: recentlyViewed } = useRecentlyViewed();
	const [filterDrawerOpen, setFilterDrawerOpen] = (0, import_react.useState)(false);
	const activeCat = cats.find((c) => c.slug === search.cat);
	const filteredProducts = products.filter((p) => {
		const price = effectivePrice(p);
		if (search.priceRange === "under-5k" && price >= 5e3) return false;
		if (search.priceRange === "5k-15k" && (price < 5e3 || price > 15e3)) return false;
		if (search.priceRange === "over-15k" && price <= 15e3) return false;
		if (search.inStockOnly && p.stock <= 0) return false;
		if (search.onSaleOnly && (p.sale_price == null || p.sale_price >= p.price)) return false;
		return true;
	});
	const hasActiveFilters = Boolean(search.q || search.cat || search.priceRange || search.inStockOnly || search.onSaleOnly);
	const clearAllFilters = () => {
		navigate({ search: () => ({
			q: void 0,
			cat: void 0,
			sort: "new",
			priceRange: void 0,
			inStockOnly: void 0,
			onSaleOnly: void 0
		}) });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-7xl px-5 pt-12 md:px-8 pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
					children: [
						"Showing ",
						filteredProducts.length,
						" of ",
						products.length,
						" ",
						products.length === 1 ? "gadget" : "gadgets"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 9
				}, this), hasActiveFilters && /* @__PURE__ */ (void 0)("button", {
					onClick: clearAllFilters,
					className: "press text-xs font-mono text-primary hover:underline",
					children: "Reset all filters"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 30
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-2 text-5xl font-extrabold tracking-tight md:text-7xl",
				children: search.q ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
					"“",
					search.q,
					"”"
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 62,
					columnNumber: 21
				}, this) : activeCat ? activeCat.name : "Everything"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 61,
				columnNumber: 7
			}, this),
			activeCat?.blurb && /* @__PURE__ */ (void 0)("p", {
				className: "mt-3 text-lg text-muted-foreground",
				children: activeCat.blurb
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 28
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 flex flex-wrap items-center gap-2 border-b pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: !search.cat,
						onClick: () => navigate({ search: (s) => ({
							...s,
							cat: void 0
						}) }),
						children: "All"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 9
					}, this),
					cats.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip, {
						active: search.cat === c.slug,
						onClick: () => navigate({ search: (s) => ({
							...s,
							cat: c.slug
						}) }),
						children: c.name
					}, c.id, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 24
					}, this)),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "ml-auto flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setFilterDrawerOpen(!filterDrawerOpen),
							className: `press flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-semibold ${filterDrawerOpen || search.priceRange || search.inStockOnly || search.onSaleOnly ? "border-primary bg-primary/10 text-primary" : "border-border bg-surface text-foreground hover:bg-muted"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 87,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Filters" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 88,
									columnNumber: 13
								}, this),
								(search.priceRange || search.inStockOnly || search.onSaleOnly) && /* @__PURE__ */ (void 0)("span", { className: "flex h-2 w-2 rounded-full bg-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 89,
									columnNumber: 80
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 86,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								"aria-label": "Sort products",
								value: search.sort ?? "new",
								onChange: (e) => navigate({ search: (s) => ({
									...s,
									sort: e.target.value
								}) }),
								className: "h-10 rounded-full bg-surface px-4 text-xs font-semibold outline-none ring-primary focus:ring-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "new",
										children: "Sort: Newest"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 99,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "price-asc",
										children: "Price: Low to High"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 100,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "price-desc",
										children: "Price: High to Low"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 101,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 7
			}, this),
			filterDrawerOpen && /* @__PURE__ */ (void 0)("div", {
				className: "mt-4 rounded-3xl border bg-card p-6 shadow-xs animate-in fade-in duration-200",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between border-b pb-4",
					children: [/* @__PURE__ */ (void 0)("h3", {
						className: "font-bold text-sm",
						children: "Refine Gadgets"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => setFilterDrawerOpen(false),
						className: "text-xs text-muted-foreground hover:text-foreground",
						children: "Close ✕"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
							className: "font-mono text-xs uppercase text-muted-foreground mb-2",
							children: "Price Range"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								{
									label: "All Prices",
									val: void 0
								},
								{
									label: "Under Rs 5k",
									val: "under-5k"
								},
								{
									label: "Rs 5k – Rs 15k",
									val: "5k-15k"
								},
								{
									label: "Above Rs 15k",
									val: "over-15k"
								}
							].map((item) => /* @__PURE__ */ (void 0)("button", {
								onClick: () => navigate({ search: (s) => ({
									...s,
									priceRange: item.val
								}) }),
								className: `press rounded-full px-3 py-1.5 text-xs font-medium border ${search.priceRange === item.val || !search.priceRange && !item.val ? "border-primary bg-primary/10 text-primary font-bold" : "border-border/60 bg-surface text-muted-foreground"}`,
								children: item.label
							}, item.label, false, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 28
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
							className: "font-mono text-xs uppercase text-muted-foreground mb-2",
							children: "Availability"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-2 text-xs",
							children: [/* @__PURE__ */ (void 0)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (void 0)("input", {
									type: "checkbox",
									checked: Boolean(search.inStockOnly),
									onChange: (e) => navigate({ search: (s) => ({
										...s,
										inStockOnly: e.target.checked || void 0
									}) }),
									className: "rounded text-primary focus:ring-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "In Stock Only" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (void 0)("input", {
									type: "checkbox",
									checked: Boolean(search.onSaleOnly),
									onChange: (e) => navigate({ search: (s) => ({
										...s,
										onSaleOnly: e.target.checked || void 0
									}) }),
									className: "rounded text-primary focus:ring-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "On Sale Only" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 164,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-end justify-start sm:justify-end gap-3",
							children: [/* @__PURE__ */ (void 0)("button", {
								onClick: clearAllFilters,
								className: "press rounded-full bg-surface px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground",
								children: "Clear Filters"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => setFilterDrawerOpen(false),
								className: "press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground",
								children: "Apply Filters"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 116,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 28
			}, this),
			hasActiveFilters && /* @__PURE__ */ (void 0)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [
					search.q && /* @__PURE__ */ (void 0)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs",
						children: [
							"Keyword: \"",
							search.q,
							"\"",
							/* @__PURE__ */ (void 0)("button", {
								onClick: () => navigate({ search: (s) => ({
									...s,
									q: void 0
								}) }),
								className: "ml-1 text-muted-foreground hover:text-foreground",
								children: "✕"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 185,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 183,
						columnNumber: 24
					}, this),
					search.cat && /* @__PURE__ */ (void 0)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs",
						children: [
							"Category: ",
							activeCat?.name,
							/* @__PURE__ */ (void 0)("button", {
								onClick: () => navigate({ search: (s) => ({
									...s,
									cat: void 0
								}) }),
								className: "ml-1 text-muted-foreground hover:text-foreground",
								children: "✕"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 196,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 26
					}, this),
					search.priceRange && /* @__PURE__ */ (void 0)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs",
						children: [
							"Price: ",
							search.priceRange,
							/* @__PURE__ */ (void 0)("button", {
								onClick: () => navigate({ search: (s) => ({
									...s,
									priceRange: void 0
								}) }),
								className: "ml-1 text-muted-foreground hover:text-foreground",
								children: "✕"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 205,
						columnNumber: 33
					}, this),
					search.inStockOnly && /* @__PURE__ */ (void 0)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs",
						children: ["In Stock", /* @__PURE__ */ (void 0)("button", {
							onClick: () => navigate({ search: (s) => ({
								...s,
								inStockOnly: void 0
							}) }),
							className: "ml-1 text-muted-foreground hover:text-foreground",
							children: "✕"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 34
					}, this),
					search.onSaleOnly && /* @__PURE__ */ (void 0)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-surface border px-3 py-1 text-xs",
						children: ["On Sale", /* @__PURE__ */ (void 0)("button", {
							onClick: () => navigate({ search: (s) => ({
								...s,
								onSaleOnly: void 0
							}) }),
							className: "ml-1 text-muted-foreground hover:text-foreground",
							children: "✕"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 227,
						columnNumber: 33
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 182,
				columnNumber: 28
			}, this),
			filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: lost_default,
						alt: "",
						width: 1024,
						height: 1024,
						className: "w-40"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 242,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-2xl font-bold",
						children: "Nothing matches these filters."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-muted-foreground",
						children: "Try adjusting your price range, or clear filters to view all gadgets."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 244,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: clearAllFilters,
						className: "press mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground",
						children: "Clear all filters"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 247,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 241,
				columnNumber: 40
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product: p }, p.id, false, {
					fileName: _jsxFileName,
					lineNumber: 251,
					columnNumber: 38
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 250,
				columnNumber: 18
			}, this),
			recentlyViewed.length > 0 && /* @__PURE__ */ (void 0)("section", {
				className: "mt-28 border-t pt-16",
				children: [
					/* @__PURE__ */ (void 0)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
						children: "History"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h2", {
						className: "mt-1 text-2xl font-extrabold tracking-tight",
						children: "Recently viewed gadgets"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]",
						children: recentlyViewed.map((item) => /* @__PURE__ */ (void 0)(Link, {
							to: "/product/$slug",
							params: { slug: item.slug },
							className: "group flex w-48 shrink-0 flex-col rounded-3xl border bg-card p-3 transition-all hover:border-border hover:shadow-xs",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "aspect-square rounded-2xl bg-surface/80 p-3 flex items-center justify-center overflow-hidden",
									children: /* @__PURE__ */ (void 0)("img", {
										src: imageSrc(item.image),
										alt: item.name,
										className: "max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 265,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 264,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("h4", {
									className: "mt-3 truncate text-xs font-bold",
									children: item.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-0.5 font-mono text-xs text-primary font-bold",
									children: formatPKR(item.price)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 268,
									columnNumber: 17
								}, this)
							]
						}, item.id, true, {
							fileName: _jsxFileName,
							lineNumber: 261,
							columnNumber: 41
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 260,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 255,
				columnNumber: 37
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 10
	}, this);
}
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		onClick,
		className: `press h-10 rounded-full px-4 text-sm font-medium ${active ? "bg-ink text-ink-foreground" : "bg-surface hover:bg-accent"}`,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 285,
		columnNumber: 10
	}, this);
}
//#endregion
export { Shop as component };
