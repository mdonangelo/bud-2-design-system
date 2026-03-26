import { DocSection } from "../DocSection";
import { getCategoryForPage } from "../nav-data";
import { CopyButton } from "../CopyButton";
import { shadowTokens } from "../tokens";
import s from "./Shadows.module.css";

export function Shadows() {
  return (
    <DocSection
      id="sombras"
      title="Sombras"
      description="Cinco níveis de elevação com sombras multi-layer e cor quente. A base rgba(24, 18, 12) harmoniza com a paleta caramel do BUDS — sombras são sentidas, não vistas."
      category={getCategoryForPage("sombras")}
    >
      <div className={s.showcase}>
        {shadowTokens.map((t) => (
          <div
            key={t.token}
            className={s.card}
            style={{ boxShadow: `var(${t.token})` }}
          >
            <CopyButton text={`var(${t.token})`}>
              <span className={s.cardLabel}>{t.token.replace("--", "")}</span>
            </CopyButton>
            <div className={s.cardUsage}>{t.usage}</div>
          </div>
        ))}
        <div className={s.card}>
          <div className={s.cardLabel}>sem sombra</div>
          <div className={s.cardUsage}>Elementos flat, sem elevação</div>
        </div>
      </div>
    </DocSection>
  );
}
