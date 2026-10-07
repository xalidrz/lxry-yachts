import type { Metadata } from "next";

import { Brands } from "@/components/home/brands";
import { Categories } from "@/components/home/categories";
import { Engraving } from "@/components/home/engraving";
import { Gases } from "@/components/home/gases";
import { Hero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { OG_IMAGE, localBusinessJsonLd } from "@/lib/seo";

const title =
  "HVAC, Electrical and Fixing Materials Supplier in Kuwait | Orient Group Gulf";
const description =
  "Copper pipes, refrigerant gases, insulation, conduits, chemical anchors and engraved labels for Kuwait contractors. Orient Group Gulf, Shuwaikh Industrial Area, since 2010.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", images: [OG_IMAGE] },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <Hero />
      <Categories />
      <Gases />
      <Brands />
      <Engraving />
      <Testimonials />
      <ContactSection />
    </>
  );
}
