import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  // Real environment variables (e.g. set in Vercel) override values in .env
  const env = loadEnv(mode, __dirname, "VITE_");
  const closed = env.VITE_SITE_CLOSED === "true";

  return {
    plugins: [react()],
    resolve: {
      alias: [
        // Closed mode: the only thing bundled is the standalone "closed" page.
        ...(closed ? [{ find: /^@\/root$/, replacement: path.resolve(__dirname, "src/ClosedApp.tsx") }] : []),
        { find: "@", replacement: path.resolve(__dirname, "src") },
      ],
    },
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
  };
});
