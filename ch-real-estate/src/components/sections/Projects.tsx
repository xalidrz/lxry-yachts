import { useRef } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gold, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

export function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 440), behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch & trackpads already scroll natively)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: false };
    track.current.style.scrollSnapType = "none";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !track.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    if (track.current) track.current.style.scrollSnapType = "";
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20 border-y border-gold/15 bg-surface py-28">
      <div className="container">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="projects-title"
            align="left"
            className="mb-0 md:mb-0"
            eyebrow="Ongoing & Completed Projects"
            title={
              <>
                Our work, <Gold>standing tall</Gold>
              </>
            }
            description="A look at what we are building and what we have already handed over."
          />
          <Reveal className="hidden gap-3 md:flex" delay={0.15}>
            <Button variant="outline" size="icon" aria-label="Previous projects" onClick={() => scrollBy(-1)}>
              <ArrowLeft />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next projects" onClick={() => scrollBy(1)}>
              <ArrowRight />
            </Button>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={track}
          tabIndex={0}
          role="region"
          aria-label="Projects gallery — scroll horizontally"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={(e) => drag.current.moved && (e.preventDefault(), (drag.current.moved = false))}
          className="scrollbar-gold flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-8 active:cursor-grabbing gutter-x"
        >
          {projects.map((p) => (
            <article
              key={p.id}
              className="group relative aspect-[4/5] w-[78vw] max-w-[400px] shrink-0 snap-start overflow-hidden border border-gold/20 bg-ink transition-all duration-500 hover:border-gold/80 hover:shadow-gold-glow sm:w-[360px] lg:w-[390px]"
            >
              <img
                src={p.image}
                alt={`${p.name} — ${p.detail}`}
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="size-full select-none object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <Badge variant={p.status === "Completed" ? "solid" : "outline"} className="absolute left-5 top-5">
                {p.status === "Completed" ? <CircleCheck className="size-3.5" /> : <Hammer className="size-3.5" />}
                {p.status}
              </Badge>
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="label mb-2 text-[0.8rem] text-gold-light">{p.detail}</p>
                <h3 className="text-[1.7rem] text-cream">{p.name}</h3>
                <p className="mt-1.5 text-[0.95rem] text-muted-foreground">{p.location}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
