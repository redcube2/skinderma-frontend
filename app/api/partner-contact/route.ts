import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ── In-memory rate limiter (resets on cold start) ──────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ── Email helpers ──────────────────────────────────────────────────────────

function emailHeader(): string {
  return `
    <div style="background:#1a1a1a;padding:24px 32px;">
      <div style="font-family:Arial,sans-serif;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.15em;">
        SKINDERMA
      </div>
      <div style="height:2px;background:#C8A060;margin-top:12px;"></div>
    </div>
  `;
}

function notificationHtml(body: {
  salonName: string;
  ico: string;
  address: string;
  contactPerson: string;
  position?: string;
  email: string;
  phone: string;
  web: string;
  message?: string;
}): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:6px 12px 6px 0;font-weight:600;color:#1a1a1a;white-space:nowrap;vertical-align:top;">${label}</td>
           <td style="padding:6px 0;color:#444;">${value}</td>
         </tr>`
      : "";

  return `
    <!DOCTYPE html>
    <html lang="sk">
    <head><meta charset="UTF-8"><title>Nová žiadosť o partnerstvo</title></head>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:600px;">
            <tr><td>${emailHeader()}</td></tr>
            <tr><td style="padding:32px;">
              <h1 style="margin:0 0 8px;font-size:20px;color:#1a1a1a;">Nová žiadosť o partnerstvo</h1>
              <p style="margin:0 0 24px;font-size:14px;color:#666;">Salón <strong>${body.salonName}</strong> požiadal o partnerstvo.</p>

              <table cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #eee;padding-top:16px;">
                ${row("Názov salónu:", body.salonName)}
                ${row("IČO:", body.ico)}
                ${row("Adresa prevádzky:", body.address)}
                ${row("Kontaktná osoba:", body.contactPerson)}
                ${body.position ? row("Pozícia:", body.position) : ""}
                ${row("Email:", `<a href="mailto:${body.email}" style="color:#1a1a1a;">${body.email}</a>`)}
                ${row("Telefón:", `<a href="tel:${body.phone}" style="color:#1a1a1a;">${body.phone}</a>`)}
                ${row("Web / Sociálne siete:", body.web)}
                ${body.message ? row("Správa:", body.message) : ""}
              </table>

              <div style="margin-top:32px;padding:20px;background:#f9f9f7;border-left:3px solid #C8A060;">
                <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.1em;">
                  Ďalší postup
                </p>
                <ol style="margin:0;padding-left:20px;font-size:13px;color:#444;line-height:1.8;">
                  <li>Overiť IČO v obchodnom registri</li>
                  <li>Pripraviť VIP prístupové údaje</li>
                  <li>Kontaktovať salón do 2 pracovných dní</li>
                </ol>
              </div>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

function confirmationHtml(salonName: string): string {
  return `
    <!DOCTYPE html>
    <html lang="sk">
    <head><meta charset="UTF-8"><title>Vaša žiadosť o partnerstvo — Skinderma</title></head>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:600px;">
            <tr><td>${emailHeader()}</td></tr>
            <tr><td style="padding:32px;">
              <h1 style="margin:0 0 8px;font-size:20px;color:#1a1a1a;">Ďakujeme za váš záujem</h1>
              <p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7;">
                Vašu žiadosť o partnerstvo pre salón <strong>${salonName}</strong> sme úspešne prijali.
              </p>
              <p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7;">
                Náš tím ju preverí a odpovieme vám <strong>do 2 pracovných dní</strong>.
                Ak máte medzitým akékoľvek otázky, neváhajte nás kontaktovať:
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#444;">
                📧 <a href="mailto:info@skinderma.sk" style="color:#1a1a1a;font-weight:600;">info@skinderma.sk</a>
              </p>
              <div style="padding-top:24px;border-top:1px solid #eee;font-size:12px;color:#999;line-height:1.6;">
                Skinderma Medical Cosmetics · Red Cube s.r.o.<br>
                Nám. M.R. Štefánika 16, 945 01 Komárno · IČO: 44137265
              </div>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
}

// ── Route handler ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Príliš veľa žiadostí. Skúste to neskôr." },
      { status: 429 }
    );
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatné dáta" }, { status: 400 });
  }

  // Honeypot check — silent 200 for bots
  if (body.website_url && String(body.website_url).length > 0) {
    return NextResponse.json({ success: true });
  }

  // Extract fields
  const salonName = String(body.salonName ?? "").trim();
  const ico = String(body.ico ?? "").trim();
  const address = String(body.address ?? "").trim();
  const contactPerson = String(body.contactPerson ?? "").trim();
  const position = String(body.position ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const web = String(body.web ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Server-side validation
  const missing: string[] = [];
  if (!salonName) missing.push("salonName");
  if (!ico) missing.push("ico");
  if (!address) missing.push("address");
  if (!contactPerson) missing.push("contactPerson");
  if (!email) missing.push("email");
  if (!phone) missing.push("phone");
  if (!web) missing.push("web");
  if (!body.gdpr) missing.push("gdpr");

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Chýbajú povinné polia: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!/^\d{8}$/.test(ico)) {
    return NextResponse.json(
      { error: "IČO musí mať presne 8 číslic" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Neplatná e-mailová adresa" },
      { status: 400 }
    );
  }

  // Send emails
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formData = {
      salonName,
      ico,
      address,
      contactPerson,
      position,
      email,
      phone,
      web,
      message,
    };

    await Promise.all([
      resend.emails.send({
        from: "Skinderma Partneri <noreply@skinderma.sk>",
        to: ["info@skinderma.sk"],
        replyTo: email,
        subject: `🤝 Nová žiadosť o partnerstvo — ${salonName}`,
        html: notificationHtml(formData),
      }),
      resend.emails.send({
        from: "Skinderma <noreply@skinderma.sk>",
        to: [email],
        replyTo: "info@skinderma.sk",
        subject: "Vaša žiadosť o partnerstvo — Skinderma",
        html: confirmationHtml(salonName),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[partner-contact] Resend error:", err);
    return NextResponse.json({ error: "Chyba servera" }, { status: 500 });
  }
}
