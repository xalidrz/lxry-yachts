import { site } from "@/data/site";

/** The badge. Replace public/logo.png (512x512, transparent) to change it everywhere. */
export function Logo({ size = 40, className, priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt={site.nameEn}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
