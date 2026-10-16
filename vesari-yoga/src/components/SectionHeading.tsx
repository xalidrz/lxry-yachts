import { Fragment } from "react";
import { cn } from "@/lib/utils";

/** Title text may wrap one word in *asterisks*: it is shown in italic gold. */
export function SectionHeading({
  eyebrow,
  title,
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: string;
  /** "light" = text for a cream background, "dark" = text for an espresso background. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const parts = title.split("*");
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className={cn("text-sm font-medium uppercase tracking-[0.28em]", dark ? "text-gold" : "text-gold-deep")}>{eyebrow}</p>
      <h2 className={cn("mt-4 text-5xl leading-[1.05] sm:text-6xl", dark ? "text-cream" : "text-espresso")}>
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <em key={i} className={cn("font-medium italic", dark ? "text-gold" : "text-gold-deep")}>
              {part}
            </em>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          ),
        )}
      </h2>
      <span aria-hidden="true" className={cn("mx-auto mt-6 block h-px w-14", dark ? "bg-gold/70" : "bg-gold-deep/70")} />
    </div>
  );
}
