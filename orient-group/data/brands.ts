/**
 * Brands we supply. `logo` is a square image in /public/brands; without one the
 * tile shows the brand name as text.
 *
 * Tembo Seven Star has a logo file (public/brands/tembo-seven-star.png) but it is
 * not used: its yellow background conflicts with the site's no-yellow rule.
 * Add `logo: "/brands/tembo-seven-star.png"` below to show it anyway.
 */
export type Brand = { name: string; logo?: string };

export const brands: Brand[] = [
  { name: "Venture", logo: "/brands/venture.png" },
  { name: "Bossong", logo: "/brands/bossong.png" },
  { name: "NSK", logo: "/brands/nsk.png" },
  { name: "Unistrut", logo: "/brands/unistrut.png" },
  { name: "Copeland", logo: "/brands/copeland.png" },
  { name: "Foster", logo: "/brands/foster.png" },
  { name: "Aeroduct", logo: "/brands/aeroduct.png" },
  { name: "Thermoflex", logo: "/brands/thermoflex.png" },
  { name: "Duraflex", logo: "/brands/duraflex.png" },
  { name: "Flexiva", logo: "/brands/flexiva.png" },
  { name: "Saswell", logo: "/brands/saswell.png" },
  { name: "Harris", logo: "/brands/harris.png" },
  { name: "Amber", logo: "/brands/amber.png" },
  { name: "Goodspec", logo: "/brands/goodspec.png" },
  { name: "Super Impex", logo: "/brands/ace-super-impex.png" },
  { name: "Tembo Seven Star" },
];
