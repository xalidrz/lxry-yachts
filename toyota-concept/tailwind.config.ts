import type { Config } from "tailwindcss";

// Every value below points at a CSS variable defined in src/index.css (the token layer).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: "var(--ink)",
      graphite: "var(--graphite)",
      steel: "var(--steel)",
      mist: "var(--mist)",
      paper: "var(--paper)",
      white: "var(--white)",
      red: "var(--red)",
      "red-press": "var(--red-press)",
      surface: "var(--surface)",
      fg: "var(--fg)",
      muted: "var(--fg-muted)",
      line: "var(--line)",
      focus: "var(--focus)",
    },
    // 8px scale: key n = n * 8px
    spacing: {
      0: "0",
      px: "1px",
      0.5: "4px",
      1: "var(--s-1)",
      2: "var(--s-2)",
      3: "var(--s-3)",
      4: "var(--s-4)",
      5: "var(--s-5)",
      6: "var(--s-6)",
      7: "var(--s-7)",
      8: "var(--s-8)",
      9: "var(--s-9)",
      10: "var(--s-10)",
      12: "var(--s-12)",
      15: "var(--s-15)",
    },
    borderRadius: { none: "0", card: "var(--radius-card)", pill: "var(--radius-pill)", full: "var(--radius-pill)" },
    fontFamily: { display: "var(--font-display)", body: "var(--font-body)" },
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    extend: {
      maxWidth: { measure: "var(--measure)", container: "var(--container)" },
      transitionTimingFunction: { out: "var(--ease-out)" },
      transitionDuration: { reveal: "var(--dur-reveal)", slow: "var(--dur-slow)" },
      zIndex: { header: "50", tray: "60", dealerbar: "55" },
    },
  },
  plugins: [],
} satisfies Config;
