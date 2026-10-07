import fs from "node:fs";
import path from "node:path";

import { imageSize } from "image-size";

import type { Locale } from "./i18n";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

const DIR = path.join(process.cwd(), "public", "engraving");
const EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Descriptions for the sample-work photos, keyed by file name. Optional: a photo
 * without an entry gets a generic description. Write what the photo actually
 * shows, e.g. "Engraved traffolyte valve tags on a chilled water line".
 */
const captions: Record<string, Record<Locale, string>> = {
  // "valve-tags.jpg": { en: "Engraved valve tags", ar: "لوحات تعريف صمامات محفورة" },
};

/**
 * Sample work shown on the Engraving page. Drop photos into public/engraving/
 * and they appear in the gallery on the next build (sorted by file name).
 * With no photos the whole section is hidden.
 */
export function getEngravingGallery(): GalleryImage[] {
  let files: string[];
  try {
    files = fs.readdirSync(DIR).filter((f) => EXT.test(f)).sort();
  } catch {
    return [];
  }
  const images: GalleryImage[] = [];
  files.forEach((file, i) => {
    try {
      const { width, height } = imageSize(fs.readFileSync(path.join(DIR, file)));
      if (!width || !height) return;
      const n = i + 1;
      images.push({
        src: `/engraving/${file}`,
        width,
        height,
        alt: captions[file] ?? {
          en: `Engraving and labelling sample work by Orient Group Gulf, photo ${n}`,
          ar: `نموذج من أعمال الحفر والملصقات لدى أورينت جروب جلف، صورة ${n}`,
        },
      });
    } catch {
      /* skip unreadable files */
    }
  });
  return images;
}
