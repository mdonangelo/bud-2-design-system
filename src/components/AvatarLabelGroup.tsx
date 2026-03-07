import { Avatar } from "./Avatar";
import s from "./AvatarLabelGroup.module.css";

export type AvatarLabelGroupSize = "sm" | "md" | "lg" | "xl";

interface AvatarLabelGroupProps {
  /** Tamanho do grupo (sm | md | lg | xl). */
  size?: AvatarLabelGroupSize;
  /** Nome exibido ao lado do avatar. */
  name: string;
  /** Texto de apoio (e-mail, cargo, etc.). */
  supportingText?: string;
  /** URL da foto do avatar. */
  src?: string;
  /** Iniciais do avatar (fallback sem foto). */
  initials?: string;
  /** Texto alternativo da imagem. */
  alt?: string;
  /** Mostra indicador de online no avatar. */
  online?: boolean;
  /** URL do logo da empresa (badge no avatar). */
  companyLogo?: string;
  className?: string;
}

const sizeClass: Record<AvatarLabelGroupSize, string> = {
  sm: s.sm,
  md: s.md,
  lg: s.lg,
  xl: s.xl,
};

export function AvatarLabelGroup({
  size = "md",
  name,
  supportingText,
  src,
  initials,
  alt,
  online,
  companyLogo,
  className,
}: AvatarLabelGroupProps) {
  const classes = [s.group, sizeClass[size], className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <Avatar
        size={size}
        src={src}
        initials={initials}
        alt={alt}
        online={online}
        companyLogo={companyLogo}
      />
      <div className={s.text}>
        <span className={s.name}>{name}</span>
        {supportingText && (
          <span className={s.supporting}>{supportingText}</span>
        )}
      </div>
    </div>
  );
}
