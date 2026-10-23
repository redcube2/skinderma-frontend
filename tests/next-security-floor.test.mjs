// Guards the Next.js security floor set by the Oct 2026 upgrade sweep:
// 14.2.35 and the intermediate 15.5.28 pin both carried critical/high
// advisories with no 14.x/15.x backport, so the project moved its floor to
// the Next 16 line, pinned exactly at 16.4.2 (the release this upgrade
// installs via --save-exact). Keep this floor at 16.4.2 or newer; never
// let it silently drop back to 14.x/15.x or an unpatched 16.x.
// eslint-config-next is kept in lockstep so `next lint`'s App Router-aware
// rules (e.g. no-html-link-for-pages) match the installed next version.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL("../package.json", import.meta.url)), "utf8")
);

function parseVersion(raw, label) {
  const match = String(raw).match(/^(\d+)\.(\d+)\.(\d+)$/);
  assert.ok(match, `expected ${label} to be an exact "X.Y.Z" version, got "${raw}"`);
  return match.slice(1, 4).map(Number);
}

test("next is pinned at or above the patched 16.4.2 floor", () => {
  const [major, minor, patch] = parseVersion(pkg.dependencies.next, "dependencies.next");
  assert.ok(
    major > 16 || (major === 16 && (minor > 4 || (minor === 4 && patch >= 2))),
    `next@${pkg.dependencies.next} is below the 16.4.2 floor cleared by this security upgrade`
  );
});

test("eslint-config-next tracks the installed next version", () => {
  assert.equal(
    pkg.devDependencies["eslint-config-next"],
    pkg.dependencies.next,
    "eslint-config-next must match dependencies.next so lint rules match the installed framework version"
  );
});
