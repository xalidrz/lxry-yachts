import { Activity, CarFront, Cog, Disc3, Droplets, Gauge, Hammer, MoveVertical, Wrench, Zap, type LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  icon: LucideIcon;
  /**
   * true = hidden until the owner confirms the service.
   * Flip to false (or delete the flag) to show it. No prices anywhere.
   */
  hidden?: boolean;
};

export const services: Service[] = [
  // Confirmed by Google reviews or the Google listing
  { title: "Uber / Rideshare Vehicle Inspections", icon: CarFront },
  { title: "Oil Change", icon: Droplets },
  { title: "Engine Diagnostics & Misfire Repair", icon: Activity },
  { title: "Auto Electrical & Wiring", icon: Zap },
  { title: "Clutch Replacement", icon: Cog },
  { title: "Mirror & Body Part Repair", icon: Hammer },
  // Confirm with owner before showing
  { title: "Brakes", icon: Disc3, hidden: true },
  { title: "Suspension", icon: MoveVertical, hidden: true },
  { title: "Check Engine Light", icon: Gauge, hidden: true },
  { title: "General Maintenance", icon: Wrench, hidden: true },
];

export const visibleServices = services.filter((s) => !s.hidden);
