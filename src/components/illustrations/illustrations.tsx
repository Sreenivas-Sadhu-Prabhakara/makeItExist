'use client';

import { motion } from 'framer-motion';

/**
 * Animated hero illustration showing a laptop/browser with floating tech elements.
 * Represents the idea → build → launch flow visually.
 */
export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Laptop body */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Laptop screen */}
          <rect x="80" y="50" width="340" height="220" rx="16" fill="#142240" stroke="#1B3A6B" strokeWidth="2" />
          {/* Screen inner */}
          <rect x="92" y="62" width="316" height="196" rx="8" fill="#0A1628" />

          {/* Code lines on screen */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Browser dots */}
            <circle cx="110" cy="78" r="4" fill="#FF6B6B" opacity="0.8" />
            <circle cx="124" cy="78" r="4" fill="#FFD93D" opacity="0.8" />
            <circle cx="138" cy="78" r="4" fill="#6BCB77" opacity="0.8" />
            <rect x="160" y="74" width="120" height="8" rx="4" fill="#1B3A6B" opacity="0.5" />

            {/* Separator line */}
            <rect x="92" y="92" width="316" height="1" fill="#1B3A6B" opacity="0.5" />

            {/* Code lines */}
            <rect x="108" y="106" width="60" height="6" rx="3" fill="#C8A951" opacity="0.7" />
            <rect x="176" y="106" width="100" height="6" rx="3" fill="#2A5298" opacity="0.5" />
            <rect x="108" y="120" width="40" height="6" rx="3" fill="#2A5298" opacity="0.4" />
            <rect x="156" y="120" width="140" height="6" rx="3" fill="#8B95A5" opacity="0.3" />
            <rect x="124" y="134" width="80" height="6" rx="3" fill="#C8A951" opacity="0.5" />
            <rect x="212" y="134" width="60" height="6" rx="3" fill="#2A5298" opacity="0.4" />
            <rect x="124" y="148" width="120" height="6" rx="3" fill="#8B95A5" opacity="0.3" />
            <rect x="108" y="162" width="50" height="6" rx="3" fill="#2A5298" opacity="0.4" />
            <rect x="166" y="162" width="90" height="6" rx="3" fill="#C8A951" opacity="0.5" />

            {/* Preview panel on right */}
            <rect x="300" y="102" width="96" height="80" rx="6" fill="#142240" stroke="#1B3A6B" strokeWidth="1" />
            <rect x="308" y="110" width="80" height="8" rx="4" fill="#C8A951" opacity="0.5" />
            <rect x="308" y="124" width="60" height="4" rx="2" fill="#8B95A5" opacity="0.3" />
            <rect x="308" y="132" width="70" height="4" rx="2" fill="#8B95A5" opacity="0.3" />
            <rect x="308" y="144" width="50" height="16" rx="4" fill="#C8A951" opacity="0.3" />
            <rect x="308" y="168" width="32" height="8" rx="4" fill="#C8A951" opacity="0.6" />

            {/* Deploy button */}
            <motion.g
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <rect x="108" y="200" width="100" height="32" rx="8" fill="url(#deployBtnGrad)" />
              <text x="130" y="221" fill="#0A1628" fontSize="12" fontWeight="700" fontFamily="sans-serif">🚀 Deploy</text>
            </motion.g>

            {/* Status bar */}
            <rect x="108" y="240" width="200" height="6" rx="3" fill="#142240" />
            <motion.rect
              x="108"
              y="240"
              height="6"
              rx="3"
              fill="url(#progressGrad)"
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.g>

          {/* Laptop base */}
          <path d="M60 270 L80 270 Q80 270 80 270 L420 270 Q420 270 420 270 L440 270 L460 290 Q462 294 458 296 L42 296 Q38 294 40 290 Z" fill="#142240" stroke="#1B3A6B" strokeWidth="1.5" />
          <rect x="200" y="272" width="100" height="8" rx="4" fill="#1B3A6B" opacity="0.5" />
        </motion.g>

        {/* Floating elements */}
        {/* React / component icon */}
        <motion.g
          animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="55" cy="120" r="24" fill="#142240" stroke="#C8A951" strokeWidth="1.5" opacity="0.9" />
          <text x="42" y="126" fontSize="20">⚛️</text>
        </motion.g>

        {/* AI / brain icon */}
        <motion.g
          animate={{ y: [6, -6, 6], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <circle cx="458" cy="100" r="24" fill="#142240" stroke="#2A5298" strokeWidth="1.5" opacity="0.9" />
          <text x="445" y="106" fontSize="20">🧠</text>
        </motion.g>

        {/* Mobile icon */}
        <motion.g
          animate={{ y: [-6, 6, -6], x: [-3, 3, -3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <circle cx="445" cy="220" r="20" fill="#142240" stroke="#C8A951" strokeWidth="1.5" opacity="0.9" />
          <text x="434" y="226" fontSize="16">📱</text>
        </motion.g>

        {/* Rocket */}
        <motion.g
          animate={{ y: [-10, 10, -10], x: [5, -5, 5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <circle cx="65" cy="230" r="18" fill="#142240" stroke="#C8A951" strokeWidth="1.5" opacity="0.9" />
          <text x="55" y="236" fontSize="16">🚀</text>
        </motion.g>

        {/* Gold sparkle particles */}
        <motion.circle
          cx="420" cy="50"
          r="3"
          fill="#C8A951"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <motion.circle
          cx="90" cy="40"
          r="2.5"
          fill="#E8CC6E"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="470" cy="170"
          r="2"
          fill="#C8A951"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.circle
          cx="30" cy="170"
          r="2.5"
          fill="#E8CC6E"
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />

        {/* Connection lines (dotted) */}
        <motion.line
          x1="79" y1="120" x2="92" y2="140"
          stroke="#C8A951" strokeWidth="1" strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
        <motion.line
          x1="434" y1="100" x2="408" y2="130"
          stroke="#2A5298" strokeWidth="1" strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />

        <defs>
          <linearGradient id="deployBtnGrad" x1="108" y1="200" x2="208" y2="232">
            <stop stopColor="#C8A951" />
            <stop offset="1" stopColor="#E8CC6E" />
          </linearGradient>
          <linearGradient id="progressGrad" x1="108" y1="240" x2="268" y2="246">
            <stop stopColor="#C8A951" />
            <stop offset="1" stopColor="#6BCB77" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Animated illustration for the "How It Works" section
 * showing the flow from idea → build → launch
 */
export function ProcessFlowIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      <svg viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto hidden lg:block">
        {/* Flow path */}
        <motion.path
          d="M60 60 Q200 60 200 60 Q280 60 280 60 Q400 60 400 60 Q520 60 520 60 Q600 60 600 60 Q740 60 740 60"
          stroke="url(#flowGrad)"
          strokeWidth="2"
          strokeDasharray="8 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Arrow markers */}
        {[200, 370, 540, 700].map((x, i) => (
          <motion.g
            key={x}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.3, duration: 0.4 }}
          >
            <polygon
              points={`${x - 6},54 ${x + 6},60 ${x - 6},66`}
              fill="#C8A951"
              opacity="0.6"
            />
          </motion.g>
        ))}

        {/* Animated dots traveling along path */}
        <motion.circle
          r="4"
          fill="#C8A951"
          animate={{
            cx: [60, 200, 400, 600, 740],
            cy: [60, 60, 60, 60, 60],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />

        <defs>
          <linearGradient id="flowGrad" x1="60" y1="60" x2="740" y2="60">
            <stop stopColor="#C8A951" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#C8A951" stopOpacity="0.6" />
            <stop offset="1" stopColor="#6BCB77" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Service card illustration for different service types
 */
export function ServiceIllustration({ type, className = '' }: { type: string; className?: string }) {
  const illustrations: Record<string, React.ReactNode> = {
    Globe: (
      <svg viewBox="0 0 80 80" fill="none" className={className}>
        <circle cx="40" cy="40" r="30" stroke="#C8A951" strokeWidth="1.5" opacity="0.3" />
        <ellipse cx="40" cy="40" rx="14" ry="30" stroke="#C8A951" strokeWidth="1.5" opacity="0.3" />
        <line x1="10" y1="40" x2="70" y2="40" stroke="#C8A951" strokeWidth="1" opacity="0.2" />
        <line x1="40" y1="10" x2="40" y2="70" stroke="#C8A951" strokeWidth="1" opacity="0.2" />
        <line x1="14" y1="26" x2="66" y2="26" stroke="#C8A951" strokeWidth="0.75" opacity="0.15" />
        <line x1="14" y1="54" x2="66" y2="54" stroke="#C8A951" strokeWidth="0.75" opacity="0.15" />
      </svg>
    ),
    Smartphone: (
      <svg viewBox="0 0 80 80" fill="none" className={className}>
        <rect x="22" y="8" width="36" height="64" rx="8" stroke="#C8A951" strokeWidth="1.5" opacity="0.3" />
        <rect x="26" y="16" width="28" height="44" rx="2" stroke="#C8A951" strokeWidth="0.75" opacity="0.2" />
        <circle cx="40" cy="66" r="3" stroke="#C8A951" strokeWidth="1" opacity="0.3" />
        <rect x="34" y="10" width="12" height="3" rx="1.5" fill="#C8A951" opacity="0.2" />
      </svg>
    ),
    Layout: (
      <svg viewBox="0 0 80 80" fill="none" className={className}>
        <rect x="10" y="14" width="60" height="52" rx="6" stroke="#C8A951" strokeWidth="1.5" opacity="0.3" />
        <rect x="10" y="14" width="60" height="12" rx="6" fill="#C8A951" opacity="0.08" />
        <rect x="14" y="30" width="18" height="32" rx="3" stroke="#C8A951" strokeWidth="0.75" opacity="0.2" />
        <rect x="36" y="30" width="30" height="14" rx="3" stroke="#C8A951" strokeWidth="0.75" opacity="0.2" />
        <rect x="36" y="48" width="30" height="14" rx="3" stroke="#C8A951" strokeWidth="0.75" opacity="0.2" />
      </svg>
    ),
    Brain: (
      <svg viewBox="0 0 80 80" fill="none" className={className}>
        <circle cx="40" cy="36" r="20" stroke="#C8A951" strokeWidth="1.5" opacity="0.3" />
        <path d="M30 36 Q35 28 40 36 Q45 44 50 36" stroke="#C8A951" strokeWidth="1" opacity="0.3" />
        <circle cx="34" cy="32" r="2" fill="#C8A951" opacity="0.3" />
        <circle cx="46" cy="32" r="2" fill="#C8A951" opacity="0.3" />
        <path d="M32 60 L40 50 L48 60" stroke="#C8A951" strokeWidth="1" opacity="0.2" />
        <line x1="40" y1="50" x2="40" y2="56" stroke="#C8A951" strokeWidth="1" opacity="0.2" />
        {/* Neural connection dots */}
        <circle cx="26" cy="28" r="1.5" fill="#C8A951" opacity="0.2" />
        <circle cx="54" cy="28" r="1.5" fill="#C8A951" opacity="0.2" />
        <circle cx="40" cy="18" r="1.5" fill="#C8A951" opacity="0.2" />
        <line x1="28" y1="28" x2="34" y2="32" stroke="#C8A951" strokeWidth="0.5" opacity="0.2" />
        <line x1="52" y1="28" x2="46" y2="32" stroke="#C8A951" strokeWidth="0.5" opacity="0.2" />
      </svg>
    ),
    Sparkles: (
      <svg viewBox="0 0 80 80" fill="none" className={className}>
        <path d="M40 10 L44 30 L64 34 L44 38 L40 58 L36 38 L16 34 L36 30 Z" stroke="#C8A951" strokeWidth="1.5" opacity="0.3" />
        <path d="M20 56 L22 64 L30 66 L22 68 L20 76 L18 68 L10 66 L18 64 Z" stroke="#C8A951" strokeWidth="1" opacity="0.2" />
        <path d="M58 12 L60 18 L66 20 L60 22 L58 28 L56 22 L50 20 L56 18 Z" stroke="#C8A951" strokeWidth="1" opacity="0.2" />
      </svg>
    ),
  };

  return illustrations[type] || illustrations['Sparkles'];
}

/**
 * About section illustration - hands building together
 */
export function CommunityIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Central building / tower */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Base platform */}
          <rect x="120" y="220" width="160" height="12" rx="6" fill="#142240" stroke="#1B3A6B" strokeWidth="1" />
          
          {/* Building */}
          <rect x="160" y="100" width="80" height="120" rx="8" fill="#142240" stroke="#C8A951" strokeWidth="1.5" opacity="0.8" />
          
          {/* Windows */}
          <rect x="172" y="112" width="16" height="16" rx="3" fill="#C8A951" opacity="0.2" />
          <rect x="212" y="112" width="16" height="16" rx="3" fill="#2A5298" opacity="0.3" />
          <rect x="172" y="140" width="16" height="16" rx="3" fill="#2A5298" opacity="0.3" />
          <rect x="212" y="140" width="16" height="16" rx="3" fill="#C8A951" opacity="0.2" />
          <rect x="172" y="168" width="16" height="16" rx="3" fill="#C8A951" opacity="0.2" />
          <rect x="212" y="168" width="16" height="16" rx="3" fill="#2A5298" opacity="0.3" />
          
          {/* Door */}
          <rect x="188" y="192" width="24" height="28" rx="4" fill="#C8A951" opacity="0.2" stroke="#C8A951" strokeWidth="0.75" />
          
          {/* Antenna/spire */}
          <line x1="200" y1="100" x2="200" y2="76" stroke="#C8A951" strokeWidth="1.5" opacity="0.6" />
          <motion.circle
            cx="200"
            cy="72"
            r="4"
            fill="#C8A951"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>

        {/* People silhouettes */}
        {[
          { x: 80, delay: 0.3 },
          { x: 130, delay: 0.5 },
          { x: 260, delay: 0.4 },
          { x: 310, delay: 0.6 },
        ].map((person, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: person.delay }}
          >
            <circle cx={person.x} cy="210" r="8" fill="#C8A951" opacity="0.3" />
            <rect x={person.x - 6} y="222" width="12" height="16" rx="4" fill="#C8A951" opacity="0.2" />
          </motion.g>
        ))}

        {/* Connection arcs between people and building */}
        <motion.path
          d="M88 218 Q140 180 160 160"
          stroke="#C8A951"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
        <motion.path
          d="M312 218 Q260 180 240 160"
          stroke="#C8A951"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1 }}
        />

        {/* Floating achievement icons */}
        <motion.g
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="60" cy="120" r="16" fill="#142240" stroke="#C8A951" strokeWidth="1" opacity="0.8" />
          <text x="52" y="126" fontSize="14">💡</text>
        </motion.g>

        <motion.g
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <circle cx="340" cy="100" r="16" fill="#142240" stroke="#2A5298" strokeWidth="1" opacity="0.8" />
          <text x="332" y="106" fontSize="14">🎓</text>
        </motion.g>

        <motion.g
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <circle cx="350" cy="180" r="14" fill="#142240" stroke="#C8A951" strokeWidth="1" opacity="0.8" />
          <text x="343" y="185" fontSize="12">🏆</text>
        </motion.g>

        {/* Sparkles */}
        <motion.circle cx="100" cy="80" r="2" fill="#C8A951" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="300" cy="70" r="2" fill="#E8CC6E" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.7 }} />
        <motion.circle cx="370" cy="140" r="1.5" fill="#C8A951" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1.2 }} />

        {/* Ground line */}
        <line x1="40" y1="246" x2="360" y2="246" stroke="#1B3A6B" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}

