import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { SITE } from "@/lib/data";

export const metadata = { title: "Mitgliedschaft" };

export default function MitgliedschaftPage() {
  return (
    <>
      <PageHero
        eyebrow={`Mitgliedschaft · ${SITE.members} Mitglieder`}
        title="Mitglied werden"
        subtitle="Werden Sie Botschafterin, werden Sie Botschafter der Klingenden Kirche. Schon ab 2,50 € im Monat tragen Sie unser Programm mit."
      />

      {/* Prominent action row */}
      <section className="pb-6">
        <div className="container-wide">
          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href="/downloads/beitrittserklaerung.pdf"
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-royal-700/15 bg-royal-800 p-6 text-cream-50 shadow-plate transition hover:bg-royal-700"
              >
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-200">
                    Beitrittserklärung
                  </div>
                  <div className="headline mt-1 text-lg">PDF herunterladen</div>
                  <div className="mt-1 text-[12px] text-cream-50/70">
                    Ausfüllen und einsenden
                  </div>
                </div>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="shrink-0 text-gold-200"
                >
                  <path
                    d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <Link
                href="/neue-mitglieder"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-royal-700/15 bg-white p-6 shadow-card transition hover:border-gold-300"
              >
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                    2026
                  </div>
                  <div className="headline mt-1 text-lg text-royal-800">
                    Neue Mitglieder
                  </div>
                  <div className="mt-1 text-[12px] text-neutral-500">
                    Wen wir dieses Jahr begrüßen
                  </div>
                </div>
                <span className="text-xl text-royal-700 group-hover:text-gold-600">
                  →
                </span>
              </Link>

              <Link
                href="/nachruf"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-royal-700/15 bg-white p-6 shadow-card transition hover:border-gold-300"
              >
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                    In Gedenken
                  </div>
                  <div className="headline mt-1 text-lg text-royal-800">Nachruf</div>
                  <div className="mt-1 text-[12px] text-neutral-500">
                    Verstorbene Mitglieder 2026
                  </div>
                </div>
                <span className="text-xl text-royal-700 group-hover:text-gold-600">
                  →
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <FadeIn>
                <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
                  Ihr Beitrag trägt die Musik.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  Im Förderverein haben sich {SITE.members} engagierte Freunde und
                  interessierte Konzertbesucher zusammengefunden, welche „die
                  Klingende Kirche" auf unterschiedliche Art und Weise helfend
                  begleiten wollen.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  Wir laden auch Sie ein, durch eine Mitgliedschaft im Förderverein
                  nicht nur von dessen Angeboten zu profitieren, sondern auch als
                  „Botschafter der Klingenden Kirche" die Idee dieses einzigartigen
                  Projekts in die Öffentlichkeit zu tragen.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  Durch Ihre Mitgliedschaft unterstützen, fördern und gestalten Sie
                  die vielfältigen Aktivitäten im Konzertbereich. Darüber hinaus
                  ermöglichen Sie eine permanente orgelmusikalische
                  Nachwuchsförderung im Rahmen der Europäischen Orgelakademie. Ihr
                  Mitgliedsbeitrag sichert das lebendige Engagement des Fördervereins
                  für die Kirchenmusik.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                  Sie können die kirchenmusikalischen Aktivitäten in der Kath. Kirche
                  „St. Crispinus und St. Crispinianus Saarlouis-Lisdorf" mit einem
                  monatlichen Beitrag von 2,50 € unterstützen.
                </p>

                <div className="mt-10 rounded-2xl border border-royal-700/10 bg-cream-100/70 p-6 sm:p-8">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                    So werden Sie Mitglied
                  </div>
                  <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-neutral-700">
                    <li>
                      <span className="mr-2 font-semibold text-royal-800">1.</span>
                      PDF „Beitrittserklärung Förderverein Klingende Kirche" speichern
                      und ausfüllen.
                    </li>
                    <li>
                      <span className="mr-2 font-semibold text-royal-800">2.</span>
                      Unterschrieben per Post oder E-Mail senden an:
                    </li>
                  </ol>
                  <div className="mt-5 rounded-xl border border-royal-700/10 bg-white p-5 text-sm leading-relaxed text-neutral-800">
                    Förderverein „Klingende Kirche" e.V.
                    <br />
                    {SITE.address.street}
                    <br />
                    {SITE.address.city}
                    <br />
                    oder an{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-royal-700 underline hover:text-gold-600"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="headline text-xl text-royal-800">
                    Spenden ohne Mitgliedschaft
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                    Spenden sind natürlich auch ohne den Erwerb einer Mitgliedschaft
                    möglich. Nutzen Sie bitte dazu die nachstehende Kontoverbindung.
                  </p>
                  <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-royal-700/10 bg-royal-700/10 sm:grid-cols-2">
                    <div className="bg-white px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                        Kontoinhaber
                      </div>
                      <div className="mt-1 text-sm text-royal-800">
                        {SITE.bank.holder}
                      </div>
                    </div>
                    <div className="bg-white px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                        Bank
                      </div>
                      <div className="mt-1 text-sm text-royal-800">{SITE.bank.name}</div>
                    </div>
                    <div className="bg-white px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                        IBAN
                      </div>
                      <div className="mt-1 font-mono text-sm text-royal-800">
                        {SITE.bank.iban}
                      </div>
                    </div>
                    <div className="bg-white px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                        BIC
                      </div>
                      <div className="mt-1 font-mono text-sm text-royal-800">
                        {SITE.bank.bic}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="md:col-span-2">
              <FadeIn delay={0.1}>
                <div className="sticky top-28 space-y-4">
                  <div className="rounded-3xl border border-royal-700/10 bg-royal-800 p-8 text-cream-50 shadow-plate">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-gold-200">
                      Beitrittserklärung
                    </div>
                    <div className="headline mt-2 text-2xl font-medium">
                      Direkt herunterladen
                    </div>
                    <p className="mt-3 text-sm text-cream-50/85">
                      PDF speichern, ausfüllen und unterschrieben zurücksenden.
                    </p>
                    <a
                      href="/downloads/beitrittserklaerung.pdf"
                      target="_blank"
                      rel="noopener"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-medium text-royal-800 transition hover:bg-gold-300"
                    >
                      Beitrittserklärung (PDF)
                    </a>
                    <a
                      href={`mailto:${SITE.email}?subject=Mitgliedschaft%20Klingende%20Kirche`}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-cream-50/25 px-5 py-3 text-sm font-medium text-cream-50 transition hover:bg-white/5"
                    >
                      E-Mail schreiben
                    </a>
                  </div>

                  <div className="rounded-3xl border border-royal-700/10 bg-cream-100/70 p-6">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                      Weitere Information
                    </div>
                    <ul className="mt-4 space-y-3 text-sm">
                      <li>
                        <Link
                          href="/neue-mitglieder"
                          className="flex items-center justify-between text-royal-800 hover:text-gold-600"
                        >
                          Neue Mitglieder <span>→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/nachruf"
                          className="flex items-center justify-between text-royal-800 hover:text-gold-600"
                        >
                          Nachruf <span>→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/verein"
                          className="flex items-center justify-between text-royal-800 hover:text-gold-600"
                        >
                          Der Verein <span>→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kontakt"
                          className="flex items-center justify-between text-royal-800 hover:text-gold-600"
                        >
                          Kontakt <span>→</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
