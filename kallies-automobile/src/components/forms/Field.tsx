import { useId, type ReactElement, cloneElement } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  hint?: string;
  className?: string;
  dark?: boolean;
  children: ReactElement<{ id?: string; "aria-describedby"?: string }>;
}

/** Label + control with a stable id, for every form on the site. */
export function Field({ label, hint, className, dark, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className={dark ? "text-white" : undefined}>
        {label}
      </Label>
      {cloneElement(children, { id, "aria-describedby": hintId })}
      {hint && (
        <p id={hintId} className={cn("text-xs", dark ? "text-white/70" : "text-grey")}>
          {hint}
        </p>
      )}
    </div>
  );
}
