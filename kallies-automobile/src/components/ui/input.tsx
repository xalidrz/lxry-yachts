import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-12 w-full rounded-lg border border-input bg-white px-4 text-base text-ink placeholder:text-grey focus-visible:border-ink disabled:opacity-50 md:text-sm",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[120px] w-full rounded-lg border border-input bg-white px-4 py-3 text-base text-ink placeholder:text-grey focus-visible:border-ink md:text-sm",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Input, Textarea };
