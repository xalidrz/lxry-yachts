import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import "./hud-button.css";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Pointed-hexagon HUD buttons (see hud-button.css) */
        default: "hbtn hbtn-default text-paper",
        brand: "hbtn hbtn-brand",
        outline: "hbtn hbtn-outline",
        "outline-light": "hbtn hbtn-outline-light",
        /** Text with thin orange lines above/below: secondary action on dark backgrounds */
        line: "hbtn hbtn-line",
        ghost: "rounded-lg px-4 text-ink transition-colors duration-200 hover:bg-line/60",
        "ghost-light": "rounded-lg px-4 text-white transition-colors duration-200 hover:bg-white/10",
        link: "h-auto rounded-none p-0 text-ink underline underline-offset-4 transition-colors hover:text-brand-ink",
      },
      size: { default: "h-12", sm: "h-10", lg: "h-14 text-base", icon: "hbtn-icon h-12 w-12" },
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
