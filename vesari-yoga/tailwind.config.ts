import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Vesari palette: warm espresso, cream, soft gold/peach.
        espresso: { DEFAULT: "#1B1410", soft: "#261B15" },
        cream: { DEFAULT: "#F6EFE4", dim: "#D8CCB8" },
        gold: { DEFAULT: "#F2C887", deep: "#8A5A22" },
        ink: "#4A3B30",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.2), 0 12px 28px -16px rgba(0,0,0,0.5)",
        lift: "0 2px 4px rgba(0,0,0,0.2), 0 22px 36px -18px rgba(0,0,0,0.65)",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(22px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { "fade-up": "fade-up 1s ease-out both" },
    },
  },
} satisfies Config;
