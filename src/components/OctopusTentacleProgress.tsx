'use client';

import React, { useId } from 'react';

interface OctopusTentacleProgressProps {
  step: number;
  totalSteps: number;
  className?: string;
}

const SUCTION_CUPS = [
  { cx: 44, cy: 40, r: 3.0 },
  { cx: 102, cy: 36, r: 2.8 },
  { cx: 162, cy: 38, r: 2.6 },
  { cx: 222, cy: 40, r: 2.4 },
  { cx: 282, cy: 35, r: 2.2 },
  { cx: 342, cy: 34, r: 2.0 },
  { cx: 398, cy: 37, r: 1.8 },
  { cx: 446, cy: 35, r: 1.5 },
] as const;

// Right-extending progressive tentacle sharing exact y=32..40 anchor with the octopus's extending arm
const LONG_TENTACLE_PATH =
  'M 0 32 ' +
  'C 65 26, 130 34, 195 32 ' +
  'C 260 30, 320 24, 385 29 ' +
  'C 425 32, 456 26, 476 28 ' +
  'C 492 30, 496 39, 488 46 ' +
  'C 480 52, 469 48, 471 40 ' +
  'C 472 36, 478 35, 480 39 ' +
  'C 477 40, 477 43, 480 44 ' +
  'C 483 44, 486 40, 485 36 ' +
  'C 483 31, 475 31, 464 33 ' +
  'C 444 36, 418 37, 384 35 ' +
  'C 320 31, 260 37, 195 39 ' +
  'C 130 41, 65 34, 0 40 Z';

// Unstretched, recognizable sculpted octopus (bulbous mantle, 4 curled tentacles + seamless right connector)
const OCTOPUS_BODY_PATH =
  'M 41 6 ' +
  'C 25 6, 16 17, 20 29 ' +
  'C 13 31, 5 30, 4 23 ' +
  'C 4 19, 9 19, 9 23 ' +
  'C 7 25, 11 28, 17 28 ' +
  'C 14 36, 6 43, 7 50 ' +
  'C 8 56, 16 56, 18 50 ' +
  'C 19 46, 15 44, 14 47 ' +
  'C 12 44, 20 39, 24 38 ' +
  'C 23 47, 19 56, 23 62 ' +
  'C 27 67, 35 63, 34 55 ' +
  'C 33 51, 29 52, 30 56 ' +
  'C 26 57, 29 45, 34 40 ' +
  'C 36 48, 37 58, 44 61 ' +
  'C 51 64, 55 56, 51 50 ' +
  'C 49 48, 46 50, 47 53 ' +
  'C 43 52, 43 44, 45 39 ' +
  'C 55 40, 68 41, 84 40 ' +
  'L 84 32 ' +
  'C 68 32, 57 31, 54 27 ' +
  'C 59 17, 54 6, 41 6 Z';

function getProgressFraction(step: number, totalSteps: number): number {
  if (totalSteps <= 1) return 1;
  if (step >= totalSteps) return 1;
  if (step <= 1) return totalSteps === 2 ? 0.22 : 0.08;
  return (step - 1) / (totalSteps - 1) * 0.72 + (totalSteps === 2 ? 0.22 : 0.08);
}

/**
 * Unmistakable sculpted champagne-gold octopus on the left whose right arm stretches cleanly
 * inside the container width into a progressive suction-cup tentacle track.
 */
export function OctopusTentacleProgress({
  step,
  totalSteps,
  className = '',
}: OctopusTentacleProgressProps) {
  const uid = useId().replace(/:/g, '');
  const progress = Math.max(0.06, Math.min(1, getProgressFraction(step, totalSteps)));
  const insetRight = `${((1 - progress) * 100).toFixed(1)}%`;

  return (
    <div
      className={`flex w-full min-w-0 items-center overflow-hidden select-none ${className}`}
      role="progressbar"
      aria-label={`Step ${step} of ${totalSteps}`}
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      {/* 1. True-Proportion Iconic Octopus Silhouette */}
      <svg
        viewBox="0 0 84 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-12 w-[60px] shrink-0 sm:h-14 sm:w-[70px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`octo-body-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC286" />
            <stop offset="55%" stopColor="#C8A96A" />
            <stop offset="100%" stopColor="#C8A96A" />
          </linearGradient>
        </defs>
        <path
          d={OCTOPUS_BODY_PATH}
          fill={`url(#octo-body-${uid})`}
        />
        {/* Confident stylized octopus eyes */}
        <ellipse cx="32" cy="24" rx="2.4" ry="3" fill="#070D17" />
        <ellipse cx="44" cy="24" rx="2.4" ry="3" fill="#070D17" />
        <circle cx="31.3" cy="22.8" r="0.8" fill="#F5E8C8" />
        <circle cx="43.3" cy="22.8" r="0.8" fill="#F5E8C8" />
      </svg>

      {/* 2. Responsive Bounded Long Tentacle Track (never overflows mobile card!) */}
      <div className="relative -ml-1 min-w-0 flex-1">
        <svg
          viewBox="0 0 500 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-12 w-full sm:h-14"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`octo-tentacle-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C8A96A" />
              <stop offset="60%" stopColor="#DFC286" />
              <stop offset="100%" stopColor="#F5E8C8" />
            </linearGradient>
          </defs>

          {/* Unfilled Ghost Track */}
          <path
            d={LONG_TENTACLE_PATH}
            fill="#070D17"
            stroke="#C8A96A"
            strokeOpacity="0.32"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {SUCTION_CUPS.map((cup, idx) => (
            <circle
              key={`ghost-${idx}`}
              cx={cup.cx}
              cy={cup.cy}
              r={cup.r}
              fill="#070D17"
              stroke="#C8A96A"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
          ))}

          {/* Progressively Illuminated Champagne Gold Tentacle */}
          <g
            style={{
              clipPath: `inset(-4px ${insetRight} -4px 0px)`,
              transition: 'clip-path 500ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <path d={LONG_TENTACLE_PATH} fill={`url(#octo-tentacle-${uid})`} />
            {SUCTION_CUPS.map((cup, idx) => (
              <circle
                key={`active-${idx}`}
                cx={cup.cx}
                cy={cup.cy}
                r={cup.r}
                fill="#DFC286"
                stroke="#070D17"
                strokeOpacity="0.55"
                strokeWidth="0.95"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
