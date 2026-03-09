import type { CSSProperties } from "react";
import s from "./Chart.module.css";

type ChartVariant = "full" | "half";

interface ChartProps {
  value: number;
  variant?: ChartVariant;
  /** Diameter in px (default 40). Controls the overall size of the gauge. */
  size?: number;
  className?: string;
}

const RADIUS = 18;
const FULL_CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const HALF_CIRCUMFERENCE = Math.PI * RADIUS;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

export function Chart({ value, variant = "full", size = 40, className }: ChartProps) {
  const clamped = clamp(Math.round(value), 0, 100);
  const vars = { "--chart-size": `${size}px` } as CSSProperties;

  if (variant === "half") {
    const offset = HALF_CIRCUMFERENCE - (clamped / 100) * HALF_CIRCUMFERENCE;

    return (
      <svg
        className={`${s.halfChart} ${className ?? ""}`}
        style={vars}
        viewBox="0 0 40 22"
        role="img"
        aria-label={`${clamped}%`}
      >
        <path
          d="M 2,20 A 18,18 0 0,1 38,20"
          className={s.track}
        />
        {clamped > 0 && (
          <path
            d="M 2,20 A 18,18 0 0,1 38,20"
            className={s.halfProgress}
            strokeDasharray={HALF_CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        )}
        <text x="20" y="20" textAnchor="middle" className={s.halfText}>
          <tspan className={s.halfValue}>{clamped}</tspan>
          <tspan className={s.halfPercent}>%</tspan>
        </text>
      </svg>
    );
  }

  const offset = FULL_CIRCUMFERENCE - (clamped / 100) * FULL_CIRCUMFERENCE;

  return (
    <div
      className={`${s.chart} ${className ?? ""}`}
      style={vars}
      role="img"
      aria-label={`${clamped}%`}
    >
      <svg className={s.ring} viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r={RADIUS} className={s.track} />
        {clamped > 0 && (
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            className={s.progress}
            strokeDasharray={FULL_CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        )}
      </svg>
      <span className={s.textGroup}>
        <span className={s.value}>{clamped}</span>
        <span className={s.percent}>%</span>
      </span>
    </div>
  );
}
