import { BrickWall, House, Hammer, PencilRuler, type LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  text: string;
  points: string[];
  detail: string;
  idealFor: string;
}

export const services: Service[] = [
  {
    id: "grey-structure",
    icon: BrickWall,
    title: "Grey Structure",
    text: "Foundation, columns, slabs and brickwork built to engineered drawings, with tested materials and site supervision at every pour.",
    points: ["Excavation & foundation", "RCC columns, beams & slabs", "Brickwork & plaster"],
    detail:
      "The structural shell of your home, delivered to drawings and inspected at each stage — from excavation and footings through columns, beams, slabs and brickwork. You can then finish the interior yourself or hand it back to us.",
    idealFor: "Plot owners who want a solid, well-supervised structure and plan to manage finishing themselves.",
  },
  {
    id: "turnkey",
    icon: House,
    title: "Turnkey Construction",
    text: "Complete, end-to-end construction. We take your plot to a finished home — you receive the keys, not a to-do list.",
    points: ["Structure + full finishing", "Electrical, plumbing & fixtures", "Fixed-scope agreement"],
    detail:
      "One team, one agreement, one point of contact. Design, approvals, structure and every finishing trade — flooring, joinery, electrical, plumbing, paint and fixtures — delivered as a complete, move-in-ready home.",
    idealFor: "Families and overseas owners who want a finished home without coordinating multiple contractors.",
  },
  {
    id: "renovation",
    icon: Hammer,
    title: "Renovation & Remodeling",
    text: "Give an existing house, shop or office a fresh layout and a premium finish without rebuilding from scratch.",
    points: ["Layout changes & extensions", "Kitchens, baths & facades", "Flooring, ceilings & lighting"],
    detail:
      "Refresh a tired interior, open up a layout, add a floor or modernise the facade. We assess the existing structure first, then plan the work to limit disruption and avoid surprises.",
    idealFor: "Owners of older houses, shops and offices who want a modern look and better use of space.",
  },
  {
    id: "design",
    icon: PencilRuler,
    title: "Architectural Design & Map Approval",
    text: "Considered plans, 3D visuals and complete documentation, with approval handled through the relevant authority.",
    points: ["Architectural & structural design", "3D elevations", "Map approval support"],
    detail:
      "Floor plans that suit how you live, 3D elevations so you can see the result before building, and the structural and approval documentation required to build legally.",
    idealFor: "Anyone about to build who wants a well-considered design and a smooth approval process.",
  },
];
