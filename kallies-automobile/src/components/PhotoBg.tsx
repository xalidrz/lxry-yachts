/** Photo background with a flat + gradient scrim (no blur) so white text keeps AA contrast. Parent must be `relative isolate overflow-hidden`. */
export function PhotoBg({ src, position = "center", strength = "normal" }: { src: string; position?: "center" | "low"; strength?: "normal" | "strong" }) {
  const flat = strength === "strong" ? "bg-[#05080f]/70" : "bg-[#05080f]/60";
  return (
    <>
      <img src={src} alt="" width={1376} height={768} loading="lazy" decoding="async" className={`absolute inset-0 -z-20 size-full object-cover ${position === "low" ? "object-[50%_60%]" : "object-center"}`} />
      <div className={`absolute inset-0 -z-10 ${flat}`} aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#05080f]/90 via-[#05080f]/60 to-[#05080f]/20" aria-hidden />
    </>
  );
}
