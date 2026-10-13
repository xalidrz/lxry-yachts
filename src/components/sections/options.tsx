import { ArrowUpRight, MapPin, Phone, Route, ScanLine, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { links } from "@/config/site";

const options: { n: string; title: string; line: string; href: string; icon: LucideIcon; external?: boolean }[] = [
  { n: "01", title: "Call the shop", line: "Talk to the shop directly and describe what the car is doing.", href: links.tel, icon: Phone },
  { n: "02", title: "Find the shop", line: "70 W Jackson St, Hayward. Opens in Google Maps.", href: links.place, icon: MapPin, external: true },
  { n: "03", title: "See how a repair works", line: "Five steps from drop-off to pick-up.", href: "/process", icon: Route },
  { n: "04", title: "Check your repair status", line: "A concept demo of a repair tracker.", href: "/process#demo", icon: ScanLine },
];

export function Options() {
  return (
    <section id="options" className="grid-lines border-b border-line bg-graphite pb-20 pt-6 sm:pb-28 sm:pt-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead n="01" title="Choose your move" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((o, i) => (
            <Reveal key={o.n} as="li" index={i}>
              <a
                href={o.href}
                {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="option-card group relative block h-full border border-line bg-surface p-6 sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-signal-bright">{o.n}</span>
                  <o.icon className="size-6 text-muted group-hover:text-ink" aria-hidden />
                </div>
                <h3 className="mt-10 font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-ink">
                  {o.title}
                  {o.external ? <span className="sr-only"> (opens in Google Maps)</span> : null}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{o.line}</p>
                <ArrowUpRight className="mt-6 size-5 text-ink" aria-hidden />
                <span className="underline-sweep absolute inset-x-0 bottom-0 h-0.5 bg-signal" aria-hidden />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
