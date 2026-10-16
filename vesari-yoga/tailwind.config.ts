import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Vesari palette: warm off-white, sage, charcoal, terracotta. No yellow or gold anywhere.
        paper: "#FAF9F6",
        mist: "#EEF2EC",
        sage: { DEFAULT: "#7D9A82", deep: "#4A6850" },
        charcoal: { DEFAULT: "#2A2E2B", soft: "#5B635E" },
        terracotta: { DEFAULT: "#A94E33", dark: "#8F3F27" },
        line: "#DDE4DA",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(42,46,43,0.05), 0 10px 24px -14px rgba(42,46,43,0.18)",
        lift: "0 2px 4px rgba(42,46,43,0.05), 0 18px 32px -16px rgba(42,46,43,0.28)",
      },
    },
  },
} satisfies Config;
