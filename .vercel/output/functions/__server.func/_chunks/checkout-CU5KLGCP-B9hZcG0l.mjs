import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { G as isRedirect, S as useRouter, b as Link, x as useNavigate } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { r as useSuspenseQuery } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { t as supabase } from "./client-BpRE6ta9-DiENUv8t.mjs";
import { a as formatPKR, l as placeOrder, p as settingsQuery, s as imageSrc } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { n as toast } from "./_libs/sonner-6wP9uXZa.mjs";
import { A as Gift, B as Check, H as Banknote, I as CreditCard, i as Truck, n as User, p as ShieldCheck, s as Tag } from "./_libs/lucide-react-DxlvYDqj.mjs";
import { r as useCart } from "./cart-CbB_gWfm-Djd8soCc.mjs";
import { t as useAuth } from "./use-auth-CWZcRUpe-CWmo13a5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-CU5KLGCP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var _jsxFileName = "/app/applet/src/routes/checkout.tsx?tsr-split=component";
function Checkout() {
	const cart = useCart();
	const { data: s } = useSuspenseQuery(settingsQuery);
	const navigate = useNavigate();
	const place = useServerFn(placeOrder);
	const [method, setMethod] = (0, import_react.useState)("cod");
	const [file, setFile] = (0, import_react.useState)(null);
	const { user, signInWithGoogle, signOut } = useAuth();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [isGift, setIsGift] = (0, import_react.useState)(false);
	const [promoInput, setPromoInput] = (0, import_react.useState)("");
	const [appliedPromo, setAppliedPromo] = (0, import_react.useState)(null);
	const [promoError, setPromoError] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		address: "",
		city: "Karachi",
		notes: ""
	});
	(0, import_react.useEffect)(() => {
		if (user) setForm((prev) => ({
			...prev,
			email: user.email || prev.email,
			name: prev.name || user.user_metadata?.full_name || user.user_metadata?.name || (user.email ? user.email.split("@")[0] : ""),
			phone: prev.phone || user.user_metadata?.phone || (typeof window !== "undefined" ? localStorage.getItem("gubberz_customer_phone") || "" : ""),
			address: prev.address || user.user_metadata?.address || (typeof window !== "undefined" ? localStorage.getItem("gubberz_customer_address") || "" : ""),
			city: prev.city || user.user_metadata?.city || (typeof window !== "undefined" ? localStorage.getItem("gubberz_customer_city") || "" : "") || "Karachi"
		}));
		else if (typeof window !== "undefined") setForm((prev) => ({
			...prev,
			phone: prev.phone || localStorage.getItem("gubberz_customer_phone") || "",
			address: prev.address || localStorage.getItem("gubberz_customer_address") || "",
			city: prev.city || localStorage.getItem("gubberz_customer_city") || "Karachi"
		}));
	}, [user]);
	const isFreeShipping = cart.subtotal >= 15e3;
	const deliveryFee = isFreeShipping ? 0 : s.deliveryFee;
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
	const subtotalAfterPromo = Math.max(0, cart.subtotal - promoDiscount);
	const advance = method !== "cod";
	const advanceDiscount = advance ? Math.round(subtotalAfterPromo * s.advanceDiscount / 100) : 0;
	const total = subtotalAfterPromo - advanceDiscount + deliveryFee;
	const account = s.accounts.find((a) => a.id === method);
	async function submit(e) {
		e.preventDefault();
		if (advance && !file) {
			toast.error("Please attach a screenshot of your payment.");
			return;
		}
		setBusy(true);
		try {
			let proof = null;
			if (file) {
				if (file.size > 5242880) throw new Error("Screenshot must be under 5 MB.");
				const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
				const path = `${crypto.randomUUID()}.${ext}`;
				const { error } = await supabase.storage.from("payment-proofs").upload(path, file, { contentType: file.type });
				if (error) throw new Error("Could not upload your screenshot. Try again.");
				proof = path;
			}
			const notesCombined = [
				isGift ? "[GIFT ORDER] Please include gift packaging" : "",
				form.notes ? form.notes : "",
				appliedPromo ? `[PROMO: ${appliedPromo.code} -${appliedPromo.pct}%]` : ""
			].filter(Boolean).join(" | ");
			const res = await place({ data: {
				customer: {
					...form,
					notes: notesCombined
				},
				items: cart.items.map((i) => ({
					id: i.id,
					qty: i.qty
				})),
				method,
				proof
			} });
			if (!res.ok) throw new Error(res.error);
			if (typeof window !== "undefined") {
				localStorage.setItem("gubberz_customer_phone", form.phone);
				localStorage.setItem("gubberz_customer_address", form.address);
				localStorage.setItem("gubberz_customer_city", form.city);
			}
			if (user) supabase.auth.updateUser({ data: {
				full_name: form.name,
				phone: form.phone,
				address: form.address,
				city: form.city
			} }).catch(() => {});
			cart.clear();
			navigate({
				to: "/order",
				search: {
					code: res.code,
					phone: form.phone
				}
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	}
	if (cart.items.length === 0) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-xl px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-4xl font-extrabold",
				children: "Your bag is empty."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 176,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Add gadgets to your bag before checking out."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 177,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/shop",
				className: "press mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground",
				children: "Start Browsing"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 178,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 175,
		columnNumber: 12
	}, this);
	const field = (k, label, props = {}) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 184,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
			...props,
			value: form[k],
			onChange: (e) => setForm({
				...form,
				[k]: e.target.value
			}),
			className: "mt-1 h-12 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2 border border-border/50"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 185,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 183,
		columnNumber: 115
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
		onSubmit: submit,
		className: "mx-auto grid max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1fr_400px]",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-mono text-xs uppercase tracking-widest text-primary font-bold",
					children: "Fast & Safe Dispatch"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 193,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-1 text-4xl font-extrabold tracking-tight md:text-5xl",
					children: "Checkout"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border bg-surface/60 p-4 flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "h-4 w-4 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 13
						}, this), isFreeShipping ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-success font-bold flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 17
							}, this), " You've qualified for FREE Delivery across Pakistan!"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 31
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Standard Express Courier across Pakistan: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: formatPKR(s.deliveryFee) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 206,
							columnNumber: 59
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 25
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 201,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-muted-foreground hidden sm:block",
						children: "1–3 Days"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 209,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 200,
					columnNumber: 9
				}, this),
				user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-success/30 bg-success/5 p-4 flex flex-wrap items-center justify-between gap-3 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-success/20 text-success font-bold",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 216,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-bold text-foreground",
							children: ["Signed in as ", user.user_metadata?.full_name || user.email]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-muted-foreground text-[11px]",
							children: "Your contact details and delivery preferences are prefilled automatically."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 214,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: async () => {
							await signOut();
							toast.success("Signed out of checkout");
						},
						className: "press text-muted-foreground hover:text-foreground font-mono underline text-[11px]",
						children: "Switch account"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 227,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 213,
					columnNumber: 17
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-wrap items-center justify-between gap-4 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-bold text-foreground text-sm flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "h-4 w-4 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 17
						}, this), " Sign in for fastest checkout"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 235,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground text-[11px] mt-0.5",
						children: "Automatically pre-fill your saved details, track delivery status, and earn perks."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 234,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => signInWithGoogle("/checkout"),
							className: "press flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-bold text-xs text-ink-foreground shadow-xs hover:bg-primary",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
								className: "h-3.5 w-3.5",
								viewBox: "0 0 24 24",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "currentColor",
										d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 245,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "currentColor",
										d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 246,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "currentColor",
										d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 247,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "currentColor",
										d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 248,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 244,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Continue with Google" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 243,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/auth",
							search: { returnTo: "/checkout" },
							className: "press rounded-full bg-surface px-3.5 py-2 font-semibold text-foreground hover:bg-muted",
							children: "Email Sign In"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 252,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 242,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 233,
					columnNumber: 20
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "space-y-4 rounded-3xl border bg-card p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-bold flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "1. Delivery Information" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 263,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 262,
							columnNumber: 11
						}, this),
						field("name", "Full Name", {
							required: true,
							minLength: 2,
							maxLength: 120,
							autoComplete: "name",
							placeholder: "e.g. Asad Siddiqui"
						}),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [field("phone", "WhatsApp Phone Number", {
								required: true,
								minLength: 10,
								maxLength: 30,
								type: "tel",
								placeholder: "0300 1234567",
								autoComplete: "tel"
							}), field("email", "Email Address (Optional)", {
								type: "email",
								maxLength: 200,
								autoComplete: "email",
								placeholder: "asad@example.com"
							})]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 272,
							columnNumber: 11
						}, this),
						field("address", "Complete Street Address & Area", {
							required: true,
							minLength: 5,
							maxLength: 500,
							autoComplete: "street-address",
							placeholder: "House / Flat number, Street, Sector / Area"
						}),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [field("city", "City", {
								required: true,
								minLength: 2,
								maxLength: 80,
								autoComplete: "address-level2",
								placeholder: "Karachi / Lahore / Islamabad"
							}), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-mono uppercase tracking-wider text-muted-foreground",
									children: "Special Delivery Notes"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 305,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									value: form.notes,
									onChange: (e) => setForm({
										...form,
										notes: e.target.value
									}),
									placeholder: "e.g. Ring bell twice, leave with security",
									className: "mt-1 h-12 w-full rounded-2xl bg-surface px-4 text-sm outline-none ring-primary focus:ring-2 border border-border/50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 308,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 295,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex items-center gap-2.5 text-xs font-medium cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "checkbox",
									checked: isGift,
									onChange: (e) => setIsGift(e.target.checked),
									className: "rounded text-primary focus:ring-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 318,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1.5 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Gift, { className: "h-4 w-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 320,
										columnNumber: 17
									}, this), "This order is a gift (pack with care & omit price tags)"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 319,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 317,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 316,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 261,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
					className: "space-y-4 rounded-3xl border bg-card p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-xl font-bold",
								children: "2. Payment Method"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-mono text-muted-foreground",
								children: "Select one"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 331,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MethodCard, {
								active: method === "cod",
								onClick: () => setMethod("cod"),
								icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Banknote, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 336,
									columnNumber: 90
								}, this),
								title: "Cash on Delivery (COD)",
								sub: "Zero upfront payment. Pay the courier rider cash upon delivery at your doorstep.",
								badge: "Standard"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 13
							}, this), s.accounts.map((a) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MethodCard, {
								active: method === a.id,
								onClick: () => setMethod(a.id),
								icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 339,
									columnNumber: 130
								}, this),
								title: a.label,
								sub: `Pay via ${a.label} and get an instant ${s.advanceDiscount}% discount deducted!`,
								badge: `Save ${s.advanceDiscount}%`,
								highlight: true
							}, a.id, false, {
								fileName: _jsxFileName,
								lineNumber: 339,
								columnNumber: 34
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 334,
							columnNumber: 11
						}, this),
						advance && account && /* @__PURE__ */ (void 0)("div", {
							className: "mt-4 space-y-4 rounded-2xl border border-primary/30 bg-primary/5 p-5",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("p", {
										className: "text-xs font-mono uppercase text-primary font-bold",
										children: ["Transfer Details for ", account.label]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 345,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-xs font-bold text-success",
										children: [s.advanceDiscount, "% discount included in total"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 348,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 344,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between gap-3 rounded-2xl bg-background p-4 border shadow-xs",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground",
										children: account.account_title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 355,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "font-mono text-lg font-bold text-foreground",
										children: account.account_number
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 356,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 354,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										className: "press rounded-full bg-ink px-4 py-2 text-xs font-bold text-ink-foreground hover:bg-primary",
										onClick: () => navigator.clipboard.writeText(account.account_number.replace(/\s/g, "")).then(() => toast.success("Account number copied!")),
										children: "Copy"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 360,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 353,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-mono uppercase text-muted-foreground mb-1",
									children: "Upload Payment Screenshot / Receipt *"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 366,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "file",
									required: true,
									accept: "image/*,application/pdf",
									onChange: (e) => setFile(e.target.files?.[0] ?? null),
									className: "block w-full text-xs file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-xs file:font-semibold file:text-ink-foreground hover:file:bg-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 369,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 365,
									columnNumber: 15
								}, this),
								file && file.type.startsWith("image/") && /* @__PURE__ */ (void 0)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (void 0)("img", {
										src: URL.createObjectURL(file),
										alt: "Payment receipt preview",
										className: "max-h-40 rounded-xl border object-contain"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 373,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 372,
									columnNumber: 58
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 343,
							columnNumber: 34
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 328,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 191,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: "h-fit space-y-6 rounded-3xl bg-card border p-6 lg:sticky lg:top-24 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold",
					children: "Order Summary"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 381,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "divide-y max-h-72 overflow-y-auto [scrollbar-width:none]",
					children: cart.items.map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "py-3 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: imageSrc(i.image),
								alt: "",
								className: "h-12 w-12 rounded-xl object-contain bg-surface mix-blend-multiply border shrink-0"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 386,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "truncate text-xs font-bold",
									children: i.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 388,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground",
									children: ["Qty: ", i.qty]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 389,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 387,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-xs font-bold shrink-0",
								children: formatPKR(i.unitPrice * i.qty)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 391,
								columnNumber: 15
							}, this)
						]
					}, i.id, true, {
						fileName: _jsxFileName,
						lineNumber: 385,
						columnNumber: 32
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 384,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-t pt-4 space-y-2",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: applyPromo,
						className: "space-y-1",
						children: [appliedPromo ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between rounded-xl bg-success/10 border border-success/30 px-3 py-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex items-center gap-1.5 font-bold text-success",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 402,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									appliedPromo.code,
									" (",
									appliedPromo.pct,
									"% off)"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 403,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 401,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setAppliedPromo(null),
								className: "text-muted-foreground hover:text-destructive text-xs",
								children: "✕ Remove"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 405,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 400,
							columnNumber: 29
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: promoInput,
								onChange: (e) => {
									setPromoInput(e.target.value);
									setPromoError("");
								},
								placeholder: "Promo code (e.g. WELCOME10)",
								className: "h-10 flex-1 rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-1 border"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 409,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								className: "press rounded-xl bg-surface px-3 py-2 text-xs font-semibold hover:bg-muted border",
								children: "Apply"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 413,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 408,
							columnNumber: 24
						}, this), promoError && /* @__PURE__ */ (void 0)("p", {
							className: "text-[11px] text-destructive",
							children: promoError
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 417,
							columnNumber: 28
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 399,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 398,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-2 border-t pt-4 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Subtotal"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 424,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono font-medium",
								children: formatPKR(cart.subtotal)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 425,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 423,
							columnNumber: 11
						}, this),
						promoDiscount > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "flex justify-between text-success font-semibold",
							children: [/* @__PURE__ */ (void 0)("span", { children: [
								"Promo (",
								appliedPromo?.code,
								")"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 429,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "font-mono",
								children: ["−", formatPKR(promoDiscount)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 430,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 428,
							columnNumber: 33
						}, this),
						advanceDiscount > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "flex justify-between text-primary font-semibold",
							children: [/* @__PURE__ */ (void 0)("span", { children: [
								"Advance discount (",
								s.advanceDiscount,
								"%)"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 434,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "font-mono",
								children: ["−", formatPKR(advanceDiscount)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 435,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 433,
							columnNumber: 35
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Delivery"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 439,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono font-medium",
								children: isFreeShipping ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-success font-bold",
									children: "FREE"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 441,
									columnNumber: 33
								}, this) : formatPKR(deliveryFee)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 440,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 438,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between border-t pt-3 text-base font-extrabold",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total Payable" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 446,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-primary text-xl",
								children: formatPKR(total)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 447,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 445,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 422,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "submit",
					disabled: busy,
					className: "press w-full rounded-full bg-ink py-4 text-center font-bold text-xs uppercase tracking-wider text-ink-foreground shadow-lg transition-colors hover:bg-primary disabled:opacity-60",
					children: busy ? "Securing your order…" : `Confirm & Place Order · ${formatPKR(total)}`
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 452,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-success" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 458,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "7-day replacement · WhatsApp confirmation" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 459,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 457,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 380,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 190,
		columnNumber: 10
	}, this);
}
function MethodCard({ active, onClick, icon, title, sub, badge, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick,
		className: `press flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${active ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs" : "border-border/60 bg-surface/50 hover:bg-surface"}`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-0.5 text-primary",
			children: icon
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 482,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-bold text-sm text-foreground",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 485,
					columnNumber: 11
				}, this), badge && /* @__PURE__ */ (void 0)("span", {
					className: `rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${highlight ? "bg-primary text-primary-foreground" : "bg-surface border text-muted-foreground"}`,
					children: badge
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 486,
					columnNumber: 21
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 484,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-xs text-muted-foreground leading-relaxed",
				children: sub
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 490,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 483,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 481,
		columnNumber: 10
	}, this);
}
//#endregion
export { Checkout as component };
