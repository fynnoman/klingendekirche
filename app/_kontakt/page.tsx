import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";
import { SITE } from "@/lib/data";

export const metadata = { title: "Kontakt und Anfahrt" };

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Wir sprechen mit Ihnen"
        title="Kontakt und Anfahrt"
        subtitle="Für Kartenbestellungen, Rückfragen zu Konzerten, Mitgliedschaft oder Partnerschaften."
      />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-5">
            {/* Contact details */}
            <div className="md:col-span-2">
              <FadeIn>
                <div className="rounded-3xl border border-royal-700/10 bg-white p-7 shadow-card">
                  <div className="eyebrow">Geschäftsstelle</div>
                  <h2 className="headline mt-3 text-2xl text-royal-800">
                    Förderverein Klingende Kirche
                    <br />
                    <span className="italic">Saarlouis-Lisdorf e.V.</span>
                  </h2>

                  <dl className="mt-6 space-y-5 text-sm">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        1. Vorsitzender
                      </dt>
                      <dd className="mt-1 text-royal-800">Manfred Boßmann</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        Anschrift
                      </dt>
                      <dd className="mt-1 text-neutral-700">
                        {SITE.address.street}
                        <br />
                        {SITE.address.city}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        Fon
                      </dt>
                      <dd className="mt-1">
                        <a className="link-underline" href={`tel:${SITE.phoneHref}`}>
                          {SITE.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        Fax
                      </dt>
                      <dd className="mt-1 text-neutral-700">{SITE.fax}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        E-Mail
                      </dt>
                      <dd className="mt-1">
                        <a className="link-underline" href={`mailto:${SITE.email}`}>
                          {SITE.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="mt-6 rounded-3xl border border-royal-700/10 bg-royal-800 p-7 text-cream-50 shadow-plate">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold-200">
                    Veranstaltungsort
                  </div>
                  <div className="headline mt-2 text-xl">
                    Kath. Pfarrkirche St. Crispinus und Crispinianus
                  </div>
                  <div className="mt-3 text-sm text-cream-50/85">
                    Großstraße
                    <br />
                    66740 Saarlouis-Lisdorf
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kath.+Pfarrkirche+St.+Crispinus+und+Crispinianus+Saarlouis-Lisdorf"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-royal-800 transition hover:bg-gold-300"
                  >
                    In Google Maps öffnen
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Contact form */}
            <div className="md:col-span-3">
              <FadeIn delay={0.05}>
                <form className="rounded-3xl border border-royal-700/10 bg-white p-7 shadow-card sm:p-9">
                  <div className="eyebrow">Ihre Nachricht</div>
                  <h2 className="headline mt-3 text-2xl text-royal-800">Stellen Sie Ihre Frage</h2>
                  <p className="mt-2 text-sm text-neutral-600">
                    Oder bestellen Sie Karten für ein Konzert. Wir melden uns schnellstmöglich.
                  </p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-royal-700">
                        Vorname*
                      </span>
                      <input
                        required
                        type="text"
                        name="first"
                        className="mt-1.5 w-full rounded-xl border border-royal-700/15 bg-cream-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-gold-400 focus:bg-white"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-royal-700">
                        Nachname*
                      </span>
                      <input
                        required
                        type="text"
                        name="last"
                        className="mt-1.5 w-full rounded-xl border border-royal-700/15 bg-cream-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-gold-400 focus:bg-white"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-royal-700">
                        E-Mail*
                      </span>
                      <input
                        required
                        type="email"
                        name="email"
                        className="mt-1.5 w-full rounded-xl border border-royal-700/15 bg-cream-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-gold-400 focus:bg-white"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-royal-700">
                        Betreff
                      </span>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Kartenbestellung, Mitgliedschaft, Rückfrage"
                        className="mt-1.5 w-full rounded-xl border border-royal-700/15 bg-cream-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-gold-400 focus:bg-white"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-royal-700">
                        Ihre Nachricht*
                      </span>
                      <textarea
                        required
                        rows={6}
                        name="message"
                        className="mt-1.5 w-full resize-none rounded-xl border border-royal-700/15 bg-cream-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-gold-400 focus:bg-white"
                      />
                    </label>
                    <label className="sm:col-span-2 flex items-start gap-3 text-xs text-neutral-600">
                      <input
                        required
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-royal-700/20 text-royal-700"
                      />
                      <span>
                        Ich habe die Datenschutzbestimmungen gelesen und akzeptiert. Pflichtfelder
                        sind mit * markiert.
                      </span>
                    </label>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div className="text-[11px] text-neutral-500">
                      Alternativ: einfach an{" "}
                      <a className="link-underline" href={`mailto:${SITE.email}`}>
                        {SITE.email}
                      </a>{" "}
                      schreiben.
                    </div>
                    <button type="submit" className="btn-primary">
                      Nachricht senden
                    </button>
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}
