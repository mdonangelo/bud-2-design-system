import { useState, useCallback } from "react";
import { Check } from "@phosphor-icons/react";
import s from "./ColorSwatch.module.css";

interface ColorSwatchProps {
  token: string;
  hex: string;
  name: string;
  brandName?: string;
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.85;
}

export function ColorSwatch({ token, hex, name, brandName }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`var(${token})`);
    } catch {
      /* fallback for older browsers */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [token]);

  const light = isLightColor(hex);

  return (
    <button
      type="button"
      className={s.swatch}
      onClick={handleCopy}
      title={`Copiar var(${token})`}
    >
      <div
        className={`${s.color} ${light ? s.colorLight : ""}`}
        style={{ backgroundColor: hex }}
      >
        {copied && (
          <span className={s.copied}>
            <Check size={16} weight="bold" />
          </span>
        )}
      </div>
      <div className={s.info}>
        <div className={s.token}>{name}</div>
        {brandName && <span className={s.brand}>Brand</span>}
      </div>
      <div className={s.hex}>{hex}</div>
    </button>
  );
}
