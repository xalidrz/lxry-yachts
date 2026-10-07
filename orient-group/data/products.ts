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
 *  specsPrompt       Optional. Shown with a WhatsApp button instead of the table when `specs` is empty.
 *  image             Photo path, e.g. "/products/pancake-copper-coils.jpg" (file in /public/products).
 *                    Leave "" for no photo: the card then shows a compact layout.
 *  ar                Optional Arabic text: { name, shortDescription, description, specs?, specsPrompt? }.
 *                    Anything missing falls back to the English.
 */
import type { Locale } from "@/lib/i18n";
import type { CategorySlug } from "./categories";
import { ANY_BRAND } from "@/lib/whatsapp";

export type Spec = { label: string; value: string };

/** Arabic text for a product. Anything left out falls back to the English. */
export type ProductText = {
  name: string;
  shortDescription: string;
  description: string;
  specs?: Spec[];
  specsPrompt?: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  specs: Spec[];
  /** Shown with a WhatsApp button in place of the specifications table when `specs` is empty. */
  specsPrompt?: string;
  image: string;
  /** Arabic version (Modern Standard Arabic). Optional: English is used if missing. */
  ar?: ProductText;
};

export const DEFAULT_SPECS_PROMPT =
  "Contact us for specifications, sizes and availability.";
const GAS_SPECS_PROMPT =
  "Contact us for specifications, cylinder sizes and availability.";

const GAS_SPECS_PROMPT_AR =
  "تواصل معنا لمعرفة المواصفات وأحجام الأسطوانات والتوفر.";
