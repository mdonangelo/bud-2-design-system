import { Eye, GridFour, Lightning, Leaf } from "@phosphor-icons/react";
import { DocSection } from "../DocSection";
import { CodeSnippet } from "../CodeSnippet";
import s from "./Overview.module.css";

const principles = [
  {
    icon: Eye,
    title: "Clareza",
    description:
      "Cada elemento tem um propósito. Interfaces limpas que comunicam sem ruído, guiando o usuário com hierarquia visual consistente.",
  },
  {
    icon: GridFour,
    title: "Consistência",
    description:
      "Tokens compartilhados garantem que cores, tipografia e espaçamento se comportem de forma previsível em toda a plataforma.",
  },
  {
    icon: Lightning,
    title: "Eficiência",
    description:
      "Componentes reutilizáveis e decisões de design pré-definidas aceleram o desenvolvimento sem sacrificar qualidade.",
  },
];

const quickStartCode = `/* Importe os estilos globais no entry point */
import "./styles/global.css";

/* Use tokens como CSS custom properties */
.card {
  padding: var(--sp-sm);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-xs);
  font-family: var(--font-body);   /* Inter */
  font-weight: 400;                /* Regular (Paragraph) */
  color: var(--color-neutral-950);
  background: var(--color-white);
}

.cardTitle {
  font-family: var(--font-heading); /* Plus Jakarta Sans */
  font-weight: 600;                 /* SemiBold (Title) */
  font-size: var(--text-md);
  letter-spacing: -0.005em;         /* Title ≥ 20px */
}

.heroTitle {
  font-family: var(--font-display); /* Crimson Pro */
  font-weight: 600;                 /* SemiBold */
  font-size: var(--text-9xl);       /* 72px */
  line-height: 95%;
  letter-spacing: -0.02em;          /* Display -2% */
}`;

export function Overview() {
  return (
    <DocSection
      id="visao-geral"
      title="Bud Design System"
      description="Sistema de design para a plataforma Bud — gestão de desempenho contínua. Tokens, componentes e padrões que garantem consistência visual e experiência coesa."
    >
      <div className={s.hero}>
        <div className={s.heroBadge}>
          <Leaf size={16} />
          <span>v0.1</span>
        </div>
      </div>

      <div className={s.principles}>
        {principles.map((p) => (
          <div key={p.title} className={s.principleCard}>
            <div className={s.principleIcon}>
              <p.icon size={24} />
            </div>
            <h3 className={s.principleTitle}>{p.title}</h3>
            <p className={s.principleDescription}>{p.description}</p>
          </div>
        ))}
      </div>

      <div className={s.quickStart}>
        <h3 className={s.subsectionTitle}>Quick start</h3>
        <p className={s.subsectionDescription}>
          Todos os tokens estão definidos como CSS custom properties em{" "}
          <code className={s.inlineCode}>tokens.css</code> e importados
          globalmente. Use <code className={s.inlineCode}>var(--token-name)</code>{" "}
          em qualquer CSS Module.
        </p>
        <CodeSnippet code={quickStartCode} language="css" />
      </div>
    </DocSection>
  );
}
