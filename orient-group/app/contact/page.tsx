import type { Metadata } from "next";

import { ContactSection } from "@/components/contact-section";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { OG_IMAGE, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

const title = "Contact";
const description =
  "Contact Orient Group Gulf in Shuwaikh Industrial Area, Kuwait: office 2492 1705, mobile 9095 0709, WhatsApp, email and map. HVAC, electrical and fixing materials.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Orient Group Gulf Kuwait",
    description,
    url: "/contact",
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        title="Contact Orient Group Gulf"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        Call, message on WhatsApp, email or visit us in Shuwaikh Industrial Area.
      </PageHero>
      <ContactSection asPage />
    </>
  );
}
