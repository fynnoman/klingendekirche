import { sql } from "@/lib/db/client";
import type { OrderRow, OrderStatus, TicketEventRow } from "./types";

type Row = Record<string, unknown>;

export async function getAllTicketEvents(): Promise<TicketEventRow[]> {
  const q = sql();
  const rows = (await q`SELECT * FROM ticket_events ORDER BY event_id`) as Row[];
  return rows as unknown as TicketEventRow[];
}

export async function getTicketEvent(
  eventId: string
): Promise<TicketEventRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM ticket_events WHERE event_id = ${eventId} LIMIT 1`) as Row[];
  return (rows[0] as unknown as TicketEventRow) ?? null;
}

export async function upsertTicketEvent(input: {
  eventId: string;
  priceCents: number;
  capacity: number;
  active?: boolean;
}): Promise<void> {
  const q = sql();
  const active = input.active ?? true;
  await q`
    INSERT INTO ticket_events (event_id, price_cents, capacity, active, updated_at)
    VALUES (${input.eventId}, ${input.priceCents}, ${input.capacity}, ${active}, NOW())
    ON CONFLICT (event_id) DO UPDATE SET
      price_cents = EXCLUDED.price_cents,
      capacity = EXCLUDED.capacity,
      active = EXCLUDED.active,
      updated_at = NOW()
  `;
}

export async function setEventActive(eventId: string, active: boolean) {
  const q = sql();
  await q`UPDATE ticket_events SET active = ${active}, updated_at = NOW() WHERE event_id = ${eventId}`;
}

/**
 * Atomically reserves N seats for an event. Returns the updated event row or
 * null if not enough seats are available.
 */
export async function reserveSeats(
  eventId: string,
  quantity: number
): Promise<TicketEventRow | null> {
  const q = sql();
  const rows = (await q`
    UPDATE ticket_events
    SET seats_sold = seats_sold + ${quantity}, updated_at = NOW()
    WHERE event_id = ${eventId}
      AND active = TRUE
      AND seats_sold + ${quantity} <= capacity
    RETURNING *
  `) as Row[];
  return (rows[0] as unknown as TicketEventRow) ?? null;
}

export async function releaseSeats(
  eventId: string,
  quantity: number
): Promise<void> {
  const q = sql();
  await q`
    UPDATE ticket_events
    SET seats_sold = GREATEST(seats_sold - ${quantity}, 0), updated_at = NOW()
    WHERE event_id = ${eventId}
  `;
}

export async function insertOrder(order: {
  id: string;
  token: string;
  eventId: string;
  buyerName: string;
  buyerEmail: string;
  quantity: number;
  amountCents: number;
  currency?: string;
  status: OrderStatus;
  stripeSessionId?: string | null;
}): Promise<void> {
  const q = sql();
  await q`
    INSERT INTO orders (
      id, token, event_id, buyer_name, buyer_email, quantity,
      amount_cents, currency, status, stripe_session_id
    ) VALUES (
      ${order.id}, ${order.token}, ${order.eventId}, ${order.buyerName}, ${order.buyerEmail}, ${order.quantity},
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
  return (rows[0] as unknown as OrderRow) ?? null;
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
  return (rows[0] as unknown as OrderRow) ?? null;
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
  return (rows[0] as unknown as OrderRow) ?? null;
}

export async function getOrderByToken(token: string): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM orders WHERE token = ${token} LIMIT 1`) as Row[];
  return (rows[0] as unknown as OrderRow) ?? null;
}

export async function getOrderById(id: string): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM orders WHERE id = ${id} LIMIT 1`) as Row[];
  return (rows[0] as unknown as OrderRow) ?? null;
}

export async function getOrderBySession(session: string): Promise<OrderRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM orders WHERE stripe_session_id = ${session} LIMIT 1`) as Row[];
  return (rows[0] as unknown as OrderRow) ?? null;
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
  return rows as unknown as OrderRow[];
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
