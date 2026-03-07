import s from "./Chart.module.css";

interface ChartProps {
  value: number;
  className?: string;
}

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

export function Chart({ value, className }: ChartProps) {
  const clamped = clamp(Math.round(value), 0, 100);
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE;

  return (
    <div
      className={`${s.chart} ${className ?? ""}`}
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
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        )}
      </svg>
      <span className={s.value}>{clamped}</span>
      <span className={s.percent}>%</span>
    </div>
  );
}
