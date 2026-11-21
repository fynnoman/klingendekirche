import TermineView from "./TermineView";
import { listUpcomingEvents } from "@/lib/tickets/queries";
import type { EventRow } from "@/lib/tickets/types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function TermineePage() {
  let events: EventRow[] = [];
  try {
    events = await listUpcomingEvents();
  } catch (err) {
    console.error("[termine] db error", err);
  }
  return <TermineView events={events} />;
}
