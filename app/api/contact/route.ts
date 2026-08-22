import { NextResponse } from "next/server";
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

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website_url?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

function shell(title: string, inner: string): string {
  return `
    <!DOCTYPE html>
    <html lang="sk">
    <head><meta charset="UTF-8"><title>${escapeHtml(title)}</title></head>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:600px;">
            <tr><td>${emailHeader()}</td></tr>
            <tr><td style="padding:32px;">
              ${inner}
              <div style="margin-top:32px;padding-top:24px;border-top:1px solid #eee;font-size:12px;color:#999;line-height:1.6;">
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

function notificationHtml(p: {
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 12px 6px 0;font-weight:600;color:#1a1a1a;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;color:#444;">${value}</td>
    </tr>`;

  return shell(
    `Nová správa — ${p.subject}`,
    `
      <h1 style="margin:0 0 8px;font-size:20px;color:#1a1a1a;">Nová správa z webu</h1>
      <p style="margin:0 0 24px;font-size:14px;color:#666;">Predmet: <strong>${escapeHtml(p.subject)}</strong></p>
      <table cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #eee;padding-top:16px;">
        ${row("Meno:", escapeHtml(p.name))}
        ${row("E-mail:", `<a href="mailto:${escapeHtml(p.email)}" style="color:#1a1a1a;">${escapeHtml(p.email)}</a>`)}
        ${row("Doručené:", escapeHtml(p.receivedAt))}
      </table>
      <div style="margin-top:24px;padding:20px;background:#f9f9f7;border-left:3px solid #C8A060;">
        <p style="margin:0;font-size:14px;color:#444;line-height:1.7;white-space:pre-wrap;">${escapeHtml(p.message)}</p>
      </div>
    `
  );
}

function confirmationHtml(p: {
  name: string;
  subject: string;
  message: string;
  receivedAt: string;
}): string {
  return shell(
    "Potvrdenie o prijatí — Skinderma",
    `
      <h1 style="margin:0 0 8px;font-size:20px;color:#1a1a1a;">Potvrdzujeme prijatie vašej správy</h1>
      <p style="margin:0 0 16px;font-size:14px;color:#444;line-height:1.7;">
        Dobrý deň ${escapeHtml(p.name)}, vašu správu s predmetom
        <strong>${escapeHtml(p.subject)}</strong> sme prijali dňa
        <strong>${escapeHtml(p.receivedAt)}</strong>.
        Tento e-mail slúži ako potvrdenie o prijatí na trvanlivom nosiči — odložte si ho.
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#444;line-height:1.7;">
        Ozveme sa vám <strong>do 2 pracovných dní</strong>. Ak máte medzitým otázky, napíšte na
        <a href="mailto:info@skinderma.sk" style="color:#1a1a1a;font-weight:600;">info@skinderma.sk</a>.
      </p>
      <div style="padding:20px;background:#f9f9f7;border-left:3px solid #C8A060;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#1a1a1a;text-transform:uppercase;letter-spacing:0.1em;">
          Kópia vašej správy
        </p>
        <p style="margin:0;font-size:14px;color:#444;line-height:1.7;white-space:pre-wrap;">${escapeHtml(p.message)}</p>
      </div>
    `
  );
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  // Honeypot — silent success for bots
  if (body.website_url && String(body.website_url).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const subject = body.subject?.trim();
  const message = body.message?.trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    // Nikdy nehlás úspech, ak sa správa reálne neodoslala.
    console.error("[contact] RESEND_API_KEY chýba — správa neodoslaná");
    return NextResponse.json(
      { ok: false, error: "mail_not_configured" },
      { status: 500 }
    );
  }

  const receivedAt = new Date().toLocaleString("sk-SK", {
    timeZone: "Europe/Bratislava",
  });
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Notifikácia pre obchod musí prejsť — bez nej je odoslanie neúspešné.
    const notification = await resend.emails.send({
      from: "Skinderma Web <noreply@skinderma.sk>",
      to: ["info@skinderma.sk"],
      replyTo: email,
      subject: `✉️ ${subject} — ${name}`,
      html: notificationHtml({ name, email, subject, message, receivedAt }),
    });
    if (notification.error) throw new Error(notification.error.message);

    // Potvrdenie o prijatí pre odosielateľa (trvanlivý nosič).
    // Zlyhanie potvrdenia nesmie zhodiť už doručenú žiadosť.
    const confirmation = await resend.emails.send({
      from: "Skinderma <noreply@skinderma.sk>",
      to: [email],
      replyTo: "info@skinderma.sk",
      subject: `Potvrdenie o prijatí — ${subject}`,
      html: confirmationHtml({ name, subject, message, receivedAt }),
    });
    if (confirmation.error) {
      console.error("[contact] potvrdenie neodoslané:", confirmation.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] odoslanie zlyhalo:", err);
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 }
    );
  }
}
