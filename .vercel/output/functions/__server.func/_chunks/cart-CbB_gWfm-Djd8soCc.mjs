import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-CbB_gWfm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/lib/cart.tsx";
var Ctx = (0, import_react.createContext)(null);
var CART_STORAGE_KEY = "gubberz_cart_v1";
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [bump, setBump] = (0, import_react.useState)(0);
	const cartIconRef = (0, import_react.useRef)(null);
	const isLoadedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		try {
			const stored = localStorage.getItem(CART_STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) setItems(parsed);
			}
		} catch {} finally {
			isLoadedRef.current = true;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isLoadedRef.current) return;
		try {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items]);
	const add = (0, import_react.useCallback)((item, qty = 1) => {
		let ok = true;
		setItems((prev) => {
			const existing = prev.find((i) => i.id === item.id);
			const current = existing?.qty ?? 0;
			if (current + qty > item.stock) {
				ok = false;
				return prev;
			}
			if (existing) return prev.map((i) => i.id === item.id ? {
				...i,
				...item,
				qty: current + qty
			} : i);
			return [...prev, {
				...item,
				qty
			}];
		});
		if (ok) setTimeout(() => setBump((b) => b + 1), 550);
		return ok;
	}, []);
	const setQty = (0, import_react.useCallback)((id, qty) => {
		setItems((prev) => prev.map((i) => i.id === id ? {
			...i,
			qty: Math.max(1, Math.min(qty, i.stock))
		} : i));
	}, []);
	const remove = (0, import_react.useCallback)((id) => {
		setItems((prev) => prev.filter((i) => i.id !== id));
	}, []);
	const clear = (0, import_react.useCallback)(() => {
		setItems([]);
		try {
			localStorage.removeItem(CART_STORAGE_KEY);
		} catch {}
	}, []);
	const value = (0, import_react.useMemo)(() => {
		const count = items.reduce((s, i) => s + i.qty, 0);
		const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
		const savings = items.reduce((s, i) => s + i.qty * (i.listPrice - i.unitPrice), 0);
		return {
			items,
			count,
			subtotal,
			savings,
			open,
			setOpen,
			add,
			setQty,
			remove,
			clear,
			bump,
			cartIconRef
		};
	}, [
		items,
		open,
		add,
		setQty,
		remove,
		clear,
		bump
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ctx.Provider, {
		value,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 133,
		columnNumber: 10
	}, this);
}
function useCart() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useCart outside CartProvider");
	return c;
}
/** Clones an image and flies it to the cart icon. */
function flyToCart(img, target) {
	if (!img || !target || typeof window === "undefined") return;
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const from = img.getBoundingClientRect();
	const to = target.getBoundingClientRect();
	const ghost = img.cloneNode(true);
	Object.assign(ghost.style, {
		position: "fixed",
		left: `${from.left}px`,
		top: `${from.top}px`,
		width: `${from.width}px`,
		height: `${from.height}px`,
		zIndex: "100",
		pointerEvents: "none",
		borderRadius: "24px",
		objectFit: "cover"
	});
	document.body.appendChild(ghost);
	const dx = to.left + to.width / 2 - (from.left + from.width / 2);
	const dy = to.top + to.height / 2 - (from.top + from.height / 2);
	const anim = ghost.animate([
		{
			transform: "translate(0,0) scale(1) rotate(0deg)",
			opacity: 1
		},
		{
			transform: `translate(${dx * .5}px, ${dy * .5 - 80}px) scale(0.45) rotate(-12deg)`,
			opacity: 1,
			offset: .55
		},
		{
			transform: `translate(${dx}px, ${dy}px) scale(0.06) rotate(-24deg)`,
			opacity: .6
		}
	], {
		duration: 600,
		easing: "cubic-bezier(.5,0,.3,1)"
	});
	anim.onfinish = () => ghost.remove();
}
//#endregion
export { flyToCart as n, useCart as r, CartProvider as t };
