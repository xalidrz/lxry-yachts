import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Brand buttons. `volt` (the lightning-orange gradient) is the only element besides the logo and a few
 * key headline words that carries the full gradient. On hover it glows and a light sweep crosses it.
 */
const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md font-label font-semibold uppercase tracking-label transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/3 before:-translate-x-[120%] before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent hover:before:animate-[shine_0.9s_ease-out]",
  {
    variants: {
      variant: {
        volt: "bg-volt-gradient text-ink shadow-[0_8px_26px_-10px_rgba(247,147,30,0.7)] hover:shadow-[0_0_0_1px_rgba(255,182,39,0.6),0_0_34px_4px_rgba(247,147,30,0.55),0_14px_40px_-10px_rgba(255,182,39,0.7)] hover:-translate-y-0.5",
        outline:
          "border border-white/25 bg-white/[0.03] text-white backdrop-blur-sm hover:border-volt hover:bg-volt/10 hover:text-volt-light hover:shadow-[0_0_28px_-4px_rgba(247,147,30,0.5)] before:via-volt/25",
        ghost: "text-white hover:text-volt-light before:hidden",
        chip: "border border-white/15 bg-transparent text-muted-foreground hover:border-volt/70 hover:text-white before:hidden data-[active=true]:border-volt data-[active=true]:bg-volt/15 data-[active=true]:text-volt-light",
      },
      size: {
        default: "h-12 px-7 text-[0.95rem]",
        sm: "h-10 px-5 text-[0.85rem]",
        lg: "h-14 px-9 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "volt", size: "default" },
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
