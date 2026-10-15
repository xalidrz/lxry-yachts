import { useCallback, useEffect, useRef, useState } from "react";
import { SearchError, isCached, markSearchStarted, runSearch, type SearchOutcome, type SearchParams, type Stage } from "@/lib/search";

export type SearchState =
  | { status: "idle" }
  | { status: "loading"; stage: Stage; params: SearchParams }
  | { status: "success"; params: SearchParams; outcome: SearchOutcome }
  | { status: "error"; params: SearchParams; error: SearchError };

export function useSearch() {
  const [state, setState] = useState<SearchState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const search = useCallback(async (params: SearchParams) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setState({ status: "loading", stage: "locating", params });
    // Cached answers cost the servers nothing, so they don't start the cooldown.
    if (!isCached(params)) markSearchStarted();
    try {
      const outcome = await runSearch(params, ctrl.signal, (stage) => {
        if (!ctrl.signal.aborted) setState({ status: "loading", stage, params });
      });
      if (!ctrl.signal.aborted) setState({ status: "success", params, outcome });
    } catch (e) {
      if (ctrl.signal.aborted) return;
      const error = e instanceof SearchError ? e : new SearchError("unknown", "Something went wrong. Please try again.");
      setState({ status: "error", params, error });
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setState({ status: "idle" });
  }, []);

  return { state, search, cancel };
}
