"use client";

import { useRouter } from "next/navigation";
import type { EventRow, OrderRow } from "@/lib/tickets/types";
import { formatEUR } from "@/lib/tickets/types";

const STATUS_LABEL: Record<string, string> = {
  pending: "Offen",
  paid: "Bezahlt",
  cancelled: "Storniert",
  refunded: "Erstattet",
  failed: "Fehlgeschlagen",
  expired: "Abgelaufen"
};
const STATUS_TONE: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  cancelled: "bg-neutral-100 text-neutral-600",
  refunded: "bg-rose-50 text-rose-700",
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

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function refundOrder(orderId: string) {
    if (!confirm("Diese Bestellung stornieren bzw. bei bezahlten Bestellungen erstatten?")) return;
    const res = await fetch(`/api/admin/orders/${orderId}/refund`, { method: "POST" });
    if (!res.ok) {
      alert("Erstattung fehlgeschlagen.");
      return;
    }
    router.refresh();
  }

  return (
    <section className="pb-20">
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[13px] text-neutral-500">Live aus der Datenbank</div>
          <button
            onClick={logout}
            className="rounded-full border border-royal-700/15 bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-wider text-neutral-600 transition hover:text-royal-800"
          >
            Abmelden
          </button>
        </div>

        {dbError && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-[14px] text-amber-900">
            <strong>DB nicht erreichbar:</strong> {dbError}
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-royal-700/10 bg-cream-100/70 px-5 py-4 text-[13px] text-neutral-700">
          Die Konzert-Verwaltung mit Erstellen, Bearbeiten und Stripe-Produkt-Sync
          wird gerade gebaut (Phase 3). Aktuell siehst du eine Übersicht der
          Konzerte und alle Bestellungen inkl. Storno-Button.
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Bestellungen" value={stats.total} />
          <StatCard label="Bezahlt" value={stats.paid} />
          <StatCard label="Offen" value={stats.pending} />
          <StatCard label="Erstattet" value={stats.refunded} />
          <StatCard label="Bruttoumsatz" value={formatEUR(stats.gross_cents, "de")} />
        </div>

        <h2 className="display mt-14 text-2xl text-royal-800 sm:text-3xl">
          Konzerte ({events.length})
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-royal-700/10 bg-white">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-cream-100/70 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Konzert</th>
                <th className="px-4 py-3">Preis</th>
                <th className="px-4 py-3">Plätze</th>
                <th className="px-4 py-3">Verkauf</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-neutral-500">
                    Noch keine Konzerte.
                  </td>
                </tr>
              )}
              {events.map((e) => (
                <tr key={e.id} className="border-t border-royal-700/8">
                  <td className="px-4 py-3 whitespace-nowrap text-neutral-700">{e.date}</td>
                  <td className="px-4 py-3 text-royal-800">
                    {e.title_de}
                    {e.archived && (
                      <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] uppercase tracking-wider text-neutral-500">
                        archiviert
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {e.price_cents > 0 ? formatEUR(e.price_cents, "de") : "—"}
                  </td>
                  <td className="px-4 py-3 text-neutral-700">
                    {e.capacity > 0 ? `${e.seats_sold} / ${e.capacity}` : "—"}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="display mt-14 text-2xl text-royal-800 sm:text-3xl">Bestellungen</h2>
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
                  <tr key={o.id} className="border-t border-royal-700/8 align-top">
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
                      <div className="text-[11px] text-neutral-500">{o.buyer_email}</div>
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
                    <td className="px-4 py-3 text-right">
                      {(o.status === "paid" || o.status === "pending") && (
                        <button
                          onClick={() => refundOrder(o.id)}
                          className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[11px] font-semibold text-royal-800 transition hover:border-rose-300 hover:text-rose-700"
                        >
                          Stornieren
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
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
