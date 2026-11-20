"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { OrderRow, TicketEventRow } from "@/lib/tickets/types";
import { formatEUR } from "@/lib/tickets/types";

type CatalogItem = { id: string; title: string; dateLabel: string; venue: string };

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
  orders,
  catalog
}: {
  dbError: string | null;
  stats: { total: number; paid: number; cancelled: number; refunded: number; pending: number; gross_cents: number };
  events: TicketEventRow[];
  orders: OrderRow[];
  catalog: CatalogItem[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function saveEvent(input: {
    eventId: string;
    priceCents: number;
    capacity: number;
    active: boolean;
  }) {
    await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });
    startTransition(() => router.refresh());
  }

  async function toggleActive(eventId: string, active: boolean) {
    await fetch("/api/admin/events", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, active })
    });
    startTransition(() => router.refresh());
  }

  async function refundOrder(orderId: string) {
    if (!confirm("Diese Bestellung stornieren und bei bezahlten Bestellungen den Betrag erstatten?"))
      return;
    const res = await fetch(`/api/admin/orders/${orderId}/refund`, {
      method: "POST"
    });
    if (!res.ok) {
      alert("Erstattung fehlgeschlagen.");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <section className="pb-20">
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[13px] text-neutral-500">
            {isPending ? "Aktualisiert …" : "Live aus der Datenbank"}
          </div>
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
            <br />
            <span className="text-[12px] text-amber-800/90">
              DATABASE_URL setzen und <code>scripts/schema.sql</code> einmalig
              auf der Neon-Datenbank ausführen.
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Bestellungen" value={stats.total} />
          <StatCard label="Bezahlt" value={stats.paid} />
          <StatCard label="Offen" value={stats.pending} />
          <StatCard label="Erstattet" value={stats.refunded} />
          <StatCard
            label="Bruttoumsatz"
            value={formatEUR(stats.gross_cents, "de")}
          />
        </div>

        {/* Events */}
        <h2 className="display mt-14 text-2xl text-royal-800 sm:text-3xl">
          Konzerte & Preise
        </h2>
        <p className="mt-2 text-[14px] text-neutral-600">
          Für jedes Konzert aus dem Programm können hier Preis, Kapazität und
          Verkauf aktiviert werden.
        </p>

        <div className="mt-6 space-y-3">
          {catalog.map((c) => {
            const row = events.find((e) => e.event_id === c.id);
            return (
              <EventRow
                key={c.id}
                item={c}
                ticketEvent={row}
                onSave={saveEvent}
                onToggle={toggleActive}
              />
            );
          })}
        </div>

        {/* Orders */}
        <h2 className="display mt-14 text-2xl text-royal-800 sm:text-3xl">
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
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-neutral-500"
                  >
                    Noch keine Bestellungen.
                  </td>
                </tr>
              )}
              {orders.map((o) => {
                const cat = catalog.find((c) => c.id === o.event_id);
                return (
                  <tr key={o.id} className="border-t border-royal-700/8 align-top">
                    <td className="px-4 py-3 font-mono text-[12px] text-neutral-500">
                      {o.id}
                    </td>
                    <td className="px-4 py-3 text-royal-800">
                      {cat?.title ?? o.event_id}
                      <div className="text-[11px] text-neutral-500">
                        {cat?.dateLabel}
                      </div>
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

function EventRow({
  item,
  ticketEvent,
  onSave,
  onToggle
}: {
  item: CatalogItem;
  ticketEvent?: TicketEventRow;
  onSave: (v: {
    eventId: string;
    priceCents: number;
    capacity: number;
    active: boolean;
  }) => void;
  onToggle: (eventId: string, active: boolean) => void;
}) {
  const [price, setPrice] = useState(
    ticketEvent ? (ticketEvent.price_cents / 100).toFixed(2) : "0.00"
  );
  const [capacity, setCapacity] = useState(
    ticketEvent ? String(ticketEvent.capacity) : "0"
  );

  const configured = !!ticketEvent;

  return (
    <div className="rounded-2xl border border-royal-700/10 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-gold-600">
            {item.dateLabel}
          </div>
          <div className="headline mt-1 text-lg text-royal-800">{item.title}</div>
          <div className="text-[12px] text-neutral-500">{item.venue}</div>
        </div>
        {configured && (
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-neutral-500">
              {ticketEvent!.seats_sold} / {ticketEvent!.capacity} verkauft
            </span>
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={ticketEvent!.active}
                onChange={(e) => onToggle(item.id, e.target.checked)}
                className="h-4 w-4 rounded border-royal-700/30"
              />
              <span className="text-[12px] font-semibold text-royal-800">
                Verkauf aktiv
              </span>
            </label>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const p = parseFloat(price.replace(",", "."));
          const c = parseInt(capacity, 10);
          if (!Number.isFinite(p) || !Number.isFinite(c)) return;
          onSave({
            eventId: item.id,
            priceCents: Math.round(p * 100),
            capacity: c,
            active: ticketEvent?.active ?? true
          });
        }}
        className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]"
      >
        <label className="grid gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-neutral-500">
            Preis pro Karte (€)
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-xl border border-royal-700/15 bg-white px-4 py-2 text-[14px] outline-none focus:border-gold-400"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-neutral-500">
            Kapazität
          </span>
          <input
            type="number"
            min="0"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="rounded-xl border border-royal-700/15 bg-white px-4 py-2 text-[14px] outline-none focus:border-gold-400"
          />
        </label>
        <button
          type="submit"
          className="self-end rounded-xl bg-royal-800 px-5 py-2.5 text-[13px] font-semibold text-cream-50 transition hover:bg-royal-700"
        >
          {configured ? "Speichern" : "Verkauf freischalten"}
        </button>
      </form>
    </div>
  );
}
