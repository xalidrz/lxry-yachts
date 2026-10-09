export type GoogleReview = {
  author: string;
  /** true when the reviewer shows Google's "Local Guide" badge */
  localGuide?: boolean;
  rating: number; // 1 to 5
  /** Review text, exactly as written on Google. Do not edit, shorten or clean up. */
  text: string;
};

/**
 * Real Google reviews. To add or change one, edit this list only.
 * Never write testimonials by hand.
 */
export const googleReviews: GoogleReview[] = [
  {
    author: "suman suman",
    rating: 5,
    text: "I got my Uber inspection and oil change done at Elite Motors, and I had a great experience. The owner, Goldy, is very professional, helpful, and friendly. The work was done quickly and efficiently, and the pricing is very reasonable. If you need any kind of car work—inspection, oil change, or other services—you can definitely come here. I highly recommend Elite Motors to everyone. Great service and honest work!",
  },
  {
    author: "Arav Parmar",
    rating: 5,
    text: "Amazing amazing service. I've brought a couple of cars here for both diagnoses and actual service to be done to them, and always left in perfect condition. Fair pricing, great work, and amazing attitude! Highly recommend for any automotive needs.",
  },
  {
    author: "hrushikesh kulkarni",
    localGuide: true,
    rating: 5,
    text: "Walked in today with a broken side view mirror and they fixed it promptly. They even salvaged most of the parts from my previous assembly, which were working well. Hence saving a lot of money. Would highly recommend them.",
  },
  {
    author: "Maria Naranjo",
    rating: 5,
    text: "I've been bringing my cars here for years, the service is always excellent.",
  },
  {
    author: "Ashwin Kumar",
    localGuide: true,
    rating: 5,
    text: "The epitome of fantastic high touch customer service. Goldie and his team are honest, very customer focussed and will do their best to fix your vehicle in the most cost effective manner.",
  },
  {
    author: "Beast Dada",
    rating: 5,
    text: "Honest opinion and amazing service. Recommend it 100%",
  },
  {
    author: "Gagandeep Singh",
    rating: 5,
    text: "Great service. Highly recommend. Quality work!",
  },
];

/** Home page shows the first three; the Reviews page shows all of them. */
export const previewReviews = googleReviews.slice(0, 3);
