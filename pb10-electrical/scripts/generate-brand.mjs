/**
 * Builds the brand assets in /public from the supplied logo (scripts/logo-source.png):
 *   logo.png            full logo on a transparent background (dark backdrop keyed out)
 *   logo-wordmark.png   the PB10ELECTRICAL lettering only (used in the navbar, where the bolt would be too small)
 *   favicon.svg/.png, apple-touch-icon.png, og-image.jpg
 *
 *   npm run brand
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pub = (f) => resolve(root, "public", f);

// ---- key the near-black backdrop out of the supplied artwork ----
const src = await sharp(resolve(root, "scripts/logo-source.png")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = src.info;
const rgba = Buffer.from(src.data);
for (let i = 0; i < rgba.length; i += 4) {
  const m = Math.max(rgba[i], rgba[i + 1], rgba[i + 2]);
  rgba[i + 3] = Math.max(0, Math.min(255, Math.round(((m - 48) / 52) * 255)));
}
const keyed = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });

// Content bounds measured on the source (x 95–635, y 9–251); the lettering sits at y ≈ 50–112.
const full = { left: 90, top: 4, width: 552, height: 250 };
const word = { left: 90, top: 50, width: 552, height: 60 };

await keyed.clone().extract(full).png({ compressionLevel: 9 }).toFile(pub("logo.png"));
await keyed.clone().extract(word).png({ compressionLevel: 9 }).toFile(pub("logo-wordmark.png"));

// ---- favicon / touch icon: a clean bolt in the brand gradient (the logo's own bolt sits behind the lettering) ----
const boltSvg = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB627"/><stop offset="1" stop-color="#F7931E"/></linearGradient></defs>
  <rect width="64" height="64" rx="${radius}" fill="#121212"/>
  <path d="M37 6 15 36h14l-5 22 25-32H35z" fill="url(#g)"/>
</svg>`;
writeFileSync(pub("favicon.svg"), boltSvg(64, 14));
await sharp(Buffer.from(boltSvg(64, 14))).png().toFile(pub("favicon.png"));
await sharp(Buffer.from(boltSvg(180, 0))).resize(180, 180).png().toFile(pub("apple-touch-icon.png"));

// ---- 1200×630 social card ----
const logoBuf = await sharp(pub("logo.png")).resize({ width: 760 }).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();
const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#F7931E" stop-opacity=".38"/><stop offset="1" stop-color="#F7931E" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#121212"/><rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="618" width="1200" height="12" fill="#C1121F"/>
  <text x="600" y="590" text-anchor="middle" font-family="Arial Narrow, Arial, sans-serif" font-size="30" letter-spacing="5" fill="#A8A8A8">ELECTRICAL  ·  WEDDING LIGHTING DECOR  ·  EDMONTON, AB</text>
</svg>`;
await sharp(Buffer.from(bg))
  .composite([{ input: logoBuf, left: Math.round((1200 - logoMeta.width) / 2), top: Math.round((560 - logoMeta.height) / 2) + 6 }])
  .jpeg({ quality: 86 })
  .toFile(pub("og-image.jpg"));

writeFileSync(pub("robots.txt"), "User-agent: *\nAllow: /\n");
console.log("Wrote logo.png, logo-wordmark.png, favicon.svg/png, apple-touch-icon.png, og-image.jpg, robots.txt");
