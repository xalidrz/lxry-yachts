// Gallery slots. `src: null` renders a "Replace with salon photo" placeholder tile.
// To swap a photo: drop a JPG into public/gallery and point `src` at it (keep w/h = the file's real size).
// Captions live in translations.ts under gallery.captions.

export type GalleryItem = { id: string; src: string | null; w: number; h: number };

export const gallery: GalleryItem[] = [
  { id: "storefront-night", src: "/gallery/storefront-night.jpg", w: 1100, h: 825 },
  { id: "fade-crop", src: "/gallery/fade-crop.jpg", w: 825, h: 1100 },
  { id: "kids-chair", src: "/gallery/kids-chair.jpg", w: 1100, h: 825 },
  { id: "beard-shape", src: "/gallery/beard-shape.jpg", w: 825, h: 1100 },
  { id: "colour-texture", src: "/gallery/colour-texture.jpg", w: 1100, h: 1100 },
  { id: "low-fade", src: "/gallery/low-fade.jpg", w: 825, h: 1100 },
  { id: "silver-colour", src: "/gallery/silver-colour.jpg", w: 619, h: 1100 },
  { id: "taper-fade", src: "/gallery/taper-fade.jpg", w: 825, h: 1100 },
];
