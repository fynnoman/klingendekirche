import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { getNewsById } from "@/lib/content/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const n = await getNewsById(id).catch(() => null);
  return { title: n?.title_de ?? "News" };
}

export default async function NewsDetail({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getNewsById(id).catch(() => null);
  if (!article || article.archived) notFound();

  const dateLabel = new Date(article.published_at + "T00:00:00Z").toLocaleDateString(
    "de-DE",
    { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }
  );

  return (
    <>
      <PageHero
        eyebrow={article.category_de ?? "News"}
        title={article.title_de}
        subtitle={article.excerpt_de ?? undefined}
      />
      <section className="py-16">
        <div className="container-rail">
          <FadeIn>
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {dateLabel}
            </div>
            <article
              className="prose-news mt-6 text-[16px] leading-relaxed text-neutral-800"
              dangerouslySetInnerHTML={{ __html: article.body_de }}
            />
            <div className="mt-10">
              <Link href="/termine" className="link-underline">
                ← Zur Übersicht
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      <style>{`
        .prose-news h2 { font-family: 'Instrument Serif', Georgia, serif; font-size: 1.85rem; color: #0a1033; margin: 1.4em 0 0.4em; }
        .prose-news h3 { font-family: 'Instrument Serif', Georgia, serif; font-size: 1.45rem; color: #0a1033; margin: 1.2em 0 0.3em; }
        .prose-news h4 { font-size: 1.15rem; font-weight: 600; color: #0a1033; margin: 1em 0 0.3em; }
        .prose-news p { margin: 0.7em 0; }
        .prose-news ul, .prose-news ol { margin: 0.7em 0 0.7em 1.25em; }
        .prose-news a { color: #0a1033; text-decoration: underline; }
      `}</style>
    </>
  );
}
