/** SAMPLE PROJECTS — replace names, locations and images with real work. */
export interface Project {
  id: string;
  name: string;
  location: string;
  status: "Ongoing" | "Completed";
  image: string;
  detail: string;
}

export const projects: Project[] = [
  { id: "ch-heights", name: "CH Heights", location: "Main Boulevard, Wah Cantt", status: "Completed", image: "/images/proj-heights.svg", detail: "12-storey residential tower" },
  { id: "rehan-residency", name: "Residency Block A", location: "New City Phase 2", status: "Ongoing", image: "/images/proj-residency.svg", detail: "Grey structure · 4 floors" },
  { id: "garden-villas", name: "The Garden Villas", location: "Wah Model Town", status: "Completed", image: "/images/proj-villas.svg", detail: "8 turnkey villas" },
  { id: "ch-plaza", name: "CH Business Plaza", location: "Main Boulevard", status: "Completed", image: "/images/proj-plaza.svg", detail: "Five-storey commercial plaza" },
  { id: "skyline-towers", name: "Skyline Towers", location: "New City Phase 2", status: "Ongoing", image: "/images/proj-towers.svg", detail: "Six-floor mixed-use build" },
  { id: "orchard-homes", name: "Orchard Homes", location: "Officers Colony, Wah Cantt", status: "Completed", image: "/images/proj-gardens.svg", detail: "Family homes, 10 Marla & 1 Kanal" },
];
