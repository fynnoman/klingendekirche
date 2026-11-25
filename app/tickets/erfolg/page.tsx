import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getEventById, getOrderByToken } from "@/lib/tickets/queries";
import { formatEUR, formatEventDate } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vielen Dank" };

export default async function TicketSuccessPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  const order = token ? await getOrderByToken(token).catch(() => null) : null;
  const event = order
    ? await getEventById(order.event_id).catch(() => null)
    : null;

  return (
    <>
      <PageHero
        eyebrow="Bestellung aufgenommen"
        title="Vielen Dank."
        subtitle="Wir haben Ihre Bestellung erhalten und prüfen nun den Zahlungseingang."
      />

      <section className="py-14">
        <div className="container-rail">
          <div className="rounded-3xl border border-royal-700/10 bg-white p-8 shadow-plate sm:p-10">
            {!order ? (
              <p className="text-[15px] leading-relaxed text-neutral-700">
                Ihre Bestellung wurde entgegengenommen. Wir prüfen den
                Zahlungseingang und senden Ihnen die Karten anschließend per
                Post zu.
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
                </dl>

                <p className="mt-8 text-[14.5px] leading-relaxed text-neutral-700">
                  Sobald Ihre Überweisung bei uns eingegangen ist, senden wir
                  Ihnen die Karten per Post an{" "}
                  <span className="font-medium text-royal-800">
                    {order.buyer_street}, {order.buyer_postal_code}{" "}
                    {order.buyer_city}
                  </span>
                  .
                </p>

                {order.buyer_email && (
                  <p className="mt-3 text-[13.5px] leading-relaxed text-neutral-600">
                    Eine Bestätigung wurde an{" "}
                    <span className="font-medium text-royal-800">
                      {order.buyer_email}
                    </span>{" "}
                    verschickt.
                  </p>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/termine" className="btn-ghost">
                    Weitere Konzerte ansehen
                  </Link>
                  <Link href="/" className="btn-ghost">
                    Zurück zur Startseite
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
