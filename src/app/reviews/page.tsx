import { PageHeader } from "@/components/page-header";
import { Reviews } from "@/components/reviews";
import { CtaBand } from "@/components/cta-band";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Reviews: 4.7★ from 51 Google Reviews",
  description:
    "Elite Motorsports in Hayward, CA is rated 4.7★ from 51 Google reviews. Reviewers tag us for a trustworthy mechanic, a helpful owner, honest work and cost savings.",
  path: "/reviews",
  alt: heroPhoto.alt,
});

export default function ReviewsPage() {
  return (
    <>
      <PageHeader eyebrow="Reviews" title="What Hayward says" />
      <Reviews />
      <CtaBand />
    </>
  );
}
