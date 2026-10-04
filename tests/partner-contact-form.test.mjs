// Static source checks for the partnership request form, in the same spirit
// as tests/i18n.test.mjs / tests/dodanie.test.mjs: this repo has no React
// testing library set up, so client-side validation/markup is pinned by
// reading the component source rather than rendering it.
//
// Ramon's decision: only salon name, contact person, email and GDPR consent
// are required. Phone, IČO, address, position and web/social stay on the
// form but are optional — no asterisk, no `required` attribute, no blocking
// client-side validation.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getDictionary } from "../lib/i18n/dictionaries/index.ts";

const read = (rel) =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const skForm = read("../app/partnerstvo/PartnerContactForm.tsx");
const localeForm = read("../components/forms/PartnerContactForm.tsx");
const skPage = read("../app/partnerstvo/page.tsx");

const LOCALES = ["sk", "cs", "hu"];
const REQUIRED_FIELDS = ["salonName", "contactPerson", "email"];
const OPTIONAL_FIELDS = ["ico", "address", "phone", "web"];

function partnershipBlock(locale) {
  const src = read(`../lib/i18n/dictionaries/${locale}.ts`);
  const start = src.indexOf("  partnership: {");
  const end = src.indexOf("\n  blog: {", start);
  assert.ok(start > -1 && end > start, `${locale}: partnership block not found`);
  return src.slice(start, end);
}

// ------------------------------------------------------- the `required` DOM

for (const [name, src] of [
  ["app/partnerstvo/PartnerContactForm.tsx (sk)", skForm],
  ["components/forms/PartnerContactForm.tsx (cs/hu)", localeForm],
]) {
  test(`${name}: the 4 decided-required fields keep the required attribute`, () => {
    for (const field of REQUIRED_FIELDS) {
      assert.match(
        src,
        new RegExp(`required\\s*\\n\\s*value=\\{${field}\\}`),
        `${field} must still be a required input`
      );
    }
  });

  test(`${name}: phone/IČO/address/web are no longer required inputs`, () => {
    for (const field of OPTIONAL_FIELDS) {
      assert.doesNotMatch(
        src,
        new RegExp(`required\\s*\\n\\s*value=\\{${field}\\}`),
        `${field} must not carry the required attribute`
      );
    }
  });

  test(`${name}: optional fields no longer fail validation when left empty`, () => {
    for (const field of OPTIONAL_FIELDS) {
      assert.doesNotMatch(
        src,
        new RegExp(`if \\(!${field}\\.trim\\(\\)\\)\\s*errs\\.${field}\\s*=`),
        `${field} must not set an unconditional "required" error`
      );
    }
  });

  test(`${name}: the 4 decided-required fields still fail validation when empty`, () => {
    for (const field of REQUIRED_FIELDS) {
      assert.match(
        src,
        new RegExp(`if \\(!${field}\\.trim\\(\\)\\)`),
        `${field} must still be checked for emptiness`
      );
    }
    assert.match(src, /if \(!gdpr\)\s*errs\.gdpr\s*=/, "gdpr must still be required");
  });

  test(`${name}: IČO format is still checked, but only when something was typed`, () => {
    // Ramon: IČO becomes optional, but if a salon does type one in, the
    // existing shape check must still run — just not against an empty string.
    assert.match(
      src,
      /if\s*\(ico\.trim\(\)\)\s*\{[^}]*icoInvalid|if\s*\(ico\.trim\(\)[^)]*&&/s,
      "the IČO pattern check must be skipped entirely for an empty, optional value"
    );
  });
}

// --------------------------------------------------------------- aria/html

test("optional inputs do not carry aria-required either", () => {
  for (const src of [skForm, localeForm]) {
    for (const field of OPTIONAL_FIELDS) {
      const idx = src.indexOf(`value={${field}}`);
      assert.ok(idx > -1, `${field} input not found`);
      const inputTag = src.slice(src.lastIndexOf("<input", idx), src.indexOf(">", idx));
      assert.doesNotMatch(inputTag, /aria-required/, `${field} must not set aria-required`);
    }
  }
});

// --------------------------------------------------------- labels/asterisk

test("the asterisk is only on the 4 required labels, in every locale", () => {
  for (const locale of LOCALES) {
    const t = getDictionary(locale).partnership.form;
    assert.match(t.salonName, /\*/, `${locale}: salonName label lost its asterisk`);
    assert.match(t.contactPerson, /\*/, `${locale}: contactPerson label lost its asterisk`);
    assert.match(t.emailLabel, /\*/, `${locale}: emailLabel lost its asterisk`);

    assert.doesNotMatch(t.ico, /\*/, `${locale}: ico label must no longer carry an asterisk`);
    assert.doesNotMatch(t.address, /\*/, `${locale}: address label must no longer carry an asterisk`);
    assert.doesNotMatch(t.phone, /\*/, `${locale}: phone label must no longer carry an asterisk`);
    assert.doesNotMatch(t.web, /\*/, `${locale}: web label must no longer carry an asterisk`);
  }
});

test("the hardcoded sk labels match the same rule (sk has no dict-driven form)", () => {
  // The `\*<` anchor (asterisk immediately followed by the closing tag)
  // keeps this from false-matching the "{/* ... IČO */}" JSX comment, which
  // also contains the substring "IČO *".
  assert.match(skForm, /Názov salónu \*</);
  assert.match(skForm, /Kontaktná osoba \*</);
  assert.match(skForm, /Email \*</);
  assert.doesNotMatch(skForm, /IČO \*</);
  assert.doesNotMatch(skForm, /Adresa prevádzky \*</);
  assert.doesNotMatch(skForm, /Telefón \*</);
  assert.doesNotMatch(skForm, /Web alebo Instagram\/Facebook \*</);
});

// -------------------------------------------------------------- microcopy

test("the intro microcopy truthfully names the 4 required fields, not 'every starred field'", () => {
  for (const locale of LOCALES) {
    const intro = getDictionary(locale).partnership.formIntro;
    assert.doesNotMatch(
      intro,
      /hviezdičkou|hvězdičkou|csillaggal/i,
      `${locale}: formIntro must stop claiming every starred field is required`
    );
  }
  assert.doesNotMatch(
    skPage,
    /hviezdičkou/i,
    "the sk page's hardcoded intro must stop claiming every starred field is required"
  );
});

test("every locale's partnership dict block stays in sync with the sk source wording for required-ness", () => {
  // Same spirit as dodanie.test.mjs: translated text is expected to differ,
  // but the *shape* of the dictionary (which fields are optional) must not
  // silently drift per locale.
  for (const locale of LOCALES) {
    const block = partnershipBlock(locale);
    for (const field of OPTIONAL_FIELDS) {
      assert.doesNotMatch(
        block,
        new RegExp(`${field}:\\s*"[^"]*\\*"`),
        `${locale}: ${field} label must not end in an asterisk`
      );
    }
  }
});
