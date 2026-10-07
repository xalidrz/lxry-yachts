/** Engraving and labelling services, shown on the home page and on /engraving. */
export type EngravingItem = {
  icon: "tag" | "cable" | "panel" | "signpost";
  title: string;
  text: string;
};

export const engravingItems: EngravingItem[] = [
  { icon: "tag", title: "Valve tags", text: "Engraved traffolyte and stainless steel." },
  { icon: "cable", title: "Cable markers", text: "Markers for identifying cables and circuits." },
  { icon: "panel", title: "Switchboard labels", text: "Engraved plastic and etched aluminium." },
  {
    icon: "signpost",
    title: "Signage and stickers",
    text: "UV-rated small signs, plaques, print-and-cut stickers.",
  },
];

/** What a customer should include when sending a label list. */
export const labelListChecklist = [
  "The exact text for each tag or label, one line per item",
  "Quantity of each",
  "Size, or the space it has to fit",
  "Material and colour, if you have a project specification",
  "How it will be fixed: holes, chain, cable tie or adhesive",
  "Your delivery date and site location",
];
