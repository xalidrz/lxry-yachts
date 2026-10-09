import { PageHeader } from "@/components/page-header";
import { Services } from "@/components/services";
import { WhyElite } from "@/components/why-elite";
import { CtaBand } from "@/components/cta-band";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Auto Repair Services in Hayward, CA",
  description:
    "Uber and rideshare vehicle inspections, oil changes, engine diagnostics and misfire repair, auto electrical and wiring, clutch replacement, and mirror and body part repair at Elite Motorsports in Hayward, CA.",
  path: "/services",
  alt: heroPhoto.alt,
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we work on"
        intro="Run by the owner, Goldy. Call (510) 363-8275 to ask about your car."
      />
      <Services />
      <WhyElite />
      <CtaBand title="Not sure what it needs? Call us." />
    </>
  );
}
