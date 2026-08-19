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

const inputClass =
  "mt-1 w-full rounded-lg border border-cream-dark/60 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold";
const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-navy";

export default function WithdrawalForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [goods, setGoods] = useState("");
  const [receivedOn, setReceivedOn] = useState("");
  const [iban, setIban] = useState("");
  const [reason, setReason] = useState<(typeof REASONS)[number]>(REASONS[0]);
  const [website, setWebsite] = useState(""); // honeypot
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
          email,
          website_url: website,
          subject: "Odstúpenie od zmluvy",
          message: [
            "Týmto oznamujem, že odstupujem od kúpnej zmluvy.",
            "",
            `Tovar: ${goods}`,
            `Číslo objednávky: ${orderNumber}`,
            `Dátum prevzatia tovaru: ${receivedOn}`,
            `Meno a priezvisko: ${name}`,
            `Adresa: ${address}`,
            `E-mail: ${email}`,
            `IBAN na vrátenie platby: ${iban || "neuvedený"}`,
            `Dôvod: ${reason}`,
          ].join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error("failed");
      setStatus("success");
      setName("");
      setEmail("");
      setAddress("");
      setOrderNumber("");
      setGoods("");
      setReceivedOn("");
      setIban("");
      setReason(REASONS[0]);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className={labelClass}>Meno a priezvisko</span>
        <input
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>E-mail</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
        <span className="mt-1 block text-xs text-brand-gray">
          Na túto adresu vám obratom pošleme potvrdenie o prijatí odstúpenia.
        </span>
      </label>

      <label className="block">
        <span className={labelClass}>Adresa</span>
        <input
          type="text"
          required
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Číslo objednávky</span>
        <input
          type="text"
          required
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Tovar, ktorého sa odstúpenie týka</span>
        <input
          type="text"
          required
          value={goods}
          onChange={(e) => setGoods(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Dátum prevzatia tovaru</span>
        <input
          type="date"
          required
          value={receivedOn}
          onChange={(e) => setReceivedOn(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>IBAN na vrátenie platby (nepovinné)</span>
        <input
          type="text"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Dôvod (nepovinný údaj)</span>
        <select
          value={reason}
          onChange={(e) =>
            setReason(e.target.value as (typeof REASONS)[number])
          }
          className={inputClass}
        >
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      {/* Honeypot — skrytý pred používateľmi, vypĺňajú ho boti */}
      <input
        type="text"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold w-full disabled:opacity-60"
      >
        {status === "sending" ? "Odosielam…" : "Odoslať odstúpenie od zmluvy"}
      </button>

      {status === "success" && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Odstúpenie sme prijali. Potvrdenie o prijatí sme vám poslali e-mailom.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Odstúpenie sa nepodarilo odoslať. Napíšte prosím priamo na
          info@skinderma.sk — vaša 14-dňová lehota tým zostáva zachovaná.
        </p>
      )}
    </form>
  );
}
