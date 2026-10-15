import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-sm font-medium [&_svg]:size-3.5", {
  variants: {
    variant: {
      default: "border-border bg-secondary text-foreground",
      accent: "border-primary/40 bg-primary/10 text-emerald-300",
      solid: "border-primary bg-primary text-primary-foreground",
      muted: "border-border bg-transparent text-muted-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
