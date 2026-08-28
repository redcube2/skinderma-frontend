// Minimal ESM resolve hook: lets Node's built-in type-stripping load the
// project's extensionless relative TypeScript imports (e.g. `import "./config"`
// inside lib/i18n/*.ts) when running `node --test`. Test-only; the app is built
// by Next.js which already resolves these.
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const HAS_EXT = /\.[cm]?[jt]s$/;

export function resolve(specifier, context, nextResolve) {
  if (/^\.\.?\//.test(specifier) && !HAS_EXT.test(specifier)) {
    for (const ext of [".ts", ".tsx", "/index.ts"]) {
      const candidate = new URL(specifier + ext, context.parentURL);
      if (existsSync(fileURLToPath(candidate))) {
        return nextResolve(specifier + ext, context);
      }
    }
  }
  return nextResolve(specifier, context);
}

