import { r as __toESM } from "./rolldown-runtime-CMFfr-1z.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs-8FnyRu_a.mjs";
import { b as Link, x as useNavigate } from "./_libs/@tanstack/react-router-BDYD7yka.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "./_libs/@tanstack/react-query-Ba_BgJIO.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react-BXVD0bQ8.mjs";
import { l as createServerFn } from "./createServerFn-DDDJMFWM-CziPrtnf.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DFaDlHNk-D0hWLNq2.mjs";
import { t as supabase } from "./client-BpRE6ta9-DiENUv8t.mjs";
import { a as numberType, c as stringType, l as unknownType, n as booleanType, o as objectType, r as enumType, s as recordType, t as arrayType } from "./_libs/zod-Bbj5tsZ5.mjs";
import { a as formatPKR, r as createSsrRpc, s as imageSrc } from "./shop-w_bBoWQ_-Utb8y25T.mjs";
import { n as toast } from "./_libs/sonner-6wP9uXZa.mjs";
import { C as Mail, D as Image, E as Layers, I as CreditCard, K as ArrowDown, L as Clock, N as Eye, O as History, P as EyeOff, S as MapPin, U as ArrowUp, V as Boxes, _ as RefreshCw, a as TriangleAlert, b as Package, d as ShoppingBag, g as Search, h as Settings, o as Trash2, r as UserCheck, t as X, v as Plus, y as Phone } from "./_libs/lucide-react-DxlvYDqj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-NlIypEE_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var sectionSchema = objectType({
	id: stringType().uuid(),
	section_type: enumType([
		"hero",
		"product_story",
		"product_edit",
		"category_index",
		"product_rail",
		"campaign",
		"character",
		"service_notes"
	]),
	eyebrow: stringType().trim().max(100).nullable(),
	title: stringType().trim().min(1).max(180),
	body: stringType().trim().max(1e3).nullable(),
	media_key: stringType().trim().max(300).nullable(),
	character_key: stringType().trim().max(100).nullable(),
	product_slugs: arrayType(stringType().trim().max(120)).max(12),
	category_slugs: arrayType(stringType().trim().max(80)).max(12),
	cta_label: stringType().trim().max(80).nullable(),
	cta_href: stringType().trim().max(300).nullable(),
	theme: enumType([
		"paper",
		"ink",
		"accent"
	]),
	layout: stringType().trim().min(1).max(80),
	sort_order: numberType().int().min(0).max(1e4),
	published: booleanType(),
	settings: recordType(unknownType())
});
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("d7ab752d5c5280d2ee84a9875749b1cba0d95c7bbe892baa67e4f3368bfac36c"));
var claimAdminRole = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("c9094d6faf8245d20141c4c32c6c4ce4e2ef0f9397c9e0fc76cb68ec3d58070a"));
var getAdminSnapshot = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("c392237e4ac42dc6d36cf6cc02949bfa608f3afced247b74683956cb8c692747"));
var saveHomeSection = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => sectionSchema.parse(input)).handler(createSsrRpc("136484a352a76522e3e434aa266ca5ed564d47fd3aeff6cfae38a9b438b3e874"));
var saveStoreSetting = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	key: enumType([
		"whatsapp_number",
		"contact_email",
		"advance_payment_discount_percent",
		"delivery_fee",
		"payment_methods"
	]),
	value: unknownType()
}).parse(input)).handler(createSsrRpc("1fab97f62402386079c58b90c33884ea0fe49080351bfbe3e5a09618b933d1c0"));
var saveCategory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid().optional(),
	name: stringType().trim().min(2).max(80),
	slug: stringType().trim().min(2).max(80),
	blurb: stringType().trim().max(300).nullable().optional(),
	sort_order: numberType().int().min(0).max(1e4).default(0),
	published: booleanType().default(true)
}).parse(input)).handler(createSsrRpc("d55046ba33898196eca5650d70b9240e9ea3d10d5d71b6dd00eddef9ea1312c1"));
var toggleCategoryPublished = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	published: booleanType()
}).parse(input)).handler(createSsrRpc("9e3d0a159a8feb67e2ce77ca38b99dc40ef2da5e24ac7b2f5aaa2e380e60a78c"));
var reorderCategories = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ items: arrayType(objectType({
	id: stringType().uuid(),
	sort_order: numberType().int()
})) }).parse(input)).handler(createSsrRpc("942f0206dc5d14c64f61b7e9ec57483bfc9010e9b56f40fcba53b0aa58a9ef8e"));
var deleteCategory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("f474bf6273f5a18c6cc5ab7a1e03dbbd6091e0cc20a15e2ec3f36e561a6d03af"));
var saveProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid().optional(),
	name: stringType().trim().min(2).max(150),
	slug: stringType().trim().min(2).max(150),
	sku: stringType().trim().min(2).max(60),
	brand: stringType().trim().max(80).nullable().optional(),
	category_id: stringType().uuid().nullable().optional(),
	short_description: stringType().trim().max(300).nullable().optional(),
	description: stringType().trim().max(3e3).nullable().optional(),
	price: numberType().int().min(0),
	sale_price: numberType().int().min(0).nullable().optional(),
	stock: numberType().int().min(0).default(0),
	low_stock_threshold: numberType().int().min(0).default(3),
	images: arrayType(stringType().trim()).default(["headphones"]),
	specs: recordType(unknownType()).default({}),
	features: arrayType(stringType().trim()).default([]),
	tags: arrayType(stringType().trim()).default([]),
	published: booleanType().default(true),
	featured: booleanType().default(false)
}).parse(input)).handler(createSsrRpc("f686d9cf1ee0a8e13e31464bd65516de46d8902dd7a0e7753ff321b9d66c8f51"));
var toggleProductField = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	field: enumType(["published", "featured"]),
	value: booleanType()
}).parse(input)).handler(createSsrRpc("f71899c28e124a81221b7db32a7a71f3a6aa2e2f82b7d60f03acacc30b61027f"));
var deleteProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("d58e9647e4364d7098cb0d840b98a827719a64c5b316ad80080e28b97fb3f1cb"));
var changeInventory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	productId: stringType().uuid(),
	delta: numberType().int().min(-1e4).max(1e4).refine((v) => v !== 0),
	reason: stringType().trim().min(2).max(200)
}).parse(input)).handler(createSsrRpc("79736e4aec301f92d3c7a4a06681410059d08df4a937684a6d829f5698a9d32d"));
var changeOrderStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	orderId: stringType().uuid(),
	status: enumType([
		"placed",
		"payment_verification",
		"confirmed",
		"packed",
		"shipped",
		"delivered",
		"cancelled"
	]),
	note: stringType().trim().max(500)
}).parse(input)).handler(createSsrRpc("446ac1da84fb61b7baf8fa0833599c5ad86ab8413fceded776407cacb9d1609e"));
var getOrderDetails = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ orderId: stringType().uuid() }).parse(input)).handler(createSsrRpc("f653ce05a89efd7f30ee29fdafd2e068ae2fc84cb6c4df9420a0f29a2d54d71d"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	price: numberType().int().min(0),
	sale_price: numberType().int().min(0).nullable(),
	specs: recordType(unknownType()),
	features: arrayType(stringType())
}).parse(input)).handler(createSsrRpc("65635ef6dbe767ea4cd9e6f1a0f1663ef31afe94238f42a1becf4ca8b0fa3082"));
var _jsxFileName = "/app/applet/src/routes/_authenticated/admin.tsx?tsr-split=component";
var PRESET_IMAGE_KEYS = [
	"headphones",
	"earbuds",
	"speaker",
	"charger",
	"powerbank",
	"keyboard",
	"mouse",
	"cable"
];
function AdminDashboard() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [orderFilter, setOrderFilter] = (0, import_react.useState)("all");
	const [orderSearch, setOrderSearch] = (0, import_react.useState)("");
	const [selectedOrderId, setSelectedOrderId] = (0, import_react.useState)(null);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["admin-snapshot"],
		queryFn: () => getAdminSnapshot()
	});
	const claimAdminMutation = useMutation({
		mutationFn: () => claimAdminRole(),
		onSuccess: () => {
			toast.success("Admin role claimed successfully!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
		},
		onError: (err) => toast.error(err.message || "Failed to claim admin role")
	});
	const saveSectionMutation = useMutation({
		mutationFn: (section) => saveHomeSection({ data: section }),
		onSuccess: () => {
			toast.success("Homepage section saved!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["home-sections"] });
		},
		onError: (err) => toast.error(err.message || "Failed to save section")
	});
	const saveSettingMutation = useMutation({
		mutationFn: ({ key, value }) => saveStoreSetting({ data: {
			key,
			value
		} }),
		onSuccess: () => {
			toast.success("Store setting updated!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
		onError: (err) => toast.error(err.message || "Failed to save setting")
	});
	const adjustStockMutation = useMutation({
		mutationFn: ({ productId, delta, reason }) => changeInventory({ data: {
			productId,
			delta,
			reason
		} }),
		onSuccess: () => {
			toast.success("Stock adjustment recorded in history!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (err) => toast.error(err.message || "Failed to adjust stock")
	});
	const updateOrderStatusMutation = useMutation({
		mutationFn: ({ orderId, status, note }) => changeOrderStatus({ data: {
			orderId,
			status,
			note
		} }),
		onSuccess: () => {
			toast.success("Order status updated!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["order-details"] });
		},
		onError: (err) => toast.error(err.message || "Failed to update order status")
	});
	const saveCategoryMutation = useMutation({
		mutationFn: (cat) => saveCategory({ data: cat }),
		onSuccess: () => {
			toast.success("Category saved!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: (err) => toast.error(err.message || "Failed to save category")
	});
	const toggleCategoryMutation = useMutation({
		mutationFn: ({ id, published }) => toggleCategoryPublished({ data: {
			id,
			published
		} }),
		onSuccess: () => {
			toast.success("Category visibility updated!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: (err) => toast.error(err.message || "Failed to toggle category")
	});
	const reorderCategoriesMutation = useMutation({
		mutationFn: (items) => reorderCategories({ data: { items } }),
		onSuccess: () => {
			toast.success("Category sequence updated!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: (err) => toast.error(err.message || "Failed to reorder categories")
	});
	const deleteCategoryMutation = useMutation({
		mutationFn: (id) => deleteCategory({ data: { id } }),
		onSuccess: () => {
			toast.success("Category deleted!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: (err) => toast.error(err.message || "Failed to delete category")
	});
	const saveProductMutation = useMutation({
		mutationFn: (product) => saveProduct({ data: product }),
		onSuccess: () => {
			toast.success("Product saved successfully!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["product"] });
		},
		onError: (err) => toast.error(err.message || "Failed to save product")
	});
	const toggleProductFieldMutation = useMutation({
		mutationFn: ({ id, field, value }) => toggleProductField({ data: {
			id,
			field,
			value
		} }),
		onSuccess: () => {
			toast.success("Product status updated!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (err) => toast.error(err.message || "Failed to toggle product status")
	});
	const deleteProductMutation = useMutation({
		mutationFn: (id) => deleteProduct({ data: { id } }),
		onSuccess: () => {
			toast.success("Product deleted!");
			queryClient.invalidateQueries({ queryKey: ["admin-snapshot"] });
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (err) => toast.error(err.message || "Failed to delete product")
	});
	async function handleSignOut() {
		await supabase.auth.signOut();
		toast.success("Signed out");
		navigate({ to: "/auth" });
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-[60vh] items-center justify-center p-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 278,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground",
				children: "Loading Gubberz admin workspace…"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 279,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 277,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 276,
		columnNumber: 12
	}, this);
	if (error) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-xl px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl font-bold",
				children: "Admin authentication required"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 287,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 text-muted-foreground",
				children: error instanceof Error ? error.message : "You need authorized credentials to access this area."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 288,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => refetch(),
					className: "press rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ink-foreground",
					children: "Retry"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 292,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: handleSignOut,
					className: "press rounded-full bg-surface px-6 py-2.5 text-sm font-medium",
					children: "Sign out"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 295,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 291,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 286,
		columnNumber: 12
	}, this);
	const { sections = [], products = [], categories = [], settings = [], orders = [], inventoryMovements = [], hasAdmin = false, userId = "" } = data || {};
	const settingsMap = {};
	for (const s of settings) settingsMap[s.key] = s.value;
	const lowStock = products.filter((p) => p.stock <= (p.low_stock_threshold ?? 3));
	const pendingVerificationOrders = orders.filter((o) => o.status === "payment_verification");
	const filteredOrders = orders.filter((o) => {
		if (!(orderFilter === "all" || o.status === orderFilter)) return false;
		if (!orderSearch.trim()) return true;
		const q = orderSearch.toLowerCase();
		return o.code?.toLowerCase().includes(q) || o.customer_name?.toLowerCase().includes(q) || o.phone?.includes(q) || o.city?.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "sticky top-0 z-30 border-b bg-background/95 backdrop-blur",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: "font-mono text-xs uppercase tracking-widest text-primary hover:underline",
							children: "← Storefront"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 327,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-muted-foreground/30",
							children: "|"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 330,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-extrabold text-xl tracking-tight",
								children: "gubberz"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 332,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded bg-ink px-2 py-0.5 font-mono text-[10px] uppercase font-bold text-ink-foreground",
								children: "Admin v3"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 333,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 331,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 326,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "hidden font-mono text-xs text-muted-foreground md:inline",
							children: [
								"UID: ",
								userId?.slice(0, 8),
								"…"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 340,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => refetch(),
							title: "Refresh data",
							className: "press rounded-full bg-surface p-2 text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 343,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: handleSignOut,
							className: "press rounded-full bg-surface px-4 py-1.5 text-xs font-semibold hover:bg-muted",
							children: "Sign out"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 346,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 339,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 325,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto flex max-w-7xl overflow-x-auto px-5 md:px-8",
				children: [
					{
						id: "overview",
						label: "Overview",
						icon: Boxes
					},
					{
						id: "orders",
						label: `Orders (${orders.length})`,
						icon: ShoppingBag,
						badge: pendingVerificationOrders.length > 0 ? `${pendingVerificationOrders.length} pending` : void 0
					},
					{
						id: "products",
						label: `Products (${products.length})`,
						icon: Package
					},
					{
						id: "categories",
						label: `Categories (${categories.length})`,
						icon: Layers
					},
					{
						id: "inventory",
						label: `Inventory (${lowStock.length > 0 ? `${lowStock.length} alert` : "OK"})`,
						icon: History
					},
					{
						id: "settings",
						label: "Store & Payments",
						icon: Settings
					},
					{
						id: "sections",
						label: `Editorial Layout (${sections.length})`,
						icon: Image
					}
				].map((t) => {
					const Icon = t.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setTab(t.id),
						className: `press shrink-0 flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 386,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t.label }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 387,
								columnNumber: 17
							}, this),
							t.badge && /* @__PURE__ */ (void 0)("span", {
								className: "rounded-full bg-destructive/10 px-2 py-0.5 font-mono text-[10px] text-destructive font-bold",
								children: t.badge
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 388,
								columnNumber: 29
							}, this)
						]
					}, t.id, true, {
						fileName: _jsxFileName,
						lineNumber: 385,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 353,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 324,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-7xl px-5 py-8 md:px-8",
			children: [
				!hasAdmin && /* @__PURE__ */ (void 0)("div", {
					className: "mb-8 rounded-3xl border border-primary/20 bg-primary/5 p-5",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
							className: "font-bold text-sm text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(UserCheck, { className: "h-4 w-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 402,
								columnNumber: 19
							}, this), " Verified Authentication Active"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 401,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: [
								"Signed in with User ID:",
								" ",
								/* @__PURE__ */ (void 0)("code", {
									className: "font-mono text-foreground font-semibold",
									children: userId
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 406,
									columnNumber: 19
								}, this),
								". Initialize or claim database administrator privileges for this session:"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 404,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 400,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							disabled: claimAdminMutation.isPending,
							onClick: () => claimAdminMutation.mutate(),
							className: "press rounded-full bg-ink px-4 py-2 font-mono text-xs font-bold text-ink-foreground",
							children: claimAdminMutation.isPending ? "Assigning Role…" : "Establish Admin Role"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 410,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 399,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 398,
					columnNumber: 23
				}, this),
				tab === "overview" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8",
					children: [
						pendingVerificationOrders.length > 0 && /* @__PURE__ */ (void 0)("div", {
							className: "rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5",
							children: /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center justify-between gap-4",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-700",
										children: /* @__PURE__ */ (void 0)(CreditCard, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 422,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 421,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
										className: "font-bold text-sm text-foreground",
										children: [pendingVerificationOrders.length, " Order(s) Awaiting Payment Verification"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 425,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground",
										children: "Advance payments submitted with payment proof screenshot ready for review."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 428,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 424,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 420,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("button", {
									onClick: () => {
										setOrderFilter("payment_verification");
										setTab("orders");
									},
									className: "press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground",
									children: "Inspect Proofs →"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 433,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 419,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 418,
							columnNumber: 54
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-3xl border bg-surface p-6",
									children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-xs uppercase text-muted-foreground",
											children: "Total Orders"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 444,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-2 font-mono text-3xl font-extrabold",
											children: orders.length
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 445,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: "Lifetime customer purchases"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 446,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 443,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-3xl border bg-surface p-6",
									children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-xs uppercase text-muted-foreground",
											children: "Published Products"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 449,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-2 font-mono text-3xl font-extrabold",
											children: [
												products.filter((p) => p.published).length,
												" / ",
												products.length
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 452,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [
												"Across ",
												categories.length,
												" categories"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 455,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 448,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-3xl border bg-surface p-6",
									children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-xs uppercase text-muted-foreground",
											children: "Low Stock Watch"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 460,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: `mt-2 font-mono text-3xl font-extrabold ${lowStock.length > 0 ? "text-destructive" : ""}`,
											children: lowStock.length
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 463,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: "Threshold <= 3 units"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 466,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 459,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-3xl border bg-surface p-6",
									children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-xs uppercase text-muted-foreground",
											children: "Active Categories"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 469,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-2 font-mono text-3xl font-extrabold",
											children: [
												categories.filter((c) => c.published).length,
												" / ",
												categories.length
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 472,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: "Shown in store navigation"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 475,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 468,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 442,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-8 lg:grid-cols-2",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-3xl border bg-card p-6",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("h3", {
										className: "text-lg font-bold flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "h-4 w-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 485,
											columnNumber: 21
										}, this), " Inventory Attention"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 484,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("button", {
										onClick: () => setTab("inventory"),
										className: "text-xs font-semibold text-primary hover:underline",
										children: "Manage Inventory →"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 487,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 483,
									columnNumber: 17
								}, this), lowStock.length === 0 ? /* @__PURE__ */ (void 0)("p", {
									className: "mt-4 text-sm text-muted-foreground",
									children: "All items have healthy inventory levels."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 491,
									columnNumber: 42
								}, this) : /* @__PURE__ */ (void 0)("ul", {
									className: "mt-4 divide-y",
									children: lowStock.map((p) => /* @__PURE__ */ (void 0)("li", {
										className: "flex items-center justify-between py-3",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("img", {
												src: imageSrc(p.images?.[0]),
												alt: "",
												className: "h-9 w-9 rounded-xl object-cover bg-surface"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 496,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
												className: "font-semibold text-sm",
												children: p.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 498,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "font-mono text-xs text-muted-foreground",
												children: ["SKU: ", p.sku]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 499,
												columnNumber: 29
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 497,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 495,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: `rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${p.stock <= 0 ? "bg-destructive/10 text-destructive" : "bg-accent/20 text-accent-foreground"}`,
												children: p.stock <= 0 ? "Out of stock" : `${p.stock} left`
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 503,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)(AdjustStockDialog, {
												product: p,
												onAdjust: (delta, reason) => adjustStockMutation.mutate({
													productId: p.id,
													delta,
													reason
												})
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 506,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 502,
											columnNumber: 25
										}, this)]
									}, p.id, true, {
										fileName: _jsxFileName,
										lineNumber: 494,
										columnNumber: 47
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 493,
									columnNumber: 26
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 482,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-3xl border bg-card p-6",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("h3", {
										className: "text-lg font-bold flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(Clock, { className: "h-4 w-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 520,
											columnNumber: 21
										}, this), " Recent Orders"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 519,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("button", {
										onClick: () => setTab("orders"),
										className: "text-xs font-semibold text-primary hover:underline",
										children: [
											"View all (",
											orders.length,
											") →"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 522,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 518,
									columnNumber: 17
								}, this), orders.length === 0 ? /* @__PURE__ */ (void 0)("p", {
									className: "mt-4 text-sm text-muted-foreground",
									children: "No orders recorded yet."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 526,
									columnNumber: 40
								}, this) : /* @__PURE__ */ (void 0)("ul", {
									className: "mt-4 divide-y",
									children: orders.slice(0, 6).map((o) => /* @__PURE__ */ (void 0)("li", {
										className: "flex items-center justify-between py-3",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-mono text-xs font-bold",
												children: o.code
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 530,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-medium text-foreground",
												children: ["· ", o.customer_name]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 531,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 529,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												o.city,
												" · Method: ",
												o.payment_method?.toUpperCase()
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 535,
											columnNumber: 27
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 528,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (void 0)("p", {
													className: "font-mono text-sm font-semibold",
													children: formatPKR(o.total)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 541,
													columnNumber: 29
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: `inline-block rounded-full px-2 py-0.5 font-mono text-[10px] uppercase font-semibold ${getStatusBadgeClass(o.status)}`,
													children: o.status.replace("_", " ")
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 542,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 540,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("button", {
												onClick: () => {
													setSelectedOrderId(o.id);
													setTab("orders");
												},
												className: "press rounded-full bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted",
												children: "Inspect"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 546,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 539,
											columnNumber: 25
										}, this)]
									}, o.id, true, {
										fileName: _jsxFileName,
										lineNumber: 527,
										columnNumber: 57
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 526,
									columnNumber: 120
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 517,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 480,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 417,
					columnNumber: 32
				}, this),
				tab === "orders" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
								className: "text-2xl font-extrabold tracking-tight",
								children: "Customer Orders"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 563,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground",
								children: "Track orders, verify advance payment proofs, inspect order items, and advance status steps."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 564,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 562,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3",
								children: /* @__PURE__ */ (void 0)("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ (void 0)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 571,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("input", {
											placeholder: "Search by code, customer, phone…",
											value: orderSearch,
											onChange: (e) => setOrderSearch(e.target.value),
											className: "h-10 w-64 rounded-2xl bg-surface pl-9 pr-3 text-xs outline-none ring-primary focus:ring-2"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 572,
											columnNumber: 19
										}, this),
										orderSearch && /* @__PURE__ */ (void 0)("button", {
											onClick: () => setOrderSearch(""),
											className: "absolute right-3 top-2.5 text-xs text-muted-foreground",
											children: "×"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 573,
											columnNumber: 35
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 570,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 569,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 561,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap gap-1.5 rounded-2xl bg-surface p-1 text-xs",
							children: [
								{
									id: "all",
									label: `All (${orders.length})`
								},
								{
									id: "payment_verification",
									label: `Payment Verification (${orders.filter((o) => o.status === "payment_verification").length})`
								},
								{
									id: "placed",
									label: `Placed (${orders.filter((o) => o.status === "placed").length})`
								},
								{
									id: "confirmed",
									label: `Confirmed (${orders.filter((o) => o.status === "confirmed").length})`
								},
								{
									id: "packed",
									label: `Packed (${orders.filter((o) => o.status === "packed").length})`
								},
								{
									id: "shipped",
									label: `Shipped (${orders.filter((o) => o.status === "shipped").length})`
								},
								{
									id: "delivered",
									label: `Delivered (${orders.filter((o) => o.status === "delivered").length})`
								},
								{
									id: "cancelled",
									label: `Cancelled (${orders.filter((o) => o.status === "cancelled").length})`
								}
							].map((st) => /* @__PURE__ */ (void 0)("button", {
								onClick: () => setOrderFilter(st.id),
								className: `press rounded-xl px-3 py-1.5 font-mono uppercase transition-colors ${orderFilter === st.id ? "bg-ink font-bold text-ink-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
								children: st.label
							}, st.id, false, {
								fileName: _jsxFileName,
								lineNumber: 606,
								columnNumber: 24
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 581,
							columnNumber: 13
						}, this),
						filteredOrders.length === 0 ? /* @__PURE__ */ (void 0)("div", {
							className: "rounded-3xl border bg-card p-12 text-center",
							children: /* @__PURE__ */ (void 0)("p", {
								className: "text-muted-foreground",
								children: "No orders matching this filter or search."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 612,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 611,
							columnNumber: 44
						}, this) : /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4",
							children: filteredOrders.map((order) => /* @__PURE__ */ (void 0)("div", {
								className: "rounded-3xl border bg-card p-6 transition-shadow hover:shadow-xs",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap items-start justify-between gap-4",
										children: [/* @__PURE__ */ (void 0)("div", { children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-mono text-lg font-extrabold",
													children: order.code
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 618,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: `rounded-full px-3 py-0.5 font-mono text-xs uppercase font-semibold ${getStatusBadgeClass(order.status)}`,
													children: order.status.replace("_", " ")
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 619,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 617,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "mt-1 text-sm font-semibold",
												children: [
													order.customer_name,
													" · ",
													/* @__PURE__ */ (void 0)("span", {
														className: "font-mono",
														children: order.phone
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 624,
														columnNumber: 51
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 623,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													order.city,
													" · Placed ",
													new Date(order.created_at).toLocaleString()
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 626,
												columnNumber: 25
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 616,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex flex-col items-end gap-1.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-mono text-xl font-bold",
												children: formatPKR(order.total)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 632,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "rounded bg-surface px-2 py-0.5 font-mono text-[11px] uppercase text-muted-foreground font-semibold",
													children: order.payment_method
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 636,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("button", {
													onClick: () => setSelectedOrderId(order.id),
													className: "press rounded-full bg-ink px-4 py-1.5 text-xs font-bold text-ink-foreground",
													children: "Inspect Details →"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 639,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 635,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 631,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 615,
										columnNumber: 21
									}, this),
									order.payment_proof && /* @__PURE__ */ (void 0)("div", {
										className: "mt-4 rounded-2xl bg-surface/70 border border-primary/20 p-3.5 flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)(CreditCard, { className: "h-4 w-4 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 648,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-medium text-foreground",
												children: [
													"Payment Proof Screenshot Attached (",
													order.payment_method.toUpperCase(),
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 649,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 647,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("button", {
											onClick: () => setSelectedOrderId(order.id),
											className: "font-mono text-xs text-primary font-bold hover:underline",
											children: "Review Receipt & Verify ↗"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 653,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 646,
										columnNumber: 45
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-4 flex flex-wrap items-center gap-2 border-t pt-4",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-mono text-xs text-muted-foreground mr-1",
											children: "Advance Status:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 660,
											columnNumber: 23
										}, this), [
											"payment_verification",
											"confirmed",
											"packed",
											"shipped",
											"delivered",
											"cancelled"
										].map((st) => /* @__PURE__ */ (void 0)("button", {
											disabled: order.status === st || updateOrderStatusMutation.isPending,
											onClick: () => {
												const note = prompt(`Add a note for status "${st.replace("_", " ")}" (optional):`) ?? "";
												updateOrderStatusMutation.mutate({
													orderId: order.id,
													status: st,
													note
												});
											},
											className: `press rounded-full border px-3 py-1 font-mono text-xs uppercase ${order.status === st ? "bg-ink text-ink-foreground opacity-50 cursor-default" : "bg-surface hover:bg-muted text-foreground"}`,
											children: st.replace("_", " ")
										}, st, false, {
											fileName: _jsxFileName,
											lineNumber: 661,
											columnNumber: 119
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 659,
										columnNumber: 21
									}, this)
								]
							}, order.id, true, {
								fileName: _jsxFileName,
								lineNumber: 614,
								columnNumber: 53
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 613,
							columnNumber: 24
						}, this),
						selectedOrderId && /* @__PURE__ */ (void 0)(OrderInspectionModal, {
							orderId: selectedOrderId,
							onClose: () => setSelectedOrderId(null),
							onUpdateStatus: (orderId, status, note) => updateOrderStatusMutation.mutate({
								orderId,
								status,
								note
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 676,
							columnNumber: 33
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 560,
					columnNumber: 30
				}, this),
				tab === "products" && /* @__PURE__ */ (void 0)(ProductsManager, {
					products,
					categories,
					onSaveProduct: (p) => saveProductMutation.mutate(p),
					onToggleField: (id, field, value) => toggleProductFieldMutation.mutate({
						id,
						field,
						value
					}),
					onDeleteProduct: (id) => deleteProductMutation.mutate(id),
					onAdjustStock: (productId, delta, reason) => adjustStockMutation.mutate({
						productId,
						delta,
						reason
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 684,
					columnNumber: 32
				}, this),
				tab === "categories" && /* @__PURE__ */ (void 0)(CategoriesManager, {
					categories,
					products,
					onSaveCategory: (c) => saveCategoryMutation.mutate(c),
					onTogglePublished: (id, published) => toggleCategoryMutation.mutate({
						id,
						published
					}),
					onReorder: (items) => reorderCategoriesMutation.mutate(items),
					onDeleteCategory: (id) => deleteCategoryMutation.mutate(id)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 695,
					columnNumber: 34
				}, this),
				tab === "inventory" && /* @__PURE__ */ (void 0)(InventoryManager, {
					products,
					movements: inventoryMovements,
					onAdjustStock: (productId, delta, reason) => adjustStockMutation.mutate({
						productId,
						delta,
						reason
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 701,
					columnNumber: 33
				}, this),
				tab === "settings" && /* @__PURE__ */ (void 0)(StoreSettingsManager, {
					settings: settingsMap,
					onSaveSetting: (key, value) => saveSettingMutation.mutate({
						key,
						value
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 708,
					columnNumber: 32
				}, this),
				tab === "sections" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-extrabold tracking-tight",
						children: "Editorial Homepage Sections"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 716,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-sm text-muted-foreground",
						children: "Manage the layout, order, copy, theme and products displayed on the customer-facing storefront."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 717,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 715,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: sections.map((section, index) => /* @__PURE__ */ (void 0)("div", {
							className: "rounded-3xl border bg-card p-6 transition-shadow hover:shadow-xs",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center justify-between gap-4",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "flex h-8 w-8 items-center justify-center rounded-full bg-surface font-mono text-xs font-bold",
										children: index + 1
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 726,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "rounded bg-surface px-2 py-0.5 font-mono text-xs uppercase text-muted-foreground font-semibold",
											children: section.section_type
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 731,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-bold",
											children: section.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 734,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 730,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: [
											section.eyebrow ? `${section.eyebrow} · ` : "",
											"Theme: ",
											section.theme,
											" · Layout: ",
											section.layout
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 736,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 729,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 725,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (void 0)("button", {
										onClick: () => saveSectionMutation.mutate({
											...section,
											published: !section.published
										}),
										className: `press rounded-full px-4 py-1.5 font-mono text-xs font-semibold ${section.published ? "bg-success/20 text-success" : "bg-surface text-muted-foreground"}`,
										children: section.published ? "Active" : "Hidden"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 744,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(SectionEditDialog, {
										section,
										onSave: (updated) => saveSectionMutation.mutate(updated)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 751,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 743,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 724,
								columnNumber: 19
							}, this), section.body && /* @__PURE__ */ (void 0)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: section.body
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 755,
								columnNumber: 36
							}, this)]
						}, section.id, true, {
							fileName: _jsxFileName,
							lineNumber: 723,
							columnNumber: 62
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 722,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 714,
					columnNumber: 32
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 397,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 322,
		columnNumber: 10
	}, this);
}
function getStatusBadgeClass(status) {
	switch (status) {
		case "payment_verification": return "bg-amber-500/15 text-amber-700 border border-amber-500/30";
		case "confirmed": return "bg-blue-500/15 text-blue-700";
		case "packed": return "bg-purple-500/15 text-purple-700";
		case "shipped": return "bg-indigo-500/15 text-indigo-700";
		case "delivered": return "bg-success/15 text-success";
		case "cancelled": return "bg-destructive/15 text-destructive";
		default: return "bg-surface text-foreground";
	}
}
function OrderInspectionModal({ orderId, onClose, onUpdateStatus }) {
	const [statusNote, setStatusNote] = (0, import_react.useState)("");
	const [showProofZoom, setShowProofZoom] = (0, import_react.useState)(false);
	const { data, isLoading } = useQuery({
		queryKey: ["order-details", orderId],
		queryFn: () => getOrderDetails({ data: { orderId } })
	});
	if (isLoading || !data) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-3xl bg-background p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-primary border-r-transparent" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 809,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-xs font-mono",
				children: "Loading order records…"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 810,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 808,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 807,
		columnNumber: 12
	}, this);
	const { order, items, events } = data;
	const proofUrl = order.payment_proof ? `https://csvnjedaklqwgwyeidkm.supabase.co//storage/v1/object/public/payment-proofs/${order.payment_proof}` : null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-3xl rounded-3xl bg-background p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-2xl font-extrabold font-mono",
							children: order.code
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 825,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `rounded-full px-3 py-0.5 font-mono text-xs uppercase font-bold ${getStatusBadgeClass(order.status)}`,
							children: order.status.replace("_", " ")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 826,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 824,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: ["Placed on ", new Date(order.created_at).toLocaleString()]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 830,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 823,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: onClose,
						className: "press rounded-full bg-surface p-2 text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 835,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 834,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 822,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 grid gap-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border bg-surface/50 p-4 space-y-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "font-bold text-sm text-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-4 w-4 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 843,
									columnNumber: 15
								}, this), " Delivery Details"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 842,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold text-sm text-foreground",
								children: order.customer_name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 845,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-muted-foreground font-mono flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 847,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: `tel:${order.phone}`,
										className: "hover:underline",
										children: order.phone
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 848,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: `https://wa.me/${order.phone.replace(/\D/g, "")}`,
										target: "_blank",
										rel: "noreferrer",
										className: "text-success hover:underline font-bold",
										children: "WhatsApp ↗"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 851,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 846,
								columnNumber: 13
							}, this),
							order.email && /* @__PURE__ */ (void 0)("p", {
								className: "text-muted-foreground flex items-center gap-2",
								children: [
									/* @__PURE__ */ (void 0)(Mail, { className: "h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 856,
										columnNumber: 17
									}, this),
									" ",
									order.email
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 855,
								columnNumber: 29
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "pt-1 text-foreground leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Address:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 859,
										columnNumber: 15
									}, this),
									" ",
									order.address,
									", ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: order.city }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 859,
										columnNumber: 58
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 858,
								columnNumber: 13
							}, this),
							order.notes && /* @__PURE__ */ (void 0)("p", {
								className: "rounded-xl bg-background p-2.5 text-muted-foreground border",
								children: [
									/* @__PURE__ */ (void 0)("strong", { children: "Customer Note:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 862,
										columnNumber: 17
									}, this),
									" ",
									order.notes
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 861,
								columnNumber: 29
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 841,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border bg-surface/50 p-4 space-y-2.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "font-bold text-sm text-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, { className: "h-4 w-4 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 869,
									columnNumber: 15
								}, this), " Payment Method & Verification"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 868,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "Selected Method:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 872,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono font-bold uppercase",
									children: order.payment_method
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 873,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 871,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "Subtotal:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 876,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono",
									children: formatPKR(order.subtotal)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 877,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 875,
								columnNumber: 13
							}, this),
							order.discount > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between text-success",
								children: [/* @__PURE__ */ (void 0)("span", { children: "Advance Payment Discount:" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 880,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-mono",
									children: ["-", formatPKR(order.discount)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 881,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 879,
								columnNumber: 36
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "Delivery Fee:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 884,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono",
									children: formatPKR(order.delivery_fee)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 885,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 883,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between border-t pt-2 font-bold text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Final Total:" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 888,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-base",
									children: formatPKR(order.total)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 889,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 887,
								columnNumber: 13
							}, this),
							proofUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-3 rounded-xl border bg-background p-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-bold text-xs text-foreground mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Attached Payment Proof" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 895,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: proofUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "text-primary hover:underline font-mono text-[11px]",
										children: "Open Original ↗"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 896,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 894,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									onClick: () => setShowProofZoom(true),
									className: "relative cursor-zoom-in rounded-lg overflow-hidden border bg-surface group",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: proofUrl,
										alt: "Payment proof screenshot",
										className: "max-h-48 w-full object-contain"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 901,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-mono font-bold",
										children: "Click to Zoom"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 902,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 900,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 893,
								columnNumber: 25
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground italic pt-1",
								children: "No payment proof attached (Cash on Delivery or pending submission)."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 906,
								columnNumber: 24
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 867,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 839,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 border-t pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "font-bold text-sm mb-3",
						children: [
							"Order Items (",
							items.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 914,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "divide-y rounded-2xl border bg-card",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between p-3.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: imageSrc(item.image),
									alt: "",
									className: "h-10 w-10 rounded-xl object-cover bg-surface"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 918,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-bold text-sm",
									children: item.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 920,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-muted-foreground font-mono",
									children: [
										"Qty: ",
										item.qty,
										" × ",
										formatPKR(item.unit_price)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 921,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 919,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 917,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-mono font-bold text-sm",
								children: formatPKR(item.unit_price * item.qty)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 926,
								columnNumber: 17
							}, this)]
						}, item.id, true, {
							fileName: _jsxFileName,
							lineNumber: 916,
							columnNumber: 39
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 915,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 913,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 border-t pt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "font-bold text-sm",
							children: "Update Order Status"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 935,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Optional Note / Tracking Number / Verification Reason"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 937,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: statusNote,
							onChange: (e) => setStatusNote(e.target.value),
							placeholder: "e.g. Verified via JazzCash TRX# 9821, or Dispatched via TCS #392819",
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-xs outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 940,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 936,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								{
									id: "payment_verification",
									label: "Payment Verification",
									color: "bg-amber-600"
								},
								{
									id: "confirmed",
									label: "Confirm Order",
									color: "bg-blue-600"
								},
								{
									id: "packed",
									label: "Mark Packed",
									color: "bg-purple-600"
								},
								{
									id: "shipped",
									label: "Mark Shipped",
									color: "bg-indigo-600"
								},
								{
									id: "delivered",
									label: "Mark Delivered",
									color: "bg-emerald-600"
								},
								{
									id: "cancelled",
									label: "Cancel Order",
									color: "bg-destructive"
								}
							].map((st) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								disabled: order.status === st.id,
								onClick: () => {
									onUpdateStatus(order.id, st.id, statusNote);
									setStatusNote("");
								},
								className: `press rounded-xl px-4 py-2 text-xs font-bold text-white transition-opacity ${order.status === st.id ? "opacity-30 cursor-not-allowed bg-muted text-muted-foreground" : st.color}`,
								children: st.label
							}, st.id, false, {
								fileName: _jsxFileName,
								lineNumber: 968,
								columnNumber: 24
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 943,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 934,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 border-t pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "font-bold text-sm mb-3",
						children: [
							"Status Timeline & History (",
							events.length,
							")"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 979,
						columnNumber: 11
					}, this), events.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Initial state recorded upon order placement."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 980,
						columnNumber: 34
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2.5",
						children: events.map((ev) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl bg-surface/60 p-3 text-xs flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono font-bold uppercase text-foreground",
								children: [ev.from_status ? `${ev.from_status} → ` : "", ev.to_status]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 983,
								columnNumber: 21
							}, this), ev.note && /* @__PURE__ */ (void 0)("p", {
								className: "text-muted-foreground mt-0.5",
								children: ev.note
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 987,
								columnNumber: 33
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 982,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-right text-[11px] text-muted-foreground font-mono",
								children: new Date(ev.created_at).toLocaleString()
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 989,
								columnNumber: 19
							}, this)]
						}, ev.id, true, {
							fileName: _jsxFileName,
							lineNumber: 981,
							columnNumber: 40
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 980,
						columnNumber: 130
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 978,
					columnNumber: 9
				}, this),
				showProofZoom && proofUrl && /* @__PURE__ */ (void 0)("div", {
					onClick: () => setShowProofZoom(false),
					className: "fixed inset-0 z-60 flex items-center justify-center bg-ink/90 p-4 cursor-zoom-out",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "max-w-4xl max-h-[90vh]",
						children: [/* @__PURE__ */ (void 0)("img", {
							src: proofUrl,
							alt: "Enlarged payment proof screenshot",
							className: "max-h-[85vh] w-auto rounded-2xl object-contain mx-auto shadow-2xl"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 999,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-center text-xs font-mono text-white/70",
							children: "Click anywhere to close full preview"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1e3,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 998,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 997,
					columnNumber: 39
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 821,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 820,
		columnNumber: 10
	}, this);
}
function CategoriesManager({ categories, products, onSaveCategory, onTogglePublished, onReorder, onDeleteCategory }) {
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [isCreating, setIsCreating] = (0, import_react.useState)(false);
	function handleMove(index, direction) {
		const targetIndex = direction === "up" ? index - 1 : index + 1;
		if (targetIndex < 0 || targetIndex >= categories.length) return;
		const newCategories = [...categories];
		const current = newCategories[index];
		const target = newCategories[targetIndex];
		if (!current || !target) return;
		onReorder([{
			id: current.id,
			sort_order: target.sort_order ?? targetIndex
		}, {
			id: target.id,
			sort_order: current.sort_order ?? index
		}]);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-2xl font-extrabold tracking-tight",
					children: "Category Architecture"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1051,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground",
					children: "Manage store categories, customize blurbs, reorder display hierarchy, and hide/publish sections."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1052,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1050,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setIsCreating(true),
					className: "press flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1058,
						columnNumber: 11
					}, this), " Add Category"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1057,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1049,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "overflow-x-auto rounded-3xl border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
						className: "border-b bg-surface/50 font-mono text-xs uppercase text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4 w-28",
								children: "Order"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1066,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Category Name & Slug"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1067,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Blurb / Description"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1068,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Products"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1069,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Visibility"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1070,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4 text-right",
								children: "Actions"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1071,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1065,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1064,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
						className: "divide-y",
						children: categories.map((cat, index) => {
							const count = products.filter((p) => p.category_id === cat.id).length;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-surface/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1.5 font-mono",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "font-bold text-xs w-6 text-muted-foreground",
													children: ["#", index + 1]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1080,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													disabled: index === 0,
													onClick: () => handleMove(index, "up"),
													title: "Move Up",
													className: "press rounded p-1 hover:bg-surface disabled:opacity-20",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUp, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1082,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1081,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													disabled: index === categories.length - 1,
													onClick: () => handleMove(index, "down"),
													title: "Move Down",
													className: "press rounded p-1 hover:bg-surface disabled:opacity-20",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowDown, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1085,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1084,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1079,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1078,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-bold",
											children: cat.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1090,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-mono text-xs text-muted-foreground",
											children: ["/", cat.slug]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1091,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1089,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-xs text-muted-foreground max-w-xs truncate",
										children: cat.blurb || "—"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1093,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 font-mono text-xs",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "rounded-full bg-surface px-2.5 py-1 font-bold",
											children: [count, " items"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1097,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1096,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											onClick: () => onTogglePublished(cat.id, !cat.published),
											className: `press flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold ${cat.published ? "bg-success/15 text-success" : "bg-surface text-muted-foreground"}`,
											children: [cat.published ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1103,
												columnNumber: 40
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1103,
												columnNumber: 74
											}, this), cat.published ? "Published" : "Hidden"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1102,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1101,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-end gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												onClick: () => setEditingCategory(cat),
												className: "press rounded-full bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted",
												children: "Edit"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1109,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												onClick: () => {
													if (confirm(`Are you sure you want to delete category "${cat.name}"? Products inside will remain in the catalogue as uncategorized.`)) onDeleteCategory(cat.id);
												},
												className: "press rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1117,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1112,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1108,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1107,
										columnNumber: 19
									}, this)
								]
							}, cat.id, true, {
								fileName: _jsxFileName,
								lineNumber: 1077,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1074,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1063,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1062,
				columnNumber: 7
			}, this),
			(isCreating || editingCategory) && /* @__PURE__ */ (void 0)(CategoryFormDialog, {
				initial: editingCategory,
				onClose: () => {
					setIsCreating(false);
					setEditingCategory(null);
				},
				onSave: (data) => {
					onSaveCategory(data);
					setIsCreating(false);
					setEditingCategory(null);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1128,
				columnNumber: 43
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1048,
		columnNumber: 10
	}, this);
}
function CategoryFormDialog({ initial, onClose, onSave }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [slug, setSlug] = (0, import_react.useState)(initial?.slug ?? "");
	const [blurb, setBlurb] = (0, import_react.useState)(initial?.blurb ?? "");
	const [published, setPublished] = (0, import_react.useState)(initial?.published ?? true);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-lg font-bold",
					children: initial ? "Edit Category" : "Add New Category"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1153,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Define category names, SEO slug, and storefront blurb."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1154,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Category Name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1160,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: name,
							onChange: (e) => {
								setName(e.target.value);
								if (!initial) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
							},
							placeholder: "e.g. Wireless Audio",
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1161,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1159,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "URL Slug"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1170,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: slug,
							onChange: (e) => setSlug(e.target.value),
							placeholder: "e.g. wireless-audio",
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1171,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1169,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Blurb / Tagline"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1175,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							rows: 3,
							value: blurb,
							onChange: (e) => setBlurb(e.target.value),
							placeholder: "e.g. Pure sound, zero cords, built for all-day focus.",
							className: "mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1178,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1174,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "checkbox",
								id: "cat-published",
								checked: published,
								onChange: (e) => setPublished(e.target.checked),
								className: "h-4 w-4 rounded accent-primary"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1182,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								htmlFor: "cat-published",
								className: "text-xs font-medium cursor-pointer",
								children: "Publish category to storefront navigation"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1183,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1181,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1158,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex justify-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: onClose,
						className: "press rounded-full bg-surface px-4 py-2 text-xs font-medium",
						children: "Cancel"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1190,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						disabled: !name.trim() || !slug.trim(),
						onClick: () => {
							onSave({
								id: initial?.id,
								name: name.trim(),
								slug: slug.trim(),
								blurb: blurb.trim() || null,
								published,
								sort_order: initial?.sort_order ?? 99
							});
						},
						className: "press rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50",
						children: "Save Category"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1193,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1189,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1152,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1151,
		columnNumber: 10
	}, this);
}
function ProductsManager({ products, categories, onSaveProduct, onToggleField, onDeleteProduct, onAdjustStock }) {
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedCat, setSelectedCat] = (0, import_react.useState)("all");
	const [stockFilter, setStockFilter] = (0, import_react.useState)("all");
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [isCreating, setIsCreating] = (0, import_react.useState)(false);
	const filtered = products.filter((p) => {
		if (selectedCat !== "all" && p.category_id !== selectedCat) return false;
		if (stockFilter === "low" && p.stock > (p.low_stock_threshold ?? 3)) return false;
		if (stockFilter === "out" && p.stock > 0) return false;
		if (stockFilter === "healthy" && p.stock <= (p.low_stock_threshold ?? 3)) return false;
		if (!search.trim()) return true;
		const q = search.toLowerCase();
		return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-2xl font-extrabold tracking-tight",
					children: "Product Catalogue"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1245,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground",
					children: "Manage catalogue items, pricing, technical specifications, gallery photos, and featured selections."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1246,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1244,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setIsCreating(true),
					className: "press flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1252,
						columnNumber: 11
					}, this), " Add Product"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1251,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1243,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface/60 p-3 border",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1260,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								placeholder: "Search products by name or SKU…",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "h-9 w-60 rounded-xl bg-background pl-9 pr-3 text-xs outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1261,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1259,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							value: selectedCat,
							onChange: (e) => setSelectedCat(e.target.value),
							className: "h-9 rounded-xl bg-background px-3 text-xs outline-none ring-primary focus:ring-2 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "all",
								children: [
									"All Categories (",
									products.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1265,
								columnNumber: 13
							}, this), categories.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: c.id,
								children: c.name
							}, c.id, false, {
								fileName: _jsxFileName,
								lineNumber: 1266,
								columnNumber: 34
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1264,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							value: stockFilter,
							onChange: (e) => setStockFilter(e.target.value),
							className: "h-9 rounded-xl bg-background px-3 text-xs outline-none ring-primary focus:ring-2 font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "all",
									children: "All Inventory States"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1272,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "healthy",
									children: "In Stock (Healthy)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1273,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "low",
									children: "Low Stock Alerts"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1274,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
									value: "out",
									children: "Out of Stock (0 units)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1275,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1271,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1258,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-mono text-xs text-muted-foreground",
					children: [
						"Showing ",
						filtered.length,
						" of ",
						products.length,
						" products"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1279,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1257,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "overflow-x-auto rounded-3xl border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
						className: "border-b bg-surface/50 font-mono text-xs uppercase text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Item"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1288,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "SKU / Category"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1289,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Price (PKR)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1290,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Stock"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1291,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Visibility"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1292,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4",
								children: "Featured"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1293,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-6 py-4 text-right",
								children: "Actions"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1294,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1287,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1286,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
						className: "divide-y",
						children: filtered.map((product) => {
							const cat = categories.find((c) => c.id === product.category_id);
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-surface/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
												src: imageSrc(product.images?.[0]),
												alt: "",
												className: "h-10 w-10 rounded-xl object-cover bg-surface"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1303,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "font-semibold text-sm",
												children: product.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1305,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "font-mono text-xs text-muted-foreground",
												children: ["/", product.slug]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1306,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1304,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1302,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1301,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "font-mono text-xs font-semibold",
											children: product.sku
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1311,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-muted-foreground",
											children: cat?.name ?? "Unassigned"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1312,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1310,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono font-semibold",
											children: formatPKR(product.price)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1315,
											columnNumber: 21
										}, this), product.sale_price && /* @__PURE__ */ (void 0)("span", {
											className: "ml-2 font-mono text-xs text-primary font-bold",
											children: ["Sale: ", formatPKR(product.sale_price)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1316,
											columnNumber: 44
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1314,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: `font-mono font-bold ${product.stock <= 0 ? "text-destructive" : product.stock <= (product.low_stock_threshold ?? 3) ? "text-amber-600" : "text-foreground"}`,
												children: product.stock
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1322,
												columnNumber: 23
											}, this), product.stock <= (product.low_stock_threshold ?? 3) && /* @__PURE__ */ (void 0)("span", {
												className: "rounded-full bg-destructive/10 px-2 py-0.5 font-mono text-[10px] text-destructive",
												children: product.stock <= 0 ? "Empty" : "Low"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1325,
												columnNumber: 79
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1321,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1320,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											onClick: () => onToggleField(product.id, "published", !product.published),
											className: `press rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${product.published ? "bg-success/15 text-success" : "bg-surface text-muted-foreground"}`,
											children: product.published ? "Live" : "Draft"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1331,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1330,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											onClick: () => onToggleField(product.id, "featured", !product.featured),
											className: `press rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${product.featured ? "bg-amber-500/20 text-amber-700" : "bg-surface text-muted-foreground"}`,
											children: product.featured ? "Featured ★" : "No"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1336,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1335,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-end gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdjustStockDialog, {
													product,
													onAdjust: (delta, reason) => onAdjustStock(product.id, delta, reason)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1342,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													onClick: () => setEditingProduct(product),
													className: "press rounded-full bg-surface px-3 py-1 text-xs font-semibold hover:bg-muted",
													children: "Edit"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1343,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													onClick: () => {
														if (confirm(`Delete "${product.name}" permanently from catalogue?`)) onDeleteProduct(product.id);
													},
													className: "press rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
													children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1351,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1346,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1341,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1340,
										columnNumber: 19
									}, this)
								]
							}, product.id, true, {
								fileName: _jsxFileName,
								lineNumber: 1300,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1297,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1285,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1284,
				columnNumber: 7
			}, this),
			(isCreating || editingProduct) && /* @__PURE__ */ (void 0)(ProductFormDialog, {
				initial: editingProduct,
				categories,
				onClose: () => {
					setIsCreating(false);
					setEditingProduct(null);
				},
				onSave: (data) => {
					onSaveProduct(data);
					setIsCreating(false);
					setEditingProduct(null);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1362,
				columnNumber: 42
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1242,
		columnNumber: 10
	}, this);
}
function ProductFormDialog({ initial, categories, onClose, onSave }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [slug, setSlug] = (0, import_react.useState)(initial?.slug ?? "");
	const [sku, setSku] = (0, import_react.useState)(initial?.sku ?? "");
	const [brand, setBrand] = (0, import_react.useState)(initial?.brand ?? "Gubberz");
	const [categoryId, setCategoryId] = (0, import_react.useState)(initial?.category_id ?? categories[0]?.id ?? "");
	const [shortDesc, setShortDesc] = (0, import_react.useState)(initial?.short_description ?? "");
	const [description, setDescription] = (0, import_react.useState)(initial?.description ?? "");
	const [price, setPrice] = (0, import_react.useState)(Number(initial?.price ?? 4999));
	const [salePrice, setSalePrice] = (0, import_react.useState)(initial?.sale_price != null ? String(initial.sale_price) : "");
	const [stock, setStock] = (0, import_react.useState)(Number(initial?.stock ?? 15));
	const [lowStockThreshold, setLowStockThreshold] = (0, import_react.useState)(Number(initial?.low_stock_threshold ?? 3));
	const [selectedImage, setSelectedImage] = (0, import_react.useState)(initial?.images?.[0] ?? "headphones");
	const [customImageUrl, setCustomImageUrl] = (0, import_react.useState)("");
	const [featuresText, setFeaturesText] = (0, import_react.useState)(Array.isArray(initial?.features) ? initial.features.join("\n") : "");
	const [specsText, setSpecsText] = (0, import_react.useState)(JSON.stringify(typeof initial?.specs === "object" && initial?.specs ? initial.specs : {
		Connection: "Bluetooth 5.3",
		Battery: "30h"
	}, null, 2));
	const [published, setPublished] = (0, import_react.useState)(initial?.published ?? true);
	const [featured, setFeatured] = (0, import_react.useState)(initial?.featured ?? false);
	function handleSave() {
		let parsedSpecs = {};
		try {
			parsedSpecs = JSON.parse(specsText);
		} catch {
			toast.error("Specifications must be valid JSON format (e.g. {\"Battery\": \"40h\"})");
			return;
		}
		const imageToUse = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;
		const features = featuresText.split("\n").map((s) => s.trim()).filter(Boolean);
		onSave({
			id: initial?.id,
			name: name.trim(),
			slug: slug.trim(),
			sku: sku.trim(),
			brand: brand.trim() || null,
			category_id: categoryId || null,
			short_description: shortDesc.trim() || null,
			description: description.trim() || null,
			price: Number(price),
			sale_price: salePrice ? Number(salePrice) : null,
			stock: Number(stock),
			low_stock_threshold: Number(lowStockThreshold),
			images: [imageToUse],
			specs: parsedSpecs,
			features,
			published,
			featured
		});
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full max-w-2xl rounded-3xl bg-background p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-xl font-bold",
					children: initial ? "Edit Product" : "Add New Product"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1435,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Provide complete storefront copy, specs, pricing, and visual imagery."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1436,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 space-y-4 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "font-mono uppercase text-muted-foreground",
								children: "Product Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1443,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: name,
								onChange: (e) => {
									setName(e.target.value);
									if (!initial) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-"));
								},
								placeholder: "e.g. Surge GaN Charger",
								className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1444,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1442,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "font-mono uppercase text-muted-foreground",
								children: "Slug"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1452,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: slug,
								onChange: (e) => setSlug(e.target.value),
								placeholder: "e.g. surge-gan-charger",
								className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1453,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1451,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1441,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-mono uppercase text-muted-foreground",
									children: "SKU Code"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1459,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									value: sku,
									onChange: (e) => setSku(e.target.value),
									placeholder: "e.g. GBZ-PWR-003",
									className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm uppercase outline-none ring-primary focus:ring-2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1460,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1458,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-mono uppercase text-muted-foreground",
									children: "Brand"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1463,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									value: brand,
									onChange: (e) => setBrand(e.target.value),
									placeholder: "e.g. Gubberz",
									className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1464,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1462,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-mono uppercase text-muted-foreground",
									children: "Category"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1467,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: categoryId,
									onChange: (e) => setCategoryId(e.target.value),
									className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "",
										children: "Select category…"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1469,
										columnNumber: 17
									}, this), categories.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: c.id,
										children: c.name
									}, c.id, false, {
										fileName: _jsxFileName,
										lineNumber: 1470,
										columnNumber: 38
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1468,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1466,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1457,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-4 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-mono uppercase text-muted-foreground",
									children: "Price (PKR)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1479,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									value: price,
									onChange: (e) => setPrice(Number(e.target.value)),
									className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1480,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1478,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-mono uppercase text-muted-foreground",
									children: "Sale Price (PKR)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1483,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									value: salePrice,
									onChange: (e) => setSalePrice(e.target.value),
									placeholder: "Optional",
									className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1484,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1482,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-mono uppercase text-muted-foreground",
									children: "Stock Count"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1487,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									value: stock,
									onChange: (e) => setStock(Number(e.target.value)),
									className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1488,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1486,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-mono uppercase text-muted-foreground",
									children: "Low Alert Threshold"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1491,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									value: lowStockThreshold,
									onChange: (e) => setLowStockThreshold(Number(e.target.value)),
									className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1492,
									columnNumber: 15
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1490,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1477,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border bg-surface/40 p-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "font-mono uppercase text-muted-foreground font-bold",
									children: "Product Photo Asset"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1498,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Select one of the curated bundled assets or provide a direct web image link."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1501,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1",
									children: PRESET_IMAGE_KEYS.map((key) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => {
											setSelectedImage(key);
											setCustomImageUrl("");
										},
										className: `press relative rounded-xl border p-1 transition-all ${selectedImage === key && !customImageUrl ? "border-primary ring-2 ring-primary bg-primary/10" : "bg-surface hover:bg-muted"}`,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
											src: imageSrc(key),
											alt: key,
											className: "h-12 w-full object-cover rounded-lg"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1509,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "block text-center font-mono text-[9px] uppercase mt-1 truncate",
											children: key
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1510,
											columnNumber: 19
										}, this)]
									}, key, true, {
										fileName: _jsxFileName,
										lineNumber: 1505,
										columnNumber: 45
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1504,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: "Or Custom Image URL"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1517,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										value: customImageUrl,
										onChange: (e) => setCustomImageUrl(e.target.value),
										placeholder: "https://images.unsplash.com/...",
										className: "mt-1 h-9 w-full rounded-xl bg-background px-3 font-mono text-xs outline-none ring-primary focus:ring-2"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1518,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1516,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1497,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "font-mono uppercase text-muted-foreground",
							children: "Short Description (Tagline)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1523,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							value: shortDesc,
							onChange: (e) => setShortDesc(e.target.value),
							placeholder: "e.g. 65W GaN fast charger with 3 ports",
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1524,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1522,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "font-mono uppercase text-muted-foreground",
							children: "Full Description"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1528,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							rows: 3,
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Detailed editorial copy about materials, experience, and benefits…",
							className: "mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1529,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1527,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "font-mono uppercase text-muted-foreground",
								children: "Key Features (1 per line)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1534,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								rows: 4,
								value: featuresText,
								onChange: (e) => setFeaturesText(e.target.value),
								placeholder: "Active noise cancelling\n40h battery life\nFold-flat hinge",
								className: "mt-1 w-full rounded-xl bg-surface p-3 font-mono text-xs outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1537,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1533,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "font-mono uppercase text-muted-foreground",
								children: "Specifications (JSON Object)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1541,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								rows: 4,
								value: specsText,
								onChange: (e) => setSpecsText(e.target.value),
								placeholder: "{\"Battery\": \"40h\", \"Connection\": \"Bluetooth 5.3\"}",
								className: "mt-1 w-full rounded-xl bg-surface p-3 font-mono text-xs outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1544,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1540,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1532,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-6 pt-2 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "checkbox",
									id: "prod-published",
									checked: published,
									onChange: (e) => setPublished(e.target.checked),
									className: "h-4 w-4 rounded accent-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1550,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									htmlFor: "prod-published",
									className: "font-medium cursor-pointer",
									children: "Publish Product to storefront"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1551,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1549,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "checkbox",
									id: "prod-featured",
									checked: featured,
									onChange: (e) => setFeatured(e.target.checked),
									className: "h-4 w-4 rounded accent-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1557,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									htmlFor: "prod-featured",
									className: "font-medium cursor-pointer",
									children: "Feature on Homepage Curations ★"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1558,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1556,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1548,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1440,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex justify-end gap-3 border-t pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: onClose,
						className: "press rounded-full bg-surface px-5 py-2 text-xs font-semibold",
						children: "Cancel"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1566,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						disabled: !name.trim() || !sku.trim(),
						onClick: handleSave,
						className: "press rounded-full bg-primary px-6 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50",
						children: "Save Product"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1569,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1565,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1434,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1433,
		columnNumber: 10
	}, this);
}
function InventoryManager({ products, movements, onAdjustStock }) {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const filtered = products.filter((p) => {
		if (filter === "low") return p.stock <= (p.low_stock_threshold ?? 3);
		if (filter === "out") return p.stock <= 0;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-2xl font-extrabold tracking-tight",
				children: "Inventory & Stock Movements"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1597,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground",
				children: "Real-time inventory levels, threshold alerts, and complete historical audit logs of stock adjustments."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1598,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1596,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-lg font-bold",
						children: "Current Stock Levels"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1606,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-1.5 rounded-xl bg-surface p-1 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setFilter("all"),
								className: `press rounded-lg px-3 py-1 font-mono uppercase ${filter === "all" ? "bg-ink text-ink-foreground font-bold" : "text-muted-foreground"}`,
								children: [
									"All (",
									products.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1608,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setFilter("low"),
								className: `press rounded-lg px-3 py-1 font-mono uppercase ${filter === "low" ? "bg-ink text-ink-foreground font-bold" : "text-muted-foreground"}`,
								children: [
									"Low Stock Alerts (",
									products.filter((p) => p.stock <= (p.low_stock_threshold ?? 3)).length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1611,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setFilter("out"),
								className: `press rounded-lg px-3 py-1 font-mono uppercase ${filter === "out" ? "bg-ink text-ink-foreground font-bold" : "text-muted-foreground"}`,
								children: [
									"Out of Stock (",
									products.filter((p) => p.stock <= 0).length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1614,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1607,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1605,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto rounded-3xl border bg-card",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
							className: "border-b bg-surface/50 font-mono text-xs uppercase text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Product"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1624,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "SKU"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1625,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Current Stock"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1626,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Threshold"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1627,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5",
									children: "Status"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1628,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-3.5 text-right",
									children: "Adjustment"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1629,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1623,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1622,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y",
							children: filtered.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-surface/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 font-semibold text-xs",
										children: product.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1634,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 font-mono text-xs text-muted-foreground",
										children: product.sku
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1635,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 font-mono font-bold",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: product.stock <= 0 ? "text-destructive" : product.stock <= (product.low_stock_threshold ?? 3) ? "text-amber-600" : "",
											children: [product.stock, " units"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1639,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1638,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 font-mono text-xs text-muted-foreground",
										children: product.low_stock_threshold ?? 3
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1643,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `rounded-full px-2.5 py-0.5 font-mono text-[11px] ${product.stock <= 0 ? "bg-destructive/15 text-destructive font-bold" : product.stock <= (product.low_stock_threshold ?? 3) ? "bg-amber-500/15 text-amber-700 font-semibold" : "bg-success/15 text-success"}`,
											children: product.stock <= 0 ? "Out of stock" : product.stock <= (product.low_stock_threshold ?? 3) ? "Low stock warning" : "Healthy"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1647,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1646,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-3.5 text-right",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdjustStockDialog, {
											product,
											onAdjust: (delta, reason) => onAdjustStock(product.id, delta, reason)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1652,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1651,
										columnNumber: 19
									}, this)
								]
							}, product.id, true, {
								fileName: _jsxFileName,
								lineNumber: 1633,
								columnNumber: 40
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1632,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1621,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1620,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1604,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4 border-t pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-lg font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(History, { className: "h-5 w-5 text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1663,
							columnNumber: 11
						}, this), " Stock Adjustment History & Audit Trail"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1662,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Historical record of every manual and automated inventory adjustment, reason provided, and timestamp."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1665,
						columnNumber: 9
					}, this),
					movements.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground",
						children: "No inventory movement records logged yet."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1669,
						columnNumber: 35
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "overflow-x-auto rounded-3xl border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
								className: "border-b bg-surface/50 font-mono text-xs uppercase text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-6 py-3.5",
										children: "Date / Time"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1675,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-6 py-3.5",
										children: "Product"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1676,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-6 py-3.5",
										children: "Change (Delta)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1677,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-6 py-3.5",
										children: "Stated Reason"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1678,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "px-6 py-3.5 text-right",
										children: "Authorized By"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1679,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1674,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1673,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
								className: "divide-y text-xs",
								children: movements.map((m) => {
									const prod = products.find((p) => p.id === m.product_id);
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
										className: "hover:bg-surface/30",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
												className: "px-6 py-3.5 font-mono text-muted-foreground",
												children: new Date(m.created_at).toLocaleString()
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1686,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
												className: "px-6 py-3.5 font-semibold text-foreground",
												children: prod ? prod.name : m.product_id?.slice(0, 8)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1689,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
												className: "px-6 py-3.5 font-mono font-bold",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: `rounded-full px-2.5 py-0.5 ${m.delta > 0 ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`,
													children: m.delta > 0 ? `+${m.delta}` : m.delta
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1693,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1692,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
												className: "px-6 py-3.5 text-foreground",
												children: m.reason
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1697,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
												className: "px-6 py-3.5 font-mono text-muted-foreground text-right",
												children: m.changed_by ? `${m.changed_by.slice(0, 8)}…` : "Admin"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1698,
												columnNumber: 23
											}, this)
										]
									}, m.id, true, {
										fileName: _jsxFileName,
										lineNumber: 1685,
										columnNumber: 22
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1682,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1672,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1671,
						columnNumber: 20
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1661,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1595,
		columnNumber: 10
	}, this);
}
function StoreSettingsManager({ settings, onSaveSetting }) {
	const [wa, setWa] = (0, import_react.useState)(String(settings.whatsapp_number ?? "923274393495"));
	const [email, setEmail] = (0, import_react.useState)(String(settings.contact_email ?? "maniacphilos@gmail.com"));
	const [fee, setFee] = (0, import_react.useState)(Number(settings.delivery_fee ?? 250));
	const [disc, setDisc] = (0, import_react.useState)(Number(settings.advance_payment_discount_percent ?? 5));
	const accounts = Array.isArray(settings.payment_methods) ? settings.payment_methods : [
		{
			id: "jazzcash",
			label: "JazzCash",
			account_title: "Gubberz",
			account_number: "+92 327 4393495",
			enabled: true,
			instructions: "Transfer to JazzCash mobile wallet and upload screenshot receipt."
		},
		{
			id: "nayapay",
			label: "NayaPay",
			account_title: "Gubberz",
			account_number: "4782 7800 6321 6637",
			enabled: true,
			instructions: "Transfer via NayaPay and attach confirmation proof."
		},
		{
			id: "easypaisa",
			label: "Easypaisa",
			account_title: "Gubberz Store",
			account_number: "+92 300 1234567",
			enabled: true,
			instructions: "Transfer to Easypaisa account and upload proof."
		},
		{
			id: "bank_transfer",
			label: "Bank Transfer / Raast / IBAN",
			account_title: "Gubberz Tech",
			account_number: "PK89MEZN0001020304050607 · Raast: 923274393495",
			enabled: true,
			instructions: "Send via online banking or Raast instant transfer."
		}
	];
	const [paymentList, setPaymentList] = (0, import_react.useState)(accounts);
	const [editingPayment, setEditingPayment] = (0, import_react.useState)(null);
	function handleSavePaymentMethod(method) {
		const updated = [...paymentList];
		const idx = updated.findIndex((a) => a.id === method.id);
		if (idx >= 0) updated[idx] = method;
		else updated.push(method);
		setPaymentList(updated);
		onSaveSetting("payment_methods", updated);
		setEditingPayment(null);
	}
	function handleToggleMethod(id) {
		const updated = paymentList.map((m) => m.id === id ? {
			...m,
			enabled: !m.enabled
		} : m);
		setPaymentList(updated);
		onSaveSetting("payment_methods", updated);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-2xl font-extrabold tracking-tight",
				children: "Store Settings & Payment Methods"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1777,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground",
				children: "Update business contact details, delivery fees, advance discounts, and configure payment gateways for customers."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1778,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1776,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4 rounded-3xl border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-base font-bold",
						children: "Contact & Fulfillment Rules"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1785,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "WhatsApp Business Number"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1788,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								value: wa,
								onChange: (e) => setWa(e.target.value),
								className: "h-10 flex-1 rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1792,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => onSaveSetting("whatsapp_number", wa),
								className: "press rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-ink-foreground",
								children: "Save"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1793,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1791,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: "Customers use this for instant order queries and product assistance."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1797,
							columnNumber: 11
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1787,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-mono uppercase text-muted-foreground",
						children: "Contact Email"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1803,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-1 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							className: "h-10 flex-1 rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1805,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => onSaveSetting("contact_email", email),
							className: "press rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-ink-foreground",
							children: "Save"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1806,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1804,
						columnNumber: 11
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1802,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Delivery Fee (PKR)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1814,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								value: fee,
								onChange: (e) => setFee(Number(e.target.value)),
								className: "h-10 flex-1 rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1818,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => onSaveSetting("delivery_fee", fee),
								className: "press rounded-xl bg-ink px-3 py-2 text-xs font-semibold text-ink-foreground",
								children: "Save"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1819,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1817,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1813,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Advance Payment Discount (%)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1826,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "number",
								value: disc,
								onChange: (e) => setDisc(Number(e.target.value)),
								className: "h-10 flex-1 rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1830,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => onSaveSetting("advance_payment_discount_percent", disc),
								className: "press rounded-xl bg-ink px-3 py-2 text-xs font-semibold text-ink-foreground",
								children: "Save"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1831,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1829,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1825,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1812,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted-foreground",
						children: "Customers who choose advance payment methods (JazzCash, NayaPay, Easypaisa, Bank Transfer) automatically receive this discount calculated on subtotal."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1837,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1784,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4 rounded-3xl border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-base font-bold",
						children: "Pakistani Payment Methods"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1846,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Configure payment accounts, account titles, numbers, and custom instructions shown during checkout."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1847,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1845,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setEditingPayment({
							id: `custom_${Date.now()}`,
							label: "",
							account_title: "",
							account_number: "",
							enabled: true,
							instructions: ""
						}),
						className: "press flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1859,
							columnNumber: 13
						}, this), " Add Method"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1851,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1844,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-3 pt-2",
					children: paymentList.map((acc) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border bg-surface/50 p-4 transition-all hover:bg-surface/80",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-bold text-sm",
										children: acc.label
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1868,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${acc.enabled ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`,
										children: acc.enabled ? "Enabled" : "Disabled"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1869,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1867,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-mono text-xs text-muted-foreground mt-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Title:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1874,
											columnNumber: 21
										}, this),
										" ",
										acc.account_title || "—",
										" · ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Account / IBAN:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1874,
											columnNumber: 74
										}, this),
										" ",
										acc.account_number || "—"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1873,
									columnNumber: 19
								}, this),
								acc.instructions && /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: acc.instructions
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1877,
									columnNumber: 40
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1866,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => handleToggleMethod(acc.id),
									className: "press rounded-full bg-surface px-3 py-1 font-mono text-xs hover:bg-muted font-medium",
									children: acc.enabled ? "Disable" : "Enable"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1881,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setEditingPayment(acc),
									className: "press rounded-full bg-ink px-4 py-1 font-mono text-xs text-ink-foreground font-semibold",
									children: "Edit"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1884,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1880,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1865,
							columnNumber: 15
						}, this)
					}, acc.id, false, {
						fileName: _jsxFileName,
						lineNumber: 1864,
						columnNumber: 42
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1863,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1843,
				columnNumber: 7
			}, this),
			editingPayment && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (void 0)("h3", {
							className: "text-lg font-bold",
							children: "Configure Payment Method"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1896,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Method Label"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1898,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("input", {
							value: editingPayment.label,
							onChange: (e) => setEditingPayment({
								...editingPayment,
								label: e.target.value
							}),
							placeholder: "e.g. JazzCash, NayaPay, Meezan Bank",
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1899,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1897,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Account Title"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1905,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("input", {
							value: editingPayment.account_title,
							onChange: (e) => setEditingPayment({
								...editingPayment,
								account_title: e.target.value
							}),
							placeholder: "e.g. Gubberz Store / Muhammad Ali",
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1906,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1904,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Account Number / Phone / IBAN"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1912,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("input", {
							value: editingPayment.account_number,
							onChange: (e) => setEditingPayment({
								...editingPayment,
								account_number: e.target.value
							}),
							placeholder: "e.g. 03274393495 or PK89MEZN...",
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1915,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1911,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Customer Instructions"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1921,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("textarea", {
							rows: 3,
							value: editingPayment.instructions || "",
							onChange: (e) => setEditingPayment({
								...editingPayment,
								instructions: e.target.value
							}),
							placeholder: "e.g. Transfer the exact discounted amount and upload payment screenshot.",
							className: "mt-1 w-full rounded-xl bg-surface p-3 text-xs outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1924,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1920,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)("input", {
								type: "checkbox",
								id: "acc-enabled",
								checked: editingPayment.enabled,
								onChange: (e) => setEditingPayment({
									...editingPayment,
									enabled: e.target.checked
								}),
								className: "h-4 w-4 rounded accent-primary"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1930,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("label", {
								htmlFor: "acc-enabled",
								className: "text-xs font-medium cursor-pointer",
								children: "Enable payment method for customers at checkout"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1934,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1929,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex justify-end gap-3 pt-2",
							children: [/* @__PURE__ */ (void 0)("button", {
								onClick: () => setEditingPayment(null),
								className: "press rounded-full bg-surface px-4 py-2 text-xs font-medium",
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1940,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								disabled: !editingPayment.label.trim(),
								onClick: () => handleSavePaymentMethod(editingPayment),
								className: "press rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50",
								children: "Save Method"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1943,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1939,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1895,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1894,
				columnNumber: 26
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1775,
		columnNumber: 10
	}, this);
}
function AdjustStockDialog({ product, onAdjust }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [delta, setDelta] = (0, import_react.useState)(10);
	const [reason, setReason] = (0, import_react.useState)("Restock batch");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		onClick: () => setOpen(true),
		className: "press rounded-full bg-surface px-3 py-1 font-mono text-xs hover:bg-muted font-medium",
		children: "Adjust"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1966,
		columnNumber: 7
	}, this), open && /* @__PURE__ */ (void 0)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 text-left backdrop-blur-xs",
		children: /* @__PURE__ */ (void 0)("div", {
			className: "w-full max-w-sm rounded-3xl bg-background p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (void 0)("h3", {
					className: "text-lg font-bold",
					children: ["Adjust Stock: ", product.name]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1972,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("p", {
					className: "text-xs text-muted-foreground mt-1 font-mono",
					children: [
						"Current In-Stock: ",
						/* @__PURE__ */ (void 0)("strong", { children: product.stock }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1974,
							columnNumber: 33
						}, this),
						" units"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1973,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-4 space-y-3",
					children: [/* @__PURE__ */ (void 0)("div", { children: [
						/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Stock Delta (+/-)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1979,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("input", {
							type: "number",
							value: delta,
							onChange: (e) => setDelta(parseInt(e.target.value) || 0),
							placeholder: "e.g. +10 or -5",
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 font-mono text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1982,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-1 text-[11px] text-muted-foreground font-mono",
							children: [
								"New stock will be: ",
								/* @__PURE__ */ (void 0)("strong", { children: Math.max(0, product.stock + delta) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1984,
									columnNumber: 38
								}, this),
								" units"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1983,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1978,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
						className: "text-xs font-mono uppercase text-muted-foreground",
						children: "Reason for Adjustment (Audit Trail)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1989,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("input", {
						value: reason,
						onChange: (e) => setReason(e.target.value),
						placeholder: "e.g. Restock shipment, damaged unit, recount",
						className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1992,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1988,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1977,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-6 flex justify-end gap-3",
					children: [/* @__PURE__ */ (void 0)("button", {
						onClick: () => setOpen(false),
						className: "press rounded-full bg-surface px-4 py-2 text-xs font-medium",
						children: "Cancel"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1997,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						disabled: delta === 0 || !reason.trim(),
						onClick: () => {
							onAdjust(delta, reason.trim());
							setOpen(false);
						},
						className: "press rounded-full bg-ink px-5 py-2 text-xs font-bold text-ink-foreground disabled:opacity-50",
						children: "Apply & Record"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 2e3,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1996,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1971,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 1970,
		columnNumber: 16
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1965,
		columnNumber: 10
	}, this);
}
function SectionEditDialog({ section, onSave }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)(section.title);
	const [eyebrow, setEyebrow] = (0, import_react.useState)(section.eyebrow ?? "");
	const [body, setBody] = (0, import_react.useState)(section.body ?? "");
	const [ctaLabel, setCtaLabel] = (0, import_react.useState)(section.cta_label ?? "");
	const [ctaHref, setCtaHref] = (0, import_react.useState)(section.cta_href ?? "");
	const [theme, setTheme] = (0, import_react.useState)(section.theme);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		onClick: () => setOpen(true),
		className: "press rounded-full bg-surface px-4 py-1.5 text-xs font-semibold hover:bg-muted",
		children: "Edit"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 2030,
		columnNumber: 7
	}, this), open && /* @__PURE__ */ (void 0)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4",
		children: /* @__PURE__ */ (void 0)("div", {
			className: "w-full max-w-lg rounded-3xl bg-background p-6 shadow-2xl",
			children: [
				/* @__PURE__ */ (void 0)("h3", {
					className: "text-lg font-bold",
					children: ["Edit Section: ", section.section_type]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 2036,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Eyebrow"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2039,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("input", {
							value: eyebrow,
							onChange: (e) => setEyebrow(e.target.value),
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2040,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2038,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Title"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2043,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("input", {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2044,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2042,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Body Copy"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2047,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("textarea", {
							rows: 3,
							value: body,
							onChange: (e) => setBody(e.target.value),
							className: "mt-1 w-full rounded-xl bg-surface p-3 text-sm outline-none ring-primary focus:ring-2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2050,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2046,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "text-xs font-mono uppercase text-muted-foreground",
								children: "CTA Label"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2054,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("input", {
								value: ctaLabel,
								onChange: (e) => setCtaLabel(e.target.value),
								className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2057,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 2053,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "text-xs font-mono uppercase text-muted-foreground",
								children: "CTA Href"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2060,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("input", {
								value: ctaHref,
								onChange: (e) => setCtaHref(e.target.value),
								className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 2063,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 2059,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2052,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
							className: "text-xs font-mono uppercase text-muted-foreground",
							children: "Theme"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 2067,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("select", {
							value: theme,
							onChange: (e) => setTheme(e.target.value),
							className: "mt-1 h-10 w-full rounded-xl bg-surface px-3 text-sm outline-none ring-primary focus:ring-2",
							children: [
								/* @__PURE__ */ (void 0)("option", {
									value: "paper",
									children: "Paper (Warm minimal)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 2069,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "ink",
									children: "Ink (Dark bold)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 2070,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "accent",
									children: "Accent (Vibrant pop)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 2071,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2068,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 2066,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 2037,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-6 flex justify-end gap-3",
					children: [/* @__PURE__ */ (void 0)("button", {
						onClick: () => setOpen(false),
						className: "press rounded-full bg-surface px-4 py-2 text-xs font-medium",
						children: "Cancel"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 2077,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => {
							onSave({
								...section,
								title,
								eyebrow: eyebrow || null,
								body: body || null,
								cta_label: ctaLabel || null,
								cta_href: ctaHref || null,
								theme
							});
							setOpen(false);
						},
						className: "press rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground",
						children: "Save Changes"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 2080,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 2076,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 2035,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 2034,
		columnNumber: 16
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 2029,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminDashboard as component };
