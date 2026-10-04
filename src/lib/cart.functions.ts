import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let _db: any | undefined;

function getDb(): any {
  if (!_db) {
    if (typeof window !== "undefined") return null;
    const { DatabaseSync } = require("node:sqlite");
    const dir = path.resolve(process.cwd(), "data");
    fs.mkdirSync(dir, { recursive: true });
    const dbPath = path.join(dir, "cart.db");
    _db = new DatabaseSync(dbPath);
    _db.exec(`
      CREATE TABLE IF NOT EXISTS carts (
        id TEXT PRIMARY KEY,
        items TEXT NOT NULL DEFAULT '[]',
        updated_at INTEGER NOT NULL
      )
    `);
  }
  return _db;
}

const itemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  image: z.string(),
  unitPrice: z.number(),
  listPrice: z.number(),
  qty: z.number().int().min(1),
  stock: z.number(),
  variant: z.string().optional(),
});

export type DbCartItem = z.infer<typeof itemSchema>;

export const getDbCart = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ cartId: z.string().min(5).max(100) }).parse(input))
  .handler(async ({ data }) => {
    try {
      const db = getDb();
      const row = db.prepare("SELECT items FROM carts WHERE id = ?").get(data.cartId) as
        { items: string } | undefined;
      if (!row || !row.items) return { items: [] as DbCartItem[] };
      const parsed = JSON.parse(row.items);
      return { items: (Array.isArray(parsed) ? parsed : []) as DbCartItem[] };
    } catch (err) {
      console.error("Failed to read cart from db", err);
      return { items: [] as DbCartItem[] };
    }
  });

export const syncDbCart = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        cartId: z.string().min(5).max(100),
        items: z.array(itemSchema),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    try {
      const db = getDb();
      const stmt = db.prepare(`
        INSERT INTO carts (id, items, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET items = excluded.items, updated_at = excluded.updated_at
      `);
      stmt.run(data.cartId, JSON.stringify(data.items), Date.now());
      return { ok: true };
    } catch (err) {
      console.error("Failed to sync cart to db", err);
      return { ok: false };
    }
  });

export const clearDbCart = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ cartId: z.string().min(5).max(100) }).parse(input))
  .handler(async ({ data }) => {
    try {
      const db = getDb();
      db.prepare("DELETE FROM carts WHERE id = ?").run(data.cartId);
      return { ok: true };
    } catch (err) {
      console.error("Failed to clear cart in db", err);
      return { ok: false };
    }
  });
