import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import TicketBuyForm from "./TicketBuyForm";
import { getEventById } from "@/lib/tickets/queries";
import { formatEUR, formatEventDate } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = await getEventById(eventId).catch(() => null);
  if (!event) return { title: "Konzertkarten" };
  return { title: `Karten · ${event.title_de}` };
}

export default async function TicketBuyPage({
  params
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  let event;
  let dbError: string | null = null;
  try {
    event = await getEventById(eventId);
  } catch (err) {
    dbError = err instanceof Error ? err.message : String(err);
  }

  if (!event && !dbError) notFound();

  const saleOpen =
    !!event && !event.archived && event.sale_active && event.price_cents > 0 && event.capacity > 0;
  const soldOut =
    !!event && event.capacity > 0 && event.seats_sold >= event.capacity;
  const available = event ? event.capacity - event.seats_sold : 0;

  return (
    <>
      <PageHero
        eyebrow={event ? formatEventDate(event.date, "de") : "Konzertkarten"}
        title={event ? event.title_de : "Konzertkarten"}
        subtitle={event?.subtitle_de ?? undefined}
      />

      <section className="py-14">
        <div className="container-rail">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="rounded-3xl border border-royal-700/10 bg-white p-8 shadow-plate sm:p-10">
                {dbError ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-[14px] text-amber-900">
                    Der Ticket-Verkauf ist aktuell nicht erreichbar. Bitte melden
                    Sie sich direkt unter{" "}
                    <a
                      href="mailto:info@klingende-kirche.de"
                      className="underline underline-offset-2"
                    >
                      info@klingende-kirche.de
                    </a>
                    .
                  </div>
                ) : !event ? null : !saleOpen ? (
                  <div className="rounded-xl border border-royal-700/10 bg-cream-100/60 p-5 text-[14px] text-royal-800">
                    Für dieses Konzert ist derzeit kein Online-Verkauf aktiv.
                    Karten an der Abendkasse oder per Mail unter{" "}
                    <a
                      href="mailto:info@klingende-kirche.de"
                      className="underline underline-offset-2"
                    >
                      info@klingende-kirche.de
                    </a>
                    .
                  </div>
                ) : soldOut ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-[14px] text-amber-900">
                    Dieses Konzert ist ausverkauft.
                  </div>
                ) : (
                  <TicketBuyForm
                    eventId={event.id}
                    eventTitle={event.title_de}
                    priceCents={event.price_cents}
                    priceReducedCents={event.price_reduced_cents}
                    availableSeats={available}
                  />
                )}
              </div>

              <p className="mt-4 text-[12px] leading-relaxed text-neutral-500">
                Nach Ihrer Bestellung sehen Sie unsere Bankdaten mit dem
                Verwendungszweck. Mit dem Zahlungseingang ist Ihr Platz
                verbindlich reserviert; die Karten werden Ihnen anschließend
                per Post an die angegebene Adresse zugesandt.
              </p>
            </div>

            {event && (
              <aside className="md:col-span-2">
                <div className="rounded-3xl border border-royal-700/10 bg-cream-100/60 p-7">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-600">
                    Konzertdaten
                  </div>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-neutral-500">
                        Datum
                      </dt>
                      <dd className="text-royal-800">
                        {formatEventDate(event.date, "de")}
                        {event.time ? ` · ${event.time}` : ""}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-wider text-neutral-500">
                        Ort
                      </dt>
                      <dd className="text-royal-800">{event.venue_de}</dd>
                    </div>
                    {saleOpen && !soldOut && (
                      <>
                        <div>
                          <dt className="text-[11px] uppercase tracking-wider text-neutral-500">
                            Preis pro Karte
                          </dt>
                          <dd className="text-royal-800">
                            {formatEUR(event.price_cents, "de")}
                            {event.price_reduced_cents &&
                              event.price_reduced_cents > 0 && (
                                <div className="text-[12px] text-neutral-600">
                                  Ermäßigt {formatEUR(event.price_reduced_cents, "de")}
                                </div>
                              )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] uppercase tracking-wider text-neutral-500">
                            Verfügbar
                          </dt>
                          <dd className="text-royal-800">
                            {available} von {event.capacity} Plätzen
                          </dd>
                        </div>
                      </>
                    )}
                  </dl>

                  {event.description_de && (
                    <p className="mt-6 text-[13px] leading-relaxed text-neutral-700">
                      {event.description_de}
                    </p>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
