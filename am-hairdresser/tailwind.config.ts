import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        ink: { DEFAULT: "#0B0B0B", 2: "#141414" },
        gold: { DEFAULT: "#C9A24A", light: "#E6C878", dark: "#A8802F", fill: "#2A2112" },
        cream: "#F2EEE6",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E6C878 0%, #A8802F 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 0 1px rgba(201,162,74,.5), 0 0 26px rgba(201,162,74,.45)",
        "gold-edge": "0 0 0 1px rgba(201,162,74,.4), 0 18px 50px -18px rgba(201,162,74,.4)",
        nav: "0 10px 40px -12px rgba(0,0,0,.8)",
      },
      keyframes: {
        wiggle: {
          "0%,100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-16deg)" },
          "40%": { transform: "rotate(14deg)" },
          "60%": { transform: "rotate(-10deg)" },
          "80%": { transform: "rotate(6deg)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(22px)" }, to: { opacity: "1", transform: "none" } },
        streak: {
          "0%,100%": { transform: "translate3d(-6%,0,0) skewX(-18deg)", opacity: ".5" },
          "50%": { transform: "translate3d(6%,0,0) skewX(-18deg)", opacity: ".9" },
        },
        "pulse-dot": { "0%": { boxShadow: "0 0 0 0 currentColor" }, "70%,100%": { boxShadow: "0 0 0 8px transparent" } },
      },
      animation: {
        wiggle: "wiggle .6s ease-in-out",
        "spin-slow": "spin-slow 26s linear infinite",
        "fade-up": "fade-up .8s cubic-bezier(.22,1,.36,1) both",
        streak: "streak 14s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2s ease-out infinite",
      },
    },
  },
  plugins: [animate],
};
export default config;
