import type { ReactNode } from "react";
import { Bookmark, Hourglass, Inbox, MapPin, MapPinOff, RefreshCw, SearchX, ServerCrash, ShieldCheck, TriangleAlert, WifiOff, X, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SearchError } from "@/lib/search";
import type { Stage } from "@/lib/search";

function IconTile({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "danger" | "muted" }) {
  return (
    <div
      className={
        "flex size-14 items-center justify-center rounded-lg border bg-card [&_svg]:size-7 " +
        (tone === "accent" ? "border-primary/40 text-primary" : tone === "danger" ? "border-destructive/40 text-destructive" : "border-border text-muted-foreground")
      }
    >
      {children}
    </div>
  );
}

/* ------------------------------- first visit ------------------------------ */

export function IntroState() {
  const steps = [
    { icon: MapPin, title: "Pick a place and a trade", body: "Type a city, choose a category and set how far to look." },
    { icon: ShieldCheck, title: "Verify before you pitch", body: "OpenStreetMap is incomplete. One tap runs a Google search to double-check." },
    { icon: Bookmark, title: "Track every lead", body: "Save, change status, copy a short pitch, export to CSV." },
  ];
  return (
    <section className="flex flex-col gap-8 py-10 sm:py-14">
      <div className="flex flex-col items-start gap-5">
        <IconTile>
          <Radar />
        </IconTile>
        <div>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Find businesses that need a website.</h2>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Search any city for local businesses with a name and a phone or address, but no website listed. Free, no sign-up, nothing leaves your browser except the map search.
          </p>
        </div>
      </div>
      <ol className="grid gap-3 sm:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title}>
            <Card className="flex h-full flex-col gap-3 p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md border border-border bg-secondary text-primary [&_svg]:size-[18px]">
                  <s.icon />
                </span>
                <span className="text-sm font-medium text-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="text-base text-muted-foreground">{s.body}</p>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* --------------------------------- loading -------------------------------- */

export function SkeletonCard() {
  return (
    <Card className="flex flex-col gap-4 p-4 sm:p-5" aria-hidden>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
        <Skeleton className="size-11" />
      </div>
      <div className="space-y-2.5">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/5" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-11" />
        <Skeleton className="h-11" />
        <Skeleton className="h-11" />
        <Skeleton className="h-11" />
      </div>
      <Skeleton className="h-12" />
    </Card>
  );
}

export function LoadingState({ stage, place, onCancel }: { stage: Stage; place: string; onCancel: () => void }) {
  return (
    <section aria-live="polite" aria-busy="true" className="flex flex-col gap-4 py-5">
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex size-3 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-3 rounded-full bg-primary" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{stage === "locating" ? `Locating ${place}...` : "Searching OpenStreetMap..."}</p>
            <p className="text-sm text-muted-foreground">Free servers can take 10-30 seconds on big areas.</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel} aria-label="Cancel search">
          <X /> Cancel
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- error --------------------------------- */

export function ErrorState({ error, radiusKm, onRetry, onShrink }: { error: SearchError; radiusKm: number; onRetry: () => void; onShrink: (km: number) => void }) {
  const kind = error.kind;
  const meta =
    kind === "timeout"
      ? { icon: <Hourglass />, title: "The map server timed out" }
      : kind === "busy"
        ? { icon: <ServerCrash />, title: "The free servers are busy" }
        : kind === "offline"
          ? { icon: <WifiOff />, title: "You seem to be offline" }
          : kind === "network"
            ? { icon: <ServerCrash />, title: "Couldn't reach the map servers" }
            : kind === "not-found"
              ? { icon: <SearchX />, title: "Place not found" }
              : kind === "too-broad"
                ? { icon: <MapPinOff />, title: "That area is too big" }
                : { icon: <TriangleAlert />, title: "Something went wrong" };

  const canShrink = kind === "timeout" && radiusKm > 5;
  const shrinkTo = Math.max(5, Math.round(radiusKm / 3));

  return (
    <section role="alert" className="py-8">
      <Card className="flex flex-col items-start gap-5 p-5 sm:p-7">
        <IconTile tone="danger">{meta.icon}</IconTile>
        <div>
          <h2 className="text-2xl font-bold">{meta.title}</h2>
          <p className="mt-2 max-w-xl text-lg text-muted-foreground">{error.message}</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {kind !== "not-found" && kind !== "too-broad" && (
            <Button size="lg" onClick={onRetry}>
              <RefreshCw /> Retry search
            </Button>
          )}
          {canShrink && (
            <Button size="lg" variant="outline" onClick={() => onShrink(shrinkTo)}>
              Try {shrinkTo} km instead
            </Button>
          )}
        </div>
              </Card>
    </section>
  );
}

/* ------------------------------- empty results ---------------------------- */

export function NoResultsState({ filtered }: { filtered: boolean }) {
  return (
    <section className="py-8">
      <Card className="flex flex-col items-start gap-5 p-5 sm:p-7">
        <IconTile tone="muted">
          <Inbox />
        </IconTile>
        <div>
          <h2 className="text-2xl font-bold">{filtered ? "None of these have a phone number" : "No results here"}</h2>
          <p className="mt-2 max-w-xl text-lg text-muted-foreground">
            {filtered
              ? "Turn off “Only with phone” to see businesses that only list an address."
              : "No businesses without a website found here. Try a larger radius or another category."}
          </p>
        </div>
        {!filtered && (
          <ul className="list-disc space-y-1 pl-5 text-base text-muted-foreground">
            <li>Widen the radius (up to 90 km).</li>
            <li>Try a nearby bigger city, or a broader category like “Shop (any)”.</li>
            <li>Use a custom category, e.g. “tailor” or “tuition”.</li>
          </ul>
        )}
      </Card>
    </section>
  );
}

export function EmptyLeadsState({ filtered }: { filtered: boolean }) {
  return (
    <section className="py-8">
      <Card className="flex flex-col items-start gap-5 p-5 sm:p-7">
        <IconTile tone="muted">{filtered ? <SearchX /> : <Bookmark />}</IconTile>
        <div>
          <h2 className="text-2xl font-bold">{filtered ? "No leads with this status" : "No saved leads yet"}</h2>
          <p className="mt-2 max-w-xl text-lg text-muted-foreground">
            {filtered ? "Pick another status above, or choose All." : "On the Find tab, tap the bookmark on a business or change its status. It shows up here, saved on this device."}
          </p>
        </div>
      </Card>
    </section>
  );
}
