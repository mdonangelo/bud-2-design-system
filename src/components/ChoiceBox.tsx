import {
  type ReactNode,
  createContext,
  useContext,
  useId,
  useState,
  useCallback,
} from "react";
import { Check } from "@phosphor-icons/react";
import s from "./ChoiceBox.module.css";

/* ——— Context ——— */

interface ChoiceBoxContextValue {
  name: string;
  multiple: boolean;
  isSelected: (value: string) => boolean;
  toggle: (value: string) => void;
  disabled: boolean;
}

const ChoiceBoxContext = createContext<ChoiceBoxContextValue | null>(null);

/* ——— ChoiceBoxGroup ——— */

interface BaseGroupProps {
  label?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

interface SingleGroupProps extends BaseGroupProps {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
}

interface MultipleGroupProps extends BaseGroupProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

type ChoiceBoxGroupProps = SingleGroupProps | MultipleGroupProps;

export function ChoiceBoxGroup(props: ChoiceBoxGroupProps) {
  const {
    label,
    name,
    disabled = false,
    className,
    children,
    multiple = false,
  } = props;

  const autoId = useId();
  const groupName = name ?? autoId;

  /* ——— Single-select state ——— */
  const [singleInternal, setSingleInternal] = useState<string | undefined>(
    !multiple ? (props as SingleGroupProps).defaultValue : undefined
  );

  /* ——— Multi-select state ——— */
  const [multiInternal, setMultiInternal] = useState<string[]>(
    multiple ? ((props as MultipleGroupProps).defaultValue ?? []) : []
  );

  const isControlled = props.value !== undefined;

  const isSelected = useCallback(
    (val: string): boolean => {
      if (multiple) {
        const current = isControlled
          ? (props.value as string[])
          : multiInternal;
        return current.includes(val);
      }
      const current = isControlled
        ? (props.value as string | undefined)
        : singleInternal;
      return current === val;
    },
    [multiple, isControlled, props.value, singleInternal, multiInternal]
  );

  const toggle = useCallback(
    (val: string) => {
      if (multiple) {
        const current = isControlled
          ? (props.value as string[])
          : multiInternal;
        const next = current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val];
        if (!isControlled) setMultiInternal(next);
        (props as MultipleGroupProps).onChange?.(next);
      } else {
        const current = isControlled
          ? (props.value as string | undefined)
          : singleInternal;
        const next = current === val ? undefined : val;
        if (!isControlled) setSingleInternal(next);
        (props as SingleGroupProps).onChange?.(next);
      }
    },
    [multiple, isControlled, props, singleInternal, multiInternal]
  );

  const groupClasses = [
    s.group,
    disabled ? s.groupDisabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ChoiceBoxContext.Provider
      value={{ name: groupName, multiple, isSelected, toggle, disabled }}
    >
      <div
        className={groupClasses}
        role={multiple ? "group" : "radiogroup"}
        aria-label={label}
      >
        {label && <span className={s.groupLabel}>{label}</span>}
        <div className={s.groupGrid}>{children}</div>
      </div>
    </ChoiceBoxContext.Provider>
  );
}

/* ——— ChoiceBox ——— */

interface ChoiceBoxLink {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface ChoiceBoxProps {
  value: string;
  title: string;
  description?: string;
  link?: ChoiceBoxLink;
  disabled?: boolean;
  className?: string;
}

export function ChoiceBox({
  value,
  title,
  description,
  link,
  disabled: itemDisabled = false,
  className,
}: ChoiceBoxProps) {
  const ctx = useContext(ChoiceBoxContext);
  if (!ctx) throw new Error("ChoiceBox must be used inside ChoiceBoxGroup");

  const isDisabled = ctx.disabled || itemDisabled;
  const isChecked = ctx.isSelected(value);

  const cardClasses = [s.card, isDisabled ? s.disabled : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    link?.onClick?.();
    if (link?.href) window.open(link.href, "_blank", "noopener");
  };

  return (
    <label className={cardClasses}>
      <input
        type={ctx.multiple ? "checkbox" : "radio"}
        className={s.input}
        name={ctx.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => {}}
        onClick={() => ctx.toggle(value)}
      />
      <div className={s.cardContent}>
        {ctx.multiple ? (
          <span className={s.checkbox}>
            <Check size={12}  className={s.checkIcon} />
          </span>
        ) : (
          <span className={s.radio}>
            <span className={s.radioDot} />
          </span>
        )}
        <div className={s.text}>
          <span className={s.title}>{title}</span>
          {description && <span className={s.description}>{description}</span>}
        </div>
      </div>
      {link && (
        <div className={s.linkRow}>
          <a
            className={s.link}
            href={link.href}
            onClick={handleLinkClick}
            tabIndex={isDisabled ? -1 : 0}
          >
            {link.text}
          </a>
        </div>
      )}
    </label>
  );
}
