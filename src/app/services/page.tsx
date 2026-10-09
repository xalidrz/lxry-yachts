import { PageHeader } from "@/components/page-header";
import { Services } from "@/components/services";
import { WhyElite } from "@/components/why-elite";
import { CtaBand } from "@/components/cta-band";
import { heroPhoto } from "@/data/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Auto Repair Services in Hayward, CA",
  description:
    "Rideshare vehicle inspections, oil changes, engine diagnostics and misfire repair, and auto electrical work at Elite Motorsports in Hayward, CA. Call for a quote.",
  path: "/services",
  alt: heroPhoto.alt,
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we work on"
        intro="Mechanical and electrical work, handled by the owner. Call for a quote on your car."
      />
      <Services />
      <WhyElite />
      <CtaBand title="Not sure what it needs? Call us." />
    </>
  );
}
