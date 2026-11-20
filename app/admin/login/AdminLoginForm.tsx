"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error === "wrong_password" ? "Falsches Passwort." : "Anmeldung fehlgeschlagen.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Verbindung fehlgeschlagen.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-royal-700/10 bg-white p-8 shadow-plate"
    >
      <label className="grid gap-1.5">
        <span className="text-[12px] font-medium text-neutral-700">Passwort</span>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-royal-700/15 bg-white px-4 py-2.5 text-[14px] outline-none focus:border-gold-400"
        />
      </label>
      {error && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] text-amber-900">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-6 w-full disabled:opacity-60"
      >
        {loading ? "Anmelden …" : "Anmelden"}
      </button>
    </form>
  );
}
