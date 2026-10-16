import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  base: string;
  widths: readonly number[];
  width: number;
  height: number;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/** WebP with srcset, explicit width/height (no layout shift), lazy by default, designed loading + error states. */
export function Img({ base, widths, width, height, alt, sizes, priority, className, imgClassName }: Props) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const srcSet = widths.map((w) => `/images/${base}-${w}.webp ${w}w`).join(", ");
  const src = `/images/${base}-${widths[widths.length - 1]}.webp`;

  return (
    <div className={cn("relative overflow-hidden", state === "loading" && "skeleton", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      {state === "error" ? (
        <div role="img" aria-label={alt} className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-mist text-ink">
          <ImageOff className="size-[24px]" aria-hidden="true" />
          <span className="text-small">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          {...(priority ? { fetchpriority: "high" } : {})}
          onLoad={() => setState("ready")}
          onError={() => setState("error")}
          className={cn("zoom h-full w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
