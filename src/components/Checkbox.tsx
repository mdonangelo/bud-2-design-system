import { type InputHTMLAttributes, forwardRef } from "react";
import { Check, Minus } from "@phosphor-icons/react";
import s from "./Checkbox.module.css";

type CheckboxSize = "sm" | "md";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: CheckboxSize;
  indeterminate?: boolean;
  label?: string;
  description?: string;
}

const boxSize: Record<CheckboxSize, number> = { sm: 16, md: 20 };
const iconSize: Record<CheckboxSize, number> = { sm: 12, md: 16 };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      indeterminate = false,
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

    const iSize = iconSize[size];

    return (
      <label className={wrapperClasses}>
        <input
          ref={(node) => {
            if (node) node.indeterminate = indeterminate;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type="checkbox"
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
          {indeterminate ? (
            <Minus size={iSize} weight="bold" className={s.icon} />
          ) : (
            <Check size={iSize} weight="bold" className={s.icon} />
          )}
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

Checkbox.displayName = "Checkbox";
