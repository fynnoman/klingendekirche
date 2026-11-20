export type TicketEventRow = {
  event_id: string;
  price_cents: number;
  capacity: number;
  seats_sold: number;
  active: boolean;
  updated_at: string;
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
  buyer_email: string;
  quantity: number;
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
};

export function formatEUR(amountCents: number, lang: "de" | "en" = "de") {
  const value = amountCents / 100;
  return new Intl.NumberFormat(lang === "en" ? "en-GB" : "de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}
