// Generates every image used by the concept (generic, unbadged vehicle illustrations).
// No third-party photography is used. Run: npm run images
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/images");
await mkdir(out, { recursive: true });

/* ---------- paints ---------- */
const PAINTS = {
  white: { hi: "#FFFFFF", base: "#E9EAEC", low: "#B9BCC2", edge: "#8A8E96" },
  silver: { hi: "#E3E5E8", base: "#B4B8BF", low: "#7E838C", edge: "#5A5E66" },
  graphite: { hi: "#5B5F66", base: "#2C2E32", low: "#141517", edge: "#0B0B0C" },
  slate: { hi: "#7C8BA3", base: "#3F4C63", low: "#242C3B", edge: "#161B25" },
  midnight: { hi: "#4A5F8C", base: "#1F2C4A", low: "#0F172B", edge: "#0A0F1D" },
  teal: { hi: "#8FA9AB", base: "#4D6669", low: "#2A3A3C", edge: "#192324" },
  sage: { hi: "#A5ACA3", base: "#6B7469", low: "#3E453D", edge: "#252A24" },
  burgundy: { hi: "#A24A55", base: "#5E1620", low: "#340A11", edge: "#1E0509" },
};

/* ---------- bodies (local space: 1000 x 420, ground at y = 396, facing right) ---------- */
const GROUND = 396;
const BODIES = {
  sedan: {
    sx: 1, sy: 1.1,
    wheels: [[232, 330], [762, 330], 66],
    body: "M38 330C28 300 30 270 46 252C60 246 90 244 120 242L270 232C330 226 360 200 420 168C450 150 480 140 520 138L600 138C650 140 690 160 730 196C760 220 790 226 840 236C900 246 950 258 968 276C976 290 976 312 970 330L958 340L60 340Z",
    glass: "M306 220C352 214 378 192 426 172C455 158 485 150 520 150L598 150C640 152 672 168 704 196L712 220Z",
    pillars: ["M498 148L514 148L518 222L498 222Z"],
    seams: ["M334 226L330 336", "M508 222L508 338", "M696 222L700 338"],
    belt: "M60 262C300 250 600 246 962 272",
    head: "M902 252L964 268L960 280L896 266Z",
    tail: "M40 258L42 276L60 276L64 256Z",
    grille: "M944 298L972 298L973 318L946 318Z",
    mirror: "M706 202L732 204L730 214L710 214Z",
    handles: ["M440 238h22", "M610 236h22"],
  },
  suv: {
    sx: 0.82, sy: 1.12,
    wheels: [[228, 322], [768, 322], 74],
    body: "M40 340C30 300 30 230 44 190C52 160 70 128 110 116L150 110L610 106C660 108 700 130 740 176C770 205 800 214 850 224C915 234 960 250 972 280C978 300 976 322 970 340L958 348L60 348Z",
    glass: "M120 200L128 134C132 128 140 126 150 126L600 122C640 124 668 140 698 178L706 202Z",
    pillars: ["M300 124L318 124L318 204L300 204Z", "M492 122L510 122L510 204L492 204Z", "M96 124L124 124L120 204L96 204Z"],
    seams: ["M318 206L316 338", "M510 206L510 340", "M700 206L704 340"],
    belt: "M60 214C300 208 600 204 962 232",
    head: "M906 238L968 256L964 270L900 254Z",
    tail: "M42 214L44 254L64 254L62 212Z",
    grille: "M944 296L972 296L973 320L946 320Z",
    mirror: "M706 192L734 196L732 208L712 208Z",
    handles: ["M440 232h24", "M610 230h24"],
    cladding: "M40 322L958 330L958 348L60 348Z",
  },
  truck: {
    sx: 0.94, sy: 1.14,
    wheels: [[218, 326], [778, 326], 72],
    body: "M38 340L38 238L60 232L408 232L420 140C436 112 480 100 520 98L640 98C690 102 730 140 760 190C790 214 810 220 850 226L940 232C968 238 976 252 976 270L976 338L960 348L58 348Z",
    glass: "M440 142C452 122 484 114 520 112L634 112C676 116 706 148 728 186L732 214L440 214Z",
    pillars: ["M580 112L596 112L596 214L580 214Z"],
    seams: ["M436 216L440 340", "M600 216L600 340", "M760 214L762 340"],
    belt: "M60 244L408 244",
    head: "M926 244L972 248L970 262L922 260Z",
    tail: "M40 246L40 270L56 270L56 246Z",
    grille: "M950 290L976 290L976 322L952 322Z",
    mirror: "M726 196L752 202L748 214L730 212Z",
    handles: ["M500 236h22", "M650 234h22"],
    bed: "M62 232L408 232L408 250L62 250Z",
  },
  hatch: {
    sx: 0.8, sy: 1.14,
    wheels: [[262, 330], [736, 330], 62],
    body: "M100 336C90 300 94 262 110 232C136 184 196 148 296 132C356 124 440 124 500 126L580 128C640 132 690 158 726 196C760 218 800 226 850 238C900 248 930 262 940 280C948 296 946 320 940 336L930 344L118 344Z",
    glass: "M150 228C190 188 240 160 304 146C360 138 430 138 490 140L570 142C616 146 654 166 684 196L692 224L150 224Z",
    pillars: ["M480 140L500 140L504 226L478 226Z"],
    seams: ["M300 226L296 338", "M500 228L500 340", "M690 226L692 340"],
    belt: "M110 262C300 250 600 248 936 274",
    head: "M886 252L936 266L932 278L880 264Z",
    tail: "M104 256L106 276L122 274L126 252Z",
    grille: "M914 298L942 298L942 318L916 318Z",
    mirror: "M686 204L710 208L708 218L690 218Z",
    handles: ["M392 238h20", "M590 236h20"],
  },
  ev: {
    sx: 0.94, sy: 1.12,
    wheels: [[236, 330], [770, 330], 68],
    body: "M54 336C40 306 44 268 60 252C90 244 140 240 200 234C300 214 380 170 470 140C520 124 580 118 630 122C690 130 730 160 770 198C810 218 860 226 910 240C950 252 972 276 974 304L972 334L962 342L70 342Z",
    glass: "M262 226C330 206 392 172 474 148C520 134 576 130 622 134C672 142 704 168 736 198L742 224Z",
    pillars: ["M500 138L518 138L522 224L500 224Z"],
    seams: ["M360 224L356 338", "M510 226L510 340", "M706 214L712 340"],
    belt: "M60 262C300 244 620 242 960 262",
    head: "M912 258L972 274L972 280L910 266Z",
    tail: "M56 256L58 274L84 274L88 254Z",
    grille: "M954 304L974 304L974 322L956 322Z",
    mirror: "M736 202L760 206L756 216L740 216Z",
    handles: ["M440 234h22", "M610 232h22"],
    lightbar: "M60 258L92 256",
  },
  coupe: {
    sx: 0.94, sy: 1.18,
    wheels: [[236, 336], [766, 336], 68],
    body: "M40 340C30 320 30 292 46 278C70 270 110 264 160 258C250 246 330 214 410 190C450 178 500 172 540 172L590 174C640 178 690 198 730 218C780 232 850 240 910 252C950 262 972 280 976 304L972 338L960 346L60 346Z",
    glass: "M330 232C380 210 430 192 480 184C520 180 560 182 596 186C640 192 674 210 704 226L708 234L322 236Z",
    pillars: ["M498 182L516 182L518 236L496 236Z"],
    seams: ["M420 236L416 338", "M590 234L594 338"],
    belt: "M50 282C300 262 620 250 966 276",
    head: "M908 262L970 276L966 288L902 274Z",
    tail: "M36 284L38 296L60 296L64 280Z",
    grille: "M952 306L976 306L976 326L954 326Z",
    mirror: "M706 220L730 224L726 232L710 232Z",
    handles: ["M520 242h22"],

  },
};

