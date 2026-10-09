/** Scroll-reveal props for framer-motion: fade + slide up, staggered by index. */
export const revealProps = (index: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -60px 0px" },
  transition: { duration: 0.55, delay: Math.min(index, 8) * 0.08, ease: [0.22, 1, 0.36, 1] as const },
});
