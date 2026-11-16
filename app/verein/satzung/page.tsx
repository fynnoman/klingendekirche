"use client";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/components/LanguageProvider";

export default function SatzungPage() {
  const { lang } = useLang();

  const s =
    lang === "en"
      ? {
          eyebrow: "Legal basis",
          title: "Statutes",
          subtitle:
            "Excerpts from the currently valid statutes of the association. The full version is available on request.",
          hint: "This excerpt is for guidance. For the legally binding version please contact the board."
        }
      : {
          eyebrow: "Rechtliche Grundlage",
          title: "Satzung",
          subtitle:
            "Auszüge der aktuell gültigen Satzung des Fördervereins. Die vollständige Fassung erhalten Sie auf Anfrage.",
          hint: "Dieser Auszug dient der Übersicht. Für die rechtsverbindliche Fassung wenden Sie sich bitte an den Vorstand."
        };

  const paragraphs =
    lang === "en"
      ? [
          {
            title: "§ 1 Name, seat and financial year",
            body: "The association bears the name “Klingende Kirche Association Saarlouis-Lisdorf e.V.” and is entered in the register of associations at the Amtsgericht Saarlouis. Its seat is in Saarlouis. The financial year is the calendar year."
          },
          {
            title: "§ 2 Purpose of the association",
            body: "The purpose of the association is to promote sacred music at the Catholic parish church of St. Crispinus and Crispinianus, Saarlouis-Lisdorf. This includes in particular the care and maintenance of the MAYER organ, the organisation of sacred concerts and the promotion of the organ academy and the organ composition competition."
          },
          {
            title: "§ 3 Non-profit status",
            body: "The association pursues exclusively and directly non-profit purposes within the meaning of the section “Tax-privileged purposes” of the German fiscal code. Funds of the association may only be used for purposes in accordance with the statutes."
          },
          {
            title: "§ 4 Membership",
            body: "Any natural or legal person may become a member of the association. The board decides on admission. Membership ends through resignation, removal or death."
          },
          {
            title: "§ 5 Membership fees",
            body: "The amount of the membership fees is determined by the general assembly in a fee regulation."
          },
          {
            title: "§ 6 Bodies of the association",
            body: "The bodies of the association are the general assembly and the board. The board consists of at least three persons."
          }
        ]
      : [
          {
            title: "§ 1 Name, Sitz und Geschäftsjahr",
            body: "Der Verein führt den Namen „Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.“ und ist im Vereinsregister des Amtsgerichts Saarlouis eingetragen. Er hat seinen Sitz in Saarlouis. Das Geschäftsjahr ist das Kalenderjahr."
          },
          {
            title: "§ 2 Zweck des Vereins",
            body: "Zweck des Vereins ist die Förderung der Kirchenmusik in der katholischen Pfarrkirche St. Crispinus und Crispinianus, Saarlouis-Lisdorf. Dazu zählen insbesondere die Pflege und der Unterhalt der MAYER-Orgel, die Veranstaltung kirchenmusikalischer Konzerte sowie die Förderung der Orgelakademie und des Orgel-Kompositionswettbewerbs."
          },
          {
            title: "§ 3 Gemeinnützigkeit",
            body: "Der Verein verfolgt ausschließlich und unmittelbar gemeinnützige Zwecke im Sinne des Abschnitts „Steuerbegünstigte Zwecke“ der Abgabenordnung. Mittel des Vereins dürfen nur für satzungsgemäße Zwecke verwendet werden."
          },
          {
            title: "§ 4 Mitgliedschaft",
            body: "Mitglied des Vereins kann jede natürliche und jede juristische Person werden. Über die Aufnahme entscheidet der Vorstand. Die Mitgliedschaft endet durch Austritt, Streichung oder Tod."
          },
          {
            title: "§ 5 Mitgliedsbeiträge",
            body: "Die Höhe der Mitgliedsbeiträge wird von der Mitgliederversammlung in einer Beitragsordnung festgelegt."
          },
          {
            title: "§ 6 Organe des Vereins",
            body: "Organe des Vereins sind die Mitgliederversammlung und der Vorstand. Der Vorstand besteht aus mindestens drei Personen."
          }
        ];

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <section className="py-16">
        <div className="container-rail">
          <ol className="space-y-8">
            {paragraphs.map((p, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <li className="rounded-2xl border border-royal-700/10 bg-white p-6 shadow-card">
                  <h3 className="headline text-xl text-royal-800">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                    {p.body}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>

          <FadeIn>
            <p className="mt-10 text-sm italic text-neutral-500">{s.hint}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
