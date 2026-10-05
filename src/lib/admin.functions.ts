import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const sectionTypes = [
  "hero",
  "product_story",
  "product_edit",
  "category_index",
  "product_rail",
  "campaign",
  "character",
  "service_notes",
] as const;

export const sectionSchema = z.object({
  id: z.string().uuid().optional(),
  section_type: z.enum(sectionTypes),
  eyebrow: z.string().trim().max(100).nullable().optional(),
  title: z.string().trim().min(1).max(180),
  body: z.string().trim().max(1000).nullable().optional(),
  media_key: z.string().trim().max(300).nullable().optional(),
  character_key: z.string().trim().max(100).nullable().optional(),
  product_slugs: z.array(z.string().trim().max(120)).max(20).default([]),
  category_slugs: z.array(z.string().trim().max(80)).max(20).default([]),
  cta_label: z.string().trim().max(80).nullable().optional(),
  cta_href: z.string().trim().max(300).nullable().optional(),
  theme: z.enum(["paper", "ink", "accent"]).default("paper"),
  layout: z.string().trim().min(1).max(80).default("standard"),
  sort_order: z.number().int().min(0).max(10000).default(0),
  published: z.boolean().default(true),
  settings: z.record(z.unknown()).default({}),
});

function getAdminEmails(): string[] {
  const envEmails =
    process.env["ADMIN_EMAILS"] ||
    process.env["VITE_ADMIN_EMAILS"] ||
    "isb.rwp.1.pstofficer@gmail.com,maniacphilos@gmail.com";
  return envEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function checkAdminRole(context: {
  supabase: any;
  userId: string;
  claims?: any;
}): Promise<boolean> {
  const adminEmails = getAdminEmails();
  const userEmail = (context.claims?.email || "").toLowerCase().trim();

  // If email matches environment configuration or default admin emails
  if (userEmail && adminEmails.includes(userEmail)) {
    // Ensure they have the admin role row in user_roles table using service role client
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: context.userId, role: "admin" }, { onConflict: "user_id,role" });
    } catch (e) {
      console.warn("Could not ensure admin role in DB:", e);
    }
    return true;
  }

  // Check user_roles table in database
  try {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return !!data;
  } catch {
    return false;
  }
}

/**
 * Returns a privileged Supabase client for admin operations.
 * Throws an error if the authenticated user is not an authorized admin.
 */
async function getAdminDbClient(context: {
  supabase: any;
  userId: string;
  claims?: any;
}) {
  const isAdmin = await checkAdminRole(context);
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin privileges required.");
  }
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    return supabaseAdmin;
  } catch (err) {
    console.warn("Falling back to authenticated context.supabase:", err);
    return context.supabase;
  }
}

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await checkAdminRole(context);
    return { isAdmin };
  });

export const claimAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin
        .from("user_roles")
        .upsert({ user_id: context.userId, role: "admin" as const }, { onConflict: "user_id,role" });
    } catch (e) {
      console.warn("Role upsert notice:", e);
    }
    return { ok: true };
  });

export const getAdminSnapshot = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const hasAdmin = await checkAdminRole(context);
    const db = await getAdminDbClient(context);

    const [sectionsRes, productsRes, categoriesRes, settingsRes, ordersRes, movementsRes] =
      await Promise.allSettled([
        db.from("home_sections").select("*").order("sort_order"),
        db
          .from("products")
          .select(
            "id,name,slug,sku,brand,category_id,short_description,description,price,sale_price,stock,low_stock_threshold,images,specs,features,tags,published,featured,variants,created_at,updated_at",
          )
          .order("updated_at", { ascending: false }),
        db.from("categories").select("*").order("sort_order"),
        db.from("store_settings").select("key,value").order("key"),
        db
          .from("orders")
          .select(
            "id,code,customer_name,phone,email,address,city,notes,payment_method,payment_proof,status,subtotal,discount,delivery_fee,total,created_at",
          )
          .order("created_at", { ascending: false })
          .limit(100),
        db
          .from("inventory_movements")
          .select("id,product_id,delta,reason,created_at")
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

    const sections =
      sectionsRes.status === "fulfilled" && !sectionsRes.value.error
        ? (sectionsRes.value.data ?? [])
        : [];
    const products =
      productsRes.status === "fulfilled" && !productsRes.value.error
        ? (productsRes.value.data ?? [])
        : [];
    const categories =
      categoriesRes.status === "fulfilled" && !categoriesRes.value.error
        ? (categoriesRes.value.data ?? [])
        : [];
    const settings =
      settingsRes.status === "fulfilled" && !settingsRes.value.error
        ? (settingsRes.value.data ?? [])
        : [];
    const orders =
      ordersRes.status === "fulfilled" && !ordersRes.value.error
        ? (ordersRes.value.data ?? [])
        : [];
    const inventoryMovements =
      movementsRes.status === "fulfilled" && !movementsRes.value.error
        ? (movementsRes.value.data ?? [])
        : [];

    return {
      hasAdmin,
      userId: context.userId,
      sections,
      products,
      categories,
      settings,
      orders,
      inventoryMovements,
    };
  });

