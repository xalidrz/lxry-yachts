import fs from "node:fs";
import path from "node:path";

export type Logo = { src: string; width: number; height: number; alt: string };

export const LOGO_ALT = "Orient Group Gulf General Trading Co.";

/**
 * Reads a logo PNG from /public at build time and returns its real pixel size,
 * so the header and footer can size it without guessing. Returns null if the
 * file is missing, and the site falls back to the text logo.
 *   logo.png        full-colour logo (header)
 *   logo-white.png  inverted logo for dark backgrounds (footer)
 */
export function getLogo(file: "logo.png" | "logo-white.png" = "logo.png"): Logo | null {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", file));
    // PNG: 8-byte signature, then the IHDR chunk with width/height at bytes 16-23.
    if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") return null;
    return {
      src: `/${file}`,
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
      alt: LOGO_ALT,
    };
  } catch {
    return null;
  }
}
