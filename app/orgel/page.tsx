"use client";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { OrnamentDouble } from "@/components/Ornament";
import { ORGAN_FACTS, ORGEL_HISTORY, ORGEL_GALLERY } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { l } from "@/lib/i18n";

export default function OrgelPage() {
  const { lang, t } = useLang();

  const title = lang === "en" ? "Organ" : "Orgel";
  const eyebrow = lang === "en" ? "MAYER organ · Lisdorf" : "MAYER-Orgel · Lisdorf";
  const subtitle =
    lang === "en"
      ? "The Mayer organ in the Catholic church of St. Crispinus and Crispinianus Saarlouis-Lisdorf."
      : "Die Mayer-Orgel in der Kath. Kirche Crispinus und Crispinianus Saarlouis-Lisdorf.";

  const leadQuote =
    lang === "en"
      ? "The artistic value of an organ requires a harmonious interplay of architecture, case design, specification, allocation of divisions and ultimately a perfect voicing."
      : "Der künstlerische Wert einer Orgel setzt ein harmonisches Zusammenspiel von Architektur, Prospektgestaltung, Disposition, Zuordnung der einzelnen Teilwerke und letztlich eine vollkommene Intonation voraus.";

  const essay: string[] =
    lang === "en"
      ? [
          "When the Lisdorf organ was newly built in 1987 by the Hugo Mayer organ workshop in Heusweiler / Saar, it was particularly important to adapt the new instrument harmoniously to the baroque character of the church interior, so that a homogeneous unity and reciprocal relationship between space and organ would emerge.",
          "After extensive consideration an organ case with a baroque façade was designed, faithful to the great examples of the known masters. The swinging and ringing of the tones can already be anticipated from its very appearance.",
          "In the rich specification of 45 stops the different pipe families are variously represented. With great sensitivity the many ranks of pipes were matched to the acoustics of the church, producing a homogeneous overall sound that allows both the delicate soft voices and the powerful reed stops to unfold fully.",
          "The organ is controlled from a console attached to the case through a mechanical wooden action, via thin wooden strips, trackers and squares.",
          "The stop action, likewise equipped with mechanical drawstops, is complemented by three combination pedals, allowing the organist to call up the individual tonal colours for principals, mixtures and reeds with a single foot stroke.",
          "The carvings of the organ façade were produced by the workshop of Martin Mrziglod, Tholey / Saar, and completed in 1992."
        ]
      : [
          "Bei dem Neubau der Lisdorfer Orgel im Jahre 1987 durch die Orgelbaufirma Hugo Mayer, Heusweiler / Saar galt es im Besonderen, das neue Orgelwerk harmonisch dem barocken Charakter des Innenraumes der Kirche so anzupassen, dass eine homogene Einheit und Wechselbeziehung zwischen Raum und Orgelwerk entsteht.",
          "Nach intensiven Überlegungen wurde ein Orgelgehäuse mit einem barocken Prospekt getreu dem großen Vorbild der bekannten Meister konzipiert. Das Schwingen und Klingen der Töne lässt sich schon beim Anblick erahnen.",
          "In der reichhaltigen Disposition mit 45 Registern sind die einzelnen Pfeifenfamilien vielfältig vertreten. Mit viel Einfühlungsvermögen gelang es, die vielen Pfeifenreihen der Akustik des Kirchenraumes anzupassen und somit einen homogenen Gesamtklang zu erhalten, der sowohl die feinen und zarten Stimmen als auch die kräftigen Rohrwerke zur vollen Entfaltung kommen lässt.",
          "Traktiert wird die Orgel vom angebauten Spielschrank am Orgelgehäuse über eine mechanische Holztraktur, über dünne Holzleisten, den Abstrakten und Wellen.",
          "Das ebenfalls mit mechanischen Manubrien ausgestattete Registerwerk wurde mit drei Kombinationstritten ausgerüstet, durch welche es dem Organisten ermöglicht wird, die einzelnen Klangfarben für Principale, Mixturen und Zungen mit einem Fußtritt abzurufen.",
          "Das Schnitzwerk des Orgelprospektes wurde durch die Werkstatt Martin Mrziglod, Tholey / Saar gefertigt und im Jahre 1992 vollendet."
        ];

  const sectionAnInstrument =
    lang === "en"
      ? { eyebrow: "The instrument", title: "An instrument with a great history." }
      : { eyebrow: "Das Instrument", title: "Ein Instrument mit großer Geschichte." };

  const btnConcerts = lang === "en" ? "Concert dates" : "Konzerttermine";
  const btnSupport = lang === "en" ? "Support the organ" : "Orgel unterstützen";
  const prepTitle =
    lang === "en" ? "More information coming" : "Weitere Informationen folgen";
  const prepText =
    lang === "en"
      ? "A comprehensive documentation of the Lisdorf MAYER organ is being prepared here: specification, history, photographs and audio samples. Please come back soon."
      : "An dieser Stelle entsteht eine ausführliche Dokumentation der Lisdorfer MAYER-Orgel: Disposition, Geschichte, Fotos und Hörbeispiele. Schauen Sie bald wieder vorbei.";

  const gallerySectionEyebrow = lang === "en" ? "Images" : "Bilder";
  const gallerySectionTitle = lang === "en" ? "Impressions" : "Eindrücke";
  const chaptersEyebrow = t("common.breadcrumb_organ");
  const chaptersSection =
    lang === "en"
      ? "More information"
      : "Weitere Information";
  const chaptersTitle =
    lang === "en"
      ? "On the history of the Lisdorf organs"
      : "Zur Geschichte der Lisdorfer Orgeln";

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="py-12 sm:py-16">
        <div className="container-rail text-center">
          <FadeIn>
            <div className="flex justify-center">
              <OrnamentDouble />
            </div>
            <p className="display mt-8 text-2xl italic leading-[1.3] text-royal-800 sm:text-3xl md:text-4xl">
              „{leadQuote}"
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-wide">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5">
              <div className="sticky top-28 overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-plate">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/orgel/mayer-orgel-lisdorf.png"
                    alt="MAYER organ in the parish church"
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="border-t border-royal-700/10 bg-cream-50 px-6 py-4">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                    {lang === "en"
                      ? "St. Crispinus and Crispinianus parish church"
                      : "Pfarrkirche St. Crispinus und Crispinianus"}
                  </div>
                  <div className="mt-1 text-sm text-royal-800">
                    {lang === "en" ? "MAYER organ, new build 1987" : "MAYER-Orgel, Neubau 1987"}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="md:col-span-7">
              <div className="eyebrow">{sectionAnInstrument.eyebrow}</div>
              <h2 className="display mt-4 text-4xl text-royal-800 sm:text-5xl">
                {sectionAnInstrument.title}
              </h2>

              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-neutral-800">
                {essay.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-royal-700/10 bg-royal-700/10">
                {ORGAN_FACTS.map((f, i) => (
                  <div key={i} className="bg-white px-5 py-6">
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                      {l(f.label, lang)}
                    </dt>
                    <dd className="mt-1 text-sm text-royal-800">{l(f.value, lang)}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/termine" className="btn-primary">
                  {btnConcerts}
                </Link>
                <Link href="/mitgliedschaft" className="btn-ghost">
                  {btnSupport}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-royal-700/10 bg-cream-100/60 py-16">
        <div className="container-wide">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between border-b border-royal-700/10 pb-6">
              <div>
                <div className="eyebrow">{gallerySectionEyebrow}</div>
                <h2 className="display mt-4 text-3xl text-royal-800 sm:text-4xl">
                  {gallerySectionTitle}
                </h2>
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                {t("common.images_in_prep")}
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {ORGEL_GALLERY.map((g, i) => (
              <FadeIn key={i} delay={(i % 3) * 0.06}>
                <figure className="group overflow-hidden rounded-2xl border border-royal-700/10 bg-white shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden bg-royal-900/5">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 50% 40%, rgba(197,159,74,0.14), transparent 55%), repeating-linear-gradient(135deg, rgba(31,59,130,0.04) 0 10px, transparent 10px 20px)"
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        aria-hidden
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-royal-700/35"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <circle cx="9" cy="10" r="2" />
                        <path d="M21 17l-5-5L5 20" />
                      </svg>
                    </div>
                  </div>
                  <figcaption className="border-t border-royal-700/10 px-5 py-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                      {t("common.figure")}
                    </div>
                    <div className="mt-1 text-sm text-royal-800">
                      {l(g.caption, lang)}
                    </div>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-wide">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between border-b border-royal-700/10 pb-6">
              <div>
                <div className="eyebrow">{chaptersSection}</div>
                <h2 className="display mt-4 text-3xl text-royal-800 sm:text-4xl">
                  {chaptersTitle}
                </h2>
              </div>
            </div>
          </FadeIn>

          <ul className="grid gap-4 md:grid-cols-2">
            {ORGEL_HISTORY.map((h, i) => (
              <FadeIn key={h.slug} delay={(i % 2) * 0.05}>
                <li>
                  <Link
                    href={`/orgel/${h.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card transition hover:border-gold-300"
                  >
                    <div>
                      {h.year && (
                        <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                          {l(h.year, lang)}
                        </div>
                      )}
                      <div className="headline mt-1 text-lg text-royal-800">
                        {l(h.title, lang)}
                      </div>
                    </div>
                    <span className="text-xl text-royal-700 transition group-hover:translate-x-0.5 group-hover:text-gold-600">
                      →
                    </span>
                  </Link>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
