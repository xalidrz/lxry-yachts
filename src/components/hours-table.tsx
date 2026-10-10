"use client";

import { fmt12 } from "@/lib/hours";
import { useShopStatus } from "@/lib/use-shop-status";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";

/** Full week, Monday first. Today's row is highlighted once the client knows the day in Los Angeles. */
export function HoursTable() {
  const clock = useShopStatus();
  return (
    <div>
      <StatusBadge variant="inline" className="font-medium text-ink" />
      <table className="mt-3 w-full max-w-xs text-sm">
        <caption className="sr-only">Opening hours</caption>
        <tbody>
          {site.hours.week.map((d) => {
            const today = clock?.dow === d.dow;
            const closed = !d.open || !d.close;
            return (
              <tr key={d.dow} className={cn(today && "bg-white/[0.07] text-ink")} aria-current={today ? "date" : undefined}>
                <th
                  scope="row"
                  className={cn(
                    "rounded-l-md px-2.5 py-1.5 text-left font-normal",
                    today ? "border-l-2 border-signal font-semibold text-ink" : "border-l-2 border-transparent text-ink/90",
                  )}
                >
                  {d.label}
                </th>
                <td className={cn("rounded-r-md px-2.5 py-1.5 text-right", closed ? "text-muted" : today ? "font-semibold text-ink" : "text-ink/90")}>
                  {closed ? "Closed" : `${fmt12(d.open!)} – ${fmt12(d.close!)}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
