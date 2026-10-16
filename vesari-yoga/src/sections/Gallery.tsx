import { gallery } from "@/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function Gallery() {
  const [tall, ...rest] = gallery.photos;
  return (
    <section id="galerie" className="bg-cream px-5 py-24 sm:px-8 md:py-36">
      <Reveal>
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} />
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:gap-6 md:grid-cols-2 md:grid-rows-2">
        <Reveal className="md:row-span-2">
          <Photo {...tall} className="aspect-square md:aspect-auto md:h-full" />
        </Reveal>
        {rest.map((photo, i) => (
          <Reveal key={photo.src} delay={(i + 1) * 120}>
            <Photo {...photo} className="aspect-[3/2]" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// TODO: replace with real photos of the studio (see src/content.ts).
function Photo({ src, width, height, alt, className }: { src: string; width: number; height: number; alt: string; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-3xl bg-espresso-soft shadow-soft ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-[center_25%] transition-transform duration-[1400ms] ease-out hover:scale-[1.03]"
      />
    </figure>
  );
}
