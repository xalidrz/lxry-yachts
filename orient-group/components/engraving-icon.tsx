import {
  Cable,
  Frame,
  Gift,
  Layers,
  PanelTop,
  Scissors,
  Signpost,
  Tag,
  TreePine,
  type LucideProps,
} from "lucide-react";

import type { EngravingItem } from "@/data/engraving";

const icons = {
  tag: Tag,
  cable: Cable,
  panel: PanelTop,
  signpost: Signpost,
  scissors: Scissors,
  gift: Gift,
  layers: Layers,
  tree: TreePine,
  frame: Frame,
} as const;

export function EngravingIcon({
  icon,
  ...props
}: { icon: EngravingItem["icon"] } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" {...props} />;
}
