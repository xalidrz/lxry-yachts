import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";

// Everything except the home page is code-split so the first load stays small.
const Listings = lazy(() => import("@/pages/Listings"));
const PropertyDetail = lazy(() => import("@/pages/PropertyDetail"));
const ConstructionPage = lazy(() => import("@/pages/ConstructionPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const About = lazy(() => import("@/pages/About"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const MarlaConverterPage = lazy(() => import("@/pages/MarlaConverterPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<div className="min-h-screen bg-ink" aria-busy="true" />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="buy" element={<Listings mode="buy" />} />
              <Route path="rent" element={<Listings mode="rent" />} />
              <Route path="property/:id" element={<PropertyDetail />} />
              <Route path="construction" element={<ConstructionPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="marla-converter" element={<MarlaConverterPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  );
}
