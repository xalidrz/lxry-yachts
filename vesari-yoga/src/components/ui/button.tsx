import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-terracotta text-white shadow-soft hover:-translate-y-0.5 hover:bg-terracotta-dark hover:shadow-lift",
        outline: "border border-sage-deep/40 bg-transparent text-sage-deep hover:-translate-y-0.5 hover:bg-mist",
        // Used on top of the hero photo.
        light: "border border-white/70 bg-transparent text-white hover:-translate-y-0.5 hover:bg-white hover:text-charcoal",
      },
      size: {
        default: "h-12 px-7 text-[0.95rem]",
        lg: "h-14 px-9 text-base",
        sm: "h-10 px-5 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
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
