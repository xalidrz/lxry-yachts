import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Brand buttons. `gold` is the only element besides the logo / key headline
 * words that carries the full gold gradient. The shine sweep is a pseudo-layer
 * that travels across on hover (see `shine` keyframes in tailwind.config.ts).
 */
const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-none font-label font-semibold uppercase tracking-label transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:-translate-x-[120%] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent hover:before:animate-[shine_0.9s_ease-out]",
  {
    variants: {
      variant: {
        gold: "bg-gold-gradient text-ink shadow-[0_10px_30px_-10px_rgba(201,160,74,0.6)] hover:shadow-[0_14px_36px_-8px_rgba(232,200,120,0.7)] hover:-translate-y-0.5",
        outline:
          "border border-gold bg-transparent text-gold-light hover:bg-gold/10 hover:border-gold-light hover:text-cream before:via-gold-light/25",
        ghost: "text-cream hover:text-gold-light before:hidden",
        chip: "border border-gold/25 bg-transparent text-muted-foreground hover:border-gold/70 hover:text-cream before:hidden data-[active=true]:border-gold data-[active=true]:bg-gold/15 data-[active=true]:text-gold-light",
      },
      size: {
        default: "h-12 px-7 text-[0.95rem]",
        sm: "h-10 px-5 text-[0.85rem]",
        lg: "h-14 px-9 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
