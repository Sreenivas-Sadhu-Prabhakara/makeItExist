'use client';

/**
 * AIM-inspired logo mark for the Make It Exist platform.
 * Features the AIM shield/crest motif with gold and navy branding.
 */
export function AimLogoMark({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Make It Exist logo"
    >
      {/* Shield background */}
      <path
        d="M32 4L8 16V34C8 48.36 18.4 57.92 32 60C45.6 57.92 56 48.36 56 34V16L32 4Z"
        fill="url(#shieldGrad)"
        stroke="url(#shieldStroke)"
        strokeWidth="1.5"
      />
      {/* Inner shield detail */}
      <path
        d="M32 10L14 20V34C14 45.2 22.4 52.8 32 54.4C41.6 52.8 50 45.2 50 34V20L32 10Z"
        fill="url(#innerGrad)"
        opacity="0.5"
      />
      {/* Star / sparkle at center */}
      <path
        d="M32 22L34.5 28.5L41 29L36 33.5L37.5 40L32 36.5L26.5 40L28 33.5L23 29L29.5 28.5L32 22Z"
        fill="url(#starGrad)"
      />
      {/* Horizontal accent lines */}
      <rect x="20" y="44" width="24" height="1.5" rx="0.75" fill="#C8A951" opacity="0.6" />
      <rect x="24" y="47" width="16" height="1.5" rx="0.75" fill="#C8A951" opacity="0.4" />
      <defs>
        <linearGradient id="shieldGrad" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C8A951" />
          <stop offset="1" stopColor="#A88B3A" />
        </linearGradient>
        <linearGradient id="shieldStroke" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8CC6E" />
          <stop offset="1" stopColor="#A88B3A" />
        </linearGradient>
        <linearGradient id="innerGrad" x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A1628" />
          <stop offset="1" stopColor="#1B3A6B" />
        </linearGradient>
        <linearGradient id="starGrad" x1="23" y1="22" x2="41" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FAFBFC" />
          <stop offset="1" stopColor="#E8CC6E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Full logo with text for the Make It Exist platform.
 */
export function AimLogoFull({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <AimLogoMark size={40} />
      <div className="flex flex-col">
        <span className="text-lg sm:text-xl font-bold text-aim-navy dark:text-aim-white leading-tight tracking-tight">
          Make It <span className="bg-clip-text text-transparent bg-gradient-to-r from-aim-gold via-aim-gold-light to-aim-gold">Exist</span>
        </span>
        <span className="text-[10px] sm:text-xs text-aim-gray font-medium tracking-[0.15em] uppercase hidden sm:block">
          Asian Institute of Management
        </span>
      </div>
    </div>
  );
}
