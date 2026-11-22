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
  capacity        INTEGER NOT NULL DEFAULT 0,
  seats_sold      INTEGER NOT NULL DEFAULT 0,
  sale_active     BOOLEAN NOT NULL DEFAULT FALSE,
  highlight       BOOLEAN NOT NULL DEFAULT FALSE,
  archived        BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_product_id TEXT,
  stripe_price_id   TEXT,
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
