import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { EVENTS } from "@/lib/data";

export default function HomePage() {
  const featured = EVENTS[0];
  const upcoming = EVENTS.slice(1);

  return (
    <>
      {/* 1. Featured concert at the very top */}
      <section className="relative overflow-hidden bg-cream-50">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(900px 500px at 15% -5%, rgba(197,159,74,.14), transparent 60%), radial-gradient(900px 500px at 100% 10%, rgba(31,59,130,.12), transparent 60%)"
            }}
          />
        </div>

        <div className="container-xl pt-10 pb-16 sm:pt-16 sm:pb-24">
          <FadeIn>
            <div className="eyebrow">Nächstes Konzert</div>
          </FadeIn>

          {featured && (
            <FadeIn>
              <article className="mt-6 grid overflow-hidden rounded-[32px] border border-royal-700/10 bg-white shadow-plate md:grid-cols-12">
                <div className="relative min-h-[320px] md:col-span-6 md:min-h-[520px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1465225314224-587cd83d322b?auto=format&fit=crop&w=1800&q=80')"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-royal-900/40 via-transparent to-transparent" />
                  <div className="absolute left-7 top-7 flex flex-col items-center rounded-2xl bg-royal-800 px-5 py-4 text-center text-cream-50 shadow-plate">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gold-200">
                      {new Date(featured.date).toLocaleDateString("de-DE", {
                        month: "short"
                      }).replace(".", "")}
                    </div>
                    <div className="display text-4xl text-cream-50">
                      {new Date(featured.date)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}
                    </div>
                    {featured.time && (
                      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cream-50/70">
                        {featured.time.replace(" Uhr", "")}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 md:col-span-6 md:p-14">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em]">
                    <span className="text-gold-600">{featured.category}</span>
                    <span className="text-neutral-400">· {featured.dateLabel}</span>
                  </div>
                  <h1 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
                    {featured.title}
                  </h1>
                  {featured.subtitle && (
                    <p className="mt-3 text-lg italic text-neutral-600">
                      {featured.subtitle}
                    </p>
                  )}
                  <p className="mt-5 text-[15px] leading-relaxed text-neutral-700">
                    {featured.description}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link
                      href={featured.ticket ?? "/kontakt"}
                      className="btn-primary text-base px-7 py-3.5"
                    >
                      Karten bestellen
                    </Link>
                    <Link
                      href="/verein"
                      className="btn-ghost text-base px-7 py-3.5"
                    >
                      Über uns
                    </Link>
                  </div>
                  <div className="mt-6 text-sm text-neutral-500">{featured.venue}</div>
                </div>
              </article>
            </FadeIn>
          )}
        </div>
      </section>

      {/* 2. Upcoming events strip */}
      {upcoming.length > 0 && (
        <section className="border-t border-royal-700/10 bg-white">
          <div className="container-xl py-12 sm:py-16">
            <FadeIn>
              <div className="flex flex-col items-start justify-between gap-4 border-b border-royal-700/10 pb-6 sm:flex-row sm:items-end">
                <h2 className="display text-2xl text-royal-800 sm:text-3xl">
                  Kommende Veranstaltungen
                </h2>
                <Link
                  href="/termine"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-royal-700 hover:text-gold-600"
                >
                  Alle Termine →
                </Link>
              </div>
            </FadeIn>

            <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-0 sm:px-0">
              {upcoming.map((e) => (
                <Link
                  key={e.id}
                  href={`/termine#${e.id}`}
                  className="group relative flex min-w-[280px] max-w-[320px] flex-1 shrink-0 snap-start flex-col rounded-2xl border border-royal-700/10 bg-cream-50 p-6 transition hover:border-gold-300 hover:shadow-card sm:min-w-[300px]"
                >
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]">
                    <span className="text-gold-600">{e.category}</span>
                  </div>
                  <div className="display mt-3 text-xl leading-snug text-royal-800">
                    {e.title}
                  </div>
                  {e.subtitle && (
                    <div className="mt-1 text-sm italic text-neutral-600 line-clamp-2">
                      {e.subtitle}
                    </div>
                  )}
                  <div className="mt-5 border-t border-royal-700/10 pt-4 text-[13px] text-neutral-700">
                    {e.dateLabel}
                    {e.time && <span className="text-neutral-500"> · {e.time}</span>}
                  </div>
                  <span className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-royal-700 transition group-hover:text-gold-600">
                    Details →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Organ feature - central element, links to /orgel */}
      <section className="border-t border-royal-700/10 bg-cream-100/60">
        <div className="container-xl py-16 sm:py-24">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5">
              <Link
                href="/orgel"
                className="group relative block overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-plate"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/orgel/mayer-orgel-lisdorf.png"
                    alt="MAYER-Orgel in der Pfarrkirche St. Crispinus und Crispinianus Lisdorf"
                    fill
                    className="object-cover transition duration-[1200ms] group-hover:scale-[1.02]"
                    sizes="(min-width: 768px) 40vw, 100vw"
                    priority
                  />
                </div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.1} className="md:col-span-7">
              <div className="eyebrow">MAYER-Orgel · Lisdorf</div>
              <h2 className="display mt-5 text-4xl leading-[1.05] text-royal-800 sm:text-5xl md:text-6xl">
                Das Herzstück
                <br />
                <span className="italic">unseres Vereins.</span>
              </h2>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-700">
                Die große MAYER-Orgel der Pfarrkirche St. Crispinus und Crispinianus
                ist das klingende Zentrum unserer Arbeit. Erfahren Sie mehr über das
                Instrument, die Erweiterung um den Gregoriusbass 32′ und seine
                Geschichte.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/orgel" className="btn-primary">
                  Zur Orgel
                </Link>
                <Link href="/verein" className="btn-ghost">
                  Über den Verein
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Mitgliedschaft block - prominent */}
      <section className="border-t border-royal-700/10 bg-white">
        <div className="container-xl py-16 sm:py-20">
          <div className="grid gap-8 md:grid-cols-12">
            <FadeIn className="md:col-span-7">
              <div className="rounded-3xl border border-royal-700/10 bg-royal-800 p-10 text-cream-50 shadow-plate sm:p-14">
                <div className="text-[11px] uppercase tracking-[0.22em] text-gold-200">
                  Mitgliedschaft
                </div>
                <h2 className="display mt-4 text-3xl text-cream-50 sm:text-4xl md:text-5xl">
                  Werden Sie Teil
                  <br />
                  <span className="italic text-gold-200">der Klingenden Kirche.</span>
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream-50/85">
                  Unser Verein lebt von 288 Freundinnen und Freunden der Kirchenmusik.
                  Schon ab 2,50 € im Monat tragen Sie die Konzerte, die Orgelakademie
                  und die Pflege der MAYER-Orgel mit.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/mitgliedschaft"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-royal-800 transition hover:bg-gold-300"
                  >
                    Mitglied werden
                  </Link>
                  <a
                    href="/downloads/beitrittserklaerung.pdf"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/25 px-6 py-3 text-sm font-medium text-cream-50 transition hover:bg-white/5"
                  >
                    Beitrittserklärung (PDF)
                  </a>
                </div>
              </div>
            </FadeIn>

            <div className="grid gap-4 md:col-span-5">
              <FadeIn delay={0.05}>
                <Link
                  href="/neue-mitglieder"
                  className="group block h-full rounded-2xl border border-royal-700/10 bg-cream-50 p-7 transition hover:border-gold-300 hover:shadow-card"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                    2026
                  </div>
                  <div className="display mt-3 text-2xl text-royal-800">
                    Neue Mitglieder
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    Wir begrüßen alle Menschen, die 2026 Teil unseres Vereins wurden.
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.18em] text-royal-700 group-hover:text-gold-600">
                    Ansehen →
                  </span>
                </Link>
              </FadeIn>

              <FadeIn delay={0.1}>
                <Link
                  href="/nachruf"
                  className="group block h-full rounded-2xl border border-royal-700/10 bg-cream-50 p-7 transition hover:border-gold-300 hover:shadow-card"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                    In Gedenken
                  </div>
                  <div className="display mt-3 text-2xl text-royal-800">Nachruf</div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    Wir gedenken unserer verstorbenen Vereinsmitglieder.
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.18em] text-royal-700 group-hover:text-gold-600">
                    Ansehen →
                  </span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
