import { cn } from "@/lib/utils";

/** The supplied CH logo (gold on transparent), cropped from the original artwork. */
export function Logo({ className, size = 56 }: { className?: string; size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="CH Real Estate & Builder's"
      width={size}
      height={size}
      className={cn("select-none object-contain", className)}
      style={{ width: size, height: size }}
      decoding="async"
    />
  );
}
