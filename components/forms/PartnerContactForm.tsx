"use client";

import { useState } from "react";
import type { PartnerFormDict } from "@/lib/i18n/dictionaries";

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

/**
 * Locale-aware partnership form. Identical wire format and /api/partner-contact
 * endpoint as the Slovak app/partnerstvo/PartnerContactForm.tsx — only visible
 * copy is parametrised. Field names, validation rules and the honeypot are
 * unchanged.
 */
export default function PartnerContactForm({
  dict,
}: {
  dict: PartnerFormDict;
}) {
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

    if (!salonName.trim()) errs.salonName = dict.required;
    if (!ico.trim()) {
      errs.ico = dict.required;
    } else if (!/^\d{8}$/.test(ico.trim())) {
      errs.ico = dict.icoLength;
    }
    if (!address.trim()) errs.address = dict.required;
    if (!contactPerson.trim()) errs.contactPerson = dict.required;
    if (!email.trim()) {
      errs.email = dict.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = dict.invalidEmail;
    }
    if (!phone.trim()) errs.phone = dict.required;
    if (!web.trim()) errs.web = dict.required;
    if (!gdpr) errs.gdpr = dict.consentRequired;

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
        <h3 className="text-lg font-semibold text-navy">{dict.successTitle}</h3>
        <p className="mt-2 text-sm text-brand-gray">{dict.successText}</p>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{dict.salonName}</span>
          <input
            type="text"
            required
            value={salonName}
            onChange={(e) => setSalonName(e.target.value)}
            className={inputClass}
            placeholder={dict.salonNamePlaceholder}
          />
          {errors.salonName && <p className={errorClass}>{errors.salonName}</p>}
        </label>

        <label className="block">
          <span className={labelClass}>{dict.ico}</span>
          <input
            type="text"
            required
            value={ico}
            onChange={(e) => setIco(e.target.value)}
            className={inputClass}
            placeholder={dict.icoPlaceholder}
            maxLength={8}
          />
          {errors.ico && <p className={errorClass}>{errors.ico}</p>}
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>{dict.address}</span>
        <input
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputClass}
          placeholder={dict.addressPlaceholder}
        />
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{dict.contactPerson}</span>
          <input
            type="text"
            required
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className={inputClass}
            placeholder={dict.contactPersonPlaceholder}
          />
          {errors.contactPerson && (
            <p className={errorClass}>{errors.contactPerson}</p>
          )}
        </label>

        <label className="block">
          <span className={labelClass}>{dict.position}</span>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={inputClass}
            placeholder={dict.positionPlaceholder}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>{dict.emailLabel}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder={dict.emailPlaceholder}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </label>

        <label className="block">
          <span className={labelClass}>{dict.phone}</span>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder={dict.phonePlaceholder}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>{dict.web}</span>
        <input
          type="text"
          required
          value={web}
          onChange={(e) => setWeb(e.target.value)}
          className={inputClass}
          placeholder={dict.webPlaceholder}
        />
        {errors.web && <p className={errorClass}>{errors.web}</p>}
      </label>

      <label className="block">
        <span className={labelClass}>{dict.shortMessage}</span>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder={dict.shortMessagePlaceholder}
        />
      </label>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={gdpr}
            onChange={(e) => setGdpr(e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-cream-dark accent-black"
          />
          <span className="text-xs text-brand-gray leading-relaxed">
            {dict.consentBefore}
            <a
              href="/ochrana-osobnych-udajov"
              className="underline text-navy hover:text-brand-gray transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              {dict.consentLink}
            </a>
            {dict.consentAfter}
          </span>
        </label>
        {errors.gdpr && <p className={`${errorClass} mt-1`}>{errors.gdpr}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold w-full disabled:opacity-60"
      >
        {status === "sending" ? dict.sending : dict.submit}
      </button>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {dict.errorBefore}
          <a href="mailto:info@skinderma.sk" className="underline">
            info@skinderma.sk
          </a>
          {dict.errorAfter}
        </p>
      )}
    </form>
  );
}
