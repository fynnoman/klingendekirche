-- Phase 6B: Optionaler ermäßigter Preis pro Konzert (idempotent)
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS price_reduced_cents INTEGER;

ALTER TABLE events
  ADD COLUMN IF NOT EXISTS stripe_price_reduced_id TEXT;

-- Orders bekommen eine zusätzliche Mengen-Spalte. `quantity` bleibt die Gesamtmenge
-- (regulär + ermäßigt), `quantity_reduced` gibt an, wie viele davon ermäßigt sind.
-- Bestehende Bestellungen haben quantity_reduced = 0 und bleiben damit wie bisher.
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS quantity_reduced INTEGER NOT NULL DEFAULT 0;
