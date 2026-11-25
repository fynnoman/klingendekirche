import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getEventById, getOrderByToken } from "@/lib/tickets/queries";
import { formatEUR, formatEventDate } from "@/lib/tickets/types";
import { SITE } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ihre Bestellung" };

const STATUS_LABEL: Record<string, string> = {
  pending: "Wartet auf Zahlungseingang",
  paid: "Zahlung erhalten",
  cancelled: "Abgesagt",
  refunded: "Abgesagt",
  failed: "Nicht angenommen",
  expired: "Abgelaufen"
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
  const isPending = order.status === "pending";
  const isPaid = order.status === "paid";
  const reference =
    event ? `${order.id} · ${event.title_de}`.slice(0, 140) : order.id;

  return (
    <>
      <PageHero
        eyebrow={`Bestellnummer ${order.id}`}
        title="Ihre Bestellung"
        subtitle={
          isPending
            ? "Mit dem Zahlungseingang ist Ihr Platz verbindlich reserviert."
            : isPaid
              ? "Ihre Zahlung ist bei uns eingegangen. Die Karten liegen an der Abendkasse auf Ihren Namen bereit."
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
                    isPaid
                      ? "bg-emerald-50 text-emerald-700"
                      : isPending
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
                <dd className="mt-1 text-sm text-royal-800">
                  {order.quantity}
                  {order.quantity_reduced > 0 && (
                    <span className="text-neutral-500">
                      {" "}
                      · davon {order.quantity_reduced} ermäßigt
                    </span>
                  )}
                </dd>
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

            {isPending && (
              <div className="mt-10 rounded-2xl border border-royal-700/10 bg-cream-100/70 p-6 sm:p-8">
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                  Bitte überweisen Sie den Betrag an:
                </div>
                <dl className="mt-4 grid gap-3 text-[14px] text-neutral-800 sm:grid-cols-[180px_1fr]">
                  <dt className="text-neutral-500">Kontoinhaber</dt>
                  <dd>{SITE.bank.holder.de}</dd>

                  <dt className="text-neutral-500">IBAN</dt>
                  <dd className="font-mono tracking-wide">{SITE.bank.iban}</dd>

                  <dt className="text-neutral-500">BIC</dt>
                  <dd className="font-mono">{SITE.bank.bic}</dd>

                  <dt className="text-neutral-500">Bank</dt>
                  <dd>{SITE.bank.name}</dd>

                  <dt className="text-neutral-500">Betrag</dt>
                  <dd className="font-medium">
                    {formatEUR(order.amount_cents, "de")}
                  </dd>

                  <dt className="text-neutral-500">Verwendungszweck</dt>
                  <dd className="font-mono text-[13px]">{reference}</dd>
                </dl>
                <p className="mt-5 text-[13px] leading-relaxed text-neutral-600">
                  Bitte geben Sie den Verwendungszweck genau so an, damit wir
                  Ihre Zahlung Ihrer Bestellung zuordnen können.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
