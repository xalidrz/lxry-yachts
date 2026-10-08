import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette (taken from the PB10 logo)
        ink: "#121212",
        surface: "#1A1A1A",
        "surface-2": "#222222",
        volt: { DEFAULT: "#F7931E", light: "#FFB627" },
        brandred: "#C1121F",
        muted: { DEFAULT: "#222222", foreground: "#A8A8A8" },
        // shadcn/ui semantic tokens, mapped onto the palette via CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
      },
      fontFamily: {
        heading: ['"Alfa Slab One"', '"Roboto Slab"', "Georgia", "serif"],
        label: ['"Barlow Condensed"', '"Arial Narrow"', "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: { label: "0.1em" },
      backgroundImage: {
        "volt-gradient": "linear-gradient(135deg, #F7931E 0%, #FFB627 100%)",
      },
      boxShadow: {
        "volt-glow": "0 0 0 1px rgba(247,147,30,0.6), 0 18px 50px -12px rgba(247,147,30,0.45)",
        "warm-glow": "0 0 0 1px rgba(255,182,39,0.45), 0 0 60px -6px rgba(255,182,39,0.35), 0 24px 60px -20px rgba(247,147,30,0.4)",
      },
      keyframes: {
        shine: { "0%": { transform: "translateX(-120%) skewX(-20deg)" }, "100%": { transform: "translateX(260%) skewX(-20deg)" } },
        pulseRing: { "0%": { transform: "scale(1)", opacity: "0.55" }, "100%": { transform: "scale(1.9)", opacity: "0" } },
      },
    },
  },
  corePlugins: { container: false }, // replaced by the fluid .container in index.css
  plugins: [animate],
} satisfies Config;
