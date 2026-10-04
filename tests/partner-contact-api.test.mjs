// Behavioural tests for POST /api/partner-contact.
//
// Ramon's decision: the partnership request form only truly needs four
// fields to be usable — salon name, contact person, email and GDPR
// consent. Phone, IČO, address, position, web/social and the short message
// stay on the form but become optional end-to-end: the server must accept
// them empty and must not block sending on their absence. If any of them
// *is* filled in, the existing format validation (currently only IČO has
// one) still applies.
//
// Resend's SDK calls the global `fetch`, so a successful send is stubbed
// the same way tests/post-views.test.mjs stubs fetch for a different
// endpoint — no real network call, no real email.
import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/partner-contact/route.ts";

const MINIMAL_VALID_BODY = {
  salonName: "Beauty Studio Bratislava",
  contactPerson: "Jana Nováková",
  email: "jana@salon.sk",
  gdpr: true,
};

// The route rate-limits by IP (5 requests / 10 min, in-memory). Every test
// below is a distinct "client" exercising independent behaviour, so each
// gets its own fake IP — otherwise the 6th+ test in this file would always
// see 429 regardless of what it is actually asserting.
let nextTestIp = 0;
function makeRequest(body) {
  nextTestIp += 1;
  const ip = `203.0.113.${nextTestIp}`;
  return {
    headers: { get: (name) => (name === "x-forwarded-for" ? ip : null) },
    json: async () => body,
  };
}

function stubFetchOk() {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "mock-email-id" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  return function restore() {
    globalThis.fetch = original;
  };
}

function withFakeResendKey(fn) {
  return async (...args) => {
    const original = process.env.RESEND_API_KEY;
    process.env.RESEND_API_KEY = "re_test_key";
    try {
      return await fn(...args);
    } finally {
      if (original === undefined) delete process.env.RESEND_API_KEY;
      else process.env.RESEND_API_KEY = original;
    }
  };
}

test(
  "accepts a minimal valid submission with only the 4 required fields",
  withFakeResendKey(async () => {
    const restoreFetch = stubFetchOk();
    try {
      const res = await POST(makeRequest(MINIMAL_VALID_BODY));
      const data = await res.json();
      assert.equal(res.status, 200, JSON.stringify(data));
      assert.equal(data.success, true);
    } finally {
      restoreFetch();
    }
  })
);

test(
  "optional fields left empty do not block submission",
  withFakeResendKey(async () => {
    const restoreFetch = stubFetchOk();
    try {
      const res = await POST(
        makeRequest({
          ...MINIMAL_VALID_BODY,
          ico: "",
          address: "",
          position: "",
          phone: "",
          web: "",
          message: "",
        })
      );
      const data = await res.json();
      assert.equal(res.status, 200, JSON.stringify(data));
      assert.equal(data.success, true);
    } finally {
      restoreFetch();
    }
  })
);

test(
  "optional fields omitted entirely (not just empty) do not block submission",
  withFakeResendKey(async () => {
    const restoreFetch = stubFetchOk();
    try {
      const res = await POST(makeRequest(MINIMAL_VALID_BODY));
      assert.equal(res.status, 200);
    } finally {
      restoreFetch();
    }
  })
);

test("rejects a missing salon name", async () => {
  const res = await POST(
    makeRequest({ ...MINIMAL_VALID_BODY, salonName: "" })
  );
  const data = await res.json();
  assert.equal(res.status, 400);
  assert.match(data.error, /salonName/);
});

test("rejects a missing contact person", async () => {
  const res = await POST(
    makeRequest({ ...MINIMAL_VALID_BODY, contactPerson: "" })
  );
  const data = await res.json();
  assert.equal(res.status, 400);
  assert.match(data.error, /contactPerson/);
});

test("rejects a missing email", async () => {
  const res = await POST(makeRequest({ ...MINIMAL_VALID_BODY, email: "" }));
  const data = await res.json();
  assert.equal(res.status, 400);
  assert.match(data.error, /email/);
});

test("rejects an invalid email even though it is non-empty", async () => {
  const res = await POST(
    makeRequest({ ...MINIMAL_VALID_BODY, email: "not-an-email" })
  );
  const data = await res.json();
  assert.equal(res.status, 400);
  assert.match(data.error, /e-mailová adresa/);
});

test("rejects missing/unconfirmed GDPR consent", async () => {
  const res = await POST(makeRequest({ ...MINIMAL_VALID_BODY, gdpr: false }));
  const data = await res.json();
  assert.equal(res.status, 400);
  assert.match(data.error, /gdpr/);
});

test(
  "still validates IČO format when it is filled in, even though it is optional",
  async () => {
    const res = await POST(
      makeRequest({ ...MINIMAL_VALID_BODY, ico: "not-8-digits" })
    );
    const data = await res.json();
    assert.equal(res.status, 400);
    assert.match(data.error, /IČO/);
  }
);

test(
  "accepts a filled-in, well-formed IČO alongside the minimal required fields",
  withFakeResendKey(async () => {
    const restoreFetch = stubFetchOk();
    try {
      const res = await POST(
        makeRequest({ ...MINIMAL_VALID_BODY, ico: "12345678" })
      );
      assert.equal(res.status, 200);
    } finally {
      restoreFetch();
    }
  })
);
