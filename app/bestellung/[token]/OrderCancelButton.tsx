"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderCancelButton({ token }: { token: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "confirm" | "sending" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function cancel() {
    setState("sending");
    setError(null);
    try {
      const res = await fetch(`/api/orders/${token}/cancel`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        setError(
          data?.error === "refund_failed"
            ? "Die Rückerstattung konnte nicht ausgeführt werden. Bitte kontaktieren Sie uns."
            : "Stornierung fehlgeschlagen. Bitte später erneut versuchen."
        );
        setState("error");
        return;
      }
      setState("done");
      router.refresh();
    } catch {
      setError("Verbindung fehlgeschlagen.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13.5px] text-emerald-800">
        Bestellung wurde storniert. Die Bestätigung geht per E-Mail an Sie raus.
      </div>
    );
  }

  if (state === "confirm") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={cancel}
          className="rounded-full bg-royal-800 px-5 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-royal-700"
        >
          Ja, Bestellung stornieren
        </button>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="text-sm font-semibold uppercase tracking-wider text-neutral-500 hover:text-royal-800"
        >
          Abbrechen
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setState("confirm")}
        disabled={state === "sending"}
        className="rounded-full border border-royal-700/15 bg-white px-5 py-2.5 text-sm font-semibold text-royal-800 transition hover:border-gold-300 disabled:opacity-60"
      >
        {state === "sending" ? "Wird storniert …" : "Bestellung stornieren"}
      </button>
      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
          {error}
        </div>
      )}
    </div>
  );
}
