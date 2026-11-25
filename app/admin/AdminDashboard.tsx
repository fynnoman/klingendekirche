"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { EventRow, OrderRow } from "@/lib/tickets/types";
import { formatEUR } from "@/lib/tickets/types";
import EventEditor from "./EventEditor";
import OrderDetailPanel from "./OrderDetailPanel";
import ContentHub from "./content/ContentHub";

type Tab = "konzerte" | "bestellungen" | "inhalte";

const STATUS_LABEL: Record<string, string> = {
  pending: "Wartet auf Zahlung",
  paid: "Bezahlt",
  cancelled: "Abgesagt",
  refunded: "Abgesagt",
  failed: "Fehlgeschlagen",
  expired: "Abgelaufen"
};
const STATUS_TONE: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  cancelled: "bg-neutral-100 text-neutral-600",
  refunded: "bg-neutral-100 text-neutral-600",
  failed: "bg-rose-50 text-rose-700",
  expired: "bg-neutral-100 text-neutral-500"
};

export default function AdminDashboard({
  dbError,
  stats,
  events,
  orders
}: {
  dbError: string | null;
  stats: {
    total: number;
    paid: number;
    cancelled: number;
    refunded: number;
    pending: number;
    gross_cents: number;
  };
  events: EventRow[];
  orders: OrderRow[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("konzerte");
  const [editing, setEditing] = useState<EventRow | "new" | null>(null);
  const [detailOrder, setDetailOrder] = useState<OrderRow | null>(null);
  const [isPending, startTransition] = useTransition();

  // Pro-Konzert Umsatz aus Bestellungen summieren
  const revenueByEvent = new Map<string, number>();
  for (const o of orders) {
    if (o.status === "paid") {
      revenueByEvent.set(
        o.event_id,
        (revenueByEvent.get(o.event_id) ?? 0) + o.amount_cents
      );
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function archiveEvent(id: string) {
    if (!confirm("Konzert archivieren? Es verschwindet aus der öffentlichen Übersicht."))
      return;
    const res = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      alert("Archivieren fehlgeschlagen.");
      return;
    }
    startTransition(() => router.refresh());
  }

  async function cancelOrder(orderId: string) {
    if (!confirm("Bestellung absagen? Der Besteller wird per E-Mail informiert."))
      return;
    const res = await fetch(`/api/admin/orders/${orderId}/refund`, { method: "POST" });
    if (!res.ok) {
      alert("Absage fehlgeschlagen.");
      return;
    }
    startTransition(() => router.refresh());
  }

  async function markPaid(orderId: string) {
    if (!confirm("Bestellung als bezahlt markieren? Der Besteller bekommt eine Bestätigung."))
      return;
    const res = await fetch(`/api/admin/orders/${orderId}/mark-paid`, {
      method: "POST"
    });
    if (!res.ok) {
      alert("Konnte nicht als bezahlt markiert werden.");
      return;
    }
    startTransition(() => router.refresh());
  }

  async function downloadCsv(eventId: string, title: string) {
    const res = await fetch(`/api/admin/orders/export?event=${encodeURIComponent(eventId)}`);
    if (!res.ok) {
      alert("Export fehlgeschlagen.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bestellungen-${eventId}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (editing) {
    return (
      <EventEditor
        initial={editing === "new" ? null : editing}
        onClose={() => {
          setEditing(null);
          startTransition(() => router.refresh());
        }}
      />
    );
  }

  return (
    <section className="pb-20">
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav className="inline-flex rounded-full border border-royal-700/15 bg-white p-1 text-[13px]">
            {([
              ["konzerte", "Konzerte"],
              ["bestellungen", "Bestellungen"],
              ["inhalte", "Inhalte"]
            ] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`rounded-full px-4 py-1.5 font-semibold transition ${
                  tab === key
                    ? "bg-royal-800 text-cream-50"
                    : "text-neutral-600 hover:text-royal-800"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-neutral-500">
              {isPending ? "Aktualisiert …" : "Live aus der Datenbank"}
            </span>
            <button
              onClick={logout}
              className="rounded-full border border-royal-700/15 bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-neutral-600 transition hover:text-royal-800"
            >
              Abmelden
            </button>
          </div>
        </div>

        {dbError && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-[14px] text-amber-900">
            <strong>DB nicht erreichbar:</strong> {dbError}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Bestellungen" value={stats.total} />
          <StatCard label="Bezahlt" value={stats.paid} />
          <StatCard label="Offen" value={stats.pending} />
          <StatCard label="Einnahmen" value={formatEUR(stats.gross_cents, "de")} />
        </div>

        {tab === "konzerte" && (
          <>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
              <h2 className="display text-2xl text-royal-800 sm:text-3xl">
                Konzerte ({events.length})
              </h2>
              <button
                type="button"
                onClick={() => setEditing("new")}
                className="btn-primary"
              >
                + Neues Konzert
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-royal-700/10 bg-white">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-cream-100/70 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                    <th className="px-4 py-3">Datum</th>
                    <th className="px-4 py-3">Konzert</th>
                    <th className="px-4 py-3">Preis</th>
                    <th className="px-4 py-3">Plätze</th>
                    <th className="px-4 py-3">Umsatz</th>
                    <th className="px-4 py-3">Verkauf</th>
                    <th className="px-4 py-3 text-right">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-neutral-500">
                        Noch keine Konzerte. „+ Neues Konzert" anlegen.
                      </td>
                    </tr>
                  )}
                  {events.map((e) => {
                    const daysUntil = Math.ceil(
                      (new Date(e.date + "T00:00:00Z").getTime() - Date.now()) /
                        (1000 * 60 * 60 * 24)
                    );
                    const past = daysUntil < 0;
                    const revenue = revenueByEvent.get(e.id) ?? 0;
                    return (
                      <tr key={e.id} className="border-t border-royal-700/8 align-top">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-neutral-700">{e.date}</div>
                          <div className="text-[11px] text-neutral-500">
                            {past
                              ? `vor ${Math.abs(daysUntil)} Tagen`
                              : daysUntil === 0
                                ? "heute"
                                : `in ${daysUntil} Tagen`}
                          </div>
                          {e.time && (
                            <div className="text-[11px] text-neutral-500">{e.time}</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-royal-800">{e.title_de}</div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {e.archived && (
                              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] uppercase tracking-wider text-neutral-500">
                                archiviert
                              </span>
                            )}
                            {e.highlight && !e.archived && (
                              <span className="rounded-full bg-gold-50 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold-700">
                                highlight
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {e.price_cents > 0 ? (
                            <>
                              <div>{formatEUR(e.price_cents, "de")}</div>
                              {e.price_reduced_cents && e.price_reduced_cents > 0 && (
                                <div className="text-[11px] text-neutral-500">
                                  erm. {formatEUR(e.price_reduced_cents, "de")}
                                </div>
                              )}
                            </>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">
                          {e.capacity > 0 ? (
                            <>
                              <div>{e.seats_sold} / {e.capacity}</div>
                              <div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-royal-700/10">
                                <div
                                  className="h-full bg-gold-500"
                                  style={{
                                    width: `${Math.min(100, Math.round((e.seats_sold / e.capacity) * 100))}%`
                                  }}
                                />
                              </div>
                            </>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">
                          {revenue > 0 ? formatEUR(revenue, "de") : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                              e.sale_active
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-neutral-100 text-neutral-500"
                            }`}
                          >
                            {e.sale_active ? "aktiv" : "inaktiv"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex flex-wrap justify-end gap-2">
                            {e.capacity > 0 && e.seats_sold > 0 && (
                              <Link
                                href={`/admin/einlass/${e.id}`}
                                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
                              >
                                Einlass
                              </Link>
                            )}
                            {e.capacity > 0 && e.seats_sold > 0 && (
                              <button
                                type="button"
                                onClick={() => downloadCsv(e.id, e.title_de)}
                                className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 transition hover:border-gold-300"
                              >
                                CSV
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setEditing(e)}
                              className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 transition hover:border-gold-300"
                            >
                              Bearbeiten
                            </button>
                            {!e.archived && (
                              <button
                                type="button"
                                onClick={() => archiveEvent(e.id)}
                                className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 transition hover:border-rose-300 hover:text-rose-700"
                              >
                                Archiv
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "inhalte" && (
          <div className="mt-10">
            <ContentHub />
          </div>
        )}

        {tab === "bestellungen" && (
          <>
            <h2 className="display mt-12 text-2xl text-royal-800 sm:text-3xl">
              Bestellungen
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-royal-700/10 bg-white">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-cream-100/70 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Konzert</th>
                    <th className="px-4 py-3">Besteller</th>
                    <th className="px-4 py-3">Karten</th>
                    <th className="px-4 py-3">Betrag</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Datum</th>
                    <th className="px-4 py-3 text-right">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-neutral-500">
                        Noch keine Bestellungen.
                      </td>
                    </tr>
                  )}
                  {orders.map((o) => {
                    const ev = events.find((e) => e.id === o.event_id);
                    return (
                      <tr
                        key={o.id}
                        onClick={() => setDetailOrder(o)}
                        className="cursor-pointer border-t border-royal-700/8 align-top transition hover:bg-cream-100/40"
                      >
                        <td className="px-4 py-3 font-mono text-[12px] text-neutral-500">
                          {o.id}
                        </td>
                        <td className="px-4 py-3 text-royal-800">
                          {ev?.title_de ?? o.event_id}
                          {ev && (
                            <div className="text-[11px] text-neutral-500">{ev.date}</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {o.buyer_name}
                          <div className="text-[11px] text-neutral-500">
                            {o.buyer_email}
                          </div>
                        </td>
                        <td className="px-4 py-3">{o.quantity}</td>
                        <td className="px-4 py-3">{formatEUR(o.amount_cents, "de")}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_TONE[o.status] ?? "bg-neutral-100 text-neutral-600"}`}
                          >
                            {STATUS_LABEL[o.status] ?? o.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-500">
                          {new Date(o.created_at).toLocaleString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        <td
                          className="px-4 py-3 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setDetailOrder(o)}
                              className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 transition hover:border-gold-300"
                            >
                              Details
                            </button>
                            {o.status === "pending" && (
                              <button
                                onClick={() => markPaid(o.id)}
                                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-100"
                              >
                                Als bezahlt
                              </button>
                            )}
                            {(o.status === "paid" || o.status === "pending") && (
                              <button
                                onClick={() => cancelOrder(o.id)}
                                className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 transition hover:border-rose-300 hover:text-rose-700"
                              >
                                Absagen
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {detailOrder && (
        <OrderDetailPanel
          order={detailOrder}
          event={events.find((e) => e.id === detailOrder.event_id)}
          onClose={() => setDetailOrder(null)}
          onChanged={() => startTransition(() => router.refresh())}
          onCancel={cancelOrder}
          onMarkPaid={markPaid}
        />
      )}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-royal-700/10 bg-white p-5 shadow-card">
      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
        {label}
      </div>
      <div className="display mt-2 text-3xl text-royal-800">{value}</div>
    </div>
  );
}
