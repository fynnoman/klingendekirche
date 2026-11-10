import Link from "next/link";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import EventCard from "@/components/EventCard";
import PartnersStrip from "@/components/PartnersStrip";
import { Ornament, OrnamentDouble } from "@/components/Ornament";
import { EVENTS, NEWS, GALLERIES, ORGAN_FACTS } from "@/lib/data";

export default function HomePage() {
  const featured = EVENTS[0];
  const upcoming = EVENTS.slice(1, 4);
  const latestNews = NEWS.slice(0, 3);
  const featuredGalleries = GALLERIES.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Welcome plate */}
      <section className="relative">
        <div className="container-xl -mt-24 sm:-mt-32">
          <FadeIn>
            <div
              className="relative overflow-hidden rounded-[32px] border border-royal-700/10 bg-white p-10 shadow-plate sm:p-20"
              style={{
                backgroundImage:
                  "radial-gradient(500px 400px at 100% 0%, rgba(197,159,74,.12), transparent 65%), radial-gradient(500px 400px at 0% 100%, rgba(31,59,130,.08), transparent 65%)"
              }}
            >

              <div className="relative grid gap-14 md:grid-cols-12 md:gap-20">
                <div className="md:col-span-7">
                  <div className="eyebrow">Herzlich willkommen</div>
                  <h2 className="display mt-6 text-4xl sm:text-5xl md:text-6xl">
                    Ein Verein. Eine Orgel.
                    <br />
                    <span className="italic">Eine lebendige Kirchenmusik.</span>
                  </h2>
                  <p className="mt-8 text-lg leading-relaxed text-neutral-700">
                    Der Förderverein Klingende Kirche wurde 1993 als Nachfolgeinstitution des
                    Lisdorfer Orgelbauvereins gegründet. Zehn Jahre zuvor hatten sich 230
                    Interessierte zusammengeschlossen, um ein neues hochkarätiges Orgelinstrument
                    für die Pfarrkirche „Crispinus und Crispinianus" zu finanzieren.
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-neutral-700">
                    Heute steht die Klingende Kirche mit ihren 275 Mitgliedern für anspruchsvolle
                    Kirchenmusik und grenzüberschreitenden Austausch. Herzlich laden wir Sie ein,
                    unsere Konzerte zu besuchen und die Musik mit Familie und Freunden zu erleben.
                  </p>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link href="/" className="btn-primary text-base px-7 py-3.5">
                      Mehr über den Verein
                    </Link>
                    <Link href="/" className="btn-ghost text-base px-7 py-3.5">
                      Mitglied werden
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-royal-700/10 shadow-plate">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=80')"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 via-royal-900/0 to-transparent" />
                    <div className="absolute inset-x-7 bottom-7 text-cream-50">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-gold-200">
                        MAYER-Orgel · Lisdorf
                      </div>
                      <div className="display mt-2 text-3xl">
                        Eine Orgel mit neuer Tiefe
                      </div>
                      <div className="mt-2 text-sm text-cream-50/85">
                        Seit 2026 erweitert um das Gregoriusbass 32′-Register
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured event theater */}
      <section className="py-28 sm:py-36">
        <div className="container-xl">
          <FadeIn>
            <div className="flex flex-col items-start justify-between gap-6 border-b border-royal-700/10 pb-10 sm:flex-row sm:items-end">
              <div>
                <div className="eyebrow">Im Mittelpunkt</div>
                <h2 className="display mt-5 text-5xl sm:text-6xl md:text-7xl">
                  Nächstes Konzert
                </h2>
              </div>
              <Link href="/" className="btn-ghost text-base px-7 py-3.5">
                Alle Termine →
              </Link>
            </div>
          </FadeIn>

          {featured && (
            <FadeIn>
              <article className="mt-14 grid overflow-hidden rounded-[32px] border border-royal-700/10 bg-white shadow-plate md:grid-cols-12">
                <div className="relative aspect-[4/3] md:col-span-6 md:aspect-auto md:min-h-[520px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1465225314224-587cd83d322b?auto=format&fit=crop&w=1800&q=80')"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-royal-900/40 via-transparent to-transparent" />
                  <div className="absolute left-7 top-7 flex flex-col items-center rounded-2xl bg-royal-800 px-5 py-4 text-center text-cream-50 shadow-plate">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gold-200">Dez</div>
                    <div className="display text-4xl text-cream-50">07</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-cream-50/70">
                      17:00
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-10 md:col-span-6 md:p-16">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em]">
                    <span className="text-gold-600">{featured.category}</span>
                    <span className="text-neutral-400">· {featured.dateLabel}</span>
                  </div>
                  <h3 className="display mt-5 text-4xl sm:text-5xl">{featured.title}</h3>
                  <p className="mt-4 text-lg italic text-neutral-600">{featured.subtitle}</p>
                  <p className="mt-6 text-base leading-relaxed text-neutral-700">
                    {featured.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      href="/"
                      className="btn-primary text-base px-7 py-3.5"
                    >
                      Karten bestellen
                    </Link>
                    <div className="text-sm text-neutral-500">{featured.venue}</div>
                  </div>
                </div>
              </article>
            </FadeIn>
          )}

          {/* Upcoming grid */}
          <div className="mt-20">
            <FadeIn>
              <div className="mb-10 flex items-end justify-between border-b border-royal-700/10 pb-6">
                <h3 className="display text-3xl text-royal-800 sm:text-4xl">
                  Weitere Termine
                </h3>
              </div>
            </FadeIn>
            <div className="grid items-stretch gap-6 md:grid-cols-3">
              {upcoming.map((e, i) => (
                <FadeIn key={e.id} delay={i * 0.08} className="h-full">
                  <EventCard e={e} layout="vertical" />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organ feature */}
      <section className="relative overflow-hidden bg-royal-800 text-cream-50">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1465225314224-587cd83d322b?auto=format&fit=crop&w=2400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-royal-800 via-royal-800/95 to-royal-700/70" />

        <div className="relative container-xl py-28 sm:py-40">
          <div className="grid items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="eyebrow !text-gold-300">MAYER-Orgel</div>
              <h2 className="display mt-6 text-5xl sm:text-6xl md:text-7xl text-cream-50">
                Ein neues Fundament
                <br />
                <span className="italic text-gold-200">für einen alten Klang.</span>
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream-50/90">
                Mit der Einweihung des Gregoriusbass 32′-Registers im Oktober 2026 hat die
                Lisdorfer Orgel eine neue klangliche Dimension gewonnen. Der tiefe Grundton trägt
                das gesamte Pleno und öffnet die Pforten für Werke, die bislang nur in großen
                Kathedralen zu hören waren.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-base font-medium text-royal-800 shadow-card transition hover:bg-gold-300"
                >
                  Zur Orgel
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/25 px-7 py-3.5 text-base font-medium text-cream-50 transition hover:bg-white/5"
                >
                  Zur Spendenaktion
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-cream-50/10 ring-1 ring-cream-50/10">
                {ORGAN_FACTS.map((f) => (
                  <div key={f.label} className="bg-royal-800 px-6 py-7">
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold-200">
                      {f.label}
                    </dt>
                    <dd className="mt-2 text-lg text-cream-50">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Pius quote - full theater */}
      <section className="py-28 sm:py-40">
        <div className="container-rail">
          <FadeIn>
            <div className="flex justify-center">
              <OrnamentDouble />
            </div>
            <blockquote className="mt-12 text-center">
              <p className="display text-3xl italic leading-[1.2] text-royal-800 sm:text-5xl md:text-6xl">
                „Die Kirchenmusik hat auch die Aufgabe der Verkündigung.
                <br />
                Sie hat daher apostolische Bedeutung."
              </p>
              <footer className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-gold-700">
                Pius XII. · Enzyklika zur Kirchenmusik, 25. Dezember 1955
              </footer>
            </blockquote>
            <div className="mt-12 flex justify-center">
              <OrnamentDouble />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* News */}
      <section className="pb-28 sm:pb-36">
        <div className="container-xl">
          <FadeIn>
            <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-royal-700/10 pb-10 sm:flex-row sm:items-end">
              <div>
                <div className="eyebrow">Aktuelles</div>
                <h2 className="display mt-5 text-5xl sm:text-6xl md:text-7xl">
                  Neues aus dem Verein
                </h2>
              </div>
              <Link href="/" className="btn-ghost text-base px-7 py-3.5">
                Alle Meldungen →
              </Link>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3">
            {latestNews.map((n, i) => (
              <FadeIn key={n.id} delay={i * 0.08}>
                <article className="group flex h-full flex-col rounded-3xl border border-royal-700/10 bg-white p-8 shadow-card transition hover:border-gold-300 hover:shadow-plate sm:p-10">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
                    <span className="text-gold-600">{n.category}</span>
                    <span className="text-neutral-400">· {n.dateLabel}</span>
                  </div>
                  <h3 className="display mt-5 text-2xl leading-snug text-royal-800 sm:text-3xl">
                    {n.title}
                  </h3>
                  <p className="mt-5 line-clamp-4 flex-1 text-base leading-relaxed text-neutral-700">
                    {n.excerpt}
                  </p>
                  <Link
                    href="/"
                    className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-royal-700 transition group-hover:text-gold-600"
                  >
                    Weiter lesen →
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery theater - 4 column feature */}
      <section className="pb-32">
        <div className="container-xl">
          <FadeIn>
            <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-royal-700/10 pb-10 sm:flex-row sm:items-end">
              <div>
                <div className="eyebrow">Galerien</div>
                <h2 className="display mt-5 text-5xl sm:text-6xl md:text-7xl">
                  Momente aus unserem Programm
                </h2>
              </div>
              <Link href="/" className="btn-ghost text-base px-7 py-3.5">
                Alle Galerien →
              </Link>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-12">
            {/* big card */}
            <FadeIn className="md:col-span-7">
              <Link
                href="/"
                className="group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-royal-700/10 shadow-plate md:aspect-[5/4]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-105"
                  style={{ backgroundImage: `url('${featuredGalleries[0].cover}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-900/80 via-royal-900/15 to-transparent" />
                <div className="absolute inset-x-8 bottom-8 text-cream-50">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-200">
                    {featuredGalleries[0].dateLabel}
                  </div>
                  <div className="display mt-3 text-3xl sm:text-4xl">
                    {featuredGalleries[0].title}
                  </div>
                  <div className="mt-2 max-w-md text-sm text-cream-50/85">
                    {featuredGalleries[0].subtitle}
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* right column with 3 small */}
            <div className="grid gap-6 md:col-span-5">
              {featuredGalleries.slice(1, 4).map((g, i) => (
                <FadeIn key={g.id} delay={(i + 1) * 0.08}>
                  <Link
                    href="/"
                    className="group relative grid aspect-[3/2] overflow-hidden rounded-3xl border border-royal-700/10 shadow-card md:aspect-auto md:min-h-[158px]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-105"
                      style={{ backgroundImage: `url('${g.cover}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-royal-900/70 via-royal-900/20 to-transparent" />
                    <div className="relative z-10 flex flex-col justify-end p-6 text-cream-50">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-200">
                        {g.dateLabel}
                      </div>
                      <div className="display mt-2 text-lg leading-snug">{g.title}</div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}
