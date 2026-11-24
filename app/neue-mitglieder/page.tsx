import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { listMembers } from "@/lib/content/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Neue Mitglieder" };

export default async function NeueMitgliederPage() {
  const all = await listMembers("new").catch(() => []);
  // Nach Jahr gruppieren
  const byYear = new Map<number, string[]>();
  for (const m of all) {
    if (!byYear.has(m.year)) byYear.set(m.year, []);
    byYear.get(m.year)!.push(m.name);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);
  const latestYear = years[0] ?? new Date().getFullYear();

  return (
    <>
      <PageHero
        eyebrow={`Jahr ${latestYear}`}
        title="Mit Freude begrüßen wir unsere neuen Mitglieder"
        subtitle="Danke, dass Sie die Kirchenmusik in Lisdorf mittragen."
      />

      <section className="py-16">
        <div className="container-rail space-y-12">
          {years.length === 0 && (
            <p className="text-neutral-600">
              Derzeit sind keine neuen Mitglieder eingetragen.
            </p>
          )}
          {years.map((year) => {
            const list = byYear.get(year) ?? [];
            return (
              <FadeIn key={year}>
                <div>
                  <h2 className="headline text-2xl font-medium text-royal-800 sm:text-3xl">
                    {year}
                  </h2>
                  <ul className="mt-4 divide-y divide-royal-700/10 overflow-hidden rounded-3xl border border-royal-700/10 bg-white shadow-card">
                    {list.map((m, idx) => (
                      <li
                        key={`${year}-${idx}-${m}`}
                        className="flex items-center gap-4 px-6 py-4 text-[15px] text-royal-800 sm:px-8"
                      >
                        <span
                          aria-hidden
                          className="h-2 w-2 shrink-0 rounded-full bg-gold-400"
                        />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}

          <FadeIn delay={0.1}>
            <div className="rounded-3xl border border-royal-700/10 bg-cream-100/70 p-8 sm:p-10">
              <p className="text-[15px] leading-relaxed text-neutral-700">
                Die Mitglieder unterstützen mit einem monatlichen Beitrag von 2,50 €
                (Jugendliche und Studenten zahlen monatlich 0,50 €) die Finanzierung
                der vielseitigen kirchenmusikalischen Vereinsaktivitäten in einer
                der schönsten Barockkirchen des Saarlandes.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                Im Namen des Vorstandes und der Vereinsmitglieder herzlichen Dank.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/mitgliedschaft" className="btn-primary">
                  Auch Mitglied werden
                </Link>
                <Link href="/nachruf" className="btn-ghost">
                  Nachruf
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
