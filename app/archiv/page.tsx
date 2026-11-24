import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { listPastEvents } from "@/lib/tickets/queries";
import { formatEventDate } from "@/lib/tickets/types";
import type { EventRow } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Archiv" };

export default async function ArchivPage() {
  const events: EventRow[] = await listPastEvents().catch(() => []);

  // Nach Jahr gruppieren
  const byYear = new Map<number, EventRow[]>();
  for (const e of events) {
    const y = Number(e.date.slice(0, 4));
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(e);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <>
      <PageHero
        eyebrow="Chronik"
        title="Archiv"
        subtitle="Alle vergangenen Konzerte, Vespern und Veranstaltungen des Fördervereins."
      />

      <section className="py-16">
        <div className="container-wide">
          {events.length === 0 ? (
            <FadeIn>
              <p className="text-neutral-600">
                Noch keine vergangenen Veranstaltungen im Archiv.
              </p>
            </FadeIn>
          ) : (
            <>
              <FadeIn>
                <div className="mb-10 flex flex-wrap gap-2">
                  {years.map((y) => (
                    <a
                      key={y}
                      href={`#jahr-${y}`}
                      className="rounded-full border border-royal-700/15 bg-white px-4 py-1.5 text-sm font-medium text-royal-800 transition hover:border-gold-300 hover:bg-gold-50"
                    >
                      {y}
                    </a>
                  ))}
                </div>
              </FadeIn>

              <div className="space-y-20">
                {years.map((year) => {
                  const list = byYear.get(year) ?? [];
                  return (
                    <section key={year} id={`jahr-${year}`}>
                      <FadeIn>
                        <div className="flex items-end gap-4 border-b border-royal-700/10 pb-4">
                          <h2 className="headline text-4xl font-medium text-royal-800 sm:text-5xl">
                            {year}
                          </h2>
                          <div className="mb-1 text-sm italic text-neutral-500">
                            {list.length}{" "}
                            {list.length === 1 ? "Veranstaltung" : "Veranstaltungen"}
                          </div>
                        </div>
                      </FadeIn>

                      <ol className="mt-8 space-y-4">
                        {list.map((e, i) => (
                          <FadeIn key={e.id} delay={(i % 6) * 0.04}>
                            <li className="grid grid-cols-[88px_1fr] gap-5 border-b border-royal-700/10 pb-4 sm:grid-cols-[140px_1fr]">
                              <time className="headline text-sm font-medium text-gold-700 sm:text-base">
                                {formatEventDate(e.date, "de")}
                              </time>
                              <div>
                                <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                                  {e.category}
                                  {e.time ? ` · ${e.time}` : ""}
                                </div>
                                <div className="headline mt-1 text-lg font-medium text-royal-800">
                                  {e.title_de}
                                </div>
                                {e.subtitle_de && (
                                  <p className="mt-1 text-sm italic text-neutral-600">
                                    {e.subtitle_de}
                                  </p>
                                )}
                                <p className="mt-1 text-[13px] text-neutral-700">
                                  {e.venue_de}
                                </p>
                              </div>
                            </li>
                          </FadeIn>
                        ))}
                      </ol>
                    </section>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
