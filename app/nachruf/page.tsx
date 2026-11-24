import Link from "next/link";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { listMembers } from "@/lib/content/queries";

export const dynamic = "force-dynamic";
export const metadata = { title: "Nachruf" };

export default async function NachrufPage() {
  const all = await listMembers("deceased").catch(() => []);
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
        eyebrow={`In Gedenken · ${latestYear}`}
        title="Wir betrauern den Tod unserer verstorbenen Vereinsmitglieder"
        subtitle="Wir gedenken ihnen mit großer Dankbarkeit."
      />

      <section className="py-16">
        <div className="container-rail space-y-12">
          {years.length === 0 && (
            <p className="text-neutral-600">
              Derzeit sind keine Einträge im Nachruf.
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
                        className="flex items-center gap-4 px-6 py-5 text-[15px] text-royal-800 sm:px-8"
                      >
                        <span
                          aria-hidden
                          className="h-px w-6 shrink-0 bg-royal-700/30"
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
                Die Verstorbenen haben sich als langjährige und engagierte
                Mitglieder um die Förderung einer anspruchsvollen Kirchenmusik
                verdient gemacht. Wir gedenken ihnen mit großer Dankbarkeit. Den
                Familien gilt unsere aufrichtige Anteilnahme.
              </p>
              <p className="mt-6 text-[13px] uppercase tracking-[0.18em] text-gold-700">
                Der Vorstand des Fördervereins „Klingende Kirche"
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/neue-mitglieder" className="btn-ghost">
                  Neue Mitglieder
                </Link>
                <Link href="/mitgliedschaft" className="btn-ghost">
                  Mitgliedschaft
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
