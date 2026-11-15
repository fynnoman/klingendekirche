import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import PartnersStrip from "@/components/PartnersStrip";

export const metadata = { title: "Satzung" };

const paragraphs: { title: string; body: string }[] = [
  {
    title: "§ 1 Name, Sitz und Geschäftsjahr",
    body:
      "Der Verein führt den Namen „Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.“ und ist im Vereinsregister des Amtsgerichts Saarlouis eingetragen. Er hat seinen Sitz in Saarlouis. Das Geschäftsjahr ist das Kalenderjahr."
  },
  {
    title: "§ 2 Zweck des Vereins",
    body:
      "Zweck des Vereins ist die Förderung der Kirchenmusik in der katholischen Pfarrkirche St. Crispinus und Crispinianus, Saarlouis-Lisdorf. Dazu zählen insbesondere die Pflege und der Unterhalt der MAYER-Orgel, die Veranstaltung kirchenmusikalischer Konzerte sowie die Förderung der Orgelakademie und des Orgel‑Kompositionswettbewerbs."
  },
  {
    title: "§ 3 Gemeinnützigkeit",
    body:
      "Der Verein verfolgt ausschließlich und unmittelbar gemeinnützige Zwecke im Sinne des Abschnitts „Steuerbegünstigte Zwecke“ der Abgabenordnung. Mittel des Vereins dürfen nur für satzungsgemäße Zwecke verwendet werden."
  },
  {
    title: "§ 4 Mitgliedschaft",
    body:
      "Mitglied des Vereins kann jede natürliche und jede juristische Person werden. Über die Aufnahme entscheidet der Vorstand. Die Mitgliedschaft endet durch Austritt, Streichung oder Tod."
  },
  {
    title: "§ 5 Mitgliedsbeiträge",
    body:
      "Die Höhe der Mitgliedsbeiträge wird von der Mitgliederversammlung in einer Beitragsordnung festgelegt."
  },
  {
    title: "§ 6 Organe des Vereins",
    body:
      "Organe des Vereins sind die Mitgliederversammlung und der Vorstand. Der Vorstand besteht aus mindestens drei Personen."
  }
];

export default function SatzungPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliche Grundlage"
        title="Satzung"
        subtitle="Auszüge der aktuell gültigen Satzung des Fördervereins. Die vollständige Fassung erhalten Sie auf Anfrage."
      />

      <section className="py-16">
        <div className="container-rail">
          <ol className="space-y-8">
            {paragraphs.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.04}>
                <li className="rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card">
                  <h3 className="headline text-xl text-royal-800">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">{p.body}</p>
                </li>
              </FadeIn>
            ))}
          </ol>

          <FadeIn>
            <p className="mt-10 text-sm italic text-neutral-500">
              Dieser Auszug dient der Übersicht. Für die rechtsverbindliche Fassung wenden Sie sich
              bitte an den Vorstand.
            </p>
          </FadeIn>
        </div>
      </section>

      <PartnersStrip />
    </>
  );
}
