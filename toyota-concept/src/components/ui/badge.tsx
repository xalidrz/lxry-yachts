import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill border border-line px-2 py-0.5 text-small font-medium text-fg [&_svg]:size-[16px]",
        className,
      )}
      {...props}
    />
  );
}
