"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EventRow, OrderRow } from "@/lib/tickets/types";
import { formatEventDate } from "@/lib/tickets/types";

export default function EinlassView({
  event,
  initialOrders
}: {
  event: EventRow;
  initialOrders: OrderRow[];
}) {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [showOnlyOpen, setShowOnlyOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (showOnlyOpen && o.checked_in_count >= o.quantity) return false;
      if (!q) return true;
      return (
        o.buyer_name.toLowerCase().includes(q) ||
        o.buyer_email.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
      );
    });
  }, [orders, query, showOnlyOpen]);

  const totalBooked = orders.reduce((n, o) => n + o.quantity, 0);
  const totalChecked = orders.reduce((n, o) => n + o.checked_in_count, 0);

  async function updateCount(orderId: string, nextCount: number) {
    const safe = Math.max(0, Math.min(10, nextCount));
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, checked_in_count: safe, checked_in_at: safe > 0 ? (o.checked_in_at ?? new Date().toISOString()) : null } : o
      )
    );
    const res = await fetch(`/api/admin/orders/${orderId}/check-in`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: safe })
    });
    if (!res.ok) {
      alert("Konnte Einlass nicht speichern.");
    }
  }

  return (
    <section className="pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 border-b border-royal-700/10 bg-cream-50/95 backdrop-blur">
        <div className="container-wide py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
                Einlass
              </div>
              <h1 className="display mt-1 text-2xl text-royal-800 sm:text-3xl">
                {event.title_de}
              </h1>
              <div className="mt-1 text-[13px] text-neutral-600">
                {formatEventDate(event.date, "de")}
                {event.time ? ` · ${event.time}` : ""}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="display text-3xl text-royal-800 sm:text-4xl">
                {totalChecked}{" "}
                <span className="text-neutral-400">/</span> {totalBooked}
              </div>
              <div className="text-[11px] uppercase tracking-wider text-neutral-500">
                eingelassen
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, E-Mail oder Bestellnummer suchen …"
              className="min-w-[220px] flex-1 rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
              autoFocus
            />
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[13px]">
              <input
                type="checkbox"
                checked={showOnlyOpen}
                onChange={(e) => setShowOnlyOpen(e.target.checked)}
                className="h-4 w-4 rounded border-royal-700/30"
              />
              Nur offene
            </label>
            <Link
              href="/admin"
              className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[13px] font-semibold text-royal-800 hover:border-gold-300"
            >
              Zurück zum Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="container-wide pt-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-royal-700/20 bg-white p-10 text-center text-sm text-neutral-500">
            {orders.length === 0
              ? "Noch keine bezahlten Bestellungen für dieses Konzert."
              : "Keine Treffer."}
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((o) => (
              <EinlassRow key={o.id} order={o} onUpdate={updateCount} />
            ))}
          </ul>
        )}

        <p className="mt-10 text-[12px] text-neutral-500">
          Tipp: Öffnet diese Seite am besten auf einem Tablet oder Smartphone an der
          Abendkasse. Änderungen werden sofort gespeichert.
        </p>
      </div>
    </section>
  );
}

function EinlassRow({
  order,
  onUpdate
}: {
  order: OrderRow;
  onUpdate: (orderId: string, nextCount: number) => Promise<void> | void;
}) {
  const isFull = order.checked_in_count >= order.quantity;
  const isOpen = order.checked_in_count === 0;

  return (
    <li
      className={`rounded-2xl border bg-white p-4 shadow-card transition sm:p-5 ${
        isFull
          ? "border-emerald-200 bg-emerald-50/60"
          : isOpen
            ? "border-royal-700/10"
            : "border-amber-200 bg-amber-50/40"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-lg font-semibold text-royal-800 sm:text-xl">
            {order.buyer_name}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-neutral-500">
            <span className="truncate">{order.buyer_email}</span>
            <span className="font-mono">#{order.id}</span>
            {order.note && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-800">
                Notiz: {order.note}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdate(order.id, order.checked_in_count - 1)}
            disabled={order.checked_in_count === 0}
            className="h-11 w-11 rounded-xl border border-royal-700/15 bg-white text-xl text-royal-800 transition hover:border-gold-300 disabled:opacity-40"
            aria-label="Weniger"
          >
            −
          </button>
          <div className="flex min-w-[76px] flex-col items-center rounded-xl border border-royal-700/15 bg-cream-50 px-4 py-2">
            <div className="display text-2xl leading-none text-royal-800">
              {order.checked_in_count}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500">
              von {order.quantity}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onUpdate(order.id, order.checked_in_count + 1)}
            disabled={order.checked_in_count >= order.quantity}
            className="h-11 w-11 rounded-xl border border-royal-700/15 bg-white text-xl text-royal-800 transition hover:border-gold-300 disabled:opacity-40"
            aria-label="Mehr"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => onUpdate(order.id, order.quantity)}
            disabled={isFull}
            className="ml-2 hidden rounded-xl bg-royal-800 px-4 py-2 text-[12px] font-semibold text-cream-50 transition hover:bg-royal-700 disabled:opacity-40 sm:inline-flex"
          >
            Alle
          </button>
        </div>
      </div>
    </li>
  );
}
