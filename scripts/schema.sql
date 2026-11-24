-- Klingende Kirche: Ticket-System Schema
-- Einmalig gegen die Neon-DB laufen lassen:
--   node --env-file=.env.local scripts/apply-schema.mjs

-- ---------------------------------------------------------------------------
-- events: alle Konzerte, Vespern, Vorträge – vollständig admin-pflegbar
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id              TEXT PRIMARY KEY,
  title_de        TEXT NOT NULL,
  title_en        TEXT,
  subtitle_de     TEXT,
  subtitle_en     TEXT,
  date            DATE NOT NULL,
  time            TEXT,
  venue_de        TEXT NOT NULL,
  venue_en        TEXT,
  description_de  TEXT NOT NULL DEFAULT '',
  description_en  TEXT,
  category        TEXT NOT NULL DEFAULT 'Konzert'
                    CHECK (category IN ('Konzert','Orgel','Vortrag','Chor','Besonderes')),
  image_url       TEXT,
  price_cents     INTEGER NOT NULL DEFAULT 0,
  price_reduced_cents INTEGER,
  capacity        INTEGER NOT NULL DEFAULT 0,
  seats_sold      INTEGER NOT NULL DEFAULT 0,
  sale_active     BOOLEAN NOT NULL DEFAULT FALSE,
  highlight       BOOLEAN NOT NULL DEFAULT FALSE,
  archived        BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_product_id TEXT,
  stripe_price_id   TEXT,
  stripe_price_reduced_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_archived ON events(archived);
CREATE INDEX IF NOT EXISTS idx_events_sale_active ON events(sale_active);

-- ---------------------------------------------------------------------------
-- orders: eine Zeile pro Ticket-Bestellung
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  event_id TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  quantity_reduced INTEGER NOT NULL DEFAULT 0,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'eur',
  status TEXT NOT NULL CHECK (status IN ('pending','paid','cancelled','refunded','failed','expired')),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  stripe_refund_id TEXT,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  checked_in_at TIMESTAMPTZ,
  checked_in_count INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_orders_token ON orders(token);
CREATE INDEX IF NOT EXISTS idx_orders_event ON orders(event_id);
CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- ---------------------------------------------------------------------------
-- Content-Management (News, Galerien, Partner, Vorstand, Mitglieder, Settings,
-- Freitext-Blöcke). Siehe scripts/migrations/2026-11-24-cms.sql.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  title_de TEXT NOT NULL,
  title_en TEXT,
  excerpt_de TEXT,
  excerpt_en TEXT,
  body_de TEXT NOT NULL DEFAULT '',
  body_en TEXT,
  category_de TEXT,
  category_en TEXT,
  image_url TEXT,
  published_at DATE NOT NULL,
  archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_archived ON news(archived);

CREATE TABLE IF NOT EXISTS galleries (
  id TEXT PRIMARY KEY,
  title_de TEXT NOT NULL,
  title_en TEXT,
  excerpt_de TEXT,
  excerpt_en TEXT,
  body_de TEXT NOT NULL DEFAULT '',
  body_en TEXT,
  cover_url TEXT,
  date DATE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_galleries_sort ON galleries(sort_order, date DESC);

CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  gallery_id TEXT NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption_de TEXT,
  caption_en TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_gallery_images_gallery ON gallery_images(gallery_id, sort_order);

CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name_de TEXT NOT NULL,
  name_en TEXT,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  note_de TEXT,
  note_en TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_partners_sort ON partners(sort_order);

CREATE TABLE IF NOT EXISTS board_members (
  id SERIAL PRIMARY KEY,
  role_de TEXT NOT NULL,
  role_en TEXT,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_board_sort ON board_members(sort_order);

CREATE TABLE IF NOT EXISTS members_list (
  id SERIAL PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('new', 'deceased')),
  year INTEGER NOT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_members_kind_year ON members_list(kind, year DESC, sort_order);

CREATE TABLE IF NOT EXISTS page_blocks (
  key TEXT PRIMARY KEY,
  body_de TEXT NOT NULL DEFAULT '',
  body_en TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
