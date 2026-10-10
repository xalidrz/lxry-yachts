import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * "Pearl" glossy pill. All the paint (gradients, gloss, shadows, hover streak,
 * press, focus ring, reduced-motion) lives in the `.pearl` rules in globals.css.
 *
 *   primary   = deep red pearl   (Call Now, sticky Call)
 *   secondary = dark pearl       (Get Directions, All services, See all photos, Read all reviews)
 *
 * Size is 48px tall on mobile and 52px from md up. `sm` and `icon` are 44px,
 * the minimum tap target, for the navbar, category tabs and viewer controls.
 * Icons inside are Lucide and are sized to 18px by the stylesheet.
 */
const pearlButtonVariants = cva(
  "pearl group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-display font-semibold uppercase tracking-[0.08em] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "pearl-primary",
        secondary: "pearl-secondary",
      },
      size: {
        default: "h-12 px-7 text-[1.0625rem] md:h-[52px]",
        sm: "h-11 px-5 text-[0.9375rem]",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface PearlButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof pearlButtonVariants> {
  asChild?: boolean;
}

function PearlButton({ className, variant, size, asChild = false, ...props }: PearlButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(pearlButtonVariants({ variant, size }), className)} {...props} />;
}

export { PearlButton, pearlButtonVariants };
