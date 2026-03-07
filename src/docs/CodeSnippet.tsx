import { Copy, Check } from "@phosphor-icons/react";
import { useState, useCallback } from "react";
import s from "./CodeSnippet.module.css";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code, language }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* fallback */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div className={s.wrapper}>
      {language && <span className={s.lang}>{language}</span>}
      <button
        type="button"
        className={s.copyBtn}
        onClick={handleCopy}
        title="Copiar código"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <pre className={s.pre}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
