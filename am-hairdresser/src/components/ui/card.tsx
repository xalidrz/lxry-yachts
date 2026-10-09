import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Glass card: lifts on hover with a gold edge glow. */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass rounded-3xl transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-white/[0.07] hover:shadow-gold-edge",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";
