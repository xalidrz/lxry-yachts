import { Baby, Brush, Droplets, Flame, Scissors, Sparkles, type LucideIcon } from "lucide-react";

export type ServiceId = "haircut" | "beard" | "kids" | "wash" | "shave" | "facial";

// Prices: type the number you charge as a string, e.g. "2.500". Leave "" to show the "BHD —" placeholder.
export const services: { id: ServiceId; icon: LucideIcon; price: string }[] = [
  { id: "haircut", icon: Scissors, price: "" },
  { id: "beard", icon: Brush, price: "" },
  { id: "kids", icon: Baby, price: "" },
  { id: "wash", icon: Droplets, price: "" },
  { id: "shave", icon: Flame, price: "" },
  { id: "facial", icon: Sparkles, price: "" },
];
