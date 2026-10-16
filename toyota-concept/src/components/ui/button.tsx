import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-pill border font-body text-body font-medium transition-colors duration-200 ease-out select-none active:translate-y-px disabled:pointer-events-none disabled:border-mist disabled:bg-mist disabled:text-steel [&_svg]:size-[20px]",
  {
    variants: {
      variant: {
        // red is reserved for primary actions
        primary: "border-red bg-red text-white hover:border-red-press hover:bg-red-press active:bg-red-press",
        // adapts to surface: ink-on-light, white-on-dark
        outline: "border-fg bg-transparent text-fg hover:bg-fg hover:text-surface",
        solid: "border-fg bg-fg text-surface hover:bg-transparent hover:text-fg",
        ghost: "border-transparent bg-transparent text-fg hover:border-line hover:bg-transparent",
        link: "h-auto border-transparent bg-transparent p-0 text-fg underline decoration-1 underline-offset-[6px] hover:decoration-2",
      },
      size: {
        default: "h-6 px-3",
        sm: "h-5 px-2 text-small",
        icon: "size-6 p-0",
        "icon-sm": "size-5 p-0 [&_svg]:size-[20px]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
