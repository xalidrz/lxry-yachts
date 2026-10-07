import fs from "node:fs";
import path from "node:path";

export type Logo = { src: string; width: number; height: number; alt: string };

export const LOGO_ALT = "Orient Group Gulf General Trading Co.";

/**
 * Reads public/logo.png at build time and returns its real pixel size, so the
 * header and footer can size it without guessing. Returns null if the file is
 * missing, and the site falls back to the text logo.
 */
export function getLogo(): Logo | null {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "logo.png"));
    // PNG: 8-byte signature, then the IHDR chunk with width/height at bytes 16-23.
    if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") return null;
    return {
      src: "/logo.png",
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
      alt: LOGO_ALT,
    };
  } catch {
    return null;
  }
}
