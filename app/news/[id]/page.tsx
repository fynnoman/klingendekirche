import { notFound } from "next/navigation";
import { NEWS } from "@/lib/data";
import NewsDetailView from "./NewsDetailView";

export function generateStaticParams() {
  return NEWS.map((n) => ({ id: n.id }));
}

export default async function NewsDetail({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = NEWS.find((n) => n.id === id);
  if (!article) notFound();
  return <NewsDetailView article={article} />;
}
