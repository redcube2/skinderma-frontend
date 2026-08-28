// Registers the extensionless-.ts resolve hook before the test files load.
// Used via: node --import ./tests/register-ts.mjs --test ...
import { register } from "node:module";
register("./ts-loader.mjs", import.meta.url);

