import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-ink/85",
        brand: "bg-brand text-ink hover:bg-brand/90",
        outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        "outline-light": "border border-white/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
        ghost: "text-ink hover:bg-line/60",
        "ghost-light": "text-white hover:bg-white/10",
        link: "h-auto rounded-none p-0 text-ink underline underline-offset-4 hover:text-brand-ink",
      },
      size: { default: "h-12 px-6", sm: "h-10 px-4", lg: "h-14 px-8 text-base", icon: "h-12 w-12" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
