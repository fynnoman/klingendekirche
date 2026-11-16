"use client";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { SITE } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

export default function KontaktPage() {
  const { lang, t } = useLang();

  const strings =
    lang === "en"
      ? {
          eyebrow: "We are here for you",
          title: "Contact and directions",
          subtitle:
            "For ticket orders, questions about concerts, membership or partnerships.",
          office: "Office",
          chairLabel: "Chairman",
          addressLabel: "Address",
          phoneLabel: "Phone",
          faxLabel: "Fax",
          emailLabel: "E-mail",
          venueEyebrow: "Venue",
          openInMaps: "Open in Google Maps",
          formEyebrow: "Your message",
          formHeading: "Ask us a question",
          formLead:
            "Or book tickets for a concert. We will get back to you as soon as possible.",
          first: "First name*",
          last: "Last name*",
          email: "E-mail*",
          subject: "Subject",
          subjectHint: "Ticket order, membership, enquiry",
          yourMessage: "Your message*",
          consent:
            "I have read and accepted the privacy policy. Required fields are marked with *.",
          altLabel: "Alternatively, write to",
          send: "Send message"
        }
      : {
          eyebrow: "Wir sprechen mit Ihnen",
          title: "Kontakt und Anfahrt",
          subtitle:
            "Für Kartenbestellungen, Rückfragen zu Konzerten, Mitgliedschaft oder Partnerschaften.",
          office: "Geschäftsstelle",
          chairLabel: "1. Vorsitzender",
          addressLabel: "Anschrift",
          phoneLabel: "Fon",
          faxLabel: "Fax",
          emailLabel: "E-Mail",
          venueEyebrow: "Veranstaltungsort",
          openInMaps: "In Google Maps öffnen",
          formEyebrow: "Ihre Nachricht",
          formHeading: "Stellen Sie Ihre Frage",
          formLead:
            "Oder bestellen Sie Karten für ein Konzert. Wir melden uns schnellstmöglich.",
          first: "Vorname*",
          last: "Nachname*",
          email: "E-Mail*",
          subject: "Betreff",
          subjectHint: "Kartenbestellung, Mitgliedschaft, Rückfrage",
          yourMessage: "Ihre Nachricht*",
          consent:
            "Ich habe die Datenschutzbestimmungen gelesen und akzeptiert. Pflichtfelder sind mit * markiert.",
          altLabel: "Alternativ: einfach an",
          send: "Nachricht senden"
        };

  return (
    <>
      <PageHero
        eyebrow={strings.eyebrow}
        title={strings.title}
        subtitle={strings.subtitle}
      />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <FadeIn>
                <div className="rounded-3xl border border-royal-700/10 bg-white p-7 shadow-card">
                  <div className="eyebrow">{strings.office}</div>
                  <h2 className="headline mt-3 text-2xl text-royal-800">
                    {l(SITE.nameLong, lang)}
                  </h2>

                  <dl className="mt-6 space-y-5 text-sm">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        {strings.chairLabel}
                      </dt>
                      <dd className="mt-1 text-royal-800">Manfred Boßmann</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        {strings.addressLabel}
                      </dt>
                      <dd className="mt-1 text-neutral-700">
                        {SITE.address.street}
                        <br />
                        {SITE.address.city}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        {strings.phoneLabel}
                      </dt>
                      <dd className="mt-1">
                        <a className="link-underline" href={`tel:${SITE.phoneHref}`}>
                          {SITE.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        {strings.faxLabel}
                      </dt>
                      <dd className="mt-1 text-neutral-700">{SITE.fax}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                        {strings.emailLabel}
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
                    {strings.venueEyebrow}
                  </div>
                  <div className="headline mt-2 text-xl">
                    {l(SITE.church.name, lang)}
                  </div>
                  <div className="mt-3 text-sm text-cream-50/85">
                    {SITE.church.street}
                    <br />
                    {SITE.church.city}
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kath.+Pfarrkirche+St.+Crispinus+und+Crispinianus+Saarlouis-Lisdorf"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-royal-800 transition hover:bg-gold-300"
                  >
                    {strings.openInMaps}
                  </a>
                </div>
              </FadeIn>
            </div>

            <div className="md:col-span-3">
              <FadeIn delay={0.05}>
                <form className="rounded-3xl border border-royal-700/10 bg-white p-7 shadow-card sm:p-9">
                  <div className="eyebrow">{strings.formEyebrow}</div>
                  <h2 className="headline mt-3 text-2xl text-royal-800">
                    {strings.formHeading}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-600">{strings.formLead}</p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-royal-700">
                        {strings.first}
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
                        {strings.last}
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
                        {strings.email}
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
                        {strings.subject}
                      </span>
                      <input
                        type="text"
                        name="subject"
                        placeholder={strings.subjectHint}
                        className="mt-1.5 w-full rounded-xl border border-royal-700/15 bg-cream-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-gold-400 focus:bg-white"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-royal-700">
                        {strings.yourMessage}
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
                      <span>{strings.consent}</span>
                    </label>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div className="text-[11px] text-neutral-500">
                      {strings.altLabel}{" "}
                      <a className="link-underline" href={`mailto:${SITE.email}`}>
                        {SITE.email}
                      </a>
                      .
                    </div>
                    <button type="submit" className="btn-primary">
                      {strings.send}
                    </button>
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
