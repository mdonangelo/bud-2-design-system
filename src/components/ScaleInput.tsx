import { useCallback, useId, useRef } from "react";
import s from "./ScaleInput.module.css";

export interface ScaleInputProps {
  /** Minimum value (default 0) */
  min?: number;
  /** Maximum value (default 10) */
  max?: number;
  /** Currently selected value */
  value?: number;
  /** Called when a value is selected */
  onChange?: (value: number) => void;
  /** Label displayed below min value */
  minLabel?: string;
  /** Label displayed below max value */
  maxLabel?: string;
  /** Disables all buttons */
  disabled?: boolean;
  /** Visual size: sm = compact, md = default */
  size?: "sm" | "md";
  className?: string;
}

export function ScaleInput({
  min = 0,
  max = 10,
  value,
  onChange,
  minLabel,
  maxLabel,
  disabled = false,
  size = "md",
  className,
}: ScaleInputProps) {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const count = max - min + 1;
  const values = Array.from({ length: count }, (_, i) => min + i);

  const handleSelect = useCallback(
    (v: number) => {
      if (disabled) return;
      onChange?.(v);
    },
    [disabled, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentValue: number) => {
      if (disabled) return;

      let nextValue: number | null = null;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          nextValue = currentValue < max ? currentValue + 1 : min;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          nextValue = currentValue > min ? currentValue - 1 : max;
          break;
        case "Home":
          e.preventDefault();
          nextValue = min;
          break;
        case "End":
          e.preventDefault();
          nextValue = max;
          break;
      }

      if (nextValue !== null) {
        onChange?.(nextValue);
        // Focus the newly selected button
        const btn = containerRef.current?.querySelector<HTMLElement>(
          `[data-value="${nextValue}"]`,
        );
        btn?.focus();
      }
    },
    [disabled, onChange, min, max],
  );

  const rootClasses = [
    s.root,
    size === "sm" ? s.sm : "",
    disabled ? s.disabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const hasLabels = !!(minLabel || maxLabel);

  return (
    <div className={rootClasses}>
      <div
        ref={containerRef}
        className={s.buttons}
        role="radiogroup"
        aria-label="Escala"
      >
        {values.map((v, i) => {
          const isSelected = value === v;
          const tabIndex =
            value !== undefined
              ? isSelected
                ? 0
                : -1
              : i === 0
                ? 0
                : -1;

          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={String(v)}
              id={`${uid}-${v}`}
              data-value={v}
              tabIndex={tabIndex}
              className={`${s.btn} ${isSelected ? s.selected : ""}`}
              disabled={disabled}
              onClick={() => handleSelect(v)}
              onKeyDown={(e) => handleKeyDown(e, v)}
            >
              {v}
            </button>
          );
        })}
      </div>
      {hasLabels && (
        <div className={s.labels}>
          <span className={s.label}>{minLabel}</span>
          <span className={s.label}>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
