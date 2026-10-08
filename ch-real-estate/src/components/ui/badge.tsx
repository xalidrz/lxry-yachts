import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-label text-xs font-semibold uppercase tracking-label px-3 py-1.5 backdrop-blur-md",
  {
    variants: {
      variant: {
        solid: "bg-gold-gradient text-ink",
        outline: "border border-gold/60 bg-ink/70 text-gold-light",
        dark: "border border-cream/20 bg-ink/70 text-cream",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
