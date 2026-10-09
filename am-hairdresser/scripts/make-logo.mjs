// Cuts the round badge out of the supplied logo image (gold rays background removed) into public/logo.png.
// Usage: node scripts/make-logo.mjs <path-to-original-logo-image>
// The numbers below are the badge's position inside the 227x220 original; adjust them for a different source.
import sharp from "sharp";

const src = process.argv[2];
if (!src) throw new Error("Usage: node scripts/make-logo.mjs <logo image>");
const box = { left: 16, top: 19, width: 192, height: 192 }; // square around the badge
const c = { x: 95.7, y: 95.6, r: 94.6 }; // badge centre/radius inside that box
const S = 3; // upscale factor before the final 512px export

const up = await sharp(src).extract(box).resize(box.width * S, box.height * S, { kernel: "lanczos3" }).ensureAlpha().toBuffer();
const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${box.width * S}" height="${box.height * S}"><circle cx="${c.x * S}" cy="${c.y * S}" r="${c.r * S}" fill="#fff"/></svg>`,
);
// sharp applies composite after resize, so do each stage as its own pass.
const masked = await sharp(up).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
const side = Math.round(2 * c.r * S);
const cropped = await sharp(masked)
  .extract({ left: Math.round((c.x - c.r) * S), top: Math.round((c.y - c.r) * S), width: side, height: side })
  .png()
  .toBuffer();
await sharp(cropped).resize(512, 512, { kernel: "lanczos3" }).sharpen({ sigma: 0.7 }).png({ compressionLevel: 9 }).toFile("public/logo.png");
console.log("public/logo.png written");
