import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./dialog";

/** Right-hand slide-in panel built on the Dialog primitive (mobile menu). */
export const Sheet = Dialog;
export const SheetTrigger = DialogTrigger;
export const SheetClose = DialogClose;

export const SheetContent = React.forwardRef<React.ElementRef<typeof DialogContent>, React.ComponentPropsWithoutRef<typeof DialogContent> & { title: string; description: string }>(
  ({ className, children, title, description, ...props }, ref) => (
    <DialogContent
      ref={ref}
      className={cn(
        "inset-y-0 right-0 flex h-full w-[min(88vw,380px)] flex-col border-l border-white/10 bg-surface p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300",
        className,
      )}
      {...props}
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <DialogDescription className="sr-only">{description}</DialogDescription>
      {children}
      <DialogClose className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-md text-white transition-colors hover:text-volt-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-light" aria-label="Close menu">
        <X className="size-6" />
      </DialogClose>
    </DialogContent>
  ),
);
SheetContent.displayName = "SheetContent";
