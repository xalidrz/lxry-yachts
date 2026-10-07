import Link from "next/link";

import { EngravingIcon } from "@/components/engraving-icon";
import { Section, SectionHeading } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { engravingItems } from "@/data/engraving";
import { LABEL_LIST_MESSAGE } from "@/lib/whatsapp";

export function Engraving() {
  return (
    <Section tone="dark" id="engraving">
      <SectionHeading
        tone="dark"
        eyebrow="Engraving"
        title="Engraving and labelling for MEP projects"
      >
        Tags and labels for valves, cables and switchboards. Send us your list
        with the text, sizes and quantities and we will quote on WhatsApp.
      </SectionHeading>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {engravingItems.map(({ icon, title, text }) => (
          <li
            key={title}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-6"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-on-dark">
              <EngravingIcon icon={icon} className="size-6" />
            </span>
            <h3 className="font-display mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 leading-relaxed text-on-dark-muted">{text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <WhatsAppButton message={LABEL_LIST_MESSAGE} size="lg">
          Send your label list
        </WhatsAppButton>
        <Button asChild variant="secondary-dark" size="lg">
          <Link href="/engraving">How to order labels</Link>
        </Button>
      </div>
    </Section>
  );
}
