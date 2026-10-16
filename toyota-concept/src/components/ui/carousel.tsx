import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * shadcn-style carousel API (Carousel / Content / Item / Previous / Next) on native CSS scroll-snap.
 * No carousel library: touch, trackpad, arrow buttons and keyboard all drive the same scroller.
 */
type Ctx = {
  scrollerRef: React.RefObject<HTMLDivElement>;
  canPrev: boolean;
  canNext: boolean;
  step: (dir: 1 | -1) => void;
};
const CarouselContext = React.createContext<Ctx | null>(null);
const useCarousel = () => {
  const c = React.useContext(CarouselContext);
  if (!c) throw new Error("Carousel parts must be used inside <Carousel>");
  return c;
};

export function Carousel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [{ canPrev, canNext }, setEdges] = React.useState({ canPrev: false, canNext: true });

  const measure = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ canPrev: el.scrollLeft > 4, canNext: el.scrollLeft < max - 4 });
  }, []);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // children changing (filter) resets the rail
    const mo = new MutationObserver(measure);
    mo.observe(el, { childList: true, subtree: true });
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
      mo.disconnect();
    };
  }, [measure]);

  const step = React.useCallback(
    (dir: 1 | -1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const first = el.querySelector<HTMLElement>("[data-carousel-item]");
      const gap = parseFloat(getComputedStyle(el.firstElementChild as Element).columnGap || "0") || 0;
      const w = (first?.offsetWidth ?? el.clientWidth * 0.8) + gap;
      el.scrollBy({ left: dir * w, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  return (
    <CarouselContext.Provider value={{ scrollerRef, canPrev, canNext, step }}>
      <div className={className} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  label,
  resetKey,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & { label: string; resetKey?: string }) {
  const { scrollerRef, step } = useCarousel();
  // new result set (e.g. a filter change) starts from the first card
  React.useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [resetKey, scrollerRef]);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") (e.preventDefault(), step(1));
    else if (e.key === "ArrowLeft") (e.preventDefault(), step(-1));
    else if (e.key === "Home") (e.preventDefault(), scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" }));
    else if (e.key === "End")
      (e.preventDefault(), scrollerRef.current?.scrollTo({ left: scrollerRef.current.scrollWidth, behavior: "smooth" }));
  };
  return (
    <div
      ref={scrollerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="rail relative -my-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain py-1 [scroll-behavior:smooth] focus-visible:outline-offset-[-2px]"
    >
      <ul className={cn("m-0 flex list-none gap-3 p-0", className)} {...props} />
    </div>
  );
}

export function CarouselItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li data-carousel-item className={cn("min-w-0 shrink-0 snap-start", className)} {...props} />;
}

export function CarouselPrevious({ label, className }: { label: string; className?: string }) {
  const { canPrev, step } = useCarousel();
  return (
    <Button variant="outline" size="icon" aria-label={label} disabled={!canPrev} onClick={() => step(-1)} className={className}>
      <ArrowLeft aria-hidden="true" />
    </Button>
  );
}

export function CarouselNext({ label, className }: { label: string; className?: string }) {
  const { canNext, step } = useCarousel();
  return (
    <Button variant="outline" size="icon" aria-label={label} disabled={!canNext} onClick={() => step(1)} className={className}>
      <ArrowRight aria-hidden="true" />
    </Button>
  );
}
