import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { x as useNavigate } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { i as useQuery } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { a as formatPKR, c as lookupOrder, p as settingsQuery, s as imageSrc } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { t as Route } from "./order-B6WavtTM-Dn_u3p9t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-B0RbQuvc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/order.tsx?tsr-split=component";
var STATUS = {
	placed: "Order placed",
	payment_verification: "Checking your payment",
	confirmed: "Confirmed",
	packed: "Packed",
	shipped: "On its way",
	delivered: "Delivered",
	cancelled: "Cancelled"
};
var METHOD = {
	cod: "Cash on delivery",
	jazzcash: "JazzCash",
	nayapay: "NayaPay",
	easypaisa: "Easypaisa",
	bank_transfer: "Bank Transfer",
	iban: "IBAN Transfer",
	raast: "Raast"
};
function OrderPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: "/order" });
	const [code, setCode] = (0, import_react.useState)(search.code ?? "");
	const [phone, setPhone] = (0, import_react.useState)(search.phone ?? "");
	const enabled = !!search.code && !!search.phone;
	const { data: settings } = useQuery(settingsQuery);
	const { data: order, isFetching } = useQuery({
		queryKey: [
			"order",
			search.code,
			search.phone
		],
		queryFn: () => lookupOrder({ data: {
			code: search.code,
			phone: search.phone
		} }),
		enabled
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-2xl px-5 py-12",
		children: order ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
					children: ["Order ", order.code]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-5xl font-extrabold tracking-tight",
					children: [
						"Thanks, ",
						order.customer_name.split(" ")[0],
						"!"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-3xl bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground",
							children: "Status"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-bold",
							children: STATUS[order.status] ?? order.status
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 55,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								METHOD[order.payment_method],
								" · delivering to ",
								order.city
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "space-y-3",
					children: order.items.map((i, n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: imageSrc(i.image ?? void 0),
								alt: "",
								className: "h-14 w-14 rounded-xl object-cover mix-blend-multiply"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 60,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex-1 text-sm",
								children: [
									i.name,
									" × ",
									i.qty
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 61,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-sm",
								children: formatPKR(i.unit_price * i.qty)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 17
							}, this)
						]
					}, n, true, {
						fileName: _jsxFileName,
						lineNumber: 59,
						columnNumber: 40
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1 border-t pt-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Subtotal" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 51
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono",
								children: formatPKR(order.subtotal)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 66,
								columnNumber: 72
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 13
						}, this),
						order.discount > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "flex justify-between text-primary",
							children: [/* @__PURE__ */ (void 0)("span", { children: "Advance discount" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 67,
								columnNumber: 87
							}, this), /* @__PURE__ */ (void 0)("span", {
								className: "font-mono",
								children: ["−", formatPKR(order.discount)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 67,
								columnNumber: 116
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 36
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Delivery" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 51
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono",
								children: formatPKR(order.delivery_fee)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 72
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between pt-2 text-lg font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 78
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono",
								children: formatPKR(order.total)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 69,
								columnNumber: 96
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 69,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 11
				}, this),
				settings && /* @__PURE__ */ (void 0)("a", {
					href: `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi Gubberz! About my order ${order.code}.`)}`,
					target: "_blank",
					rel: "noreferrer",
					className: "press block rounded-full bg-ink py-3.5 text-center font-medium text-ink-foreground",
					children: "Message us on WhatsApp"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 24
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 50,
			columnNumber: 16
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				navigate({ search: {
					code: code.trim(),
					phone: phone.trim()
				} });
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-5xl font-extrabold tracking-tight",
					children: "Track your order"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 83,
					columnNumber: 11
				}, this),
				enabled && !isFetching && /* @__PURE__ */ (void 0)("p", {
					className: "text-destructive",
					children: "We couldn't find that order. Check the code and phone number."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 84,
					columnNumber: 38
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					required: true,
					minLength: 4,
					maxLength: 20,
					value: code,
					onChange: (e) => setCode(e.target.value),
					placeholder: "Order code",
					className: "h-12 w-full rounded-2xl bg-surface px-4 font-mono uppercase outline-none ring-primary focus:ring-2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					required: true,
					minLength: 10,
					maxLength: 30,
					type: "tel",
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					placeholder: "Phone number used at checkout",
					className: "h-12 w-full rounded-2xl bg-surface px-4 outline-none ring-primary focus:ring-2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 86,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					className: "press w-full rounded-full bg-primary py-3.5 font-medium text-primary-foreground",
					children: isFetching ? "Looking…" : "Find my order"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 74,
			columnNumber: 18
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 10
	}, this);
}
//#endregion
export { OrderPage as component };
