/**
 * Brands we supply. `logo` is a square image in /public/brands; without one the
 * tile shows the brand name as text.
 *
 *
 * `ownBackground` marks logos that come with their own coloured background. The
 * Brands page grid shows those centred at about 80% of the white tile.
 */
export type Brand = { name: string; logo?: string; ownBackground?: boolean };

export const brands: Brand[] = [
  { name: "Venture", logo: "/brands/venture.png" },
  { name: "Bossong", logo: "/brands/bossong.png", ownBackground: true },
  { name: "NSK", logo: "/brands/nsk.png" },
  { name: "Unistrut", logo: "/brands/unistrut.png" },
  { name: "Copeland", logo: "/brands/copeland.png" },
  { name: "Foster", logo: "/brands/foster.png", ownBackground: true },
  { name: "Aeroduct", logo: "/brands/aeroduct.png" },
  { name: "Thermoflex", logo: "/brands/thermoflex.png" },
  { name: "Duraflex", logo: "/brands/duraflex.png" },
  { name: "Flexiva", logo: "/brands/flexiva.png" },
  { name: "Saswell", logo: "/brands/saswell.png" },
  { name: "Harris", logo: "/brands/harris.png" },
  { name: "Amber", logo: "/brands/amber.png", ownBackground: true },
  { name: "Goodspec", logo: "/brands/goodspec.png", ownBackground: true },
  { name: "Super Impex", logo: "/brands/ace-super-impex.png" },
  { name: "Tembo Seven Star", logo: "/brands/tembo-seven-star.png", ownBackground: true },
];
