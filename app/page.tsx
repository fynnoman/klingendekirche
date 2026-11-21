import HomeView from "./HomeView";
import {
  getNextFeaturedEvent,
  listUpcomingEvents
} from "@/lib/tickets/queries";
import type { EventRow } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  let featured: EventRow | null = null;
  let upcoming: EventRow[] = [];
  try {
    [featured, upcoming] = await Promise.all([
      getNextFeaturedEvent(),
      listUpcomingEvents()
    ]);
  } catch (err) {
    console.error("[home] db error", err);
  }

  // Featured aus upcoming filtern, damit es nicht doppelt erscheint
  const upcomingWithoutFeatured = upcoming.filter((e) => e.id !== featured?.id);

  return <HomeView featured={featured} upcoming={upcomingWithoutFeatured} />;
}
