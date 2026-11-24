"use client";

import { useEffect, useState } from "react";
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

type FeedbackState = {
  kind: "idle" | "success" | "error";
  text?: string;
};

export default function OrderDetailPanel({
  order: initialOrder,
  event,
  onClose,
  onChanged,
  onRefund
}: {
  order: OrderRow;
  event?: EventRow;
  onClose: () => void;
  onChanged: () => void;
  onRefund: (orderId: string) => void;
}) {
  const [order, setOrder] = useState(initialOrder);
  const [buyerName, setBuyerName] = useState(initialOrder.buyer_name);
  const [buyerEmail, setBuyerEmail] = useState(initialOrder.buyer_email);
  const [note, setNote] = useState(initialOrder.note ?? "");
  const [savingBuyer, setSavingBuyer] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);
  const [fb, setFb] = useState<FeedbackState>({ kind: "idle" });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function patch(payload: Record<string, unknown>) {
    const res = await fetch(`/api/admin/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.ok === false) {
      throw new Error(data?.error ?? `${res.status}`);
    }
    if (data?.order) setOrder(data.order as OrderRow);
    onChanged();
  }

  async function saveBuyer() {
    setSavingBuyer(true);
    setFb({ kind: "idle" });
    try {
      await patch({ buyer_name: buyerName, buyer_email: buyerEmail });
      setFb({ kind: "success", text: "Besteller-Daten gespeichert." });
    } catch (err) {
      setFb({
        kind: "error",
        text:
          err instanceof Error && err.message === "invalid_email"
            ? "Ungültige E-Mail."
            : "Speichern fehlgeschlagen."
      });
    } finally {
      setSavingBuyer(false);
    }
  }

  async function saveNote() {
    setSavingNote(true);
    setFb({ kind: "idle" });
    try {
      await patch({ note });
      setFb({ kind: "success", text: "Notiz gespeichert." });
    } catch {
      setFb({ kind: "error", text: "Speichern fehlgeschlagen." });
    } finally {
      setSavingNote(false);
    }
  }

  async function resendMail() {
    setSendingMail(true);
    setFb({ kind: "idle" });
    const res = await fetch(`/api/admin/orders/${order.id}/resend`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setSendingMail(false);
    if (!res.ok || data?.ok === false) {
      setFb({
        kind: "error",
        text:
          data?.error === "not_paid"
            ? "Nur bei bezahlten Bestellungen möglich."
            : data?.detail
              ? `Fehler: ${data.detail}`
              : "Mail-Versand fehlgeschlagen."
      });
      return;
    }
    setFb({ kind: "success", text: `Bestätigung erneut an ${order.buyer_email} verschickt.` });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
      />
      <aside className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-plate">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-royal-700/10 bg-white px-6 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold-600">
              Bestellung
            </div>
            <div className="font-mono text-[13px] text-neutral-700">{order.id}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-royal-700/15 bg-white px-3 py-1.5 text-[12px] font-semibold text-neutral-600 hover:text-royal-800"
          >
            Esc · Schließen
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <section>
            <div className="flex items-center justify-between">
              <h3 className="headline text-xl text-royal-800">
                {event?.title_de ?? order.event_id}
              </h3>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-medium text-neutral-700">
                {STATUS_LABEL[order.status] ?? order.status}
              </span>
            </div>
            <div className="mt-1 text-[12px] text-neutral-500">
              {event ? `${event.date}${event.time ? " · " + event.time : ""}` : ""}
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
              <div className="rounded-xl border border-royal-700/10 bg-cream-50 px-4 py-3">
                <dt className="text-[10px] uppercase tracking-wider text-gold-600">Karten</dt>
                <dd className="mt-0.5 text-royal-800">
                  {order.quantity}
                  {order.quantity_reduced > 0 && (
                    <div className="text-[11px] text-neutral-500">
                      davon {order.quantity_reduced} ermäßigt
                    </div>
                  )}
                </dd>
              </div>
              <div className="rounded-xl border border-royal-700/10 bg-cream-50 px-4 py-3">
                <dt className="text-[10px] uppercase tracking-wider text-gold-600">Betrag</dt>
                <dd className="mt-0.5 text-royal-800">{formatEUR(order.amount_cents, "de")}</dd>
              </div>
              <div className="rounded-xl border border-royal-700/10 bg-cream-50 px-4 py-3">
                <dt className="text-[10px] uppercase tracking-wider text-gold-600">Bestellt</dt>
                <dd className="mt-0.5 text-royal-800">
                  {new Date(order.created_at).toLocaleString("de-DE")}
                </dd>
              </div>
              <div className="rounded-xl border border-royal-700/10 bg-cream-50 px-4 py-3">
                <dt className="text-[10px] uppercase tracking-wider text-gold-600">Bezahlt</dt>
                <dd className="mt-0.5 text-royal-800">
                  {order.paid_at ? new Date(order.paid_at).toLocaleString("de-DE") : "—"}
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-3">
            <h3 className="eyebrow">Besteller</h3>
            <label className="grid gap-1.5">
              <span className="text-[12px] font-medium text-neutral-700">Name</span>
              <input
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="rounded-xl border border-royal-700/15 bg-white px-4 py-2 text-[14px] outline-none focus:border-gold-400"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-[12px] font-medium text-neutral-700">E-Mail</span>
              <input
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="rounded-xl border border-royal-700/15 bg-white px-4 py-2 text-[14px] outline-none focus:border-gold-400"
              />
            </label>
            <div>
              <button
                type="button"
                onClick={saveBuyer}
                disabled={
                  savingBuyer ||
                  (buyerName === order.buyer_name && buyerEmail === order.buyer_email)
                }
                className="rounded-full border border-royal-700/15 bg-white px-4 py-2 text-[12px] font-semibold text-royal-800 transition hover:border-gold-300 disabled:opacity-50"
              >
                {savingBuyer ? "Speichert …" : "Besteller speichern"}
              </button>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="eyebrow">Interne Notiz</h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder='Nur für den Admin sichtbar, z.B. „Gehört zur Chorgemeinschaft, VIP-Sitzreihe".'
              rows={3}
              className="w-full rounded-xl border border-royal-700/15 bg-white px-4 py-2 text-[14px] outline-none focus:border-gold-400"
            />
            <div>
              <button
                type="button"
                onClick={saveNote}
                disabled={savingNote || note === (order.note ?? "")}
                className="rounded-full border border-royal-700/15 bg-white px-4 py-2 text-[12px] font-semibold text-royal-800 transition hover:border-gold-300 disabled:opacity-50"
              >
                {savingNote ? "Speichert …" : "Notiz speichern"}
              </button>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="eyebrow">Aktionen</h3>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resendMail}
                disabled={sendingMail || order.status !== "paid"}
                className="rounded-full bg-royal-800 px-5 py-2 text-[13px] font-semibold text-cream-50 transition hover:bg-royal-700 disabled:opacity-50"
              >
                {sendingMail ? "Sendet …" : "Bestätigung erneut senden"}
              </button>
              {(order.status === "paid" || order.status === "pending") && (
                <button
                  type="button"
                  onClick={() => {
                    onRefund(order.id);
                    onClose();
                  }}
                  className="rounded-full border border-rose-200 bg-rose-50 px-5 py-2 text-[13px] font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                  Stornieren / Erstatten
                </button>
              )}
            </div>
            {order.checked_in_count > 0 && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-[12.5px] text-emerald-800">
                Bereits eingelassen: {order.checked_in_count} / {order.quantity}
                {order.checked_in_at && (
                  <> · seit {new Date(order.checked_in_at).toLocaleString("de-DE")}</>
                )}
              </div>
            )}
          </section>

          {fb.kind === "success" && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-[12.5px] text-emerald-800">
              {fb.text}
            </div>
          )}
          {fb.kind === "error" && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-[12.5px] text-rose-800">
              {fb.text}
            </div>
          )}

          <section className="rounded-xl border border-royal-700/10 bg-cream-50 px-4 py-3 text-[11px] text-neutral-500">
            <div>
              Token (Kunden-Portal): <span className="font-mono">{order.token}</span>
            </div>
            {order.stripe_payment_intent_id && (
              <div className="mt-1">
                Stripe PI: <span className="font-mono">{order.stripe_payment_intent_id}</span>
              </div>
            )}
          </section>
        </div>
      </aside>
    </div>
  );
}
