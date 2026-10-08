import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Accent } from "@/components/SectionHeading";
import { Gallery } from "@/components/sections/Gallery";
import { usePageMeta } from "@/hooks/usePageMeta";

export function GalleryPage() {
  usePageMeta("/gallery");
  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="Recent projects"
        title={
          <>
            Our work, <Accent>lit up</Accent>
          </>
        }
        intro="Real jobs across Edmonton — electrical installations and wedding and festival lighting. Filter by type and tap any photo to see it full size."
      />
      <Gallery heading="none" />
      <CtaBand />
    </>
  );
}
