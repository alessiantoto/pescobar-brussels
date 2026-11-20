import React from 'react';

interface AccentProps {
  className?: string;
}

/**
 * Refined architectural octopus tentacle line-art motif in Brushed Champagne Gold.
 * Designed as an ambient luxury texture (never heavy clipart), pointer-events-none.
 */
export function OctopusCornerTentacles({
  position = 'bottom-right',
  className = '',
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}) {
  const positionClasses = {
    'top-left': 'top-0 left-0 rotate-180',
    'top-right': 'top-0 right-0 -scale-y-100',
    'bottom-left': 'bottom-0 left-0 -scale-x-100',
    'bottom-right': 'bottom-0 right-0',
  }[position];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none overflow-hidden ${positionClasses} ${className}`}
    >
      <svg
        viewBox="0 0 420 420"
        fill="none"
        className="h-56 w-56 animate-tentacle-sway sm:h-80 sm:w-80 lg:h-[380px] lg:w-[380px]"
      >
        <defs>
          <linearGradient id={`tentacle-gold-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC286" stopOpacity="0.02" />
            <stop offset="45%" stopColor="#C8A96A" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C8A96A" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id={`tentacle-soft-${position}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A96A" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#DFC286" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        {/* Primary sweeping tentacle curve */}
        <path
          d="M420 410C340 390 295 335 280 265C266 200 225 170 175 182C132 192 118 238 148 264C172 284 208 265 198 236C191 216 168 214 162 228"
          stroke={`url(#tentacle-gold-${position})`}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M420 368C355 348 318 302 304 242C289 175 245 142 186 154"
          stroke={`url(#tentacle-gold-${position})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 6"
        />

        {/* Delicate suction cup rings along the inner arc */}
        {[
          { cx: 288, cy: 294, r: 4.5 },
          { cx: 274, cy: 254, r: 4 },
          { cx: 256, cy: 218, r: 3.5 },
          { cx: 230, cy: 190, r: 3 },
          { cx: 196, cy: 180, r: 2.5 },
          { cx: 162, cy: 188, r: 2.2 },
          { cx: 141, cy: 212, r: 2 },
        ].map((cup, idx) => (
          <circle
            key={idx}
            cx={cup.cx}
            cy={cup.cy}
            r={cup.r}
            stroke="#DFC286"
            strokeOpacity="0.32"
            strokeWidth="1.2"
          />
        ))}

        {/* Secondary rising tentacle */}
        <path
          d="M415 290C362 248 352 178 378 118C398 72 372 30 330 38C294 45 282 86 310 106C328 118 352 102 342 82"
          stroke={`url(#tentacle-soft-${position})`}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {[
          { cx: 365, cy: 222, r: 4 },
          { cx: 358, cy: 180, r: 3.5 },
          { cx: 366, cy: 140, r: 3 },
          { cx: 378, cy: 102, r: 2.6 },
          { cx: 368, cy: 66, r: 2.2 },
        ].map((cup, idx) => (
          <circle
            key={idx}
            cx={cup.cx}
            cy={cup.cy}
            r={cup.r}
            stroke="#C8A96A"
            strokeOpacity="0.28"
            strokeWidth="1.1"
          />
        ))}

        {/* Lower horizontal tentacle curl */}
        <path
          d="M295 420C235 385 162 385 102 408C62 422 25 395 44 358C59 330 98 336 96 364"
          stroke={`url(#tentacle-soft-${position})`}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {[
          { cx: 235, cy: 398, r: 3.8 },
          { cx: 185, cy: 392, r: 3.2 },
          { cx: 138, cy: 397, r: 2.8 },
          { cx: 92, cy: 405, r: 2.4 },
        ].map((cup, idx) => (
          <circle
            key={idx}
            cx={cup.cx}
            cy={cup.cy}
            r={cup.r}
            stroke="#DFC286"
            strokeOpacity="0.24"
            strokeWidth="1.1"
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Refined mini octopus crown crest for wizards, form headers, and editorial cards.
 */
export function OctopusCardCrest({ className = '' }: AccentProps) {
  return (
    <div
      aria-hidden="true"
      className={`inline-flex items-center gap-2 select-none ${className}`}
    >
      <svg
        viewBox="0 0 48 32"
        fill="none"
        className="h-6 w-9 text-[#C8A96A]"
      >
        <path
          d="M24 5C18.5 5 15 9.2 15.8 14.2C16.2 16.5 18 18 20 19.2C16 21 10.5 19.8 7 23.2C4.8 25.3 5.8 28.5 8.5 28.5C11 28.5 12 25.8 10 24.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M24 5C29.5 5 33 9.2 32.2 14.2C31.8 16.5 30 18 28 19.2C32 21 37.5 19.8 41 23.2C43.2 25.3 42.2 28.5 39.5 28.5C37 28.5 36 25.8 38 24.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M21.5 19.8C20 23.5 17 27.5 13 28.8"
          stroke="#DFC286"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M26.5 19.8C28 23.5 31 27.5 35 28.8"
          stroke="#DFC286"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="21.2" cy="11.5" r="1.2" fill="#DFC286" />
        <circle cx="26.8" cy="11.5" r="1.2" fill="#DFC286" />
      </svg>
    </div>
  );
}

/**
 * Vertical undulating tentacle line-art edge along lateral walls of panels/sections.
 */
export function OctopusTentacleSide({
  side = 'right',
  className = '',
}: {
  side?: 'left' | 'right';
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 select-none overflow-hidden ${
        side === 'left' ? 'left-0 -scale-x-100' : 'right-0'
      } ${className}`}
    >
      <svg
        viewBox="0 0 180 520"
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-28 animate-tentacle-sway opacity-40 sm:w-40"
      >
        <path
          d="M180 40C115 95 145 190 95 260C55 315 110 390 68 455C48 485 18 492 22 462C25 440 52 444 48 465"
          stroke="#C8A96A"
          strokeOpacity="0.45"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M180 120C140 165 162 245 122 308C92 355 130 420 104 495"
          stroke="#DFC286"
          strokeOpacity="0.24"
          strokeWidth="1.2"
          strokeDasharray="2 5"
          strokeLinecap="round"
        />
        {[
          { cx: 126, cy: 138, r: 3.5 },
          { cx: 122, cy: 184, r: 3.2 },
          { cx: 105, cy: 232, r: 3 },
          { cx: 88, cy: 282, r: 2.6 },
          { cx: 84, cy: 336, r: 2.5 },
          { cx: 82, cy: 392, r: 2.2 },
        ].map((cup, idx) => (
          <circle
            key={idx}
            cx={cup.cx}
            cy={cup.cy}
            r={cup.r}
            stroke="#DFC286"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Wide atmospheric tentacle wave mural tailored for footer and full-bleed bands.
 */
export function OctopusFooterMural({ className = '' }: AccentProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden select-none ${className}`}
    >
      <svg
        viewBox="0 0 1200 220"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        className="h-36 w-full opacity-[0.14] sm:h-48"
      >
        <path
          d="M-20 205C140 140 270 190 420 135C560 85 690 165 860 110C1000 65 1110 145 1220 95"
          stroke="#C8A96A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M90 220C210 158 340 208 495 162C635 120 770 192 945 142C1070 105 1150 165 1220 130"
          stroke="#DFC286"
          strokeWidth="1.3"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />
        <path
          d="M940 218C990 155 1065 110 1135 128C1175 138 1172 178 1136 176C1110 174 1110 148 1130 146"
          stroke="#C8A96A"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {[
          [240, 168],
          [320, 160],
          [480, 124],
          [560, 118],
          [780, 134],
          [860, 112],
          [1020, 148],
          [1070, 132],
        ].map(([cx, cy], idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r="3.4"
            stroke="#DFC286"
            strokeOpacity="0.6"
            strokeWidth="1.1"
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Clean hairline section divider featuring a centered golden curled tentacle emblem.
 */
export function OctopusDivider({ className = '' }: AccentProps) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto flex max-w-4xl items-center justify-center gap-4 px-4 ${className}`}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C8A96A]/35 to-[#C8A96A]/60" />
      <svg
        viewBox="0 0 64 28"
        fill="none"
        className="h-6 w-14 shrink-0 text-[#C8A96A]"
      >
        <path
          d="M4 22C16 22 22 6 32 6C42 6 44 20 52 20C57 20 60 15 57 11C55 8 50 9 50 13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="22" cy="14" r="1.4" fill="currentColor" fillOpacity="0.65" />
        <circle cx="27" cy="9" r="1.6" fill="currentColor" fillOpacity="0.75" />
        <circle cx="33" cy="8" r="1.6" fill="currentColor" fillOpacity="0.75" />
        <circle cx="39" cy="11" r="1.4" fill="currentColor" fillOpacity="0.65" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C8A96A]/35 to-[#C8A96A]/60" />
    </div>
  );
}

/**
 * Large subtle background octopus silhouette watermark for high-impact sections.
 */
export function OctopusWatermark({ className = '' }: AccentProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <svg
        viewBox="0 0 600 400"
        fill="none"
        className="absolute -right-24 -bottom-16 h-[340px] w-[500px] opacity-[0.08] sm:h-[440px] sm:w-[640px]"
      >
        <path
          d="M460 140C460 88 418 55 372 62C328 69 298 110 308 156C315 190 342 208 352 232"
          stroke="#DFC286"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M352 232C312 252 248 232 212 268C178 302 188 354 226 362C258 369 278 338 256 318"
          stroke="#C8A96A"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M380 236C358 292 308 334 252 332"
          stroke="#C8A96A"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M412 224C422 288 386 356 334 382"
          stroke="#DFC286"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M442 204C494 242 528 310 502 368"
          stroke="#C8A96A"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M332 208C268 192 200 132 138 164C92 188 94 246 132 256C162 264 176 232 152 218"
          stroke="#DFC286"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {[
          [268, 248],
          [236, 256],
          [210, 276],
          [200, 308],
          [242, 186],
          [202, 162],
          [162, 158],
          [348, 294],
          [318, 320],
          [408, 286],
          [388, 326],
        ].map(([cx, cy], idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r="4.5"
            stroke="#DFC286"
            strokeWidth="1.4"
          />
        ))}
      </svg>
    </div>
  );
}

