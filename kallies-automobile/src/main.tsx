import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";
import App from "./App";
import { I18nProvider } from "@/i18n";
import { ToastProvider } from "@/components/ui/toast";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        {/* reducedMotion="user": transform/layout animations are disabled for visitors who prefer reduced motion */}
        <MotionConfig reducedMotion="user">
          <ToastProvider>
            <App />
          </ToastProvider>
        </MotionConfig>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
);
