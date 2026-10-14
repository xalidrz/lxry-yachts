import { HudHeader } from "@/components/hud/HudHeader";

/** Preview of the HUD navigation bar on a dark page (route: /hud). The live site still uses <Header />. */
export default function HudDemo() {
  return (
    <div className="min-h-screen" style={{ background: "radial-gradient(ellipse at 50% 0%, #111a2c 0%, #070b13 60%)" }}>
      <HudHeader activeHref="/marken" />
      <main className="container py-24 text-white">
        <h1 className="font-display text-4xl font-bold">HUD navigation</h1>
        <p className="mt-4 max-w-xl text-white/80">Hover the buttons, switch the language, resize below 1280&nbsp;px for the hamburger menu.</p>
      </main>
    </div>
  );
}
