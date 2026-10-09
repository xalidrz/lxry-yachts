import { site } from "@/data/site";

/** The badge. Swap public/logo.svg to change it everywhere. */
export function Logo({ size = 40, className, priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      width={size}
      height={size}
      alt={site.nameEn}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
