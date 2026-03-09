import { type ComponentType, type HTMLAttributes } from "react";
import s from "./Badge.module.css";

type BadgeColor =
  | "neutral"
  | "orange"
  | "wine"
  | "caramel"
  | "error"
  | "warning"
  | "success";

type BadgeSize = "sm" | "md" | "lg";

interface IconProps {
  size?: number | string;
  weight?: "regular";
}

interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  color?: BadgeColor;
  size?: BadgeSize;
  leftIcon?: ComponentType<IconProps>;
  rightIcon?: ComponentType<IconProps>;
}

const iconSize: Record<BadgeSize, number> = { sm: 12, md: 12, lg: 16 };

export function Badge({
  color = "neutral",
  size = "sm",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  className,
  ...rest
}: BadgeProps) {
  const isIconOnly = !children && (LeftIcon || RightIcon);
  const Icon = isIconOnly ? LeftIcon || RightIcon : null;

  const classes = [
    s.badge,
    s[color],
    s[size],
    isIconOnly ? s.iconOnly : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      role={isIconOnly ? "img" : undefined}
      aria-hidden={isIconOnly && !rest["aria-label"] ? true : undefined}
      {...rest}
    >
      {isIconOnly ? (
        Icon && <Icon size={iconSize[size]} aria-hidden />
      ) : (
        <>
          {LeftIcon && <LeftIcon size={iconSize[size]} aria-hidden />}
          {children && <span className={s.label}>{children}</span>}
          {RightIcon && <RightIcon size={iconSize[size]} aria-hidden />}
        </>
      )}
    </span>
  );
}
