import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Eyebrow (with red rule) + slab headline + optional intro. `accent` words get the volt gradient. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("label flex items-center gap-3 text-[0.9rem] text-volt-light", align === "center" && "justify-center")}>
        <span aria-hidden className="h-px w-8 bg-brandred" />
        {eyebrow}
        {align === "center" && <span aria-hidden className="h-px w-8 bg-brandred" />}
      </p>
      <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.25rem)]">{title}</h2>
      {intro && <p className="mt-5 text-base text-muted-foreground md:text-lg">{intro}</p>}
    </Reveal>
  );
}

export const Accent = ({ children }: { children: ReactNode }) => <span className="text-volt-gradient">{children}</span>;
