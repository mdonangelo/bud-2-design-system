import { useState, useCallback, type ReactNode } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import s from "./CopyButton.module.css";

interface CopyButtonProps {
  text: string;
  children?: ReactNode;
  className?: string;
}

export function CopyButton({ text, children, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [text]);

  return (
    <button
      type="button"
      className={`${s.copyButton} ${className ?? ""}`}
      onClick={handleCopy}
      title={`Copiar: ${text}`}
    >
      {children ?? text}
      <span className={s.icon}>
        {copied ? (
          <Check size={14}  className={s.checkIcon} />
        ) : (
          <Copy size={14} />
        )}
      </span>
    </button>
  );
}
