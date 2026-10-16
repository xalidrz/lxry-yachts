/** Simple line drawing of three ovals (concept emblem). */
export function NavEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" width="40" height="27" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <ellipse cx="24" cy="16" rx="22" ry="14.5" />
      <ellipse cx="24" cy="16" rx="13.5" ry="7.5" />
      <ellipse cx="24" cy="16.5" rx="6" ry="12" />
    </svg>
  );
}
