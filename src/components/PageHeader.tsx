import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import {
  MagnifyingGlass,
  Bell,
  Lightning,
} from "@phosphor-icons/react";
import s from "./PageHeader.module.css";

/* ——— SearchButton ——— */

interface SearchButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  function SearchButton({ className, ...rest }, ref) {
    const classes = [s.iconBtn, className ?? ""].filter(Boolean).join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        aria-label="Buscar"
        {...rest}
      >
        <MagnifyingGlass size={14} />
      </button>
    );
  }
);

/* ——— NotificationButton ——— */

interface NotificationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Exibe indicador de notificações não lidas */
  hasUnread?: boolean;
  className?: string;
}

export const NotificationButton = forwardRef<
  HTMLButtonElement,
  NotificationButtonProps
>(function NotificationButton({ hasUnread = false, className, ...rest }, ref) {
  const classes = [s.iconBtn, className ?? ""].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-label={hasUnread ? "Notificações (não lidas)" : "Notificações"}
      {...rest}
    >
      <Bell size={14} />
      {hasUnread && <span className={s.badge} aria-hidden="true" />}
    </button>
  );
});

/* ——— AssistantButton ——— */

interface AssistantButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label exibido ao lado do ícone (default: "Assistente") */
  label?: string;
  className?: string;
}

export const AssistantButton = forwardRef<
  HTMLButtonElement,
  AssistantButtonProps
>(function AssistantButton({ label = "Assistente", className, ...rest }, ref) {
  const classes = [s.labelBtn, className ?? ""].filter(Boolean).join(" ");

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      aria-label={label}
      {...rest}
    >
      <Lightning size={14} />
      <span className={s.assistantLabel}>{label}</span>
    </button>
  );
});

/* ——— PageHeader ——— */

interface PageHeaderProps {
  /** Título da página */
  title: string;
  /** Ações à direita (SearchButton, NotificationButton, AssistantButton, etc.) */
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  children,
  className,
}: PageHeaderProps) {
  const classes = [s.header, className ?? ""].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      <h1 className={s.title}>{title}</h1>
      {children && <div className={s.actions}>{children}</div>}
    </header>
  );
}
