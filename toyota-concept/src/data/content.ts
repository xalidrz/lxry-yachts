/**
 * All page content lives here. Components render this data and hold no copy of their own.
 * MOCK DATA ONLY: every figure carries "(concept)". Vehicle names are fictional.
 * Icon names are Lucide icon names, resolved in src/components/site/icons.ts.
 */

export const site = {
  name: "TOYOTA",
  wordmarkTag: "concept",
  title: "Built for every road.",
  concept: "Concept redesign, not affiliated with Toyota.",
  mockNote: "Figures marked (concept) are mock data. Vehicle imagery is generated and generic.",
};

/* ---------- navigation ---------- */
export const utilityBar = {
  note: "Concept redesign · mock data",
  links: [
    { id: "dealer", label: "Find a dealer", href: "#dealer", icon: "MapPin" },
    { id: "es", label: "Español", href: "#", icon: "Globe", lang: "es" },
    { id: "search", label: "Search", href: "#", icon: "Search", action: "search" },
  ],
};

export const nav = {
  items: [
    { id: "vehicles", label: "Vehicles", mega: true, href: "#finder" },
    { id: "tools", label: "Shopping Tools", href: "#finder" },
    { id: "offers", label: "Offers", href: "#offers" },
    { id: "owners", label: "Owners", href: "#owners" },
  ],
  cta: { label: "Build & Price", href: "#finder" },
};

/** mega menu columns reference vehicle ids below */
export const megaMenu = {
  viewAll: { label: "View all vehicles", href: "#finder" },
  compare: { label: "Compare vehicles", href: "#finder" },
  columns: [
    { title: "Sedans & hatchbacks", vehicles: ["arden-sedan", "lumen-hatch"] },
    { title: "SUVs & crossovers", vehicles: ["corso-suv", "lumen-ev"] },
    { title: "Trucks", vehicles: ["ridgeway-truck", "ridgeway-hybrid"] },
    { title: "Electrified & performance", vehicles: ["lumen-ev-sedan", "vector-gt"] },
  ],
};

export const searchDialog = {
  title: "Search",
  placeholder: "Search vehicles, offers, service…",
  popularLabel: "Popular searches",
  popular: ["Hybrid vehicles", "Lease offers", "Schedule service", "Trade-in estimate"],
};

/* ---------- hero ---------- */
export const hero = {
  headline: "Built for every road.",
  subline: "One line-up for every journey, from city streets to mountain passes.",
  primary: { label: "Explore vehicles", href: "#finder" },
  secondary: { label: "Find a dealer", href: "#dealer" },
  image: {
    base: "hero-car",
    widths: [900, 1800] as const,
    width: 1800,
    height: 760,
    alt: "Generic silver SUV in side profile on a graphite studio floor",
  },
  facts: [
    { icon: "Gauge", text: "Efficiency-first powertrains (concept)" },
    { icon: "ShieldCheck", text: "Driver-assist technology (concept)" },
    { icon: "MapPin", text: "A dealer near you (concept)" },
  ],
  scrollCue: { label: "Scroll", href: "#finder", aria: "Scroll to the vehicle finder" },
};

/* ---------- vehicles ---------- */
export type VehicleCategory = "sedans" | "suvs" | "trucks" | "hybrids" | "electric" | "performance";
export type Vehicle = {
  id: string;
  name: string;
  type: string;
  categories: VehicleCategory[];
  price: string;
  badge: { icon: "Fuel" | "Zap" | "Gauge"; label: string };
  drivetrain: string;
  seating: string;
  image: string;
  alt: string;
};

const PRICE = "From $XX,XXX (concept)";

