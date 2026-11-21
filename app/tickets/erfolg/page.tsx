import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  getEventById,
  getOrderBySession,
  getOrderByToken
} from "@/lib/tickets/queries";
import { formatEUR, formatEventDate } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vielen Dank" };

export default async function TicketSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ session_id?: string; token?: string }>;
}) {
  const { session_id, token } = await searchParams;

  let order = null;
  if (token) order = await getOrderByToken(token).catch(() => null);
  if (!order && session_id)
    order = await getOrderBySession(session_id).catch(() => null);

  const event = order ? await getEventById(order.event_id).catch(() => null) : null;

  return (
    <>
      <PageHero
        eyebrow="Zahlung erhalten"
        title="Vielen Dank."
        subtitle="Ihre Bestellung ist bestätigt. Alle Details finden Sie zusätzlich in der Bestätigungs-Mail."
      />

      <section className="py-14">
        <div className="container-rail">
          <div className="rounded-3xl border border-royal-700/10 bg-white p-8 shadow-plate sm:p-10">
            {!order ? (
              <p className="text-[15px] leading-relaxed text-neutral-700">
                Wir konnten Ihre Bestellung noch nicht finden. Das ist normal,
                wenn Sie sehr schnell hierher gelangt sind: Stripe braucht
                wenige Sekunden, um den Zahlungseingang zu melden. Prüfen Sie
                Ihr E-Mail-Postfach, dort landet in Kürze eine Bestätigung mit
                Link zur Bestellübersicht.
              </p>
            ) : (
              <>
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                  Bestellnummer {order.id}
                </div>
                {event && (
                  <h2 className="display mt-3 text-3xl text-royal-800 sm:text-4xl">
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
                        <dd className="mt-1 text-sm text-royal-800">
                          {event.venue_de}
                        </dd>
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
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/bestellung/${order.token}`} className="btn-primary">
                    Bestellung öffnen
                  </Link>
                  <Link href="/termine" className="btn-ghost">
                    Weitere Konzerte
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
