/**
 * UI click sounds, synthesised with the Web Audio API (no audio files, no library).
 * One delegated listener plays a short HUD-style blip for every button-like element. The choice to mute is stored
 * in localStorage (try/catch) and toggled from the footer.
 */
type Kind = "confirm" | "tick" | "soft";

const STORAGE_KEY = "kallies-sound";
let ctx: AudioContext | null = null;
let enabled = true;
let started = false;
const listeners = new Set<() => void>();

try {
  enabled = window.localStorage.getItem(STORAGE_KEY) !== "off";
} catch {
  /* storage blocked: sound stays on for this visit */
}

export const isSoundOn = () => enabled;
export const subscribeSound = (fn: () => void) => {
  listeners.add(fn);
  return () => void listeners.delete(fn);
};

export function setSoundOn(on: boolean) {
  enabled = on;
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn());
  if (on) play("confirm");
}

function audio() {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** One sweep with a fast attack and exponential decay. */
function blip(c: AudioContext, start: number, from: number, to: number, dur: number, type: OscillatorType, peak: number) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + dur);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

export function play(kind: Kind) {
  if (!enabled) return;
  const c = audio();
  if (!c) return;
  const t = c.currentTime;
  if (kind === "confirm") {
    // two-note rising "engage"
    blip(c, t, 660, 880, 0.07, "triangle", 0.07);
    blip(c, t + 0.07, 990, 1480, 0.11, "triangle", 0.06);
    blip(c, t, 120, 70, 0.12, "sine", 0.06);
  } else if (kind === "tick") {
    blip(c, t, 1500, 900, 0.05, "square", 0.025);
    blip(c, t, 200, 110, 0.07, "sine", 0.06);
  } else {
    blip(c, t, 700, 520, 0.035, "sine", 0.05);
  }
}

const BUTTONISH = 'button, [role="button"], [role="checkbox"], [role="combobox"], [role="option"], a.hbtn, a.gbtn, a.hud-btn, a.hud-cta, a.hud-phone';

const kindFor = (el: Element): Kind => {
  if (el.closest(".hbtn-brand, .gbtn, .hud-cta")) return "confirm";
  if (el.closest(".hud-chip, [role=checkbox], [role=combobox], [role=option], [data-radix-collection-item], .hud-burger")) return "soft";
  return "tick";
};

/** Call once at start-up. */
export function initClickSounds() {
  if (started || typeof document === "undefined") return;
  started = true;
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      const el = target?.closest?.(BUTTONISH);
      if (!el || (el as HTMLButtonElement).disabled || el.getAttribute("aria-disabled") === "true" || el.closest("[data-no-sound]")) return;
      play(kindFor(el));
    },
    true,
  );
}
