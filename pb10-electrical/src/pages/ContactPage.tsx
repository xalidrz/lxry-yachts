import { PageHero } from "@/components/PageHero";
import { Accent } from "@/components/SectionHeading";
import { Contact } from "@/components/sections/Contact";
import { usePageMeta } from "@/hooks/usePageMeta";

export function ContactPage() {
  usePageMeta("/contact");
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact"
        title={
          <>
            Get your <Accent>free quote</Accent>
          </>
        }
        intro="Tell us about your electrical job or your event. We'll call you back to arrange a free site visit."
      />
      <Contact bare />
    </>
  );
}
