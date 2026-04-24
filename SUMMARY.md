# Feature: /pre-profesionalov — Summary

## Files Changed

| File | Action |
|------|--------|
| `app/pre-profesionalov/page.tsx` | ✅ Created — server component, SEO metadata, 4 sections |
| `app/pre-profesionalov/PartnerContactForm.tsx` | ✅ Created — client form, validation, honeypot, no localStorage |
| `app/api/partner-contact/route.ts` | ✅ Created — POST handler, Resend emails, rate limiting, honeypot |
| `components/footer/Footer.tsx` | ✅ Updated — added "Pre profesionálov" nav link |
| `package.json` / `package-lock.json` | ✅ Updated — added `resend` SDK |

---

## Manual Test Checklist

### Page rendering
- [ ] Visit `/pre-profesionalov` — page loads, all 4 sections visible
- [ ] Mobile breakpoint: hero, benefit cards (stack 1-col), steps (stack 1-col)
- [ ] Desktop: benefit cards 4-col grid, steps 3-col grid
- [ ] "Požiadať o partnerstvo" CTA scrolls to `#ziadost` section
- [ ] "Zistiť viac" CTA scrolls to `#vyhody` section
- [ ] Footer shows "Pre profesionálov" link, links to `/pre-profesionalov`

### Form validation (client-side)
- [ ] Submit empty → errors shown on all required fields
- [ ] IČO with 7 digits → "IČO musí mať presne 8 číslic"
- [ ] IČO with letters → same error
- [ ] Invalid email → "Neplatná e-mailová adresa"
- [ ] GDPR unchecked → "Súhlas je povinný"
- [ ] Valid form → submit button shows "Odosielam…" then success state
- [ ] On success: thank-you card replaces form

### API route
- [ ] Set `RESEND_API_KEY` in `.env.local`
- [ ] POST valid payload → `{ success: true }`, 2 emails sent
- [ ] POST with `website_url` filled → `{ success: true }` silently (honeypot)
- [ ] POST missing required field → 400 + error message
- [ ] POST bad IČO → 400 + "IČO musí mať presne 8 číslic"
- [ ] POST 6 times from same IP in 10 min → 429 on 6th request

### Email content
- [ ] Notification email arrives at info@skinderma.sk with all fields in table
- [ ] Notification email includes "Ďalší postup" checklist
- [ ] Confirmation email arrives at salon email, mentions salon name
- [ ] Both emails render correctly in Gmail

---

## Caveats / Open Questions

1. **`RESEND_API_KEY`** must be set in production env (Vercel dashboard). Without it, emails fail but the API returns 500.
2. **`from` domain** — Resend requires the `from` domain (`skinderma.sk`) to be verified in the Resend dashboard. If not verified, emails will fail.
3. **Rate limiter** is in-memory — resets on every cold start / deployment. Good enough for low-traffic; upgrade to Redis/Upstash for production scale.
4. **`o-skinderme` footer link** leads to `/o-skinderme` (existing slug); the About page is at `/o-nas`. This is a pre-existing inconsistency, not introduced by this feature.

---

## Preview URL

[Vercel will deploy automatically — check https://vercel.com/skinias-projects for preview URL]
