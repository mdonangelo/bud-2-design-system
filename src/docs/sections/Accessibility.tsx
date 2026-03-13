import { DocSection } from "../DocSection";
import { SubSection } from "../SubSection";
import { CodeSnippet } from "../CodeSnippet";
import { getCategoryForPage } from "../nav-data";
import s from "./Accessibility.module.css";

const keyboardRows = [
  {
    component: "Modal / Drawer",
    open: "Enter/Space no trigger",
    navigate: "Tab e Shift+Tab (focus trap)",
    close: "Escape, clique fora",
  },
  {
    component: "Sidebar (mobile)",
    open: "Controle via prop mobileOpen",
    navigate: "Tab e Shift+Tab (focus trap)",
    close: "Escape, overlay, botao fechar",
  },
  {
    component: "Popover",
    open: "Clique no trigger / ArrowRight em submenu",
    navigate: "ArrowUp, ArrowDown, ArrowLeft, ArrowRight",
    close: "Escape, clique fora",
  },
  {
    component: "Select / DropdownButton / FilterBar",
    open: "Enter, Space, ArrowDown, clique",
    navigate: "ArrowUp, ArrowDown, Home, End, Enter",
    close: "Escape, clique fora",
  },
  {
    component: "DatePicker",
    open: "Clique no trigger ou inputs",
    navigate: "Arrow keys no grid + PageUp/PageDown",
    close: "Escape, clique fora",
  },
  {
    component: "Tooltip",
    open: "Hover ou focus no anchor",
    navigate: "N/A",
    close: "Blur, mouse leave, Escape",
  },
];

const semanticRows = [
  {
    component: "Modal / Drawer",
    role: "role=\"dialog\" + aria-modal=\"true\"",
    notes: "Use aria-labelledby via header ou aria-label em header customizado.",
  },
  {
    component: "Popover",
    role: "role=\"menu\" e role=\"menuitem\"",
    notes: "Submenus usam aria-haspopup, aria-expanded e aria-controls.",
  },
  {
    component: "Select / FilterBar",
    role: "combobox + listbox + option",
    notes: "Combobox deve informar aria-controls e aria-activedescendant.",
  },
  {
    component: "DropdownButton",
    role: "menu + menuitem",
    notes: "Trigger usa aria-haspopup=\"menu\" e aria-expanded.",
  },
  {
    component: "DatePicker",
    role: "dialog + grid + gridcell",
    notes: "Dias desabilitados usam disabled real e deixam de ser focaveis.",
  },
  {
    component: "Sidebar",
    role: "aside/nav no desktop, dialog no mobile aberto",
    notes: "Modo mobile adiciona aria-modal para comportamento de drawer.",
  },
];

const regressionCode = `# Suite de regressao
npm run test:run

# Arquivos principais
src/components/Popover.test.tsx
src/components/DatePicker.test.tsx
src/components/MenuKeyboardRegression.test.tsx`;

export function Accessibility() {
  return (
    <DocSection
      id="acessibilidade"
      title="Acessibilidade"
      description="Guia transversal de acessibilidade do Design System. Resume comportamento de teclado, semantica ARIA, foco e criterios de revisao para componentes interativos."
      category={getCategoryForPage("acessibilidade")}
    >
      <SubSection
        id="principios"
        title="Principios"
        description="Todo componente interativo deve respeitar os mesmos pilares de acessibilidade no DS."
      >
        <ul className={s.list}>
          <li>
            <strong>Teclado completo:</strong> toda acao disponivel por mouse deve
            ser executavel por teclado.
          </li>
          <li>
            <strong>Foco visivel:</strong> use <code>:focus-visible</code> com
            contraste adequado e ring consistente.
          </li>
          <li>
            <strong>Semantica correta:</strong> prefira elemento HTML nativo e
            complemente com ARIA apenas quando necessario.
          </li>
          <li>
            <strong>Estado anunciavel:</strong> sincronize atributos como
            <code>aria-expanded</code>, <code>aria-selected</code> e
            <code>aria-current</code> com o estado visual.
          </li>
          <li>
            <strong>Fechamento previsivel:</strong> overlays devem suportar
            Escape e clique fora, com excecoes documentadas.
          </li>
        </ul>
      </SubSection>

      <SubSection
        id="teclado"
        title="Matriz de teclado"
        description="Mapa rapido de interacao por tipo de componente."
      >
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Componente</th>
                <th>Abertura</th>
                <th>Navegacao</th>
                <th>Fechamento</th>
              </tr>
            </thead>
            <tbody>
              {keyboardRows.map((row) => (
                <tr key={row.component}>
                  <td>{row.component}</td>
                  <td>{row.open}</td>
                  <td>{row.navigate}</td>
                  <td>{row.close}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>

      <SubSection
        id="semantica-aria"
        title="Semantica ARIA"
        description="Contratos semanticos esperados para componentes chave."
      >
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Componente</th>
                <th>Role / ARIA</th>
                <th>Observacoes</th>
              </tr>
            </thead>
            <tbody>
              {semanticRows.map((row) => (
                <tr key={row.component}>
                  <td>{row.component}</td>
                  <td>{row.role}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>

      <SubSection
        id="checklist"
        title="Checklist de revisao"
        description="Use este checklist em PRs de componentes novos ou alterados."
      >
        <ol className={s.checklist}>
          <li>Testar o fluxo completo apenas com teclado.</li>
          <li>Confirmar foco inicial e restauracao de foco no fechamento.</li>
          <li>Validar Escape e clique fora quando houver overlay.</li>
          <li>Revisar roles e atributos ARIA contra o comportamento real.</li>
          <li>Garantir que estados disabled nao recebem foco indevido.</li>
          <li>Executar a suite de regressao antes de publicar.</li>
        </ol>
      </SubSection>

      <SubSection
        id="regressoes-automatizadas"
        title="Regressoes automatizadas"
        description="Casos criticos de overlay e teclado ja cobertos por testes."
      >
        <CodeSnippet code={regressionCode} language="bash" />
      </SubSection>
    </DocSection>
  );
}