export const vehicles: Vehicle[] = [
  { id: "arden-sedan", name: "Arden Sedan", type: "Mid-size sedan", categories: ["sedans"], price: PRICE, badge: { icon: "Fuel", label: "34 MPG (concept)" }, drivetrain: "Gasoline · FWD (concept)", seating: "5 seats (concept)", image: "arden-sedan", alt: "Generic pearl white mid-size sedan in side view" },
  { id: "arden-hybrid", name: "Arden Hybrid", type: "Mid-size hybrid sedan", categories: ["sedans", "hybrids"], price: PRICE, badge: { icon: "Fuel", label: "52 MPG (concept)" }, drivetrain: "Hybrid · FWD (concept)", seating: "5 seats (concept)", image: "arden-hybrid", alt: "Generic silver hybrid sedan in side view" },
  { id: "corso-suv", name: "Corso SUV", type: "Mid-size SUV", categories: ["suvs"], price: PRICE, badge: { icon: "Fuel", label: "28 MPG (concept)" }, drivetrain: "Gasoline · AWD (concept)", seating: "7 seats (concept)", image: "corso-suv", alt: "Generic midnight blue SUV in side view" },
  { id: "corso-hybrid", name: "Corso Hybrid", type: "Mid-size hybrid SUV", categories: ["suvs", "hybrids"], price: PRICE, badge: { icon: "Fuel", label: "41 MPG (concept)" }, drivetrain: "Hybrid · AWD (concept)", seating: "7 seats (concept)", image: "corso-hybrid", alt: "Generic sage grey hybrid SUV in side view" },
  { id: "ridgeway-truck", name: "Ridgeway Truck", type: "Full-size truck", categories: ["trucks"], price: PRICE, badge: { icon: "Fuel", label: "24 MPG (concept)" }, drivetrain: "Gasoline · 4WD (concept)", seating: "5 seats (concept)", image: "ridgeway-truck", alt: "Generic slate grey pickup truck in side view" },
  { id: "ridgeway-hybrid", name: "Ridgeway Hybrid", type: "Full-size hybrid truck", categories: ["trucks", "hybrids"], price: PRICE, badge: { icon: "Fuel", label: "27 MPG (concept)" }, drivetrain: "Hybrid · 4WD (concept)", seating: "5 seats (concept)", image: "ridgeway-hybrid", alt: "Generic silver hybrid pickup truck in side view" },
  { id: "lumen-hatch", name: "Lumen Hatch", type: "Compact hybrid hatchback", categories: ["hybrids"], price: PRICE, badge: { icon: "Fuel", label: "56 MPG (concept)" }, drivetrain: "Hybrid · FWD (concept)", seating: "5 seats (concept)", image: "lumen-hatch", alt: "Generic white compact hatchback in side view" },
  { id: "lumen-ev", name: "Lumen EV", type: "Electric crossover", categories: ["suvs", "electric"], price: PRICE, badge: { icon: "Zap", label: "310 mi range (concept)" }, drivetrain: "Electric · AWD (concept)", seating: "5 seats (concept)", image: "lumen-ev", alt: "Generic teal grey electric crossover in side view" },
  { id: "lumen-ev-sedan", name: "Lumen EV Sedan", type: "Electric sedan", categories: ["sedans", "electric"], price: PRICE, badge: { icon: "Zap", label: "340 mi range (concept)" }, drivetrain: "Electric · RWD (concept)", seating: "5 seats (concept)", image: "lumen-ev-sedan", alt: "Generic midnight blue electric fastback sedan in side view" },
  { id: "vector-gt", name: "Vector GT", type: "Performance coupe", categories: ["performance"], price: PRICE, badge: { icon: "Gauge", label: "420 hp (concept)" }, drivetrain: "Gasoline · RWD (concept)", seating: "4 seats (concept)", image: "vector-gt", alt: "Generic burgundy performance coupe in side view" },
  { id: "vector-s", name: "Vector S", type: "Performance sedan", categories: ["sedans", "performance"], price: PRICE, badge: { icon: "Gauge", label: "380 hp (concept)" }, drivetrain: "Gasoline · AWD (concept)", seating: "5 seats (concept)", image: "vector-s", alt: "Generic graphite performance sedan in side view" },
];

export const vehicleImage = { widths: [400, 800] as const, width: 800, height: 600 };

export const finder = {
  id: "finder",
  eyebrow: "Vehicle finder",
  title: "Find your next vehicle.",
  lead: "Filter by the way you drive. Check up to three to compare side by side.",
  filterLabel: "Filter vehicles by type",
  filters: [
    { id: "all", label: "All" },
    { id: "sedans", label: "Sedans" },
    { id: "suvs", label: "SUVs" },
    { id: "trucks", label: "Trucks" },
    { id: "hybrids", label: "Hybrids" },
    { id: "electric", label: "Electric" },
    { id: "performance", label: "Performance" },
  ] as { id: "all" | VehicleCategory; label: string }[],
  carouselLabel: "Vehicles",
  prev: "Previous vehicles",
  next: "Next vehicles",
  compareLabel: "Compare",
  compareLimit: "Limit of 3 reached. Remove one to add another.",
  build: "Build",
  count: (n: number) => `${n} ${n === 1 ? "vehicle" : "vehicles"}`,
  selectMore: "Select one more vehicle to compare.",
  empty: {
    title: "No vehicles match this filter.",
    body: "Try another type, or view the full line-up.",
    action: "Show all vehicles",
  },
};

export const compare = {
  label: "Compare vehicles",
  min: 2,
  max: 3,
  status: (n: number) => `${n} of 3 selected`,
  remove: (name: string) => `Remove ${name} from comparison`,
  clear: "Clear all",
  action: "Compare",
  dialogTitle: "Compare vehicles",
  dialogDescription: "Side-by-side summary. All figures are mock data (concept).",
  close: "Close comparison",
  rows: [
    { label: "Starting at", key: "price" },
    { label: "Type", key: "type" },
    { label: "Efficiency / output", key: "badge" },
    { label: "Drivetrain", key: "drivetrain" },
    { label: "Seating", key: "seating" },
  ] as { label: string; key: "price" | "type" | "badge" | "drivetrain" | "seating" }[],
};

