import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Pill buttons, icon on the left, 44px minimum tap height.
 * primary = brand red, whatsapp = green (main CTAs), whatsapp-outline = green
 * outline for card buttons (solid on hover), secondary = transparent with a 1px border
 * (use secondary-dark on charcoal / dark surfaces).
 */
const buttonVariants = cva(
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent px-6 py-2.5 text-base font-semibold leading-none transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-hover",
        whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-hover",
        "whatsapp-outline":
          "border-whatsapp bg-white text-whatsapp hover:bg-whatsapp hover:text-white",
        secondary:
          "border-border bg-transparent text-foreground hover:border-brand-grey hover:bg-black/[0.04]",
        "secondary-dark":
          "border-white/35 bg-transparent text-white hover:border-white/70 hover:bg-white/10",
        ghost: "text-foreground hover:bg-black/5",
      },
      size: {
        default: "",
        sm: "min-h-11 px-5 text-[0.9375rem]",
        lg: "min-h-12 px-7 text-[1.0625rem]",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
