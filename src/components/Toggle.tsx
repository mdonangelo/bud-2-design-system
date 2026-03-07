import { type InputHTMLAttributes, forwardRef } from "react";
import s from "./Toggle.module.css";

interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      description,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const wrapperClasses = [
      s.wrapper,
      label ? s.hasLabel : "",
      disabled ? s.disabled : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label className={wrapperClasses}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className={s.input}
          disabled={disabled}
          {...rest}
        />
        <span className={s.track}>
          <span className={s.thumb} />
        </span>
        {label && (
          <span className={s.text}>
            <span className={s.title}>{label}</span>
            {description && (
              <span className={s.description}>{description}</span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";
