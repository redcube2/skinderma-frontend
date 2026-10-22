// Guards the Node.js security floor set after the Node.js October 2026
// advisory: package.json must require a patched Node 24 release
// (>=24.22.1) and stay within Vercel's supported 24.x line (<25.0.0).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL("../package.json", import.meta.url)), "utf8")
);

test("package.json declares an engines.node floor", () => {
  assert.ok(pkg.engines, "expected an \"engines\" field in package.json");
  assert.equal(typeof pkg.engines.node, "string");
});

test("engines.node requires the patched Node 24 release and nothing older", () => {
  const range = pkg.engines.node;
  const match = range.match(/^>=(\d+)\.(\d+)\.(\d+)\s+<(\d+)\.0\.0$/);
  assert.ok(match, `expected a ">=X.Y.Z <N.0.0" range, got "${range}"`);

  const [, major, minor, patch, ceilingMajor] = match.map(Number);
  assert.equal(major, 24, "floor must stay on the Node 24 line");
  assert.ok(
    minor > 22 || (minor === 22 && patch >= 1),
    "floor must be at least 24.22.1 (Node.js October 2026 advisory fix)"
  );
  assert.equal(ceilingMajor, 25, "range must stay within Vercel's supported Node 24.x line");
});
