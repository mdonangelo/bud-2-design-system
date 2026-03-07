import { Plus } from "@phosphor-icons/react";
import { Avatar } from "./Avatar";
import s from "./AvatarGroup.module.css";

export type AvatarGroupSize = "xs" | "sm" | "md";

export interface AvatarGroupItem {
  /** URL da foto. */
  src?: string;
  /** Iniciais (fallback sem foto). */
  initials?: string;
  /** Texto alternativo. */
  alt?: string;
}

interface AvatarGroupProps {
  /** Tamanho do grupo (xs | sm | md). */
  size?: AvatarGroupSize;
  /** Lista de avatares a exibir. */
  avatars: AvatarGroupItem[];
  /** Quantidade máxima de avatares visíveis antes do "+N". */
  maxVisible?: number;
  /** Exibe botão de adicionar usuário. */
  showAddButton?: boolean;
  /** Callback do botão de adicionar. */
  onAddClick?: () => void;
  className?: string;
}

const sizeClass: Record<AvatarGroupSize, string> = {
  xs: s.xs,
  sm: s.sm,
  md: s.md,
};

export function AvatarGroup({
  size = "sm",
  avatars,
  maxVisible = 5,
  showAddButton,
  onAddClick,
  className,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, maxVisible);
  const remaining = avatars.length - maxVisible;
  const hasMore = remaining > 0;

  const classes = [
    s.group,
    sizeClass[size],
    showAddButton ? (hasMore ? s.gapMore : s.gapAdd) : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className={s.stack}>
        {visible.map((avatar, i) => (
          <Avatar
            key={i}
            size={size}
            src={avatar.src}
            initials={avatar.initials}
            alt={avatar.alt}
            className={s.stackItem}
          />
        ))}
        {hasMore && (
          <span className={s.more}>
            <span className={s.moreText}>+{remaining}</span>
          </span>
        )}
      </div>
      {showAddButton && (
        <button
          type="button"
          className={s.addButton}
          onClick={onAddClick}
          aria-label="Adicionar usuário"
        >
          <Plus size={16} className={s.addIcon} />
        </button>
      )}
    </div>
  );
}
