export type GoogleReview = {
  author: string;
  rating: number; // 1–5
  text: string;
  date: string; // e.g. "March 2026"
};

/**
 * Paste three real Google reviews here. Slots with an empty `text` are not
 * rendered, so the section stays clean until they are filled in.
 * Never write testimonials by hand.
 */
export const googleReviews: GoogleReview[] = [
  { author: "", rating: 5, text: "", date: "" },
  { author: "", rating: 5, text: "", date: "" },
  { author: "", rating: 5, text: "", date: "" },
];

export const filledReviews = googleReviews.filter((r) => r.text.trim().length > 0);
