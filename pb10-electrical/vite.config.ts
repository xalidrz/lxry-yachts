import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/** Fills %VITE_SITE_URL% in index.html (canonical + social-card URLs). Empty → relative URLs. */
function siteUrl(): Plugin {
  let url = "";
  return {
    name: "site-url",
    configResolved(config) {
      url = (loadEnv(config.mode, config.root, "VITE_").VITE_SITE_URL ?? "").replace(/\/$/, "");
    },
    transformIndexHtml: { order: "pre", handler: (html) => html.split("%VITE_SITE_URL%").join(url) },
  };
}

export default defineConfig({
  plugins: [react(), siteUrl()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
