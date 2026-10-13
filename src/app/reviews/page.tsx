import { Reviews } from "@/components/sections/reviews";
import { ReviewCta } from "@/components/sections/review-cta";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Customer Reviews",
  description: "What customers say about Elite Motorsports in Hayward, CA: 4.7 stars from 51 Google reviews.",
  path: "/reviews",
  alt: heroPhoto.alt,
});

export default function Page() {
  return (
    <>
      <Reviews />
      <ReviewCta />
    </>
  );
}