/* ---------- efficiency feature ---------- */
export const efficiency = {
  id: "efficiency",
  eyebrow: "Efficiency",
  title: "Go further on every tank and every charge.",
  body: "Hybrid and electric options designed around how people actually drive: quiet and smooth in town, confident on the open road, and kind to your running costs.",
  cta: { label: "Explore electrified", href: "#finder" },
  image: { base: "efficiency", widths: [600, 1200] as const, width: 1200, height: 1400, alt: "A white SUV driving a mountain road beneath layered grey ridgelines at night" },
  stats: [
    { value: 52, suffix: " MPG", label: "Combined efficiency, most efficient hybrid" },
    { value: 340, suffix: " mi", label: "Estimated range, longest-range electric" },
    { value: 11, suffix: "", label: "Models with an electrified option" },
  ],
  concept: "(concept)",
};

/* ---------- offers ---------- */
export const offers = {
  id: "offers",
  eyebrow: "Offers",
  title: "Ways to drive home sooner.",
  terms: "Terms apply",
  items: [
    { id: "lease", icon: "KeyRound", title: "Lease", line: "Lower monthly payments on a new vehicle, from $XXX/mo (concept).", link: "See lease offers", href: "#offers" },
    { id: "finance", icon: "Landmark", title: "Finance", line: "Flexible terms and competitive rates, from X.X% APR (concept).", link: "Explore financing", href: "#offers" },
    { id: "trade", icon: "ArrowLeftRight", title: "Trade-in", line: "Get an instant estimate of your current vehicle's value (concept).", link: "Value my trade", href: "#offers" },
  ],
};

/* ---------- dealers ---------- */
export type Dealer = { id: string; name: string; address: string; distance: string; status: string; phone: string; pin: { x: number; y: number } };

export const dealers = {
  id: "dealer",
  eyebrow: "Find a dealer",
  title: "Talk to someone nearby.",
  lead: "Enter your ZIP code to see sales and service centers close to you.",
  zip: {
    label: "ZIP code",
    placeholder: "e.g. 90210",
    button: "Search",
    loading: "Searching",
    error: "Enter a 5-digit ZIP code.",
    help: "5 digits, numbers only.",
  },
  sampleLabel: "Sample results (concept)",
  resultsFor: (zip: string) => `Dealers near ${zip}`,
  empty: { title: "No dealers found for this ZIP.", body: "Try a nearby ZIP code or widen your search." },
  failure: { title: "We couldn't load dealers.", body: "Something went wrong on our side. Please try again.", action: "Try again" },
  actions: { directions: "Directions", call: "Call" },
  mapLabel: "Map placeholder (concept)",
  list: [
    { id: "d1", name: "Concept Motors Riverside", address: "100 Example Avenue, Riverside, ST 00000", distance: "2.4 mi (concept)", status: "Open until 8 pm (concept)", phone: "(555) 010-0101", pin: { x: 34, y: 38 } },
    { id: "d2", name: "Concept Auto Group Northgate", address: "2200 Sample Road, Northgate, ST 00000", distance: "5.1 mi (concept)", status: "Open until 7 pm (concept)", phone: "(555) 010-0102", pin: { x: 62, y: 28 } },
    { id: "d3", name: "Concept Motors Lakeview", address: "48 Placeholder Boulevard, Lakeview, ST 00000", distance: "8.7 mi (concept)", status: "Opens 9 am (concept)", phone: "(555) 010-0103", pin: { x: 74, y: 66 } },
  ] as Dealer[],
};

/* ---------- owners ---------- */
export const owners = {
  id: "owners",
  eyebrow: "Owners",
  title: "Everything after the drive home.",
  items: [
    { id: "service", icon: "CalendarCheck", title: "Schedule service", line: "Book a visit online.", href: "#owners" },
    { id: "manuals", icon: "BookOpen", title: "Manuals & guides", line: "Find your owner's manual.", href: "#owners" },
    { id: "recalls", icon: "TriangleAlert", title: "Recalls", line: "Check by VIN.", href: "#owners" },
    { id: "app", icon: "Smartphone", title: "Toyota app", line: "Your vehicle in your pocket.", href: "#owners" },
  ],
};

/* ---------- mobile dealer bar ---------- */
export const dealerBar = { label: "Find a dealer", href: "#dealer", icon: "MapPin" };

/* ---------- footer ---------- */
export const footer = {
  columns: [
    { title: "Vehicles", links: ["Sedans", "SUVs", "Trucks", "Hybrids", "Electric", "Performance"] },
    { title: "Shopping tools", links: ["Build & Price", "Compare vehicles", "Payment calculator", "Trade-in value", "Search inventory"] },
    { title: "Owners", links: ["Schedule service", "Manuals & guides", "Recalls", "Toyota app", "Accessories"] },
    { title: "Company", links: ["About", "Careers", "Newsroom", "Contact us", "Accessibility"] },
  ],
  social: [
    { id: "facebook", icon: "Facebook", label: "Facebook" },
    { id: "instagram", icon: "Instagram", label: "Instagram" },
    { id: "twitter", icon: "Twitter", label: "X (Twitter)" },
    { id: "youtube", icon: "Youtube", label: "YouTube" },
  ],
  legal: ["Privacy", "Terms of use", "Cookie settings", "Accessibility", "Site map"],
  rights: "© 2026 Concept redesign. All trademarks belong to their respective owners.",
};
