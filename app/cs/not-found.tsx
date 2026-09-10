/**
 * /cs segment 404. The root not-found is already locale-aware (it reads the
 * middleware locale header), so this simply re-exports it to keep the Czech
 * subtree's not-found boundary explicit.
 */
export { default } from "@/app/not-found";
