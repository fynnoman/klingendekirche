"use client";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LanguageProvider";

export default function KirchePage() {
  const { lang } = useLang();
  const s =
    lang === "en"
      ? {
          eyebrow: "Parish church",
          title: "St. Crispinus and Crispinianus",
          subtitle:
            "The Lisdorf parish church, home of our concerts, services and the MAYER organ.",
          h1: "History",
          p1: "The Catholic parish church of St. Crispinus and Crispinianus is the musical and spiritual centre of the Lisdorf district of Saarlouis. Its patrons, the Roman shoemaker brothers Crispinus and Crispinianus, are revered as the patron saints of shoemakers and leather workers.",
          h2: "Space and acoustics",
          p2: "The wide church interior offers an acoustic that suits organ music, choir and instrumental music alike. In particular the plenum of the new MAYER organ unfolds into a carrying sonority in the main nave.",
          h3: "Visit",
          p3: "Outside of services the church is regularly open. For guided tours and groups please get in touch. Our concerts usually take place in the main space of the church.",
          cardEyebrow: "Lisdorf parish church",
          cardTitle: "St. Crispinus and Crispinianus",
          addressLabel: "Address"
        }
      : {
          eyebrow: "Pfarrkirche",
          title: "St. Crispinus und Crispinianus",
          subtitle:
            "Die Lisdorfer Pfarrkirche, Heimat unserer Konzerte, Gottesdienste und der MAYER-Orgel.",
          h1: "Geschichte",
          p1: "Die katholische Pfarrkirche St. Crispinus und Crispinianus ist das kirchenmusikalische und spirituelle Zentrum des Saarlouiser Stadtteils Lisdorf. Ihre Patrone, die römischen Schuhmacherbrüder Crispinus und Crispinianus, gelten als Schutzheilige der Schuhmacher und Lederarbeiter.",
          h2: "Raum und Akustik",
          p2: "Der weite Kirchenraum bietet eine Akustik, die für Orgelmusik, Chorgesang und Instrumentalmusik gleichermaßen geeignet ist. Besonders das Pleno der neuen MAYER-Orgel entfaltet sich im Hauptschiff zu einem tragenden Klangkörper.",
          h3: "Besuch",
          p3: "Außerhalb der Gottesdienste ist die Kirche regelmäßig geöffnet. Für Führungen und Gruppen sprechen Sie uns gerne an. Unsere Konzerte finden in aller Regel im Hauptraum der Kirche statt.",
          cardEyebrow: "Pfarrkirche Lisdorf",
          cardTitle: "St. Crispinus und Crispinianus",
          addressLabel: "Adresse"
        };

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <FadeIn>
                <article className="prose-verein">
                  <h2>{s.h1}</h2>
                  <p>{s.p1}</p>
                  <h2>{s.h2}</h2>
                  <p>{s.p2}</p>
                  <h2>{s.h3}</h2>
                  <p>{s.p3}</p>
                </article>
              </FadeIn>
            </div>
            <div className="md:col-span-2">
              <FadeIn delay={0.1}>
                <div className="sticky top-28 space-y-6">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-royal-700/10 shadow-plate">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1535992165812-68d1861aa71e?auto=format&fit=crop&w=1200&q=70')"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-900/70 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 text-cream-50">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-gold-200">
                        {s.cardEyebrow}
                      </div>
                      <div className="headline mt-1 text-xl font-medium">
                        {s.cardTitle}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                      {s.addressLabel}
                    </div>
                    <div className="mt-2 text-sm text-neutral-700">
                      {lang === "en"
                        ? "Catholic parish church St. Crispinus and Crispinianus"
                        : "Kath. Pfarrkirche St. Crispinus und Crispinianus"}
                      <br />
                      Großstraße · 66740 Saarlouis-Lisdorf
                    </div>
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
