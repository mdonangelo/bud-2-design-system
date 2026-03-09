import {
  type ComponentType,
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import { WarningCircle, CheckCircle } from "@phosphor-icons/react";
import s from "./Input.module.css";

type MessageType = "error" | "attention" | "success";

interface IconProps {
  size?: number | string;
  weight?: "regular";
}

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  leftIcon?: ComponentType<IconProps>;
  rightIcon?: ComponentType<IconProps>;
  message?: string;
  messageType?: MessageType;
}

const messageIconMap: Record<MessageType, ComponentType<IconProps>> = {
  error: WarningCircle,
  attention: WarningCircle,
  success: CheckCircle,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      message,
      messageType,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const hasMessage = !!message && !!messageType;
    const isError = messageType === "error";

    const wrapperClasses = [s.wrapper, className ?? ""].filter(Boolean).join(" ");

    const inputBoxClasses = [
      s.inputBox,
      isError ? s.error : "",
      disabled ? s.disabled : "",
    ]
      .filter(Boolean)
      .join(" ");

    const MsgIcon = messageType ? messageIconMap[messageType] : null;

    return (
      <div className={wrapperClasses}>
        {label && <label className={s.label}>{label}</label>}
        <div className={inputBoxClasses}>
          {LeftIcon && <LeftIcon size={16} />}
          <input
            ref={ref}
            className={s.input}
            disabled={disabled}
            {...rest}
          />
          {RightIcon && <RightIcon size={16} />}
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

Input.displayName = "Input";
