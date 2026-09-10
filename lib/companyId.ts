/**
 * The company identifier on the partnership form is not the same thing in every
 * market: SK/CZ salons have an 8-digit IČO, Hungarian ones an 11-digit adószám
 * (`12345678-2-41`) or a 10-digit cégjegyzékszám (`01-09-123456`). The accepted
 * shape per locale lives in the dictionary as `partnership.form.icoPattern`;
 * this drops the separators people type before that pattern is applied.
 */
export function normalizeCompanyId(value: string): string {
  return value.trim().replace(/[\s\-/.]/g, "");
}
