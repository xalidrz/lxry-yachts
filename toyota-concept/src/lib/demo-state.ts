/**
 * Design-review helper: append ?demo=empty or ?demo=loading to force those states in the vehicle finder.
 * Dealer search: ZIP 00000 returns no results, ZIP 99999 returns a service error.
 */
export type DemoState = "empty" | "loading" | null;
export const demoState: DemoState = (() => {
  if (typeof window === "undefined") return null;
  const v = new URLSearchParams(window.location.search).get("demo");
  return v === "empty" || v === "loading" ? v : null;
})();
