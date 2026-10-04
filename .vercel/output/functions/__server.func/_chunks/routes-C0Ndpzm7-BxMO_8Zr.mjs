import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { b as Link } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { r as useSuspenseQuery } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { a as formatPKR, f as productsQuery, i as effectivePrice, n as categoriesQuery, s as imageSrc } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { t as sitter_default } from "./sitter-YlL7wGNE-DEiTACFb.mjs";
import { t as ProductCard } from "./ProductCard-Y97FfztB-Bv_JARig.mjs";
import { n as useTransform, r as useScroll, t as useReducedMotion } from "./_libs/framer-motion-DrV0DOtq.mjs";
import { t as motion } from "./_libs/motion-C4ShGMH9.mjs";
import { t as sectionsQuery } from "./routes-Hnsg-D0T-BprekrDz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C0Ndpzm7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Home() {
	const { data: products } = useSuspenseQuery(productsQuery());
	const { data: categories } = useSuspenseQuery(categoriesQuery);
	const { data: sections } = useSuspenseQuery(sectionsQuery);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "overflow-hidden",
		children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			section,
			products,
			categories
		}, section.id, false, {
			fileName: _jsxFileName,
			lineNumber: 20,
			columnNumber: 32
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 10
	}, this);
}
function Section({ section, products, categories }) {
	const selected = section.product_slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);
	if (section.section_type === "hero") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hero, {
		section,
		products: selected
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 47
	}, this);
	if (section.section_type === "category_index") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto mt-12 max-w-7xl px-5 md:mt-20 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, { section }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-10 border-t",
			children: section.category_slugs.map((slug, index) => {
				const category = categories.find((item) => item.slug === slug);
				const sample = products.find((product) => product.category?.slug === slug);
				if (!category) return null;
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/shop",
					search: { cat: slug },
					className: "group grid grid-cols-[3rem_minmax(0,1fr)_4.5rem] items-center gap-3 border-b py-4 md:grid-cols-[5rem_minmax(0,1fr)_7rem] md:py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: ["0", index + 1]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-2xl font-bold md:text-4xl",
								children: category.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 46,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: category.blurb
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 47,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: imageSrc(sample?.images[0]),
							alt: "",
							className: "aspect-square w-full object-cover mix-blend-multiply transition-transform motion-safe:group-hover:rotate-3 motion-safe:group-active:scale-95"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 17
						}, this)
					]
				}, slug, true, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 16
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 57
	}, this);
	if (section.section_type === "product_edit") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto mt-28 max-w-7xl px-5 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, { section }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 55,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
			children: selected.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "h-full",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
					product,
					size: "md"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 15
				}, this)
			}, product.id, false, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 36
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 56,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 54,
		columnNumber: 55
	}, this);
	if (section.section_type === "character") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mt-32 overflow-hidden rounded-[2.5rem] bg-ink text-ink-foreground mx-5 md:mx-8 max-w-7xl xl:mx-auto",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1fr_22rem] md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 font-mono text-xs uppercase tracking-wider text-ink-foreground/80",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-primary animate-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 15
					}, this), section.eyebrow]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl",
					children: section.title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-5 max-w-xl text-base md:text-lg text-ink-foreground/75 leading-relaxed",
					children: section.body
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 13
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative mx-auto flex w-full max-w-xs items-center justify-center rounded-[2.5rem] bg-[#fbf9f4] p-8 shadow-2xl ring-1 ring-white/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/60 to-transparent pointer-events-none" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.img, {
						src: sitter_default,
						alt: "A Gubberz character testing headphones",
						className: "relative z-10 w-48 md:w-56 drop-shadow-md",
						animate: { y: [
							0,
							-6,
							0
						] },
						transition: {
							duration: 3.5,
							repeat: Infinity,
							ease: "easeInOut"
						},
						whileTap: {
							scale: .95,
							rotate: [
								0,
								-6,
								6,
								0
							]
						}
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "absolute -bottom-3 rounded-full bg-primary px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-md",
						children: "Acoustic Testing"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 77,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 63,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 52
	}, this);
	if (section.section_type === "product_rail") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mt-28",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-7xl px-5 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, { section }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 96,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-80rem)/2))] pb-6 [scrollbar-width:none]",
			children: selected.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-[78vw] max-w-sm shrink-0 snap-center sm:w-80",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 101,
					columnNumber: 15
				}, this)
			}, product.id, false, {
				fileName: _jsxFileName,
				lineNumber: 100,
				columnNumber: 36
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 99,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 95,
		columnNumber: 55
	}, this);
	if (section.section_type === "campaign") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto mt-28 max-w-7xl px-5 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "bg-primary p-6 text-primary-foreground md:p-12",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				section,
				light: true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 107,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 grid gap-3 md:grid-cols-3",
				children: selected.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/product/$slug",
					params: { slug: product.slug },
					className: "group grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-4 bg-background p-3 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: imageSrc(product.images[0]),
						alt: "",
						className: "aspect-square w-24 object-cover mix-blend-multiply transition-transform motion-safe:group-active:scale-95"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "truncate font-semibold",
								children: product.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 114,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-mono text-sm text-primary",
								children: formatPKR(effectivePrice(product))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 19
							}, this),
							effectivePrice(product) < product.price && /* @__PURE__ */ (void 0)("p", {
								className: "font-mono text-xs text-muted-foreground line-through",
								children: formatPKR(product.price)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 118,
								columnNumber: 63
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 17
					}, this)]
				}, product.id, true, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 38
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 106,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 105,
		columnNumber: 51
	}, this);
	if (section.section_type === "service_notes") {
		const settings = typeof section.settings === "object" && section.settings && !Array.isArray(section.settings) ? section.settings : {};
		const notes = Array.isArray(settings.notes) ? settings.notes : [];
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto mt-28 grid max-w-7xl gap-8 px-5 md:grid-cols-3 md:px-8",
			children: notes.map((note, index) => typeof note === "object" && note && !Array.isArray(note) ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-t pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-lg font-semibold",
					children: String(note.title ?? "")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-muted-foreground",
					children: String(note.body ?? "")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 15
				}, this)]
			}, index, true, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 96
			}, this) : null)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 129,
			columnNumber: 12
		}, this);
	}
	return null;
}
function Hero({ section, products }) {
	const ref = (0, import_react.useRef)(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
	const main = products[0];
	const secondary = products[1];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		ref,
		className: "relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-6 px-5 pb-16 pt-10 md:grid-cols-12 md:px-8 md:pt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 top-10 overflow-hidden whitespace-nowrap font-extrabold text-foreground/[.035]",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "animate-editorial-marquee text-[28vw] leading-none",
					children: "GUBBERZ GUBBERZ GUBBERZ"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 158,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 157,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative z-10 md:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
						children: section.eyebrow
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-5 text-6xl font-extrabold leading-[.88] md:text-8xl",
						children: [
							"Ordinary",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 11
							}, this),
							"things.",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-primary",
								children: "Weirdly"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 11
							}, this),
							" good."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-6 max-w-md text-lg text-muted-foreground",
						children: section.body
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 173,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-wrap items-center gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/shop",
							className: "press bg-ink px-7 py-4 text-sm font-semibold text-ink-foreground",
							children: section.cta_label
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/shop",
							search: { sort: "new" },
							className: "border-b-2 border-foreground py-2 text-sm font-semibold",
							children: "What’s new"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 178,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 174,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 162,
				columnNumber: 7
			}, this),
			main && /* @__PURE__ */ (void 0)("div", {
				className: "relative mt-8 h-[31rem] md:col-span-7 md:mt-0 md:h-[40rem]",
				children: [
					/* @__PURE__ */ (void 0)(motion.div, {
						style: { y: imageY },
						className: "absolute left-[7%] top-[8%] z-10 w-[72%] -rotate-2 border-[10px] border-background bg-surface shadow-xl",
						children: /* @__PURE__ */ (void 0)(Link, {
							to: "/product/$slug",
							params: { slug: main.slug },
							children: /* @__PURE__ */ (void 0)("img", {
								src: imageSrc(main.images[0]),
								alt: main.name,
								className: "aspect-[4/5] w-full object-cover mix-blend-multiply"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 11
					}, this),
					secondary && /* @__PURE__ */ (void 0)(Link, {
						to: "/product/$slug",
						params: { slug: secondary.slug },
						className: "press absolute right-0 top-0 z-20 hidden w-40 rotate-6 bg-background p-2 shadow-lg sm:block",
						children: [/* @__PURE__ */ (void 0)("img", {
							src: imageSrc(secondary.images[0]),
							alt: secondary.name,
							className: "aspect-square w-full object-cover mix-blend-multiply"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "mt-2 truncate font-mono text-[10px] uppercase",
							children: ["Also good: ", secondary.name]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 25
					}, this),
					/* @__PURE__ */ (void 0)(motion.img, {
						src: "/assets/sitter-CK9b4Vyc.png",
						alt: "",
						className: "absolute bottom-0 right-[2%] z-20 w-32 md:w-44",
						animate: reduce ? void 0 : {
							y: [
								0,
								-10,
								0
							],
							rotate: [
								-2,
								2,
								-2
							]
						},
						transition: {
							duration: 4,
							repeat: Infinity
						}
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 185,
				columnNumber: 16
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 156,
		columnNumber: 10
	}, this);
}
function SectionHeading({ section, light = false }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid gap-4 md:grid-cols-[minmax(0,1fr)_22rem] md:items-end",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: `font-mono text-xs uppercase tracking-widest ${light ? "opacity-70" : "text-muted-foreground"}`,
			children: section.eyebrow
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 222,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "mt-3 max-w-4xl text-4xl font-bold leading-[.98] md:text-6xl",
			children: section.title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 225,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 221,
			columnNumber: 7
		}, this), section.body && /* @__PURE__ */ (void 0)("p", {
			className: light ? "opacity-80" : "text-muted-foreground",
			children: section.body
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 229,
			columnNumber: 24
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 220,
		columnNumber: 10
	}, this);
}
//#endregion
export { Home as component };
