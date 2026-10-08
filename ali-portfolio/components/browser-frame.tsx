import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  imageClassName,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-white shadow-[0_20px_50px_-20px_rgba(24,24,27,0.25)]", className)}>
      <div className="flex items-center gap-3 border-b border-border bg-secondary px-3.5 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md border border-border bg-white px-3 py-0.5 text-center text-[11px] text-muted-foreground">
          {url}
        </div>
        <div className="w-10 shrink-0" aria-hidden />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={cn("object-cover object-top", imageClassName)}
        />
      </div>
    </div>
  );
}
