import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium transition-all duration-500 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Soft gold pill, dark text. Used on dark backgrounds.
        gold: "bg-gold text-espresso shadow-soft hover:-translate-y-0.5 hover:bg-[#f7d8a6] hover:shadow-lift",
        // White outline pill for dark backgrounds.
        outline: "border border-white/80 bg-transparent text-white hover:-translate-y-0.5 hover:bg-white hover:text-espresso",
        // Espresso pill for cream backgrounds.
        dark: "bg-espresso text-gold shadow-soft hover:-translate-y-0.5 hover:bg-espresso-soft hover:shadow-lift",
        // Outline for cream backgrounds.
        "outline-dark": "border border-espresso/50 bg-transparent text-espresso hover:-translate-y-0.5 hover:bg-espresso hover:text-cream",
      },
      size: {
        default: "h-12 px-7 text-[0.95rem]",
        lg: "h-14 px-9 text-base",
        sm: "h-11 px-6 text-sm",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
