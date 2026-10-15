import { useMemo, useState } from "react";
import { List, Map as MapIcon, Phone } from "lucide-react";
import { LeadCard } from "@/components/LeadCard";
import { MapView } from "@/components/MapView";
import { ErrorState, IntroState, LoadingState, NoResultsState } from "@/components/States";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBar, toParams, type SearchForm } from "@/components/SearchBar";
import type { SearchState } from "@/hooks/useSearch";
import { useLeads } from "@/lib/leads";
import type { SearchParams } from "@/lib/search";

const PAGE = 24;

interface Props {
  state: SearchState;
  form: SearchForm;
  onFormChange: (f: SearchForm) => void;
  onSearch: (p: SearchParams) => void;
  onCancel: () => void;
}

export function FindPage({ state, form, onFormChange, onSearch, onCancel }: Props) {
  const leads = useLeads();
  const [view, setView] = useState("list");
  const [phoneOnly, setPhoneOnly] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const businesses = state.status === "success" ? state.outcome.businesses : [];
  const visible = useMemo(() => (phoneOnly ? businesses.filter((b) => !!b.phone) : businesses), [businesses, phoneOnly]);
  const savedIds = useMemo(() => new Set(Object.keys(leads)), [leads]);

  const retry = () => {
    if (state.status === "error") onSearch(state.params);
  };

  return (
    <>
      <SearchBar form={form} onFormChange={onFormChange} onSearch={(p) => { setShown(PAGE); onSearch(p); }} loading={state.status === "loading"} hasSearched={state.status !== "idle"} />

      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        {state.status === "idle" && <IntroState />}

        {state.status === "loading" && <LoadingState stage={state.stage} place={state.params.city} onCancel={onCancel} />}

        {state.status === "error" && (
          <ErrorState
            error={state.error}
            radiusKm={state.params.radiusKm}
            onRetry={retry}
            onShrink={(km) => {
              onFormChange({ ...form, radiusKm: km });
              const p = toParams({ ...form, radiusKm: km });
              if (p) onSearch(p);
            }}
          />
        )}

        {state.status === "success" && (
          <section className="pt-5" aria-label="Results">
            {businesses.length === 0 ? (
              <NoResultsState filtered={false} />
            ) : (
              <Tabs value={view} onValueChange={setView}>
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {visible.length} {visible.length === 1 ? "business" : "businesses"} with no website
                    </h2>
                    <p className="mt-1 text-base text-muted-foreground">
                      {state.params.categoryLabel} within {state.params.radiusKm} km of {state.params.city}. OpenStreetMap is incomplete, so hit <strong className="font-semibold text-foreground">Verify</strong> before you pitch.
                    </p>
                    {state.outcome.truncated && <p className="mt-1 text-sm text-muted-foreground">Showing the first {businesses.length}. Shrink the radius to see the rest.</p>}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <TabsList className="w-full sm:w-64">
                      <TabsTrigger value="list">
                        <List /> List
                      </TabsTrigger>
                      <TabsTrigger value="map">
                        <MapIcon /> Map
                      </TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-3">
                      <Switch id="phone-only" checked={phoneOnly} onCheckedChange={(v) => { setPhoneOnly(v); setShown(PAGE); }} />
                      <Label htmlFor="phone-only" className="flex items-center gap-1.5 text-base text-foreground">
                        <Phone className="size-4 text-muted-foreground" /> Only with phone
                      </Label>
                    </div>
                  </div>
                </div>

                <TabsContent value="list">
                  {visible.length === 0 ? (
                    <NoResultsState filtered />
                  ) : (
                    <>
                      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {visible.slice(0, shown).map((b) => (
                          <li key={b.id}>
                            <LeadCard business={b} lead={leads[b.id]} />
                          </li>
                        ))}
                      </ul>
                      {shown < visible.length && (
                        <div className="mt-6 flex justify-center">
                          <Button variant="outline" size="lg" onClick={() => setShown((n) => n + PAGE)}>
                            Show more ({visible.length - shown} left)
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>

                <TabsContent value="map">
                  <MapView businesses={visible} center={state.outcome.center} radiusKm={state.params.radiusKm} savedIds={savedIds} />
                  <p className="mt-2 text-sm text-muted-foreground">Tap a pin for the phone, WhatsApp and Verify links. White pins are saved leads.</p>
                </TabsContent>
              </Tabs>
            )}
          </section>
        )}
      </div>
    </>
  );
}
