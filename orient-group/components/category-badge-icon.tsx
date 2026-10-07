import { CategoryIcon } from "@/components/category-icon";
import { getCategory, type CategorySlug } from "@/data/categories";
import { cn } from "@/lib/utils";

/** Category icon in a small red-tinted circle, used where a product has no photo. */
export function CategoryBadgeIcon({
  category,
  size = "md",
}: {
  category: CategorySlug;
  size?: "md" | "lg";
}) {
  const c = getCategory(category);
  if (!c) return null;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand",
        size === "lg" ? "size-16" : "size-11",
      )}
    >
      <CategoryIcon icon={c.icon} className={size === "lg" ? "size-8" : "size-5"} strokeWidth={1.75} />
    </span>
  );
}
