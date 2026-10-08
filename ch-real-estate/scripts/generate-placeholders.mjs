/**
 * Generates the placeholder artwork in /public (architectural scenes, favicon, OG image).
 *
 * The scenes are stylised illustrations in the brand palette (charcoal + gold) — they exist so the
 * site looks finished before real photography is available. To swap in real photos, just replace
 * the files in /public/images (or change the paths in src/data/*.ts). Nothing else depends on them.
 *
 *   npm run placeholders
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/images");
mkdirSync(out, { recursive: true });

// ---------- helpers ----------
const rng = (seed) => {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
};
const f = (n) => Math.round(n * 10) / 10;
const GOLD = "#C9A04A";
const GOLD_L = "#E8C878";
const GOLD_D = "#B8893A";

function defs(id, w, h, horizon, glowX = 0.5) {
  return `
  <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#09090b"/><stop offset=".45" stop-color="#15120d"/>
    <stop offset=".8" stop-color="#3b2d14"/><stop offset="1" stop-color="#7a5a26"/>
  </linearGradient>
  <radialGradient id="${id}glow" cx="${glowX}" cy="${f(horizon / h)}" r=".7">
    <stop offset="0" stop-color="${GOLD_L}" stop-opacity=".5"/><stop offset=".45" stop-color="${GOLD}" stop-opacity=".14"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="${id}glass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${GOLD_L}"/><stop offset="1" stop-color="${GOLD_D}"/>
  </linearGradient>
  <linearGradient id="${id}dark" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#202026"/><stop offset="1" stop-color="#121216"/>
  </linearGradient>
  <linearGradient id="${id}ground" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1a1813"/><stop offset="1" stop-color="#09090b"/>
  </linearGradient>
  <linearGradient id="${id}fade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <mask id="${id}rm"><rect width="${w}" height="${h}" fill="url(#${id}fade)"/></mask>
  <radialGradient id="${id}vig" cx=".5" cy=".5" r=".75">
    <stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/>
  </radialGradient>`;
}

function sky(id, w, h, horizon, r) {
  let s = `<rect width="${w}" height="${horizon}" fill="url(#${id}sky)"/><rect width="${w}" height="${horizon}" fill="url(#${id}glow)"/>`;
  for (let i = 0; i < 70; i++) {
    const y = r() * horizon * 0.55;
    s += `<circle cx="${f(r() * w)}" cy="${f(y)}" r="${f(0.5 + r() * 1.1)}" fill="${GOLD_L}" opacity="${f(0.15 + r() * 0.5)}"/>`;
  }
  return s;
}

function mountains(w, base, amp, color, r, steps = 12, opacity = 1) {
  const pts = [];
  for (let i = 0; i <= steps; i++) pts.push([f((i / steps) * w), f(base - amp * (0.25 + r() * 0.75))]);
  let d = `M0 ${base + 4} L${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    d += ` L${f((x0 + x1) / 2 + (r() - 0.5) * (w / steps) * 0.5)} ${f(Math.min(y0, y1) - r() * amp * 0.12)} L${x1} ${y1}`;
  }
  d += ` L${w} ${base + 4} Z`;
  return `<path d="${d}" fill="${color}" opacity="${opacity}"/>`;
}

function tree(x, y, hgt, color = "#0c0c0e") {
  // simple palm / cypress silhouette
  return `<g fill="${color}"><rect x="${f(x - hgt * 0.015)}" y="${f(y - hgt)}" width="${f(hgt * 0.03)}" height="${f(hgt)}"/>
  <ellipse cx="${f(x)}" cy="${f(y - hgt)}" rx="${f(hgt * 0.26)}" ry="${f(hgt * 0.1)}"/>
  <ellipse cx="${f(x - hgt * 0.14)}" cy="${f(y - hgt * 0.9)}" rx="${f(hgt * 0.16)}" ry="${f(hgt * 0.06)}" transform="rotate(-24 ${f(x - hgt * 0.14)} ${f(y - hgt * 0.9)})"/>
  <ellipse cx="${f(x + hgt * 0.14)}" cy="${f(y - hgt * 0.9)}" rx="${f(hgt * 0.16)}" ry="${f(hgt * 0.06)}" transform="rotate(24 ${f(x + hgt * 0.14)} ${f(y - hgt * 0.9)})"/></g>`;
}

function windows(id, x, y, w, h, cols, rows, r, litChance = 0.7, pad = 0.12) {
  let s = "";
  const cw = w / cols;
  const rh = h / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const lit = r() < litChance;
      s += `<rect x="${f(x + i * cw + cw * pad)}" y="${f(y + j * rh + rh * pad)}" width="${f(cw * (1 - pad * 2))}" height="${f(rh * (1 - pad * 2))}" fill="${lit ? `url(#${id}glass)` : "#191920"}" opacity="${lit ? f(0.55 + r() * 0.45) : 1}"/>`;
    }
  }
  return s;
}

function wrap(id, w, h, body, horizon, glowX, extra = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Placeholder architectural illustration"><defs>${defs(id, w, h, horizon, glowX)}</defs>${body}${extra}<rect width="${w}" height="${h}" fill="url(#${id}vig)"/></svg>`;
}

// ---------- scenes ----------
function villa({ w, h, seed, id, hz = 0.62, gyr = 0.74, k = 1, edge = 1 }) {
  const r = rng(seed);
  const horizon = h * hz;
  const gy = h * gyr; // building ground line
  let g = sky(id, w, h, horizon, r);
  g += mountains(w, horizon, h * 0.2, "#1d1a14", r, 10, 0.9);
  g += mountains(w, horizon + 6, h * 0.12, "#111113", r, 14);
  g += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#${id}ground)"/>`;
  // building group (reused for the reflection)
  let b = "";
  const x0 = w * 0.16;
  const gw = w * 0.62;
  const gh = h * 0.16 * k;
  // ground-floor volume
  b += `<rect x="${f(x0)}" y="${f(gy - gh)}" width="${f(gw)}" height="${f(gh)}" fill="url(#${id}dark)"/>`;
  b += windows(id, x0 + gw * 0.04, gy - gh * 0.92, gw * 0.62, gh * 0.84, 5, 1, r, 0.95, 0.05);
  b += `<rect x="${f(x0 + gw * 0.68)}" y="${f(gy - gh)}" width="${f(gw * 0.32)}" height="${f(gh)}" fill="#2b2924"/>`;
  b += windows(id, x0 + gw * 0.72, gy - gh * 0.8, gw * 0.12, gh * 0.8, 1, 1, r, 1, 0.1);
  // slab + cantilevered upper volume
  b += `<rect x="${f(x0 - w * 0.02)}" y="${f(gy - gh - h * 0.012)}" width="${f(gw * 0.92)}" height="${f(h * 0.012)}" fill="#34343b"/>`;
  b += `<rect x="${f(x0 - w * 0.02)}" y="${f(gy - gh - h * 0.0125)}" width="${f(gw * 0.92)}" height="1.5" fill="${GOLD}" opacity="${0.85 * edge}"/>`;
  const ux = x0 + gw * 0.2;
  const uw = gw * 0.84;
  const uh = h * 0.125 * k;
  const uy = gy - gh - h * 0.012 - uh;
  b += `<rect x="${f(ux)}" y="${f(uy)}" width="${f(uw)}" height="${f(uh)}" fill="#26262c"/>`;
  b += `<rect x="${f(ux)}" y="${f(uy)}" width="${f(uw * 0.34)}" height="${f(uh)}" fill="#2f2c26"/>`;
  b += windows(id, ux + uw * 0.37, uy + uh * 0.14, uw * 0.58, uh * 0.72, 4, 1, r, 0.9, 0.05);
  for (let i = 0; i < 9; i++) b += `<rect x="${f(ux + 8 + i * (uw * 0.34 - 16) / 8)}" y="${f(uy + 6)}" width="2" height="${f(uh - 12)}" fill="#14141a" opacity=".7"/>`;
  b += `<rect x="${f(ux - 6)}" y="${f(uy - h * 0.012)}" width="${f(uw + 12)}" height="${f(h * 0.012)}" fill="#34343b"/>`;
  b += `<rect x="${f(ux - 6)}" y="${f(uy - h * 0.0125)}" width="${f(uw + 12)}" height="1.5" fill="${GOLD_L}" opacity="${0.9 * edge}"/>`;
  g += `<g id="${id}b">${b}</g>`;
  // landscaping behind the building line
  g += tree(w * 0.07, gy + 4, h * 0.3) + tree(w * 0.12, gy + 6, h * 0.22) + tree(w * 0.9, gy + 4, h * 0.28) + tree(w * 0.84, gy + 2, h * 0.18);
  // pool + reflection
  const py = gy + h * 0.035;
  g += `<rect x="${f(x0 - w * 0.04)}" y="${f(py)}" width="${f(gw + w * 0.1)}" height="${f(h - py)}" fill="#0b0c10"/>`;
  g += `<use href="#${id}b" transform="translate(0 ${f(2 * gy + 0)}) scale(1 -1)" mask="url(#${id}rm)" opacity=".42" />`;
  g += `<rect x="${f(x0 - w * 0.04)}" y="${f(py)}" width="${f(gw + w * 0.1)}" height="${f(h - py)}" fill="url(#${id}glow)" opacity=".5"/>`;
  for (let i = 0; i < 14; i++) g += `<rect x="${f(x0 + r() * gw)}" y="${f(py + 8 + r() * (h - py - 14))}" width="${f(30 + r() * 90)}" height="1" fill="${GOLD_L}" opacity="${f(0.1 + r() * 0.25)}"/>`;
  g += `<rect x="${f(x0 - w * 0.04)}" y="${f(py - 2)}" width="${f(gw + w * 0.1)}" height="3" fill="#2a2a30"/>`;
  // path lights
  for (let i = 0; i < 8; i++) g += `<circle cx="${f(w * 0.1 + i * w * 0.115)}" cy="${f(gy + 8)}" r="2" fill="${GOLD_L}" opacity=".85"/>`;
  return wrap(id, w, h, g, horizon, 0.62);
}

function tower({ w, h, seed, id }) {
  const r = rng(seed);
  const horizon = h * 0.72;
  let g = sky(id, w, h, horizon, r);
  g += mountains(w, horizon, h * 0.14, "#1b1812", r, 9, 0.9);
  g += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#${id}ground)"/>`;
  // side buildings
  const sideW = w * 0.2;
  g += `<rect x="${f(w * 0.06)}" y="${f(h * 0.4)}" width="${f(sideW)}" height="${f(horizon - h * 0.4)}" fill="#18181d"/>${windows(id, w * 0.06 + 6, h * 0.41, sideW - 12, horizon - h * 0.43, 4, 12, r, 0.45, 0.2)}`;
  g += `<rect x="${f(w * 0.74)}" y="${f(h * 0.46)}" width="${f(w * 0.2)}" height="${f(horizon - h * 0.46)}" fill="#18181d"/>${windows(id, w * 0.74 + 6, h * 0.47, w * 0.2 - 12, horizon - h * 0.49, 4, 10, r, 0.45, 0.2)}`;
  // main tower
  const tx = w * 0.3;
  const tw = w * 0.4;
  const ty = h * 0.1;
  g += `<rect x="${f(tx)}" y="${f(ty)}" width="${f(tw)}" height="${f(horizon - ty)}" fill="url(#${id}dark)"/>`;
  g += windows(id, tx + 8, ty + 10, tw - 16, horizon - ty - 40, 6, 22, r, 0.62, 0.16);
  for (let i = 0; i <= 6; i++) g += `<rect x="${f(tx + 8 + (i * (tw - 16)) / 6 - 1)}" y="${f(ty)}" width="2" height="${f(horizon - ty)}" fill="${GOLD}" opacity=".35"/>`;
  g += `<rect x="${f(tx - 4)}" y="${f(ty - 6)}" width="${f(tw + 8)}" height="6" fill="#2a2a30"/><rect x="${f(tx - 4)}" y="${f(ty - 7)}" width="${f(tw + 8)}" height="1.5" fill="${GOLD_L}"/>`;
  g += `<rect x="${f(w / 2 - 1.5)}" y="${f(ty - h * 0.08)}" width="3" height="${f(h * 0.08)}" fill="#2a2a30"/><circle cx="${f(w / 2)}" cy="${f(ty - h * 0.08)}" r="3.5" fill="${GOLD_L}"/>`;
  // podium
  g += `<rect x="${f(tx - w * 0.07)}" y="${f(horizon - h * 0.06)}" width="${f(tw + w * 0.14)}" height="${f(h * 0.06)}" fill="#202026"/>${windows(id, tx - w * 0.07 + 6, horizon - h * 0.05, tw + w * 0.14 - 12, h * 0.045, 12, 1, r, 1, 0.15)}`;
  g += `<rect x="${f(tx - w * 0.07)}" y="${f(horizon - h * 0.062)}" width="${f(tw + w * 0.14)}" height="2" fill="${GOLD}"/>`;
  // street + light streaks
  for (let i = 0; i < 16; i++) g += `<rect x="${f(r() * w)}" y="${f(horizon + 10 + r() * (h - horizon - 20))}" width="${f(40 + r() * 140)}" height="1.4" fill="${GOLD_L}" opacity="${f(0.1 + r() * 0.35)}"/>`;
  g += tree(w * 0.1, horizon + 6, h * 0.16) + tree(w * 0.88, horizon + 8, h * 0.14);
  return wrap(id, w, h, g, horizon, 0.5);
}

function plot({ w, h, seed, id, label }) {
  const r = rng(seed);
  const horizon = h * 0.5;
  let g = sky(id, w, h, horizon, r);
  g += mountains(w, horizon, h * 0.2, "#201b13", r, 9, 0.95);
  g += mountains(w, horizon + 4, h * 0.11, "#121214", r, 13);
  g += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#${id}ground)"/>`;
  // perspective survey grid
  const vx = w * 0.5;
  for (let i = -8; i <= 8; i++) g += `<line x1="${vx}" y1="${horizon}" x2="${f(vx + i * w * 0.2)}" y2="${h}" stroke="${GOLD}" stroke-opacity=".08"/>`;
  for (let i = 1; i < 9; i++) {
    const y = horizon + Math.pow(i / 9, 2.2) * (h - horizon);
    g += `<line x1="0" y1="${f(y)}" x2="${w}" y2="${f(y)}" stroke="${GOLD}" stroke-opacity=".08"/>`;
  }
  // the plot polygon
  const p = [[w * 0.3, h * 0.6], [w * 0.7, h * 0.6], [w * 0.88, h * 0.9], [w * 0.12, h * 0.9]];
  g += `<polygon points="${p.map((q) => q.map(f).join(",")).join(" ")}" fill="${GOLD}" fill-opacity=".1" stroke="${GOLD_L}" stroke-width="2" stroke-dasharray="${label ? "10 6" : "none"}"/>`;
  for (const [x, y] of p) {
    const s = 0.7 + ((y - h * 0.6) / (h * 0.3)) * 0.8;
    g += `<rect x="${f(x - 1.5 * s)}" y="${f(y - 26 * s)}" width="${f(3 * s)}" height="${f(26 * s)}" fill="${GOLD_L}"/><polygon points="${f(x + 1.5 * s)},${f(y - 26 * s)} ${f(x + 16 * s)},${f(y - 21 * s)} ${f(x + 1.5 * s)},${f(y - 16 * s)}" fill="${GOLD}"/>`;
  }
  // dimension line
  g += `<line x1="${f(p[3][0])}" y1="${f(h * 0.955)}" x2="${f(p[2][0])}" y2="${f(h * 0.955)}" stroke="${GOLD_L}" stroke-width="1.5"/><line x1="${f(p[3][0])}" y1="${f(h * 0.94)}" x2="${f(p[3][0])}" y2="${f(h * 0.97)}" stroke="${GOLD_L}"/><line x1="${f(p[2][0])}" y1="${f(h * 0.94)}" x2="${f(p[2][0])}" y2="${f(h * 0.97)}" stroke="${GOLD_L}"/>`;
  g += tree(w * 0.06, horizon + h * 0.1, h * 0.3) + tree(w * 0.95, horizon + h * 0.08, h * 0.26);
  return wrap(id, w, h, g, horizon, 0.5);
}

function plaza({ w, h, seed, id, floors = 4 }) {
  const r = rng(seed);
  const horizon = h * 0.76;
  let g = sky(id, w, h, horizon, r);
  g += mountains(w, horizon, h * 0.16, "#1b1812", r, 10, 0.9);
  g += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#${id}ground)"/>`;
  const x0 = w * 0.1;
  const bw = w * 0.8;
  const bh = h * 0.1 * floors;
  const by = horizon - bh;
  g += `<rect x="${f(x0)}" y="${f(by)}" width="${f(bw)}" height="${f(bh)}" fill="url(#${id}dark)"/>`;
  for (let i = 0; i < floors - 1; i++) {
    const fy = by + (i * (bh - h * 0.12)) / (floors - 1) + 10;
    g += windows(id, x0 + 8, fy, bw - 16, (bh - h * 0.12) / (floors - 1) - 14, 10, 1, r, 0.7, 0.07);
    g += `<rect x="${f(x0)}" y="${f(fy + (bh - h * 0.12) / (floors - 1) - 12)}" width="${f(bw)}" height="2" fill="${GOLD}" opacity=".7"/>`;
  }
  // storefront
  g += `<rect x="${f(x0)}" y="${f(horizon - h * 0.12)}" width="${f(bw)}" height="${f(h * 0.12)}" fill="#1a1a1f"/>`;
  g += windows(id, x0 + 12, horizon - h * 0.105, bw - 24, h * 0.095, 6, 1, r, 1, 0.04);
  g += `<rect x="${f(x0 - 10)}" y="${f(horizon - h * 0.135)}" width="${f(bw + 20)}" height="8" fill="#34343b"/><rect x="${f(x0 - 10)}" y="${f(horizon - h * 0.137)}" width="${f(bw + 20)}" height="2" fill="${GOLD_L}"/>`;
  // sign band (blank, to be replaced with the tenant's name)
  g += `<rect x="${f(w * 0.4)}" y="${f(by + 3)}" width="${f(w * 0.2)}" height="${f(h * 0.028)}" fill="none" stroke="${GOLD_L}" stroke-width="1.2" opacity=".8"/>`;
  // steps + street
  g += `<rect x="${f(x0 - 10)}" y="${f(horizon)}" width="${f(bw + 20)}" height="${f(h * 0.02)}" fill="#26262c"/>`;
  for (let i = 0; i < 18; i++) g += `<rect x="${f(r() * w)}" y="${f(horizon + h * 0.04 + r() * (h - horizon - h * 0.06))}" width="${f(50 + r() * 160)}" height="1.4" fill="${GOLD_L}" opacity="${f(0.08 + r() * 0.3)}"/>`;
  g += tree(w * 0.05, horizon + 6, h * 0.2) + tree(w * 0.95, horizon + 6, h * 0.18);
  return wrap(id, w, h, g, horizon, 0.5);
}

function construction({ w, h, seed, id, cols = 5, floors = 4 }) {
  const r = rng(seed);
  const horizon = h * 0.8;
  let g = sky(id, w, h, horizon, r);
  g += mountains(w, horizon, h * 0.13, "#1b1812", r, 9, 0.9);
  g += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#${id}ground)"/>`;
  const x0 = w * 0.16;
  const bw = w * 0.62;
  const fh = (h * 0.46) / floors;
  const colW = w * 0.017;
  const top = horizon - floors * fh;
  // columns & slabs (top floor still has rebar)
  for (let c = 0; c < cols; c++) {
    const cx = x0 + (c * (bw - colW)) / (cols - 1);
    g += `<rect x="${f(cx)}" y="${f(top)}" width="${f(colW)}" height="${f(horizon - top)}" fill="#33333a"/>`;
    for (let k = 0; k < 4; k++) g += `<line x1="${f(cx + 3 + k * 4)}" y1="${f(top - h * 0.05)}" x2="${f(cx + 3 + k * 4)}" y2="${f(top)}" stroke="${GOLD}" stroke-opacity=".7"/>`;
  }
  for (let i = 0; i <= floors; i++) {
    const y = top + i * fh;
    if (i === 0) continue;
    g += `<rect x="${f(x0 - 12)}" y="${f(y - 8)}" width="${f(bw + 24)}" height="8" fill="#41414a"/><rect x="${f(x0 - 12)}" y="${f(y - 8.5)}" width="${f(bw + 24)}" height="1.5" fill="${GOLD}" opacity=".6"/>`;
  }
  // partial brick infill
  g += `<rect x="${f(x0 + bw * 0.25)}" y="${f(horizon - fh * 2 + 8)}" width="${f(bw * 0.25)}" height="${f(fh * 2 - 8)}" fill="#25231f"/>`;
  g += windows(id, x0 + bw * 0.5, horizon - fh * 3 + 6, bw * 0.2, fh - 14, 2, 1, r, 1, 0.1);
  // scaffolding
  const sx = x0 + bw + 14;
  for (let i = 0; i < 4; i++) g += `<line x1="${f(sx + i * 22)}" y1="${f(top - 10)}" x2="${f(sx + i * 22)}" y2="${horizon}" stroke="${GOLD}" stroke-opacity=".55"/>`;
  for (let j = 0; j <= floors * 2; j++) g += `<line x1="${f(sx)}" y1="${f(top - 10 + j * (fh / 2))}" x2="${f(sx + 66)}" y2="${f(top - 10 + j * (fh / 2))}" stroke="${GOLD}" stroke-opacity=".5"/>`;
  for (let j = 0; j < floors * 2; j++) g += `<line x1="${f(sx)}" y1="${f(top - 10 + j * (fh / 2))}" x2="${f(sx + 66)}" y2="${f(top - 10 + (j + 1) * (fh / 2))}" stroke="${GOLD}" stroke-opacity=".28"/>`;
  // crane
  const cxn = w * 0.09;
  g += `<rect x="${f(cxn - 5)}" y="${f(h * 0.08)}" width="10" height="${f(horizon - h * 0.08)}" fill="#26262c"/>`;
  for (let j = 0; j < 22; j++) g += `<line x1="${f(cxn - 5)}" y1="${f(h * 0.08 + j * ((horizon - h * 0.08) / 22))}" x2="${f(cxn + 5)}" y2="${f(h * 0.08 + (j + 1) * ((horizon - h * 0.08) / 22))}" stroke="${GOLD}" stroke-opacity=".6"/>`;
  g += `<rect x="${f(cxn - w * 0.06)}" y="${f(h * 0.075)}" width="${f(w * 0.62)}" height="6" fill="${GOLD_D}"/><rect x="${f(cxn - w * 0.06)}" y="${f(h * 0.075)}" width="${f(w * 0.62)}" height="1.5" fill="${GOLD_L}"/>`;
  g += `<line x1="${f(cxn + w * 0.46)}" y1="${f(h * 0.081)}" x2="${f(cxn + w * 0.46)}" y2="${f(h * 0.3)}" stroke="${GOLD_L}"/><rect x="${f(cxn + w * 0.46 - 12)}" y="${f(h * 0.3)}" width="24" height="12" fill="${GOLD}"/>`;
  g += `<circle cx="${f(cxn)}" cy="${f(h * 0.065)}" r="3.5" fill="${GOLD_L}"/>`;
  // site floodlights + ground
  for (let i = 0; i < 10; i++) g += `<rect x="${f(r() * w)}" y="${f(horizon + 8 + r() * (h - horizon - 14))}" width="${f(30 + r() * 120)}" height="1.4" fill="${GOLD_L}" opacity="${f(0.08 + r() * 0.3)}"/>`;
  return wrap(id, w, h, g, horizon, 0.45);
}

function showroom({ w, h, seed, id }) {
  // low, wide glass pavilion — commercial unit
  const r = rng(seed);
  const horizon = h * 0.72;
  let g = sky(id, w, h, horizon, r);
  g += mountains(w, horizon, h * 0.16, "#1b1812", r, 11, 0.9);
  g += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#${id}ground)"/>`;
  const x0 = w * 0.1;
  const bw = w * 0.8;
  const bh = h * 0.3;
  const by = horizon - bh;
  let b = `<rect x="${f(x0)}" y="${f(by)}" width="${f(bw)}" height="${f(bh)}" fill="url(#${id}dark)"/>`;
  b += windows(id, x0 + 14, by + bh * 0.18, bw * 0.66, bh * 0.74, 5, 1, r, 1, 0.03);
  b += `<rect x="${f(x0 + bw * 0.7)}" y="${f(by)}" width="${f(bw * 0.3)}" height="${f(bh)}" fill="#2b2924"/>`;
  b += windows(id, x0 + bw * 0.74, by + bh * 0.2, bw * 0.12, bh * 0.7, 1, 1, r, 1, 0.1);
  b += `<rect x="${f(x0 - 16)}" y="${f(by - 12)}" width="${f(bw + 32)}" height="12" fill="#34343b"/><rect x="${f(x0 - 16)}" y="${f(by - 13)}" width="${f(bw + 32)}" height="2" fill="${GOLD_L}"/>`;
  g += `<g id="${id}b">${b}</g>`;
  g += `<rect x="${f(x0 - 16)}" y="${f(horizon)}" width="${f(bw + 32)}" height="${f(h - horizon)}" fill="#0c0c10"/>`;
  g += `<use href="#${id}b" transform="translate(0 ${f(2 * horizon)}) scale(1 -1)" mask="url(#${id}rm)" opacity=".4"/>`;
  for (let i = 0; i < 16; i++) g += `<rect x="${f(r() * w)}" y="${f(horizon + 10 + r() * (h - horizon - 14))}" width="${f(40 + r() * 140)}" height="1.4" fill="${GOLD_L}" opacity="${f(0.08 + r() * 0.3)}"/>`;
  g += tree(w * 0.05, horizon + 4, h * 0.22) + tree(w * 0.95, horizon + 4, h * 0.2);
  return wrap(id, w, h, g, horizon, 0.5);
}

// ---------- write files ----------
const W = { w: 800, h: 600 };
const P = { w: 640, h: 800 };
const files = {
  "hero.svg": villa({ w: 1920, h: 1080, seed: 7, id: "h", hz: 0.66, gyr: 0.8, k: 0.8, edge: 0.35 }),
  "prop-villa.svg": villa({ ...W, seed: 21, id: "a" }),
  "prop-apartment.svg": tower({ ...W, seed: 5, id: "b" }),
  "prop-plot-kanal.svg": plot({ ...W, seed: 9, id: "c", label: true }),
  "prop-plot-marla.svg": plot({ ...W, seed: 14, id: "d" }),
  "prop-plaza.svg": plaza({ ...W, seed: 3, id: "e", floors: 4 }),
  "prop-showroom.svg": showroom({ ...W, seed: 11, id: "f" }),
  "proj-heights.svg": tower({ ...P, seed: 33, id: "g" }),
  "proj-residency.svg": construction({ ...P, seed: 4, id: "h2" }),
  "proj-villas.svg": villa({ ...P, seed: 52, id: "i" }),
  "proj-plaza.svg": plaza({ ...P, seed: 61, id: "j", floors: 5 }),
  "proj-towers.svg": construction({ ...P, seed: 70, id: "k", cols: 4, floors: 6 }),
  "proj-gardens.svg": villa({ ...P, seed: 83, id: "l" }),
};
for (const [name, svg] of Object.entries(files)) writeFileSync(resolve(out, name), svg);

// ---------- favicon + social card from the real logo ----------
const logo = resolve(root, "scripts/logo-source.png"); // full-size transparent gold logo extracted from the supplied artwork
await sharp(logo).resize(420, 420).png({ palette: true, quality: 90, effort: 10 }).toFile(resolve(root, "public/logo.png"));
await sharp(logo).resize(64, 64).png().toFile(resolve(root, "public/favicon.png"));
await sharp(logo)
  .resize(150, 150)
  .extend({ top: 15, bottom: 15, left: 15, right: 15, background: "#0E0E10" })
  .png()
  .toFile(resolve(root, "public/apple-touch-icon.png"));

const ogLogo = await sharp(logo).resize(420, 420).png().toBuffer();
const ogBg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="g" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#2a2114"/><stop offset="1" stop-color="#0E0E10"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect x="24" y="24" width="1152" height="582" fill="none" stroke="#C9A04A" stroke-opacity=".35"/></svg>`,
);
await sharp(ogBg)
  .composite([{ input: ogLogo, top: 105, left: 390 }])
  .jpeg({ quality: 88 })
  .toFile(resolve(root, "public/og-image.jpg"));

console.log(`Wrote ${Object.keys(files).length} illustrations + favicon, apple-touch-icon, og-image.`);
