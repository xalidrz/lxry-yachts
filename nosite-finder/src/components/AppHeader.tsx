import { Bookmark, Radar, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type Route = "find" | "leads";

export const NAV: { route: Route; label: string; icon: typeof Search }[] = [
  { route: "find", label: "Find", icon: Search },
  { route: "leads", label: "My Leads", icon: Bookmark },
];

export function AppHeader({ route, leadCount }: { route: Route; leadCount: number }) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md border border-primary/50 bg-card text-primary">
            <Radar className="size-5" />
          </span>
          <span className="font-heading text-xl font-bold tracking-tight">NoSite Finder</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map(({ route: r, label, icon: Icon }) => (
            <a
              key={r}
              href={r === "find" ? "#/" : "#/leads"}
              aria-current={route === r ? "page" : undefined}
              className={cn(
                "flex h-11 items-center gap-2 rounded-md px-4 text-base font-medium text-muted-foreground transition-colors hover:text-foreground",
                route === r && "bg-secondary text-foreground",
              )}
            >
              <Icon className="size-[18px]" />
              {label}
              {r === "leads" && leadCount > 0 && <span className="rounded-full bg-primary px-2 text-sm font-semibold text-primary-foreground">{leadCount}</span>}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function BottomNav({ route, leadCount }: { route: Route; leadCount: number }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden" aria-label="Main">
      <ul className="mx-auto grid max-w-md grid-cols-2">
        {NAV.map(({ route: r, label, icon: Icon }) => (
          <li key={r}>
            <a
              href={r === "find" ? "#/" : "#/leads"}
              aria-current={route === r ? "page" : undefined}
              className={cn("flex h-16 flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground", route === r && "text-primary")}
            >
              <span className="relative">
                <Icon className="size-6" />
                {r === "leads" && leadCount > 0 && (
                  <span className="absolute -right-3 -top-2 min-w-5 rounded-full bg-primary px-1 text-center text-xs font-bold leading-5 text-primary-foreground">{leadCount}</span>
                )}
              </span>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
