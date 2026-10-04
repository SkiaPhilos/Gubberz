import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { b as Link } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { a as formatPKR, i as effectivePrice, s as imageSrc, t as availability } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { n as toast } from "./_libs/sonner-6wP9uXZa.mjs";
import { k as Heart, v as Plus } from "./_libs/lucide-react-DxlvYDqj.mjs";
import { t as Button } from "./button-CL26GRh8-BmVf9hhg.mjs";
import { n as flyToCart, r as useCart } from "./cart-CbB_gWfm-Djd8soCc.mjs";
import { r as useWishlist } from "./discovery-0BgSzSUb-tnoJgiXO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-Y97FfztB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/shop/ProductCard.tsx";
function ProductCard({ product, size = "md" }) {
	const imgRef = (0, import_react.useRef)(null);
	const cart = useCart();
	const wishlist = useWishlist();
	const price = effectivePrice(product);
	const onSale = price < product.price;
	const avail = availability(product);
	const isWishlisted = wishlist.has(product.id);
	const add = () => {
		if (cart.add({
			id: product.id,
			slug: product.slug,
			name: product.name,
			image: product.images[0] ?? "",
			unitPrice: price,
			listPrice: product.price,
			stock: product.stock
		})) {
			flyToCart(imgRef.current, cart.cartIconRef.current);
			toast.success(`${product.name} is in your bag`);
		} else toast("That's all we've got", { description: `Only ${product.stock} in stock right now.` });
	};
	const toggleWishlist = (e) => {
		e.preventDefault();
		e.stopPropagation();
		wishlist.toggle({
			id: product.id,
			slug: product.slug,
			name: product.name,
			image: product.images[0] ?? "",
			unitPrice: price,
			listPrice: product.price,
			stock: product.stock
		});
		if (!isWishlisted) toast.success(`${product.name} saved to wishlist`);
		else toast("Removed from wishlist");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "group relative flex h-full flex-col justify-between rounded-3xl border border-border/40 bg-card p-4 transition-all duration-300 hover:border-border hover:shadow-md",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/product/$slug",
			params: { slug: product.slug },
			className: "block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: `relative flex items-center justify-center overflow-hidden rounded-2xl bg-surface/80 p-6 ${size === "lg" ? "aspect-square md:aspect-[4/5]" : "aspect-square"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						ref: imgRef,
						src: imageSrc(product.images[0]),
						alt: product.name,
						width: 1024,
						height: 1024,
						loading: "lazy",
						className: "h-full w-full max-h-64 object-contain mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-safe:group-hover:scale-105 motion-safe:group-hover:-rotate-1 motion-safe:group-active:scale-95"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 11
					}, this),
					onSale && /* @__PURE__ */ (void 0)("span", {
						className: "absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs",
						children: [
							"−",
							Math.round((1 - price / product.price) * 100),
							"%"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 87,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: toggleWishlist,
						className: `press absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-xs transition-colors hover:bg-background ${isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-foreground"}`,
						"aria-label": isWishlisted ? "Remove from wishlist" : "Save to wishlist",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Heart, { className: `h-4 w-4 ${isWishlisted ? "fill-destructive" : ""}` }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 11
					}, this),
					avail.tone === "out" && /* @__PURE__ */ (void 0)("span", {
						className: "absolute bottom-3 right-3 rounded-full bg-background/95 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground shadow-xs",
						children: "Sold out"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 px-1",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "truncate text-base font-bold leading-snug group-hover:text-primary transition-colors",
							children: product.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
							children: product.short_description
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "shrink-0 text-right font-mono text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `font-bold ${onSale ? "text-primary" : "text-foreground"}`,
							children: formatPKR(price)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 15
						}, this), onSale && /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-muted-foreground line-through",
							children: formatPKR(product.price)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 121,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-4 flex items-center justify-between border-t border-border/40 pt-3 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: `font-mono text-[11px] uppercase tracking-wider ${avail.tone === "ok" ? "text-success" : avail.tone === "low" ? "text-primary font-semibold" : "text-destructive"}`,
				children: ["● ", avail.label]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 9
			}, this), avail.tone !== "out" && /* @__PURE__ */ (void 0)(Button, {
				onClick: add,
				size: "sm",
				"aria-label": `Add ${product.name} to bag`,
				className: "press flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-ink-foreground shadow-xs transition-colors hover:bg-primary",
				children: [/* @__PURE__ */ (void 0)(Plus, { className: "h-3.5 w-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 155,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("span", { children: "Add" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 135,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
//#endregion
export { ProductCard as t };
