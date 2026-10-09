import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pill button system. primary = solid red, ghost = solid #17191C with a
 * white/15 border. Solid fills only.
 */
const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-bold uppercase tracking-[0.08em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-signal text-white hover:bg-signal-bright hover:ring-2 hover:ring-signal-bright hover:ring-offset-2 hover:ring-offset-graphite",
        ghost:
          "bg-surface text-ink border border-white/15 hover:border-signal hover:text-white hover:ring-1 hover:ring-signal",
      },
      size: {
        default: "h-12 px-6 text-base",
        sm: "h-10 px-5 text-sm",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
