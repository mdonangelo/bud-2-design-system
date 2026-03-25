import { useState, useRef, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import s from "./Heatmap.module.css";

export interface HeatmapCell {
  /** Row index or label */
  row: string;
  /** Column index or label */
  col: string;
  /** Numeric value for color intensity */
  value: number;
}

export interface HeatmapProps {
  /** Array of cells with row, col, and value */
  data: HeatmapCell[];
  /** Row labels in display order */
  rows: string[];
  /** Column labels in display order */
  columns: string[];
  /** Minimum value for color scale (default: auto from data) */
  min?: number;
  /** Maximum value for color scale (default: auto from data) */
  max?: number;
  /** Color palette (default: "orange"). Ignored when colorScale is "divergent". */
  color?: "orange" | "green" | "red" | "yellow" | "wine" | "neutral";
  /** Color scale mode (default: "sequential"). "divergent" uses red→yellow→green for low→mid→high values. */
  colorScale?: "sequential" | "divergent";
  /** Show values inside cells (default: true) */
  showValues?: boolean;
  /** Format function for cell values */
  formatValue?: (value: number) => string;
  /** Cell size in px (default: 40) */
  cellSize?: number;
  /** Row label column width in px (default: 100) */
  labelWidth?: number;
  /** Gap between cells in px (default: 4) */
  gap?: number;
  /** Map column labels to full-text tooltips shown on hover */
  columnTooltips?: Record<string, string>;
  className?: string;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

/** Map color name to CSS variable prefix */
const COLOR_MAP = {
  orange: "--color-orange",
  green: "--color-green",
  red: "--color-red",
  yellow: "--color-yellow",
  wine: "--color-wine",
  neutral: "--color-neutral",
} as const;

/** Steps from light to dark for each intensity level (0-4) */
const STEPS = [50, 200, 400, 500, 700] as const;

export function Heatmap({
  data,
  rows,
  columns,
  min: minProp,
  max: maxProp,
  color = "orange",
  colorScale = "sequential",
  showValues = true,
  formatValue,
  cellSize = 40,
  labelWidth = 100,
  gap = 4,
  columnTooltips,
  className,
}: HeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Build lookup map
  const lookup = new Map<string, number>();
  for (const cell of data) {
    lookup.set(`${cell.row}__${cell.col}`, cell.value);
  }

  // Compute min/max
  const values = data.map((d) => d.value);
  const dataMin = minProp ?? Math.min(...values);
  const dataMax = maxProp ?? Math.max(...values);
  const range = dataMax - dataMin || 1;

  const prefix = COLOR_MAP[color];
  const isDivergent = colorScale === "divergent";

  /**
   * Divergent scale: maps 0-1 normalized value to red→yellow→green.
   * Uses CSS variables from the DS token system.
   */
  const DIVERGENT_STOPS: { at: number; bg: string; dark: boolean }[] = [
    { at: 0.0, bg: "var(--color-red-200)",    dark: false },
    { at: 0.25, bg: "var(--color-red-100)",   dark: false },
    { at: 0.4, bg: "var(--color-yellow-100)", dark: false },
    { at: 0.5, bg: "var(--color-yellow-50)",  dark: false },
    { at: 0.6, bg: "var(--color-yellow-100)", dark: false },
    { at: 0.75, bg: "var(--color-green-100)", dark: false },
    { at: 1.0, bg: "var(--color-green-300)",  dark: false },
  ];

  function getDivergentStop(value: number): { bg: string; dark: boolean } {
    const normalized = clamp((value - dataMin) / range, 0, 1);
    // Find the closest stop
    let best = DIVERGENT_STOPS[0]!;
    let bestDist = Math.abs(normalized - best.at);
    for (const stop of DIVERGENT_STOPS) {
      const dist = Math.abs(normalized - stop.at);
      if (dist < bestDist) {
        best = stop;
        bestDist = dist;
      }
    }
    return best;
  }

  function getIntensity(value: number): number {
    const normalized = clamp((value - dataMin) / range, 0, 1);
    return Math.round(normalized * (STEPS.length - 1));
  }

  function getCellColor(value: number): string {
    if (isDivergent) return getDivergentStop(value).bg;
    const step = STEPS[getIntensity(value)];
    return `var(${prefix}-${step})`;
  }

  function getTextColor(value: number): string {
    if (isDivergent) return getDivergentStop(value).dark ? "var(--color-white)" : "var(--color-neutral-950)";
    const intensity = getIntensity(value);
    return intensity >= 3 ? "var(--color-white)" : "var(--color-neutral-950)";
  }

  const format = formatValue ?? ((v: number) => String(v));

  const vars = {
    "--heatmap-cell": `${cellSize}px`,
    "--heatmap-label-width": `${labelWidth}px`,
    "--heatmap-gap": `${gap}px`,
  } as CSSProperties;

  /* ——— Tooltip positioning ——— */
  const [tooltip, setTooltip] = useState<{
    row: string;
    col: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  function handleCellEnter(row: string, col: string, value: number, e: React.MouseEvent) {
    setHoveredCell({ row, col });
    const cellRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      row,
      col,
      value,
      x: cellRect.left + cellRect.width / 2,
      y: cellRect.top,
    });
  }

  function handleCellLeave() {
    setHoveredCell(null);
    setTooltip(null);
  }

  const colTooltipLabel = (col: string) =>
    columnTooltips?.[col] ? `${col} — ${columnTooltips[col]}` : col;

  return (
    <>
    <div
      ref={rootRef}
      className={`${s.root} ${className ?? ""}`}
      style={vars}
      role="table"
      aria-label="Mapa de calor"
    >
      {/* Header row with column labels */}
      <div className={s.headerRow} role="row">
        <span className={s.cornerCell} role="columnheader" />
        {columns.map((col) => (
          <span
            key={col}
            className={s.colLabel}
            role="columnheader"
            title={columnTooltips?.[col]}
          >
            {col}
          </span>
        ))}
      </div>

      {/* Data rows */}
      {rows.map((row) => (
        <div key={row} className={s.dataRow} role="row">
          <span className={s.rowLabel} role="rowheader" title={row}>
            {row}
          </span>
          {columns.map((col) => {
            const key = `${row}__${col}`;
            const value = lookup.get(key);
            const hasValue = value !== undefined;
            const isExact =
              hoveredCell?.row === row && hoveredCell?.col === col;
            const isRowOrCol =
              hoveredCell?.row === row || hoveredCell?.col === col;
            const hoverClass = hoveredCell
              ? isExact
                ? s.cellActive
                : isRowOrCol
                  ? s.cellHighlight
                  : s.cellDimmed
              : "";

            return (
              <span
                key={key}
                className={`${s.cell} ${hoverClass}`}
                style={
                  hasValue
                    ? ({
                        backgroundColor: getCellColor(value),
                        color: getTextColor(value),
                      } as CSSProperties)
                    : undefined
                }
                role="cell"
                aria-label={
                  hasValue ? `${row}, ${col}: ${format(value)}` : `${row}, ${col}: sem dados`
                }
                onMouseEnter={hasValue ? (e) => handleCellEnter(row, col, value, e) : undefined}
                onMouseLeave={handleCellLeave}
              >
                {hasValue && showValues ? format(value) : ""}
              </span>
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div className={s.legend} aria-hidden="true">
        {isDivergent ? (
          <>
            <span className={s.legendLabel}>Crítico</span>
            {DIVERGENT_STOPS.map((stop, i) => (
              <span
                key={i}
                className={s.legendCell}
                style={{ backgroundColor: stop.bg }}
              />
            ))}
            <span className={s.legendLabel}>Excelente</span>
          </>
        ) : (
          <>
            <span className={s.legendLabel}>Menor</span>
            {STEPS.map((step) => (
              <span
                key={step}
                className={s.legendCell}
                style={{ backgroundColor: `var(${prefix}-${step})` }}
              />
            ))}
            <span className={s.legendLabel}>Maior</span>
          </>
        )}
      </div>

    </div>

    {/* Tooltip — portal to body to escape overflow clipping */}
    {tooltip && createPortal(
      <div
        className={s.tooltip}
        style={{
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
        }}
        aria-hidden="true"
      >
        <span className={s.tooltipRow}>{tooltip.row}</span>
        <span className={s.tooltipCol}>{colTooltipLabel(tooltip.col)}</span>
        <span className={s.tooltipValue}>{format(tooltip.value)}</span>
      </div>,
      document.body,
    )}
    </>
  );
}
