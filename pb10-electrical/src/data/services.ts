import { Cable, CircuitBoard, DoorOpen, Flame, Hammer, Home, Lightbulb, PartyPopper, PlugZap, Sparkles, Wrench, type LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  blurb: string;
  icon: LucideIcon;
  /** Photo used as the card header (wedding cards only) and where to focus the crop. */
  image?: string;
  imagePosition?: string;
}

export const electrical: Service[] = [
  { title: "Residential Wiring", blurb: "New homes, additions and rewires — neat runs, clean panels and outlets exactly where you need them.", icon: Cable },
  { title: "Panel Upgrades", blurb: "More capacity for today's loads: replace an overloaded or ageing panel with a safe, modern one.", icon: CircuitBoard },
  { title: "Lighting Installation", blurb: "Pot lights, fixtures and outdoor lighting — planned for even light, the right warmth and a tidy finish.", icon: Lightbulb },
  { title: "EV Charger Installation", blurb: "A dedicated home charging point installed properly, so you wake up to a full battery.", icon: PlugZap },
  { title: "Renovations & Basement Wiring", blurb: "Wiring for basement developments and renovations, from rough-in through to the finished switches.", icon: Hammer },
  { title: "Troubleshooting & Repairs", blurb: "Tripping breakers, dead outlets, flickering lights — we find the cause and fix it properly.", icon: Wrench },
];

export const wedding: Service[] = [
  { title: "Full House Lighting", blurb: "Rooflines, windows, trees and walkways lit end to end so the whole house glows on the big day.", icon: Home, image: "/photos/wedding-estate-dusk-sm.webp", imagePosition: "50% 55%" },
  { title: "Entrance & Door Decor", blurb: "A glowing welcome at the door: arches, garlands and lit pillars for the baraat and the first photos.", icon: DoorOpen, image: "/photos/wedding-entrance-decor-sm.webp", imagePosition: "42% 72%" },
  { title: "Fairy-Light Canopies & Drapes", blurb: "Curtains of twinkling lights and soft drapes that turn any hall, tent or backyard into a starlit room.", icon: Sparkles, image: "/photos/wedding-house-bluehour-sm.webp", imagePosition: "70% 42%" },
  { title: "Mehndi / Sangeet / Reception Setups", blurb: "Stage backdrops, marigold-and-light curtains and warm ambient lighting for every function.", icon: PartyPopper, image: "/photos/wedding-backyard-reception-sm.webp", imagePosition: "50% 78%" },
  { title: "Diwali & Festival Lighting", blurb: "Festival-ready lighting for home and yard — from diya-style glows to full-house displays.", icon: Flame, image: "/photos/wedding-house-night-sm.webp", imagePosition: "62% 62%" },
];
