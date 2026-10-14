import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";

const InventoryPage = lazy(() => import("@/pages/InventoryPage"));
const AnkaufPage = lazy(() => import("@/pages/AnkaufPage"));
const WerkstattPage = lazy(() => import("@/pages/WerkstattPage"));
const MagazinPage = lazy(() => import("@/pages/MagazinPage"));
const MarkenPage = lazy(() => import("@/pages/MarkenPage"));
const OldtimerPage = lazy(() => import("@/pages/OldtimerPage"));
const KarrierePage = lazy(() => import("@/pages/KarrierePage"));
const KontaktPage = lazy(() => import("@/pages/KontaktPage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const HudDemo = lazy(() => import("@/pages/HudDemo"));

/** Stable reference so the inventory memoization is not reset on every render. */
const HARLEY = { makes: ["Harley-Davidson"] };

export default function App() {
  return (
    <Routes>
        <Route path="hud" element={<HudDemo />} />
      <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="fahrzeuge" element={<InventoryPage />} />
          <Route
            path="harley-davidson"
            element={<InventoryPage variant="harley" preset={HARLEY} />}
          />
          <Route path="oldtimer" element={<OldtimerPage />} />
          <Route path="marken" element={<MarkenPage />} />
          <Route path="ankauf" element={<AnkaufPage />} />
          <Route path="werkstattservice" element={<WerkstattPage />} />
          <Route path="karriere" element={<KarrierePage />} />
          <Route path="magazin" element={<MagazinPage />} />
          <Route path="kontakt" element={<KontaktPage />} />
          <Route path="ueber-uns" element={<LegalPage slug="ueber-uns" />} />
          <Route path="impressum" element={<LegalPage slug="impressum" />} />
          <Route path="datenschutz" element={<LegalPage slug="datenschutz" />} />
          <Route path="agb" element={<LegalPage slug="agb" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  );
}
