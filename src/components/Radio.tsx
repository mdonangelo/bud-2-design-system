import { type InputHTMLAttributes, forwardRef } from "react";
import s from "./Radio.module.css";

type RadioSize = "sm" | "md";

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: RadioSize;
  label?: string;
  description?: string;
}

const boxSize: Record<RadioSize, number> = { sm: 16, md: 20 };

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = "md",
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
          type="radio"
          className={s.input}
          disabled={disabled}
          {...rest}
        />
        <span
          className={`${s.box} ${s[size]}`}
          style={{
            width: boxSize[size],
            height: boxSize[size],
          }}
        >
          <span className={s.dot} />
        </span>
        {label && (
          <span className={`${s.text} ${s[`text_${size}`]}`}>
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

Radio.displayName = "Radio";
