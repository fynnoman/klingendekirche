import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import Collapsible from "@/components/Collapsible";
import { ORGEL_HISTORY } from "@/lib/data";
import { ORGEL_CONTENT, type OrgelSection } from "@/lib/orgelContent";

export function generateStaticParams() {
  return ORGEL_HISTORY.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = ORGEL_HISTORY.find((h) => h.slug === slug);
  if (!item) return { title: "Orgel" };
  return { title: `${item.title}${item.year ? " · " + item.year : ""}` };
}

function SectionBody({ s }: { s: OrgelSection }) {
  return (
    <div className="space-y-5">
      {s.paragraphs?.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      {s.quote && (
        <blockquote className="border-l-2 border-gold-400 bg-cream-100/70 px-5 py-4 italic text-neutral-800">
          „{s.quote}"
        </blockquote>
      )}

      {s.disposition && (
        <div className="mt-2 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.disposition.map((d) => (
            <div
              key={d.heading}
              className="rounded-xl border border-royal-700/10 bg-cream-50 p-5"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                Disposition
              </div>
              <div className="headline mt-1 text-base text-royal-800">
                {d.heading}
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-neutral-800">
                {d.stops.map((stop) => (
                  <li key={stop} className="font-mono text-[13px] leading-snug">
                    {stop}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {s.listing && (
        <ul className="divide-y divide-royal-700/10 overflow-hidden rounded-xl border border-royal-700/10 bg-cream-50">
          {s.listing.map((row) => (
            <li
              key={row.date}
              className="grid gap-3 px-5 py-3 sm:grid-cols-[120px_1fr] sm:items-baseline sm:gap-6"
            >
              <div className="font-mono text-sm text-gold-700">{row.date}</div>
              <div className="space-y-1">
                {row.lines.map((l, i) => (
                  <div
                    key={i}
                    className={
                      i === 0
                        ? "text-sm font-medium text-royal-800"
                        : "text-sm text-neutral-700"
                    }
                  >
                    {l}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {s.footnote && (
        <div className="pt-2 text-right text-sm font-semibold uppercase tracking-[0.18em] text-gold-700">
          {s.footnote}
        </div>
      )}
    </div>
  );
}

export default async function OrgelSubPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = ORGEL_HISTORY.find((h) => h.slug === slug);
  if (!item) notFound();

  const content = ORGEL_CONTENT[slug];
  const others = ORGEL_HISTORY.filter((h) => h.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={
          item.year
            ? `Lisdorfer Orgelgeschichte · ${item.year}`
            : "Lisdorfer Orgelgeschichte"
        }
        title={item.title}
        subtitle={content?.lead}
      />

      <section className="py-12 sm:py-16">
        <div className="container-rail">
          {content ? (
            <div className="space-y-4">
              {content.sections.map((s, i) => (
                <FadeIn key={s.title + i} delay={Math.min(i * 0.04, 0.2)}>
                  <Collapsible
                    title={s.title}
                    eyebrow={s.eyebrow}
                    defaultOpen={s.defaultOpen ?? i === 0}
                  >
                    <SectionBody s={s} />
                  </Collapsible>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="rounded-3xl border border-royal-700/10 bg-white p-10 text-center shadow-card sm:p-14">
                <div className="eyebrow justify-center">In Vorbereitung</div>
                <h2 className="display mt-4 text-2xl text-royal-800 sm:text-3xl">
                  Inhalt folgt
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-700">
                  An dieser Stelle entsteht eine ausführliche Darstellung zu „
                  {item.title}
                  {item.year ? `, ${item.year}` : ""}". Schauen Sie bald wieder
                  vorbei.
                </p>
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.15}>
            <div className="mt-14">
              <div className="eyebrow mb-4">Weitere Kapitel</div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/orgel/${o.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-royal-700/10 bg-cream-50 p-5 transition hover:border-gold-300"
                    >
                      <div>
                        {o.year && (
                          <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
                            {o.year}
                          </div>
                        )}
                        <div className="headline mt-1 text-base text-royal-800">
                          {o.title}
                        </div>
                      </div>
                      <span className="text-royal-700 group-hover:text-gold-600">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <Link href="/orgel" className="btn-ghost">
                  Zurück zur Orgel
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
