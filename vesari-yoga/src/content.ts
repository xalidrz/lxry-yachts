/**
 * Everything the visitor reads on the site lives in this one file.
 * Edit the text, phone number, address or prices here; no other file needs to change.
 */
import { Flower2, Heart, Leaf, Sparkles, User, type LucideIcon } from "lucide-react";

export const site = {
  name: "Vesari Yoga",
  tagline: "Espace bien-être & détente",
  /** Shown in the browser tab and in Google results. */
  seoTitle: "Vesari Yoga – Bien-être & détente à Orléans",
  seoDescription:
    "Vesari Yoga, espace bien-être et détente à Orléans : un lieu calme pour prendre un vrai moment pour vous. 5 Rue Vieille Levée, 45100 Orléans.",
  phoneDisplay: "+33 6 37 80 18 35",
  /** International format with no spaces; used for the tel: links. */
  phoneHref: "+33637801835",
  address: { street: "5 Rue Vieille Levée", postalCode: "45100", city: "Orléans", country: "France" },
  /** Only "Fermeture 20h" is shown. Add real opening hours here once they are confirmed. */
  hours: "Fermeture 20h",
  hoursNote: "Ouvert tous les jours",
};

const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${site.address.country}`;
export const links = {
  tel: `tel:${site.phoneHref}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&hl=fr&z=16&output=embed`,
  fullAddress,
};

export const hero = {
  eyebrow: "YOGA & BIEN-ÊTRE",
  titleLine1: "Un moment de calme,",
  titleLine2: "rien que pour vous.",
  subtitle:
    "Un espace bien-être et détente à Orléans, pour relâcher la pression et vous ressourcer.",
  callLabel: "Nous appeler",
  directionsLabel: "Voir l'itinéraire",
  /** Photo file: drop your own picture at public/photos/hero.jpg. */
  image: "/photos/hero.jpg",
  imageAlt: "Salle de pratique calme et lumineuse, avec un parquet en bois et la lumière douce du soleil",
  scrollLabel: "DÉCOUVRIR",
  trust: [
    { icon: User, lines: ["Cours pour", "tous les niveaux"] },
    { icon: Flower2, lines: ["Un espace calme", "et apaisant"] },
    { icon: Heart, lines: ["Un accueil", "chaleureux"] },
  ] satisfies { icon: LucideIcon; lines: [string, string] }[],
};

export const about = {
  eyebrow: "À propos",
  title: "Un lieu pour *ralentir*",
  paragraphs: [
    "Chez Vesari Yoga, tout est pensé pour vous aider à relâcher la pression du quotidien : une atmosphère apaisante, une lumière douce et un accueil chaleureux dès la porte franchie.",
    "Que vous veniez pour bouger en douceur, respirer ou simplement faire une pause, cet espace de bien-être et de détente est le vôtre, au cœur d'Orléans.",
  ],
};

export type Offer = { icon: LucideIcon; title: string; description: string; price: string };
export const offers = {
  eyebrow: "Soins",
  title: "Prendre *soin* de soi",
  /** PLACEHOLDERS: replace each title, description and price with the real offer. */
  items: [
    {
      icon: Leaf,
      title: "Cours de yoga",
      description: "Des séances pour retrouver souplesse, souffle et sérénité.",
      price: "Tarif sur demande",
    },
    {
      icon: Heart,
      title: "Soins bien-être",
      description: "Un moment de douceur pour relâcher les tensions et se ressourcer.",
      price: "Tarif sur demande",
    },
    {
      icon: Sparkles,
      title: "Moments de détente",
      description: "Une parenthèse calme pour déconnecter et se recentrer.",
      price: "Tarif sur demande",
    },
  ] satisfies Offer[],
  cta: "Appelez-nous pour en savoir plus",
};

export const gallery = {
  eyebrow: "Galerie",
  title: "L'esprit du *lieu*",
  /**
   * TODO: replace with real photos of the studio.
   * The files below are temporary placeholders in public/photos (gallery-1.jpg … gallery-3.jpg).
   * Keep the same file names, or change `src` here. Portraits and poses are cropped from the top,
   * so faces and shoulders stay in frame.
   */
  photos: [
    { src: "/photos/gallery-1.jpg", width: 1000, height: 1000, alt: "Coin de détente baigné de lumière douce, avec un parquet en bois" },
    { src: "/photos/gallery-2.jpg", width: 1100, height: 733, alt: "Rayons de soleil sur un mur clair et un parquet chaleureux" },
    { src: "/photos/gallery-3.jpg", width: 1100, height: 733, alt: "Ambiance calme et apaisante dans la salle, avec une plante verte" },
  ],
};

export const reviews = {
  eyebrow: "Avis",
  title: "Ce qu'ils en *disent*",
  rating: "5,0",
  count: "1 avis",
  source: "Avis Google",
  items: [
    {
      author: "Thibaud D.",
      stars: 5,
      text: "Une expérience merveilleuse ! Un accueil chaleureux, une atmosphère apaisante et un soin réalisé avec douceur et professionnalisme. Je repars avec une sensation de légèreté et de détente.",
    },
  ],
};

export const contact = {
  eyebrow: "Contact & accès",
  title: "Venez nous *voir*",
  intro: "Un appel suffit pour poser vos questions ou réserver votre moment.",
  callLabel: "Appeler",
  directionsLabel: "Voir l'itinéraire",
  mapTitle: "Carte Google Maps : Vesari Yoga, 5 Rue Vieille Levée, Orléans",
};

/** Caption under the logo in the navbar. */
export const navCaption = "YOGA & BIEN-ÊTRE";

export const nav = [
  { href: "#apropos", label: "À propos" },
  { href: "#soins", label: "Soins" },
  { href: "#galerie", label: "Galerie" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
];
