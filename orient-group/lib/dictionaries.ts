/**
 * Interface text in English and Modern Standard Arabic. Product, category and
 * engraving text lives with its data in /data.
 * Both languages share one shape, so a missing Arabic string is a type error.
 */
import type { Locale } from "./i18n";

const en = {
  siteName: "Orient Group Gulf",
  legalName: "Orient Group Gulf General Trading Co.",
  skipToContent: "Skip to content",
  nav: {
    main: "Main",
    mobile: "Mobile",
    products: "Products",
    about: "About",
    brands: "Brands",
    engraving: "Engraving",
    contact: "Contact",
    home: "Home",
    allProducts: "All products",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    callUs: (n: string) => `Call us on ${n}`,
    switchTo: "Switch language",
  },
  common: {
    askForPrice: "Ask for price",
    askPrice: "Ask price",
    askOnWhatsApp: "Ask on WhatsApp",
    askUsOnWhatsApp: "Ask us on WhatsApp",
    chatOnWhatsApp: "Chat on WhatsApp",
    call: "Call",
    callNumber: (n: string) => `Call ${n}`,
    callOrient: (n: string) => `Call Orient Group on ${n}`,
    browseProducts: "Browse products",
    variousBrands: "Various brands",
    breadcrumb: "Breadcrumb",
    askForPriceAria: (label: string) => `Ask for price: ${label} on WhatsApp`,
    chatAria: "Chat with Orient Group on WhatsApp",
    stockMore: "We stock more than is listed here.",
    product: (n: number) => (n === 1 ? "1 product" : `${n} products`),
  },
  hero: {
    eyebrow: "Shuwaikh Industrial Area, Kuwait",
    title: "HVAC, electrical and fixing materials for Kuwait's contractors",
    text: "Copper pipes, refrigerant gases, insulation, conduits, chemical anchors and engraved labels, supplied from Shuwaikh Industrial Area since 2010.",
    quote: "Request a quote on WhatsApp",
    trust: (year: number, brands: number) => [`Since ${year}`, `${brands} brands`, "Shuwaikh Industrial Area"],
    imageAlt: "Refrigerant gas cylinders supplied by Orient Group Gulf in Kuwait",
  },
  home: {
    categoriesEyebrow: "Products",
    categoriesTitle: "What we supply",
    categoriesText:
      "Four product ranges for MEP contractors, HVAC installers and maintenance companies. Open a range to see every product and ask for a price.",
    gasesEyebrow: "Refrigerant gases",
    gasesTitle: "Refrigerant gases",
    gasesText:
      "Tap a gas to ask for the price and the cylinder sizes available. It opens WhatsApp with your question ready to send.",
    gasesMore: "More about each gas:",
    gasAria: (gas: string) => `Ask for price and cylinder sizes for ${gas} on WhatsApp`,
    brandsEyebrow: "Brands",
    brandsTitle: "Brands we supply",
    brandsText:
      "Trusted names in HVAC, fixing systems, electrical and bearings, all available from one supplier in Shuwaikh.",
    brandsLink: "See each brand and its products",
    engravingEyebrow: "Engraving",
    engravingTitle: "Engraving and labelling for MEP projects",
    engravingText:
      "Tags and labels for valves, cables and switchboards. Send us your list with the text, sizes and quantities and we will quote on WhatsApp.",
    sendLabelList: "Send your label list",
    howToOrderLabels: "How to order labels",
    testimonialsEyebrow: "Customers",
    testimonialsTitle: "What our customers say",
  },
  contact: {
    eyebrow: "Contact",
    title: "Visit us or send your list",
    text: "Send your material list on WhatsApp for a quote, call the office, or visit us in Shuwaikh Industrial Area.",
    needPrice: "Need a price?",
    needPriceText:
      "We do not sell online. Message us the products and quantities you need and we reply with a price and delivery time.",
    pageTitle: "Contact Orient Group Gulf",
    pageIntro: "Call, message on WhatsApp, email or visit us in Shuwaikh Industrial Area.",
    address: "Address",
    office: "Office",
    fax: "Fax",
    mobile: "Mobile",
    email: "Email",
    sales: "Sales",
    import: "Import",
    general: "General",
    opensMaps: "(opens Google Maps in a new tab)",
  },
  footer: {
    blurb:
      "HVAC, electrical and fixing materials for MEP contractors, HVAC installers and maintenance companies in Kuwait. Supplying from Shuwaikh Industrial Area since 2010.",
    quickLinks: "Quick links",
    products: "Products",
    contact: "Contact",
    quickLinksAria: "Footer quick links",
    categoriesAria: "Footer product categories",
  },
  products: {
    title: "Products",
    intro:
      "Product reference for contractors and installers. We do not sell online: ask for a price on WhatsApp and we reply with price and delivery.",
    searchLabel: "Search products by name, brand or description",
    searchPlaceholder: "Search products, brands, e.g. R410A or Bossong",
    clearSearch: "Clear search",
    filterAria: "Filter by category",
    all: "All",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total} products`,
    noneFound: "No products found",
    nothingMatched: (q: string) => `Nothing matched “${q}”.`,
    categoriesAria: "Product categories",
    categoryCta: "We stock more than is listed here. Tell us what you need and we will check availability.",
  },
  product: {
    brand: "Brand",
    category: "Category",
    pricesNote: "Prices are not listed online. Ask on WhatsApp and we reply with the price and delivery time.",
    description: "Description",
    specifications: "Specifications",
    defaultSpecsPrompt: "Contact us for specifications, sizes and availability.",
    related: "Related products",
  },
  brandsPage: {
    title: "Brands we supply",
    intro: (n: number) =>
      `${n} brands across HVAC, fixing systems, electrical and bearings. Not every product is listed online, so ask us about any brand.`,
    askWhich: (b: string) => `Ask us which ${b} products are available.`,
    askAbout: (b: string) => `Ask about ${b}`,
    askAboutAria: (b: string) => `Ask about ${b} products on WhatsApp`,
    logoAlt: (b: string) => `${b} logo`,
  },
  engravingPage: {
    title: "Engraving and labelling for MEP projects",
    intro:
      "Valve tags, cable markers, switchboard labels, signs and stickers. Send us your list on WhatsApp and we reply with a price and delivery time.",
    checklistTitle: "What to include in your label list",
    checklistText:
      "A complete list gets you an accurate price on the first reply. A spreadsheet, a photo of a schedule or a typed list all work.",
    readyTitle: "Ready to send it?",
    readyText: "Open WhatsApp, attach your list and send. We confirm the price and delivery time.",
  },
  about: {
    title: "About Orient Group Gulf",
    intro: "A Kuwaiti supplier of HVAC, electrical and fixing materials, trading from Shuwaikh Industrial Area since 2010.",
    storyTitle: "Our story",
    story: [
      "Orient Group Gulf General Trading Co. supplies MEP contractors, HVAC installers and maintenance companies across Kuwait. We have traded from Shuwaikh Industrial Area since 2010.",
      "We keep the materials site teams ask for every day: copper pipe and coils, refrigerant gases, insulation and ducting, chemical anchors and support systems, conduit, cables and switchgear, and NSK bearings. We also supply engraved valve tags, cable markers and switchboard labels for project handover.",
      "We do not sell online. Customers send us their list on WhatsApp or call the office, and we reply with prices and a delivery time.",
    ],
    valuesTitle: "How we work",
    values: [
      {
        title: "Fast quotes on WhatsApp",
        text: "Send your material list as a message, photo or spreadsheet and we reply with prices, without forms or accounts.",
      },
      {
        title: "Genuine branded stock",
        text: "We supply named brands such as Venture, Bossong, Unistrut and NSK, so you get the product your specification calls for.",
      },
      {
        title: "Delivery on schedule",
        text: "We agree a delivery time with you when we quote and plan around your site programme.",
      },
    ],
    brandsTitle: "Brands we supply",
    brandsLink: "See all brands",
    projectsTitle: "Projects we've labelled for",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
  },
  wa: {
    general: "Hello Orient Group, I would like to ask about your products.",
    quote: "Hello Orient Group, I would like to request a quote. Here is my list of materials:",
    labelList:
      "Hello Orient Group, I would like a quote for engraving and labelling. I will send my label list here.",
    price: (label: string) => `Hello Orient Group, please send me a price for: ${label}`,
    specs: (label: string) =>
      `Hello Orient Group, please send me the specifications and availability for: ${label}`,
    gas: (gas: string) =>
      `Hello Orient Group, please send me the price and available cylinder sizes for ${gas} refrigerant gas.`,
    search: (term: string) =>
      `Hello Orient Group, I am looking for: ${term}. Do you have it in stock? Please send me a price.`,
    brand: (b: string) => `Hello Orient Group, which ${b} products do you supply? Please send me prices.`,
  },
  seo: {
    homeTitle: "HVAC, Electrical and Fixing Materials Supplier in Kuwait | Orient Group Gulf",
    homeDescription:
      "Copper pipes, refrigerant gases, insulation, conduits, chemical anchors and engraved labels for Kuwait contractors. Orient Group Gulf, Shuwaikh Industrial Area, since 2010.",
    titleSuffix: "Orient Group Gulf Kuwait",
    defaultDescription:
      "Orient Group Gulf supplies HVAC, electrical and fixing materials to MEP contractors in Kuwait from Shuwaikh Industrial Area since 2010.",
    productsTitle: "HVAC, Electrical and Fixing Products",
    productsDescription:
      "Browse every product Orient Group Gulf supplies in Kuwait: copper pipes, refrigerant gases, chemical anchors, conduits, cables, switchgear and NSK bearings. Ask for price on WhatsApp.",
    categoryTitle: (c: string) => `${c} Products in Kuwait`,
    categoryDescription: (c: string, summary: string) =>
      `${c} products in Kuwait: ${summary} Ask for price on WhatsApp from Orient Group Gulf, Shuwaikh.`,
    productDescriptionSuffix: "Ask for price on WhatsApp from Orient Group Gulf, Shuwaikh, Kuwait.",
    brandsTitle: "Brands We Supply in Kuwait",
    brandsDescription:
      "Venture, Bossong, NSK, Unistrut, Copeland and more: the HVAC, fixing, electrical and bearing brands Orient Group Gulf supplies from Shuwaikh, Kuwait.",
    engravingTitle: "Engraving and Labelling for MEP Projects",
    engravingDescription:
      "Engraved valve tags, cable markers, switchboard labels, signs and stickers for MEP projects in Kuwait. Send your label list to Orient Group Gulf on WhatsApp.",
    contactTitle: "Contact",
    contactDescription:
      "Contact Orient Group Gulf in Shuwaikh Industrial Area, Kuwait: office 2492 1705, mobile 9095 0709, WhatsApp, email and map. HVAC, electrical and fixing materials.",
    aboutTitle: "About Us",
    aboutDescription:
      "Orient Group Gulf General Trading Co. supplies HVAC, electrical and fixing materials to MEP contractors, HVAC installers and maintenance companies in Kuwait since 2010.",
    notFoundTitle: "Page not found",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  siteName: "أورينت جروب جلف",
  legalName: "شركة أورينت جروب جلف للتجارة العامة",
  skipToContent: "انتقل إلى المحتوى",
  nav: {
    main: "القائمة الرئيسية",
    mobile: "قائمة الجوال",
    products: "المنتجات",
    about: "من نحن",
    brands: "العلامات التجارية",
    engraving: "الحفر والملصقات",
    contact: "اتصل بنا",
    home: "الرئيسية",
    allProducts: "جميع المنتجات",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    language: "اللغة",
    callUs: (n: string) => `اتصل بنا على ${n}`,
    switchTo: "تغيير اللغة",
  },
  common: {
    askForPrice: "اطلب السعر",
    askPrice: "اطلب السعر",
    askOnWhatsApp: "اسأل عبر واتساب",
    askUsOnWhatsApp: "اسألنا عبر واتساب",
    chatOnWhatsApp: "تواصل عبر واتساب",
    call: "اتصال",
    callNumber: (n: string) => `اتصل ${n}`,
    callOrient: (n: string) => `اتصل بأورينت جروب على ${n}`,
    browseProducts: "تصفح المنتجات",
    variousBrands: "علامات تجارية متعددة",
    breadcrumb: "مسار التنقل",
    askForPriceAria: (label: string) => `اطلب سعر ${label} عبر واتساب`,
    chatAria: "تواصل مع أورينت جروب عبر واتساب",
    stockMore: "لدينا منتجات أكثر مما هو معروض هنا.",
    product: (n: number) => (n === 1 ? "منتج واحد" : n === 2 ? "منتجان" : n <= 10 ? `${n} منتجات` : `${n} منتجًا`),
  },
  hero: {
    eyebrow: "منطقة الشويخ الصناعية، الكويت",
    title: "مواد التكييف والكهرباء والتثبيت لمقاولي الكويت",
    text: "أنابيب نحاسية، غازات تبريد، عزل، مواسير كوندويت، مثبتات كيميائية وملصقات محفورة، نوردها من منطقة الشويخ الصناعية منذ عام 2010.",
    quote: "اطلب عرض سعر عبر واتساب",
    trust: (year: number, brands: number) => [`منذ ${year}`, `${brands} علامة تجارية`, "منطقة الشويخ الصناعية"],
    imageAlt: "أسطوانات غاز التبريد التي توردها أورينت جروب جلف في الكويت",
  },
  home: {
    categoriesEyebrow: "المنتجات",
    categoriesTitle: "ما نورّده",
    categoriesText:
      "أربع فئات من المنتجات لمقاولي الأعمال الكهروميكانيكية وفنيي تركيب التكييف وشركات الصيانة. افتح أي فئة لرؤية جميع منتجاتها وطلب السعر.",
    gasesEyebrow: "غازات التبريد",
    gasesTitle: "غازات التبريد",
    gasesText: "اضغط على أي غاز لطلب السعر وأحجام الأسطوانات المتوفرة، وسيفتح واتساب ورسالتك جاهزة للإرسال.",
    gasesMore: "المزيد عن كل غاز:",
    gasAria: (gas: string) => `اطلب سعر وأحجام أسطوانات ${gas} عبر واتساب`,
    brandsEyebrow: "العلامات التجارية",
    brandsTitle: "العلامات التجارية التي نوردها",
    brandsText: "أسماء موثوقة في التكييف وأنظمة التثبيت والكهرباء والمحامل، متوفرة جميعها لدى مورد واحد في الشويخ.",
    brandsLink: "اطّلع على كل علامة تجارية ومنتجاتها",
    engravingEyebrow: "الحفر والملصقات",
    engravingTitle: "الحفر والملصقات لمشاريع الأعمال الكهروميكانيكية",
    engravingText:
      "لوحات تعريف وملصقات للصمامات والكابلات ولوحات التوزيع. أرسل لنا قائمتك بالنصوص والمقاسات والكميات وسنرسل لك عرض السعر عبر واتساب.",
    sendLabelList: "أرسل قائمة الملصقات",
    howToOrderLabels: "طريقة طلب الملصقات",
    testimonialsEyebrow: "عملاؤنا",
    testimonialsTitle: "ماذا يقول عملاؤنا",
  },
  contact: {
    eyebrow: "اتصل بنا",
    title: "زُرنا أو أرسل قائمتك",
    text: "أرسل قائمة المواد عبر واتساب لتحصل على عرض سعر، أو اتصل بالمكتب، أو زُرنا في منطقة الشويخ الصناعية.",
    needPrice: "تحتاج إلى سعر؟",
    needPriceText: "لا نبيع عبر الإنترنت. أرسل لنا المنتجات والكميات التي تحتاجها، وسنرد عليك بالسعر وموعد التسليم.",
    pageTitle: "اتصل بأورينت جروب جلف",
    pageIntro: "اتصل بنا أو راسلنا عبر واتساب أو البريد الإلكتروني، أو زُرنا في منطقة الشويخ الصناعية.",
    address: "العنوان",
    office: "المكتب",
    fax: "فاكس",
    mobile: "الجوال",
    email: "البريد الإلكتروني",
    sales: "المبيعات",
    import: "الاستيراد",
    general: "عام",
    opensMaps: "(يفتح خرائط Google في نافذة جديدة)",
  },
  footer: {
    blurb:
      "مواد التكييف والكهرباء والتثبيت لمقاولي الأعمال الكهروميكانيكية وفنيي تركيب التكييف وشركات الصيانة في الكويت. نورّد من منطقة الشويخ الصناعية منذ عام 2010.",
    quickLinks: "روابط سريعة",
    products: "المنتجات",
    contact: "اتصل بنا",
    quickLinksAria: "روابط سريعة في التذييل",
    categoriesAria: "فئات المنتجات في التذييل",
  },
  products: {
    title: "المنتجات",
    intro:
      "دليل منتجات للمقاولين وفنيي التركيب. لا نبيع عبر الإنترنت: اطلب السعر عبر واتساب وسنرد عليك بالسعر وموعد التسليم.",
    searchLabel: "ابحث في المنتجات بالاسم أو العلامة التجارية أو الوصف",
    searchPlaceholder: "ابحث عن منتج أو علامة تجارية، مثل R410A أو Bossong",
    clearSearch: "مسح البحث",
    filterAria: "تصفية حسب الفئة",
    all: "الكل",
    showing: (shown: number, total: number) => `عرض ${shown} من أصل ${total} منتج`,
    noneFound: "لم يتم العثور على منتجات",
    nothingMatched: (q: string) => `لا توجد نتائج مطابقة لـ «${q}».`,
    categoriesAria: "فئات المنتجات",
    categoryCta: "لدينا منتجات أكثر مما هو معروض هنا. أخبرنا بما تحتاجه وسنتحقق من التوفر.",
  },
  product: {
    brand: "العلامة التجارية",
    category: "الفئة",
    pricesNote: "الأسعار غير معروضة على الموقع. اسأل عبر واتساب وسنرد عليك بالسعر وموعد التسليم.",
    description: "الوصف",
    specifications: "المواصفات",
    defaultSpecsPrompt: "تواصل معنا لمعرفة المواصفات والمقاسات والتوفر.",
    related: "منتجات ذات صلة",
  },
  brandsPage: {
    title: "العلامات التجارية التي نوردها",
    intro: (n: number) =>
      `${n} علامة تجارية في التكييف وأنظمة التثبيت والكهرباء والمحامل. لا تُعرض جميع المنتجات على الموقع، لذا اسألنا عن أي علامة تجارية.`,
    askWhich: (b: string) => `اسألنا عن منتجات ${b} المتوفرة.`,
    askAbout: (b: string) => `اسأل عن ${b}`,
    askAboutAria: (b: string) => `اسأل عن منتجات ${b} عبر واتساب`,
    logoAlt: (b: string) => `شعار ${b}`,
  },
  engravingPage: {
    title: "الحفر والملصقات لمشاريع الأعمال الكهروميكانيكية",
    intro:
      "لوحات تعريف الصمامات، علامات الكابلات، ملصقات لوحات التوزيع، اللافتات والملصقات. أرسل لنا قائمتك عبر واتساب وسنرد عليك بالسعر وموعد التسليم.",
    checklistTitle: "ما يجب تضمينه في قائمة الملصقات",
    checklistText:
      "القائمة الكاملة تمنحك سعراً دقيقاً من أول رد. يمكنك إرسالها كجدول بيانات أو صورة لجدول المشروع أو قائمة مكتوبة.",
    readyTitle: "جاهز لإرسالها؟",
    readyText: "افتح واتساب وأرفق قائمتك ثم أرسلها، وسنؤكد لك السعر وموعد التسليم.",
  },
  about: {
    title: "عن أورينت جروب جلف",
    intro: "مورد كويتي لمواد التكييف والكهرباء والتثبيت، نعمل من منطقة الشويخ الصناعية منذ عام 2010.",
    storyTitle: "قصتنا",
    story: [
      "تورّد شركة أورينت جروب جلف للتجارة العامة المواد لمقاولي الأعمال الكهروميكانيكية وفنيي تركيب التكييف وشركات الصيانة في جميع أنحاء الكويت، ونعمل من منطقة الشويخ الصناعية منذ عام 2010.",
      "نوفّر المواد التي تطلبها فرق المواقع يومياً: الأنابيب واللفائف النحاسية، غازات التبريد، العزل ومجاري الهواء، المثبتات الكيميائية وأنظمة التعليق، مواسير الكوندويت والكابلات والمفاتيح الكهربائية، ومحامل NSK. كما نورّد لوحات تعريف الصمامات المحفورة وعلامات الكابلات وملصقات لوحات التوزيع لتسليم المشاريع.",
      "لا نبيع عبر الإنترنت. يرسل لنا العملاء قوائمهم عبر واتساب أو يتصلون بالمكتب، فنرد عليهم بالأسعار وموعد التسليم.",
    ],
    valuesTitle: "طريقة عملنا",
    values: [
      {
        title: "عروض أسعار سريعة عبر واتساب",
        text: "أرسل قائمة المواد كرسالة أو صورة أو جدول بيانات، وسنرد عليك بالأسعار دون نماذج أو حسابات.",
      },
      {
        title: "منتجات أصلية من علامات معروفة",
        text: "نورّد علامات تجارية معروفة مثل Venture وBossong وUnistrut وNSK، لتحصل على المنتج الذي تطلبه مواصفات مشروعك.",
      },
      {
        title: "التسليم في الموعد",
        text: "نتفق معك على موعد التسليم عند تقديم عرض السعر، ونخطط وفق جدول عمل موقعك.",
      },
    ],
    brandsTitle: "العلامات التجارية التي نوردها",
    brandsLink: "عرض جميع العلامات التجارية",
    projectsTitle: "مشاريع قمنا بتجهيز ملصقاتها",
  },
  notFound: {
    title: "الصفحة غير موجودة",
    text: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
  },
  wa: {
    general: "مرحباً أورينت جروب، أود الاستفسار عن منتجاتكم.",
    quote: "مرحباً أورينت جروب، أود طلب عرض سعر. هذه قائمة المواد المطلوبة:",
    labelList: "مرحباً أورينت جروب، أود الحصول على عرض سعر للحفر والملصقات. سأرسل قائمة الملصقات هنا.",
    price: (label: string) => `مرحباً أورينت جروب، أرجو إرسال سعر: ${label}`,
    specs: (label: string) => `مرحباً أورينت جروب، أرجو إرسال المواصفات والتوفر لـ: ${label}`,
    gas: (gas: string) => `مرحباً أورينت جروب، أرجو إرسال السعر وأحجام الأسطوانات المتوفرة لغاز التبريد ${gas}.`,
    search: (term: string) => `مرحباً أورينت جروب، أبحث عن: ${term}. هل هو متوفر لديكم؟ أرجو إرسال السعر.`,
    brand: (b: string) => `مرحباً أورينت جروب، ما منتجات ${b} التي تورّدونها؟ أرجو إرسال الأسعار.`,
  },
  seo: {
    homeTitle: "مورد مواد التكييف والكهرباء والتثبيت في الكويت | أورينت جروب جلف",
    homeDescription:
      "أنابيب نحاسية، غازات تبريد، عزل، مواسير كوندويت، مثبتات كيميائية وملصقات محفورة لمقاولي الكويت. أورينت جروب جلف، منطقة الشويخ الصناعية، منذ 2010.",
    titleSuffix: "أورينت جروب جلف الكويت",
    defaultDescription:
      "تورّد أورينت جروب جلف مواد التكييف والكهرباء والتثبيت لمقاولي الأعمال الكهروميكانيكية في الكويت من منطقة الشويخ الصناعية منذ 2010.",
    productsTitle: "منتجات التكييف والكهرباء والتثبيت",
    productsDescription:
      "تصفح جميع منتجات أورينت جروب جلف في الكويت: أنابيب نحاسية، غازات تبريد، مثبتات كيميائية، مواسير كوندويت، كابلات، مفاتيح كهربائية ومحامل NSK. اطلب السعر عبر واتساب.",
    categoryTitle: (c: string) => `${c} في الكويت`,
    categoryDescription: (c: string, summary: string) =>
      `${c} في الكويت: ${summary} اطلب السعر عبر واتساب من أورينت جروب جلف، الشويخ.`,
    productDescriptionSuffix: "اطلب السعر عبر واتساب من أورينت جروب جلف، الشويخ، الكويت.",
    brandsTitle: "العلامات التجارية التي نوردها في الكويت",
    brandsDescription:
      "Venture وBossong وNSK وUnistrut وCopeland وغيرها: علامات التكييف والتثبيت والكهرباء والمحامل التي توردها أورينت جروب جلف من الشويخ، الكويت.",
    engravingTitle: "الحفر والملصقات لمشاريع الأعمال الكهروميكانيكية",
    engravingDescription:
      "لوحات تعريف صمامات محفورة، علامات كابلات، ملصقات لوحات توزيع، لافتات وملصقات لمشاريع الكويت. أرسل قائمة الملصقات إلى أورينت جروب جلف عبر واتساب.",
    contactTitle: "اتصل بنا",
    contactDescription:
      "تواصل مع أورينت جروب جلف في منطقة الشويخ الصناعية، الكويت: المكتب 2492 1705، الجوال 9095 0709، واتساب، البريد الإلكتروني والخريطة.",
    aboutTitle: "من نحن",
    aboutDescription:
      "تورّد شركة أورينت جروب جلف للتجارة العامة مواد التكييف والكهرباء والتثبيت لمقاولي الأعمال الكهروميكانيكية وفنيي التكييف وشركات الصيانة في الكويت منذ 2010.",
    notFoundTitle: "الصفحة غير موجودة",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
