import { Bolt, Cog, Cylinder, Snowflake, Tag, Wind, Wrench, Zap, type LucideProps } from "lucide-react";

import type { ShopGroup } from "@/data/shop-groups";

const icons = {
  snowflake: Snowflake,
  cylinder: Cylinder,
  wind: Wind,
  wrench: Wrench,
  zap: Zap,
  bolt: Bolt,
  cog: Cog,
  tag: Tag,
} as const;

export function GroupIcon({ icon, ...props }: { icon: ShopGroup["icon"] } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" {...props} />;
}
