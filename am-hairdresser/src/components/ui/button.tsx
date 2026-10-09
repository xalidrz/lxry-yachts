import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * The one pill system used everywhere.
 *  - primary: dark gold-tinted fill, 1px gold border, gold glow on hover
 *  - ghost:   frosted glass, white/10 border
 * Put a Lucide icon inside and it wiggles on hover (class `group/btn` is on the pill).
 */
export const buttonVariants = cva(
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[box-shadow,background-color,border-color,transform,color] duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:transition-transform hover:[&_svg]:animate-wiggle",
  {
    variants: {
      variant: {
        primary:
          "border border-gold bg-gold-fill text-gold-light hover:bg-[#33290f] hover:shadow-gold-glow",
        ghost:
          "border border-white/10 bg-white/[0.06] text-cream backdrop-blur-xl hover:border-gold/60 hover:bg-white/10 hover:text-gold-light",
      },
      size: {
        sm: "h-10 px-4 text-sm [&_svg]:size-4",
        md: "h-12 px-6 text-[0.95rem] [&_svg]:size-[1.15rem]",
        lg: "h-14 px-8 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-[1.15rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = "Button";
