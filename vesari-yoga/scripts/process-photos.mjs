// Turns the original photos into web-sized WebP files in public/photos.
// Usage: node scripts/process-photos.mjs <folder with 1.webp … 4.webp>
import sharp from "sharp";
import path from "node:path";

const src = process.argv[2];
if (!src) throw new Error("Pass the folder that holds the original photos.");
const jobs = [
  { from: "2.webp", name: "forward-fold", widths: [640, 1100] },
  { from: "3.webp", name: "childs-pose", widths: [640, 1100] },
  { from: "4.webp", name: "studio-balance", widths: [640, 1100, 1600] },
];
for (const { from, name, widths } of jobs) {
  for (const w of widths) {
    const out = path.join("public/photos", `${name}-${w}.webp`);
    const info = await sharp(path.join(src, from)).resize({ width: w }).webp({ quality: 74, effort: 6 }).toFile(out);
    console.log(out, `${Math.round(info.size / 1024)} KB`, `${info.width}x${info.height}`);
  }
}
