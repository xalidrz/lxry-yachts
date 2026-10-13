import { Activity, CarFront, Cog, Disc3, Droplets, Gauge, Hammer, MoveVertical, Wrench, Zap, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  /** One honest line. Stays within what reviews and the Google listing confirm. */
  summary: string;
  /** Photo in /public/photos used on the service card. */
  photo: string;
  icon: LucideIcon;
  /**
   * true = hidden until the owner confirms the service.
   * Flip to false (or delete the flag) to show it. No prices anywhere.
   */
  hidden?: boolean;
};

export const services: Service[] = [
  // Confirmed by Google reviews or the Google listing
  { title: "Uber / Rideshare Vehicle Inspections", summary: "Rideshare vehicle inspections, done at the shop.", photo: "front-suspension-brake-under-car", icon: CarFront },
  { title: "Oil Change", summary: "A straightforward oil change, often done alongside an inspection.", photo: "porsche-911-on-lift-hood-open", icon: Droplets },
  { title: "Engine Diagnostics & Misfire Repair", summary: "Find the cause of the misfire or engine problem, then fix it.", photo: "engine-valvetrain-timing-chain-exposed", icon: Activity },
  { title: "Auto Electrical & Wiring", summary: "Wiring and electrical faults traced and repaired.", photo: "engine-bay-wiring-repair", icon: Zap },
  { title: "Clutch Replacement", summary: "Clutch replacement, done in the shop’s own bays.", photo: "dual-exhaust-under-car-on-lift", icon: Cog },
  { title: "Mirror & Body Part Repair", summary: "Broken mirrors and body parts fixed, with working parts saved where possible.", photo: "jeep-gladiator-front-end-off", icon: Hammer },
  // Confirm with owner before showing
  { title: "Brakes", summary: "", photo: "drilled-brake-rotor", icon: Disc3, hidden: true },
  { title: "Suspension", summary: "", photo: "front-suspension-brake-under-car", icon: MoveVertical, hidden: true },
  { title: "Check Engine Light", summary: "", photo: "engine-valvetrain-timing-chain-exposed", icon: Gauge, hidden: true },
  { title: "General Maintenance", summary: "", photo: "porsche-911-on-lift-hood-open", icon: Wrench, hidden: true },
];

export const visibleServices = services.filter((s) => !s.hidden);
