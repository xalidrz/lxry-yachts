/**
 * ALL products live in this file.
 *
 * To add a product, add ONE entry to the `products` array below. The product page,
 * category listing, search, related products, sitemap.xml and SEO tags all update
 * automatically on the next build. Nothing else needs to change.
 *
 *  slug              URL slug, lowercase with hyphens. Must be unique and must not be
 *                    "hvac", "fixing-systems", "electrical" or "bearings".
 *  name              Product name shown as the page heading.
 *  brand             Brand name, or ANY_BRAND when the product is supplied in several brands.
 *  category          "hvac" | "fixing-systems" | "electrical" | "bearings"
 *  shortDescription  One sentence for cards, search results and the meta description.
 *  description       Full description shown on the product page.
 *  specs             Rows of { label, value } for the specifications table (can be []).
 *  image             Real photo path, e.g. "/products/pancake-copper-coils.jpg" (file in /public/products).
 *                    Leave "" to show the branded placeholder.
 */
import type { CategorySlug } from "./categories";
import { ANY_BRAND } from "@/lib/whatsapp";

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  specs: Spec[];
  image: string;
};

const ASK_SIZES: Spec = {
  label: "Sizes and availability",
  value: "Ask us on WhatsApp for current sizes and stock",
};

export const products: Product[] = [
  // ───────────────────────────── HVAC ─────────────────────────────
  {
    slug: "pancake-copper-coils",
    name: "Pancake Copper Coils",
    brand: "Venture",
    category: "hvac",
    shortDescription:
      "Soft-annealed copper coil for the refrigerant lines of HVAC systems.",
    description:
      "Venture pancake copper coils are soft-annealed copper tube wound into flat coils for the refrigerant lines of HVAC systems. They are used for the connection, repair or modification of air-conditioning units. The soft temper lets installers bend the tube with or without bending tools, and joints are made by flare, compression or solder. Coils are available in single, double and multi-layer form. Ask us for the diameters and lengths currently in stock.",
    specs: [
      { label: "Material", value: "Soft-annealed copper" },
      { label: "Application", value: "Refrigerant lines of HVAC systems" },
      { label: "Typical use", value: "Connection, repair or modification of AC units" },
      { label: "Joining methods", value: "Flare, compression or solder" },
      { label: "Coil build", value: "Single, double and multi-layer" },
      { label: "Bending", value: "With or without bending tools" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "straight-copper-pipe-type-k-l-m",
    name: "Straight Copper Pipe Type K, L, M",
    brand: "Venture",
    category: "hvac",
    shortDescription:
      "Venture straight copper pipe in Type K, L and M for HVAC, plumbing and ACR systems.",
    description:
      "Venture straight copper pipe is supplied in three wall thicknesses. Type K is the thick-walled grade, used for water service, fire protection, HVAC, medical gas and steam. Type L is the standard grade for interior plumbing, HVAC and LPG. Type M is used for ACR systems, refrigerators, coolers and building water pipes. Tell us the type, diameter and quantity and we will confirm availability and price.",
    specs: [
      {
        label: "Type K",
        value:
          "Thick-walled. Water service, fire protection, HVAC, medical gas, steam",
      },
      {
        label: "Type L",
        value: "Standard. Interior plumbing, HVAC, LPG",
      },
      {
        label: "Type M",
        value: "ACR systems, refrigerators, coolers, building water pipes",
      },
      { label: "Material", value: "Copper" },
      { label: "Form", value: "Straight lengths" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "thermal-insulation",
    name: "Thermal Insulation",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "Thermal insulation for refrigerant pipework, chilled-water lines and ducting.",
    description:
      "Thermal insulation for refrigerant and chilled-water pipework and for ducting, used to limit heat gain and reduce condensation on cold surfaces. Tell us the pipe size, insulation thickness and application, and we will confirm what we can supply and the price.",
    specs: [
      {
        label: "Application",
        value: "Refrigerant pipes, chilled-water pipes and ducting",
      },
      { label: "Purpose", value: "Limits heat gain and condensation" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "flexible-ducts-and-duct-connectors",
    name: "Flexible Ducts and Duct Connectors",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "Flexible ducting and connectors for air distribution in HVAC installations.",
    description:
      "Flexible ducts and duct connectors for supply and return air distribution in HVAC installations. Used to connect rigid ductwork to diffusers, grilles and air-handling equipment. Send us the diameter and length you need and we will confirm the price and availability.",
    specs: [
      { label: "Application", value: "Air distribution in HVAC systems" },
      { label: "Typical use", value: "Connecting ductwork to diffusers, grilles and equipment" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "canvas-cloth-for-ducting",
    name: "Canvas Cloth for Ducting",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "Canvas cloth for flexible duct connections between ductwork and equipment.",
    description:
      "Canvas cloth used to make flexible joints in ductwork, for example between a duct and a fan or air-handling unit. A flexible canvas joint helps isolate vibration and noise from the equipment. Ask us for width, roll length and price.",
    specs: [
      { label: "Application", value: "Flexible duct connections" },
      { label: "Typical use", value: "Joint between ductwork and fans or air-handling units" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "duct-sealants-and-adhesives",
    name: "Duct Sealants and Adhesives",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "Sealants and adhesives for sealing duct joints and bonding duct insulation.",
    description:
      "Sealants and adhesives for sealing duct seams and joints and for bonding insulation to ductwork. Tell us the surface and the application and we will recommend a product from our range.",
    specs: [
      { label: "Application", value: "Duct joints, seams and insulation bonding" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "capacitors-and-contactors",
    name: "Capacitors and Contactors",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "Capacitors and contactors for air-conditioning compressors and fan motors.",
    description:
      "Capacitors and contactors for the electrical side of air-conditioning and refrigeration equipment, used with compressors and fan motors. Send us the rating or the part on the old unit and we will confirm a match.",
    specs: [
      { label: "Application", value: "Compressor and fan motor circuits" },
      { label: "Typical use", value: "Replacement and maintenance of AC and refrigeration units" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "condenser-motors-and-ac-spare-parts",
    name: "Condenser Motors and AC Spare Parts",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "Condenser fan motors and spare parts for air-conditioning maintenance.",
    description:
      "Condenser fan motors and general air-conditioning spare parts for maintenance and repair work. Send us the unit model, the motor nameplate or a photo of the part and we will check what we can supply.",
    specs: [
      { label: "Application", value: "AC maintenance and repair" },
      { label: "Includes", value: "Condenser motors and general AC spares" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "coil-cleaners-and-maintenance-chemicals",
    name: "Coil Cleaners and Maintenance Chemicals",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "Coil cleaners and chemicals for routine air-conditioning maintenance.",
    description:
      "Coil cleaners and maintenance chemicals for evaporator and condenser coils and routine servicing of air-conditioning units. Useful for maintenance companies working on contract service schedules. Ask us for pack sizes and prices.",
    specs: [
      { label: "Application", value: "Cleaning evaporator and condenser coils" },
      { label: "Typical use", value: "Routine AC maintenance and servicing" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "installation-tools-and-accessories",
    name: "Installation Tools and Accessories",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "Tools and accessories for HVAC and refrigeration installation.",
    description:
      "Installation tools and accessories for HVAC and refrigeration installers. Tell us what you are installing and the tools or accessories you need, and we will check availability and price.",
    specs: [
      { label: "Application", value: "HVAC and refrigeration installation" },
      ASK_SIZES,
    ],
    image: "",
  },

  // Refrigerant gases
  {
    slug: "r22-refrigerant-gas",
    name: "R22 Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R22 (HCFC-22) refrigerant for servicing existing air-conditioning and refrigeration equipment.",
    description:
      "R22 is a single-component HCFC refrigerant used in older air-conditioning and refrigeration systems. It is being phased out under the Montreal Protocol, so it is mainly used to service equipment that was built for R22. Ask us for the price and the cylinder sizes available.",
    specs: [
      { label: "Refrigerant type", value: "HCFC, single component" },
      { label: "Typical use", value: "Servicing existing R22 AC and refrigeration equipment" },
      { label: "Safety class (ASHRAE 34)", value: "A1" },
      { label: "Cylinder sizes", value: "Ask us on WhatsApp" },
    ],
    image: "",
  },
  {
    slug: "r410a-refrigerant-gas",
    name: "R410A Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R410A HFC blend refrigerant for modern split, ducted and VRF air conditioners.",
    description:
      "R410A is an HFC blend of R32 and R125 used in modern split, ducted and VRF air-conditioning systems. It works at higher pressure than R22, so it needs R410A-rated gauges, hoses and cylinders and the correct compressor oil. Ask us for the price and the cylinder sizes available.",
    specs: [
      { label: "Refrigerant type", value: "HFC blend (R32 / R125)" },
      { label: "Typical use", value: "Split, ducted and VRF air conditioning" },
      { label: "Safety class (ASHRAE 34)", value: "A1" },
      { label: "Cylinder sizes", value: "Ask us on WhatsApp" },
    ],
    image: "",
  },
  {
    slug: "r134a-refrigerant-gas",
    name: "R134a Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R134a HFC refrigerant for chillers, medium-temperature refrigeration and vehicle air conditioning.",
    description:
      "R134a is a single-component HFC refrigerant used in chillers, medium-temperature refrigeration, domestic refrigerators and vehicle air conditioning. Ask us for the price and the cylinder sizes available.",
    specs: [
      { label: "Refrigerant type", value: "HFC, single component" },
      { label: "Typical use", value: "Chillers, medium-temperature refrigeration, vehicle AC" },
      { label: "Safety class (ASHRAE 34)", value: "A1" },
      { label: "Cylinder sizes", value: "Ask us on WhatsApp" },
    ],
    image: "",
  },
  {
    slug: "r404a-refrigerant-gas",
    name: "R404A Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R404A HFC blend refrigerant for low and medium-temperature commercial refrigeration.",
    description:
      "R404A is an HFC blend of R125, R143a and R134a used in low and medium-temperature commercial refrigeration such as cold rooms, freezers and display cabinets. Ask us for the price and the cylinder sizes available.",
    specs: [
      { label: "Refrigerant type", value: "HFC blend (R125 / R143a / R134a)" },
      { label: "Typical use", value: "Cold rooms, freezers and display cabinets" },
      { label: "Safety class (ASHRAE 34)", value: "A1" },
      { label: "Cylinder sizes", value: "Ask us on WhatsApp" },
    ],
    image: "",
  },
  {
    slug: "r407c-refrigerant-gas",
    name: "R407C Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R407C HFC blend refrigerant for air conditioning and R22 replacement work.",
    description:
      "R407C is an HFC blend of R32, R125 and R134a used in air-conditioning systems and as an alternative to R22 in retrofit work. Check compressor oil compatibility before converting an R22 system. Ask us for the price and the cylinder sizes available.",
    specs: [
      { label: "Refrigerant type", value: "HFC blend (R32 / R125 / R134a)" },
      { label: "Typical use", value: "Air conditioning and R22 replacement" },
      { label: "Safety class (ASHRAE 34)", value: "A1" },
      { label: "Cylinder sizes", value: "Ask us on WhatsApp" },
    ],
    image: "",
  },
  {
    slug: "r32-refrigerant-gas",
    name: "R32 Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R32 refrigerant for newer split air conditioners, with a lower GWP than R410A.",
    description:
      "R32 is a single-component HFC refrigerant used in newer split air conditioners. It has a lower global warming potential than R410A but is mildly flammable (class A2L), so follow the equipment maker's installation and handling rules. Ask us for the price and the cylinder sizes available.",
    specs: [
      { label: "Refrigerant type", value: "HFC, single component" },
      { label: "Typical use", value: "Newer split air conditioners" },
      { label: "Safety class (ASHRAE 34)", value: "A2L (mildly flammable)" },
      { label: "Cylinder sizes", value: "Ask us on WhatsApp" },
    ],
    image: "",
  },
  {
    slug: "r600-refrigerant-gas",
    name: "R600 Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R600 hydrocarbon (butane) refrigerant for small refrigeration equipment.",
    description:
      "R600 is a hydrocarbon (butane) refrigerant used in small domestic and commercial refrigeration equipment. It is flammable (class A3), so it must be handled and charged according to safety rules. Ask us for the price and the cylinder sizes available.",
    specs: [
      { label: "Refrigerant type", value: "Hydrocarbon (butane)" },
      { label: "Typical use", value: "Small domestic and commercial refrigeration" },
      { label: "Safety class (ASHRAE 34)", value: "A3 (flammable)" },
      { label: "Cylinder sizes", value: "Ask us on WhatsApp" },
    ],
    image: "",
  },

  // ───────────────────────── FIXING SYSTEMS ─────────────────────────
  {
    slug: "chemical-anchor-poly-ec",
    name: "Chemical Anchor POLY EC",
    brand: "Bossong",
    category: "fixing-systems",
    shortDescription:
      "Medium and light-duty styrene-free polyester resin anchor for concrete and brick masonry.",
    description:
      "Bossong POLY EC is a medium to light-duty, bi-component polyester styrene-free resin for chemical anchoring. It is used in concrete, solid brick and hollow brick masonry. Supplied in BCR-400 and BCR-300 cartridges.",
    specs: [
      { label: "Resin", value: "Polyester, styrene-free, bi-component" },
      { label: "Duty", value: "Medium / light" },
      { label: "Base materials", value: "Concrete, solid brick, hollow brick masonry" },
      { label: "Available formats", value: "BCR-400, BCR-300" },
    ],
    image: "",
  },
  {
    slug: "chemical-anchor-poly-sf",
    name: "Chemical Anchor POLY SF",
    brand: "Bossong",
    category: "fixing-systems",
    shortDescription:
      "Medium and heavy-duty styrene-free polyester resin chemical anchor.",
    description:
      "Bossong POLY SF is a medium to heavy-duty polyester styrene-free resin for chemical anchoring. It is supplied in several formats, from BCR cartridges to the Termo pack, the Kit and the OSR bucket, so you can match the pack to the size of the job.",
    specs: [
      { label: "Resin", value: "Polyester, styrene-free" },
      { label: "Duty", value: "Medium / heavy" },
      {
        label: "Available formats",
        value: "BCR-400, BCR-300, BCR-165, Termo, Kit, OSR bucket",
      },
    ],
    image: "",
  },
  {
    slug: "chemical-anchor-vinil",
    name: "Chemical Anchor VINIL",
    brand: "Bossong",
    category: "fixing-systems",
    shortDescription:
      "Heavy-duty styrene-free epoxy-acrylate resin anchor for concrete, masonry and wood.",
    description:
      "Bossong VINIL is a heavy-duty epoxy-acrylate styrene-free resin for chemical anchoring in concrete, masonry and wood. Supplied in BCR-400, BCR-300 and BCR-165 cartridges, the Termo pack and the Kit.",
    specs: [
      { label: "Resin", value: "Epoxy-acrylate, styrene-free" },
      { label: "Duty", value: "Heavy" },
      { label: "Base materials", value: "Concrete, masonry, wood" },
      {
        label: "Available formats",
        value: "BCR-400, BCR-300, BCR-165, Termo, Kit",
      },
    ],
    image: "",
  },
  {
    slug: "chemical-anchor-v-plus",
    name: "Chemical Anchor V-PLUS",
    brand: "Bossong",
    category: "fixing-systems",
    shortDescription:
      "Heavy-duty styrene-free vinylester resin chemical anchor in five cartridge sizes.",
    description:
      "Bossong V-PLUS is a heavy-duty vinylester styrene-free resin for chemical anchoring. It is supplied in five cartridge sizes: BCR-825, BCR-400, BCR-345, BCR-300 and BCR-165.",
    specs: [
      { label: "Resin", value: "Vinylester, styrene-free" },
      { label: "Duty", value: "Heavy" },
      {
        label: "Available formats",
        value: "BCR-825, BCR-400, BCR-345, BCR-300, BCR-165",
      },
    ],
    image: "",
  },
  {
    slug: "unistrut-slotted-channels-and-accessories",
    name: "Slotted Channels and Accessories",
    brand: "Unistrut",
    category: "fixing-systems",
    shortDescription:
      "Unistrut slotted channel system and accessories for supporting pipework, trays and services.",
    description:
      "Unistrut slotted channels and accessories form a modular support system for pipework, cable trays, ducting and other building services. Channels are cut to length and joined with matching fittings and nuts, so supports can be built on site. Tell us the channel type, length and accessories you need.",
    specs: [
      { label: "System", value: "Slotted channel with matching accessories" },
      {
        label: "Typical use",
        value: "Supports for pipework, cable trays, ducting and services",
      },
      ASK_SIZES,
    ],
    image: "",
  },

  // ───────────────────────────── ELECTRICAL ─────────────────────────────
  {
    slug: "pvc-coated-gi-flexible-conduit-pipe",
    name: "PVC Coated GI Flexible Conduit Pipe",
    brand: ANY_BRAND,
    category: "electrical",
    shortDescription:
      "PVC coated galvanised iron flexible conduit for motors and devices that need vibration isolation.",
    description:
      "PVC coated GI flexible conduit pipe protects cables running to motors and other devices that need vibration isolation. The flexible galvanised steel core with a PVC coating allows the final connection to move without stressing the cable. Ask us for sizes and lengths.",
    specs: [
      { label: "Construction", value: "Galvanised iron (GI) flexible, PVC coated" },
      { label: "Typical use", value: "Motors and devices that need vibration isolation" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "gi-conduit-pipe-bs31-class-3",
    name: "GI Conduit Pipe BS31 Class 3",
    brand: ANY_BRAND,
    category: "electrical",
    shortDescription:
      "BS31 Class 3 galvanised iron conduit pipe in 10 ft lengths from 3/4 inch to 2 inch.",
    description:
      "GI conduit pipe to BS31 Class 3 for electrical installations. Supplied in 10 ft lengths in four sizes. Ask us for the price and for matching fittings such as brass adapters, lock nuts and bushes.",
    specs: [
      { label: "Standard", value: "BS31, Class 3" },
      { label: "Material", value: "Galvanised iron (GI)" },
      { label: "Sizes", value: '3/4" x 10 ft, 1" x 10 ft, 1-1/2" x 10 ft, 2" x 10 ft' },
    ],
    image: "",
  },
  {
    slug: "brass-adapter-with-gi-lock-nut",
    name: "Brass Adapter with GI Lock Nut",
    brand: ANY_BRAND,
    category: "electrical",
    shortDescription:
      "Brass conduit adapter supplied with a GI lock nut for terminating conduit at boxes and enclosures.",
    description:
      "Brass adapter with GI lock nut, used to terminate conduit at junction boxes, panels and other enclosures. Ask us for the sizes available to match your conduit.",
    specs: [
      { label: "Material", value: "Brass adapter with GI lock nut" },
      { label: "Typical use", value: "Terminating conduit at boxes and enclosures" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "brass-male-bush",
    name: "Brass Male Bush",
    brand: ANY_BRAND,
    category: "electrical",
    shortDescription:
      "Brass male bush for finishing conduit ends and protecting cables at entry points.",
    description:
      "Brass male bush for conduit installations, used to finish the conduit end and protect the cable at the entry point. Ask us for the sizes available.",
    specs: [
      { label: "Material", value: "Brass" },
      { label: "Typical use", value: "Conduit termination and cable entry protection" },
      ASK_SIZES,
    ],
    image: "",
  },
  {
    slug: "cables-and-wires",
    name: "Cables and Wires",
    brand: ANY_BRAND,
    category: "electrical",
    shortDescription:
      "Power, flexible, data and fibre optic cables and wires for building and industrial projects.",
    description:
      "A full range of cables and wires for building services and industrial projects, from high-voltage armoured power cables to flexible cables, single core wires and data cabling. Send us the type, core size and length you need and we will confirm availability and price.",
    specs: [
      { label: "HV / MV power", value: "PVC / XLPE insulated armoured cables" },
      { label: "LV power", value: "PVC insulated cables and flexible cables" },
      { label: "Flexible", value: "Rubber flexible cables" },
      { label: "Wires", value: "Single core wires" },
      { label: "Data and communications", value: "Coaxial, CAT 5/6 data cables, fibre optic cables" },
    ],
    image: "",
  },
  {
    slug: "switchgear-and-earthing-equipment",
    name: "Switchgear and Earthing Equipment",
    brand: ANY_BRAND,
    category: "electrical",
    shortDescription:
      "Circuit breakers, isolators, protection devices, industrial plugs and earthing equipment.",
    description:
      "Switchgear, protection devices and earthing equipment for distribution boards and MEP projects. Send us the ratings and brands you need and we will confirm availability and price.",
    specs: [
      { label: "Circuit breakers", value: "ACBs, MCCBs, MCBs" },
      { label: "Switching", value: "Main switches, isolators" },
      { label: "Protection", value: "RCCB, RCBO, phase failure relays" },
      { label: "Control", value: "Contactors, relays" },
      { label: "Power", value: "Transformers" },
      { label: "Connection", value: "Industrial plugs and sockets" },
      { label: "Earthing", value: "Earth rod sets, copper tapes" },
    ],
    image: "",
  },

  // ───────────────────────────── BEARINGS ─────────────────────────────
  {
    slug: "deep-groove-ball-bearings",
    name: "Deep Groove Ball Bearings",
    brand: "NSK",
    category: "bearings",
    shortDescription:
      "NSK deep groove ball bearings for motors, pumps, fans and general machinery.",
    description:
      "NSK deep groove ball bearings are the most widely used bearing type. They carry radial loads and moderate axial loads in both directions and run at high speed, which makes them common in electric motors, pumps, fans and general machinery. Send us the bearing number and we will confirm availability and price.",
    specs: [
      { label: "Type", value: "Deep groove ball bearing" },
      { label: "Load", value: "Radial and moderate axial, both directions" },
      { label: "Typical use", value: "Motors, pumps, fans, general machinery" },
      { label: "Bearing numbers", value: "Send us the number on WhatsApp" },
    ],
    image: "",
  },
  {
    slug: "angular-contact-ball-bearings",
    name: "Angular Contact Ball Bearings",
    brand: "NSK",
    category: "bearings",
    shortDescription:
      "NSK angular contact ball bearings for combined radial and axial loads.",
    description:
      "NSK angular contact ball bearings carry combined radial and axial loads, with the axial load acting in one direction. They are often mounted in pairs to take axial load both ways, and are used in pumps, gearboxes and machine spindles. Send us the bearing number and we will confirm availability and price.",
    specs: [
      { label: "Type", value: "Angular contact ball bearing" },
      { label: "Load", value: "Combined radial and axial (one direction)" },
      { label: "Typical use", value: "Pumps, gearboxes, machine spindles" },
      { label: "Bearing numbers", value: "Send us the number on WhatsApp" },
    ],
    image: "",
  },
  {
    slug: "self-aligning-ball-bearings",
    name: "Self-Aligning Ball Bearings",
    brand: "NSK",
    category: "bearings",
    shortDescription:
      "NSK self-aligning ball bearings that tolerate shaft misalignment.",
    description:
      "NSK self-aligning ball bearings have two rows of balls running on a spherical outer ring, so they tolerate shaft misalignment and housing deflection. They suit applications where perfect alignment is hard to achieve. Send us the bearing number and we will confirm availability and price.",
    specs: [
      { label: "Type", value: "Self-aligning ball bearing" },
      { label: "Feature", value: "Tolerates shaft misalignment" },
      { label: "Typical use", value: "Long shafts and housings that are hard to align" },
      { label: "Bearing numbers", value: "Send us the number on WhatsApp" },
    ],
    image: "",
  },
];

/* ───────────────────────── helpers (no need to edit) ───────────────────────── */

const RESERVED_SLUGS = ["hvac", "fixing-systems", "electrical", "bearings"];

// Fails the build early if a new entry reuses a slug or clashes with a category URL.
{
  const seen = new Set<string>();
  for (const p of products) {
    if (seen.has(p.slug)) throw new Error(`Duplicate product slug: ${p.slug}`);
    if (RESERVED_SLUGS.includes(p.slug))
      throw new Error(`Product slug clashes with a category: ${p.slug}`);
    seen.add(p.slug);
  }
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug) {
  return products.filter((p) => p.category === category);
}

/** Up to 3 other products from the same category, starting with the ones after this one in the list. */
export function getRelatedProducts(product: Product, count = 3) {
  const same = getProductsByCategory(product.category);
  const index = same.findIndex((p) => p.slug === product.slug);
  const ordered = [...same.slice(index + 1), ...same.slice(0, index)];
  return ordered.slice(0, count);
}

/** Plain text used by the on-site search (name, brand, descriptions and specs). */
export function productSearchText(product: Product) {
  return [
    product.name,
    product.brand,
    product.shortDescription,
    product.description,
    ...product.specs.map((s) => `${s.label} ${s.value}`),
  ]
    .join(" ")
    .toLowerCase();
}
