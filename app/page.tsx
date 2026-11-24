import HomeView from "./HomeView";
import { getNextFeaturedEvent } from "@/lib/tickets/queries";
import type { EventRow } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  let featured: EventRow | null = null;
  try {
    featured = await getNextFeaturedEvent();
  } catch (err) {
    console.error("[home] db error", err);
  }

  return <HomeView featured={featured} />;
}
