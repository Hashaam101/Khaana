"use client";

import React from "react";

type LogoSize = "sm" | "md" | "lg";

interface KhaanaIconProps {
  size?: LogoSize;
  className?: string;
}

interface KhaanaLogoProps {
  size?: LogoSize;
  className?: string;
}

const FOREST = "#1B512D";
const OLIVINE = "#ADC178";

const iconDimensions: Record<LogoSize, number> = {
  sm: 28,
  md: 40,
  lg: 64,
};

const logoDimensions: Record<LogoSize, { icon: number; gap: number; fontSize: number }> = {
  sm: { icon: 28, gap: 6, fontSize: 18 },
  md: { icon: 40, gap: 8, fontSize: 24 },
  lg: { icon: 64, gap: 12, fontSize: 38 },
};

/**
 * KhaanaIcon
 *
 * A minimal mark combining a bowl silhouette with a leaf.
 * The bowl is a concave arc at the bottom and the leaf rises
 * from the right rim, curving upward. Both shapes sit inside
 * a subtle circular background so the icon reads well at 24-28 px.
 *
 * Viewbox is 64x64 for easy authoring; it scales to any size.
 */
export function KhaanaIcon({ size = "md", className }: KhaanaIconProps) {
  const px = iconDimensions[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={px}
      height={px}
      fill="none"
      className={className}
      aria-label="Khaana icon"
      role="img"
    >
      {/* Circular background */}
      <circle cx="32" cy="32" r="30" fill={FOREST} />

      {/* Bowl / plate arc - a wide concave shape sitting in the lower half */}
      <path
        d="M14 34
           C14 46 22 52 32 52
           C42 52 50 46 50 34"
        stroke={OLIVINE}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Steam / leaf shape rising from the bowl
          A single elegant leaf curving to the right */}
      <path
        d="M32 32
           C32 22 38 14 46 13
           C42 18 36 26 32 32Z"
        fill={OLIVINE}
      />

      {/* Leaf vein / midrib */}
      <path
        d="M32 32
           C34 25 37 19 43 15"
        stroke={FOREST}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Second smaller leaf for balance, curving left */}
      <path
        d="M30 30
           C28 22 22 17 16 17
           C19 22 24 27 30 30Z"
        fill={OLIVINE}
        opacity="0.7"
      />

      {/* Second leaf vein */}
      <path
        d="M30 30
           C27 25 23 21 18 18.5"
        stroke={FOREST}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * KhaanaLogo
 *
 * Horizontal lockup: KhaanaIcon + "Khaana" wordmark.
 * Uses currentColor for the text so it adapts to dark mode.
 */
export function KhaanaLogo({ size = "md", className }: KhaanaLogoProps) {
  const dims = logoDimensions[size];

  return (
    <div
      className={`text-forest dark:text-olivine-light ${className || ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: dims.gap,
      }}
    >
      <KhaanaIcon size={size} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 80"
        height={dims.icon}
        fill="none"
        aria-label="Khaana wordmark"
        role="img"
      >
        <text
          x="0"
          y="58"
          fontFamily="var(--font-sour-gummy), 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize="62"
          fill="currentColor"
          letterSpacing="-1"
        >
          Khaana
        </text>
      </svg>
    </div>
  );
}

export default KhaanaLogo;
