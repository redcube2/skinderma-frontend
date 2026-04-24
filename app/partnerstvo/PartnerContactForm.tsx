"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

interface FormErrors {
  salonName?: string;
  ico?: string;
  address?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  web?: string;
  gdpr?: string;
}

export default function PartnerContactForm() {
  const [salonName, setSalonName] = useState("");
  const [ico, setIco] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [web, setWeb] = useState("");
  const [message, setMessage] = useState("");
  const [gdpr, setGdpr] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!salonName.trim()) errs.salonName = "Povinné pole";
    if (!ico.trim()) {
      errs.ico = "Povinné pole";
    } else if (!/^\d{8}$/.test(ico.trim())) {
      errs.ico = "IČO musí mať presne 8 číslic";
    }
    if (!address.trim()) errs.address = "Povinné pole";
    if (!contactPerson.trim()) errs.contactPerson = "Povinné pole";
    if (!email.trim()) {
      errs.email = "Povinné pole";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Neplatná e-mailová adresa";
    }
    if (!phone.trim()) errs.phone = "Povinné pole";
    if (!web.trim()) errs.web = "Povinné pole";
    if (!gdpr) errs.gdpr = "Súhlas je povinný";

    return errs;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/partner-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salonName,
          ico,
          address,
          contactPerson,
          position,
          email,
          phone,
          web,
          message,
          gdpr,
          website_url: honeypot,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) throw new Error("failed");

      setStatus("success");
      setSalonName("");
      setIco("");
      setAddress("");
      setContactPerson("");
      setPosition("");
      setEmail("");
      setPhone("");
      setWeb("");
      setMessage("");
      setGdpr(false);
      setHoneypot("");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-cream-dark/60 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold";
  const labelClass =
    "text-xs font-semibold uppercase tracking-wide text-navy";
  const errorClass = "mt-1 text-xs text-red-600";

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-cream-dark/60 bg-cream p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-xl">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-navy">
          Žiadosť bola odoslaná
        </h3>
        <p className="mt-2 text-sm text-brand-gray">
          Ďakujeme za váš záujem o partnerstvo so Skinderma. Vašu žiadosť sme
          prijali a odpovieme do 2 pracovných dní.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from humans, visible to bots */}
      <input
        type="text"
        name="website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: "none" }}
        autoComplete="off"
      />

      {/* Row 1: Salon + IČO */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Názov salónu *</span>
          <input
            type="text"
            required
            value={salonName}
            onChange={(e) => setSalonName(e.target.value)}
            className={inputClass}
            placeholder="Napr. Beauty Studio Bratislava"
          />
          {errors.salonName && (
            <p className={errorClass}>{errors.salonName}</p>
          )}
        </label>

        <label className="block">
          <span className={labelClass}>IČO *</span>
          <input
            type="text"
            required
            value={ico}
            onChange={(e) => setIco(e.target.value)}
            className={inputClass}
            placeholder="12345678"
            maxLength={8}
          />
          {errors.ico && <p className={errorClass}>{errors.ico}</p>}
        </label>
      </div>

      {/* Address */}
      <label className="block">
        <span className={labelClass}>Adresa prevádzky *</span>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputClass}
          placeholder="Napr. Obchodná 12, 811 06 Bratislava"
        />
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </label>

      {/* Row 2: Contact person + Position */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Kontaktná osoba *</span>
          <input
            type="text"
            required
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className={inputClass}
            placeholder="Meno a priezvisko"
          />
          {errors.contactPerson && (
            <p className={errorClass}>{errors.contactPerson}</p>
          )}
        </label>

        <label className="block">
          <span className={labelClass}>Pozícia / funkcia</span>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={inputClass}
            placeholder="Napr. Majiteľ, Manažér"
          />
        </label>
      </div>

      {/* Row 3: Email + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Email *</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="email@salon.sk"
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </label>

        <label className="block">
          <span className={labelClass}>Telefón *</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="+421 9XX XXX XXX"
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </label>
      </div>

      {/* Web */}
      <label className="block">
        <span className={labelClass}>Web alebo Instagram/Facebook *</span>
        <input
          type="text"
          required
          value={web}
          onChange={(e) => setWeb(e.target.value)}
          className={inputClass}
          placeholder="napr. www.vasalon.sk alebo @vasalon"
        />
        {errors.web && <p className={errorClass}>{errors.web}</p>}
      </label>

      {/* Message */}
      <label className="block">
        <span className={labelClass}>Krátka správa</span>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder="Čo vás zaujíma? Aké produkty používate? Krátko sa predstavte."
        />
      </label>

      {/* GDPR */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={gdpr}
            onChange={(e) => setGdpr(e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-cream-dark accent-black"
          />
          <span className="text-xs text-brand-gray leading-relaxed">
            Súhlasím so spracovaním osobných údajov podľa{" "}
            <a
              href="/ochrana-osobnych-udajov"
              className="underline text-navy hover:text-brand-gray transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Zásad ochrany osobných údajov
            </a>
            *
          </span>
        </label>
        {errors.gdpr && <p className={`${errorClass} mt-1`}>{errors.gdpr}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold w-full disabled:opacity-60"
      >
        {status === "sending" ? "Odosielam…" : "Odoslať žiadosť"}
      </button>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          Žiadosť sa nepodarilo odoslať. Skúste to prosím znova alebo nás
          kontaktujte priamo na{" "}
          <a href="mailto:info@skinderma.sk" className="underline">
            info@skinderma.sk
          </a>
          .
        </p>
      )}
    </form>
  );
}
