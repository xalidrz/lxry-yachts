import { useCallback, useEffect, useState } from "react";
import { compare, vehicles } from "@/data/content";
import { CompareTray } from "@/components/site/CompareTray";
import { DealerFinder } from "@/components/site/DealerFinder";
import { EfficiencyFeature } from "@/components/site/EfficiencyFeature";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { MobileDealerBar } from "@/components/site/MobileDealerBar";
import { Offers } from "@/components/site/Offers";
import { Owners } from "@/components/site/Owners";
import { VehicleFinder } from "@/components/site/VehicleFinder";

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= compare.max ? s : [...s, id]));
  }, []);
  const remove = useCallback((id: string) => setSelected((s) => s.filter((x) => x !== id)), []);
  const clear = useCallback(() => setSelected([]), []);

  // concept links ("#") should not jump the page to the top
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a");
      if (a && a.getAttribute("href") === "#") e.preventDefault();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const items = selected.map((id) => vehicles.find((v) => v.id === id)!).filter(Boolean);

  return (
    <>
      <a
        href="#main"
        className="fixed left-2 top-2 z-[100] -translate-y-[200%] rounded-pill bg-ink px-3 py-1 text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <VehicleFinder selected={selected} max={compare.max} onToggle={toggle} />
        <EfficiencyFeature />
        <Offers />
        <DealerFinder />
        <Owners />
      </main>
      <Footer />
      <CompareTray items={items} onRemove={remove} onClear={clear} />
      <MobileDealerBar />
    </>
  );
}
