import { existsSync } from "node:fs";
import path from "node:path";

export const CATALOGUE_PATH = "/catalogue/orient-group-gulf-catalogue.pdf";

/**
 * URL of the product catalogue PDF, or null while the file has not been added
 * (so the "Download catalogue" links stay hidden). Evaluated at build time.
 */
export function getCatalogueUrl(): string | null {
  return existsSync(path.join(process.cwd(), "public", CATALOGUE_PATH)) ? CATALOGUE_PATH : null;
}
