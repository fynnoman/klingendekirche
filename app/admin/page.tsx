import { redirect } from "next/navigation";
import PageHero from "@/components/PageHero";
import AdminDashboard from "./AdminDashboard";
import { isAdminRequest } from "@/lib/admin-auth";
import {
  countStats,
  getAllTicketEvents,
  listOrders
} from "@/lib/tickets/queries";
import { EVENTS } from "@/lib/data";
import { l } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminPage() {
  if (!(await isAdminRequest())) {
    redirect("/admin/login");
  }

  let events: Awaited<ReturnType<typeof getAllTicketEvents>> = [];
  let orders: Awaited<ReturnType<typeof listOrders>> = [];
  let stats = { total: 0, paid: 0, cancelled: 0, refunded: 0, pending: 0, gross_cents: 0 };
  let dbError: string | null = null;

  try {
    [events, orders, stats] = await Promise.all([
      getAllTicketEvents(),
      listOrders({ limit: 200 }),
      countStats()
    ]);
  } catch (err) {
    dbError = err instanceof Error ? err.message : String(err);
  }

  const catalog = EVENTS.map((e) => ({
    id: e.id,
    title: l(e.title, "de"),
    dateLabel: l(e.dateLabel, "de"),
    venue: l(e.venue, "de")
  }));

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Dashboard"
        subtitle="Übersicht der Konzertkarten-Bestellungen und Preise."
      />
      <AdminDashboard
        dbError={dbError}
        stats={stats}
        events={events}
        orders={orders}
        catalog={catalog}
      />
    </>
  );
}
