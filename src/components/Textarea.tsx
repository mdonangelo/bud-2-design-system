import {
  type ComponentType,
  type TextareaHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import { WarningCircle, CheckCircle } from "@phosphor-icons/react";
import s from "./Textarea.module.css";

type MessageType = "error" | "attention" | "success";

interface IconProps {
  size?: number | string;
  weight?: "regular" | "bold" | "duotone" | "fill" | "light" | "thin";
}

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: ReactNode;
  message?: string;
  messageType?: MessageType;
}

const messageIconMap: Record<MessageType, ComponentType<IconProps>> = {
  error: WarningCircle,
  attention: WarningCircle,
  success: CheckCircle,
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      message,
      messageType,
      disabled = false,
      className,
      rows = 4,
      ...rest
    },
    ref
  ) => {
    const hasMessage = !!message && !!messageType;
    const isError = messageType === "error";

    const wrapperClasses = [s.wrapper, className ?? ""]
      .filter(Boolean)
      .join(" ");

    const boxClasses = [
      s.textareaBox,
      isError ? s.error : "",
      disabled ? s.disabled : "",
    ]
      .filter(Boolean)
      .join(" ");

    const MsgIcon = messageType ? messageIconMap[messageType] : null;

    return (
      <div className={wrapperClasses}>
        {label && <label className={s.label}>{label}</label>}
        <div className={boxClasses}>
          <textarea
            ref={ref}
            className={s.textarea}
            disabled={disabled}
            rows={rows}
            {...rest}
          />
        </div>
        {hasMessage && (
          <div className={`${s.message} ${s[messageType]}`}>
            {MsgIcon && <MsgIcon size={14} />}
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
