import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const rgb = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // The scanner mistakes the motion `transition` prop for the utility, which lists backdrop-filter. Nothing uses it.
  blocklist: ["transition"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", md: "2rem", xl: "3rem" }, screens: { "2xl": "1440px" } },
    extend: {
      colors: {
        // Palette: near-black, off-white, one brand accent, two neutral greys.
        ink: rgb("ink"),
        paper: rgb("paper"),
        brand: { DEFAULT: rgb("brand"), ink: rgb("brand-ink") },
        grey: rgb("grey"),
        line: rgb("line"),
        // shadcn/ui semantic tokens mapped onto the palette
        border: rgb("line"),
        input: rgb("line"),
        ring: rgb("ink"),
        background: rgb("paper"),
        foreground: rgb("ink"),
        card: { DEFAULT: "rgb(255 255 255 / <alpha-value>)", foreground: rgb("ink") },
        popover: { DEFAULT: "rgb(255 255 255 / <alpha-value>)", foreground: rgb("ink") },
        primary: { DEFAULT: rgb("ink"), foreground: rgb("paper") },
        secondary: { DEFAULT: rgb("line"), foreground: rgb("ink") },
        muted: { DEFAULT: rgb("line"), foreground: rgb("grey") },
        accent: { DEFAULT: rgb("line"), foreground: rgb("ink") },
        destructive: { DEFAULT: "rgb(176 32 32 / <alpha-value>)", foreground: "rgb(255 255 255 / <alpha-value>)" },
      },
      fontFamily: {
        display: ['"Schibsted Grotesk Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { lg: "8px", md: "6px", sm: "4px" },
      boxShadow: {
        card: "0 1px 2px rgb(11 13 16 / 0.06)",
        lift: "0 16px 32px -16px rgb(11 13 16 / 0.28)",
      },
      transitionTimingFunction: { out: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: { "accordion-down": "accordion-down 0.25s ease-out", "accordion-up": "accordion-up 0.2s ease-out" },
    },
  },
  plugins: [animate],
} satisfies Config;
