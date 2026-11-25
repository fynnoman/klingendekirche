import { sql } from "@/lib/db/client";
import type {
  EventInput,
  EventRow,
  OrderRow,
  OrderStatus
} from "./types";

type Row = Record<string, unknown>;

// Neon liefert date/timestamp-Spalten als JS-Date-Objekte. Für die Serialisierung
// ins JSX und über Server→Client Boundaries normieren wir sie zu Strings.
function toIsoDate(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "string") return v.slice(0, 10);
  return "";
}
function toIsoTimestamp(v: unknown): string | null {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string" && v) return v;
  return null;
}

function mapEventRow(r: Row): EventRow {
  return {
    ...(r as unknown as EventRow),
    date: toIsoDate(r.date),
    created_at: toIsoTimestamp(r.created_at) ?? "",
    updated_at: toIsoTimestamp(r.updated_at) ?? ""
  };
}

function mapOrderRow(r: Row): OrderRow {
  return {
    ...(r as unknown as OrderRow),
    created_at: toIsoTimestamp(r.created_at) ?? "",
    paid_at: toIsoTimestamp(r.paid_at),
    cancelled_at: toIsoTimestamp(r.cancelled_at),
    checked_in_at: toIsoTimestamp(r.checked_in_at)
  };
}

// ---------------------------------------------------------------------------
// events
// ---------------------------------------------------------------------------

export async function listAllEvents(): Promise<EventRow[]> {
  const q = sql();
  const rows = (await q`SELECT * FROM events ORDER BY date ASC`) as Row[];
  return rows.map(mapEventRow);
}

/**
 * Für die öffentliche Website: alle Konzerte ab heute, nicht archiviert.
 * Sortiert nach Datum aufsteigend.
 */
export async function listUpcomingEvents(): Promise<EventRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM events
    WHERE archived = FALSE
      AND date >= CURRENT_DATE
    ORDER BY date ASC, time ASC NULLS LAST
  `) as Row[];
  return rows.map(mapEventRow);
}

/**
 * Für den Archiv-Bereich: alle Konzerte vor heute, auch wenn archiviert.
 * Jüngste zuerst.
 */
export async function listPastEvents(): Promise<EventRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM events
    WHERE date < CURRENT_DATE
    ORDER BY date DESC, time DESC NULLS LAST
  `) as Row[];
  return rows.map(mapEventRow);
}

/** Das nächste Konzert für den Hero. Highlight hat Vorrang. */
export async function getNextFeaturedEvent(): Promise<EventRow | null> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM events
    WHERE archived = FALSE
      AND date >= CURRENT_DATE
    ORDER BY highlight DESC, date ASC
    LIMIT 1
  `) as Row[];
  return rows[0] ? mapEventRow(rows[0]) : null;
}

export async function getEventById(id: string): Promise<EventRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM events WHERE id = ${id} LIMIT 1`) as Row[];
  return rows[0] ? mapEventRow(rows[0]) : null;
}

export async function insertEvent(id: string, input: EventInput): Promise<EventRow> {
  const q = sql();
  const rows = (await q`
    INSERT INTO events (
      id, title_de, title_en, subtitle_de, subtitle_en,
      date, time, venue_de, venue_en, description_de, description_en,
      category, image_url, price_cents, price_reduced_cents,
      capacity, sale_active, highlight,
      archived, created_at, updated_at
    ) VALUES (
      ${id}, ${input.title_de}, ${input.title_en ?? null},
      ${input.subtitle_de ?? null}, ${input.subtitle_en ?? null},
      ${input.date}, ${input.time ?? null},
      ${input.venue_de}, ${input.venue_en ?? null},
      ${input.description_de}, ${input.description_en ?? null},
      ${input.category}, ${input.image_url ?? null},
      ${input.price_cents}, ${input.price_reduced_cents ?? null},
      ${input.capacity},
      ${input.sale_active}, ${input.highlight},
      ${input.archived ?? false}, NOW(), NOW()
    )
    RETURNING *
  `) as Row[];
  return mapEventRow(rows[0]);
}

