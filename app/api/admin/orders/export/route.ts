import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getEventById, listOrders } from "@/lib/tickets/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvEscape(v: string): string {
  if (v.includes("\"") || v.includes(",") || v.includes("\n")) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

export async function GET(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const eventId = url.searchParams.get("event") ?? undefined;

  const orders = await listOrders({ eventId, limit: 500 });
  const event = eventId ? await getEventById(eventId).catch(() => null) : null;
  const filename = event
    ? `bestellungen-${event.id}-${event.date}.csv`
    : "bestellungen.csv";

  const header = [
    "Bestellnummer",
    "Status",
    "Besteller",
    "Straße",
    "PLZ",
    "Ort",
    "Telefon",
    "E-Mail",
    "Karten",
    "davon ermäßigt",
    "Betrag (EUR)",
    "Bestellt am",
    "Bezahlt am",
    "Konzert",
    "Datum"
  ];

  const rows = orders.map((o) => [
    o.id,
    o.status,
    o.buyer_name,
    o.buyer_street ?? "",
    o.buyer_postal_code ?? "",
    o.buyer_city ?? "",
    o.buyer_phone ?? "",
    o.buyer_email ?? "",
    String(o.quantity),
    String(o.quantity_reduced ?? 0),
    (o.amount_cents / 100).toFixed(2),
    new Date(o.created_at).toISOString(),
    o.paid_at ? new Date(o.paid_at).toISOString() : "",
    event?.title_de ?? o.event_id,
    event?.date ?? ""
  ]);

  const csv =
    "﻿" +
    [header, ...rows].map((r) => r.map((c) => csvEscape(c)).join(",")).join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
