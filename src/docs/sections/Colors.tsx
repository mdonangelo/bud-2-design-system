import { DocSection } from "../DocSection";
import { SubSection } from "../SubSection";
import { getCategoryForPage } from "../nav-data";
import { ColorSwatch } from "../ColorSwatch";
import { colorGroups } from "../tokens";
import s from "./Colors.module.css";

/* ——— Semantic color data ——— */

interface SemanticRow {
  role: string;
  token: string;
  usage: string;
}

interface SemanticGroup {
  title: string;
  description: string;
  rows: SemanticRow[];
}

const semanticGroups: SemanticGroup[] = [
  {
    title: "Texto",
    description: "Hierarquia tipográfica e estados de texto.",
    rows: [
      { role: "Primário", token: "--color-neutral-950", usage: "Títulos, corpo de texto, valores" },
      { role: "Secundário", token: "--color-neutral-500", usage: "Descrições, placeholders, labels auxiliares" },
      { role: "Terciário", token: "--color-neutral-400", usage: "Texto desabilitado, timestamps, hints" },
      { role: "Invertido", token: "--color-white", usage: "Texto sobre fundos escuros (botões, badges)" },
      { role: "Link / Ação", token: "--color-orange-500", usage: "Links, ações primárias inline" },
    ],
  },
  {
    title: "Superfícies",
    description: "Backgrounds de páginas, cards e containers.",
    rows: [
      { role: "Padrão", token: "--color-white", usage: "Fundo de página, cards, modais, popovers" },
      { role: "Sutil", token: "--color-caramel-50", usage: "Headers de accordion, hover em superfícies, linhas zebradas" },
      { role: "Elevada", token: "--color-neutral-100", usage: "Badges neutros, inputs desabilitados" },
      { role: "Invertida", token: "--color-neutral-800", usage: "Toast dark, tooltips" },
    ],
  },
  {
    title: "Bordas & Divisores",
    description: "Contornos de componentes e separadores visuais.",
    rows: [
      { role: "Padrão", token: "--color-caramel-300", usage: "Bordas de inputs, cards, popovers, divisores" },
      { role: "Sutil", token: "--color-caramel-200", usage: "Divisores internos (cards, listas, tabelas)" },
      { role: "Hover", token: "--color-caramel-500", usage: "Borda ao passar o mouse sobre controles" },
      { role: "Foco", token: "--color-caramel-700", usage: "Borda em foco + ring externo" },
      { role: "Ring de foco", token: "--color-caramel-200", usage: "Ring externo (box-shadow 2px) em controles focados" },
    ],
  },
  {
    title: "Primária (Orange)",
    description: "Ações principais, seleção e elementos de destaque da marca.",
    rows: [
      { role: "Preenchimento", token: "--color-orange-500", usage: "Botões primários, checkboxes, radios, seleção ativa" },
      { role: "Preenchimento hover", token: "--color-orange-600", usage: "Hover de botões primários, borda de checked" },
      { role: "Fundo sutil", token: "--color-orange-50", usage: "Badges orange, notificações não lidas, hover today" },
      { role: "Fundo hover", token: "--color-orange-100", usage: "Hover em itens não lidos, hover calendário" },
      { role: "Texto sobre fundo", token: "--color-orange-800", usage: "Texto de badges orange (WCAG AA)" },
      { role: "Ring de foco", token: "--color-orange-200", usage: "Ring externo em controles checked + focados" },
    ],
  },
  {
    title: "Suporte (Wine)",
    description: "Destaques institucionais e variações da marca.",
    rows: [
      { role: "Fundo sutil", token: "--color-wine-50", usage: "Badges wine" },
      { role: "Texto", token: "--color-wine-600", usage: "Texto de badges wine, destaques institucionais" },
    ],
  },
  {
    title: "Sucesso (Green)",
    description: "Feedback positivo, conclusão e progresso.",
    rows: [
      { role: "Fundo", token: "--color-green-50", usage: "Alerts, toasts e banners de sucesso" },
      { role: "Borda", token: "--color-green-200", usage: "Borda de alerts de sucesso" },
      { role: "Ícone / Destaque", token: "--color-green-700", usage: "Ícones e links em contexto de sucesso" },
      { role: "Título", token: "--color-green-900", usage: "Título de alerts de sucesso" },
      { role: "Header toast", token: "--color-green-800", usage: "Texto do header de toast sucesso" },
      { role: "Dismiss", token: "--color-green-400", usage: "Ícone de fechar em alerts de sucesso" },
      { role: "Dismiss hover", token: "--color-green-100", usage: "Background hover do botão fechar" },
      { role: "Gauge", token: "--color-green-500", usage: "Anel de progresso do Chart gauge" },
      { role: "Badge texto", token: "--color-green-700", usage: "Texto de badges de sucesso (WCAG AA)" },
    ],
  },
  {
    title: "Erro (Red)",
    description: "Estados de erro, ações destrutivas e alertas críticos.",
    rows: [
      { role: "Fundo", token: "--color-red-50", usage: "Alerts, toasts e banners de erro" },
      { role: "Borda", token: "--color-red-200", usage: "Borda de alerts de erro" },
      { role: "Borda input", token: "--color-red-300", usage: "Borda de inputs com erro" },
      { role: "Borda input hover", token: "--color-red-500", usage: "Hover em inputs com erro" },
      { role: "Borda input foco", token: "--color-red-700", usage: "Foco em inputs com erro" },
      { role: "Ring de foco", token: "--color-red-200", usage: "Ring externo em inputs com erro focados" },
      { role: "Ícone / Destaque", token: "--color-red-700", usage: "Ícones e links em contexto de erro" },
      { role: "Título", token: "--color-red-900", usage: "Título de alerts de erro" },
      { role: "Header toast", token: "--color-red-800", usage: "Texto do header de toast de erro" },
      { role: "Mensagem", token: "--color-red-600", usage: "Mensagens de erro inline (inputs, DatePicker)" },
      { role: "Dismiss", token: "--color-red-400", usage: "Ícone de fechar em alerts de erro" },
      { role: "Dismiss hover", token: "--color-red-100", usage: "Background hover do botão fechar" },
      { role: "Badge texto", token: "--color-red-700", usage: "Texto de badges de erro (WCAG AA)" },
    ],
  },
  {
    title: "Alerta (Yellow)",
    description: "Avisos, estados de atenção e informações importantes.",
    rows: [
      { role: "Fundo", token: "--color-yellow-50", usage: "Alerts, toasts e banners de alerta" },
      { role: "Borda", token: "--color-yellow-200", usage: "Borda de alerts de alerta" },
      { role: "Ícone / Destaque", token: "--color-yellow-700", usage: "Ícones e links em contexto de alerta" },
      { role: "Título", token: "--color-yellow-900", usage: "Título de alerts de alerta" },
      { role: "Header toast", token: "--color-yellow-800", usage: "Texto do header de toast de alerta" },
      { role: "Mensagem", token: "--color-yellow-600", usage: "Mensagens de atenção inline (inputs, DatePicker)" },
      { role: "Dismiss", token: "--color-yellow-400", usage: "Ícone de fechar em alerts de alerta" },
      { role: "Dismiss hover", token: "--color-yellow-100", usage: "Background hover do botão fechar" },
      { role: "Badge texto", token: "--color-yellow-700", usage: "Texto de badges de alerta (WCAG AA)" },
    ],
  },
  {
    title: "Neutro (Info)",
    description: "Informações gerais, estados padrão e estrutura visual.",
    rows: [
      { role: "Fundo", token: "--color-neutral-50", usage: "Alerts e banners informativos" },
      { role: "Fundo toast", token: "--color-neutral-100", usage: "Header de toast neutro, badges neutros" },
      { role: "Borda", token: "--color-neutral-200", usage: "Borda de alerts informativos, track do gauge" },
      { role: "Ícone", token: "--color-neutral-600", usage: "Ícones em contexto informativo" },
      { role: "Título", token: "--color-neutral-900", usage: "Título de alerts informativos" },
      { role: "Header toast", token: "--color-neutral-800", usage: "Texto do header de toast neutro" },
      { role: "Badge texto", token: "--color-neutral-700", usage: "Texto de badges neutros" },
      { role: "Desabilitado fundo", token: "--color-neutral-100", usage: "Background de inputs e controles desabilitados" },
      { role: "Desabilitado borda", token: "--color-neutral-300", usage: "Borda de controles desabilitados" },
      { role: "Desabilitado texto", token: "--color-neutral-400", usage: "Texto e ícones desabilitados" },
    ],
  },
];

