import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { i as useQuery } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { p as settingsQuery } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { B as Check, I as CreditCard, R as CircleQuestionMark, _ as RefreshCw, i as Truck, p as ShieldCheck, y as Phone } from "./_libs/lucide-react-DxlvYDqj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/policies-DjyM5Yyt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/policies.tsx?tsr-split=component";
function PoliciesPage() {
	const [tab, setTab] = (0, import_react.useState)("returns");
	const { data: settings } = useQuery(settingsQuery);
	const cleanPhone = settings?.whatsappNumber?.replace(/\D/g, "") ?? "923000000000";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-5xl px-5 pt-12 md:px-8 pb-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center max-w-2xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-xs uppercase tracking-widest text-primary font-bold",
						children: "Customer Protection & Trust"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-2 text-4xl font-extrabold tracking-tight md:text-5xl",
						children: "Store Policies & Guarantees"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 19,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-muted-foreground text-sm md:text-base leading-relaxed",
						children: "At Gubberz, we believe gadgets should bring pure joy — zero friction, zero headaches. Here is exactly how our returns, deliveries, warranties, and payment policies work."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 22,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 15,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center p-4 rounded-3xl border bg-card text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-6 w-6 text-primary mb-2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 31,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-xs",
								children: "7-Day Replacement"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 32,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "No-hassle exchange"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 33,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 30,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center p-4 rounded-3xl border bg-card text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "h-6 w-6 text-primary mb-2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 36,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-xs",
								children: "Nationwide Express"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 37,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "1–3 business days"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center p-4 rounded-3xl border bg-card text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-6 w-6 text-success mb-2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 41,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-xs",
								children: "100% Genuine"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 42,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Factory tested items"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center p-4 rounded-3xl border bg-card text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, { className: "h-6 w-6 text-primary mb-2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 46,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-xs",
								children: "COD or 5% Advance"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 47,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-muted-foreground mt-0.5",
								children: "Pay how you prefer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 48,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 flex flex-wrap gap-2 border-b pb-4",
				children: [
					{
						id: "returns",
						label: "7-Day Replacement Policy",
						icon: RefreshCw
					},
					{
						id: "shipping",
						label: "Shipping & Delivery",
						icon: Truck
					},
					{
						id: "warranty",
						label: "Warranty & Authenticity",
						icon: ShieldCheck
					},
					{
						id: "payments",
						label: "Cash on Delivery & Payment",
						icon: CreditCard
					}
				].map((t) => {
					const Icon = t.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setTab(t.id),
						className: `press flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${tab === t.id ? "bg-ink text-ink-foreground shadow-xs" : "bg-surface text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t.label }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 74,
							columnNumber: 15
						}, this)]
					}, t.id, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 16
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 rounded-3xl border bg-card p-6 md:p-10 shadow-xs",
				children: [
					tab === "returns" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-extrabold tracking-tight",
							children: "7-Day Replacement & Return Guarantee"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm text-muted-foreground leading-relaxed",
							children: "If your gadget arrives defective, damaged during transit, or doesn't match the specifications described on Gubberz, we will replace it immediately or issue a full refund."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 86,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl bg-surface/60 p-5 space-y-2",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-sm text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(Check, { className: "h-4 w-4 text-success" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 96,
										columnNumber: 19
									}, this), "What qualifies for replacement?"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 95,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("ul", {
									className: "text-xs text-muted-foreground space-y-1.5 pl-6 list-disc",
									children: [
										/* @__PURE__ */ (void 0)("li", { children: "Hardware defects, charging failures, or unresponsive buttons" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 100,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("li", { children: "Cosmetic transit damage noticed upon unboxing" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 101,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("li", { children: "Incorrect product model or colour variant delivered" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 102,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("li", { children: "Package missing accessories listed under \"What's in the Box\"" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 103,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 94,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl bg-surface/60 p-5 space-y-2",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-sm text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(CircleQuestionMark, { className: "h-4 w-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 109,
										columnNumber: 19
									}, this), "How to initiate a claim:"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 108,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("ol", {
									className: "text-xs text-muted-foreground space-y-1.5 pl-6 list-decimal",
									children: [
										/* @__PURE__ */ (void 0)("li", { children: "Send a quick WhatsApp message to our support desk with your Order ID" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 113,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("li", { children: "Attach a 10-second video showing the issue or unboxing" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 114,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("li", { children: "Our team books a reverse pickup courier from your doorstep at zero cost to you" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 115,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("li", { children: "Replacement unit is dispatched within 24 hours" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 116,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 112,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 31
					}, this),
					tab === "shipping" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-2xl font-extrabold tracking-tight",
								children: "Nationwide Shipping & Delivery Timelines"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-sm text-muted-foreground leading-relaxed",
								children: "We partner with premier courier networks (TCS, Leopards, Trax, and Rider) to guarantee safe and tracked transit directly to your door."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (void 0)("table", {
									className: "w-full text-left text-xs",
									children: [/* @__PURE__ */ (void 0)("thead", { children: /* @__PURE__ */ (void 0)("tr", {
										className: "border-b font-mono uppercase text-muted-foreground",
										children: [
											/* @__PURE__ */ (void 0)("th", {
												className: "py-3 px-4",
												children: "Region / City"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 137,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("th", {
												className: "py-3 px-4",
												children: "Delivery Window"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 138,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("th", {
												className: "py-3 px-4",
												children: "Courier Partner"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 139,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("th", {
												className: "py-3 px-4",
												children: "COD Available?"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 140,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 136,
										columnNumber: 19
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("tbody", {
										className: "divide-y font-medium",
										children: [
											/* @__PURE__ */ (void 0)("tr", { children: [
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 font-bold",
													children: "Karachi Hub"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 145,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4",
													children: "Same Day / Next Day (24 hrs)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 146,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 text-muted-foreground",
													children: "Rider / Leopards Express"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 147,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 text-success",
													children: "✓ Yes"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 148,
													columnNumber: 21
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 144,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("tr", { children: [
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 font-bold",
													children: "Lahore & Rawalpindi / Islamabad"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 151,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4",
													children: "1 to 2 business days"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 152,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 text-muted-foreground",
													children: "TCS Express / Trax"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 153,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 text-success",
													children: "✓ Yes"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 154,
													columnNumber: 21
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 150,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("tr", { children: [
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 font-bold",
													children: "Faisalabad, Multan, Sialkot, Peshawar"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 157,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4",
													children: "2 to 3 business days"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 158,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 text-muted-foreground",
													children: "TCS / Leopards"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 159,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 text-success",
													children: "✓ Yes"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 160,
													columnNumber: 21
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 156,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("tr", { children: [
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 font-bold",
													children: "Rest of Pakistan & Remote Towns"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 163,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4",
													children: "3 to 4 business days"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 164,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 text-muted-foreground",
													children: "PostEx / TCS"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 165,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("td", {
													className: "py-3 px-4 text-success",
													children: "✓ Yes"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 166,
													columnNumber: 21
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 162,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 143,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl bg-surface/60 p-4 text-xs text-muted-foreground flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("span", { children: "Standard delivery fee: Rs 200 (or free above Rs 15,000 threshold)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-mono font-bold text-foreground",
									children: "SMS & WhatsApp tracking included"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 174,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 32
					}, this),
					tab === "warranty" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-extrabold tracking-tight",
							children: "Authenticity Guarantee & Hardware Warranty"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm text-muted-foreground leading-relaxed",
							children: "Counterfeits are rampant in the tech gadget market. At Gubberz, every single item in our warehouse is sourced through authorized distributor channels and inspected before packing."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl bg-surface/60 p-5 space-y-2",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-sm text-foreground",
									children: "6-Month Hardware Protection"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: "Keyboards, wireless ANC headphones, and GaN fast chargers include a 6-month limited hardware repair or replacement warranty covering internal circuit or battery degradation."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl bg-surface/60 p-5 space-y-2",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-sm text-foreground",
									children: "Serial Number Verification"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 199,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: "Every packaged device has its barcode and serial number archived with your order record. You can verify and claim support at any time by quoting your phone number."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 32
					}, this),
					tab === "payments" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-extrabold tracking-tight",
							children: "Cash on Delivery & Advance Payment Discount"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 210,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm text-muted-foreground leading-relaxed",
							children: "We support flexible payment methods designed for shopper comfort in Pakistan."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl bg-surface/60 p-5 space-y-2 border border-border/40",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-sm text-foreground",
									children: "1. Cash on Delivery (COD)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 220,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: "No advance payment required. Simply place your order, confirm your address via our automated WhatsApp check, and pay the courier cash directly upon delivery at your doorstep."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 219,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl bg-primary/10 p-5 space-y-2 border border-primary/20",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "font-bold text-sm text-foreground",
									children: [
										"2. Advance Discount (Save ",
										settings?.advanceDiscount ?? 5,
										"%)"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 228,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: [
										"When you pay upfront via JazzCash, NayaPay, Sadapay, or Raast Bank Transfer, you receive an instant ",
										settings?.advanceDiscount ?? 5,
										"% discount deducted from your total order!"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 231,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 32
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 rounded-3xl bg-surface p-8 text-center border border-border/60 flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-xl font-extrabold",
						children: "Have a specific question about an order?"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 242,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground max-w-md",
						children: "Our customer support humans in Karachi respond in under 15 minutes during business hours."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Gubberz! I have a question regarding store policies and order delivery.")}`,
						target: "_blank",
						rel: "noreferrer",
						className: "press mt-5 inline-flex items-center gap-2 rounded-full bg-success px-6 py-3 text-xs font-bold text-white shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Chat with us on WhatsApp" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 248,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 241,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 13,
		columnNumber: 10
	}, this);
}
//#endregion
export { PoliciesPage as component };
