export type ReviewTopic = "inspection" | "diagnosis" | "brakes" | "clutch" | "mirror";

export type Review = {
  name: string;
  /** Google's badge, shown when the reviewer has one. */
  badge?: "Local Guide";
  year: number;
  /** Chip text on the card, only where the review is about one clear job. */
  tag?: string;
  /** Which filter chip shows this review. Reviews without a topic only appear under "All". */
  topic?: ReviewTopic;
  /** Shown large above the scrolling rows instead of in them. */
  featured?: boolean;
  /**
   * Review text, exactly as written on Google. Do not fix spelling, shorten or rewrite.
   * To add or change a review, edit this list only. Never write testimonials by hand.
   */
  text: string;
};

export const reviews: Review[] = [
  {
    name: "suman suman",
    year: 2026,
    tag: "UBER INSPECTION + OIL CHANGE",
    topic: "inspection",
    text: "I got my Uber inspection and oil change done at Elite Motors, and I had a great experience. The owner, Goldy, is very professional, helpful, and friendly. The work was done quickly and efficiently, and the pricing is very reasonable. If you need any kind of car work—inspection, oil change, or other services—you can definitely come here. I highly recommend Elite Motors to everyone. Great service and honest work!",
  },
  {
    name: "Arav Parmar",
    year: 2025,
    tag: "DIAGNOSIS",
    topic: "diagnosis",
    text: "Amazing amazing service. I've brought a couple of cars here for both diagnoses and actual service to be done to them, and always left in perfect condition. Fair pricing, great work, and amazing attitude! Highly recommend for any automotive needs.",
  },
  {
    name: "Haroon Ali",
    badge: "Local Guide",
    year: 2025,
    tag: "BRAKES",
    topic: "brakes",
    text: "I had my Prius worked on. I had no breaks after another shop fixed it. These guys not only fixed the issue plus took care of other needs.",
  },
  {
    name: "Pehchan Mannan",
    year: 2025,
    tag: "CLUTCH",
    topic: "clutch",
    text: "Great shop and great hospitality . Dropped my vehicle off for a clutch replacement very affordable and was given back my car a day before the deadline would recommend!",
  },
  {
    name: "hrushikesh kulkarni",
    badge: "Local Guide",
    year: 2025,
    tag: "MIRROR",
    topic: "mirror",
    text: "Walked in today with a broken side view mirror and they fixed it promptly. They even salvaged most of the parts from my previous assembly, which were working well. Hence saving a lot of money. Would highly recommend them.",
  },
  {
    name: "Simon Bhangal",
    year: 2025,
    text: "Best service around and better prices than anyone. Would never go to anyone else for my auto service or repair.",
  },
  {
    name: "Maria Naranjo",
    year: 2025,
    text: "I've been bringing my cars here for years, the service is always excellent.",
  },
  {
    name: "Francisco Carrasco",
    badge: "Local Guide",
    year: 2021,
    text: "Goldy & Victor provide affordable auto repair work for their community. They run a professional business that brings a culture of family values. I've recommended several friends and family members. They have become our family mechanics!",
  },
  {
    name: "Fzelle A Grant",
    badge: "Local Guide",
    year: 2021,
    tag: "DIAGNOSIS",
    topic: "diagnosis",
    text: "Here at Elite Motorsports. They take the time out to explain how long it takes. How much you are saving. What you really need for you car. Not something that sounds good!! But what's right for your vehicle!",
  },
  {
    name: "Ashwin Kumar",
    badge: "Local Guide",
    year: 2019,
    featured: true,
    text: "The epitome of fantastic high touch customer service. Goldie and his team are honest, very customer focussed and will do their best to fix your vehicle in the most cost effective manner.",
  },
  {
    name: "Derick Honig",
    year: 2017,
    text: "I would like to say Elite Motorsport will have a repeat customer. Goldy gave me a great price on installing my lift followed through with everything not to mention he dealt with my annoying texts. I will recommend Elite Motorsports to all my friends and family. I highly recommend you give them a call and let them take care of you.",
  },
  {
    name: "Beast Dada",
    year: 2026,
    text: "Honest opinion and amazing service. Recommend it 100%",
  },
  {
    name: "Gagandeep Singh",
    year: 2025,
    text: "Great service. Highly recommend. Quality work!",
  },
];

export const featuredReview = reviews.find((r) => r.featured)!;
/** Everything except the featured quote, in the order given. */
export const rowReviews = reviews.filter((r) => !r.featured);

export const topics: { id: ReviewTopic | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "inspection", label: "Inspection" },
  { id: "diagnosis", label: "Diagnosis" },
  { id: "brakes", label: "Brakes" },
  { id: "clutch", label: "Clutch" },
  { id: "mirror", label: "Mirror" },
];

export const reviewsForTopic = (topic: ReviewTopic | "all") =>
  topic === "all" ? rowReviews : rowReviews.filter((r) => r.topic === topic);

/** The marquee splits the cards into two rows. */
export const marqueeRows = [rowReviews.slice(0, Math.ceil(rowReviews.length / 2)), rowReviews.slice(Math.ceil(rowReviews.length / 2))] as const;
