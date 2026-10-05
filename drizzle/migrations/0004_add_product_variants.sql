-- ==============================================================================
-- 0004_add_product_variants.sql
-- Add variants column to products table
-- ==============================================================================

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS variants jsonb DEFAULT '[]'::jsonb;
