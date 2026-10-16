import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-6 w-full rounded-pill border border-steel bg-white px-3 text-body text-ink placeholder:text-steel",
        "transition-colors duration-200 ease-out hover:border-ink",
        "aria-[invalid=true]:border-red aria-[invalid=true]:border-2",
        "disabled:cursor-not-allowed disabled:border-mist disabled:bg-mist disabled:text-steel",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
