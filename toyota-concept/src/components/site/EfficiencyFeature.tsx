import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/use-count-up";
import { useInViewOnce } from "@/hooks/use-in-view";
import { efficiency } from "@/data/content";
import { Img } from "./Img";
import { Reveal } from "./Reveal";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, seen] = useInViewOnce<HTMLDivElement>("0px 0px -12% 0px");
  const n = useCountUp(value, seen);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <p className="headline flex items-baseline gap-0.5 text-[40px] md:text-[56px]">
        <span aria-hidden="true" className="tabular-nums">
          {n}
        </span>
        <span className="sr-only">{value}</span>
        <span className="text-[20px] font-medium">{suffix}</span>
      </p>
      <p className="t-small text-muted">
        {label} <span className="whitespace-nowrap">{efficiency.concept}</span>
      </p>
    </div>
  );
}

export function EfficiencyFeature() {
  const { image } = efficiency;
  return (
    <section id={efficiency.id} aria-labelledby="eff-title" data-surface="ink" className="section-pad mt-[var(--section-gap)]">
      <div className="grid-12 items-center gap-y-6">
        <Reveal className="col-span-12 flex flex-col gap-3 lg:col-span-5">
          <p className="t-eyebrow text-muted">{efficiency.eyebrow}</p>
          <h2 id="eff-title" className="headline t-h1">
            {efficiency.title}
          </h2>
          <p className="t-lead text-muted">{efficiency.body}</p>
          <div>
            <Button asChild variant="outline">
              <a href={efficiency.cta.href}>
                {efficiency.cta.label}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal className="col-span-12 flex flex-col gap-4 lg:col-span-6 lg:col-start-7">
          <Img
            base={image.base}
            widths={image.widths}
            width={image.width}
            height={image.height}
            alt={image.alt}
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 100vw"
            className="rounded-card border border-line"
          />
          <dl className="m-0 grid grid-cols-3 gap-2 md:gap-3">
            {efficiency.stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
