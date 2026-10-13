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
  { title: "Uber / Rideshare Vehicle Inspections", summary: "Rideshare inspections done fast, with an oil change in the same visit if you need one.", photo: "porsche-911-on-lift-hood-open", icon: CarFront },
  { title: "Oil Change", summary: "A customer on Google called the pricing \u201cvery reasonable\u201d after an oil change here.", photo: "silverado-on-two-post-lift", icon: Droplets },
  { title: "Engine Diagnostics & Misfire Repair", summary: "Diagnosis and repair under one roof, so a misfire never gets a verdict from one shop and a fix from another.", photo: "engine-valvetrain-timing-chain-exposed", icon: Activity },
  { title: "Auto Electrical & Wiring", summary: "Wire-by-wire repair, like the harness job pictured, from an owner-run shop.", photo: "engine-bay-wiring-repair", icon: Zap },
  { title: "Clutch Replacement", summary: "Clutch replacement from a shop customers say fixes cars the most cost-effective way it can.", photo: "rear-axle-brake-rotor-and-shock-on-lift", icon: Cog },
  { title: "Mirror & Body Part Repair", summary: "Walk-in mirror repair: working parts from your old assembly are reused to keep the bill down.", photo: "jeep-gladiator-front-end-off", icon: Hammer },
  // Confirm with owner before showing
  { title: "Brakes", summary: "", photo: "drilled-brake-rotor", icon: Disc3, hidden: true },
  { title: "Suspension", summary: "", photo: "front-suspension-brake-under-car", icon: MoveVertical, hidden: true },
  { title: "Check Engine Light", summary: "", photo: "engine-valvetrain-timing-chain-exposed", icon: Gauge, hidden: true },
  { title: "General Maintenance", summary: "", photo: "porsche-911-on-lift-hood-open", icon: Wrench, hidden: true },
];

export const visibleServices = services.filter((s) => !s.hidden);
