"use client";

import { useState } from "react";
import { formatEUR } from "@/lib/tickets/types";

type Props = {
  eventId: string;
  priceCents: number;
  priceReducedCents: number | null;
  availableSeats: number;
};

type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string };

export default function TicketBuyForm({
  eventId,
  priceCents,
  priceReducedCents,
  availableSeats
}: Props) {
  const hasReduced = !!priceReducedCents && priceReducedCents > 0;
  const maxTotal = Math.min(availableSeats, 8);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityReduced, setQuantityReduced] = useState(0);
  const [agree, setAgree] = useState(false);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const totalCount = quantity + quantityReduced;
  const total = quantity * priceCents + quantityReduced * (priceReducedCents ?? 0);

  function changeRegular(delta: number) {
    setQuantity((q) => {
      const next = Math.max(0, q + delta);
      if (next + quantityReduced > maxTotal) return q;
      if (next + quantityReduced === 0) return q;
      return next;
    });
  }
  function changeReduced(delta: number) {
    setQuantityReduced((q) => {
      const next = Math.max(0, q + delta);
      if (next + quantity > maxTotal) return q;
      if (next + quantity === 0) return q;
      return next;
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "sending") return;
    if (!agree) {
      setState({ kind: "error", message: "Bitte den AGB zustimmen." });
      return;
    }
    if (totalCount < 1) {
      setState({ kind: "error", message: "Bitte mindestens eine Karte wählen." });
      return;
    }
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          name,
          email,
          quantity,
          quantity_reduced: quantityReduced
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        const err = (data?.error as string) ?? "unknown";
        setState({
          kind: "error",
          message:
            err === "sold_out"
              ? "Nicht mehr genug Plätze verfügbar."
              : err === "invalid_fields"
                ? "Bitte Name und gültige E-Mail eingeben."
                : err === "sales_closed"
                  ? "Der Verkauf ist derzeit geschlossen."
                  : err === "db_error"
                    ? "Datenbank nicht erreichbar. Bitte später erneut versuchen."
                    : "Die Bestellung konnte nicht gespeichert werden. Bitte später erneut versuchen."
        });
        return;
      }
      window.location.href =
        (data.redirectUrl as string) ?? "/tickets/erfolg";
    } catch {
      setState({
        kind: "error",
        message: "Verbindung fehlgeschlagen. Bitte später erneut versuchen."
      });
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <div className="eyebrow">Karten bestellen</div>
        <h2 className="display mt-3 text-3xl text-royal-800">
          Jetzt sichern.
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          {formatEUR(priceCents, "de")} pro Karte
          {hasReduced && (
            <>
              {" "}
              · Ermäßigt {formatEUR(priceReducedCents!, "de")}
            </>
          )}
          . Zahlung bequem per Überweisung nach der Bestellung.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-[12px] font-medium text-neutral-700">Name*</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[12px] font-medium text-neutral-700">
            E-Mail*
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
          />
        </label>
      </div>

      <div className="space-y-3">
        <QuantityRow
          label={`Regulär · ${formatEUR(priceCents, "de")}`}
          value={quantity}
          onDec={() => changeRegular(-1)}
          onInc={() => changeRegular(+1)}
        />
        {hasReduced && (
          <QuantityRow
            label={`Ermäßigt · ${formatEUR(priceReducedCents!, "de")}`}
            hint="Schüler, Studenten, Auszubildende, Behinderte"
            value={quantityReduced}
            onDec={() => changeReduced(-1)}
            onInc={() => changeReduced(+1)}
          />
        )}
        <div className="text-[12px] text-neutral-500">
          max. {maxTotal} Karten pro Bestellung insgesamt
        </div>
      </div>

      <label className="flex items-start gap-3 text-[13px] text-neutral-700">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-royal-700/30"
        />
        <span>
          Ich habe die{" "}
          <a href="/datenschutz" className="underline underline-offset-2">
            Datenschutzbestimmungen
          </a>{" "}
          gelesen und akzeptiere, dass die Bestelldaten zum Zweck der
          Abwicklung verarbeitet werden.
        </span>
      </label>

      <div className="rounded-xl border border-royal-700/10 bg-cream-100/70 px-5 py-4">
        <div className="flex items-baseline justify-between gap-4 text-[14px]">
          <span className="text-neutral-600">
            Gesamt ({totalCount} {totalCount === 1 ? "Karte" : "Karten"})
          </span>
          <span className="display text-2xl text-royal-800">
            {formatEUR(total, "de")}
          </span>
        </div>
      </div>

      {state.kind === "error" && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={state.kind === "sending" || totalCount < 1}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.kind === "sending"
          ? "Sendet …"
          : "Verbindlich bestellen"}
      </button>
    </form>
  );
}

function QuantityRow({
  label,
  hint,
  value,
  onDec,
  onInc
}: {
  label: string;
  hint?: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-royal-700/10 bg-white px-4 py-3">
      <div>
        <div className="text-[13px] font-semibold text-royal-800">{label}</div>
        {hint && <div className="text-[11px] text-neutral-500">{hint}</div>}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDec}
          className="h-9 w-9 rounded-xl border border-royal-700/15 bg-white text-lg text-royal-800 transition hover:border-gold-300"
          aria-label="Weniger"
        >
          −
        </button>
        <div className="min-w-[2.75rem] rounded-xl border border-royal-700/15 bg-cream-50 px-3 py-1.5 text-center text-base font-medium text-royal-800">
          {value}
        </div>
        <button
          type="button"
          onClick={onInc}
          className="h-9 w-9 rounded-xl border border-royal-700/15 bg-white text-lg text-royal-800 transition hover:border-gold-300"
          aria-label="Mehr"
        >
          +
        </button>
      </div>
    </div>
  );
}
