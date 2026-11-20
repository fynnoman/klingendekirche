import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import TicketBuyForm from "./TicketBuyForm";
import { EVENTS } from "@/lib/data";
import { getTicketEvent } from "@/lib/tickets/queries";
import { l } from "@/lib/i18n";
import { formatEUR } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = EVENTS.find((e) => e.id === eventId);
  if (!event) return { title: "Konzertkarten" };
  return { title: `Karten · ${l(event.title, "de")}` };
}

export default async function TicketBuyPage({
  params
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = EVENTS.find((e) => e.id === eventId);
  if (!event) notFound();

  let ticketEvent;
  let error: string | null = null;
  try {
    ticketEvent = await getTicketEvent(eventId);
  } catch (err) {
    error = "db_not_ready";
    console.error("[ticket page] db error", err);
  }

  const soldOut =
    ticketEvent !== null &&
    ticketEvent !== undefined &&
    ticketEvent.seats_sold >= ticketEvent.capacity;
  const available = ticketEvent ? ticketEvent.capacity - ticketEvent.seats_sold : 0;

  return (
    <>
      <PageHero
        eyebrow={l(event.dateLabel, "de")}
        title={l(event.title, "de")}
        subtitle={event.subtitle ? l(event.subtitle, "de") : undefined}
      />

      <section className="py-14">
        <div className="container-rail">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="rounded-3xl border border-royal-700/10 bg-white p-8 shadow-plate sm:p-10">
                {error ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-[14px] text-amber-900">
                    Der Ticket-Verkauf ist aktuell nicht konfiguriert. Bitte melden
                    Sie sich direkt unter{" "}
                    <a
                      href="mailto:info@klingende-kirche.de"
                      className="underline underline-offset-2"
                    >
                      info@klingende-kirche.de
                    </a>
                    .
                    <div className="mt-2 text-[11px] uppercase tracking-wider text-amber-700">
                      Admin: DATABASE_URL in der Umgebung setzen und schema.sql
                      ausführen.
                    </div>
                  </div>
                ) : !ticketEvent ? (
                  <div className="rounded-xl border border-royal-700/10 bg-cream-100/60 p-5 text-[14px] text-royal-800">
                    Für dieses Konzert ist der Ticketverkauf noch nicht freigegeben.
                    <br />
                    Karten an der Abendkasse oder per Mail unter{" "}
                    <a
                      href="mailto:info@klingende-kirche.de"
                      className="underline underline-offset-2"
                    >
                      info@klingende-kirche.de
                    </a>
                    .
                  </div>
                ) : !ticketEvent.active ? (
                  <div className="rounded-xl border border-royal-700/10 bg-cream-100/60 p-5 text-[14px] text-royal-800">
                    Der Online-Verkauf für dieses Konzert ist derzeit deaktiviert.
                    Karten erhalten Sie an der Abendkasse.
                  </div>
                ) : soldOut ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-[14px] text-amber-900">
                    Dieses Konzert ist ausverkauft.
                  </div>
                ) : (
                  <TicketBuyForm
                    eventId={eventId}
                    priceCents={ticketEvent.price_cents}
                    availableSeats={available}
                  />
                )}
              </div>

              <p className="mt-4 text-[12px] leading-relaxed text-neutral-500">
                Zahlung sicher über Stripe (Kreditkarte, Apple Pay, Google Pay).
                Nach erfolgreicher Zahlung erhalten Sie sofort eine Bestätigung
                per E-Mail.
              </p>
            </div>

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
                      {l(event.dateLabel, "de")}
                      {event.time ? ` · ${l(event.time, "de")}` : ""}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-neutral-500">
                      Ort
                    </dt>
                    <dd className="text-royal-800">{l(event.venue, "de")}</dd>
                  </div>
                  {ticketEvent && ticketEvent.active && !soldOut && (
                    <>
                      <div>
                        <dt className="text-[11px] uppercase tracking-wider text-neutral-500">
                          Preis pro Karte
                        </dt>
                        <dd className="text-royal-800">
                          {formatEUR(ticketEvent.price_cents, "de")}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-wider text-neutral-500">
                          Verfügbar
                        </dt>
                        <dd className="text-royal-800">
                          {available} von {ticketEvent.capacity} Plätzen
                        </dd>
                      </div>
                    </>
                  )}
                </dl>

                <p className="mt-6 text-[13px] leading-relaxed text-neutral-700">
                  {l(event.description, "de")}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
