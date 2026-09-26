// Regression tests for the blog post view counter fetch.
//
// PostViewTracker.tsx renders on every blog post and must never crash the
// article page just because the view-tracking endpoint is unavailable or
// returns something unexpected. The endpoint currently 404s in production
// (POST /wp-json/skinderma/v1/views/:id), and a naive read of data.views on
// that response throws when .toLocaleString() is later called on the
// resulting undefined. fetchPostViewCount() is the single place that talks
// to the endpoint; it must resolve to a finite number or null, and must
// never throw or reject, regardless of what the endpoint sends back.
import test from "node:test";
import assert from "node:assert/strict";
import { fetchPostViewCount } from "../lib/postViews.ts";

function stubFetch(response) {
  const original = globalThis.fetch;
  globalThis.fetch = async () => response;
  return function restore() {
    globalThis.fetch = original;
  };
}

test("returns null for a non-2xx response (the current production 404)", async () => {
  const restore = stubFetch({
    ok: false,
    status: 404,
    json: async () => ({
      code: "rest_no_route",
      message: "No route was found matching the URL and request method.",
    }),
  });
  try {
    assert.equal(await fetchPostViewCount(2244), null);
  } finally {
    restore();
  }
});

test("returns null when the response body is not valid JSON", async () => {
  const restore = stubFetch({
    ok: true,
    status: 200,
    json: async () => {
      throw new SyntaxError("Unexpected token in JSON");
    },
  });
  try {
    assert.equal(await fetchPostViewCount(2244), null);
  } finally {
    restore();
  }
});

test("returns null when the response has no views field", async () => {
  const restore = stubFetch({ ok: true, status: 200, json: async () => ({}) });
  try {
    assert.equal(await fetchPostViewCount(2244), null);
  } finally {
    restore();
  }
});

test("returns null when views is not a finite number", async () => {
  const badValues = [null, undefined, "42", NaN, Infinity];
  for (const bad of badValues) {
    const restore = stubFetch({ ok: true, status: 200, json: async () => ({ views: bad }) });
    try {
      assert.equal(await fetchPostViewCount(2244), null, "views=" + String(bad));
    } finally {
      restore();
    }
  }
});

test("returns the view count on a well-formed 2xx response", async () => {
  const restore = stubFetch({ ok: true, status: 200, json: async () => ({ views: 128 }) });
  try {
    assert.equal(await fetchPostViewCount(2244), 128);
  } finally {
    restore();
  }
});

test("never rejects: a network error also resolves to null", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new TypeError("Failed to fetch");
  };
  try {
    await assert.doesNotReject(() => fetchPostViewCount(2244));
    assert.equal(await fetchPostViewCount(2244), null);
  } finally {
    globalThis.fetch = original;
  }
});
