-- Phase 6A: Einlass-Spalten für orders (idempotent)
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS checked_in_at TIMESTAMPTZ;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS checked_in_count INTEGER NOT NULL DEFAULT 0;
