import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { visibleServices } from "@/data/services";
import { site } from "@/config/site";

/**
 * preview = home-page version (first four services plus a link to /services).
 * Otherwise the full grid, used under the /services page header.
 * Edit the list in src/data/services.ts.
 */
export function Services({ preview = false }: { preview?: boolean }) {
  const list = preview ? visibleServices.slice(0, 4) : visibleServices;
  const Heading = preview ? "h3" : "h2";
  return (
    <section id="services" className={preview ? "bg-carbon py-20 sm:py-28" : "bg-carbon py-16 sm:py-24"}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {preview ? (
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="What we work on"
              intro={`Run by the owner, ${site.owner}. Call ${site.phone.display} to ask about your car.`}
            />
          </Reveal>
        ) : null}

        <ul className={preview ? "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
          {list.map((s, i) => (
            <Reveal as="li" index={i % 4} key={s.title} className="h-full">
              <article className="group relative flex h-full min-h-44 flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-white/20">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                <s.icon className="size-9 text-signal" strokeWidth={1.75} aria-hidden />
                <Heading className="mt-auto pt-8 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ink">
                  {s.title}
                </Heading>
              </article>
            </Reveal>
          ))}
        </ul>
        {preview ? (
          <Reveal className="mt-10">
            <SectionLink href="/services">All services</SectionLink>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
