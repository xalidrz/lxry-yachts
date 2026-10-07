import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "light" | "white" | "dark";
};

const tones = {
  light: "bg-background text-foreground",
  white: "bg-white text-foreground",
  dark: "on-dark bg-charcoal text-on-dark",
} as const;

export function Section({ tone = "light", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", tones[tone], className)} {...props}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Heading = "h2",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  as?: "h1" | "h2";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-bold tracking-[0.16em] uppercase",
            tone === "dark" ? "text-on-dark-muted" : "text-brand-grey",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-[1.75rem] leading-tight font-extrabold sm:text-4xl">
        {title}
      </Heading>
      {/* Short red rule, echoing the underline in the logo. */}
      <span aria-hidden="true" className="mt-4 block h-[3px] w-12 rounded-full bg-brand" />
      {children && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground",
          )}
        >
          {children}
        </p>
      )}
    </div>
  );
}
