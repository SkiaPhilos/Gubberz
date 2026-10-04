-- ==============================================================================
-- GUBBERZ STORAGE BUCKETS & RLS POLICIES (SUPABASE-COMPLIANT)
-- ==============================================================================
-- 1. Create or configure 'product-images' (PUBLIC bucket)
-- 2. Create or configure 'payment-proofs' (PRIVATE bucket)
-- 3. Set up Row Level Security (RLS) policies on storage.objects
-- Note: Do NOT execute ALTER TABLE on storage.objects as Supabase manages RLS.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. BUCKETS INITIALIZATION
-- ------------------------------------------------------------------------------

-- Product Images: Public bucket for storefront catalog images & marketing assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true, -- PUBLIC: URLs are accessible to anyone
  5242880, -- 5 MB max per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- Payment Proofs: Private bucket for customer payment verification screenshots
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'payment-proofs',
  'payment-proofs',
  false, -- PRIVATE: Bank transfer receipts must not be publicly guessable/browsable
  10485760, -- 10 MB max per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];

-- ------------------------------------------------------------------------------
-- 2. POLICIES FOR 'product-images' BUCKET
-- ------------------------------------------------------------------------------
-- Note: For public buckets, image downloads by URL bypass RLS automatically.
-- We omit a public SELECT policy so users cannot list/enumerate entire bucket contents.

-- A. Admin Upload: Admins can upload product images
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  )
);

-- B. Admin Update: Admins can overwrite/update product images
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  )
);

-- C. Admin Delete: Admins can delete product images
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  )
);

-- ------------------------------------------------------------------------------
-- 3. POLICIES FOR 'payment-proofs' BUCKET (PRIVATE)
-- ------------------------------------------------------------------------------

-- A. Upload: Anyone (guest customers during checkout or authenticated users) can upload receipt
DROP POLICY IF EXISTS "Anyone can upload payment proofs" ON storage.objects;
CREATE POLICY "Anyone can upload payment proofs"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'payment-proofs');

-- B. Read: Only authenticated Admins can view/download/sign payment proofs
DROP POLICY IF EXISTS "Admins can read payment proofs" ON storage.objects;
CREATE POLICY "Admins can read payment proofs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'payment-proofs'
  AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  )
);