/**
 * Weekend calendar illustration for the schedule section
 */
export function WeekendCalendarIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[200px]">
        {/* Calendar body */}
        <rect x="20" y="30" width="160" height="120" rx="12" fill="#142240" stroke="#1B3A6B" strokeWidth="1.5" />
        {/* Calendar header */}
        <rect x="20" y="30" width="160" height="32" rx="12" fill="url(#calHeaderGrad)" />
        <rect x="20" y="50" width="160" height="12" fill="url(#calHeaderGrad)" />
        {/* Calendar rings */}
        <rect x="60" y="22" width="8" height="20" rx="4" fill="#C8A951" opacity="0.8" />
        <rect x="132" y="22" width="8" height="20" rx="4" fill="#C8A951" opacity="0.8" />

        {/* Day headers */}
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <text
            key={i}
            x={38 + i * 21}
            y="56"
            fill={i >= 5 ? '#C8A951' : '#8B95A5'}
            fontSize="9"
            fontWeight={i >= 5 ? '700' : '500'}
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {day}
          </text>
        ))}

        {/* Calendar grid - highlighting weekends */}
        {[
          [1, 2, 3, 4, 5, 6, 7],
          [8, 9, 10, 11, 12, 13, 14],
          [15, 16, 17, 18, 19, 20, 21],
          [22, 23, 24, 25, 26, 27, 28],
        ].map((week, wi) =>
          week.map((day, di) => {
            const isWeekend = di >= 5;
            return (
              <g key={`${wi}-${di}`}>
                {isWeekend && (
                  <rect
                    x={28 + di * 21 - 8}
                    y={66 + wi * 22 - 8}
                    width="16"
                    height="16"
                    rx="4"
                    fill="#C8A951"
                    opacity="0.15"
                  />
                )}
                <text
                  x={28 + di * 21}
                  y={66 + wi * 22 + 4}
                  fill={isWeekend ? '#C8A951' : '#8B95A5'}
                  fontSize="9"
                  fontWeight={isWeekend ? '700' : '400'}
                  textAnchor="middle"
                  fontFamily="sans-serif"
                  opacity={isWeekend ? 1 : 0.5}
                >
                  {day}
                </text>
              </g>
            );
          })
        )}

        <defs>
          <linearGradient id="calHeaderGrad" x1="20" y1="30" x2="180" y2="62">
            <stop stopColor="#C8A951" />
            <stop offset="1" stopColor="#A88B3A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
