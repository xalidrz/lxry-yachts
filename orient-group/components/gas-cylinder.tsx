/**
 * Small refrigerant cylinder drawing in the gas's standard cylinder colour.
 * `band` adds the red band used to mark flammable refrigerants.
 */
export function GasCylinder({
  id,
  color,
  band = false,
  className,
}: {
  /** Unique per page, used for the clip path id. */
  id: string;
  color: string;
  band?: boolean;
  className?: string;
}) {
  const clip = `cyl-${id}`;
  const body = "M16 50 Q16 32 40 32 Q64 32 64 50 V104 Q64 112 56 112 H24 Q16 112 16 104 Z";
  return (
    <svg viewBox="0 0 80 124" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <path d={body} />
        </clipPath>
      </defs>
      {/* valve */}
      <rect x="35" y="10" width="10" height="14" rx="2" fill="#8A8C8F" />
      <rect x="32" y="6" width="16" height="6" rx="2" fill="#6E7073" />
      {/* guard ring */}
      <path
        d="M24 36 V20 Q24 12 32 12 H48 Q56 12 56 20 V36 H49 V22 Q49 19 46 19 H34 Q31 19 31 22 V36 Z"
        fill={color}
      />
      <path
        d="M24 36 V20 Q24 12 32 12 H48 Q56 12 56 20 V36 H49 V22 Q49 19 46 19 H34 Q31 19 31 22 V36 Z"
        fill="#000"
        fillOpacity="0.14"
      />
      {/* body */}
      <path d={body} fill={color} />
      <g clipPath={`url(#${clip})`}>
        {band && <rect x="0" y="54" width="80" height="9" fill="#D7262E" />}
        <rect x="26" y="70" width="28" height="20" rx="2" fill="#fff" fillOpacity="0.85" />
        <rect x="30" y="75" width="20" height="2.5" rx="1" fill="#1F1F1F" fillOpacity="0.35" />
        <rect x="30" y="81" width="14" height="2.5" rx="1" fill="#1F1F1F" fillOpacity="0.25" />
        <rect x="52" y="30" width="14" height="90" fill="#000" fillOpacity="0.1" />
        <rect x="22" y="40" width="5" height="64" rx="2.5" fill="#fff" fillOpacity="0.38" />
      </g>
      {/* foot ring */}
      <rect x="20" y="110" width="40" height="8" rx="2" fill={color} />
      <rect x="20" y="110" width="40" height="8" rx="2" fill="#000" fillOpacity="0.22" />
    </svg>
  );
}
