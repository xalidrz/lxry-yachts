import { PageHeader } from "@/components/page-header";
import { Gallery } from "@/components/gallery";
import { CtaBand } from "@/components/cta-band";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Work: Photos from the Shop",
  description:
    "Photos from the Elite Motorsports shop in Hayward, CA: engine and wiring repairs, under-car work, and the cars that come through our bays.",
  path: "/work",
  alt: heroPhoto.alt,
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Straight from the shop floor"
        intro="Real jobs in our Hayward bays: engines, wiring, under-car work and the cars that come through. Every photo is untouched."
      />
      <Gallery />
      <CtaBand />
    </>
  );
}
