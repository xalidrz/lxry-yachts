import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Five-star rating with a fractional fill (4.6 → four full stars and 60% of the fifth). */
export function Stars({ rating, className, size = "size-5" }: { rating: number; className?: string; size?: string }) {
  const stars = (fill: string) =>
    Array.from({ length: 5 }, (_, i) => <Star key={i} className={cn(size, "shrink-0", fill)} strokeWidth={1.5} />);
  return (
    <span className={cn("relative inline-flex", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      <span className="inline-flex text-white/20 [&_svg]:fill-current">{stars("")}</span>
      <span className="absolute inset-y-0 left-0 inline-flex overflow-hidden text-volt-light [&_svg]:fill-current" style={{ width: `${(rating / 5) * 100}%` }}>
        {stars("")}
      </span>
    </span>
  );
}
