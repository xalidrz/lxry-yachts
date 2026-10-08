export type GalleryCategory = "electrical" | "wedding";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  /** Full-size image (lightbox). */
  src: string;
  /** Smaller image for the grid. */
  thumb: string;
  /** Intrinsic size of `src` — drives the masonry aspect ratio and prevents layout shift. */
  width: number;
  height: number;
  alt: string;
}

const photo = (slug: string) => ({ src: `/photos/${slug}.webp`, thumb: `/photos/${slug}-sm.webp` });

/**
 * All images are real project photos in /public/photos (see `npm run photos`). The electrical stills come from
 * a walkthrough video of a finished home. Interleaved on purpose so the "All" view mixes both kinds of work.
 */
export const gallery: GalleryItem[] = [
  { id: "entrance", title: "Entrance & porch decor", category: "wedding", ...photo("wedding-entrance-decor"), width: 1800, height: 1350, alt: "A house porch draped in curtains of warm white lights with a red-and-white decorated front door" },
  { id: "feature-wall", title: "Feature wall & accent lighting", category: "electrical", ...photo("electrical-accent-lighting"), width: 1013, height: 1800, alt: "A two-storey black slatted feature wall with gold inlays, wall sconces and recessed ceiling lights" },
  { id: "bluehour", title: "Curtain lights at dusk", category: "wedding", ...photo("wedding-house-bluehour"), width: 1350, height: 1800, alt: "A two-storey house wrapped in curtains of fairy lights under a blue evening sky" },
  { id: "chandelier", title: "Statement chandelier", category: "electrical", ...photo("electrical-chandelier"), width: 1013, height: 1800, alt: "A tiered square LED chandelier hanging in front of a dark slatted feature wall" },
  { id: "night", title: "Full house lighting", category: "wedding", ...photo("wedding-house-night"), width: 1800, height: 1350, alt: "A large house at night with every roofline and wall covered in warm string lights" },
  { id: "stairs", title: "Stair step lighting", category: "electrical", ...photo("electrical-stair-lights"), width: 1013, height: 1800, alt: "A staircase with small recessed lights built into the steps" },
  { id: "marquee", title: "Garden & marquee reception", category: "wedding", ...photo("wedding-garden-marquee"), width: 1350, height: 1800, alt: "A lit-up house with a white marquee tent and a garden full of flowers" },
  { id: "vanity", title: "Vanity & pot lighting", category: "electrical", ...photo("electrical-vanity-lights"), width: 1013, height: 1800, alt: "Recessed lights above a bathroom vanity mirror in a newly finished home" },
  { id: "estate", title: "Estate lighting at dusk", category: "wedding", ...photo("wedding-estate-dusk"), width: 1800, height: 1350, alt: "A large home at dusk covered in glowing curtain lights, with cars parked out front" },
  { id: "backyard", title: "Backyard reception setup", category: "wedding", ...photo("wedding-backyard-reception"), width: 1350, height: 1800, alt: "A brick house outlined in warm lights at night with a tent and tables set up in the yard" },
];