export async function updateEvent(id: string, input: EventInput): Promise<EventRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE events SET
      title_de = ${input.title_de},
      title_en = ${input.title_en ?? null},
      subtitle_de = ${input.subtitle_de ?? null},
      subtitle_en = ${input.subtitle_en ?? null},
      date = ${input.date},
      time = ${input.time ?? null},
      venue_de = ${input.venue_de},
      venue_en = ${input.venue_en ?? null},
      description_de = ${input.description_de},
      description_en = ${input.description_en ?? null},
      category = ${input.category},
      image_url = ${input.image_url ?? null},
      price_cents = ${input.price_cents},
      price_reduced_cents = ${input.price_reduced_cents ?? null},
      capacity = ${input.capacity},
      sale_active = ${input.sale_active},
      highlight = ${input.highlight},
      archived = ${input.archived ?? false},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `) as Row[];
  return rows[0] ? mapEventRow(rows[0]) : null;
}

export async function setEventStripeIds(
  id: string,
  productId: string | null,
  priceId: string | null,
  priceReducedId: string | null
): Promise<void> {
  const q = sql();
  await q`
    UPDATE events
    SET stripe_product_id = ${productId},
        stripe_price_id = ${priceId},
        stripe_price_reduced_id = ${priceReducedId},
        updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function setEventArchived(id: string, archived: boolean): Promise<void> {
  const q = sql();
  await q`UPDATE events SET archived = ${archived}, updated_at = NOW() WHERE id = ${id}`;
}

/**
 * Atomar N Plätze reservieren. Gibt null zurück, wenn nicht genug Plätze
 * verfügbar sind oder der Verkauf inaktiv ist.
 */
export async function reserveSeats(
  eventId: string,
  quantity: number
): Promise<EventRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE events
    SET seats_sold = seats_sold + ${quantity}, updated_at = NOW()
    WHERE id = ${eventId}
      AND archived = FALSE
      AND sale_active = TRUE
      AND seats_sold + ${quantity} <= capacity
    RETURNING *
  `) as Row[];
  return rows[0] ? mapEventRow(rows[0]) : null;
}

export async function releaseSeats(
  eventId: string,
  quantity: number
): Promise<void> {
  const q = sql();
  await q`
    UPDATE events
    SET seats_sold = GREATEST(seats_sold - ${quantity}, 0), updated_at = NOW()
    WHERE id = ${eventId}
  `;
}

// ---------------------------------------------------------------------------
// orders
// ---------------------------------------------------------------------------

export async function insertOrder(order: {
  id: string;
  token: string;
  eventId: string;
  buyerName: string;
  buyerEmail: string | null;
  buyerStreet: string | null;
  buyerPostalCode: string | null;
  buyerCity: string | null;
  buyerPhone: string | null;
  quantity: number;
  quantityReduced?: number;
  amountCents: number;
  currency?: string;
  status: OrderStatus;
  stripeSessionId?: string | null;
}): Promise<void> {
  const q = sql();
  await q`
    INSERT INTO orders (
      id, token, event_id, buyer_name, buyer_email,
      buyer_street, buyer_postal_code, buyer_city, buyer_phone,
      quantity, quantity_reduced,
      amount_cents, currency, status, stripe_session_id
    ) VALUES (
      ${order.id}, ${order.token}, ${order.eventId},
      ${order.buyerName}, ${order.buyerEmail},
      ${order.buyerStreet}, ${order.buyerPostalCode}, ${order.buyerCity}, ${order.buyerPhone},
      ${order.quantity}, ${order.quantityReduced ?? 0},
      ${order.amountCents}, ${order.currency ?? "eur"}, ${order.status}, ${order.stripeSessionId ?? null}
    )
  `;
}

export async function markOrderPaid(input: {
  stripeSessionId: string;
  paymentIntentId: string | null;
  chargeId: string | null;
}): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE orders
    SET status = 'paid',
        paid_at = NOW(),
        stripe_payment_intent_id = COALESCE(${input.paymentIntentId}, stripe_payment_intent_id),
        stripe_charge_id = COALESCE(${input.chargeId}, stripe_charge_id)
    WHERE stripe_session_id = ${input.stripeSessionId}
      AND status IN ('pending','failed')
    RETURNING *
  `) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

/**
 * Admin markiert eine offene Bestellung manuell als bezahlt (Zahlungseingang
 * per Überweisung). Keine Stripe-Interaktion.
 */
export async function markOrderPaidManual(orderId: string): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE orders
    SET status = 'paid',
        paid_at = COALESCE(paid_at, NOW())
    WHERE id = ${orderId}
      AND status IN ('pending','failed')
    RETURNING *
  `) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

export async function markOrderExpired(stripeSessionId: string): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE orders
    SET status = 'expired'
    WHERE stripe_session_id = ${stripeSessionId}
      AND status = 'pending'
    RETURNING *
  `) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

export async function markOrderCancelled(input: {
  orderId: string;
  refundId?: string | null;
}): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE orders
    SET status = CASE WHEN status = 'paid' THEN 'refunded' ELSE 'cancelled' END,
        cancelled_at = NOW(),
        stripe_refund_id = COALESCE(${input.refundId ?? null}, stripe_refund_id)
    WHERE id = ${input.orderId}
      AND status IN ('pending','paid')
    RETURNING *
  `) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

export async function getOrderByToken(token: string): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM orders WHERE token = ${token} LIMIT 1`) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

