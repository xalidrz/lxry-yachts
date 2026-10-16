import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

/** Loads the Google Maps iframe only when it is about to scroll into view, to keep the first load fast. */
export function LazyMap({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-line bg-mist shadow-soft">
      {show ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full min-h-[320px] w-full border-0"
        />
      ) : (
        <div className="flex h-full min-h-[320px] items-center justify-center text-sage-deep">
          <MapPin aria-hidden="true" strokeWidth={1.5} className="size-8" />
        </div>
      )}
    </div>
  );
}
