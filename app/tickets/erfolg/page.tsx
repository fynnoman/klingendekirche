import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getEventById, getOrderByToken } from "@/lib/tickets/queries";
import { formatEUR, formatEventDate } from "@/lib/tickets/types";
import { SITE } from "@/lib/data";

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

  const reference = order && event
    ? `${order.id} · ${event.title_de}`.slice(0, 140)
    : order?.id ?? "";

  return (
    <>
      <PageHero
        eyebrow="Bestellung aufgenommen"
        title="Vielen Dank."
        subtitle="Wir haben Ihre Bestellung erhalten. Mit dem Zahlungseingang ist Ihr Platz verbindlich reserviert."
      />

      <section className="py-14">
        <div className="container-rail">
          <div className="rounded-3xl border border-royal-700/10 bg-white p-8 shadow-plate sm:p-10">
            {!order ? (
              <p className="text-[15px] leading-relaxed text-neutral-700">
                Wir konnten Ihre Bestellung nicht öffnen. Prüfen Sie bitte Ihr
                E-Mail-Postfach, dort finden Sie die vollständige Bestätigung
                mit allen Angaben zur Überweisung.
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
                    Ihre Zahlung Ihrer Bestellung zuordnen können. Ihre Karten
                    liegen am Konzertabend an der Abendkasse auf Ihren Namen
                    bereit.
                  </p>
                </div>

                <p className="mt-8 text-[14px] leading-relaxed text-neutral-700">
                  Eine Bestätigung mit allen Angaben wurde zusätzlich an{" "}
                  <span className="font-medium text-royal-800">
                    {order.buyer_email}
                  </span>{" "}
                  verschickt.
                </p>

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