export async function getOrderById(id: string): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM orders WHERE id = ${id} LIMIT 1`) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

export async function getOrderBySession(session: string): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM orders WHERE stripe_session_id = ${session} LIMIT 1`) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

export async function listPaidOrdersForEvent(eventId: string): Promise<OrderRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM orders
    WHERE event_id = ${eventId}
      AND status = 'paid'
    ORDER BY buyer_name ASC
  `) as Row[];
  return rows.map(mapOrderRow);
}

export async function updateOrderBuyer(input: {
  orderId: string;
  buyerName: string;
  buyerEmail: string | null;
  buyerStreet?: string | null;
  buyerPostalCode?: string | null;
  buyerCity?: string | null;
  buyerPhone?: string | null;
}): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE orders
    SET buyer_name = ${input.buyerName},
        buyer_email = ${input.buyerEmail},
        buyer_street = COALESCE(${input.buyerStreet ?? null}, buyer_street),
        buyer_postal_code = COALESCE(${input.buyerPostalCode ?? null}, buyer_postal_code),
        buyer_city = COALESCE(${input.buyerCity ?? null}, buyer_city),
        buyer_phone = COALESCE(${input.buyerPhone ?? null}, buyer_phone)
    WHERE id = ${input.orderId}
    RETURNING *
  `) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

export async function updateOrderNote(input: {
  orderId: string;
  note: string | null;
}): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE orders
    SET note = ${input.note}
    WHERE id = ${input.orderId}
    RETURNING *
  `) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

/**
 * Setzt wie viele der gebuchten Karten einer Order eingescannt wurden.
 * 0 löscht den Einlass, > 0 stempelt checked_in_at.
 */
export async function setOrderCheckedIn(input: {
  orderId: string;
  count: number;
}): Promise<OrderRow | null> {
  const q = sql();
  const count = Math.max(0, Math.round(input.count));
  if (count === 0) {
    const rows = (await q`
      UPDATE orders
      SET checked_in_count = 0, checked_in_at = NULL
      WHERE id = ${input.orderId}
      RETURNING *
    `) as Row[];
    return rows[0] ? mapOrderRow(rows[0]) : null;
  }
  const rows = (await q`
    UPDATE orders
    SET checked_in_count = LEAST(${count}, quantity),
        checked_in_at = COALESCE(checked_in_at, NOW())
    WHERE id = ${input.orderId}
    RETURNING *
  `) as Row[];
  return rows[0] ? mapOrderRow(rows[0]) : null;
}

export async function listOrders(options: {
  limit?: number;
  status?: OrderStatus;
  eventId?: string;
} = {}): Promise<OrderRow[]> {
  const q = sql();
  const limit = Math.min(options.limit ?? 200, 500);

  let rows: Row[];
  if (options.status && options.eventId) {
    rows = (await q`
      SELECT * FROM orders
      WHERE status = ${options.status} AND event_id = ${options.eventId}
      ORDER BY created_at DESC LIMIT ${limit}
    `) as Row[];
  } else if (options.status) {
    rows = (await q`
      SELECT * FROM orders
      WHERE status = ${options.status}
      ORDER BY created_at DESC LIMIT ${limit}
    `) as Row[];
  } else if (options.eventId) {
    rows = (await q`
      SELECT * FROM orders
      WHERE event_id = ${options.eventId}
      ORDER BY created_at DESC LIMIT ${limit}
    `) as Row[];
  } else {
    rows = (await q`
      SELECT * FROM orders
      ORDER BY created_at DESC LIMIT ${limit}
    `) as Row[];
  }
  return rows.map(mapOrderRow);
}

export async function countStats(): Promise<{
  total: number;
  paid: number;
  cancelled: number;
  refunded: number;
  pending: number;
  gross_cents: number;
}> {
  const q = sql();
  const rows = (await q`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'paid')::int AS paid,
      COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled,
      COUNT(*) FILTER (WHERE status = 'refunded')::int AS refunded,
      COUNT(*) FILTER (WHERE status = 'pending')::int AS pending,
      COALESCE(SUM(amount_cents) FILTER (WHERE status IN ('paid','refunded')), 0)::int AS gross_cents
    FROM orders
  `) as Row[];
  return rows[0] as unknown as {
    total: number;
    paid: number;
    cancelled: number;
    refunded: number;
    pending: number;
    gross_cents: number;
  };
}
