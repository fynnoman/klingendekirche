-- Phase 7A: Besteller-Adresse + Telefon für Ticketversand per Post.
-- E-Mail ist jetzt optional. Idempotent.

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS buyer_street TEXT;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS buyer_postal_code TEXT;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS buyer_city TEXT;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS buyer_phone TEXT;

ALTER TABLE orders
  ALTER COLUMN buyer_email DROP NOT NULL;
