import TermineView from "./TermineView";
import { listUpcomingEvents } from "@/lib/tickets/queries";
import { listPublicNews } from "@/lib/content/queries";
import type { EventRow } from "@/lib/tickets/types";
import type { NewsRow } from "@/lib/content/types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function TermineePage() {
  let events: EventRow[] = [];
  let news: NewsRow[] = [];
  try {
    [events, news] = await Promise.all([
      listUpcomingEvents(),
      listPublicNews()
    ]);
  } catch (err) {
    console.error("[termine] db error", err);
  }
  return <TermineView events={events} news={news} />;
}
