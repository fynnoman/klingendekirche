import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";

export const metadata = { title: "Die Kirche" };

export default function KirchePage() {
  return (
    <>
      <PageHero
        eyebrow="Pfarrkirche"
        title="St. Crispinus und Crispinianus"
        subtitle="Die Lisdorfer Pfarrkirche — Heimat unserer Konzerte, Gottesdienste und der MAYER-Orgel."
      />

      <section className="py-16">
        <div className="container-wide">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <FadeIn>
                <article className="prose-verein">
                  <h2>Geschichte</h2>
                  <p>
                    Die katholische Pfarrkirche St. Crispinus und Crispinianus ist das
                    kirchenmusikalische und spirituelle Zentrum des Saarlouiser Stadtteils
                    Lisdorf. Ihre Patrone, die römischen Schuhmacherbrüder Crispinus und
                    Crispinianus, gelten als Schutzheilige der Schuhmacher und Lederarbeiter.
                  </p>
                  <h2>Raum und Akustik</h2>
                  <p>
                    Der weite Kirchenraum bietet eine Akustik, die für Orgelmusik, Chorgesang und
                    Instrumentalmusik gleichermaßen geeignet ist. Besonders das Pleno der neuen
                    MAYER-Orgel entfaltet sich im Hauptschiff zu einem tragenden Klangkörper.
                  </p>
                  <h2>Besuch</h2>
                  <p>
                    Außerhalb der Gottesdienste ist die Kirche regelmäßig geöffnet. Für
                    Führungen und Gruppen sprechen Sie uns gerne an. Unsere Konzerte finden in
                    aller Regel im Hauptraum der Kirche statt.
                  </p>
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
                        Pfarrkirche Lisdorf
                      </div>
                      <div className="headline mt-1 text-xl font-medium">
                        St. Crispinus und Crispinianus
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-gold-600">
                      Adresse
                    </div>
                    <div className="mt-2 text-sm text-neutral-700">
                      Kath. Pfarrkirche St. Crispinus und Crispinianus
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

      <PartnersStrip />
    </>
  );
}
