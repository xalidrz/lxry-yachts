import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, className }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="text-sm font-medium uppercase tracking-[0.22em] text-sage-deep">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">{title}</h2>
      <span aria-hidden="true" className="mx-auto mt-6 block h-px w-14 bg-sage" />
    </div>
  );
}
