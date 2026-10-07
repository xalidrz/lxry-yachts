import { Cable, PanelTop, Signpost, Tag, type LucideProps } from "lucide-react";

import type { EngravingItem } from "@/data/engraving";

const icons = { tag: Tag, cable: Cable, panel: PanelTop, signpost: Signpost } as const;

export function EngravingIcon({
  icon,
  ...props
}: { icon: EngravingItem["icon"] } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" {...props} />;
}
