"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { SITE } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

export default function MitgliedschaftPage() {
  const { lang } = useLang();
  const pageTitle = lang === "en" ? "Become a member" : "Mitglied werden";
  const eyebrow =
    lang === "en"
      ? `Membership · ${SITE.members} members`
      : `Mitgliedschaft · ${SITE.members} Mitglieder`;
  const subtitle =
    lang === "en"
      ? "Become an ambassador of the Klingende Kirche. From as little as 2.50 € per month you support our programme."
      : "Werden Sie Botschafterin, werden Sie Botschafter der Klingenden Kirche. Schon ab 2,50 € im Monat tragen Sie unser Programm mit.";

  const declTitle =
    lang === "en" ? "Membership declaration" : "Beitrittserklärung";
  const pdfDownload = lang === "en" ? "Download PDF" : "PDF herunterladen";
  const pdfSub =
    lang === "en" ? "Fill in and submit" : "Ausfüllen und einsenden";

  const newMembersTitle = lang === "en" ? "New members" : "Neue Mitglieder";
  const newMembersSub =
    lang === "en"
      ? "Who joined us this year"
      : "Wen wir dieses Jahr begrüßen";
  const obituaryTitle = lang === "en" ? "In memoriam" : "Nachruf";
  const obituarySub =
    lang === "en"
      ? "Deceased members 2026"
      : "Verstorbene Mitglieder 2026";
  const inMemoriam = lang === "en" ? "Remembrance" : "In Gedenken";

  const heading =
    lang === "en" ? "Your gift carries the music." : "Ihr Beitrag trägt die Musik.";

  const paragraphs: string[] =
    lang === "en"
      ? [
          `In the association, ${SITE.members} engaged friends and interested concert visitors have come together, who wish to accompany “the Klingende Kirche” in their own ways.`,
          "We invite you, too, to become a member. You will not only benefit from the association’s offerings, but also act as an “ambassador of the Klingende Kirche”, carrying the idea of this unique project into the public eye.",
          "Through your membership you support, promote and shape the many activities in the concert field. You also make possible the ongoing promotion of young organ talent within the European Organ Academy. Your membership fee secures the lively engagement of the association for sacred music.",
          "You can support the musical life of the Catholic church “St. Crispinus and St. Crispinianus Saarlouis-Lisdorf” with a monthly contribution of 2.50 €."
        ]
      : [
          `Im Förderverein haben sich ${SITE.members} engagierte Freunde und interessierte Konzertbesucher zusammengefunden, welche „die Klingende Kirche“ auf unterschiedliche Art und Weise helfend begleiten wollen.`,
          "Wir laden auch Sie ein, durch eine Mitgliedschaft im Förderverein nicht nur von dessen Angeboten zu profitieren, sondern auch als „Botschafter der Klingenden Kirche“ die Idee dieses einzigartigen Projekts in die Öffentlichkeit zu tragen.",
          "Durch Ihre Mitgliedschaft unterstützen, fördern und gestalten Sie die vielfältigen Aktivitäten im Konzertbereich. Darüber hinaus ermöglichen Sie eine permanente orgelmusikalische Nachwuchsförderung im Rahmen der Europäischen Orgelakademie. Ihr Mitgliedsbeitrag sichert das lebendige Engagement des Fördervereins für die Kirchenmusik.",
          "Sie können die kirchenmusikalischen Aktivitäten in der Kath. Kirche „St. Crispinus und St. Crispinianus Saarlouis-Lisdorf“ mit einem monatlichen Beitrag von 2,50 € unterstützen."
        ];

  const stepsHeading = lang === "en" ? "How to join" : "So werden Sie Mitglied";
  const step1 =
    lang === "en"
      ? "Download and fill in the PDF “Membership declaration”."
      : "PDF „Beitrittserklärung Förderverein Klingende Kirche“ speichern und ausfüllen.";
  const step2 =
    lang === "en"
      ? "Send it signed by post or e-mail to:"
      : "Unterschrieben per Post oder E-Mail senden an:";
  const orTo = lang === "en" ? "or to" : "oder an";
  const assocLine =
    lang === "en"
      ? "Klingende Kirche Association e.V."
      : "Förderverein „Klingende Kirche“ e.V.";

  const donateHeading =
    lang === "en" ? "Donations without membership" : "Spenden ohne Mitgliedschaft";
  const donateLead =
    lang === "en"
      ? "Donations are also possible without becoming a member. Please use the account details below."
      : "Spenden sind natürlich auch ohne den Erwerb einer Mitgliedschaft möglich. Nutzen Sie bitte dazu die nachstehende Kontoverbindung.";

  const bankLabels =
    lang === "en"
      ? { holder: "Account holder", bank: "Bank", iban: "IBAN", bic: "BIC" }
      : { holder: "Kontoinhaber", bank: "Bank", iban: "IBAN", bic: "BIC" };

  const sideTitle = lang === "en" ? "Download directly" : "Direkt herunterladen";
  const sideText =
    lang === "en"
      ? "Save the PDF, fill it in and return it signed."
      : "PDF speichern, ausfüllen und unterschrieben zurücksenden.";
  const writeEmail = lang === "en" ? "Write an e-mail" : "E-Mail schreiben";
  const moreInfo = lang === "en" ? "More information" : "Weitere Information";

  return (
    <>
      <PageHero eyebrow={eyebrow} title={pageTitle} subtitle={subtitle} />

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
                    {declTitle}
                  </div>
                  <div className="headline mt-1 text-lg">{pdfDownload}</div>
                  <div className="mt-1 text-[12px] text-cream-50/70">{pdfSub}</div>
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
                    {newMembersTitle}
                  </div>
                  <div className="mt-1 text-[12px] text-neutral-500">
                    {newMembersSub}
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
                    {inMemoriam}
                  </div>
                  <div className="headline mt-1 text-lg text-royal-800">
                    {obituaryTitle}
                  </div>
                  <div className="mt-1 text-[12px] text-neutral-500">
                    {obituarySub}
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

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <FadeIn>
                <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
                  {heading}
                </h2>
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-[15px] leading-relaxed text-neutral-700"
                  >
                    {p}
                  </p>
                ))}

                <div className="mt-10 rounded-2xl border border-royal-700/10 bg-cream-100/70 p-6 sm:p-8">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                    {stepsHeading}
                  </div>
                  <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-neutral-700">
                    <li>
                      <span className="mr-2 font-semibold text-royal-800">1.</span>
                      {step1}
                    </li>
                    <li>
                      <span className="mr-2 font-semibold text-royal-800">2.</span>
                      {step2}
                    </li>
                  </ol>
                  <div className="mt-5 rounded-xl border border-royal-700/10 bg-white p-5 text-sm leading-relaxed text-neutral-800">
                    {assocLine}
                    <br />
                    {SITE.address.street}
                    <br />
                    {SITE.address.city}
                    <br />
                    {orTo}{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-royal-700 underline hover:text-gold-600"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="headline text-xl text-royal-800">{donateHeading}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">
                    {donateLead}
                  </p>
                  <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-royal-700/10 bg-royal-700/10 sm:grid-cols-2">
                    <div className="bg-white px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                        {bankLabels.holder}
                      </div>
                      <div className="mt-1 text-sm text-royal-800">
                        {l(SITE.bank.holder, lang)}
                      </div>
                    </div>
                    <div className="bg-white px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                        {bankLabels.bank}
                      </div>
                      <div className="mt-1 text-sm text-royal-800">{SITE.bank.name}</div>
                    </div>
                    <div className="bg-white px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                        {bankLabels.iban}
                      </div>
                      <div className="mt-1 font-mono text-sm text-royal-800">
                        {SITE.bank.iban}
                      </div>
                    </div>
                    <div className="bg-white px-5 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                        {bankLabels.bic}
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
                      {declTitle}
                    </div>
                    <div className="headline mt-2 text-2xl font-medium">
                      {sideTitle}
                    </div>
                    <p className="mt-3 text-sm text-cream-50/85">{sideText}</p>
                    <a
                      href="/downloads/beitrittserklaerung.pdf"
                      target="_blank"
                      rel="noopener"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-medium text-royal-800 transition hover:bg-gold-300"
                    >
                      {lang === "en"
                        ? "Membership declaration (PDF)"
                        : "Beitrittserklärung (PDF)"}
                    </a>
                    <a
                      href={`mailto:${SITE.email}?subject=Mitgliedschaft%20Klingende%20Kirche`}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-cream-50/25 px-5 py-3 text-sm font-medium text-cream-50 transition hover:bg-white/5"
                    >
                      {writeEmail}
                    </a>
                  </div>

                  <div className="rounded-3xl border border-royal-700/10 bg-cream-100/70 p-6">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                      {moreInfo}
                    </div>
                    <ul className="mt-4 space-y-3 text-sm">
                      <li>
                        <Link
                          href="/neue-mitglieder"
                          className="flex items-center justify-between text-royal-800 hover:text-gold-600"
                        >
                          {newMembersTitle} <span>→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/nachruf"
                          className="flex items-center justify-between text-royal-800 hover:text-gold-600"
                        >
                          {obituaryTitle} <span>→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/verein"
                          className="flex items-center justify-between text-royal-800 hover:text-gold-600"
                        >
                          {lang === "en" ? "The association" : "Der Verein"}{" "}
                          <span>→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/kontakt"
                          className="flex items-center justify-between text-royal-800 hover:text-gold-600"
                        >
                          {lang === "en" ? "Contact" : "Kontakt"} <span>→</span>
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
