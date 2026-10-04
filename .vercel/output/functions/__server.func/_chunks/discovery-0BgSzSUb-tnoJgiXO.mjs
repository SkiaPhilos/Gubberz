import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discovery-0BgSzSUb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/lib/discovery.tsx";
var WishlistContext = (0, import_react.createContext)(null);
var RecentlyViewedContext = (0, import_react.createContext)(null);
var WISHLIST_STORAGE_KEY = "gubberz_wishlist_v1";
var RECENTLY_VIEWED_STORAGE_KEY = "gubberz_recent_v1";
function DiscoveryProvider({ children }) {
	const [wishlist, setWishlist] = (0, import_react.useState)([]);
	const [wishlistOpen, setWishlistOpen] = (0, import_react.useState)(false);
	const [recentlyViewed, setRecentlyViewed] = (0, import_react.useState)([]);
	const isLoadedRef = import_react.useRef(false);
	(0, import_react.useEffect)(() => {
		try {
			const storedW = localStorage.getItem(WISHLIST_STORAGE_KEY);
			if (storedW) setWishlist(JSON.parse(storedW));
			const storedR = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
			if (storedR) setRecentlyViewed(JSON.parse(storedR));
		} catch {} finally {
			isLoadedRef.current = true;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isLoadedRef.current) return;
		try {
			localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
		} catch {}
	}, [wishlist]);
	(0, import_react.useEffect)(() => {
		if (!isLoadedRef.current) return;
		try {
			localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(recentlyViewed));
		} catch {}
	}, [recentlyViewed]);
	const toggleWishlist = (item) => {
		setWishlist((prev) => {
			if (prev.some((i) => i.id === item.id)) return prev.filter((i) => i.id !== item.id);
			return [item, ...prev];
		});
	};
	const addWishlist = (item) => {
		setWishlist((prev) => {
			if (prev.some((i) => i.id === item.id)) return prev;
			return [item, ...prev];
		});
	};
	const removeWishlist = (id) => {
		setWishlist((prev) => prev.filter((i) => i.id !== id));
	};
	const hasWishlist = (id) => wishlist.some((i) => i.id === id);
	const recordView = (p) => {
		setRecentlyViewed((prev) => {
			const filtered = prev.filter((i) => i.id !== p.id);
			return [{
				id: p.id,
				slug: p.slug,
				name: p.name,
				image: p.images[0] ?? "",
				price: p.price,
				salePrice: p.sale_price,
				shortDescription: p.short_description
			}, ...filtered].slice(0, 8);
		});
	};
	const clearRecentlyViewed = () => setRecentlyViewed([]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WishlistContext.Provider, {
		value: {
			items: wishlist,
			count: wishlist.length,
			isOpen: wishlistOpen,
			setOpen: setWishlistOpen,
			toggle: toggleWishlist,
			add: addWishlist,
			remove: removeWishlist,
			has: hasWishlist
		},
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RecentlyViewedContext.Provider, {
			value: {
				items: recentlyViewed,
				recordView,
				clear: clearRecentlyViewed
			},
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 141,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 129,
		columnNumber: 5
	}, this);
}
function useWishlist() {
	const ctx = (0, import_react.useContext)(WishlistContext);
	if (!ctx) throw new Error("useWishlist must be used within DiscoveryProvider");
	return ctx;
}
function useRecentlyViewed() {
	const ctx = (0, import_react.useContext)(RecentlyViewedContext);
	if (!ctx) throw new Error("useRecentlyViewed must be used within DiscoveryProvider");
	return ctx;
}
//#endregion
export { useRecentlyViewed as n, useWishlist as r, DiscoveryProvider as t };
