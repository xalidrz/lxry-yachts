import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { EmptyLeadsState } from "@/components/States";
import { LeadCard } from "@/components/LeadCard";
import { STATUS_STYLE } from "@/components/StatusSelect";
import { Button } from "@/components/ui/button";
import { downloadCsv, leadsToCsv } from "@/lib/csv";
import { useLeads } from "@/lib/leads";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function LeadsPage() {
  const leads = useLeads();
  const [filter, setFilter] = useState<LeadStatus | "All">("All");

  const all = useMemo(() => Object.values(leads).sort((a, b) => b.updatedAt - a.updatedAt), [leads]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { All: all.length };
    for (const s of LEAD_STATUSES) c[s] = all.filter((l) => l.status === s).length;
    return c;
  }, [all]);
  const shown = filter === "All" ? all : all.filter((l) => l.status === filter);

  const exportCsv = () => downloadCsv(`nosite-leads-${new Date().toISOString().slice(0, 10)}.csv`, leadsToCsv(shown));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-6 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">My Leads</h1>
          <p className="mt-1 text-base text-muted-foreground">Saved on this device only. Clearing browser data erases them, so export now and then.</p>
        </div>
        <Button variant="outline" size="lg" onClick={exportCsv} disabled={shown.length === 0}>
          <Download /> Export CSV{shown.length ? ` (${shown.length})` : ""}
        </Button>
      </div>

      <div className="-mx-4 mt-5 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter by status">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {(["All", ...LEAD_STATUSES] as const).map((s) => {
            const active = filter === s;
            const Icon = s === "All" ? null : STATUS_STYLE[s].icon;
            return (
              <button
                key={s}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(s)}
                className={cn(
                  "flex h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-base font-medium transition-colors",
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {Icon && <Icon className="size-4" />}
                {s}
                <span className={cn("tabular-nums", active ? "text-primary-foreground/80" : "text-muted-foreground")}>{counts[s]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {shown.length === 0 ? (
        <EmptyLeadsState filtered={all.length > 0} />
      ) : (
        <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((l) => (
            <li key={l.id}>
              <LeadCard business={l} lead={l} mode="lead" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
