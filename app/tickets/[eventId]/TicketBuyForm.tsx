"use client";

import { useMemo, useState } from "react";
import { formatEUR } from "@/lib/tickets/types";
import { SITE } from "@/lib/data";

type Props = {
  eventId: string;
  eventTitle: string;
  priceCents: number;
  priceReducedCents: number | null;
  availableSeats: number;
};

type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "error"; message: string };

type Step = "form" | "bank";

export default function TicketBuyForm({
  eventId,
  eventTitle,
  priceCents,
  priceReducedCents,
  availableSeats
}: Props) {
  const hasReduced = !!priceReducedCents && priceReducedCents > 0;
  const maxTotal = Math.min(availableSeats, 8);

  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [quantityReduced, setQuantityReduced] = useState(0);
  const [agree, setAgree] = useState(false);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const totalCount = quantity + quantityReduced;
  const total = quantity * priceCents + quantityReduced * (priceReducedCents ?? 0);

  // Verwendungszweck + Bestellkennzeichen clientseitig stabil generieren, damit
  // der Kunde beim Überweisen den gleichen Wert sieht, der später in die DB
  // geschrieben wird.
  const reference = useMemo(() => {
    const parts = [
      lastName.trim() || "Besteller",
      firstName.trim(),
      eventTitle
    ].filter(Boolean);
    return parts.join(" · ").slice(0, 140);
  }, [firstName, lastName, eventTitle]);

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

  function goToBank(e: React.FormEvent) {
    e.preventDefault();
    setState({ kind: "idle" });
    if (!agree) {
      setState({ kind: "error", message: "Bitte den Datenschutzbestimmungen zustimmen." });
      return;
    }
    if (totalCount < 1) {
      setState({ kind: "error", message: "Bitte mindestens eine Karte wählen." });
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setState({ kind: "error", message: "Bitte Vor- und Nachname angeben." });
      return;
    }
    if (!street.trim() || !postalCode.trim() || !city.trim()) {
      setState({ kind: "error", message: "Bitte vollständige Adresse angeben." });
      return;
    }
    if (!phone.trim()) {
      setState({ kind: "error", message: "Bitte Telefonnummer angeben." });
      return;
    }
    const trimmedEmail = email.trim();
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setState({ kind: "error", message: "Die E-Mail-Adresse ist ungültig." });
      return;
    }
    setStep("bank");
    // nach oben scrollen, damit die Bankdaten sichtbar sind
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function confirmPaid() {
    if (state.kind === "sending") return;
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          street: street.trim(),
          postalCode: postalCode.trim(),
          city: city.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
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
                ? "Bitte Pflichtfelder vollständig ausfüllen."
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

  if (step === "bank") {
    return (
      <div className="space-y-6">
        <div>
          <div className="eyebrow">Schritt 2 von 2</div>
          <h2 className="display mt-3 text-3xl text-royal-800">
            Bitte überweisen Sie den Betrag.
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Ihre Bestellung ist noch nicht erfasst. Überweisen Sie bitte den
            Gesamtbetrag an unten stehendes Konto und drücken Sie anschließend
            auf <span className="font-medium text-royal-800">„Bestellt"</span>.
            Danach nehmen wir Ihre Bestellung auf und senden Ihnen die Karten
            per Post zu.
          </p>
        </div>

        <div className="rounded-2xl border border-royal-700/10 bg-cream-100/70 p-6 sm:p-7">
          <dl className="grid gap-3 text-[14px] text-neutral-800 sm:grid-cols-[180px_1fr]">
            <dt className="text-neutral-500">Kontoinhaber</dt>
            <dd>{SITE.bank.holder.de}</dd>

            <dt className="text-neutral-500">IBAN</dt>
            <dd className="font-mono tracking-wide">{SITE.bank.iban}</dd>

            <dt className="text-neutral-500">BIC</dt>
            <dd className="font-mono">{SITE.bank.bic}</dd>

            <dt className="text-neutral-500">Bank</dt>
            <dd>{SITE.bank.name}</dd>

            <dt className="text-neutral-500">Betrag</dt>
            <dd className="font-medium">{formatEUR(total, "de")}</dd>

            <dt className="text-neutral-500">Verwendungszweck</dt>
            <dd className="font-mono text-[13px]">{reference}</dd>
          </dl>
          <p className="mt-5 text-[13px] leading-relaxed text-neutral-600">
            Bitte geben Sie den Verwendungszweck genau so an, damit wir Ihre
            Zahlung Ihrer Bestellung zuordnen können.
          </p>
        </div>

        {state.kind === "error" && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900">
            {state.message}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={confirmPaid}
            disabled={state.kind === "sending"}
            className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {state.kind === "sending" ? "Sendet …" : "Bestellt"}
          </button>
          <button
            type="button"
            onClick={() => {
              setState({ kind: "idle" });
              setStep("form");
            }}
            disabled={state.kind === "sending"}
            className="btn-ghost"
          >
            Zurück
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={goToBank} className="space-y-6">
      <div>
        <div className="eyebrow">Schritt 1 von 2</div>
        <h2 className="display mt-3 text-3xl text-royal-800">
          Karten bestellen.
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          {formatEUR(priceCents, "de")} pro Karte
          {hasReduced && (
            <>
              {" "}
              · Ermäßigt {formatEUR(priceReducedCents!, "de")}
            </>
          )}
          . Die Karten werden nach Zahlungseingang per Post an Ihre Adresse
          verschickt.
        </p>
      </div>

      <fieldset className="space-y-4">
        <legend className="eyebrow">Ihre Angaben</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Vorname*">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
              autoComplete="given-name"
            />
          </Field>
          <Field label="Nachname*">
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
              autoComplete="family-name"
            />
          </Field>
          <Field label="Straße und Hausnummer*" className="sm:col-span-2">
            <input
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
              autoComplete="street-address"
            />
          </Field>
          <Field label="Postleitzahl*">
            <input
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
              autoComplete="postal-code"
              inputMode="numeric"
            />
          </Field>
          <Field label="Ort*">
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
              autoComplete="address-level2"
            />
          </Field>
          <Field label="Telefon*">
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
              autoComplete="tel"
            />
          </Field>
          <Field label="E-Mail (optional)">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
              autoComplete="email"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="eyebrow">Karten</legend>
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
      </fieldset>

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

      <p className="text-[12px] leading-relaxed text-neutral-500">
        Im nächsten Schritt sehen Sie unsere Bankdaten und den
        Verwendungszweck. Ihre Bestellung ist erst dann verbindlich erfasst,
        wenn Sie dort nach der Überweisung auf „Bestellt" klicken.
      </p>

      <button
        type="submit"
        disabled={totalCount < 1}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        Bestellen
      </button>
    </form>
  );
}

function Field({
  label,
  className = "",
  children
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-1.5 ${className}`}>
      <span className="text-[12px] font-medium text-neutral-700">{label}</span>
      {children}
    </label>
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
