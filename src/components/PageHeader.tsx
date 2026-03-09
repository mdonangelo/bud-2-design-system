import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import {
  MagnifyingGlass,
  Bell,
  Lightning,
  SidebarSimple,
} from "@phosphor-icons/react";
import { Button } from "./Button";
import btnStyles from "./Button.module.css";
import s from "./PageHeader.module.css";

/* ——— SearchButton ——— */

interface SearchButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const SearchButton = forwardRef<HTMLButtonElement, SearchButtonProps>(
  function SearchButton({ className, ...rest }, ref) {
    return (
      <Button
        ref={ref}
        variant="tertiary"
        size="md"
        leftIcon={MagnifyingGlass}
        aria-label="Buscar"
        className={className}
        {...rest}
      />
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
  return (
    <span className={s.notificationWrapper}>
      <Button
        ref={ref}
        variant="tertiary"
        size="md"
        leftIcon={Bell}
        aria-label={hasUnread ? "Notificações (não lidas)" : "Notificações"}
        className={className}
        {...rest}
      />
      {hasUnread && <span className={s.badge} aria-hidden="true" />}
    </span>
  );
});

/* ——— AssistantButton ——— */

interface AssistantButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label exibido ao lado do ícone (default: "Assistente") */
  label?: string;
  /** Indica que o painel do assistente está aberto — troca ícone para X e aplica estado ativo */
  active?: boolean;
  className?: string;
}

export const AssistantButton = forwardRef<
  HTMLButtonElement,
  AssistantButtonProps
>(function AssistantButton({ label = "Assistente", active = false, className, ...rest }, ref) {
  const classes = [
    s.assistantBtn,
    active ? btnStyles.active : "",
    className ?? "",
  ].filter(Boolean).join(" ") || undefined;

  return (
    <Button
      ref={ref}
      variant="tertiary"
      size="md"
      key={active ? "active" : "default"}
      leftIcon={active ? SidebarSimple : Lightning}
      aria-label={label}
      aria-expanded={active}
      className={classes}
      {...rest}
    >
      <span className={s.assistantLabel}>{label}</span>
    </Button>
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
