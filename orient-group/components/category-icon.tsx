import { Bolt, Cog, Snowflake, Zap, type LucideProps } from "lucide-react";

import type { Category } from "@/data/categories";

const icons = {
  snowflake: Snowflake,
  bolt: Bolt,
  zap: Zap,
  cog: Cog,
} as const;

export function CategoryIcon({
  icon,
  ...props
}: { icon: Category["icon"] } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" {...props} />;
}
