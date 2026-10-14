import { VehicleCardSkeleton } from "@/components/vehicles/VehicleCard";

/** Route-loading placeholder: dark intro block + card-shaped skeletons with the shimmer sweep. */
export function PageSkeleton() {
  return (
    <div aria-busy="true" role="status">
      <div className="bg-ink py-12 md:py-16">
        <div className="container space-y-4">
          <div className="h-3 w-40 rounded-sm bg-white/15" />
          <div className="h-10 w-2/3 max-w-xl rounded-sm bg-white/15" />
        </div>
      </div>
      <div className="container grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <VehicleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
