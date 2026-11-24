-- Phase 7: Content-Management für News, Galerien, Partner, Vorstand, Mitglieder,
-- Site-Einstellungen und Freitext-Blöcke. Idempotent.

-- ---------------------------------------------------------------------------
-- Site-Einstellungen (Kontakt, Adresse, Bank) als JSONB Key-Value
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- News-Artikel
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Galerien / Beiträge (Rich-Content-Post mit mehreren Bildern)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Partner-Logos
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Vorstand
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Mitglieder-Listen (neue + verstorbene, pro Jahr)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS members_list (
  id SERIAL PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('new', 'deceased')),
  year INTEGER NOT NULL,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_members_kind_year ON members_list(kind, year DESC, sort_order);

-- ---------------------------------------------------------------------------
-- Freitext-Blöcke pro Seite (Startseite, Verein, Orgel, Kirche)
-- Key-Beispiele: "home.intro", "verein.history", "orgel.intro", "kirche.intro"
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS page_blocks (
  key TEXT PRIMARY KEY,
  body_de TEXT NOT NULL DEFAULT '',
  body_en TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
