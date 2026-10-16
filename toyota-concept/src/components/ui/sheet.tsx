import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & { closeLabel?: string }
>(({ className, children, closeLabel = "Close menu", ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-[70]" style={{ background: "color-mix(in srgb, var(--ink) 64%, transparent)" }} />
    <SheetPrimitive.Content
      ref={ref}
      data-surface="white"
      className={cn("fixed inset-y-0 right-0 z-[71] flex h-full w-[min(100%,420px)] flex-col overflow-y-auto border-l border-line bg-surface text-fg", className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close
        aria-label={closeLabel}
        className="absolute right-2 top-2 inline-flex size-6 items-center justify-center rounded-pill border border-transparent hover:border-line"
      >
        <X className="size-[24px]" aria-hidden="true" />
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
