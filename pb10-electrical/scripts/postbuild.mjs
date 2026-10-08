/**
 * Runs after `vite build`. The site is a client-side React app, so every route would otherwise ship the home
 * page's <head>. This writes one HTML file per route (dist/electrical/index.html …) with that page's own
 * <title>, description, canonical and share tags baked in, plus dist/404.html (noindex) and a sitemap.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const pages = JSON.parse(readFileSync(resolve(root, "src/data/pages.json"), "utf8"));

// Same variable the app reads: process env (Vercel) first, then .env files.
function siteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/$/, "");
  for (const f of [".env.production.local", ".env.local", ".env.production", ".env"]) {
    const p = resolve(root, f);
    if (!existsSync(p)) continue;
    const m = readFileSync(p, "utf8").match(/^VITE_SITE_URL=(.*)$/m);
    if (m && m[1].trim()) return m[1].trim().replace(/\/$/, "");
  }
  return "";
}
const base = siteUrl();

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const html = readFileSync(resolve(dist, "index.html"), "utf8");

function render(page) {
  const t = esc(page.title);
  const d = esc(page.description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${d}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[\s\S]*?("\s*\/>)/, `$1${t}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${d}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[\s\S]*?("\s*\/>)/, `$1${t}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[\s\S]*?("\s*\/>)/, `$1${d}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/, `$1${base}${page.path}$2`);
}

for (const page of pages) {
  if (page.path === "/") continue; // dist/index.html is already the home page
  const dir = resolve(dist, page.path.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), render(page));
}

// 404: served by Vercel for unknown URLs (with a 404 status); the React router then shows the not-found page.
writeFileSync(
  resolve(dist, "404.html"),
  render({ path: "/404", title: "Page not found | PB10 Electrical", description: "That page doesn't exist. Head back to the PB10 Electrical home page." })
    .replace(/(<meta\s+name="robots"\s+content=")[^"]*("\s*\/>)/, "$1noindex$2")
    .replace(/<link\s+rel="canonical"[^>]*\/>\n?\s*/, ""),
);

// Sitemap + robots only make sense with absolute URLs.
let robots = "User-agent: *\nAllow: /\n";
if (base) {
  const urls = pages.map((p) => `  <url><loc>${base}${p.path === "/" ? "/" : p.path}</loc></url>`).join("\n");
  writeFileSync(resolve(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  robots += `Sitemap: ${base}/sitemap.xml\n`;
}
writeFileSync(resolve(dist, "robots.txt"), robots);

console.log(`postbuild: ${pages.length} route pages, 404.html${base ? ", sitemap.xml" : " (no VITE_SITE_URL → sitemap skipped)"}`);
