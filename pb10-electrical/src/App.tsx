import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { CallButton } from "@/components/CallButton";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ContactPage } from "@/pages/ContactPage";
import { ElectricalPage } from "@/pages/ElectricalPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { ReviewsPage } from "@/pages/ReviewsPage";
import { WeddingPage } from "@/pages/WeddingPage";

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-volt focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/electrical" element={<ElectricalPage />} />
            <Route path="/wedding-lighting" element={<WeddingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CallButton />
      </MotionConfig>
    </LazyMotion>
  );
}
