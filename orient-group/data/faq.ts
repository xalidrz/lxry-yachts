import type { Locale } from "@/lib/i18n";
import { ADDRESS_LINES, ADDRESS_LINES_AR, OFFICE_PHONE, OPENING_HOURS } from "@/lib/site";

export type Faq = { q: string; a: string };

/**
 * The eight questions for /faq (the first three also appear on the home page).
 * Opening hours and address come from lib/site.ts so they are edited in one place.
 */
export function getFaqs(locale: Locale): Faq[] {
  if (locale === "ar") {
    return [
      {
        q: "هل توردون بالجملة للمقاولين؟",
        a: "نعم. نورّد مقاولي الأعمال الكهروميكانيكية ومركّبي أنظمة التكييف وشركات الصيانة بالكميات التي تحتاجها مشاريعهم. أرسل لنا الكميات المطلوبة وسنرد عليك بالسعر.",
      },
      {
        q: "هل يمكنني إرسال قائمة بعدة منتجات دفعة واحدة؟",
        a: "نعم. أضف المنتجات إلى قائمة عرض السعر في الموقع ثم اضغط «إرسال القائمة عبر واتساب»، أو أرسل لنا قائمتك مباشرة على واتساب، وسنرد عليك بسعر كل صنف.",
      },
      {
        q: "هل توصّلون إلى مواقع العمل في الكويت؟",
        a: "نعم، نوصّل داخل الكويت. أرسل لنا موقع العمل مع قائمة المواد وسنؤكد لك موعد التسليم عند إرسال السعر.",
      },
      {
        q: "ما هي غازات التبريد المتوفرة لديكم؟",
        a: "نوفّر غازات التبريد R22 وR32 وR410A وR404A وR407C وR134a وR600/R600a. اسأل عن أحجام الأسطوانات المتوفرة وسنؤكد لك التوفر والسعر.",
      },
      {
        q: "هل تنفّذون لوحات صمامات وملصقات محفورة؟",
        a: "نعم. نحفر لوحات الصمامات وعلامات الكابلات وملصقات لوحات التوزيع واللافتات والملصقات. أرسل قائمة النصوص عبر واتساب لنحصل منك على التفاصيل ونرسل لك عرض السعر.",
      },
      {
        q: "كيف أحصل على السعر؟",
        a: "لا نبيع عبر الإنترنت ولا نعرض الأسعار في الموقع. أضف المنتجات إلى قائمة عرض السعر وأرسلها عبر واتساب، أو اتصل بنا، وسنرد عليك بالسعر وموعد التسليم.",
      },
      {
        q: "ما هي ساعات العمل؟",
        a: `${OPENING_HOURS.ar.join("، ")}. للتواصل في أي وقت أرسل لنا رسالة على واتساب.`,
      },
      {
        q: "أين يقع المحل؟",
        a: `${ADDRESS_LINES_AR.join(" ")}. هاتف المكتب: ${OFFICE_PHONE.display}.`,
      },
    ];
  }
  return [
    {
      q: "Do you supply in bulk to contractors?",
      a: "Yes. We supply MEP contractors, HVAC installers and maintenance companies in the quantities their projects need. Send us the quantities you need and we reply with a price.",
    },
    {
      q: "Can I send a list with many products at once?",
      a: "Yes. Add products to the quote list on this site and press “Send list on WhatsApp”, or message your list to us directly on WhatsApp. We reply with a price for each item.",
    },
    {
      q: "Do you deliver to job sites in Kuwait?",
      a: "Yes, we deliver across Kuwait. Send us the site location with your material list and we confirm the delivery time when we send the price.",
    },
    {
      q: "Which refrigerant gases do you stock?",
      a: "R22, R32, R410A, R404A, R407C, R134a and R600/R600a. Ask for the cylinder sizes you need and we confirm availability and price.",
    },
    {
      q: "Can you make engraved valve tags and labels?",
      a: "Yes. We engrave valve tags, cable markers, switchboard labels, signs and stickers. Send your label list on WhatsApp and we send you a quote.",
    },
    {
      q: "How do I get a price?",
      a: "We do not sell online and we do not publish prices on the site. Add products to the quote list and send it on WhatsApp, or call us, and we reply with a price and delivery time.",
    },
    {
      q: "What are your opening hours?",
      a: `${OPENING_HOURS.en.join(". ")}. You can message us on WhatsApp at any time.`,
    },
    {
      q: "Where is your shop?",
      a: `${ADDRESS_LINES.join(" ")}. Office: ${OFFICE_PHONE.display}.`,
    },
  ];
}

/** Home page shows the first three. */
export const HOME_FAQ_COUNT = 3;