/* ——— Semantic table component ——— */

function SemanticTable({ group }: { group: SemanticGroup }) {
  return (
    <div className={s.semanticGroup}>
      <div className={s.semanticGroupHeader}>
        <h4 className={s.semanticGroupTitle}>{group.title}</h4>
        <p className={s.semanticGroupDesc}>{group.description}</p>
      </div>
      <div className={s.semanticTable}>
        <div className={s.semanticHead}>
          <span>Papel</span>
          <span>Token</span>
          <span>Uso</span>
        </div>
        {group.rows.map((row) => (
          <div key={`${group.title}-${row.role}`} className={s.semanticRow}>
            <span className={s.semanticRole}>{row.role}</span>
            <span className={s.semanticToken}>
              <span
                className={s.semanticDot}
                style={{ backgroundColor: `var(${row.token})` }}
              />
              <code>{row.token}</code>
            </span>
            <span className={s.semanticUsage}>{row.usage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ——— Page ——— */

export function Colors() {
  return (
    <DocSection
      id="cores"
      title="Cores"
      description="Paleta de cores extraída do Figma Bud. Cada grupo tem um propósito semântico definido — use os tokens CSS para manter consistência."
      category={getCategoryForPage("cores")}
    >
      {/* ——— Semantic colors ——— */}
      <SubSection
        id="cores-semanticas"
        title="Cores semânticas"
        description="Guia de decisão: qual token usar em cada contexto. As cores semânticas mapeiam os tokens da paleta aos seus papéis funcionais nos componentes."
      >
        <div className={s.semanticGroups}>
          {semanticGroups.map((group) => (
            <SemanticTable key={group.title} group={group} />
          ))}
        </div>
      </SubSection>

      {/* ——— Brand colors ——— */}
      <SubSection
        id="cores-marca"
        title="Cores de marca"
      >
        <p className={s.brandText}>
          As escalas de cor são derivadas das <strong>3 cores primárias da marca Bud</strong>: Orange{" "}
          (<code>--color-orange-400</code>), Wine (<code>--color-wine-700</code>) e Cream{" "}
          (<code>--color-caramel-100</code>). Na escala abaixo, as cores de marca estão
          sinalizadas com o badge <span className={s.brandInline}>Brand</span>.
        </p>
      </SubSection>

      {/* ——— Color scales ——— */}
      <div className={s.groups}>
        {colorGroups.map((group) => (
          <div key={group.label} className={s.group}>
            <div className={s.groupHeader}>
              <h3 className={s.groupLabel}>{group.label}</h3>
              <p className={s.groupDescription}>{group.description}</p>
            </div>
            <div className={s.swatches}>
              {group.colors.map((c) => (
                <ColorSwatch
                  key={c.token}
                  token={c.token}
                  hex={c.hex}
                  name={c.name}
                  brandName={c.brandName}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </DocSection>
  );
}
