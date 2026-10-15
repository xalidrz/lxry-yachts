import { useEffect, useState } from "react";
import { AppHeader, BottomNav, type Route } from "@/components/AppHeader";
import { loadForm, type SearchForm } from "@/components/SearchBar";
import { useSearch } from "@/hooks/useSearch";
import { useLeads } from "@/lib/leads";
import { FindPage } from "@/pages/FindPage";
import { LeadsPage } from "@/pages/LeadsPage";

function routeFromHash(): Route {
  return window.location.hash.startsWith("#/leads") ? "leads" : "find";
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash);
  const [form, setForm] = useState<SearchForm>(loadForm);
  const { state, search, cancel } = useSearch();
  const leadCount = Object.keys(useLeads()).length;

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="min-h-dvh pb-20 md:pb-0">
      <AppHeader route={route} leadCount={leadCount} />
      <main>
        {route === "find" ? <FindPage state={state} form={form} onFormChange={setForm} onSearch={search} onCancel={cancel} /> : <LeadsPage />}
      </main>
      <BottomNav route={route} leadCount={leadCount} />
    </div>
  );
}
