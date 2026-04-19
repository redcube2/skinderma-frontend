"use client";

import { useState } from "react";

const REASONS = [
  "Tovar mi nevyhovuje",
  "Nesprávne doručený tovar",
  "Poškodený tovar",
  "Zmena rozhodnutia",
  "Iné",
] as const;

type Status = "idle" | "sending" | "success" | "error";

export default function WithdrawalForm() {
  const [name, setName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [reason, setReason] = useState<(typeof REASONS)[number]>(REASONS[0]);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: "info@skinderma.sk",
          subject: "Odstúpenie od zmluvy",
          message: `Objednávka: ${orderNumber}\nDôvod: ${reason}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error("failed");
      setStatus("success");
      setName("");
      setOrderNumber("");
      setReason(REASONS[0]);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy">
          Meno
        </span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-cream-dark/60 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy">
          Číslo objednávky
        </span>
        <input
          type="text"
          required
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="mt-1 w-full rounded-lg border border-cream-dark/60 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy">
          Dôvod
        </span>
        <select
          value={reason}
          onChange={(e) =>
            setReason(e.target.value as (typeof REASONS)[number])
          }
          className="mt-1 w-full rounded-lg border border-cream-dark/60 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold"
        >
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold w-full disabled:opacity-60"
      >
        {status === "sending" ? "Odosielam…" : "Odoslať žiadosť"}
      </button>

      {status === "success" && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Žiadosť odoslaná. Budeme vás kontaktovať do 48 hodín.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Žiadosť sa nepodarilo odoslať. Napíšte prosím priamo na
          info@skinderma.sk.
        </p>
      )}
    </form>
  );
}
