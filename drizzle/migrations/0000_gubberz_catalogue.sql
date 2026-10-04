CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  blurb text,
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published categories" ON public.categories FOR SELECT TO anon, authenticated USING (published);

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  sku text NOT NULL UNIQUE,
  brand text,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  short_description text,
  description text,
  price integer NOT NULL CHECK (price >= 0),
  sale_price integer CHECK (sale_price >= 0),
  cost integer,
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  low_stock_threshold integer NOT NULL DEFAULT 3,
  images text[] NOT NULL DEFAULT '{}',
  specs jsonb NOT NULL DEFAULT '{}'::jsonb,
  features text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published products" ON public.products FOR SELECT TO anon, authenticated USING (published);
REVOKE SELECT (cost) ON public.products FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER products_touch BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.store_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL
);
GRANT SELECT ON public.store_settings TO anon, authenticated;
GRANT ALL ON public.store_settings TO service_role;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads settings" ON public.store_settings FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.store_settings (key, value) VALUES
 ('advance_payment_discount_percent', '5'),
 ('whatsapp_number', '"923000000000"'),
 ('delivery_fee', '250');

INSERT INTO public.categories (name, slug, blurb, sort_order) VALUES
 ('Audio','audio','Things that go in, on or near your ears.',1),
 ('Power','power','Chargers and power banks. Juice, basically.',2),
 ('Desk','desk','Keyboards, mice and desk things.',3),
 ('Cables','cables','The spaghetti of modern life.',4);

INSERT INTO public.products (name, slug, sku, brand, category_id, short_description, description, price, sale_price, stock, images, specs, features, tags, featured) VALUES
('Hush Pro Headphones','hush-pro-headphones','GBZ-AUD-001','Gubberz Audio',(SELECT id FROM public.categories WHERE slug='audio'),'Over-ear, noise cancelling, 40h battery','Big soft cushions, serious noise cancelling and a battery that outlasts your attention span.',18999,15999,12,ARRAY['headphones'],'{"Battery":"40 hours","Connection":"Bluetooth 5.3","Weight":"250 g","Charging":"USB-C"}',ARRAY['Active noise cancelling','40-hour battery','Fold-flat design','Multipoint pairing'],ARRAY['wireless','anc'],true),
('Pebble Buds','pebble-buds','GBZ-AUD-002','Gubberz Audio',(SELECT id FROM public.categories WHERE slug='audio'),'True wireless earbuds, pocket-sized case','Tiny buds, tiny case, surprisingly big sound.',7499,NULL,30,ARRAY['earbuds'],'{"Battery":"6h + 24h case","Connection":"Bluetooth 5.3","Water resistance":"IPX4"}',ARRAY['Touch controls','IPX4 sweat resistant','Low-latency mode'],ARRAY['wireless'],true),
('Boombox Mini Speaker','boombox-mini-speaker','GBZ-AUD-003','Loudish',(SELECT id FROM public.categories WHERE slug='audio'),'Portable speaker, 12h, splash proof','Small enough for a backpack, loud enough to annoy the neighbours.',9999,8499,2,ARRAY['speaker'],'{"Battery":"12 hours","Output":"10 W","Water resistance":"IPX6"}',ARRAY['Splash proof','Stereo pairing','Built-in mic'],ARRAY['portable'],true),
('Zap 65W Charger','zap-65w-charger','GBZ-PWR-001','Zap',(SELECT id FROM public.categories WHERE slug='power'),'GaN, 3 ports, charges laptops','One charger for your laptop, phone and earbuds at the same time.',5999,NULL,25,ARRAY['charger'],'{"Output":"65 W max","Ports":"2x USB-C, 1x USB-A","Tech":"GaN"}',ARRAY['GaN — runs cool','Foldable pins','Laptop capable'],ARRAY['gan','usb-c'],false),
('Brick 20K Power Bank','brick-20k-power-bank','GBZ-PWR-002','Zap',(SELECT id FROM public.categories WHERE slug='power'),'20,000 mAh, 22.5W fast charge','Charges your phone about four times. Heavier than a sandwich, lighter than regret.',6499,5499,0,ARRAY['powerbank'],'{"Capacity":"20,000 mAh","Output":"22.5 W","Ports":"USB-C, 2x USB-A"}',ARRAY['Fast charge','LED level display','Charges 3 devices'],ARRAY['portable'],false),
('Clack 75 Keyboard','clack-75-keyboard','GBZ-DSK-001','Clack',(SELECT id FROM public.categories WHERE slug='desk'),'75% mechanical, hot-swap, wireless','Satisfying thock. Swappable switches. Makes emails feel important.',16999,NULL,8,ARRAY['keyboard'],'{"Layout":"75%","Switches":"Hot-swap, linear","Connection":"Bluetooth / 2.4G / USB-C"}',ARRAY['Hot-swappable switches','Tri-mode wireless','Gasket mount'],ARRAY['mechanical'],true),
('Glide Mouse','glide-mouse','GBZ-DSK-002','Clack',(SELECT id FROM public.categories WHERE slug='desk'),'Silent clicks, 70 days battery','A quiet little mouse that just gets on with it.',3499,2999,40,ARRAY['mouse'],'{"DPI":"800–4000","Battery":"70 days","Connection":"Bluetooth / 2.4G"}',ARRAY['Silent clicks','Multi-device','Ergonomic shape'],ARRAY['wireless'],false),
('Noodle USB-C Cable','noodle-usb-c-cable','GBZ-CBL-001','Noodle',(SELECT id FROM public.categories WHERE slug='cables'),'Braided, 100W, 2 metres','A cable that refuses to fray. 100W, so it handles laptops too.',1499,NULL,100,ARRAY['cable'],'{"Length":"2 m","Power":"100 W","Data":"480 Mbps"}',ARRAY['Braided nylon','100W PD','Tangle resistant'],ARRAY['usb-c'],false);