function wheel(cx, cy, r, id) {
  const spokes = [0, 1, 2, 3, 4, 5, 6]
    .map((i) => {
      const a = (i * 2 * Math.PI) / 7 - Math.PI / 2;
      const x = (cx + Math.cos(a) * (r - 24)).toFixed(1);
      const y = (cy + Math.sin(a) * (r - 24)).toFixed(1);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="url(#rim)" stroke-width="6" stroke-linecap="round"/>`;
    })
    .join("");
  return `<g id="${id}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0B0B0C"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 7}" fill="#17181A"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 18}" fill="#0B0B0C"/>
    ${spokes}
    <circle cx="${cx}" cy="${cy}" r="${r - 20}" fill="none" stroke="url(#rim)" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy}" r="9" fill="url(#rim)"/>
  </g>`;
}

let uid = 0;
/** returns {defs, g} for one car. Body is stretched (sx, sy) about the ground point; wheels stay circular. */
function car(type, paintName) {
  const b = BODIES[type];
  const p = PAINTS[paintName];
  const n = ++uid;
  const [w1, w2, r] = b.wheels;
  const { sx, sy } = b;
  const map = ([x, y]) => [500 + (x - 500) * sx, GROUND + (y - GROUND) * sy];
  const defs = `
    <linearGradient id="paint${n}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p.hi}"/><stop offset="0.38" stop-color="${p.base}"/>
      <stop offset="0.78" stop-color="${p.low}"/><stop offset="1" stop-color="${p.edge}"/>
    </linearGradient>
    <linearGradient id="sheen${n}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.28" stop-color="#fff" stop-opacity="0.16"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity="0"/><stop offset="0.78" stop-color="#fff" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="glass${n}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7C8794"/><stop offset="0.45" stop-color="#1B1E23"/><stop offset="1" stop-color="#0B0B0C"/>
    </linearGradient>
    <clipPath id="clip${n}"><path d="${b.body}"/></clipPath>`;
  const T = `translate(${500 - 500 * sx} ${GROUND - GROUND * sy}) scale(${sx} ${sy})`;
  const wellR = r + 13;
  const well = ([cx, cy]) => `<ellipse cx="${cx}" cy="${cy}" rx="${wellR / sx}" ry="${wellR / sy}" fill="#0B0B0C"/><ellipse cx="${cx}" cy="${cy}" rx="${(wellR + 3) / sx}" ry="${(wellR + 3) / sy}" fill="none" stroke="${p.edge}" stroke-width="${3 / sx}"/>`;
  const [m1, m2] = [map(w1), map(w2)];
  const g = `<g>
    <g transform="${T}">
    ${b.spoiler ? `<path d="M96 278L112 250" stroke="#0B0B0C" stroke-width="5"/><path d="${b.spoiler}" fill="${p.edge}"/>` : ""}
    <path d="${b.body}" fill="url(#paint${n})"/>
    <path d="${b.body}" fill="url(#sheen${n})"/>
    ${b.bed ? `<path d="${b.bed}" fill="${p.edge}" opacity=".6"/><path d="M62 232L408 232" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>` : ""}
    <g clip-path="url(#clip${n})">
      ${well(w1)}${well(w2)}
      ${b.cladding ? `<path d="${b.cladding}" fill="#17181A"/>` : ""}
      <rect x="0" y="${GROUND - 62}" width="1000" height="12" fill="#0B0B0C" opacity=".5"/>
    </g>
    <path d="${b.glass}" fill="url(#glass${n})"/>
    ${b.pillars.map((d) => `<path d="${d}" fill="${p.base}"/><path d="${d}" fill="url(#paint${n})" opacity=".6"/>`).join("")}
    <path d="${b.glass}" fill="none" stroke="${p.edge}" stroke-width="3"/>
    ${b.seams.map((d) => `<path d="${d}" stroke="${p.edge}" stroke-opacity=".55" stroke-width="2" fill="none"/>`).join("")}
    <path d="${b.belt}" stroke="#fff" stroke-opacity=".38" stroke-width="2" fill="none"/>
    <path d="${b.mirror}" fill="${p.low}"/>
    ${b.handles.map((d) => `<path d="${d}" stroke="${p.edge}" stroke-width="4" stroke-linecap="round"/>`).join("")}
    <path d="${b.grille}" fill="#0B0B0C"/>
    <path d="${b.head}" fill="#F6F6F4"/>
    <path d="${b.head}" fill="none" stroke="#6B7077" stroke-width="1.5"/>
    <path d="${b.tail}" fill="#7A0C16"/>
    ${b.lightbar ? `<path d="${b.lightbar}" stroke="#F6F6F4" stroke-width="3" stroke-linecap="round"/>` : ""}
    </g>
    ${wheel(m1[0], m1[1], r, "w" + n + "a")}${wheel(m2[0], m2[1], r, "w" + n + "b")}
  </g>`;
  return { defs, g };
}

const RIM_DEFS = `<linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E7E8EA"/><stop offset="1" stop-color="#6B7077"/></linearGradient>`;

/* contact shadow: crisp, hard-edged (no blur) */
const shadow = (cx, y, rx) =>
  `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="10" fill="#0B0B0C" opacity=".28"/><ellipse cx="${cx}" cy="${y}" rx="${rx * 0.8}" ry="5" fill="#0B0B0C" opacity=".35"/>`;

/* ---------- scenes ---------- */
function cardScene(type, paint, W = 800, H = 600) {
  const c = car(type, paint);
  const scale = (W * 0.9) / 1000;
  const gy = H * 0.78;
  const tx = (W - 1000 * scale) / 2;
  const ty = gy - GROUND * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${RIM_DEFS}${c.defs}
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6F6F4"/><stop offset="1" stop-color="#E7E8EA"/></linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCDDE0"/><stop offset="1" stop-color="#C9CBCF"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect y="${gy - 22}" width="${W}" height="${H - gy + 22}" fill="url(#floor)"/>
  <rect y="${gy - 22}" width="${W}" height="1.5" fill="#fff" opacity=".7"/>
  ${shadow(W / 2, gy + 2, 1000 * scale * 0.46)}
  <g transform="translate(${tx} ${ty}) scale(${scale})">${c.g}</g>
</svg>`;
}

function heroScene(W = 1800, H = 760) {
  const c = car("ev", "silver");
  const scale = (W * 0.92) / 1000;
  const gy = H * 0.9;
  const tx = (W - 1000 * scale) / 2;
  const ty = gy - GROUND * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${RIM_DEFS}${c.defs}
    <linearGradient id="rimlight" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  ${shadow(W / 2, gy + 4, 1000 * scale * 0.47)}
  <g transform="translate(${tx} ${ty}) scale(${scale})">${c.g}
    <path d="M480 140L640 126" stroke="url(#rimlight)" stroke-width="3" fill="none"/></g>
</svg>`;
}

function thumbScene(type, paint) {
  return cardScene(type, paint, 240, 150);
}

/* mountain road for the efficiency section */
function roadScene(outW = 1200) {
  const W = 1200, H = 1400;
  const c = car("suv", "white");
  const ridge = (y, amp, seed, fill) => {
    let d = `M0 ${H}L0 ${y}`;
    for (let x = 0; x <= W; x += 20) {
      const yy = y - Math.abs(Math.sin((x + seed) * 0.0071) * amp) - Math.abs(Math.sin((x + seed * 2) * 0.017) * amp * 0.4);
      d += `L${x} ${yy.toFixed(1)}`;
    }
    return `<path d="${d}L${W} ${H}Z" fill="${fill}"/>`;
  };
  const cs = 0.42;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${outW}" height="${outW * H / W}" viewBox="0 0 ${W} ${H}">
  <defs>${RIM_DEFS}${c.defs}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0B0C"/><stop offset=".55" stop-color="#2A2F38"/><stop offset="1" stop-color="#6B7580"/></linearGradient>
    <linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C2E32"/><stop offset="1" stop-color="#0B0B0C"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  ${[...Array(60)].map((_, i) => `<circle cx="${(i * 197) % W}" cy="${(i * 83) % 420}" r="${i % 7 === 0 ? 2 : 1.2}" fill="#F6F6F4" opacity="${0.35 + (i % 5) * 0.1}"/>`).join("")}
  ${ridge(760, 230, 40, "#59626E")}
  ${ridge(860, 200, 310, "#3F4650")}
  ${ridge(980, 150, 120, "#262B32")}
  ${ridge(1080, 90, 600, "#17181A")}
  <path d="M0 ${H}L0 1120L${W} 1060L${W} ${H}Z" fill="#0F1012"/>
  <path d="M470 1400L560 1075L650 1062L1060 1400Z" fill="url(#road)"/>
  <path d="M810 1400L612 1070L626 1068L874 1400Z" fill="#6B7077" opacity=".35"/>
  <path d="M560 1075L650 1062" stroke="#E7E8EA" stroke-width="2" opacity=".5"/>
  ${shadow(740, 1252, 1000 * cs * 0.46)}
  <g transform="translate(${740 - 500 * cs} ${1250 - GROUND * cs}) scale(${cs})">${c.g}</g>
</svg>`;
}

function ogScene(W = 1200, H = 630) {
  const c = car("suv", "silver");
  const scale = 0.82;
  const gy = H * 0.84;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${RIM_DEFS}${c.defs}
    <radialGradient id="g" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="#2C2E32"/><stop offset="1" stop-color="#17181A"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="64" y="64" width="40" height="4" fill="#EB0A1E"/>
  ${shadow(W / 2, gy + 4, 1000 * scale * 0.47)}
  <g transform="translate(${(W - 1000 * scale) / 2} ${gy - GROUND * scale}) scale(${scale})">${c.g}</g>
</svg>`;
}

/* ---------- write ---------- */
const webp = (svg, file, q = 80, extra = {}) => sharp(Buffer.from(svg)).webp({ quality: q, ...extra }).toFile(path.join(out, file));

const CARS = [
  ["arden-sedan", "sedan", "white"],
  ["arden-hybrid", "sedan", "silver"],
  ["corso-suv", "suv", "midnight"],
  ["corso-hybrid", "suv", "sage"],
  ["ridgeway-truck", "truck", "slate"],
  ["ridgeway-hybrid", "truck", "silver"],
  ["lumen-hatch", "hatch", "white"],
  ["lumen-ev", "ev", "teal"],
  ["lumen-ev-sedan", "ev", "midnight"],
  ["vector-gt", "coupe", "burgundy"],
  ["vector-s", "sedan", "graphite"],
];

for (const [name, type, paint] of CARS) {
  await webp(cardScene(type, paint, 800, 600), `${name}-800.webp`, 80);
  await webp(cardScene(type, paint, 400, 300), `${name}-400.webp`, 80);
  await webp(thumbScene(type, paint), `${name}-thumb.webp`, 80);
}
await webp(heroScene(1800, 760), "hero-car-1800.webp", 82, { alphaQuality: 90 });
await webp(heroScene(900, 380), "hero-car-900.webp", 82, { alphaQuality: 90 });
await webp(roadScene(1200), "efficiency-1200.webp", 78);
await webp(roadScene(600), "efficiency-600.webp", 78);
await sharp(Buffer.from(ogScene())).jpeg({ quality: 82 }).toFile(path.join(out, "og.jpg"));
await writeFile(path.join(out, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0B0B0C"/><rect x="8" y="10" width="16" height="3" fill="#F6F6F4"/><rect x="14.5" y="10" width="3" height="14" fill="#F6F6F4"/><rect x="8" y="26" width="6" height="2" fill="#EB0A1E"/></svg>`);
console.log("images written to", out);
