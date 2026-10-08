/**
 * Turns the original (huge) project photos into web-sized WebP files in /public/photos:
 *   <name>.webp     long edge 1800px — hero, lightbox
 *   <name>-sm.webp  long edge 900px  — gallery grid and cards
 * Prints each file's final size so src/data/gallery.ts can be kept in sync.
 *
 *   npm run photos -- /path/to/originals [/path/to/video-frames]
 *
 * The originals are not committed; `files` / `frames` map their names to the output slugs.
 * The electrical stills were cut from the project walkthrough video:
 *   ffmpeg -ss 19.1 -i walkthrough.mp4 -frames:v 1 -q:v 2 frames/frame-19.1.png   (repeat per timestamp)
 */
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inDir = process.argv[2];
if (!inDir) {
  console.error("Usage: npm run photos -- <folder with original photos>");
  process.exit(1);
}
const out = resolve(root, "public/photos");
mkdirSync(out, { recursive: true });

const files = {
  "img-000.jpg": "wedding-entrance-decor",
  "img-001.jpg": "wedding-house-night",
  "img-002.jpg": "wedding-house-bluehour",
  "img-003.jpg": "wedding-garden-marquee",
  "img-004.jpg": "wedding-estate-dusk",
  "img-005.jpg": "wedding-backyard-reception",
};

const frames = {
  "frame-19.1.png": "electrical-feature-wall",
  "frame-3.1.png": "electrical-accent-lighting",
  "frame-20.2.png": "electrical-chandelier",
  "frame-4.2.png": "electrical-stair-lights",
  "frame-7.3.png": "electrical-vanity-lights",
};
const framesDir = process.argv[3];

const jobs = [...Object.entries(files).map(([f, slug]) => [resolve(inDir, f), slug])];
if (framesDir) jobs.push(...Object.entries(frames).map(([f, slug]) => [resolve(framesDir, f), slug]));

for (const [src, slug] of jobs) {
  for (const [suffix, edge, quality] of [["", 1800, 76], ["-sm", 900, 72]]) {
    const info = await sharp(src)
      .rotate() // honour EXIF orientation
      .resize({ width: edge, height: edge, fit: "inside", withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(resolve(out, `${slug}${suffix}.webp`));
    if (!suffix) console.log(`${slug}: ${info.width}x${info.height}`);
  }
}
