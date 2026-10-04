import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { b as Link } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { r as useSuspenseQuery } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { a as formatPKR, d as productQuery, f as productsQuery, i as effectivePrice, o as getProductVariants, p as settingsQuery, s as imageSrc, t as availability, u as productGallery } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { n as toast } from "./_libs/sonner-6wP9uXZa.mjs";
import { B as Check, L as Clock, S as MapPin, _ as RefreshCw, c as Star, i as Truck, j as Flame, k as Heart, l as Sparkles, p as ShieldCheck, x as MessageCircle } from "./_libs/lucide-react-DxlvYDqj.mjs";
import { n as flyToCart, r as useCart } from "./cart-CbB_gWfm-Djd8soCc.mjs";
import { n as useRecentlyViewed, r as useWishlist } from "./discovery-0BgSzSUb-tnoJgiXO.mjs";
import { t as Route } from "./product._slug-D1rb44pt-C8c-R5fn.mjs";
import { t as ProductCard } from "./ProductCard-Y97FfztB-Bv_JARig.mjs";
import { a as AnimatePresence } from "./_libs/framer-motion-DrV0DOtq.mjs";
import { t as motion } from "./_libs/motion-C4ShGMH9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-BqD9O_XZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/product.$slug.tsx?tsr-split=component";
var INITIAL_REVIEWS = { default: [
	{
		id: "r1",
		author: "Bilal Khan",
		city: "Karachi",
		rating: 5,
		date: "3 days ago",
		title: "Phenomenal build quality",
		comment: "Honestly shocked at how good this feels. Zero plastic creak and sound is punchy and detailed. Arrived next day.",
		verified: true
	},
	{
		id: "r2",
		author: "Hamza Riaz",
		city: "Lahore",
		rating: 5,
		date: "1 week ago",
		title: "Worth every rupee",
		comment: "Saved 5% paying via JazzCash in advance. Received tracking number on WhatsApp in under an hour. 10/10 service.",
		verified: true
	},
	{
		id: "r3",
		author: "Ayesha Malik",
		city: "Islamabad",
		rating: 5,
		date: "2 weeks ago",
		title: "Super aesthetic and reliable",
		comment: "Looks straight out of an editorial design catalogue. Battery life has easily lasted me three straight workdays.",
		verified: true
	},
	{
		id: "r4",
		author: "Daniyal Shah",
		city: "Rawalpindi",
		rating: 4,
		date: "3 weeks ago",
		title: "Great everyday gear",
		comment: "Clean minimalist packaging with all required cables. Pairing with my laptop and phone was instant.",
		verified: true
	}
] };
var CITIES_DELIVERY = [
	{
		city: "Karachi",
		days: "1 business day",
		note: "Express dispatch (by 4 PM)"
	},
	{
		city: "Lahore",
		days: "1–2 business days",
		note: "Express courier"
	},
	{
		city: "Islamabad / Rawalpindi",
		days: "2 business days",
		note: "Standard courier"
	},
	{
		city: "Faisalabad",
		days: "2–3 business days",
		note: "Standard courier"
	},
	{
		city: "Multan",
		days: "2–3 business days",
		note: "Standard courier"
	},
	{
		city: "Peshawar",
		days: "2–4 business days",
		note: "Standard courier"
	},
	{
		city: "Quetta",
		days: "3–4 business days",
		note: "Standard courier"
	},
	{
		city: "Other Pakistan Cities",
		days: "3–5 business days",
		note: "Nationwide tracking"
	}
];
function ProductPage() {
	const { slug } = Route.useParams();
	const { data: p } = useSuspenseQuery(productQuery(slug));
	const { data: allProducts } = useSuspenseQuery(productsQuery());
	const { data: settings } = useSuspenseQuery(settingsQuery);
	const cart = useCart();
	const wishlist = useWishlist();
	const { items: recentlyViewed, recordView } = useRecentlyViewed();
	const imgRef = (0, import_react.useRef)(null);
	const buyBoxRef = (0, import_react.useRef)(null);
	const [activeImgIndex, setActiveImgIndex] = (0, import_react.useState)(0);
	const [lightboxOpen, setLightboxOpen] = (0, import_react.useState)(false);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [selectedCity, setSelectedCity] = (0, import_react.useState)("Karachi");
	const [showStickyBar, setShowStickyBar] = (0, import_react.useState)(false);
	const [reviews, setReviews] = (0, import_react.useState)(INITIAL_REVIEWS[slug] ?? INITIAL_REVIEWS.default);
	const [reviewModalOpen, setReviewModalOpen] = (0, import_react.useState)(false);
	const [newReview, setNewReview] = (0, import_react.useState)({
		name: "",
		city: "Karachi",
		rating: 5,
		title: "",
		comment: ""
	});
	const [bundleChecked, setBundleChecked] = (0, import_react.useState)(true);
	const initialVariant = p ? getProductVariants(p) : null;
	const [selectedColor, setSelectedColor] = (0, import_react.useState)(initialVariant?.colors[0]?.name ?? "Standard");
	const [selectedSize, setSelectedSize] = (0, import_react.useState)(initialVariant?.sizes[0]?.name ?? "Standard");
	(0, import_react.useEffect)(() => {
		if (p) recordView(p);
	}, [p]);
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			if (!buyBoxRef.current) return;
			const rect = buyBoxRef.current.getBoundingClientRect();
			setShowStickyBar(rect.bottom < 0);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	if (!p) return null;
	const isWishlisted = wishlist.has(p.id);
	const toggleWishlist = () => {
		wishlist.toggle({
			id: p.id,
			slug: p.slug,
			name: p.name,
			image: gallery[0]?.src ?? p.images[0] ?? "",
			unitPrice: totalPrice,
			listPrice: p.price + extraPrice,
			stock: p.stock
		});
		if (!isWishlisted) toast.success(`${p.name} saved to wishlist`);
		else toast("Removed from wishlist");
	};
	const gallery = productGallery(p);
	const variantInfo = getProductVariants(p);
	const extraPrice = variantInfo.sizes.find((s) => s.name === selectedSize)?.extraPrice ?? 0;
	const totalPrice = effectivePrice(p) + extraPrice;
	const onSale = p.sale_price != null && p.sale_price < p.price;
	const avail = availability(p);
	const advance = Math.round(totalPrice * (1 - settings.advanceDiscount / 100));
	const companion = allProducts.find((item) => item.id !== p.id && (p.slug.includes("headphone") || p.slug.includes("buds") ? item.slug.includes("cable") || item.slug.includes("power") : p.slug.includes("keyboard") ? item.slug.includes("mouse") : item.slug.includes("cable") || item.slug.includes("charger"))) ?? allProducts.find((item) => item.id !== p.id);
	const companionPrice = companion ? effectivePrice(companion) : 0;
	const bundleOriginalTotal = totalPrice + companionPrice;
	const bundleDiscountedTotal = Math.round(bundleOriginalTotal * .9);
	const relatedProducts = allProducts.filter((item) => item.id !== p.id).slice(0, 4);
	const add = () => {
		const variantLabel = `${selectedColor} / ${selectedSize}`;
		if (cart.add({
			id: p.id,
			slug: p.slug,
			name: `${p.name} (${variantLabel})`,
			image: gallery[activeImgIndex]?.src ?? p.images[0] ?? "",
			unitPrice: totalPrice,
			listPrice: p.price + extraPrice,
			stock: p.stock,
			variant: variantLabel
		}, qty)) {
			flyToCart(imgRef.current, cart.cartIconRef.current);
			toast.success(`${p.name} added to bag`, {
				description: variantLabel,
				action: {
					label: "View bag",
					onClick: () => cart.setOpen(true)
				}
			});
		} else toast("Not enough in stock", { description: `We only have ${p.stock}, and some may already be in your bag.` });
	};
	const addBundle = () => {
		if (!companion) return;
		const ok1 = cart.add({
			id: p.id,
			slug: p.slug,
			name: `${p.name} (${selectedColor})`,
			image: gallery[0]?.src ?? p.images[0] ?? "",
			unitPrice: Math.round(totalPrice * .9),
			listPrice: p.price,
			stock: p.stock,
			variant: `${selectedColor} · Bundle 10% Off`
		}, 1);
		const ok2 = cart.add({
			id: companion.id,
			slug: companion.slug,
			name: `${companion.name} (Bundle Companion)`,
			image: companion.images[0] ?? "",
			unitPrice: Math.round(companionPrice * .9),
			listPrice: companion.price,
			stock: companion.stock,
			variant: "Bundle Companion 10% Off"
		}, 1);
		if (ok1 && ok2) toast.success("Bundle added to bag with 10% off!", { action: {
			label: "View bag",
			onClick: () => cart.setOpen(true)
		} });
	};
	const submitReview = (e) => {
		e.preventDefault();
		if (!newReview.name || !newReview.title || !newReview.comment) {
			toast.error("Please fill in all review fields");
			return;
		}
		const created = {
			id: "rev_" + Date.now(),
			author: newReview.name,
			city: newReview.city,
			rating: newReview.rating,
			date: "Just now",
			title: newReview.title,
			comment: newReview.comment,
			verified: true
		};
		setReviews([created, ...reviews]);
		setReviewModalOpen(false);
		toast.success("Thank you for your verified review!");
		setNewReview({
			name: "",
			city: "Karachi",
			rating: 5,
			title: "",
			comment: ""
		});
	};
	const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1);
	const selectedDelivery = CITIES_DELIVERY.find((c) => c.city === selectedCity) ?? CITIES_DELIVERY[0];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-7xl px-5 pt-8 md:px-8 pb-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/shop",
						className: "hover:text-foreground",
						children: "Shop"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 275,
						columnNumber: 9
					}, this),
					p.category && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("span", { children: "/" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(Link, {
						to: "/shop",
						search: { cat: p.category.slug },
						className: "hover:text-foreground",
						children: p.category.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 278,
						columnNumber: 24
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "/" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 286,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-foreground truncate max-w-[200px]",
						children: p.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 287,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 274,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4 lg:sticky lg:top-24 h-fit",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						onClick: () => setLightboxOpen(true),
						className: "group relative aspect-square cursor-zoom-in overflow-hidden rounded-[2.5rem] border border-border/40 bg-surface/85 p-8 shadow-xs transition-all hover:border-primary/40 flex items-center justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, {
								mode: "wait",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.img, {
									ref: imgRef,
									src: gallery[activeImgIndex]?.src,
									alt: `${p.name} - ${gallery[activeImgIndex]?.label}`,
									width: 1024,
									height: 1024,
									className: "max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105",
									initial: {
										opacity: .4,
										scale: .98
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									exit: { opacity: .4 },
									transition: { duration: .25 }
								}, activeImgIndex, false, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 13
							}, this),
							onSale && /* @__PURE__ */ (void 0)("span", {
								className: "absolute left-6 top-6 rounded-full bg-primary px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-xs",
								children: [
									"−",
									Math.round((1 - p.sale_price / p.price) * 100),
									"%"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 24
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "absolute bottom-5 right-5 rounded-full bg-background/90 px-3 py-1 font-mono text-[11px] font-semibold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity",
								children: "Click to enlarge ↗"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]",
						children: gallery.map((img, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setActiveImgIndex(idx),
							className: `press relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-surface p-2 transition-all ${activeImgIndex === idx ? "border-primary ring-2 ring-primary/30" : "border-border/60 opacity-70 hover:opacity-100 hover:border-foreground/30"}`,
							"aria-label": `View photo ${idx + 1}: ${img.label}`,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: img.src,
								alt: "",
								className: "h-full w-full object-contain mix-blend-multiply"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 321,
								columnNumber: 17
							}, this)
						}, idx, false, {
							fileName: _jsxFileName,
							lineNumber: 320,
							columnNumber: 40
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 319,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 293,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [p.brand && /* @__PURE__ */ (void 0)("span", {
									className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
									children: p.brand
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 330,
									columnNumber: 27
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "#reviews",
									className: "flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex text-amber-500",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-3.5 w-3.5 fill-current" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 336,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 335,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-bold",
											children: avgRating
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 338,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: [
												"(",
												reviews.length,
												" reviews)"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 339,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 334,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 329,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-2 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl",
								children: p.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 343,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-lg text-muted-foreground leading-relaxed",
								children: p.short_description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 346,
								columnNumber: 13
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 rounded-2xl bg-primary/10 border border-primary/20 px-4 py-2.5 text-xs text-foreground font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Flame, { className: "h-4 w-4 text-primary animate-pulse shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 353,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
								"High demand: ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "5 orders placed in the last 24 hours" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 355,
									columnNumber: 28
								}, this),
								" across Pakistan."
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 354,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 352,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-3xl border border-border/50 bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-baseline gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `font-mono text-3xl font-extrabold ${onSale ? "text-primary" : ""}`,
										children: formatPKR(totalPrice)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 362,
										columnNumber: 15
									}, this), onSale && /* @__PURE__ */ (void 0)("span", {
										className: "font-mono text-muted-foreground line-through text-lg",
										children: formatPKR(p.price + extraPrice)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 365,
										columnNumber: 26
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 361,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-2 flex items-center gap-2 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Or" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 370,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono font-bold text-foreground",
											children: formatPKR(advance)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 371,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"with ",
											settings.advanceDiscount,
											"% advance payment discount (JazzCash/NayaPay)."
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 372,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 369,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `font-mono text-xs uppercase tracking-wider font-semibold ${avail.tone === "ok" ? "text-success" : avail.tone === "low" ? "text-primary" : "text-destructive"}`,
										children: ["● ", avail.label]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 375,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground",
										children: "· Warehouse verified stock"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 378,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 374,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 360,
							columnNumber: 11
						}, this),
						variantInfo.colors.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
									children: ["Select Colour: ", /* @__PURE__ */ (void 0)("strong", {
										className: "text-foreground",
										children: selectedColor
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 386,
										columnNumber: 34
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 385,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 384,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap gap-3",
								children: variantInfo.colors.map((c) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setSelectedColor(c.name),
									className: `press group flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${selectedColor === c.name ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/20" : "border-border/60 bg-surface text-muted-foreground hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: "h-4 w-4 rounded-full border border-black/15 shadow-xs",
											style: { backgroundColor: c.hex }
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 391,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("span", { children: c.name }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 394,
											columnNumber: 21
										}, this),
										selectedColor === c.name && /* @__PURE__ */ (void 0)(Check, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 395,
											columnNumber: 50
										}, this)
									]
								}, c.name, true, {
									fileName: _jsxFileName,
									lineNumber: 390,
									columnNumber: 46
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 389,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 383,
							columnNumber: 45
						}, this),
						variantInfo.sizes.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
								children: "Configuration / Edition"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 402,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: variantInfo.sizes.map((s) => /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setSelectedSize(s.name),
									className: `press flex items-center justify-between rounded-2xl border p-3.5 text-left text-xs font-semibold transition-all ${selectedSize === s.name ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/20" : "border-border/60 bg-surface text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "truncate",
										children: s.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 407,
										columnNumber: 21
									}, this), s.extraPrice && s.extraPrice > 0 ? /* @__PURE__ */ (void 0)("span", {
										className: "font-mono text-primary font-bold ml-2",
										children: ["+", formatPKR(s.extraPrice)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 408,
										columnNumber: 57
									}, this) : /* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground/80 font-normal ml-2",
										children: "Included"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 410,
										columnNumber: 33
									}, this)]
								}, s.name, true, {
									fileName: _jsxFileName,
									lineNumber: 406,
									columnNumber: 45
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 405,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 401,
							columnNumber: 44
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							ref: buyBoxRef,
							className: "space-y-4",
							children: avail.tone !== "out" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col gap-3 sm:flex-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex h-12 items-center justify-between rounded-full bg-surface px-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													className: "press h-9 w-9 rounded-full text-base font-bold hover:bg-muted",
													onClick: () => setQty((q) => Math.max(1, q - 1)),
													"aria-label": "Decrease quantity",
													children: "−"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 420,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "w-10 text-center font-mono font-bold text-sm",
													children: qty
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 423,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													className: "press h-9 w-9 rounded-full text-base font-bold disabled:opacity-30 hover:bg-muted",
													disabled: qty >= p.stock,
													onClick: () => setQty((q) => Math.min(p.stock, q + 1)),
													"aria-label": "Increase quantity",
													children: "+"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 424,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 419,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											onClick: add,
											className: "press flex-1 rounded-full bg-ink py-4 text-center font-semibold text-ink-foreground shadow-md transition-colors hover:bg-primary",
											children: ["Add to bag · ", formatPKR(totalPrice * qty)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 429,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "button",
											onClick: toggleWishlist,
											className: `press flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-all ${isWishlisted ? "border-destructive/30 bg-destructive/10 text-destructive ring-2 ring-destructive/20" : "border-border/60 bg-surface text-muted-foreground hover:text-foreground hover:bg-muted"}`,
											"aria-label": isWishlisted ? "Remove from wishlist" : "Save to wishlist",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `h-5 w-5 ${isWishlisted ? "fill-destructive" : ""}` }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 434,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 433,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 418,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: `https://wa.me/${(settings?.whatsappNumber ?? "923000000000").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Gubberz! I'm looking at ${p.name} (${selectedColor} / ${selectedSize}) for ${formatPKR(totalPrice)}. Is this in stock for express dispatch to ${selectedCity}?`)}`,
									target: "_blank",
									rel: "noreferrer",
									className: "press flex w-full items-center justify-center gap-2 rounded-full border border-success/30 bg-success/10 py-3 text-xs font-bold text-success hover:bg-success hover:text-white transition-all shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 440,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ask about this gadget on WhatsApp" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 441,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 417,
								columnNumber: 37
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-3xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive font-medium",
								children: "This gadget is currently sold out. Message us on WhatsApp to reserve the next batch."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 443,
								columnNumber: 24
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 416,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-3xl border bg-surface/60 p-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-4 w-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 452,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Estimate Delivery to your city" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 453,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 451,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1 text-xs text-success font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 456,
											columnNumber: 17
										}, this), " Order in next 3h"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 455,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 450,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-3",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: selectedCity,
										onChange: (e) => setSelectedCity(e.target.value),
										className: "h-10 flex-1 rounded-xl bg-background border px-3 text-xs font-medium outline-none ring-primary focus:ring-2",
										children: CITIES_DELIVERY.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: c.city,
											children: [
												c.city,
												" (",
												c.days,
												")"
											]
										}, c.city, true, {
											fileName: _jsxFileName,
											lineNumber: 462,
											columnNumber: 43
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 461,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 460,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl bg-background/80 p-3 text-xs flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Expected arrival:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 469,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-bold text-foreground",
										children: [
											selectedDelivery.days,
											" · ",
											selectedDelivery.note
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 470,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 468,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 449,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-2xl bg-surface/70 p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "h-5 w-5 text-primary shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 479,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-bold",
										children: "Fast Delivery"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 481,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-muted-foreground",
										children: "Across Pakistan"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 482,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 480,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 478,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-2xl bg-surface/70 p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-5 w-5 text-success shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 486,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-bold",
										children: "Genuine Guaranteed"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 488,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-muted-foreground",
										children: "Original quality test"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 489,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 487,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 485,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-2xl bg-surface/70 p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-5 w-5 text-primary shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 493,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-bold",
										children: "7-Day Replacement"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 495,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-muted-foreground",
										children: "Hassle-free exchange"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 496,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 494,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 492,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3 rounded-2xl bg-surface/70 p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-5 w-5 text-foreground shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 500,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-bold",
										children: "Cash on Delivery"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 502,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-muted-foreground",
										children: "Pay at your doorstep"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 503,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 501,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 499,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 477,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border-t pt-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-bold text-lg",
								children: "About this gadget"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 510,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								children: p.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 511,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 509,
							columnNumber: 11
						}, this),
						p.features.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "border-t pt-6",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-bold text-sm uppercase tracking-wider text-muted-foreground font-mono",
								children: "Key Highlights"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 516,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: p.features.map((f) => /* @__PURE__ */ (void 0)("li", {
									className: "flex items-start gap-2.5 text-sm font-medium",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-primary mt-0.5",
										children: "✦"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 521,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", { children: f }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 522,
										columnNumber: 21
									}, this)]
								}, f, true, {
									fileName: _jsxFileName,
									lineNumber: 520,
									columnNumber: 38
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 519,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 515,
							columnNumber: 37
						}, this),
						variantInfo.inBox.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "border-t pt-6",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-bold text-sm uppercase tracking-wider text-muted-foreground font-mono",
								children: "What's in the Box"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 529,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("ul", {
								className: "mt-3 space-y-2 text-sm text-muted-foreground",
								children: variantInfo.inBox.map((item, idx) => /* @__PURE__ */ (void 0)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(Check, { className: "h-4 w-4 text-success shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 534,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", { children: item }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 535,
										columnNumber: 21
									}, this)]
								}, idx, true, {
									fileName: _jsxFileName,
									lineNumber: 533,
									columnNumber: 55
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 532,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 528,
							columnNumber: 44
						}, this),
						Object.keys(p.specs).length > 0 && /* @__PURE__ */ (void 0)("details", {
							className: "group border-t pt-5",
							open: true,
							children: [/* @__PURE__ */ (void 0)("summary", {
								className: "flex cursor-pointer list-none items-center justify-between font-bold text-base",
								children: [/* @__PURE__ */ (void 0)("span", { children: "Technical Specifications" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 543,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-mono text-xl transition-transform group-open:rotate-45",
									children: "+"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 544,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 542,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("dl", {
								className: "mt-4 divide-y rounded-2xl bg-surface/50 p-4 text-sm",
								children: Object.entries(p.specs).map(([k, v]) => /* @__PURE__ */ (void 0)("div", {
									className: "flex justify-between py-2.5",
									children: [/* @__PURE__ */ (void 0)("dt", {
										className: "text-muted-foreground",
										children: k
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 548,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("dd", {
										className: "font-mono font-medium",
										children: String(v)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 549,
										columnNumber: 21
									}, this)]
								}, k, true, {
									fileName: _jsxFileName,
									lineNumber: 547,
									columnNumber: 58
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 541,
							columnNumber: 47
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border-t pt-6 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
								children: "Universal System Compatibility"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 556,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"iOS / iPhone",
									"Android",
									"macOS",
									"Windows 10/11",
									"iPadOS",
									"USB-C PD"
								].map((os) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-foreground border border-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3 w-3 text-success" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 561,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: os }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 562,
										columnNumber: 21
									}, this)]
								}, os, true, {
									fileName: _jsxFileName,
									lineNumber: 560,
									columnNumber: 102
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 559,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 555,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border-t pt-6 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-bold text-base",
									children: "Frequently Asked Questions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 569,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "divide-y rounded-2xl bg-surface/40 border",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", {
											className: "group p-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", {
												className: "flex cursor-pointer list-none items-center justify-between text-xs font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "How does Cash on Delivery (COD) work?" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 573,
													columnNumber: 19
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-mono text-muted-foreground transition-transform group-open:rotate-45",
													children: "+"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 574,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 572,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-2 text-xs text-muted-foreground leading-relaxed",
												children: "No advance payment needed. When the courier rider arrives at your doorstep, you simply pay cash. You will receive an automated WhatsApp dispatch update with live tracking."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 578,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 571,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", {
											className: "group p-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", {
												className: "flex cursor-pointer list-none items-center justify-between text-xs font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "What is the 7-day replacement guarantee?" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 587,
													columnNumber: 19
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-mono text-muted-foreground transition-transform group-open:rotate-45",
													children: "+"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 588,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 586,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-2 text-xs text-muted-foreground leading-relaxed",
												children: "If your gadget experiences any defect, charging failure, or shipping damage, we arrange a free reverse pickup and replace your item immediately at zero cost."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 592,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 585,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", {
											className: "group p-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", {
												className: "flex cursor-pointer list-none items-center justify-between text-xs font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
													"How do I get the ",
													settings.advanceDiscount,
													"% advance discount?"
												] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 600,
													columnNumber: 19
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-mono text-muted-foreground transition-transform group-open:rotate-45",
													children: "+"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 601,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 599,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-2 text-xs text-muted-foreground leading-relaxed",
												children: [
													"Select \"JazzCash / NayaPay / Bank Transfer\" at checkout to instantly save",
													" ",
													settings.advanceDiscount,
													"% on your order. Instructions and account details are displayed directly in the order confirmation screen."
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 605,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 598,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", {
											className: "group p-4",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", {
												className: "flex cursor-pointer list-none items-center justify-between text-xs font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Is this 100% genuine and original?" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 614,
													columnNumber: 19
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-mono text-muted-foreground transition-transform group-open:rotate-45",
													children: "+"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 615,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 613,
												columnNumber: 17
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mt-2 text-xs text-muted-foreground leading-relaxed",
												children: "Yes, every unit is sourced directly through verified distribution partners and individually tested before packing in Karachi."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 619,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 612,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 570,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "pt-1",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: "/policies",
										className: "text-xs font-semibold text-primary hover:underline flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Read our full Store Policies & Guarantees" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 628,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "→" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 629,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 627,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 626,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 568,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 327,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 291,
				columnNumber: 7
			}, this),
			companion && /* @__PURE__ */ (void 0)("section", {
				className: "mt-20 rounded-[2.5rem] border border-border/50 bg-card p-6 md:p-10",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold",
						children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 639,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Frequently Bought Together" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 640,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 638,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h2", {
						className: "mt-2 text-2xl font-extrabold tracking-tight md:text-3xl",
						children: "Upgrade your setup & save 10%"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 642,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "mt-8 grid gap-8 md:grid-cols-[1fr_auto_1fr_auto] items-center",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-4 rounded-2xl bg-surface/60 p-4",
								children: [/* @__PURE__ */ (void 0)("img", {
									src: gallery[0]?.src,
									alt: "",
									className: "h-20 w-20 rounded-xl object-contain mix-blend-multiply bg-surface"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 649,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)("p", {
										className: "font-bold text-sm",
										children: p.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 651,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "font-mono text-sm text-foreground",
										children: formatPKR(totalPrice)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 652,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] text-muted-foreground",
										children: "Current selection"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 653,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 650,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 648,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-full bg-surface font-bold text-muted-foreground mx-auto",
								children: "+"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 657,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-4 rounded-2xl bg-surface/60 p-4",
								children: [/* @__PURE__ */ (void 0)("img", {
									src: imageSrc(companion.images[0]),
									alt: "",
									className: "h-20 w-20 rounded-xl object-contain mix-blend-multiply bg-surface"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 663,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "font-bold text-sm",
											children: companion.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 665,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-sm text-foreground",
											children: formatPKR(companionPrice)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 666,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("label", {
											className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground cursor-pointer",
											children: [/* @__PURE__ */ (void 0)("input", {
												type: "checkbox",
												checked: bundleChecked,
												onChange: (e) => setBundleChecked(e.target.checked),
												className: "rounded text-primary focus:ring-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 668,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("span", { children: "Include companion" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 669,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 667,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 664,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 662,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl bg-surface p-5 text-center md:text-right border border-border/40",
								children: [
									/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground",
										children: "Bundle Price (10% Off)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 676,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-baseline justify-center md:justify-end gap-2 mt-1",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-mono text-2xl font-extrabold text-primary",
											children: formatPKR(bundleChecked ? bundleDiscountedTotal : totalPrice)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 678,
											columnNumber: 17
										}, this), bundleChecked && /* @__PURE__ */ (void 0)("span", {
											className: "font-mono text-sm text-muted-foreground line-through",
											children: formatPKR(bundleOriginalTotal)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 681,
											columnNumber: 35
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 677,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: bundleChecked ? addBundle : add,
										className: "press mt-3 w-full rounded-full bg-ink px-6 py-3 font-semibold text-xs text-ink-foreground hover:bg-primary shadow-sm",
										children: bundleChecked ? "Add Bundle to Bag" : "Add Selected to Bag"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 685,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 675,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 646,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 637,
				columnNumber: 21
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "reviews",
				className: "mt-20 scroll-mt-24 border-t pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex text-amber-500",
								children: [
									1,
									2,
									3,
									4,
									5
								].map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-5 w-5 fill-current" }, s, false, {
									fileName: _jsxFileName,
									lineNumber: 698,
									columnNumber: 43
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 697,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-2xl font-black",
								children: [avgRating, " out of 5"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 700,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 696,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Based on ",
								reviews.length,
								" verified customer reviews across Pakistan"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 702,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 695,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setReviewModalOpen(true),
							className: "press rounded-full bg-ink px-6 py-2.5 text-xs font-semibold text-ink-foreground hover:bg-primary",
							children: "Write a Review"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 707,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 694,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 grid gap-2 max-w-md rounded-2xl bg-surface/50 p-4 text-xs font-mono",
						children: [
							{
								stars: "5 Stars",
								count: reviews.filter((r) => r.rating === 5).length,
								pct: "80%"
							},
							{
								stars: "4 Stars",
								count: reviews.filter((r) => r.rating === 4).length,
								pct: "20%"
							},
							{
								stars: "3 Stars",
								count: reviews.filter((r) => r.rating === 3).length,
								pct: "0%"
							},
							{
								stars: "2 Stars",
								count: reviews.filter((r) => r.rating === 2).length,
								pct: "0%"
							},
							{
								stars: "1 Star",
								count: reviews.filter((r) => r.rating === 1).length,
								pct: "0%"
							}
						].map((b) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "w-16 text-muted-foreground",
									children: b.stars
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 735,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-2 flex-1 rounded-full bg-border overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-full bg-amber-500 rounded-full",
										style: { width: b.pct }
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 737,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 736,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "w-6 text-right text-muted-foreground",
									children: b.count
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 741,
									columnNumber: 15
								}, this)
							]
						}, b.stars, true, {
							fileName: _jsxFileName,
							lineNumber: 734,
							columnNumber: 21
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 713,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-10 grid gap-6 md:grid-cols-2",
						children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-3xl border bg-card p-6 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex text-amber-500",
										children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "h-4 w-4 fill-current" }, i, false, {
											fileName: _jsxFileName,
											lineNumber: 752,
											columnNumber: 32
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 749,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-mono text-muted-foreground",
										children: r.date
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 754,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 748,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "font-bold text-base",
									children: r.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 756,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: r.comment
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 757,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between border-t border-border/40 pt-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-bold",
										children: [
											r.author,
											" · ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-muted-foreground font-normal",
												children: r.city
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 760,
												columnNumber: 32
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 759,
										columnNumber: 17
									}, this), r.verified && /* @__PURE__ */ (void 0)("span", {
										className: "flex items-center gap-1 font-mono text-[10px] text-success font-semibold",
										children: [/* @__PURE__ */ (void 0)(Check, { className: "h-3 w-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 763,
											columnNumber: 21
										}, this), " Verified Buyer"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 762,
										columnNumber: 32
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 758,
									columnNumber: 15
								}, this)
							]
						}, r.id, true, {
							fileName: _jsxFileName,
							lineNumber: 747,
							columnNumber: 29
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 746,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 693,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "mt-24 border-t pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
						children: "Explore More"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 774,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-1 text-3xl font-extrabold tracking-tight",
						children: "You might also like"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 777,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 773,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/shop",
						className: "text-sm font-semibold text-primary hover:underline",
						children: "View all gadgets →"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 779,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 772,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: relatedProducts.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
							product: item,
							size: "md"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 786,
							columnNumber: 15
						}, this)
					}, item.id, false, {
						fileName: _jsxFileName,
						lineNumber: 785,
						columnNumber: 40
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 784,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 771,
				columnNumber: 7
			}, this),
			recentlyViewed.filter((item) => item.id !== p.id).length > 0 && /* @__PURE__ */ (void 0)("section", {
				className: "mt-20 border-t pt-16",
				children: [
					/* @__PURE__ */ (void 0)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
						children: "History"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 793,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("h2", {
						className: "mt-1 text-2xl font-extrabold tracking-tight",
						children: "Recently viewed gadgets"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 796,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]",
						children: recentlyViewed.filter((item) => item.id !== p.id).map((item) => /* @__PURE__ */ (void 0)(Link, {
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
										lineNumber: 802,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 801,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("h4", {
									className: "mt-3 truncate text-xs font-bold",
									children: item.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 804,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-0.5 font-mono text-xs text-primary font-bold",
									children: formatPKR(item.price)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 805,
									columnNumber: 19
								}, this)
							]
						}, item.id, true, {
							fileName: _jsxFileName,
							lineNumber: 798,
							columnNumber: 74
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 797,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 792,
				columnNumber: 70
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: showStickyBar && /* @__PURE__ */ (void 0)(motion.div, {
				initial: {
					y: 80,
					opacity: 0
				},
				animate: {
					y: 0,
					opacity: 1
				},
				exit: {
					y: 80,
					opacity: 0
				},
				transition: {
					type: "spring",
					stiffness: 350,
					damping: 30
				},
				className: "fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur-md px-5 py-3 shadow-2xl",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (void 0)("img", {
							src: gallery[activeImgIndex]?.src,
							alt: "",
							className: "h-11 w-11 rounded-xl object-contain bg-surface mix-blend-multiply border"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 830,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "truncate font-bold text-sm",
								children: p.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 832,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "truncate text-xs text-muted-foreground font-mono",
								children: [
									selectedColor,
									" · ",
									selectedSize
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 833,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 831,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 829,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-4 shrink-0",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "text-right hidden sm:block font-mono",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-bold text-base text-foreground",
								children: formatPKR(totalPrice)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 841,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[10px] text-success",
								children: "In Stock"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 842,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 840,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("button", {
							onClick: add,
							className: "press rounded-full bg-ink px-6 py-2.5 font-semibold text-xs text-ink-foreground hover:bg-primary shadow-sm",
							children: "Add to bag"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 845,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 839,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 828,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 814,
				columnNumber: 27
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 813,
				columnNumber: 7
			}, this),
			reviewModalOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (void 0)("h3", {
							className: "text-xl font-extrabold",
							children: "Write a Customer Review"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 856,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: ["Share your experience with ", p.name]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 857,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("form", {
							onSubmit: submitReview,
							className: "mt-5 space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-mono uppercase text-muted-foreground mb-1",
									children: "Overall Rating"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 863,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex gap-2",
									children: [
										1,
										2,
										3,
										4,
										5
									].map((s) => /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setNewReview({
											...newReview,
											rating: s
										}),
										className: "p-1 text-amber-500 focus:outline-none",
										children: /* @__PURE__ */ (void 0)(Star, { className: `h-6 w-6 ${s <= newReview.rating ? "fill-current" : "stroke-current text-muted-foreground"}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 871,
											columnNumber: 23
										}, this)
									}, s, false, {
										fileName: _jsxFileName,
										lineNumber: 867,
										columnNumber: 45
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 866,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 862,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-mono uppercase text-muted-foreground mb-1",
										children: "Your Name"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 878,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										required: true,
										value: newReview.name,
										onChange: (e) => setNewReview({
											...newReview,
											name: e.target.value
										}),
										placeholder: "e.g. Zainab A.",
										className: "h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 881,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 877,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-mono uppercase text-muted-foreground mb-1",
										children: "City"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 887,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: newReview.city,
										onChange: (e) => setNewReview({
											...newReview,
											city: e.target.value
										}),
										className: "h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2",
										children: CITIES_DELIVERY.map((c) => /* @__PURE__ */ (void 0)("option", {
											value: c.city,
											children: c.city
										}, c.city, false, {
											fileName: _jsxFileName,
											lineNumber: 894,
											columnNumber: 47
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 890,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 886,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 876,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-mono uppercase text-muted-foreground mb-1",
									children: "Review Headline"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 902,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									required: true,
									value: newReview.title,
									onChange: (e) => setNewReview({
										...newReview,
										title: e.target.value
									}),
									placeholder: "e.g. Best headphones I've owned",
									className: "h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 905,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 901,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-mono uppercase text-muted-foreground mb-1",
									children: "Review Details"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 912,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("textarea", {
									required: true,
									rows: 3,
									value: newReview.comment,
									onChange: (e) => setNewReview({
										...newReview,
										comment: e.target.value
									}),
									placeholder: "Tell other shoppers what you loved about sound, comfort, delivery, or battery...",
									className: "w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 915,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 911,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex justify-end gap-3 pt-2",
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setReviewModalOpen(false),
										className: "press rounded-full bg-surface px-4 py-2 text-xs font-medium",
										children: "Cancel"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 922,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "submit",
										className: "press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground hover:bg-primary",
										children: "Submit Review"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 925,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 921,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 861,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 855,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 854,
				columnNumber: 27
			}, this),
			lightboxOpen && /* @__PURE__ */ (void 0)("div", {
				onClick: () => setLightboxOpen(false),
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "relative max-w-4xl max-h-[85vh] p-4",
					children: [/* @__PURE__ */ (void 0)("img", {
						src: gallery[activeImgIndex]?.src,
						alt: "",
						className: "max-h-[80vh] w-auto mx-auto object-contain rounded-2xl"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 936,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "mt-3 text-center text-sm font-mono text-white/80",
						children: [gallery[activeImgIndex]?.label, " · Click anywhere to close"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 937,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 935,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 934,
				columnNumber: 24
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 272,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProductPage as component };
