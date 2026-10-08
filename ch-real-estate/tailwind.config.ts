import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette (taken from the CH logo)
        ink: "#0E0E10",
        surface: "#16161A",
        "surface-2": "#1E1E23",
        gold: { DEFAULT: "#C9A04A", light: "#E8C878", dark: "#B8893A" },
        cream: "#F2EDE3",
        muted: { DEFAULT: "#1E1E23", foreground: "#9C978C" },
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
        heading: ['"Marcellus"', "Cinzel", "Georgia", "serif"],
        label: ['"Barlow Condensed"', "Arial Narrow", "sans-serif"],
        body: ['"Barlow"', "system-ui", "sans-serif"],
      },
      letterSpacing: { label: "0.12em" },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #B8893A 0%, #E8C878 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 0 1px rgba(201,160,74,0.55), 0 18px 50px -12px rgba(201,160,74,0.35)",
      },
      keyframes: {
        shine: { "0%": { transform: "translateX(-120%) skewX(-20deg)" }, "100%": { transform: "translateX(260%) skewX(-20deg)" } },
      },
    },
  },
  corePlugins: { container: false }, // replaced by the fluid .container in index.css
  plugins: [animate],
} satisfies Config;