const ASK_SIZES_AR: Spec = {
  label: "المقاسات والتوفر",
  value: "اسألنا عبر واتساب عن المقاسات والمخزون الحالي",
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
    ar: {
      name: "لفائف نحاسية مسطحة (Pancake)",
      shortDescription:
        "لفائف نحاس ملدّن طري لخطوط وسيط التبريد في أنظمة التكييف.",
      description:
        "لفائف Venture النحاسية المسطحة مصنوعة من أنابيب نحاس ملدّنة طرية ملفوفة بشكل مسطح، وتُستخدم لخطوط وسيط التبريد في أنظمة التكييف، سواء لتوصيل وحدات التكييف أو إصلاحها أو التعديل عليها. تسمح الليونة بثني الأنبوب باستخدام أدوات الثني أو بدونها، وتتم الوصلات بالفلير أو بوصلات الضغط أو باللحام. تتوفر بطبقة واحدة أو طبقتين أو عدة طبقات. اسألنا عن الأقطار والأطوال المتوفرة حالياً.",
      specs: [
        { label: "المادة", value: "نحاس ملدّن طري" },
        { label: "الاستخدام", value: "خطوط وسيط التبريد في أنظمة التكييف" },
        { label: "الاستخدام المعتاد", value: "توصيل وحدات التكييف وإصلاحها والتعديل عليها" },
        { label: "طرق الوصل", value: "فلير أو وصلات ضغط أو لحام" },
        { label: "بنية اللفة", value: "طبقة واحدة أو طبقتان أو عدة طبقات" },
        { label: "الثني", value: "باستخدام أدوات الثني أو بدونها" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/copper-coil-rings.jpg",
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
    ar: {
      name: "أنابيب نحاس مستقيمة نوع K وL وM",
      shortDescription:
        "أنابيب Venture النحاسية المستقيمة بأنواع K وL وM لأنظمة التكييف والسباكة والتبريد.",
      description:
        "تتوفر أنابيب Venture النحاسية المستقيمة بثلاث سماكات للجدار. النوع K هو الأسمك، ويُستخدم لخدمات المياه والحماية من الحريق والتكييف والغازات الطبية والبخار. النوع L هو القياسي للسباكة الداخلية والتكييف وغاز البترول المسال. أما النوع M فيُستخدم لأنظمة التكييف والتبريد والثلاجات والمبردات وأنابيب المياه في المباني. أرسل لنا النوع والقطر والكمية لنؤكد التوفر والسعر.",
      specs: [
        { label: "النوع K", value: "جدار سميك. خدمات المياه، الحماية من الحريق، التكييف، الغازات الطبية، البخار" },
        { label: "النوع L", value: "قياسي. السباكة الداخلية، التكييف، غاز البترول المسال" },
        { label: "النوع M", value: "أنظمة التكييف والتبريد، الثلاجات، المبردات، أنابيب المياه في المباني" },
        { label: "المادة", value: "نحاس" },
        { label: "الشكل", value: "أطوال مستقيمة" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/copper-straight-pipe-venture.jpg",
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
    ar: {
      name: "عزل حراري",
      shortDescription:
        "عزل حراري لأنابيب وسيط التبريد وخطوط المياه المبردة ومجاري الهواء.",
      description:
        "عزل حراري لأنابيب وسيط التبريد والمياه المبردة ولمجاري الهواء، يحدّ من اكتساب الحرارة ويقلل التكثف على الأسطح الباردة. أخبرنا بقطر الأنبوب وسماكة العزل والاستخدام لنؤكد ما يمكننا توريده والسعر.",
      specs: [
        { label: "الاستخدام", value: "أنابيب وسيط التبريد وأنابيب المياه المبردة ومجاري الهواء" },
        { label: "الغرض", value: "يحدّ من اكتساب الحرارة والتكثف" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/thermal-insulation-pipes.jpg",
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
    ar: {
      name: "مجاري هواء مرنة ووصلات مجاري",
      shortDescription:
        "مجاري هواء مرنة ووصلات لتوزيع الهواء في تركيبات التكييف.",
      description:
        "مجاري هواء مرنة ووصلات لتوزيع هواء الإمداد والراجع في تركيبات التكييف، تُستخدم لربط مجاري الهواء الصلبة بالناشرات والفتحات ووحدات مناولة الهواء. أرسل لنا القطر والطول المطلوبين لنؤكد السعر والتوفر.",
      specs: [
        { label: "الاستخدام", value: "توزيع الهواء في أنظمة التكييف" },
        { label: "الاستخدام المعتاد", value: "ربط المجاري بالناشرات والفتحات والمعدات" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/flexible-duct-connector-aeroduct.jpg",
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
    ar: {
      name: "قماش كانفاس لمجاري الهواء",
      shortDescription:
        "قماش كانفاس للوصلات المرنة بين مجاري الهواء والمعدات.",
      description:
        "قماش كانفاس لعمل وصلات مرنة في مجاري الهواء، مثل الوصلة بين المجرى والمروحة أو وحدة مناولة الهواء. تساعد الوصلة المرنة على عزل الاهتزاز والضوضاء القادمة من المعدات. اسألنا عن العرض وطول اللفة والسعر.",
      specs: [
        { label: "الاستخدام", value: "الوصلات المرنة لمجاري الهواء" },
        { label: "الاستخدام المعتاد", value: "الوصلة بين المجاري والمراوح أو وحدات مناولة الهواء" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/ductwork-supply.jpg",
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
    ar: {
      name: "مواد إحكام ولواصق لمجاري الهواء",
      shortDescription:
        "مواد إحكام ولواصق لسد وصلات مجاري الهواء ولصق عزلها.",
      description:
        "مواد إحكام ولواصق لسد درزات ووصلات مجاري الهواء ولصق العزل عليها. أخبرنا بنوع السطح والاستخدام لنرشح لك المنتج المناسب من تشكيلتنا.",
      specs: [
        { label: "الاستخدام", value: "وصلات ودرزات مجاري الهواء ولصق العزل" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/duct-sealant-soudal.jpg",
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
    ar: {
      name: "مكثفات وكونتاكتورات",
      shortDescription:
        "مكثفات وكونتاكتورات لضواغط ومحركات مراوح أجهزة التكييف.",
      description:
        "مكثفات وكونتاكتورات للجزء الكهربائي من معدات التكييف والتبريد، تُستخدم مع الضواغط ومحركات المراوح. أرسل لنا القيمة المطلوبة أو صورة القطعة القديمة لنؤكد البديل المناسب.",
      specs: [
        { label: "الاستخدام", value: "دوائر الضاغط ومحرك المروحة" },
        { label: "الاستخدام المعتاد", value: "استبدال القطع وصيانة وحدات التكييف والتبريد" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/capacitors-amber.jpg",
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
    ar: {
      name: "محركات المكثف وقطع غيار التكييف",
      shortDescription:
        "محركات مراوح المكثف وقطع غيار لصيانة أجهزة التكييف.",
      description:
        "محركات مراوح المكثف وقطع غيار عامة لأعمال صيانة وإصلاح أجهزة التكييف. أرسل لنا موديل الوحدة أو لوحة بيانات المحرك أو صورة القطعة لنتحقق مما يمكننا توريده.",
      specs: [
        { label: "الاستخدام", value: "صيانة وإصلاح أجهزة التكييف" },
        { label: "يشمل", value: "محركات المكثف وقطع غيار التكييف العامة" },
        ASK_SIZES_AR,
      ],
    },
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
    ar: {
      name: "منظفات الملفات ومواد الصيانة الكيميائية",
      shortDescription:
        "منظفات ملفات ومواد كيميائية للصيانة الدورية لأجهزة التكييف.",
      description:
        "منظفات ومواد كيميائية لملفات المبخر والمكثف وللصيانة الدورية لوحدات التكييف، مناسبة لشركات الصيانة العاملة بعقود خدمة دورية. اسألنا عن أحجام العبوات والأسعار.",
      specs: [
        { label: "الاستخدام", value: "تنظيف ملفات المبخر والمكثف" },
        { label: "الاستخدام المعتاد", value: "الصيانة والخدمة الدورية لأجهزة التكييف" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/coil-cleaner-venture-bottle.jpg",
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
    ar: {
      name: "أدوات وملحقات التركيب",
      shortDescription:
        "أدوات وملحقات لتركيب أنظمة التكييف والتبريد.",
      description:
        "أدوات وملحقات لفنيي تركيب أنظمة التكييف والتبريد. أخبرنا بما تقوم بتركيبه والأدوات أو الملحقات التي تحتاجها لنتحقق من التوفر والسعر.",
      specs: [
        { label: "الاستخدام", value: "تركيب أنظمة التكييف والتبريد" },
        ASK_SIZES_AR,
      ],
    },
    image: "",
  },

  // Refrigerant gases (no composition or safety details: customers are sent to WhatsApp)
  {
    slug: "r22-refrigerant-gas",
    name: "R22 Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R22 (HCFC-22) refrigerant for servicing existing air-conditioning and refrigeration equipment.",
    description:
      "R22 is a refrigerant used in older air-conditioning and refrigeration systems. It is being phased out under the Montreal Protocol, so it is mainly used to service equipment that was built for R22.",
    specs: [],
    specsPrompt: GAS_SPECS_PROMPT,
    ar: {
      name: "غاز التبريد R22",
      shortDescription:
        "غاز التبريد R22 (HCFC-22) لصيانة معدات التكييف والتبريد القائمة.",
      description:
        "R22 غاز تبريد يُستخدم في أنظمة التكييف والتبريد القديمة، ويجري التخلص منه تدريجياً بموجب بروتوكول مونتريال، لذلك يُستخدم أساساً لصيانة المعدات المصممة للعمل به.",
      specsPrompt: GAS_SPECS_PROMPT_AR,
    },
    image: "/products/refrigerant-r22-cylinder.jpg",
  },
  {
    slug: "r410a-refrigerant-gas",
    name: "R410A Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R410A HFC blend refrigerant for modern split, ducted and VRF air conditioners.",
    description:
      "R410A is used in modern split, ducted and VRF air-conditioning systems. It works at a higher pressure than R22, so it needs R410A-rated gauges, hoses and cylinders.",
    specs: [],
    specsPrompt: GAS_SPECS_PROMPT,
    ar: {
      name: "غاز التبريد R410A",
      shortDescription:
        "غاز التبريد R410A من نوع HFC المخلوط لأجهزة التكييف الحديثة: السبليت والمخفية وأنظمة VRF.",
      description:
        "يُستخدم R410A في أنظمة التكييف الحديثة من نوع السبليت والمخفية وأنظمة VRF، ويعمل بضغط أعلى من R22، لذلك يحتاج إلى عدادات وخراطيم وأسطوانات مخصصة لـ R410A.",
      specsPrompt: GAS_SPECS_PROMPT_AR,
    },
    image: "/products/refrigerant-r410a-cylinder.jpg",
  },
  {
    slug: "r134a-refrigerant-gas",
    name: "R134a Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R134a HFC refrigerant for chillers, medium-temperature refrigeration and vehicle air conditioning.",
    description:
      "R134a is used in chillers, medium-temperature refrigeration, domestic refrigerators and vehicle air conditioning.",
    specs: [],
    specsPrompt: GAS_SPECS_PROMPT,
    ar: {
      name: "غاز التبريد R134a",
      shortDescription:
        "غاز التبريد R134a من نوع HFC للمبردات (التشيلر) والتبريد متوسط الحرارة وتكييف السيارات.",
      description:
        "يُستخدم R134a في المبردات (التشيلر) والتبريد متوسط الحرارة والثلاجات المنزلية وتكييف السيارات.",
      specsPrompt: GAS_SPECS_PROMPT_AR,
    },
    image: "/products/refrigerant-r134a-cylinder.jpg",
  },
  {
    slug: "r404a-refrigerant-gas",
    name: "R404A Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R404A HFC blend refrigerant for low and medium-temperature commercial refrigeration.",
    description:
      "R404A is used in low and medium-temperature commercial refrigeration such as cold rooms, freezers and display cabinets.",
    specs: [],
    specsPrompt: GAS_SPECS_PROMPT,
    ar: {
      name: "غاز التبريد R404A",
      shortDescription:
        "غاز التبريد R404A من نوع HFC المخلوط للتبريد التجاري منخفض ومتوسط الحرارة.",
      description:
        "يُستخدم R404A في التبريد التجاري منخفض ومتوسط الحرارة مثل غرف التبريد والفريزرات وثلاجات العرض.",
      specsPrompt: GAS_SPECS_PROMPT_AR,
    },
    image: "/products/refrigerant-r404a-can.jpg",
  },
  {
    slug: "r407c-refrigerant-gas",
    name: "R407C Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R407C HFC blend refrigerant for air conditioning and R22 replacement work.",
    description:
      "R407C is used in air-conditioning systems and as an alternative to R22 in retrofit work. Check compressor oil compatibility before converting an R22 system.",
    specs: [],
    specsPrompt: GAS_SPECS_PROMPT,
    ar: {
      name: "غاز التبريد R407C",
      shortDescription:
        "غاز التبريد R407C من نوع HFC المخلوط للتكييف ولأعمال استبدال R22.",
      description:
        "يُستخدم R407C في أنظمة التكييف وكبديل لـ R22 في أعمال التحويل. تحقّق من توافق زيت الضاغط قبل تحويل نظام يعمل بـ R22.",
      specsPrompt: GAS_SPECS_PROMPT_AR,
    },
    image: "/products/refrigerant-r407c-can.jpg",
  },
  {
    slug: "r32-refrigerant-gas",
    name: "R32 Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R32 refrigerant for newer split air conditioners, with a lower GWP than R410A.",
    description:
      "R32 is used in newer split air conditioners and has a lower global warming potential than R410A.",
    specs: [],
    specsPrompt: GAS_SPECS_PROMPT,
    ar: {
      name: "غاز التبريد R32",
      shortDescription:
        "غاز التبريد R32 لأجهزة السبليت الحديثة، بقدرة أقل على الاحترار العالمي من R410A.",
      description:
        "يُستخدم R32 في أجهزة التكييف السبليت الحديثة، ويتميز بقدرة أقل على الاحترار العالمي مقارنة بـ R410A.",
      specsPrompt: GAS_SPECS_PROMPT_AR,
    },
    image: "",
  },
  {
    slug: "r600-refrigerant-gas",
    name: "R600 / R600a Refrigerant Gas",
    brand: ANY_BRAND,
    category: "hvac",
    shortDescription:
      "R600 / R600a refrigerant gas for small domestic and commercial refrigeration equipment.",
    description:
      "R600 / R600a is used in small domestic and commercial refrigeration equipment. Tell us which one you need and we will confirm what is available.",
    specs: [],
    specsPrompt: GAS_SPECS_PROMPT,
    ar: {
      name: "غاز التبريد R600 / R600a",
      shortDescription:
        "غاز التبريد R600 / R600a لمعدات التبريد الصغيرة المنزلية والتجارية.",
      description:
        "يُستخدم R600 / R600a في معدات التبريد الصغيرة المنزلية والتجارية. أخبرنا أيهما تحتاج لنؤكد المتوفر.",
      specsPrompt: GAS_SPECS_PROMPT_AR,
    },
    image: "/products/refrigerant-r600a-can-box.jpg",
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
    ar: {
      name: "مثبت كيميائي POLY EC",
      shortDescription:
        "مثبت كيميائي من راتنج البوليستر الخالي من الستايرين للأحمال المتوسطة والخفيفة في الخرسانة والطوب.",
      description:
        "Bossong POLY EC راتنج بوليستر ثنائي المكون وخالٍ من الستايرين للتثبيت الكيميائي بأحمال متوسطة إلى خفيفة، يُستخدم في الخرسانة والطوب المصمت والطوب المفرغ. متوفر في خراطيش BCR-400 وBCR-300.",
      specs: [
        { label: "الراتنج", value: "بوليستر، خالٍ من الستايرين، ثنائي المكون" },
        { label: "الحمل", value: "متوسط / خفيف" },
        { label: "المواد الأساسية", value: "خرسانة، طوب مصمت، طوب مفرغ" },
        { label: "العبوات المتوفرة", value: "BCR-400، BCR-300" },
      ],
    },
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
    ar: {
      name: "مثبت كيميائي POLY SF",
      shortDescription:
        "مثبت كيميائي من راتنج البوليستر الخالي من الستايرين للأحمال المتوسطة والثقيلة.",
      description:
        "Bossong POLY SF راتنج بوليستر خالٍ من الستايرين للتثبيت الكيميائي بأحمال متوسطة إلى ثقيلة. يتوفر بعدة عبوات، من خراطيش BCR إلى عبوة Termo والطقم (Kit) ودلو OSR، لتختار العبوة المناسبة لحجم العمل.",
      specs: [
        { label: "الراتنج", value: "بوليستر، خالٍ من الستايرين" },
        { label: "الحمل", value: "متوسط / ثقيل" },
        { label: "العبوات المتوفرة", value: "BCR-400، BCR-300، BCR-165، Termo، Kit، دلو OSR" },
      ],
    },
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
    ar: {
      name: "مثبت كيميائي VINIL",
      shortDescription:
        "مثبت كيميائي للأحمال الثقيلة من راتنج الإيبوكسي أكريلات الخالي من الستايرين للخرسانة والطوب والخشب.",
      description:
        "Bossong VINIL راتنج إيبوكسي أكريلات خالٍ من الستايرين للتثبيت الكيميائي بأحمال ثقيلة في الخرسانة والطوب والخشب. متوفر في خراطيش BCR-400 وBCR-300 وBCR-165 وعبوة Termo والطقم (Kit).",
      specs: [
        { label: "الراتنج", value: "إيبوكسي أكريلات، خالٍ من الستايرين" },
        { label: "الحمل", value: "ثقيل" },
        { label: "المواد الأساسية", value: "خرسانة، طوب، خشب" },
        { label: "العبوات المتوفرة", value: "BCR-400، BCR-300، BCR-165، Termo، Kit" },
      ],
    },
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
    ar: {
      name: "مثبت كيميائي V-PLUS",
      shortDescription:
        "مثبت كيميائي للأحمال الثقيلة من راتنج الفينيل إستر الخالي من الستايرين بخمسة أحجام خراطيش.",
      description:
        "Bossong V-PLUS راتنج فينيل إستر خالٍ من الستايرين للتثبيت الكيميائي بأحمال ثقيلة. متوفر بخمسة أحجام خراطيش: BCR-825 وBCR-400 وBCR-345 وBCR-300 وBCR-165.",
      specs: [
        { label: "الراتنج", value: "فينيل إستر، خالٍ من الستايرين" },
        { label: "الحمل", value: "ثقيل" },
        { label: "العبوات المتوفرة", value: "BCR-825، BCR-400، BCR-345، BCR-300، BCR-165" },
      ],
    },
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
    ar: {
      name: "قنوات مثقبة وملحقاتها",
      shortDescription:
        "نظام قنوات Unistrut المثقبة وملحقاتها لتعليق الأنابيب وحوامل الكابلات والخدمات.",
      description:
        "تشكل قنوات Unistrut المثقبة وملحقاتها نظام تعليق معيارياً للأنابيب وحوامل الكابلات ومجاري الهواء وخدمات المبنى الأخرى. تُقص القنوات حسب الطول وتُركّب بالقطع والصواميل المطابقة، فيمكن بناء الحوامل في الموقع. أخبرنا بنوع القناة والطول والملحقات المطلوبة.",
      specs: [
        { label: "النظام", value: "قناة مثقبة مع ملحقات مطابقة" },
        { label: "الاستخدام المعتاد", value: "حوامل للأنابيب وحوامل الكابلات ومجاري الهواء والخدمات" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/unistrut-channels.jpg",
  },

  {
    slug: "pipe-hangers-and-clamps",
    name: "Pipe Hangers and Clamps",
    brand: "Tembo Seven Star",
    category: "fixing-systems",
    shortDescription:
      "Tembo pipe hangers, clamps and supports for hanging and fixing pipework.",
    description:
      "Tembo Seven Star pipe hangers, clamps and supports for hanging and fixing pipework on MEP installations. Tell us the pipe size, quantity and how the pipe will be supported, and we will confirm availability and price.",
    specs: [
      { label: "Typical use", value: "Hanging and fixing pipework" },
      ASK_SIZES,
    ],
    ar: {
      name: "علّاقات ومشابك الأنابيب",
      shortDescription:
        "علّاقات ومشابك وحوامل Tembo لتعليق الأنابيب وتثبيتها.",
      description:
        "علّاقات ومشابك وحوامل Tembo Seven Star لتعليق وتثبيت الأنابيب في تركيبات الأعمال الكهروميكانيكية. أخبرنا بقطر الأنبوب والكمية وطريقة التعليق لنؤكد التوفر والسعر.",
      specs: [
        { label: "الاستخدام المعتاد", value: "تعليق وتثبيت الأنابيب" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/pipe-hangers-clamps-tembo.jpg",
  },
  {
    slug: "threaded-rods-nuts-washers-and-bolts",
    name: "Threaded Rods, Nuts, Washers and Bolts",
    brand: "Tembo Seven Star",
    category: "fixing-systems",
    shortDescription:
      "Tembo threaded rods with matching nuts, washers and bolts for supports and fixings.",
    description:
      "Tembo Seven Star threaded rods, nuts, washers and bolts for building supports, hangers and general fixings. Send us the diameter, length and quantity you need and we will confirm availability and price.",
    specs: [
      { label: "Includes", value: "Threaded rods, nuts, washers, bolts" },
      { label: "Typical use", value: "Supports, hangers and general fixings" },
      ASK_SIZES,
    ],
    ar: {
      name: "قضبان ملولبة وصواميل وورد ومسامير",
      shortDescription:
        "قضبان Tembo الملولبة مع الصواميل والورد والمسامير المطابقة للحوامل والتثبيت.",
      description:
        "قضبان ملولبة وصواميل وورد ومسامير من Tembo Seven Star لحوامل المباني والعلّاقات وأعمال التثبيت العامة. أرسل لنا القطر والطول والكمية لنؤكد التوفر والسعر.",
      specs: [
        { label: "يشمل", value: "قضبان ملولبة، صواميل، ورد، مسامير" },
        { label: "الاستخدام المعتاد", value: "الحوامل والعلّاقات والتثبيت العام" },
        ASK_SIZES_AR,
      ],
    },
    image: "/products/threaded-rods-nuts-washers-bolts-tembo.jpg",
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
    ar: {
      name: "ماسورة كوندويت مرنة من الحديد المجلفن مغلفة بـ PVC",
      shortDescription:
        "ماسورة كوندويت مرنة من الحديد المجلفن مغلفة بـ PVC للمحركات والأجهزة التي تحتاج إلى عزل الاهتزاز.",
      description:
        "تحمي ماسورة الكوندويت المرنة من الحديد المجلفن المغلفة بـ PVC الكابلات الواصلة إلى المحركات والأجهزة الأخرى التي تحتاج إلى عزل الاهتزاز، إذ تسمح للوصلة النهائية بالحركة دون إجهاد الكابل. اسألنا عن المقاسات والأطوال.",
      specs: [
        { label: "التركيب", value: "حديد مجلفن مرن مغلف بـ PVC" },
        { label: "الاستخدام المعتاد", value: "المحركات والأجهزة التي تحتاج إلى عزل الاهتزاز" },
        ASK_SIZES_AR,
      ],
    },
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
    ar: {
      name: "ماسورة كوندويت حديد مجلفن BS31 الفئة 3",
      shortDescription:
        "ماسورة كوندويت من الحديد المجلفن وفق BS31 الفئة 3 بطول 10 أقدام ومقاسات من 3/4 إنش إلى 2 إنش.",
      description:
        "ماسورة كوندويت من الحديد المجلفن وفق المواصفة BS31 الفئة 3 للتمديدات الكهربائية، بطول 10 أقدام وبأربعة مقاسات. اسألنا عن السعر وعن القطع المطابقة مثل المحولات النحاسية والصواميل والجلب.",
      specs: [
        { label: "المواصفة", value: "BS31، الفئة 3" },
        { label: "المادة", value: "حديد مجلفن" },
        { label: "المقاسات", value: "3/4\" x 10 ft, 1\" x 10 ft, 1-1/2\" x 10 ft, 2\" x 10 ft" },
      ],
    },
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
    ar: {
      name: "محول نحاسي مع صامولة قفل حديد مجلفن",
      shortDescription:
        "محول نحاسي للكوندويت مع صامولة قفل من الحديد المجلفن لإنهاء الماسورة عند العلب واللوحات.",
      description:
        "محول نحاسي مع صامولة قفل من الحديد المجلفن، يُستخدم لإنهاء ماسورة الكوندويت عند علب التوزيع واللوحات وغيرها من الصناديق. اسألنا عن المقاسات المتوفرة المناسبة لماسورتك.",
      specs: [
        { label: "المادة", value: "محول نحاسي مع صامولة قفل حديد مجلفن" },
        { label: "الاستخدام المعتاد", value: "إنهاء الكوندويت عند العلب والصناديق" },
        ASK_SIZES_AR,
      ],
    },
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
    ar: {
      name: "جلبة نحاسية ذكر",
      shortDescription:
        "جلبة نحاسية ذكر لإنهاء أطراف الكوندويت وحماية الكابلات عند نقاط الدخول.",
      description:
        "جلبة نحاسية ذكر لتمديدات الكوندويت، تُستخدم لإنهاء طرف الماسورة وحماية الكابل عند نقطة الدخول. اسألنا عن المقاسات المتوفرة.",
      specs: [
        { label: "المادة", value: "نحاس" },
        { label: "الاستخدام المعتاد", value: "إنهاء الكوندويت وحماية مدخل الكابل" },
        ASK_SIZES_AR,
      ],
    },
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
    ar: {
      name: "كابلات وأسلاك",
      shortDescription:
        "كابلات قدرة ومرنة وكابلات بيانات وألياف ضوئية وأسلاك لمشاريع المباني والمصانع.",
      description:
        "تشكيلة كاملة من الكابلات والأسلاك لخدمات المباني والمشاريع الصناعية، من كابلات القدرة المسلحة للجهد العالي إلى الكابلات المرنة والأسلاك أحادية القلب وكابلات البيانات. أرسل لنا النوع ومقطع القلب والطول المطلوب لنؤكد التوفر والسعر.",
      specs: [
        { label: "قدرة جهد عالٍ / متوسط", value: "كابلات مسلحة معزولة بـ PVC / XLPE" },
        { label: "قدرة جهد منخفض", value: "كابلات معزولة بـ PVC وكابلات مرنة" },
        { label: "مرنة", value: "كابلات مرنة مطاطية" },
        { label: "أسلاك", value: "أسلاك أحادية القلب" },
        { label: "البيانات والاتصالات", value: "كابلات محورية، كابلات بيانات CAT 5/6، كابلات ألياف ضوئية" },
      ],
    },
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
    ar: {
      name: "مفاتيح كهربائية ومعدات التأريض",
      shortDescription:
        "قواطع وعوازل وأجهزة حماية وقوابس صناعية ومعدات تأريض.",
      description:
        "مفاتيح كهربائية وأجهزة حماية ومعدات تأريض للوحات التوزيع ومشاريع الأعمال الكهروميكانيكية. أرسل لنا القيم والعلامات التجارية المطلوبة لنؤكد التوفر والسعر.",
      specs: [
        { label: "القواطع", value: "ACB، MCCB، MCB" },
        { label: "الفصل", value: "مفاتيح رئيسية، عوازل" },
        { label: "الحماية", value: "RCCB، RCBO، مرحلات فقد الطور" },
        { label: "التحكم", value: "كونتاكتورات، مرحلات" },
        { label: "القدرة", value: "محولات" },
        { label: "التوصيل", value: "قوابس ومقابس صناعية" },
        { label: "التأريض", value: "أطقم أعمدة تأريض، أشرطة نحاسية" },
      ],
    },
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
    ar: {
      name: "محامل كروية ذات أخدود عميق",
      shortDescription:
        "محامل NSK الكروية ذات الأخدود العميق للمحركات والمضخات والمراوح والآلات العامة.",
      description:
        "محامل NSK الكروية ذات الأخدود العميق هي أكثر أنواع المحامل استخداماً، إذ تتحمل الأحمال الشعاعية وأحمالاً محورية متوسطة في الاتجاهين وتعمل بسرعات عالية، لذا تنتشر في المحركات الكهربائية والمضخات والمراوح والآلات العامة. أرسل لنا رقم المحمل لنؤكد التوفر والسعر.",
      specs: [
        { label: "النوع", value: "محمل كروي ذو أخدود عميق" },
        { label: "الحمل", value: "شعاعي ومحوري متوسط في الاتجاهين" },
        { label: "الاستخدام المعتاد", value: "المحركات، المضخات، المراوح، الآلات العامة" },
        { label: "أرقام المحامل", value: "أرسل لنا الرقم عبر واتساب" },
      ],
    },
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
    ar: {
      name: "محامل كروية ذات تلامس زاوي",
      shortDescription:
        "محامل NSK الكروية ذات التلامس الزاوي للأحمال الشعاعية والمحورية المشتركة.",
      description:
        "تتحمل محامل NSK الكروية ذات التلامس الزاوي الأحمال الشعاعية والمحورية معاً، مع حمل محوري في اتجاه واحد، وغالباً ما تُركّب أزواجاً لتحمّل الحمل المحوري في الاتجاهين، وتُستخدم في المضخات وصناديق التروس ومحاور الآلات. أرسل لنا رقم المحمل لنؤكد التوفر والسعر.",
      specs: [
        { label: "النوع", value: "محمل كروي ذو تلامس زاوي" },
        { label: "الحمل", value: "شعاعي ومحوري معاً (اتجاه واحد)" },
        { label: "الاستخدام المعتاد", value: "المضخات، صناديق التروس، محاور الآلات" },
        { label: "أرقام المحامل", value: "أرسل لنا الرقم عبر واتساب" },
      ],
    },
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
    ar: {
      name: "محامل كروية ذاتية المحاذاة",
      shortDescription:
        "محامل NSK الكروية ذاتية المحاذاة التي تتحمل عدم استقامة العمود.",
      description:
        "تحتوي محامل NSK الكروية ذاتية المحاذاة على صفين من الكرات تدوران على حلقة خارجية كروية، فتتحمل عدم استقامة العمود وانحراف الحاضن، وتناسب التطبيقات التي يصعب فيها تحقيق محاذاة دقيقة. أرسل لنا رقم المحمل لنؤكد التوفر والسعر.",
      specs: [
        { label: "النوع", value: "محمل كروي ذاتي المحاذاة" },
        { label: "الميزة", value: "يتحمل عدم استقامة العمود" },
        { label: "الاستخدام المعتاد", value: "الأعمدة الطويلة والحواضن التي يصعب محاذاتها" },
        { label: "أرقام المحامل", value: "أرسل لنا الرقم عبر واتساب" },
      ],
    },
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

/** Product text in the requested language (Arabic falls back to English per field). */
export function localizeProduct(product: Product, locale: Locale) {
  const ar = locale === "ar" ? product.ar : undefined;
  return {
    name: ar?.name ?? product.name,
    shortDescription: ar?.shortDescription ?? product.shortDescription,
    description: ar?.description ?? product.description,
    specs: ar?.specs ?? product.specs,
    specsPrompt: ar ? ar.specsPrompt : product.specsPrompt,
  };
}

/**
 * Plain text used by the on-site search. Always includes the English text, so
 * Arabic visitors can still search "R410A" or "copper"; adds the Arabic on /ar.
 */
export function productSearchText(product: Product, locale: Locale = "en") {
  const parts = [
    product.name,
    product.brand,
    product.shortDescription,
    product.description,
    ...product.specs.map((s) => `${s.label} ${s.value}`),
  ];
  if (locale === "ar" && product.ar) {
    const t = product.ar;
    parts.push(t.name, t.shortDescription, t.description, ...(t.specs ?? []).map((s) => `${s.label} ${s.value}`));
  }
  return parts.join(" ").toLowerCase();
}
