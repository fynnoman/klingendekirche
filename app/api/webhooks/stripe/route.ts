import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import {
  getOrderBySession,
  getOrderById,
  getEventById,
  markOrderExpired,
  markOrderPaid,
  markOrderCancelled,
  releaseSeats
} from "@/lib/tickets/queries";
import { sendTicketConfirmation } from "@/lib/tickets/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function eventMetaFor(eventId: string) {
  const e = await getEventById(eventId).catch(() => null);
  if (!e) return null;
  return {
    title: e.title_de,
    dateLabel: e.date,
    time: e.time,
    venue: e.venue_de
  };
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ ok: false, error: "no_signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  const raw = await req.text();
  try {
    event = stripe().webhooks.constructEvent(raw, sig, STRIPE_WEBHOOK_SECRET());
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[webhook] invalid signature", msg);
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status !== "paid") break;

        const paymentIntentId =
          typeof session.payment_intent === "string" ? session.payment_intent : null;

        let chargeId: string | null = null;
        if (paymentIntentId) {
          try {
            const pi = await stripe().paymentIntents.retrieve(paymentIntentId, {
              expand: ["latest_charge"]
            });
            const latest = pi.latest_charge as Stripe.Charge | string | null;
            if (typeof latest === "object" && latest !== null) {
              chargeId = latest.id;
            } else if (typeof latest === "string") {
              chargeId = latest;
            }
          } catch (err) {
            console.warn("[webhook] could not expand charge", err);
          }
        }

        const updated = await markOrderPaid({
          stripeSessionId: session.id,
          paymentIntentId,
          chargeId
        });

        if (updated) {
          const meta = await eventMetaFor(updated.event_id);
          if (meta) {
            await sendTicketConfirmation(updated, meta).catch((err) =>
              console.error("[webhook] mail failed", err)
            );
          }
        }
        break;
      }

      case "checkout.session.expired":
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const order =
          (await getOrderBySession(session.id).catch(() => null)) ?? null;
        if (order && order.status === "pending") {
          await markOrderExpired(session.id).catch(() => undefined);
          await releaseSeats(order.event_id, order.quantity).catch(() => undefined);
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const orderId = charge.metadata?.order_id;
        if (!orderId) break;
        const current = await getOrderById(orderId).catch(() => null);
        if (!current) break;
        if (current.status === "paid") {
          await markOrderCancelled({
            orderId: current.id,
            refundId:
              charge.refunds?.data?.[0]?.id ?? current.stripe_refund_id ?? null
          });
          await releaseSeats(current.event_id, current.quantity).catch(() => undefined);
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[webhook] handler error", event.type, err);
    return NextResponse.json({ ok: false, error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, received: true });
}
