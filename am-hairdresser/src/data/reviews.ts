// Three empty slots for REAL Google reviews. Copy them from the salon's Google Business profile — never invent any.
// A slot with an empty `text` is simply not shown on the page.

export type Review = {
  author: string;
  rating: number; // 1-5
  date: string; // e.g. "2 months ago"
  text: { en: string; ar: string };
};

export const reviews: Review[] = [
  { author: "", rating: 5, date: "", text: { en: "", ar: "" } },
  { author: "", rating: 5, date: "", text: { en: "", ar: "" } },
  { author: "", rating: 5, date: "", text: { en: "", ar: "" } },
];
