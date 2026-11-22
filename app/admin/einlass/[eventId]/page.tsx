import { notFound, redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin-auth";
import { getEventById, listPaidOrdersForEvent } from "@/lib/tickets/queries";
import EinlassView from "./EinlassView";

export const dynamic = "force-dynamic";
export const metadata = { title: "Einlass" };

export default async function EinlassPage({
  params
}: {
  params: Promise<{ eventId: string }>;
}) {
  if (!(await isAdminRequest())) {
    redirect("/admin/login");
  }

  const { eventId } = await params;
  const event = await getEventById(eventId).catch(() => null);
  if (!event) notFound();

  const orders = await listPaidOrdersForEvent(eventId).catch(() => []);

  return <EinlassView event={event} initialOrders={orders} />;
}
