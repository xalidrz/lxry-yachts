import type { Metadata } from "next";
import { Check } from "lucide-react";

import { EngravingIcon } from "@/components/engraving-icon";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { engravingItems, labelListChecklist } from "@/data/engraving";
import { OG_IMAGE, breadcrumbJsonLd } from "@/lib/seo";
import { LABEL_LIST_MESSAGE } from "@/lib/whatsapp";

const title = "Engraving and Labelling for MEP Projects";
const description =
  "Engraved valve tags, cable markers, switchboard labels, signs and stickers for MEP projects in Kuwait. Send your label list to Orient Group Gulf on WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/engraving" },
  openGraph: {
    title: `${title} | Orient Group Gulf Kuwait`,
    description,
    url: "/engraving",
    images: [OG_IMAGE],
  },
};

export default function EngravingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Engraving", path: "/engraving" },
        ])}
      />
      <PageHero
        title="Engraving and labelling for MEP projects"
        crumbs={[{ label: "Home", href: "/" }, { label: "Engraving" }]}
      >
        Valve tags, cable markers, switchboard labels, signs and stickers. Send
        us your list on WhatsApp and we reply with a price and delivery time.
      </PageHero>

      <Section className="pt-10 sm:pt-12">
        <ul className="grid gap-5 sm:grid-cols-2">
          {engravingItems.map(({ icon, title: itemTitle, text }) => (
            <li key={itemTitle} className="flex gap-5 rounded-2xl border bg-card p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-charcoal text-on-dark">
                <EngravingIcon icon={icon} className="size-6" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold">{itemTitle}</h2>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <SectionHeading title="What to include in your label list" className="mb-6">
              A complete list gets you an accurate price on the first reply. A
              spreadsheet, a photo of a schedule or a typed list all work.
            </SectionHeading>
            <ul className="space-y-3">
              {labelListChecklist.map((line) => (
                <li key={line} className="flex gap-3 text-lg">
                  <Check className="mt-1 size-5 shrink-0 text-brand" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="on-dark rounded-2xl bg-charcoal p-6 text-on-dark sm:p-8">
            <h2 className="font-display text-2xl font-extrabold">Ready to send it?</h2>
            <p className="mt-3 leading-relaxed text-on-dark-muted">
              Open WhatsApp, attach your list and send. We confirm the price and
              delivery time.
            </p>
            <WhatsAppButton message={LABEL_LIST_MESSAGE} size="lg" className="mt-6">
              Send your label list
            </WhatsAppButton>
          </div>
        </div>
      </Section>
    </>
  );
}