export const saveHomeSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => sectionSchema.parse(input))
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const payload = {
      ...(data.id ? { id: data.id } : {}),
      section_type: data.section_type,
      eyebrow: data.eyebrow || null,
      title: data.title,
      body: data.body || null,
      media_key: data.media_key || null,
      character_key: data.character_key || null,
      product_slugs: data.product_slugs || [],
      category_slugs: data.category_slugs || [],
      cta_label: data.cta_label || null,
      cta_href: data.cta_href || null,
      theme: data.theme,
      layout: data.layout,
      sort_order: data.sort_order,
      published: data.published,
      settings: data.settings || {},
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { error } = await db.from("home_sections").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await db.from("home_sections").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteHomeSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const { error } = await db.from("home_sections").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderHomeSections = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        items: z.array(z.object({ id: z.string().uuid(), sort_order: z.number().int() })),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    for (const item of data.items) {
      await db.from("home_sections").update({ sort_order: item.sort_order }).eq("id", item.id);
    }
    return { ok: true };
  });

export const saveStoreSetting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        key: z.enum([
          "whatsapp_number",
          "contact_email",
          "advance_payment_discount_percent",
          "delivery_fee",
          "payment_methods",
        ]),
        value: z.unknown(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const { error } = await db
      .from("store_settings")
      .upsert({ key: data.key, value: data.value as never });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(2).max(80),
        slug: z.string().trim().min(2).max(80),
        blurb: z.string().trim().max(300).nullable().optional(),
        sort_order: z.number().int().min(0).max(10000).default(0),
        published: z.boolean().default(true),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const payload = {
      name: data.name,
      slug: data.slug.toLowerCase().replace(/[^a-z0-9_-]/g, "-"),
      blurb: data.blurb || null,
      sort_order: data.sort_order,
      published: data.published,
    };

    if (data.id) {
      const { error } = await db.from("categories").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await db.from("categories").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const toggleCategoryPublished = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), published: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const { error } = await db
      .from("categories")
      .update({ published: data.published })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderCategories = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        items: z.array(z.object({ id: z.string().uuid(), sort_order: z.number().int() })),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    for (const item of data.items) {
      await db.from("categories").update({ sort_order: item.sort_order }).eq("id", item.id);
    }
    return { ok: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    // Unlink products first
    await db.from("products").update({ category_id: null }).eq("category_id", data.id);

    const { error } = await db.from("categories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid().optional(),
        name: z.string().trim().min(2).max(150),
        slug: z.string().trim().min(2).max(150),
        sku: z.string().trim().min(2).max(60),
        brand: z.string().trim().max(80).nullable().optional(),
        category_id: z.string().uuid().nullable().optional(),
        short_description: z.string().trim().max(300).nullable().optional(),
        description: z.string().trim().max(3000).nullable().optional(),
        price: z.number().int().min(0),
        sale_price: z.number().int().min(0).nullable().optional(),
        stock: z.number().int().min(0).default(0),
        low_stock_threshold: z.number().int().min(0).default(3),
        images: z.array(z.string().trim()).default(["headphones"]),
        specs: z.record(z.unknown()).default({}),
        features: z.array(z.string().trim()).default([]),
        tags: z.array(z.string().trim()).default([]),
        published: z.boolean().default(true),
        featured: z.boolean().default(false),
        variants: z.union([z.record(z.unknown()), z.array(z.unknown())]).optional().default({}),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
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
      featured: data.featured,
      variants: data.variants || {},
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { error } = await db.from("products").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await db.from("products").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const toggleProductField = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        field: z.enum(["published", "featured"]),
        value: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const { error } = await db
      .from("products")
      .update({ [data.field]: data.value, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const { error } = await db.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const changeInventory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        productId: z.string().uuid(),
        delta: z
          .number()
          .int()
          .min(-10000)
          .max(10000)
          .refine((v) => v !== 0),
        reason: z.string().trim().min(2).max(200),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const { data: stock, error } = await db.rpc("adjust_inventory", {
      p_product_id: data.productId,
      p_delta: data.delta,
      p_reason: data.reason,
    });
    if (error) {
      // Direct update fallback if RPC errors
      const { data: prod } = await db
        .from("products")
        .select("stock")
        .eq("id", data.productId)
        .single();
      const currentStock = prod?.stock ?? 0;
      const nextStock = Math.max(0, currentStock + data.delta);
      const { error: updErr } = await db
        .from("products")
        .update({ stock: nextStock, updated_at: new Date().toISOString() })
        .eq("id", data.productId);
      if (updErr) throw new Error(error.message || updErr.message);

      await db.from("inventory_movements").insert({
        product_id: data.productId,
        delta: data.delta,
        reason: data.reason,
        changed_by: context.userId,
      });
      return { stock: nextStock };
    }
    return { stock };
  });

export const changeOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        orderId: z.string().uuid(),
        status: z.enum([
          "placed",
          "payment_verification",
          "confirmed",
          "packed",
          "shipped",
          "delivered",
          "cancelled",
        ]),
        note: z.string().trim().max(500),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const { error } = await db.rpc("set_order_status", {
      p_order_id: data.orderId,
      p_status: data.status,
      p_note: data.note || undefined,
    });
    if (error) {
      // Direct fallback
      const { data: oldOrder } = await db
        .from("orders")
        .select("status")
        .eq("id", data.orderId)
        .single();
      const fromStatus = oldOrder?.status ?? null;
      const { error: updErr } = await db
        .from("orders")
        .update({ status: data.status, updated_at: new Date().toISOString() })
        .eq("id", data.orderId);
      if (updErr) throw new Error(error.message || updErr.message);

      await db.from("order_status_events").insert({
        order_id: data.orderId,
        from_status: fromStatus,
        to_status: data.status,
        note: data.note || null,
        changed_by: context.userId,
      });
    }
    return { ok: true };
  });

export const getOrderDetails = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ orderId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const [orderRes, itemsRes, eventsRes] = await Promise.all([
      db.from("orders").select("*").eq("id", data.orderId).single(),
      db.from("order_items").select("*").eq("order_id", data.orderId),
      db
        .from("order_status_events")
        .select("*")
        .eq("order_id", data.orderId)
        .order("created_at", { ascending: false }),
    ]);

    if (orderRes.error) throw new Error("Order not found: " + orderRes.error.message);

    return {
      order: orderRes.data,
      items: itemsRes.data ?? [],
      events: eventsRes.data ?? [],
    };
  });

export const updateProductSpecs = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        price: z.number().int().min(0),
        sale_price: z.number().int().min(0).nullable(),
        specs: z.record(z.unknown()),
        features: z.array(z.string()),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const { error } = await db
      .from("products")
      .update({
        price: data.price,
        sale_price: data.sale_price,
        specs: data.specs,
        features: data.features,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const uploadProductImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        fileName: z.string().min(1),
        contentType: z.string().min(1),
        base64Data: z.string().min(1),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const db = await getAdminDbClient(context);
    const buffer = Buffer.from(data.base64Data, "base64");
    const ext =
      data.fileName
        .split(".")
        .pop()
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, "") || "jpg";
    const filePath = `products/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

    const { error: uploadErr } = await db.storage
      .from("product-images")
      .upload(filePath, buffer, {
        contentType: data.contentType,
        upsert: true,
      });

    if (uploadErr) {
      throw new Error(`Storage upload failed: ${uploadErr.message}`);
    }

    const { data: pubUrl } = db.storage.from("product-images").getPublicUrl(filePath);
    return { publicUrl: pubUrl.publicUrl };
  });
