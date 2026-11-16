import { notFound } from "next/navigation";
import { ORGEL_HISTORY } from "@/lib/data";
import { ORGEL_CONTENT } from "@/lib/orgelContent";
import OrgelChapterView from "./OrgelChapterView";
import { l } from "@/lib/i18n";

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
  const title = l(item.title, "de");
  const year = item.year ? l(item.year, "de") : "";
  return { title: `${title}${year ? " · " + year : ""}` };
}

export default async function OrgelSubPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = ORGEL_HISTORY.find((h) => h.slug === slug);
  if (!item) notFound();

  const content = ORGEL_CONTENT[slug] ?? null;
  const idx = ORGEL_HISTORY.findIndex((h) => h.slug === slug);
  const prev = idx > 0 ? ORGEL_HISTORY[idx - 1] : null;
  const next = idx < ORGEL_HISTORY.length - 1 ? ORGEL_HISTORY[idx + 1] : null;
  const others = ORGEL_HISTORY.filter((h) => h.slug !== slug);

  return (
    <OrgelChapterView
      item={item}
      content={content}
      prev={prev}
      next={next}
      others={others}
    />
  );
}
