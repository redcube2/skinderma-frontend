// Minimal ESM resolve hook: lets Node's built-in type-stripping load the
// project's extensionless relative TypeScript imports (e.g. `import "./config"`
// inside lib/i18n/*.ts) when running `node --test`. Test-only; the app is built
// by Next.js which already resolves these.
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const HAS_EXT = /\.[cm]?[jt]s$/;

export async function resolve(specifier, context, nextResolve) {
  if (/^\.\.?\//.test(specifier) && !HAS_EXT.test(specifier)) {
    for (const ext of [".ts", ".tsx", "/index.ts"]) {
      const candidate = new URL(specifier + ext, context.parentURL);
      if (existsSync(fileURLToPath(candidate))) {
        return nextResolve(specifier + ext, context);
      }
    }
  }

  // next@14 ships subpaths like "next/server" as a plain file
  // (node_modules/next/server.js) with no "exports" map. Node's CJS
  // resolver appends ".js" automatically; its ESM resolver does not, so an
  // `import ... from "next/server"` (as in app/api/*/route.ts) fails here
  // even though the same code resolves fine inside a real Next.js build.
  // Retry once with ".js" before giving up.
  if (!HAS_EXT.test(specifier)) {
    try {
      return await nextResolve(specifier, context);
    } catch (err) {
      if (err?.code === "ERR_MODULE_NOT_FOUND") {
        return nextResolve(specifier + ".js", context);
      }
      throw err;
    }
  }

  return nextResolve(specifier, context);
}

