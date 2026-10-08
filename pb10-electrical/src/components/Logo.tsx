import { cn } from "@/lib/utils";

/** The supplied PB10 logo, keyed onto a transparent background. `wordmark` is the lettering only (navbar). */
export function Logo({ variant = "full", className }: { variant?: "full" | "wordmark"; className?: string }) {
  const wordmark = variant === "wordmark";
  return (
    <img
      src={wordmark ? "/logo-wordmark.png" : "/logo.png"}
      alt="PB10 Electrical"
      width={552}
      height={wordmark ? 60 : 250}
      className={cn("select-none object-contain", className)}
      decoding="async"
    />
  );
}
