import { Cable, PanelTop, Signpost, Tag } from "lucide-react";

import { Section, SectionHeading } from "@/components/section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { LABEL_LIST_MESSAGE } from "@/lib/whatsapp";

const items = [
  {
    icon: Tag,
    title: "Valve tags",
    text: "Engraved traffolyte and stainless steel.",
  },
  {
    icon: Cable,
    title: "Cable markers",
    text: "Markers for identifying cables and circuits.",
  },
  {
    icon: PanelTop,
    title: "Switchboard labels",
    text: "Engraved plastic and etched aluminium.",
  },
  {
    icon: Signpost,
    title: "Signage and stickers",
    text: "UV-rated small signs, plaques, print-and-cut stickers.",
  },
];

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
        {items.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-6"
          >
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-on-dark">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="font-display mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 leading-relaxed text-on-dark-muted">{text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <WhatsAppButton message={LABEL_LIST_MESSAGE} size="lg">
          Send your label list
        </WhatsAppButton>
      </div>
    </Section>
  );
}
