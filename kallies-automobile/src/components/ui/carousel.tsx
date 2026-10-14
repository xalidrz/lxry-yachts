import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselContextValue {
  viewportRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  prev: () => void;
  next: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);
const useCarousel = () => {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used inside <Carousel>");
  return ctx;
};

const Carousel = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", slidesToScroll: 1 });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); api?.scrollPrev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); api?.scrollNext(); }
  };

  return (
    <CarouselContext.Provider value={{ viewportRef, api, prev: () => api?.scrollPrev(), next: () => api?.scrollNext(), canPrev, canNext }}>
      <div className={cn("relative", className)} role="region" aria-roledescription="carousel" onKeyDownCapture={onKeyDown} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

const CarouselContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { viewportRef } = useCarousel();
  return (
    <div ref={viewportRef} className="overflow-hidden">
      <div className={cn("-ml-4 flex", className)} {...props} />
    </div>
  );
};

const CarouselItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div role="group" aria-roledescription="slide" className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)} {...props} />
);

const CarouselControls = ({ className, dark, prevLabel, nextLabel }: { className?: string; dark?: boolean; prevLabel: string; nextLabel: string }) => {
  const { prev, next, canPrev, canNext } = useCarousel();
  const variant = dark ? "outline-light" : "outline";
  return (
    <div className={cn("flex gap-2", className)}>
      <Button variant={variant} size="icon" onClick={prev} disabled={!canPrev} aria-label={prevLabel}>
        <ArrowLeft aria-hidden />
      </Button>
      <Button variant={variant} size="icon" onClick={next} disabled={!canNext} aria-label={nextLabel}>
        <ArrowRight aria-hidden />
      </Button>
    </div>
  );
};

export { Carousel, CarouselContent, CarouselItem, CarouselControls };
