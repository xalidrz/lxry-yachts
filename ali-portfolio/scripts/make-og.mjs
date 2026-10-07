// Renders public/og.png (1200x630) from the live hero.
// Usage: npm run build && npm start   (in another terminal)  then:  npm run og
// Optional: URL=http://localhost:3000 CHROME=/path/to/chrome npm run og
import { chromium } from "playwright-core";

const url = process.env.URL ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.addStyleTag({ content: ".float-a,.float-b{animation:none!important}" });
await page.waitForTimeout(1200);
// skip the 64px sticky navbar so the hero fills the card
await page.screenshot({ path: "public/og.png", clip: { x: 0, y: 64, width: 1200, height: 630 } });
await browser.close();
console.log("Wrote public/og.png");
