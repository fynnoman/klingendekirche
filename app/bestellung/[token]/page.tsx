import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import OrderCancelButton from "./OrderCancelButton";
import { getEventById, getOrderByToken } from "@/lib/tickets/queries";
import { formatEUR, formatEventDate } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ihre Bestellung" };

const STATUS_LABEL: Record<string, string> = {
  pending: "Noch nicht bezahlt",
  paid: "Bezahlt",
  cancelled: "Storniert",
  refunded: "Storniert, Geld erstattet",
  failed: "Zahlung fehlgeschlagen",
  expired: "Checkout abgelaufen"
};

export default async function OrderPortalPage({
  params
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const order = await getOrderByToken(token).catch(() => null);
  if (!order) notFound();

  const event = await getEventById(order.event_id).catch(() => null);
  const canCancel = order.status === "paid" || order.status === "pending";
  const isActive = order.status === "paid" || order.status === "pending";

  return (
    <>
      <PageHero
        eyebrow={`Bestellnummer ${order.id}`}
        title="Ihre Bestellung"
        subtitle={
          isActive
            ? "Hier sehen Sie Ihre Konzertkarten und können bei Bedarf stornieren."
            : "Übersicht Ihrer Bestellung."
        }
      />

      <section className="py-14">
        <div className="container-rail">
          <div className="rounded-3xl border border-royal-700/10 bg-white p-8 shadow-plate sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                  Status
                </div>
                <div
                  className={`mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-medium ${
                    order.status === "paid"
                      ? "bg-emerald-50 text-emerald-700"
                      : order.status === "pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {STATUS_LABEL[order.status] ?? order.status}
                </div>
              </div>
            </div>

            {event && (
              <h2 className="display mt-6 text-3xl text-royal-800 sm:text-4xl">
                {event.title_de}
              </h2>
            )}

            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-royal-700/10 bg-royal-700/10 sm:grid-cols-2">
              {event && (
                <>
                  <div className="bg-white px-5 py-4">
                    <dt className="text-[10px] uppercase tracking-wider text-gold-600">
                      Datum
                    </dt>
                    <dd className="mt-1 text-sm text-royal-800">
                      {formatEventDate(event.date, "de")}
                      {event.time ? ` · ${event.time}` : ""}
                    </dd>
                  </div>
                  <div className="bg-white px-5 py-4">
                    <dt className="text-[10px] uppercase tracking-wider text-gold-600">
                      Ort
                    </dt>
                    <dd className="mt-1 text-sm text-royal-800">{event.venue_de}</dd>
                  </div>
                </>
              )}
              <div className="bg-white px-5 py-4">
                <dt className="text-[10px] uppercase tracking-wider text-gold-600">
                  Karten
                </dt>
                <dd className="mt-1 text-sm text-royal-800">{order.quantity}</dd>
              </div>
              <div className="bg-white px-5 py-4">
                <dt className="text-[10px] uppercase tracking-wider text-gold-600">
                  Betrag
                </dt>
                <dd className="mt-1 text-sm text-royal-800">
                  {formatEUR(order.amount_cents, "de")}
                </dd>
              </div>
              <div className="bg-white px-5 py-4">
                <dt className="text-[10px] uppercase tracking-wider text-gold-600">
                  Besteller
                </dt>
                <dd className="mt-1 text-sm text-royal-800">
                  {order.buyer_name}
                  <br />
                  <span className="text-neutral-500">{order.buyer_email}</span>
                </dd>
              </div>
              <div className="bg-white px-5 py-4">
                <dt className="text-[10px] uppercase tracking-wider text-gold-600">
                  Bestelldatum
                </dt>
                <dd className="mt-1 text-sm text-royal-800">
                  {new Date(order.created_at).toLocaleString("de-DE")}
                </dd>
              </div>
            </dl>

            {canCancel ? (
              <div className="mt-8 rounded-2xl border border-royal-700/10 bg-cream-100/70 p-5">
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                  Stornierung
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-700">
                  {order.status === "paid"
                    ? "Sie können Ihre Bestellung bis 24 Stunden vor Konzertbeginn stornieren. Der Betrag wird dann auf die ursprüngliche Zahlungsmethode erstattet."
                    : "Ihre Bestellung ist noch nicht bezahlt. Sie können sie jederzeit abbrechen."}
                </p>
                <div className="mt-4">
                  <OrderCancelButton token={order.token} />
                </div>
              </div>
            ) : (
              <p className="mt-6 text-[13px] text-neutral-500">
                Diese Bestellung ist abgeschlossen und kann nicht mehr verändert
                werden.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
