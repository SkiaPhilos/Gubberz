CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TYPE public.home_section_type AS ENUM ('hero', 'product_story', 'product_edit', 'category_index', 'product_rail', 'campaign', 'character', 'service_notes');

CREATE TABLE public.home_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type public.home_section_type NOT NULL,
  eyebrow text,
  title text NOT NULL,
  body text,
  media_key text,
  character_key text,
  product_slugs text[] NOT NULL DEFAULT '{}',
  category_slugs text[] NOT NULL DEFAULT '{}',
  cta_label text,
  cta_href text,
  theme text NOT NULL DEFAULT 'paper',
  layout text NOT NULL DEFAULT 'standard',
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.home_sections TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.home_sections TO authenticated;
GRANT ALL ON public.home_sections TO service_role;
ALTER TABLE public.home_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active home sections" ON public.home_sections
FOR SELECT TO anon, authenticated
USING (published AND (starts_at IS NULL OR starts_at <= now()) AND (ends_at IS NULL OR ends_at > now()));
CREATE POLICY "Admins read all home sections" ON public.home_sections
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create home sections" ON public.home_sections
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update home sections" ON public.home_sections
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete home sections" ON public.home_sections
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER home_sections_touch BEFORE UPDATE ON public.home_sections FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  headline text NOT NULL,
  body text,
  image text,
  product_slugs text[] NOT NULL DEFAULT '{}',
  badge text,
  cta_label text,
  cta_href text,
  active boolean NOT NULL DEFAULT false,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.campaigns TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.campaigns TO authenticated;
GRANT ALL ON public.campaigns TO service_role;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active campaigns" ON public.campaigns
FOR SELECT TO anon, authenticated
USING (active AND (starts_at IS NULL OR starts_at <= now()) AND (ends_at IS NULL OR ends_at > now()));
CREATE POLICY "Admins read all campaigns" ON public.campaigns
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create campaigns" ON public.campaigns
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update campaigns" ON public.campaigns
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete campaigns" ON public.campaigns
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER campaigns_touch BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.inventory_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  delta integer NOT NULL CHECK (delta <> 0),
  reason text NOT NULL,
  changed_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.inventory_movements TO authenticated;
GRANT ALL ON public.inventory_movements TO service_role;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read inventory movements" ON public.inventory_movements
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create inventory movements" ON public.inventory_movements
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') AND auth.uid() = changed_by);

CREATE TABLE public.order_status_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  from_status text,
  to_status text NOT NULL,
  note text,
  changed_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.order_status_events TO authenticated;
GRANT ALL ON public.order_status_events TO service_role;
ALTER TABLE public.order_status_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read order status events" ON public.order_status_events
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create order status events" ON public.order_status_events
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') AND auth.uid() = changed_by);

CREATE POLICY "Admins read all categories" ON public.categories
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create categories" ON public.categories
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update categories" ON public.categories
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete categories" ON public.categories
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;

CREATE POLICY "Admins read all products" ON public.products
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create products" ON public.products
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update products" ON public.products
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete products" ON public.products
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT SELECT (cost) ON public.products TO authenticated;

CREATE POLICY "Admins read all settings" ON public.store_settings
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create settings" ON public.store_settings
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update settings" ON public.store_settings
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
GRANT INSERT, UPDATE ON public.store_settings TO authenticated;

GRANT SELECT, UPDATE ON public.orders TO authenticated;
GRANT SELECT ON public.order_items TO authenticated;
CREATE POLICY "Admins read orders" ON public.orders
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update orders" ON public.orders
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read order items" ON public.order_items
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.adjust_inventory(p_product_id uuid, p_delta integer, p_reason text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_stock integer;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  IF p_delta = 0 OR coalesce(trim(p_reason), '') = '' THEN RAISE EXCEPTION 'Invalid adjustment'; END IF;
  UPDATE public.products SET stock = stock + p_delta
  WHERE id = p_product_id AND stock + p_delta >= 0
  RETURNING stock INTO v_stock;
  IF v_stock IS NULL THEN RAISE EXCEPTION 'Invalid stock adjustment'; END IF;
  INSERT INTO public.inventory_movements(product_id, delta, reason, changed_by)
  VALUES (p_product_id, p_delta, left(trim(p_reason), 200), auth.uid());
  RETURN v_stock;
END
$$;
GRANT EXECUTE ON FUNCTION public.adjust_inventory(uuid, integer, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.set_order_status(p_order_id uuid, p_status text, p_note text DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_old text;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  IF p_status NOT IN ('placed','payment_verification','confirmed','packed','shipped','delivered','cancelled') THEN RAISE EXCEPTION 'Invalid status'; END IF;
  SELECT status INTO v_old FROM public.orders WHERE id = p_order_id FOR UPDATE;
  IF v_old IS NULL THEN RAISE EXCEPTION 'Order not found'; END IF;
  UPDATE public.orders SET status = p_status WHERE id = p_order_id;
  INSERT INTO public.order_status_events(order_id, from_status, to_status, note, changed_by)
  VALUES (p_order_id, v_old, p_status, nullif(left(trim(coalesce(p_note,'')),500),''), auth.uid());
  RETURN p_status;
END
$$;
GRANT EXECUTE ON FUNCTION public.set_order_status(uuid, text, text) TO authenticated;