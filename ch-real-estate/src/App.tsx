import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Properties } from "@/components/sections/Properties";
import { Construction } from "@/components/sections/Construction";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Converter } from "@/components/sections/Converter";
import { Contact, type Prefill } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { BuildQuery } from "@/components/SearchBar";
import type { Chip, Criteria } from "@/lib/filters";

export default function App() {
  const [chip, setChip] = useState<Chip>("all");
  const [criteria, setCriteria] = useState<Criteria | null>(null);
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });

  const scrollTo = (id: string) => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));

  const selectChip = useCallback((c: Chip) => {
    setCriteria(null);
    setChip(c);
  }, []);

  const search = (c: Criteria) => {
    setCriteria(c);
    setChip(c.mode === "buy" ? "sale" : "rent");
    scrollTo("properties");
  };

  const build = (q: BuildQuery) => {
    const parts = [
      q.service && `Service: ${q.service}`,
      q.area && `Area: ${q.area}`,
      q.size && `Plot size: ${q.size}`,
      q.budget && `Budget: ${q.budget}`,
    ].filter(Boolean);
    setPrefill((p) => ({
      interest: "Construction",
      message: parts.length ? `I'd like a construction quote.\n${parts.join("\n")}` : "I'd like a construction quote.",
      nonce: p.nonce + 1,
    }));
    scrollTo("contact");
  };

  return (
    <MotionConfig reducedMotion="user">
      <Navbar
        onListing={selectChip}
        onBookVisit={() => setPrefill((p) => ({ message: "I'd like to book a site visit.", nonce: p.nonce + 1 }))}
      />
      <main>
        <Hero onSearch={search} onBuild={build} />
        <Properties chip={chip} criteria={criteria} onChip={selectChip} onClear={() => selectChip("all")} />
        <Construction
          onQuote={(service) =>
            setPrefill((p) => ({ interest: "Construction", message: `I'd like a quote for: ${service}.`, nonce: p.nonce + 1 }))
          }
        />
        <Process />
        <Projects />
        <WhyChoose />
        <Converter />
        <Contact prefill={prefill} />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  );
}
