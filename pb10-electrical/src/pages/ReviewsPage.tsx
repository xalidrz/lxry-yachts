import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Accent } from "@/components/SectionHeading";
import { Reviews } from "@/components/sections/Reviews";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { usePageMeta } from "@/hooks/usePageMeta";

export function ReviewsPage() {
  usePageMeta("/reviews");
  return (
    <>
      <PageHero
        crumb="Reviews"
        eyebrow="Reviews"
        title={
          <>
            Trusted by <Accent>Edmonton</Accent> customers
          </>
        }
        intro="Rated 4.6 on Google. Here's what customers say — and why people keep choosing PB10."
      />
      <Reviews bare />
      <WhyChoose />
      <CtaBand />
    </>
  );
}
