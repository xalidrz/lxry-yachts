export type PhotoCategory = "engine" | "electrical" | "shop";

export type Photo = {
  file: string; // in /public/photos
  alt: string;
  width: number;
  height: number;
  category: PhotoCategory;
};

const p = (
  file: string,
  width: number,
  height: number,
  category: PhotoCategory,
  alt: string,
): Photo => ({ file: `/photos/${file}.webp`, width, height, category, alt });

export const heroPhoto = p(
  "hero-shop-bay-red-green-purple-cars",
  1920,
  1440,
  "shop",
  "Inside the Elite Motorsports shop: a red sports coupe, a green Maserati and a matte purple Mercedes sedan parked in the bay, with tool carts and wall racks behind them.",
);

export const photos: Photo[] = [
  // Work in progress: engines, wiring, under-car
  p("engine-bay-wiring-repair", 1200, 1600, "electrical", "A bundle of multi-coloured wires taped to a black coolant hose in an engine bay, a wiring repair in progress."),
  p("classic-engine-bay-wiring-terminals", 1200, 1600, "electrical", "A mechanic's gloved hand working in the engine bay of a classic V8 car, with a tray of crimp terminals, pliers and red wire laid out beside the engine."),
  p("intake-manifold-impact-wrench", 1200, 1600, "engine", "A gloved mechanic using a red cordless impact tool on an exposed engine intake manifold with the ports open."),
  p("front-suspension-brake-under-car", 1200, 900, "engine", "Underside view of a front wheel showing the control arms, tie rod, axle boot and a red brake caliper behind the rotor."),
  p("carbureted-v8-engine-build", 1200, 1600, "engine", "Top view of a chrome V8 engine with a four-barrel carburetor, braided fuel line and spark plug wires, sitting on a wooden crate."),
  p("supercharged-hemi-engine-on-stand", 1200, 1600, "engine", "A supercharged V8 engine with orange valve covers and a silver supercharger housing, strapped down on an engine stand."),
  p("titanium-exhaust-under-car", 1200, 1600, "engine", "Polished titanium exhaust pipes with blue heat-tinted welds, seen from underneath a car."),
  p("drilled-brake-rotor", 1200, 900, "engine", "A cross-drilled two-piece brake rotor with a black hub held up in the shop."),
  // Shop, bays and finished cars
  p("porsche-911-on-lift-hood-open", 1200, 900, "shop", "A white Porsche 911 raised on a two-post lift with its rear hood open."),
  p("jeep-gladiator-front-end-off", 1200, 900, "shop", "A grey and black Jeep in a shop bay with its front bumper and fender removed."),
  p("bentley-coupe-in-shop-bay", 1200, 900, "shop", "A black Bentley coupe parked in a shop bay with lifts and other cars behind it."),
  p("gold-350z-hood-open-in-bay", 1200, 900, "shop", "A bronze-gold Nissan 350Z with its hood open in a shop bay, engine exposed."),
  p("silverado-on-two-post-lift", 1200, 1600, "shop", "The rear of a grey Chevrolet Silverado pickup raised on a blue two-post lift."),
  p("mustangs-in-shop-evening", 1200, 900, "shop", "Two black Ford Mustangs with white stripes parked in the shop under work lights, with another car on a lift behind."),
  p("hero-shop-bays-two-post-lifts", 1920, 1440, "shop", "Inside the Elite Motorsports shop: a black muscle car with white stripes and a grey Subaru in front of two blue two-post lifts, with a red car raised on the far lift."),
  p("hero-shop-wide-porsche-s-class", 1920, 1440, "shop", "Wide view of the shop floor under a steel-truss roof: a black Mercedes sedan and a white Porsche parked between blue two-post lifts."),
  p("s-class-at-shop-front", 1200, 900, "shop", "A white Mercedes S-Class parked in front of the Elite Motorsports building, under the red ELITE MOTORSPORTS Auto Repair sign."),
  p("4runner-by-shop-sign", 1200, 900, "shop", "A white Toyota 4Runner parked beside the Elite Motorsports building on an overcast day."),
  p("cybertruck-outside-shop", 1200, 900, "shop", "A matte black Tesla Cybertruck parked on gravel outside the Elite Motorsports shop under a blue sky."),
  p("blue-audi-r8-gold-wheels", 1200, 900, "shop", "A blue Audi R8 with gold wheels and a carbon rear wing in a clean shop bay."),
  p("charger-hellcat-in-bay", 1200, 900, "shop", "A dark grey Dodge Charger with a red graphic on its hood, parked at an open bay door."),
  p("classic-chevrolet-pickup", 1200, 1600, "shop", "A cream-coloured vintage Chevrolet pickup with a chrome grille parked in the shop."),
  p("bmw-m3-at-bay-door", 1200, 900, "shop", "A dark blue BMW M3 with bronze wheels parked at the shop's bay door, with a parts rack behind it."),
];

export const categoryCounts = {
  all: photos.length,
  engine: photos.filter((p) => p.category === "engine").length,
  electrical: photos.filter((p) => p.category === "electrical").length,
  shop: photos.filter((p) => p.category === "shop").length,
};

export const photosIn = (category: PhotoCategory | "all") =>
  category === "all" ? photos : photos.filter((p) => p.category === category);

/** Six photos for the home-page preview (a spread of engine, electrical, shop and storefront). */
const previewFiles = [
  "engine-bay-wiring-repair",
  "charger-hellcat-in-bay",
  "carbureted-v8-engine-build",
  "s-class-at-shop-front",
  "bentley-coupe-in-shop-bay",
  "titanium-exhaust-under-car",
];
export const previewPhotos: Photo[] = previewFiles.map(
  (f) => photos.find((p) => p.file === `/photos/${f}.webp`) as Photo,
);
