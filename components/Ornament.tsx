export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      className={`orn ${className}`}
      width="140"
      height="22"
      aria-hidden
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="0" y1="10" x2="40" y2="10" opacity="0.55" />
        <line x1="80" y1="10" x2="120" y2="10" opacity="0.55" />
        <circle cx="52" cy="10" r="2.2" />
        <circle cx="68" cy="10" r="2.2" />
        <path d="M46 10 C 50 4, 54 4, 60 10 C 66 16, 70 16, 74 10" />
      </g>
    </svg>
  );
}

export function OrnamentDouble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 28" className={`orn ${className}`} width="220" height="28" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="0" y1="14" x2="80" y2="14" opacity="0.5" />
        <line x1="140" y1="14" x2="220" y2="14" opacity="0.5" />
        <path d="M86 14 C 92 2, 100 2, 110 14 C 120 26, 128 26, 134 14" />
        <circle cx="110" cy="14" r="1.6" fill="currentColor" />
      </g>
    </svg>
  );
}
