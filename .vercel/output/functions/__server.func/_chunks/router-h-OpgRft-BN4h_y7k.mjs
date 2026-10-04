import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, f as Scripts, g as Outlet, h as createRouter, p as HeadContent, q as redirect, v as createFileRoute, x as useNavigate, y as createRootRouteWithContext } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { a as QueryClientProvider, i as useQuery, o as useQueryClient } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { t as supabase } from "./client-BpRE6ta9-DiENUv8t.mjs";
import { t as QueryClient } from "./_libs/@tanstack/query-core-DjzdpOHX.mjs";
import { a as formatPKR, f as productsQuery, i as effectivePrice, n as categoriesQuery, p as settingsQuery, s as imageSrc } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { n as toast, t as Toaster } from "./_libs/sonner-6wP9uXZa.mjs";
import { B as Check, W as ArrowRight, _ as RefreshCw, d as ShoppingBag, f as Shield, g as Search, i as Truck, k as Heart, l as Sparkles, n as User, o as Trash2, s as Tag, t as X, w as LogOut } from "./_libs/lucide-react-DxlvYDqj.mjs";
import { r as useCart, t as CartProvider } from "./cart-CbB_gWfm-Djd8soCc.mjs";
import { t as useAuth } from "./use-auth-CWZcRUpe-CWmo13a5.mjs";
import { t as Route$10 } from "./order-B6WavtTM-Dn_u3p9t.mjs";
import { r as useWishlist, t as DiscoveryProvider } from "./discovery-0BgSzSUb-tnoJgiXO.mjs";
import { t as Route$11 } from "./product._slug-D1rb44pt-C8c-R5fn.mjs";
import { a as AnimatePresence } from "./_libs/framer-motion-DrV0DOtq.mjs";
import { t as motion } from "./_libs/motion-C4ShGMH9.mjs";
import { n as lost_default, t as Route$12 } from "./shop-DOkzqceB-DsNcWvKG.mjs";
import { t as sectionsQuery } from "./routes-Hnsg-D0T-BprekrDz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-h-OpgRft.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-BFIaPnZO.css";
var _jsxFileName$4 = "/app/applet/src/components/shop/WishlistDrawer.tsx";
function WishlistDrawer() {
	const wishlist = useWishlist();
	const cart = useCart();
	const moveToCart = (item) => {
		if (cart.add({
			id: item.id,
			slug: item.slug,
			name: item.name,
			image: item.image,
			unitPrice: item.unitPrice,
			listPrice: item.listPrice,
			stock: item.stock
		})) {
			wishlist.remove(item.id);
			toast.success(`${item.name} moved to bag`);
		} else toast.error("Item is out of stock");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: wishlist.isOpen && /* @__PURE__ */ (void 0)("div", {
		className: "fixed inset-0 z-50 flex justify-end",
		children: [/* @__PURE__ */ (void 0)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 bg-ink/40 backdrop-blur-xs",
			onClick: () => wishlist.setOpen(false)
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 35,
			columnNumber: 11
		}, this), /* @__PURE__ */ (void 0)(motion.aside, {
			initial: { x: "100%" },
			animate: { x: 0 },
			exit: { x: "100%" },
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 30
			},
			className: "relative z-10 flex h-full w-full max-w-md flex-col bg-background p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between border-b pb-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (void 0)(Heart, { className: "h-5 w-5 fill-destructive text-destructive" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 53,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("h2", {
								className: "text-xl font-extrabold tracking-tight",
								children: "Saved for Later"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 54,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: [
									"(",
									wishlist.count,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 55,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 52,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => wishlist.setOpen(false),
						className: "press rounded-full p-2 text-sm font-semibold hover:bg-surface",
						children: "Close ✕"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 59,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 51,
					columnNumber: 13
				}, this),
				wishlist.items.length === 0 ? /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-1 flex-col items-center justify-center text-center p-6",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex h-16 w-16 items-center justify-center rounded-full bg-surface text-muted-foreground",
							children: /* @__PURE__ */ (void 0)(Heart, { className: "h-8 w-8 stroke-1" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 71,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 70,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("h3", {
							className: "mt-4 text-lg font-bold",
							children: "Nothing saved yet"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 73,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-1 text-sm text-muted-foreground max-w-xs",
							children: "Tap the heart icon on any product card to keep track of gadgets you love."
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 74,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => wishlist.setOpen(false),
							className: "press mt-6 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold text-ink-foreground hover:bg-primary",
							children: "Explore Gadgets"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 77,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 69,
					columnNumber: 15
				}, this) : /* @__PURE__ */ (void 0)("div", {
					className: "flex-1 overflow-y-auto divide-y py-4 [scrollbar-width:none]",
					children: wishlist.items.map((item) => /* @__PURE__ */ (void 0)("div", {
						className: "py-4 flex gap-4 items-center",
						children: [/* @__PURE__ */ (void 0)(Link, {
							to: "/product/$slug",
							params: { slug: item.slug },
							onClick: () => wishlist.setOpen(false),
							className: "h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface p-2 border",
							children: /* @__PURE__ */ (void 0)("img", {
								src: imageSrc(item.image),
								alt: item.name,
								className: "h-full w-full object-contain mix-blend-multiply"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 94,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 88,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (void 0)(Link, {
									to: "/product/$slug",
									params: { slug: item.slug },
									onClick: () => wishlist.setOpen(false),
									className: "font-bold text-sm truncate block hover:text-primary transition-colors",
									children: item.name
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 102,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "font-mono text-xs font-semibold mt-1",
									children: formatPKR(item.unitPrice)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 110,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: item.stock > 0 ? /* @__PURE__ */ (void 0)("span", {
										className: "text-success font-medium",
										children: "In Stock"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 115,
										columnNumber: 27
									}, this) : /* @__PURE__ */ (void 0)("span", {
										className: "text-destructive font-medium",
										children: "Sold Out"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 117,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 113,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)("button", {
										onClick: () => moveToCart(item),
										disabled: item.stock <= 0,
										className: "press flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-ink-foreground hover:bg-primary disabled:opacity-30",
										children: [/* @__PURE__ */ (void 0)(ShoppingBag, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 127,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Move to Bag" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 128,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 122,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("button", {
										onClick: () => wishlist.remove(item.id),
										className: "press p-1.5 text-muted-foreground hover:text-destructive rounded-full hover:bg-surface",
										"aria-label": `Remove ${item.name}`,
										children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 135,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 130,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 121,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 101,
							columnNumber: 21
						}, this)]
					}, item.id, true, {
						fileName: _jsxFileName$4,
						lineNumber: 87,
						columnNumber: 19
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 85,
					columnNumber: 15
				}, this),
				wishlist.items.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "border-t pt-4",
					children: /* @__PURE__ */ (void 0)(Link, {
						to: "/shop",
						onClick: () => wishlist.setOpen(false),
						className: "press flex w-full items-center justify-center gap-2 rounded-full bg-surface py-3 text-xs font-semibold hover:bg-muted",
						children: [/* @__PURE__ */ (void 0)("span", { children: "Continue Browsing" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 152,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 153,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 147,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 146,
					columnNumber: 15
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 43,
			columnNumber: 11
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 34,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 32,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/shop/SiteChrome.tsx";
function SiteHeader() {
	const cart = useCart();
	const wishlist = useWishlist();
	const navigate = useNavigate();
	const { user, isAdmin, signOut } = useAuth();
	const [accountMenuOpen, setAccountMenuOpen] = (0, import_react.useState)(false);
	const { data: cats } = useQuery(categoriesQuery);
	const { data: allProducts } = useQuery(productsQuery());
	const [q, setQ] = (0, import_react.useState)("");
	const [searchFocused, setSearchFocused] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [bumping, setBumping] = (0, import_react.useState)(false);
	const searchContainerRef = (0, import_react.useRef)(null);
	const searchResults = q.trim().length >= 1 ? (allProducts || []).filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.short_description?.toLowerCase().includes(q.toLowerCase()) || p.category?.name.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : [];
	(0, import_react.useEffect)(() => {
		function handleClickOutside(event) {
			if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) setSearchFocused(false);
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!cart.bump) return;
		setBumping(true);
		const t = setTimeout(() => setBumping(false), 450);
		return () => clearTimeout(t);
	}, [cart.bump]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "group flex items-baseline gap-0.5 text-2xl font-extrabold tracking-tight",
					children: ["gubberz", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block h-2 w-2 rounded-full bg-primary transition-transform duration-300 group-hover:-translate-y-2" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 77,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 72,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "hidden items-center gap-5 text-sm md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/shop",
						className: "text-muted-foreground transition-colors hover:text-foreground",
						activeOptions: { includeSearch: false },
						children: "Everything"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 80,
						columnNumber: 11
					}, this), cats?.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/shop",
						search: { cat: c.slug },
						className: "text-muted-foreground transition-colors hover:text-foreground",
						children: c.name
					}, c.id, false, {
						fileName: _jsxFileName$3,
						lineNumber: 88,
						columnNumber: 13
					}, this))]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 79,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					ref: searchContainerRef,
					className: "relative ml-auto hidden md:block",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							setSearchFocused(false);
							navigate({
								to: "/shop",
								search: { q: q || void 0 }
							});
						},
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							onFocus: () => setSearchFocused(true),
							placeholder: "Search gadgets…",
							"aria-label": "Search products",
							className: "h-10 w-56 rounded-full bg-surface pl-4 pr-9 text-sm outline-none ring-primary transition-all placeholder:text-muted-foreground focus:w-72 focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 109,
							columnNumber: 13
						}, this), q ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setQ(""),
							className: "absolute right-3 top-2.5 text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 123,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 118,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute right-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 126,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 101,
						columnNumber: 11
					}, this), searchFocused && q.trim().length >= 1 && /* @__PURE__ */ (void 0)("div", {
						className: "absolute right-0 top-12 z-50 w-80 rounded-2xl border bg-background p-3 shadow-2xl",
						children: [/* @__PURE__ */ (void 0)("p", {
							className: "px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
							children: [
								"Matches for \"",
								q,
								"\""
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 133,
							columnNumber: 15
						}, this), searchResults.length === 0 ? /* @__PURE__ */ (void 0)("div", {
							className: "p-4 text-center text-xs text-muted-foreground",
							children: "No matching gadgets found."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 137,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (void 0)("div", {
							className: "divide-y",
							children: [searchResults.map((item) => /* @__PURE__ */ (void 0)(Link, {
								to: "/product/$slug",
								params: { slug: item.slug },
								onClick: () => {
									setSearchFocused(false);
									setQ("");
								},
								className: "flex items-center gap-3 p-2 hover:bg-surface rounded-xl transition-colors",
								children: [
									/* @__PURE__ */ (void 0)("img", {
										src: imageSrc(item.images[0]),
										alt: "",
										className: "h-10 w-10 rounded-lg object-contain bg-surface mix-blend-multiply"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 153,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (void 0)("p", {
											className: "truncate text-xs font-bold",
											children: item.name
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 159,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-[11px] text-muted-foreground",
											children: formatPKR(effectivePrice(item))
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 160,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 158,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] font-mono uppercase text-success font-medium",
										children: item.stock > 0 ? "In Stock" : "Sold Out"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 164,
										columnNumber: 23
									}, this)
								]
							}, item.id, true, {
								fileName: _jsxFileName$3,
								lineNumber: 143,
								columnNumber: 21
							}, this)), /* @__PURE__ */ (void 0)(Link, {
								to: "/shop",
								search: { q },
								onClick: () => {
									setSearchFocused(false);
									setQ("");
								},
								className: "flex items-center justify-between p-2 pt-3 text-xs font-bold text-primary hover:underline",
								children: [/* @__PURE__ */ (void 0)("span", { children: "View all matching results" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 178,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 179,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 169,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 141,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 132,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 100,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => wishlist.setOpen(true),
					className: "press relative flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground hover:bg-muted",
					"aria-label": `Open wishlist, ${wishlist.count} items`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `h-4 w-4 ${wishlist.count > 0 ? "fill-destructive text-destructive" : ""}` }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 193,
						columnNumber: 11
					}, this), wishlist.count > 0 && /* @__PURE__ */ (void 0)("span", {
						className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white font-mono",
						children: wishlist.count
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 197,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 188,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative",
					children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setAccountMenuOpen(!accountMenuOpen),
						className: "press flex h-10 items-center gap-1.5 rounded-full bg-surface px-3 text-xs font-semibold hover:bg-muted",
						title: user.email ?? "Account",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 212,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "hidden sm:inline max-w-[90px] truncate",
								children: user.user_metadata?.full_name?.split(" ")[0] || user.email?.split("@")[0]
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 213,
								columnNumber: 17
							}, this),
							isAdmin && /* @__PURE__ */ (void 0)("span", {
								className: "h-1.5 w-1.5 rounded-full bg-primary",
								title: "Admin privileges active"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 217,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 207,
						columnNumber: 15
					}, this), accountMenuOpen && /* @__PURE__ */ (void 0)("div", {
						className: "absolute right-0 top-12 z-50 w-52 rounded-2xl border bg-background p-2 shadow-xl text-xs space-y-1",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "px-3 py-2 border-b",
								children: [
									/* @__PURE__ */ (void 0)("p", {
										className: "font-bold truncate",
										children: user.user_metadata?.full_name || user.email?.split("@")[0]
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 224,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "font-mono text-[10px] text-muted-foreground truncate",
										children: user.email
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 227,
										columnNumber: 21
									}, this),
									isAdmin && /* @__PURE__ */ (void 0)("span", {
										className: "mt-1 inline-block rounded bg-ink px-1.5 py-0.5 font-mono text-[9px] uppercase font-bold text-ink-foreground",
										children: "Admin"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 229,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 223,
								columnNumber: 19
							}, this),
							isAdmin && /* @__PURE__ */ (void 0)(Link, {
								to: "/admin",
								onClick: () => setAccountMenuOpen(false),
								className: "flex items-center gap-2 rounded-xl px-3 py-2 font-semibold text-primary hover:bg-primary/10",
								children: [/* @__PURE__ */ (void 0)(Shield, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 240,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Admin Workspace" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 241,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 235,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (void 0)(Link, {
								to: "/order",
								onClick: () => setAccountMenuOpen(false),
								className: "flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-surface text-foreground",
								children: [/* @__PURE__ */ (void 0)(Truck, { className: "h-3.5 w-3.5 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 249,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Track Orders" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 250,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 244,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								onClick: async () => {
									setAccountMenuOpen(false);
									await signOut();
									toast.success("Signed out");
								},
								className: "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-destructive hover:bg-destructive/10 text-left",
								children: [/* @__PURE__ */ (void 0)(LogOut, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 260,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Sign Out" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 261,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 252,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 222,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 206,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/auth",
						className: "press flex h-10 items-center gap-1.5 rounded-full bg-surface px-3.5 text-xs font-semibold text-foreground hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-3.5 w-3.5 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 271,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sign In" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 272,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 267,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 204,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					ref: (el) => {
						cart.cartIconRef.current = el;
					},
					onClick: () => cart.setOpen(true),
					className: `press relative flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-ink-foreground ${bumping ? "animate-cart-bump" : ""}`,
					"aria-label": `Open cart, ${cart.count} items`,
					children: ["Bag", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-xs",
						children: cart.count
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 287,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 278,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setMenu(true),
					className: "press text-sm font-medium md:hidden",
					"aria-label": "Open menu",
					children: "Menu"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 291,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 71,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: menu && /* @__PURE__ */ (void 0)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 z-50 flex flex-col bg-background p-6 md:hidden",
			children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (void 0)("span", {
						className: "text-2xl font-extrabold",
						children: "gubberz"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 309,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => setMenu(false),
						className: "press text-sm font-medium",
						children: "Close"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 310,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 308,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("form", {
					className: "mt-6",
					onSubmit: (e) => {
						e.preventDefault();
						setMenu(false);
						navigate({
							to: "/shop",
							search: { q: q || void 0 }
						});
					},
					children: /* @__PURE__ */ (void 0)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search gadgets…",
						"aria-label": "Search products",
						className: "h-12 w-full rounded-full bg-surface px-5 outline-none ring-primary focus:ring-2 text-sm"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 322,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 314,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-4 flex gap-3",
					children: [/* @__PURE__ */ (void 0)("button", {
						onClick: () => {
							setMenu(false);
							wishlist.setOpen(true);
						},
						className: "press flex flex-1 items-center justify-center gap-2 rounded-full bg-surface py-2.5 text-xs font-semibold",
						children: [/* @__PURE__ */ (void 0)(Heart, { className: "h-4 w-4 fill-destructive text-destructive" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 339,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", { children: [
							"Wishlist (",
							wishlist.count,
							")"
						] }, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 340,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 332,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => {
							setMenu(false);
							cart.setOpen(true);
						},
						className: "press flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-xs font-semibold text-ink-foreground",
						children: /* @__PURE__ */ (void 0)("span", { children: [
							"Bag (",
							cart.count,
							")"
						] }, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 349,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 342,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 331,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("nav", {
					className: "mt-8 flex flex-col gap-2",
					children: [{
						name: "Everything",
						slug: void 0
					}, ...cats ?? []].map((c, i) => /* @__PURE__ */ (void 0)(motion.div, {
						initial: {
							y: 16,
							opacity: 0
						},
						animate: {
							y: 0,
							opacity: 1
						},
						transition: { delay: .04 * i },
						children: /* @__PURE__ */ (void 0)(Link, {
							to: "/shop",
							search: { cat: c.slug },
							onClick: () => setMenu(false),
							className: "block text-3xl font-bold tracking-tight",
							children: c.name
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 362,
							columnNumber: 21
						}, this)
					}, c.name, false, {
						fileName: _jsxFileName$3,
						lineNumber: 356,
						columnNumber: 19
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 353,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 302,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 300,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 70,
		columnNumber: 5
	}, this);
}
function CartDrawer() {
	const cart = useCart();
	const [promoInput, setPromoInput] = (0, import_react.useState)("");
	const [appliedPromo, setAppliedPromo] = (0, import_react.useState)(null);
	const [promoError, setPromoError] = (0, import_react.useState)("");
	const FREE_SHIPPING_THRESHOLD = 15e3;
	const freeShipping = cart.subtotal >= FREE_SHIPPING_THRESHOLD;
	const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - cart.subtotal);
	const progressPct = Math.min(100, Math.round(cart.subtotal / FREE_SHIPPING_THRESHOLD * 100));
	const applyPromo = (e) => {
		e.preventDefault();
		const code = promoInput.trim().toUpperCase();
		if (code === "WELCOME10" || code === "GUBBERZ10") {
			setAppliedPromo({
				code,
				pct: 10
			});
			setPromoError("");
			toast.success(`Coupon ${code} applied: 10% discount!`);
			setPromoInput("");
		} else if (code === "TECHDROP") {
			setAppliedPromo({
				code,
				pct: 15
			});
			setPromoError("");
			toast.success(`Coupon ${code} applied: 15% discount!`);
			setPromoInput("");
		} else if (code === "GUB5") {
			setAppliedPromo({
				code,
				pct: 5
			});
			setPromoError("");
			toast.success(`Coupon ${code} applied: 5% discount!`);
			setPromoInput("");
		} else setPromoError("Invalid code. Try WELCOME10 or TECHDROP");
	};
	const promoDiscount = appliedPromo ? Math.round(cart.subtotal * (appliedPromo.pct / 100)) : 0;
	const effectiveSubtotal = Math.max(0, cart.subtotal - promoDiscount);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: cart.open && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(motion.div, {
		className: "fixed inset-0 z-50 bg-ink/30",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: () => cart.setOpen(false)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 422,
		columnNumber: 11
	}, this), /* @__PURE__ */ (void 0)(motion.aside, {
		role: "dialog",
		"aria-label": "Your bag",
		className: "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background",
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "spring",
			stiffness: 380,
			damping: 38
		},
		children: [
			/* @__PURE__ */ (void 0)("div", {
				className: "flex items-center justify-between border-b px-6 py-5",
				children: [/* @__PURE__ */ (void 0)("h2", {
					className: "text-xl font-bold",
					children: "Your bag"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 439,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)("button", {
					onClick: () => cart.setOpen(false),
					className: "press text-sm text-muted-foreground hover:text-foreground",
					children: "Close"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 440,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 438,
				columnNumber: 13
			}, this),
			cart.items.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "border-b bg-surface/50 px-6 py-3",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between text-xs mb-1.5",
					children: [freeShipping ? /* @__PURE__ */ (void 0)("span", {
						className: "flex items-center gap-1.5 text-success font-bold",
						children: [/* @__PURE__ */ (void 0)(Check, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 454,
							columnNumber: 23
						}, this), " FREE Delivery unlocked!"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 453,
						columnNumber: 21
					}, this) : /* @__PURE__ */ (void 0)("span", {
						className: "text-muted-foreground",
						children: [
							"Add ",
							/* @__PURE__ */ (void 0)("strong", {
								className: "font-mono text-primary",
								children: formatPKR(amountNeeded)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 458,
								columnNumber: 27
							}, this),
							" more for ",
							/* @__PURE__ */ (void 0)("strong", { children: "FREE shipping" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 458,
								columnNumber: 114
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 457,
						columnNumber: 21
					}, this), /* @__PURE__ */ (void 0)(Truck, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 461,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 451,
					columnNumber: 17
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "h-1.5 w-full rounded-full bg-border overflow-hidden",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "h-full bg-primary transition-all duration-300 rounded-full",
						style: { width: `${progressPct}%` }
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 464,
						columnNumber: 19
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 463,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 450,
				columnNumber: 15
			}, this),
			cart.items.length === 0 ? /* @__PURE__ */ (void 0)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-8 text-center",
				children: [
					/* @__PURE__ */ (void 0)("img", {
						src: "/assets/basket-6yO7svHm.png",
						alt: "",
						width: 1024,
						height: 1024,
						className: "w-48"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 474,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "mt-4 text-2xl font-bold",
						children: "Well… that's awkward."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 475,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "mt-1 text-muted-foreground",
						children: "Your bag is empty. Go find something you absolutely don't need."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 476,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (void 0)(Link, {
						to: "/shop",
						onClick: () => cart.setOpen(false),
						className: "press mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground",
						children: "Start browsing"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 479,
						columnNumber: 17
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 473,
				columnNumber: 15
			}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("ul", {
				className: "flex-1 divide-y overflow-y-auto px-6",
				children: /* @__PURE__ */ (void 0)(AnimatePresence, {
					initial: false,
					children: cart.items.map((i) => /* @__PURE__ */ (void 0)(motion.li, {
						layout: true,
						exit: {
							opacity: 0,
							x: 40
						},
						className: "flex gap-4 py-5",
						children: [/* @__PURE__ */ (void 0)("img", {
							src: imageSrc(i.image),
							alt: "",
							width: 1024,
							height: 1024,
							className: "h-20 w-20 rounded-2xl bg-surface object-cover mix-blend-multiply"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 498,
							columnNumber: 25
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex min-w-0 flex-1 flex-col",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (void 0)(Link, {
										to: "/product/$slug",
										params: { slug: i.slug },
										onClick: () => cart.setOpen(false),
										className: "truncate font-semibold hover:underline",
										children: i.name
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 507,
										columnNumber: 29
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-mono text-sm",
										children: formatPKR(i.unitPrice * i.qty)
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 515,
										columnNumber: 29
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 506,
									columnNumber: 27
								}, this),
								i.listPrice > i.unitPrice && /* @__PURE__ */ (void 0)("span", {
									className: "font-mono text-xs text-primary",
									children: ["Saving ", formatPKR((i.listPrice - i.unitPrice) * i.qty)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 520,
									columnNumber: 29
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-auto flex items-center justify-between pt-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center rounded-full bg-surface",
										children: [
											/* @__PURE__ */ (void 0)("button", {
												className: "press h-8 w-8",
												onClick: () => cart.setQty(i.id, i.qty - 1),
												"aria-label": "Decrease quantity",
												children: "−"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 526,
												columnNumber: 31
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "w-6 text-center font-mono text-sm",
												children: i.qty
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 533,
												columnNumber: 31
											}, this),
											/* @__PURE__ */ (void 0)("button", {
												className: "press h-8 w-8 disabled:opacity-30",
												disabled: i.qty >= i.stock,
												onClick: () => cart.setQty(i.id, i.qty + 1),
												"aria-label": "Increase quantity",
												children: "+"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 534,
												columnNumber: 31
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 525,
										columnNumber: 29
									}, this), /* @__PURE__ */ (void 0)("button", {
										onClick: () => cart.remove(i.id),
										className: "text-xs text-muted-foreground hover:text-destructive",
										children: "Remove"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 543,
										columnNumber: 29
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 524,
									columnNumber: 27
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 505,
							columnNumber: 25
						}, this)]
					}, i.id, true, {
						fileName: _jsxFileName$3,
						lineNumber: 492,
						columnNumber: 23
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 490,
					columnNumber: 19
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 489,
				columnNumber: 17
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "space-y-3 border-t px-6 py-5 bg-card/50",
				children: [
					/* @__PURE__ */ (void 0)("form", {
						onSubmit: applyPromo,
						className: "space-y-1",
						children: [appliedPromo ? /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between rounded-xl bg-success/10 border border-success/30 px-3 py-2 text-xs",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "flex items-center gap-1.5 font-bold text-success",
								children: [/* @__PURE__ */ (void 0)(Tag, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 563,
									columnNumber: 27
								}, this), /* @__PURE__ */ (void 0)("span", { children: [
									appliedPromo.code,
									" (",
									appliedPromo.pct,
									"% off applied)"
								] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 564,
									columnNumber: 27
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 562,
								columnNumber: 25
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setAppliedPromo(null),
								className: "text-muted-foreground hover:text-destructive text-xs",
								children: "✕ Remove"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 566,
								columnNumber: 25
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 561,
							columnNumber: 23
						}, this) : /* @__PURE__ */ (void 0)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (void 0)("input", {
								value: promoInput,
								onChange: (e) => {
									setPromoInput(e.target.value);
									setPromoError("");
								},
								placeholder: "Coupon code (e.g. WELCOME10)",
								className: "h-9 flex-1 rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-1"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 576,
								columnNumber: 25
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "submit",
								className: "press rounded-xl bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted",
								children: "Apply"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 585,
								columnNumber: 25
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 575,
							columnNumber: 23
						}, this), promoError && /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-destructive",
							children: promoError
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 593,
							columnNumber: 36
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 559,
						columnNumber: 19
					}, this),
					cart.savings > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "flex justify-between text-xs text-primary font-medium",
						children: [/* @__PURE__ */ (void 0)("span", { children: "Store discount" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 598,
							columnNumber: 23
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-mono",
							children: ["−", formatPKR(cart.savings)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 599,
							columnNumber: 23
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 597,
						columnNumber: 21
					}, this),
					promoDiscount > 0 && /* @__PURE__ */ (void 0)("div", {
						className: "flex justify-between text-xs text-success font-medium",
						children: [/* @__PURE__ */ (void 0)("span", { children: "Promo code discount" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 605,
							columnNumber: 23
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-mono",
							children: ["−", formatPKR(promoDiscount)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 606,
							columnNumber: 23
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 604,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex justify-between text-base font-extrabold",
						children: [/* @__PURE__ */ (void 0)("span", { children: "Estimated total" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 611,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "font-mono",
							children: formatPKR(effectiveSubtotal)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 612,
							columnNumber: 21
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 610,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Advance payment (JazzCash / NayaPay) saves an additional 5% at checkout."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 615,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (void 0)(Link, {
						to: "/checkout",
						onClick: () => cart.setOpen(false),
						className: "press mt-2 block w-full rounded-full bg-primary py-3.5 text-center font-bold text-xs uppercase tracking-wider text-primary-foreground shadow-sm hover:brightness-105",
						children: "Proceed to Checkout"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 619,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (void 0)("button", {
						onClick: () => cart.setOpen(false),
						className: "w-full py-1 text-xs text-muted-foreground hover:text-foreground text-center",
						children: "Keep shopping"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 627,
						columnNumber: 19
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 557,
				columnNumber: 17
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 488,
				columnNumber: 15
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 429,
		columnNumber: 11
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 421,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 419,
		columnNumber: 5
	}, this);
}
function WhatsAppButton() {
	const { data } = useQuery(settingsQuery);
	const num = data?.whatsapp ?? "923000000000";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
		href: `https://wa.me/${num}?text=${encodeURIComponent("Hi Gubberz! I have a question.")}`,
		target: "_blank",
		rel: "noreferrer",
		className: "press fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-primary-foreground" }, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 653,
			columnNumber: 7
		}, this), "Ask us on WhatsApp"]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 647,
		columnNumber: 5
	}, this);
}
function SiteFooter() {
	const { isAdmin } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "mt-32 bg-ink text-ink-foreground",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-5xl font-extrabold tracking-tight",
						children: ["gubberz", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-primary",
							children: "."
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 667,
							columnNumber: 20
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 666,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 max-w-sm text-ink-foreground/60",
						children: "Ordinary gadgets, sold with a bit too much enthusiasm. Delivered across Pakistan."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 669,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 665,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2 text-sm text-ink-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-ink-foreground/40",
							children: "Shop"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 674,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/shop",
							className: "block hover:text-ink-foreground",
							children: "Everything"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 675,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/shop",
							search: { sort: "new" },
							className: "block hover:text-ink-foreground",
							children: "New arrivals"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 678,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/order",
							className: "block hover:text-ink-foreground",
							children: "Track your order"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 681,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/policies",
							className: "block text-primary hover:underline font-semibold",
							children: "Store Policies & Guarantees"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 684,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/privacy",
							className: "block hover:text-ink-foreground text-xs text-ink-foreground/60",
							children: "Privacy Policy"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 687,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/terms",
							className: "block hover:text-ink-foreground text-xs text-ink-foreground/60",
							children: "Terms of Service"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 690,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 673,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2 text-sm text-ink-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-ink-foreground/40",
							children: "Pay how you like"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 695,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Cash on Delivery" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 698,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "JazzCash · NayaPay — 5% off" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 699,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Easypaisa · Bank Transfer / Raast" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 700,
							columnNumber: 11
						}, this),
						isAdmin && /* @__PURE__ */ (void 0)("div", {
							className: "pt-3 border-t border-ink-foreground/10",
							children: /* @__PURE__ */ (void 0)(Link, {
								to: "/admin",
								className: "font-mono text-xs text-primary hover:underline font-semibold flex items-center gap-1.5",
								children: /* @__PURE__ */ (void 0)("span", { children: "⚙ Admin Workspace" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 707,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 703,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 702,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 694,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 664,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 663,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/shop/PullToRefresh.tsx";
function PullToRefreshContainer({ children }) {
	const queryClient = useQueryClient();
	const [pullDistance, setPullDistance] = (0, import_react.useState)(0);
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	const [mascot, setMascot] = (0, import_react.useState)("skater");
	const startYRef = (0, import_react.useRef)(0);
	const isPullingRef = (0, import_react.useRef)(false);
	const containerRef = (0, import_react.useRef)(null);
	const PULL_THRESHOLD = 90;
	const MAX_PULL = 150;
	(0, import_react.useEffect)(() => {
		const handleTouchStart = (e) => {
			if (window.scrollY <= 2 && !isRefreshing) {
				startYRef.current = e.touches[0].clientY;
				isPullingRef.current = true;
			}
		};
		const handleTouchMove = (e) => {
			if (!isPullingRef.current || isRefreshing) return;
			const diff = e.touches[0].clientY - startYRef.current;
			if (diff > 0 && window.scrollY <= 2) {
				const damped = Math.min(MAX_PULL, diff * .55);
				setPullDistance(damped);
			} else setPullDistance(0);
		};
		const handleTouchEnd = async () => {
			if (!isPullingRef.current) return;
			isPullingRef.current = false;
			if (pullDistance >= PULL_THRESHOLD && !isRefreshing) triggerRefresh();
			else setPullDistance(0);
		};
		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		window.addEventListener("touchmove", handleTouchMove, { passive: true });
		window.addEventListener("touchend", handleTouchEnd);
		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [pullDistance, isRefreshing]);
	const triggerRefresh = async () => {
		setIsRefreshing(true);
		setPullDistance(PULL_THRESHOLD);
		if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([
			15,
			30,
			20
		]);
		try {
			await Promise.all([queryClient.invalidateQueries(), new Promise((resolve) => setTimeout(resolve, 1100))]);
			toast.success("Catalogue & inventory synced!");
		} catch {} finally {
			setIsRefreshing(false);
			setPullDistance(0);
		}
	};
	const progress = Math.min(1, pullDistance / PULL_THRESHOLD);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref: containerRef,
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "pointer-events-none fixed inset-x-0 top-16 z-30 flex flex-col items-center justify-center overflow-hidden transition-all duration-75",
			style: {
				height: `${pullDistance}px`,
				opacity: pullDistance > 8 ? 1 : 0
			},
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-0.5 bg-ink/40 origin-top",
						style: { height: `${Math.max(10, pullDistance * .45)}px` }
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 102,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SkaterMascot, {
							progress,
							isRefreshing
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 109,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 108,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-1 rounded-full bg-background/90 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground shadow-xs border",
						children: isRefreshing ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1.5 text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-3 w-3 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 116,
								columnNumber: 17
							}, this), "Catching air…"]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 115,
							columnNumber: 15
						}, this) : progress >= 1 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-primary font-bold",
							children: "Release to refresh!"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 120,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Pull down to reload" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 122,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 113,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 100,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 93,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			style: {
				transform: `translateY(${pullDistance * .65}px)`,
				transition: isPullingRef.current ? "none" : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)"
			},
			children
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 129,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 91,
		columnNumber: 5
	}, this);
}
function SkaterMascot({ progress, isRefreshing }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
		animate: isRefreshing ? {
			rotate: [
				0,
				360,
				720
			],
			y: [
				-6,
				6,
				-6
			],
			transition: {
				duration: 1,
				repeat: Infinity,
				ease: "linear"
			}
		} : {
			rotate: progress * 15 - 7.5,
			y: progress * 8
		},
		className: "relative flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			width: "48",
			height: "52",
			viewBox: "0 0 48 52",
			fill: "none",
			className: "overflow-visible",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
					cx: "24",
					cy: "18",
					r: "11",
					stroke: "#111",
					strokeWidth: "2.4",
					fill: "#ffffff"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 162,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ellipse", {
					cx: "21",
					cy: "17",
					rx: "1.5",
					ry: "2.2",
					fill: "#111"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 164,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ellipse", {
					cx: "27",
					cy: "17",
					rx: "1.5",
					ry: "2.2",
					fill: "#111"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 165,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M22 21 Q24 23 26 21",
					stroke: "#111",
					strokeWidth: "1.8",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 167,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M12 18 C12 10 36 10 36 18",
					stroke: "#111",
					strokeWidth: "3.2",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 169,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
					x: "9",
					y: "14",
					width: "5.5",
					height: "9",
					rx: "2.5",
					fill: "#f97316",
					stroke: "#111",
					strokeWidth: "1.5"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 176,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
					x: "33.5",
					y: "14",
					width: "5.5",
					height: "9",
					rx: "2.5",
					fill: "#f97316",
					stroke: "#111",
					strokeWidth: "1.5"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 177,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M24 29 L24 41",
					stroke: "#111",
					strokeWidth: "2.4",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 179,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M24 33 L14 36",
					stroke: "#111",
					strokeWidth: "2.2",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 181,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M24 33 L34 31",
					stroke: "#111",
					strokeWidth: "2.2",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 182,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M24 41 L17 48",
					stroke: "#111",
					strokeWidth: "2.4",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 184,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M24 41 L31 48",
					stroke: "#111",
					strokeWidth: "2.4",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 185,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 160,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, {
			animate: isRefreshing ? {
				rotate: [
					0,
					180,
					360
				],
				transition: {
					duration: .6,
					repeat: Infinity
				}
			} : {},
			className: "relative -mt-1 flex flex-col items-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2 w-14 rounded-full bg-primary border-2 border-ink shadow-xs" }, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 198,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex w-11 justify-between px-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2 w-2 rounded-full bg-ink animate-pulse" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 201,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2 w-2 rounded-full bg-ink animate-pulse" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 202,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 200,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 189,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 144,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/shop/GadgetAdvisor.tsx";
function GadgetAdvisorModal() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(1);
	const [vibe, setVibe] = (0, import_react.useState)("desk");
	const [priority, setPriority] = (0, import_react.useState)("sound");
	const [budget, setBudget] = (0, import_react.useState)("mid");
	const { data: allProducts } = useQuery(productsQuery());
	const cart = useCart();
	const reset = () => {
		setStep(1);
		setVibe("desk");
		setPriority("sound");
		setBudget("mid");
	};
	const getRecommendations = () => {
		if (!allProducts || allProducts.length === 0) return [];
		let pool = [...allProducts];
		if (vibe === "desk") pool.sort((a, b) => a.slug.includes("keyboard") || a.slug.includes("mouse") ? -1 : 1);
		else if (vibe === "commute") pool.sort((a, b) => a.slug.includes("headphone") || a.slug.includes("power") ? -1 : 1);
		else pool.sort((a, b) => a.slug.includes("buds") || a.slug.includes("cable") ? -1 : 1);
		if (budget === "budget") pool = pool.filter((p) => effectivePrice(p) <= 1e4);
		return pool.slice(0, 2);
	};
	const recommended = getRecommendations();
	const bundleTotal = recommended.reduce((sum, p) => sum + effectivePrice(p), 0);
	const discountedBundle = Math.round(bundleTotal * .9);
	const addSetupToCart = () => {
		recommended.forEach((p) => {
			cart.add({
				id: p.id,
				slug: p.slug,
				name: `${p.name} (Advisor Setup)`,
				image: p.images[0] ?? "",
				unitPrice: Math.round(effectivePrice(p) * .9),
				listPrice: p.price,
				stock: p.stock
			});
		});
		toast.success("Setup bundle added to your bag with 10% discount!");
		setOpen(false);
		cart.setOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		onClick: () => {
			reset();
			setOpen(true);
		},
		className: "press fixed bottom-20 right-5 z-30 flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-xl transition-all hover:scale-105",
		"aria-label": "Find my setup advisor",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 fill-current" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 80,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Find My Setup" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 81,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 72,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: open && /* @__PURE__ */ (void 0)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs",
		children: /* @__PURE__ */ (void 0)(motion.div, {
			initial: {
				scale: .95,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			className: "relative w-full max-w-lg rounded-3xl bg-background p-6 md:p-8 shadow-2xl border max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (void 0)("button", {
					onClick: () => setOpen(false),
					className: "absolute right-5 top-5 p-2 rounded-full hover:bg-surface text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (void 0)(X, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 99,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 95,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20",
						children: /* @__PURE__ */ (void 0)(Sparkles, { className: "h-6 w-6" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 105,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 104,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
						className: "text-xl font-extrabold tracking-tight",
						children: "Gubberz Setup Advisor"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 108,
						columnNumber: 19
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-muted-foreground",
						children: "Answer 3 quick questions to discover your ideal gadget kit"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 109,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 107,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 103,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-6 flex gap-2",
					children: [
						1,
						2,
						3,
						4
					].map((s) => /* @__PURE__ */ (void 0)("div", { className: `h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "bg-primary" : "bg-surface"}` }, s, false, {
						fileName: _jsxFileName$1,
						lineNumber: 118,
						columnNumber: 19
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 116,
					columnNumber: 15
				}, this),
				step === 1 && /* @__PURE__ */ (void 0)("div", {
					className: "mt-6 space-y-4",
					children: [/* @__PURE__ */ (void 0)("h4", {
						className: "font-bold text-base",
						children: "Where do you spend most of your time?"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 130,
						columnNumber: 19
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-3",
						children: [
							{
								id: "desk",
								label: "Minimalist Desk / Work From Home",
								sub: "Focused on clean setup & ergonomics"
							},
							{
								id: "commute",
								label: "Daily Commute & Travel",
								sub: "Noise cancellation & mobile battery power"
							},
							{
								id: "casual",
								label: "Casual Everyday Carry",
								sub: "Compact, durable gear that fits in a pocket"
							}
						].map((opt) => /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => {
								setVibe(opt.id);
								setStep(2);
							},
							className: `press flex items-start justify-between rounded-2xl border p-4 text-left transition-all ${vibe === opt.id ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-border/60 bg-surface hover:bg-muted"}`,
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-bold text-sm",
								children: opt.label
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 151,
								columnNumber: 27
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: opt.sub
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 152,
								columnNumber: 27
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 150,
								columnNumber: 25
							}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "h-4 w-4 text-muted-foreground mt-1" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 154,
								columnNumber: 25
							}, this)]
						}, opt.id, true, {
							fileName: _jsxFileName$1,
							lineNumber: 137,
							columnNumber: 23
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 131,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 129,
					columnNumber: 17
				}, this),
				step === 2 && /* @__PURE__ */ (void 0)("div", {
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("h4", {
							className: "font-bold text-base",
							children: "What feature matters most to you?"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 164,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-3",
							children: [
								{
									id: "sound",
									label: "Immersive Audio & ANC",
									sub: "Punchy sound profile with noise isolation"
								},
								{
									id: "power",
									label: "Fast Charging & All-Day Battery",
									sub: "Never run out of battery on the road"
								},
								{
									id: "typing",
									label: "Tactile Feel & Precision Control",
									sub: "Mechanical clack & smooth glide sensor"
								}
							].map((opt) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									setPriority(opt.id);
									setStep(3);
								},
								className: `press flex items-start justify-between rounded-2xl border p-4 text-left transition-all ${priority === opt.id ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-border/60 bg-surface hover:bg-muted"}`,
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-bold text-sm",
									children: opt.label
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 185,
									columnNumber: 27
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: opt.sub
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 186,
									columnNumber: 27
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 184,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "h-4 w-4 text-muted-foreground mt-1" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 188,
									columnNumber: 25
								}, this)]
							}, opt.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 171,
								columnNumber: 23
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 165,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setStep(1),
							className: "text-xs text-muted-foreground hover:underline",
							children: "← Back"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 192,
							columnNumber: 19
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 163,
					columnNumber: 17
				}, this),
				step === 3 && /* @__PURE__ */ (void 0)("div", {
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("h4", {
							className: "font-bold text-base",
							children: "What is your target budget?"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 204,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-3",
							children: [
								{
									id: "budget",
									label: "Budget Friendly (Under Rs 10,000)",
									sub: "Maximum value essentials"
								},
								{
									id: "mid",
									label: "Sweet Spot (Rs 10,000 – Rs 25,000)",
									sub: "Best balanced performance & materials"
								},
								{
									id: "pro",
									label: "Flagship / Pro Tier",
									sub: "Top tier acoustic & tactile hardware"
								}
							].map((opt) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									setBudget(opt.id);
									setStep(4);
								},
								className: `press flex items-start justify-between rounded-2xl border p-4 text-left transition-all ${budget === opt.id ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-border/60 bg-surface hover:bg-muted"}`,
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-bold text-sm",
									children: opt.label
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 225,
									columnNumber: 27
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: opt.sub
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 226,
									columnNumber: 27
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 224,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "h-4 w-4 text-muted-foreground mt-1" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 228,
									columnNumber: 25
								}, this)]
							}, opt.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 211,
								columnNumber: 23
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 205,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => setStep(2),
							className: "text-xs text-muted-foreground hover:underline",
							children: "← Back"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 232,
							columnNumber: 19
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 203,
					columnNumber: 17
				}, this),
				step === 4 && /* @__PURE__ */ (void 0)("div", {
					className: "mt-6 space-y-5",
					children: [
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
							className: "font-mono text-xs uppercase tracking-wider text-primary font-bold",
							children: "Your Curated Setup"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 245,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("h4", {
							className: "mt-1 text-2xl font-extrabold tracking-tight",
							children: "Recommended by Gubberz"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 248,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 244,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: recommended.map((item) => /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-4 rounded-2xl border bg-surface p-3.5",
								children: [/* @__PURE__ */ (void 0)("img", {
									src: imageSrc(item.images[0]),
									alt: "",
									className: "h-16 w-16 rounded-xl object-contain bg-background mix-blend-multiply border"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 259,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "font-bold text-sm truncate",
											children: item.name
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 265,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground line-clamp-1",
											children: item.short_description
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 266,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-xs font-bold text-primary mt-1",
											children: formatPKR(effectivePrice(item))
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 269,
											columnNumber: 27
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 264,
									columnNumber: 25
								}, this)]
							}, item.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 255,
								columnNumber: 23
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 253,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl bg-surface/70 p-4 border flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("p", {
									className: "text-muted-foreground",
									children: "Bundle Total (10% Off):"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 280,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("span", {
									className: "font-mono text-lg font-black text-foreground",
									children: formatPKR(discountedBundle)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 281,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("span", {
									className: "ml-2 font-mono text-muted-foreground line-through",
									children: formatPKR(bundleTotal)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 284,
									columnNumber: 23
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 279,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: addSetupToCart,
								className: "press rounded-full bg-ink px-5 py-2.5 font-bold text-ink-foreground hover:bg-primary shadow-sm",
								children: "Add Setup to Bag"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 289,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 278,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex justify-between items-center pt-2",
							children: [/* @__PURE__ */ (void 0)("button", {
								onClick: reset,
								className: "press flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground",
								children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 302,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Retake Quiz" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 303,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 298,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: () => setOpen(false),
								className: "press text-xs font-semibold hover:underline",
								children: "Close"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 305,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 297,
							columnNumber: 19
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 243,
					columnNumber: 17
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 88,
			columnNumber: 13
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 87,
		columnNumber: 11
	}, this) }, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 85,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 70,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: lost_default,
				alt: "A small character holding a map upside down",
				width: 1024,
				height: 1024,
				className: "w-56"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground",
				children: "Error 404"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-2 text-4xl font-extrabold tracking-tight",
				children: "This page wandered off."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 text-muted-foreground",
				children: "The link might be old or mistyped. Our little guy checked the map twice — it isn't here."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 42,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "press rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground",
					children: "Back home"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/shop",
					className: "press rounded-full bg-surface px-6 py-3 text-sm font-medium",
					children: "Browse gadgets"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error("App error boundary:", error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: lost_default,
					alt: "",
					width: 1024,
					height: 1024,
					className: "mx-auto w-40"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Something tripped over a cable."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This page didn't load. Try again, or head back home."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "press rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ink-foreground",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "press rounded-full bg-surface px-5 py-2.5 text-sm font-medium",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 82,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 5
	}, this);
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Gubberz — Gadgets with personality" },
			{
				name: "description",
				content: "Headphones, chargers, keyboards and other useful gadgets, delivered across Pakistan."
			},
			{
				property: "og:title",
				content: "Gubberz — Gadgets with personality"
			},
			{
				property: "og:description",
				content: "Headphones, chargers, keyboards and other useful gadgets, delivered across Pakistan."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 133,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 132,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", {
			suppressHydrationWarning: true,
			children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 137,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 135,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 131,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DiscoveryProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteHeader, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 150,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PullToRefreshContainer, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 153,
				columnNumber: 15
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 152,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteFooter, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 155,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartDrawer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 157,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WishlistDrawer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 158,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GadgetAdvisorModal, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 159,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WhatsAppButton, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 160,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, { position: "bottom-center" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 161,
				columnNumber: 11
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 149,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 148,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 147,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$8 = () => import("./routes-C0Ndpzm7-BxMO_8Zr.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Gubberz — Gadgets you'll actually want" },
		{
			name: "description",
			content: "An opinionated edit of headphones, chargers, keyboards and useful gadgets, delivered across Pakistan."
		},
		{
			property: "og:title",
			content: "Gubberz — Gadgets you'll actually want"
		},
		{
			property: "og:description",
			content: "Ordinary gadgets, presented with too much enthusiasm. Delivered across Pakistan."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	loader: ({ context }) => Promise.all([
		context.queryClient.ensureQueryData(productsQuery()),
		context.queryClient.ensureQueryData(categoriesQuery),
		context.queryClient.ensureQueryData(sectionsQuery)
	]),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./_authenticated-AUbKcmwT-BvxBlvug.mjs");
var Route$7 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./auth-IqkaBxXO-ll_yGRTr.mjs");
var Route$6 = createFileRoute("/auth")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "Sign in — Gubberz" },
		{
			name: "description",
			content: "Sign in to your Gubberz account to track orders and checkout faster."
		},
		{
			property: "og:title",
			content: "Sign in — Gubberz"
		},
		{
			property: "og:description",
			content: "Sign in to your Gubberz account."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./checkout-CU5KLGCP-B9hZcG0l.mjs");
var Route$5 = createFileRoute("/checkout")({
	loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery),
	head: () => ({ meta: [
		{ title: "Secure Checkout — Gubberz" },
		{
			name: "description",
			content: "Enter your delivery details and pay by cash on delivery, JazzCash or NayaPay."
		},
		{
			property: "og:title",
			content: "Checkout — Gubberz"
		},
		{
			property: "og:description",
			content: "Finish your Gubberz order in a minute."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./policies-DjyM5Yyt-DCijvQ-G.mjs");
var Route$4 = createFileRoute("/policies")({
	head: () => ({ meta: [{ title: "Store Policies & Customer Protection — Gubberz" }, {
		name: "description",
		content: "Official store policies for Gubberz: 7-day hassle-free replacement, nationwide shipping timelines, genuine warranty, and Cash on Delivery terms."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./privacy-BPEU3SqG-9W30OS1Y.mjs");
var Route$3 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — Gubberz" }, {
		name: "description",
		content: "Official Privacy Policy for Gubberz. Learn what information we collect, how we use it, and how we protect it."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./terms-C9nttlZs-DkNvo0Dc.mjs");
var Route$2 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms of Service — Gubberz" }, {
		name: "description",
		content: "Official Terms of Service for Gubberz. Rules, ordering conditions, and customer guarantees for shopping on Gubberz."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin-NlIypEE_-7L0AbUpA.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Gubberz Admin Workspace" }, {
		name: "description",
		content: "Management console for Gubberz editorial storefront and store operations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./auth.callback-rNOP3UuO-DyqntcwW.mjs");
var Route = createFileRoute("/auth/callback")({
	ssr: false,
	head: () => ({ meta: [{ title: "Verifying Authentication — Gubberz" }, {
		name: "description",
		content: "Completing secure sign in…"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AuthenticatedRoute = Route$7.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var AuthRoute = Route$6.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var CheckoutRoute = Route$5.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$9
});
var OrderRoute = Route$10.update({
	id: "/order",
	path: "/order",
	getParentRoute: () => Route$9
});
var PoliciesRoute = Route$4.update({
	id: "/policies",
	path: "/policies",
	getParentRoute: () => Route$9
});
var PrivacyRoute = Route$3.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$9
});
var ShopRoute = Route$12.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$9
});
var TermsRoute = Route$2.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$9
});
var AuthenticatedAdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRoute
});
var AuthCallbackRoute = Route.update({
	id: "/callback",
	path: "/callback",
	getParentRoute: () => AuthRoute
});
var ProductSlugRoute = Route$11.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteChildren = { AuthenticatedAdminRoute };
var AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(AuthenticatedRouteChildren);
var AuthRouteChildren = { AuthCallbackRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRoute: AuthenticatedRouteWithChildren,
	AuthRoute: AuthRoute._addFileChildren(AuthRouteChildren),
	CheckoutRoute,
	OrderRoute,
	PoliciesRoute,
	PrivacyRoute,
	ShopRoute,
	TermsRoute,
	ProductSlugRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
