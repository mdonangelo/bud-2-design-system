import { type ComponentType, type ButtonHTMLAttributes } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import s from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

interface IconProps {
  size?: number | string;
  weight?: "regular" | "bold" | "duotone" | "fill" | "light" | "thin";
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ComponentType<IconProps>;
  rightIcon?: ComponentType<IconProps>;
  loading?: boolean;
}

const iconSize: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function Button({
  variant = "primary",
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  loading = false,
  disabled = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const hasLeft = !loading && !!LeftIcon;
  const hasRight = !loading && !!RightIcon;
  const isIconOnly = !children && (hasLeft || hasRight);

  const classes = [
    s.button,
    s[variant],
    s[size],
    loading ? s.loading : "",
    isIconOnly ? s.iconOnly : "",
    !isIconOnly && hasLeft ? s.hasLeftIcon : "",
    !isIconOnly && hasRight ? s.hasRightIcon : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const iSize = iconSize[size];

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <CircleNotch size={iSize} className={s.spinner} />
      ) : (
        <>
          {LeftIcon && <LeftIcon size={iSize} />}
          {children && <span>{children}</span>}
          {RightIcon && <RightIcon size={iSize} />}
        </>
      )}
    </button>
  );
}
