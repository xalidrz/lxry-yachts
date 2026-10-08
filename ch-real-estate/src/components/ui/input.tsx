import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full border border-input bg-surface px-4 text-cream placeholder:text-muted-foreground/70 transition-colors focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input type={type} ref={ref} className={cn(fieldBase, "h-12 rounded-none", className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, "min-h-[130px] resize-y rounded-none py-3", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";
