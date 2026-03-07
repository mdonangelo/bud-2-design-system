import { User } from "@phosphor-icons/react";
import s from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps {
  /** Tamanho do avatar. */
  size?: AvatarSize;
  /** URL da foto. Quando ausente, mostra initials ou placeholder. */
  src?: string;
  /** Iniciais (1-2 caracteres). Usadas quando não há src. */
  initials?: string;
  /** Texto alternativo para a imagem. */
  alt?: string;
  /** Mostra indicador de online (bolinha verde). */
  online?: boolean;
  /** URL do logo da empresa (badge no canto inferior direito). */
  companyLogo?: string;
  className?: string;
}

const sizeClass: Record<AvatarSize, string> = {
  xs: s.xs,
  sm: s.sm,
  md: s.md,
  lg: s.lg,
  xl: s.xl,
  "2xl": s.xxl,
};

const iconSize: Record<AvatarSize, number> = {
  xs: 14,
  sm: 16,
  md: 24,
  lg: 28,
  xl: 32,
  "2xl": 36,
};

export function Avatar({
  size = "md",
  src,
  initials,
  alt = "",
  online,
  companyLogo,
  className,
}: AvatarProps) {
  const isImage = !!src;
  const isInitials = !src && !!initials;

  const classes = [
    s.avatar,
    sizeClass[size],
    isInitials ? s.hasInitials : "",
    !isImage && !isInitials ? s.placeholder : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {isImage && <img className={s.image} src={src} alt={alt} />}
      {isInitials && <span className={s.initials}>{initials}</span>}
      {!isImage && !isInitials && (
        <User size={iconSize[size]} className={s.placeholderIcon} />
      )}
      {online && !companyLogo && <span className={s.online} />}
      {companyLogo && (
        <span className={s.company}>
          <img src={companyLogo} alt="" />
        </span>
      )}
    </span>
  );
}
