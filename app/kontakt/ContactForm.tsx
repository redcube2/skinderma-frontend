"use client";

import { useState } from "react";

const SUBJECTS = [
  "Reklamácia",
  "Odstúpenie od zmluvy",
  "Sťažnosť",
  "Otázka k objednávke",
  "Iné",
] as const;

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>(
    SUBJECTS[0]
  );
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error("failed");

      try {
        const key = "skinderma:lastContact";
        localStorage.setItem(
          key,
          JSON.stringify({
            name,
            email,
            subject,
            message,
            at: new Date().toISOString(),
          })
        );
      } catch {}

      setStatus("success");
      setName("");
      setEmail("");
      setSubject(SUBJECTS[0]);
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
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
            E-mail
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-cream-dark/60 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy">
          Predmet
        </span>
        <select
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value as (typeof SUBJECTS)[number])
          }
          className="mt-1 w-full rounded-lg border border-cream-dark/60 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy">
          Správa
        </span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-lg border border-cream-dark/60 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold w-full disabled:opacity-60"
      >
        {status === "sending" ? "Odosielam…" : "Odoslať správu"}
      </button>

      {status === "success" && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Správa odoslaná. Odpovieme do 48 hodín.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Správu sa nepodarilo odoslať. Skúste to prosím znova alebo nám
          napíšte priamo na info@skinderma.sk.
        </p>
      )}
    </form>
  );
}
