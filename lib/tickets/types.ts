export type EventCategory =
  | "Konzert"
  | "Orgel"
  | "Vortrag"
  | "Chor"
  | "Besonderes";

export type EventRow = {
  id: string;
  title_de: string;
  title_en: string | null;
  subtitle_de: string | null;
  subtitle_en: string | null;
  date: string; // ISO date (YYYY-MM-DD)
  time: string | null;
  venue_de: string;
  venue_en: string | null;
  description_de: string;
  description_en: string | null;
  category: EventCategory;
  image_url: string | null;
  price_cents: number;
  price_reduced_cents: number | null;
  capacity: number;
  seats_sold: number;
  sale_active: boolean;
  highlight: boolean;
  archived: boolean;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  stripe_price_reduced_id: string | null;
  created_at: string;
  updated_at: string;
};

export type EventInput = {
  id?: string; // slug, optional on create (generated from title)
  title_de: string;
  title_en?: string | null;
  subtitle_de?: string | null;
  subtitle_en?: string | null;
  date: string;
  time?: string | null;
  venue_de: string;
  venue_en?: string | null;
  description_de: string;
  description_en?: string | null;
  category: EventCategory;
  image_url?: string | null;
  price_cents: number;
  price_reduced_cents?: number | null;
  capacity: number;
  sale_active: boolean;
  highlight: boolean;
  archived?: boolean;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "cancelled"
  | "refunded"
  | "failed"
  | "expired";

export type OrderRow = {
  id: string;
  token: string;
  event_id: string;
  buyer_name: string;
  buyer_email: string | null;
  buyer_street: string | null;
  buyer_postal_code: string | null;
  buyer_city: string | null;
  buyer_phone: string | null;
  quantity: number;
  quantity_reduced: number;
  amount_cents: number;
  currency: string;
  status: OrderStatus;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  stripe_refund_id: string | null;
  note: string | null;
  created_at: string;
  paid_at: string | null;
  cancelled_at: string | null;
  checked_in_at: string | null;
  checked_in_count: number;
};

export function formatEUR(amountCents: number, lang: "de" | "en" = "de") {
  const value = amountCents / 100;
  return new Intl.NumberFormat(lang === "en" ? "en-GB" : "de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

/** Localized text helper for event fields: DE fallback if EN empty. */
export function eventText(
  de: string | null | undefined,
  en: string | null | undefined,
  lang: "de" | "en"
): string {
  if (lang === "en" && en && en.trim().length > 0) return en;
  return de ?? "";
}

/** Short DE weekday + date label like "So, 07. Dezember 2026" */
export function formatEventDate(dateIso: string, lang: "de" | "en" = "de") {
  const d = new Date(dateIso + "T00:00:00Z");
  if (lang === "en") {
    return d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    });
  }
  return d.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  });
}

/** Simple slugify for generating event ids from titles. */
export function slugifyTitle(input: string): string {
  return input
    .toLowerCase()
    .replace(/[äöüß]/g, (m) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" }[m] || m))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
}
