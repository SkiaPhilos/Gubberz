import { l as createServerFn } from "./createServerFn-DDDJMFWM-CziPrtnf.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DFaDlHNk-D0hWLNq2.mjs";
import { a as numberType, c as stringType, l as unknownType, n as booleanType, o as objectType, r as enumType, s as recordType, t as arrayType } from "./_libs/zod-Bbj5tsZ5.mjs";
import { t as createServerRpc } from "./createServerRpc-CxD4EZ5P-DiPHtqFZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-Uv8flfOH.js
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
function getAdminEmails() {
	return (process.env["ADMIN_EMAILS"] || process.env["VITE_ADMIN_EMAILS"] || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
async function checkAdminRole(context) {
	const adminEmails = getAdminEmails();
	const userEmail = (context.claims?.email || "").toLowerCase().trim();
	if (userEmail && adminEmails.includes(userEmail)) {
		try {
			await context.supabase.from("user_roles").upsert({
				user_id: context.userId,
				role: "admin"
			});
		} catch {}
		return true;
	}
	try {
		const { data, error } = await context.supabase.rpc("has_role", {
			_user_id: context.userId,
			_role: "admin"
		});
		if (error) return false;
		return !!data;
	} catch {
		return false;
	}
}
var checkIsAdmin_createServerFn_handler = createServerRpc({
	id: "d7ab752d5c5280d2ee84a9875749b1cba0d95c7bbe892baa67e4f3368bfac36c",
	name: "checkIsAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => checkIsAdmin.__executeServer(opts));
var checkIsAdmin = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(checkIsAdmin_createServerFn_handler, async ({ context }) => {
	return { isAdmin: await checkAdminRole(context) };
});
var claimAdminRole_createServerFn_handler = createServerRpc({
	id: "c9094d6faf8245d20141c4c32c6c4ce4e2ef0f9397c9e0fc76cb68ec3d58070a",
	name: "claimAdminRole",
	filename: "src/lib/admin.functions.ts"
}, (opts) => claimAdminRole.__executeServer(opts));
var claimAdminRole = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(claimAdminRole_createServerFn_handler, async ({ context }) => {
	try {
		const { error } = await context.supabase.from("user_roles").upsert({
			user_id: context.userId,
			role: "admin"
		});
		if (error) console.warn("Direct role claim warning:", error.message);
	} catch (e) {
		console.warn("Role upsert failed:", e);
	}
	return { ok: true };
});
var getAdminSnapshot_createServerFn_handler = createServerRpc({
	id: "c392237e4ac42dc6d36cf6cc02949bfa608f3afced247b74683956cb8c692747",
	name: "getAdminSnapshot",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminSnapshot.__executeServer(opts));
var getAdminSnapshot = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminSnapshot_createServerFn_handler, async ({ context }) => {
	const hasAdmin = await checkAdminRole(context);
	const [sectionsRes, productsRes, categoriesRes, settingsRes, ordersRes, movementsRes] = await Promise.allSettled([
		context.supabase.from("home_sections").select("*").order("sort_order"),
		context.supabase.from("products").select("id,name,slug,sku,brand,category_id,short_description,description,price,sale_price,stock,low_stock_threshold,images,specs,features,tags,published,featured,created_at,updated_at").order("updated_at", { ascending: false }),
		context.supabase.from("categories").select("*").order("sort_order"),
		context.supabase.from("store_settings").select("key,value").order("key"),
		context.supabase.from("orders").select("id,code,customer_name,phone,email,address,city,notes,payment_method,payment_proof,status,subtotal,discount,delivery_fee,total,created_at").order("created_at", { ascending: false }).limit(100),
		context.supabase.from("inventory_movements").select("id,product_id,delta,reason,changed_by,created_at").order("created_at", { ascending: false }).limit(60)
	]);
	const sections = sectionsRes.status === "fulfilled" && !sectionsRes.value.error ? sectionsRes.value.data ?? [] : [];
	const products = productsRes.status === "fulfilled" && !productsRes.value.error ? productsRes.value.data ?? [] : [];
	const categories = categoriesRes.status === "fulfilled" && !categoriesRes.value.error ? categoriesRes.value.data ?? [] : [];
	const settings = settingsRes.status === "fulfilled" && !settingsRes.value.error ? settingsRes.value.data ?? [] : [];
	const orders = ordersRes.status === "fulfilled" && !ordersRes.value.error ? ordersRes.value.data ?? [] : [];
	const inventoryMovements = movementsRes.status === "fulfilled" && !movementsRes.value.error ? movementsRes.value.data ?? [] : [];
	return {
		hasAdmin,
		userId: context.userId,
		sections,
		products,
		categories,
		settings,
		orders,
		inventoryMovements
	};
});
var saveHomeSection_createServerFn_handler = createServerRpc({
	id: "136484a352a76522e3e434aa266ca5ed564d47fd3aeff6cfae38a9b438b3e874",
	name: "saveHomeSection",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveHomeSection.__executeServer(opts));
var saveHomeSection = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => sectionSchema.parse(input)).handler(saveHomeSection_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("home_sections").update(data).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var saveStoreSetting_createServerFn_handler = createServerRpc({
	id: "1fab97f62402386079c58b90c33884ea0fe49080351bfbe3e5a09618b933d1c0",
	name: "saveStoreSetting",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveStoreSetting.__executeServer(opts));
var saveStoreSetting = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	key: enumType([
		"whatsapp_number",
		"contact_email",
		"advance_payment_discount_percent",
		"delivery_fee",
		"payment_methods"
	]),
	value: unknownType()
}).parse(input)).handler(saveStoreSetting_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("store_settings").upsert({
		key: data.key,
		value: data.value
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var saveCategory_createServerFn_handler = createServerRpc({
	id: "d55046ba33898196eca5650d70b9240e9ea3d10d5d71b6dd00eddef9ea1312c1",
	name: "saveCategory",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveCategory.__executeServer(opts));
var saveCategory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid().optional(),
	name: stringType().trim().min(2).max(80),
	slug: stringType().trim().min(2).max(80),
	blurb: stringType().trim().max(300).nullable().optional(),
	sort_order: numberType().int().min(0).max(1e4).default(0),
	published: booleanType().default(true)
}).parse(input)).handler(saveCategory_createServerFn_handler, async ({ data, context }) => {
	const payload = {
		name: data.name,
		slug: data.slug.toLowerCase().replace(/[^a-z0-9_-]/g, "-"),
		blurb: data.blurb || null,
		sort_order: data.sort_order,
		published: data.published
	};
	if (data.id) {
		const { error } = await context.supabase.from("categories").update(payload).eq("id", data.id);
		if (error) throw new Error(error.message);
	} else {
		const { error } = await context.supabase.from("categories").insert(payload);
		if (error) throw new Error(error.message);
	}
	return { ok: true };
});
var toggleCategoryPublished_createServerFn_handler = createServerRpc({
	id: "9e3d0a159a8feb67e2ce77ca38b99dc40ef2da5e24ac7b2f5aaa2e380e60a78c",
	name: "toggleCategoryPublished",
	filename: "src/lib/admin.functions.ts"
}, (opts) => toggleCategoryPublished.__executeServer(opts));
var toggleCategoryPublished = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	published: booleanType()
}).parse(input)).handler(toggleCategoryPublished_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("categories").update({ published: data.published }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var reorderCategories_createServerFn_handler = createServerRpc({
	id: "942f0206dc5d14c64f61b7e9ec57483bfc9010e9b56f40fcba53b0aa58a9ef8e",
	name: "reorderCategories",
	filename: "src/lib/admin.functions.ts"
}, (opts) => reorderCategories.__executeServer(opts));
var reorderCategories = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ items: arrayType(objectType({
	id: stringType().uuid(),
	sort_order: numberType().int()
})) }).parse(input)).handler(reorderCategories_createServerFn_handler, async ({ data, context }) => {
	for (const item of data.items) await context.supabase.from("categories").update({ sort_order: item.sort_order }).eq("id", item.id);
	return { ok: true };
});
var deleteCategory_createServerFn_handler = createServerRpc({
	id: "f474bf6273f5a18c6cc5ab7a1e03dbbd6091e0cc20a15e2ec3f36e561a6d03af",
	name: "deleteCategory",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deleteCategory.__executeServer(opts));
var deleteCategory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(deleteCategory_createServerFn_handler, async ({ data, context }) => {
	await context.supabase.from("products").update({ category_id: null }).eq("category_id", data.id);
	const { error } = await context.supabase.from("categories").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var saveProduct_createServerFn_handler = createServerRpc({
	id: "f686d9cf1ee0a8e13e31464bd65516de46d8902dd7a0e7753ff321b9d66c8f51",
	name: "saveProduct",
	filename: "src/lib/admin.functions.ts"
}, (opts) => saveProduct.__executeServer(opts));
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
}).parse(input)).handler(saveProduct_createServerFn_handler, async ({ data, context }) => {
	const payload = {
		name: data.name,
		slug: data.slug.toLowerCase().replace(/[^a-z0-9_-]/g, "-"),
		sku: data.sku.toUpperCase(),
		brand: data.brand || null,
		category_id: data.category_id || null,
		short_description: data.short_description || null,
		description: data.description || null,
		price: data.price,
		sale_price: data.sale_price != null && data.sale_price >= 0 ? data.sale_price : null,
		stock: data.stock,
		low_stock_threshold: data.low_stock_threshold,
		images: data.images.length > 0 ? data.images : ["headphones"],
		specs: data.specs,
		features: data.features,
		tags: data.tags,
		published: data.published,
		featured: data.featured
	};
	if (data.id) {
		const { error } = await context.supabase.from("products").update(payload).eq("id", data.id);
		if (error) throw new Error(error.message);
	} else {
		const { error } = await context.supabase.from("products").insert(payload);
		if (error) throw new Error(error.message);
	}
	return { ok: true };
});
var toggleProductField_createServerFn_handler = createServerRpc({
	id: "f71899c28e124a81221b7db32a7a71f3a6aa2e2f82b7d60f03acacc30b61027f",
	name: "toggleProductField",
	filename: "src/lib/admin.functions.ts"
}, (opts) => toggleProductField.__executeServer(opts));
var toggleProductField = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	field: enumType(["published", "featured"]),
	value: booleanType()
}).parse(input)).handler(toggleProductField_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("products").update({ [data.field]: data.value }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var deleteProduct_createServerFn_handler = createServerRpc({
	id: "d58e9647e4364d7098cb0d840b98a827719a64c5b316ad80080e28b97fb3f1cb",
	name: "deleteProduct",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deleteProduct.__executeServer(opts));
var deleteProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(deleteProduct_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("products").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var changeInventory_createServerFn_handler = createServerRpc({
	id: "79736e4aec301f92d3c7a4a06681410059d08df4a937684a6d829f5698a9d32d",
	name: "changeInventory",
	filename: "src/lib/admin.functions.ts"
}, (opts) => changeInventory.__executeServer(opts));
var changeInventory = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	productId: stringType().uuid(),
	delta: numberType().int().min(-1e4).max(1e4).refine((v) => v !== 0),
	reason: stringType().trim().min(2).max(200)
}).parse(input)).handler(changeInventory_createServerFn_handler, async ({ data, context }) => {
	const { data: stock, error } = await context.supabase.rpc("adjust_inventory", {
		p_product_id: data.productId,
		p_delta: data.delta,
		p_reason: data.reason
	});
	if (error) {
		const { data: prod } = await context.supabase.from("products").select("stock").eq("id", data.productId).single();
		const currentStock = prod?.stock ?? 0;
		const nextStock = Math.max(0, currentStock + data.delta);
		const { error: updErr } = await context.supabase.from("products").update({ stock: nextStock }).eq("id", data.productId);
		if (updErr) throw new Error(error.message || updErr.message);
		await context.supabase.from("inventory_movements").insert({
			product_id: data.productId,
			delta: data.delta,
			reason: data.reason,
			changed_by: context.userId
		});
		return { stock: nextStock };
	}
	return { stock };
});
var changeOrderStatus_createServerFn_handler = createServerRpc({
	id: "446ac1da84fb61b7baf8fa0833599c5ad86ab8413fceded776407cacb9d1609e",
	name: "changeOrderStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => changeOrderStatus.__executeServer(opts));
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
}).parse(input)).handler(changeOrderStatus_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.rpc("set_order_status", {
		p_order_id: data.orderId,
		p_status: data.status,
		p_note: data.note || void 0
	});
	if (error) {
		const { data: oldOrder } = await context.supabase.from("orders").select("status").eq("id", data.orderId).single();
		const fromStatus = oldOrder?.status ?? null;
		const { error: updErr } = await context.supabase.from("orders").update({ status: data.status }).eq("id", data.orderId);
		if (updErr) throw new Error(error.message || updErr.message);
		await context.supabase.from("order_status_events").insert({
			order_id: data.orderId,
			from_status: fromStatus,
			to_status: data.status,
			note: data.note || null,
			changed_by: context.userId
		});
	}
	return { ok: true };
});
var getOrderDetails_createServerFn_handler = createServerRpc({
	id: "f653ce05a89efd7f30ee29fdafd2e068ae2fc84cb6c4df9420a0f29a2d54d71d",
	name: "getOrderDetails",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getOrderDetails.__executeServer(opts));
var getOrderDetails = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ orderId: stringType().uuid() }).parse(input)).handler(getOrderDetails_createServerFn_handler, async ({ data, context }) => {
	const [orderRes, itemsRes, eventsRes] = await Promise.all([
		context.supabase.from("orders").select("*").eq("id", data.orderId).single(),
		context.supabase.from("order_items").select("*").eq("order_id", data.orderId),
		context.supabase.from("order_status_events").select("*").eq("order_id", data.orderId).order("created_at", { ascending: false })
	]);
	if (orderRes.error) throw new Error("Order not found: " + orderRes.error.message);
	return {
		order: orderRes.data,
		items: itemsRes.data ?? [],
		events: eventsRes.data ?? []
	};
});
var updateProductSpecs_createServerFn_handler = createServerRpc({
	id: "65635ef6dbe767ea4cd9e6f1a0f1663ef31afe94238f42a1becf4ca8b0fa3082",
	name: "updateProductSpecs",
	filename: "src/lib/admin.functions.ts"
}, (opts) => updateProductSpecs.__executeServer(opts));
var updateProductSpecs = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	price: numberType().int().min(0),
	sale_price: numberType().int().min(0).nullable(),
	specs: recordType(unknownType()),
	features: arrayType(stringType())
}).parse(input)).handler(updateProductSpecs_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("products").update({
		price: data.price,
		sale_price: data.sale_price,
		specs: data.specs,
		features: data.features
	}).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { changeInventory_createServerFn_handler, changeOrderStatus_createServerFn_handler, checkIsAdmin_createServerFn_handler, claimAdminRole_createServerFn_handler, deleteCategory_createServerFn_handler, deleteProduct_createServerFn_handler, getAdminSnapshot_createServerFn_handler, getOrderDetails_createServerFn_handler, reorderCategories_createServerFn_handler, saveCategory_createServerFn_handler, saveHomeSection_createServerFn_handler, saveProduct_createServerFn_handler, saveStoreSetting_createServerFn_handler, toggleCategoryPublished_createServerFn_handler, toggleProductField_createServerFn_handler, updateProductSpecs_createServerFn_handler };
