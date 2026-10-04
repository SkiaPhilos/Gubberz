CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE DEFAULT upper(substr(md5(random()::text), 1, 8)),
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text NOT NULL,
  city text NOT NULL,
  notes text,
  payment_method text NOT NULL,
  payment_proof text,
  status text NOT NULL DEFAULT 'placed',
  subtotal integer NOT NULL,
  discount integer NOT NULL DEFAULT 0,
  delivery_fee integer NOT NULL DEFAULT 0,
  total integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id),
  name text NOT NULL,
  image text,
  unit_price integer NOT NULL,
  qty integer NOT NULL CHECK (qty > 0)
);
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.place_order(p_customer jsonb, p_items jsonb, p_method text, p_proof text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_item jsonb; v_prod record; v_qty int; v_price int; v_sub int := 0; v_disc int := 0; v_fee int; v_pct numeric;
  v_order public.orders;
BEGIN
  IF p_method NOT IN ('cod','jazzcash','nayapay') THEN RAISE EXCEPTION 'Invalid payment method'; END IF;
  IF jsonb_array_length(p_items) = 0 OR jsonb_array_length(p_items) > 50 THEN RAISE EXCEPTION 'Cart is empty'; END IF;
  IF p_method <> 'cod' AND coalesce(p_proof,'') = '' THEN RAISE EXCEPTION 'Payment proof required'; END IF;
  IF coalesce(trim(p_customer->>'name'),'') = '' OR coalesce(trim(p_customer->>'phone'),'') = ''
     OR coalesce(trim(p_customer->>'address'),'') = '' OR coalesce(trim(p_customer->>'city'),'') = '' THEN
    RAISE EXCEPTION 'Missing delivery details'; END IF;

  SELECT (value#>>'{}')::int INTO v_fee FROM store_settings WHERE key='delivery_fee';
  SELECT (value#>>'{}')::numeric INTO v_pct FROM store_settings WHERE key='advance_payment_discount_percent';
  v_fee := coalesce(v_fee, 250); v_pct := coalesce(v_pct, 5);

  INSERT INTO orders(customer_name, phone, email, address, city, notes, payment_method, payment_proof, status, subtotal, total, delivery_fee)
  VALUES (left(p_customer->>'name',120), left(p_customer->>'phone',30), nullif(left(p_customer->>'email',200),''),
          left(p_customer->>'address',500), left(p_customer->>'city',80), nullif(left(p_customer->>'notes',500),''),
          p_method, p_proof, CASE WHEN p_method='cod' THEN 'placed' ELSE 'payment_verification' END, 0, 0, v_fee)
  RETURNING * INTO v_order;

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_qty := (v_item->>'qty')::int;
    IF v_qty IS NULL OR v_qty < 1 THEN RAISE EXCEPTION 'Invalid quantity'; END IF;
    SELECT * INTO v_prod FROM products WHERE id = (v_item->>'id')::uuid AND published FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'A product is no longer available'; END IF;
    IF v_prod.stock < v_qty THEN RAISE EXCEPTION 'Only % left of %', v_prod.stock, v_prod.name; END IF;
    v_price := CASE WHEN v_prod.sale_price IS NOT NULL AND v_prod.sale_price < v_prod.price THEN v_prod.sale_price ELSE v_prod.price END;
    UPDATE products SET stock = stock - v_qty WHERE id = v_prod.id;
    INSERT INTO order_items(order_id, product_id, name, image, unit_price, qty)
    VALUES (v_order.id, v_prod.id, v_prod.name, v_prod.images[1], v_price, v_qty);
    v_sub := v_sub + v_qty * v_price;
  END LOOP;

  IF p_method <> 'cod' THEN v_disc := round(v_sub * v_pct / 100); END IF;
  UPDATE orders SET subtotal = v_sub, discount = v_disc, total = v_sub - v_disc + v_fee WHERE id = v_order.id;
  RETURN jsonb_build_object('code', v_order.code);
END $$;
REVOKE ALL ON FUNCTION public.place_order(jsonb,jsonb,text,text) FROM public;
GRANT EXECUTE ON FUNCTION public.place_order(jsonb,jsonb,text,text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.lookup_order(p_code text, p_phone text)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT jsonb_build_object(
    'code', o.code, 'status', o.status, 'customer_name', o.customer_name, 'city', o.city,
    'payment_method', o.payment_method, 'subtotal', o.subtotal, 'discount', o.discount,
    'delivery_fee', o.delivery_fee, 'total', o.total, 'created_at', o.created_at,
    'items', coalesce((SELECT jsonb_agg(jsonb_build_object('name', i.name, 'image', i.image, 'unit_price', i.unit_price, 'qty', i.qty)) FROM order_items i WHERE i.order_id = o.id), '[]'::jsonb))
  FROM orders o
  WHERE o.code = upper(trim(p_code))
    AND length(regexp_replace(p_phone, '\D', '', 'g')) >= 10
    AND right(regexp_replace(o.phone, '\D', '', 'g'), 10) = right(regexp_replace(p_phone, '\D', '', 'g'), 10)
$$;
REVOKE ALL ON FUNCTION public.lookup_order(text,text) FROM public;
GRANT EXECUTE ON FUNCTION public.lookup_order(text,text) TO anon, authenticated;

CREATE POLICY "Anyone can upload payment proofs" ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'payment-proofs');