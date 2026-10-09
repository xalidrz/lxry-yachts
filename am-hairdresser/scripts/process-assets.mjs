// Resizes the salon photos into public/gallery and renders the logo PNGs.
// Usage: node scripts/process-assets.mjs <folder-with-original-photos>
// The originals are not committed (they are 3-4 MB each); this script documents how the web copies were made.
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const src = process.argv[2];
const pub = path.resolve("public");

// output name -> original file in <src>
const photos = {
  "storefront-night": "p-001.jpg",
  "kids-chair": "p-002.jpg",
  "colour-texture": "p-003.jpg",
  "beard-shape": "p-007.jpg",
  "fade-crop": "p-008.jpg",
  "low-fade": "p-011.jpg",
  "taper-fade": "p-012.jpg",
  "silver-colour": "color.png",
};

if (src) {
  await mkdir(path.join(pub, "gallery"), { recursive: true });
  for (const [out, file] of Object.entries(photos)) {
    const info = await sharp(path.join(src, file))
      .rotate()
      .resize({ width: 1100, height: 1100, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 74, mozjpeg: true })
      .toFile(path.join(pub, "gallery", `${out}.jpg`));
    console.log(out, info.width, info.height, Math.round(info.size / 1024) + "KB");
  }
} else {
  console.log("No photo folder given — only rendering logo assets.");
}

// logo → PNGs
const logo = await readFile(path.join(pub, "logo.svg"));
const render = (size) => sharp(logo, { density: 300 }).resize(size, size).png({ compressionLevel: 9 });
await render(512).toFile(path.join(pub, "logo-512.png"));
await render(180).toFile(path.join("src", "app", "apple-icon.png"));
await render(64).toFile(path.join("src", "app", "icon.png"));

// Open Graph image 1200x630 (logo + wordmark)
const logoPng = await render(380).toBuffer();
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="r" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#241d0e"/><stop offset="1" stop-color="#0B0B0B"/></radialGradient>
  <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#E6C878"/><stop offset="1" stop-color="#A8802F"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#r)"/>
  <rect x="24" y="24" width="1152" height="582" rx="18" fill="none" stroke="#C9A24A" stroke-opacity=".5"/>
  <g font-family="Georgia, 'DejaVu Serif', serif" fill="#F2EEE6">
    <text x="520" y="268" font-size="50" font-weight="700">AM Hairdresser Salon</text>
    <text x="520" y="334" font-size="30" fill="#C9A24A" font-style="italic">Men's Barber in Muharraq, Bahrain</text>
  </g>
  <rect x="520" y="372" width="120" height="3" fill="url(#g)"/>
  <g font-family="Helvetica, Arial, sans-serif" fill="#F2EEE6" font-size="30">
    <text x="520" y="432">4.9 ★  ·  83 Google reviews</text>
    <text x="520" y="480" fill="#BDB6A6">Road 55, Block 210 · +973 3563 4883</text>
  </g>
</svg>`;
await sharp(Buffer.from(og))
  .composite([{ input: logoPng, left: 90, top: 125 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(pub, "og.png"));
console.log("logo + og done");
