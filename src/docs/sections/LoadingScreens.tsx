import { useState } from "react";
import { DocSection } from "../DocSection";
import { SubSection } from "../SubSection";
import { PropsTable } from "../PropsTable";
import { getCategoryForPage } from "../nav-data";
import { FrameworkSwitcher, FrameworkOnly } from "../FrameworkSwitcher";
import { CodeSnippet } from "../CodeSnippet";
import { LoadingScreen } from "../../components/LoadingScreen";
import { Button } from "../../components/Button";
import s from "./LoadingScreens.module.css";

/* ——— Código de uso ——— */

const usageCode = `import { LoadingScreen } from "@getbud-co/buds";

// Uso padrão — tela inteira com animação liquid fill
<LoadingScreen />

// Com mensagem customizada
<LoadingScreen message="Conectando ao servidor..." />

// Exemplo: mostrar no boot da aplicação
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    loadInitialData().then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;
  return <MainApp />;
}`;

const htmlUsageCode = `<!-- Tela de loading fullscreen com liquid fill -->
<bud-loading-screen></bud-loading-screen>

<!-- Com mensagem customizada -->
<bud-loading-screen message="Conectando ao servidor..."></bud-loading-screen>

<!-- Exemplo: mostrar/ocultar via JavaScript -->
<bud-loading-screen id="splash"></bud-loading-screen>

<script>
  // Ocultar após dados carregados
  fetchData().then(() => {
    document.getElementById('splash').remove();
  });
</script>`;

export function LoadingScreens() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <DocSection
      id="loading-screen"
      title="Loading Screen"
      description="Tela de loading fullscreen com animação liquid fill no símbolo do Bud. Usada no boot da aplicação enquanto os dados iniciais são carregados. A animação preenche o logo com um sweep left→right, criando um efeito de líquido com borda ondulada."
      category={getCategoryForPage("loading-screen")}
    >
      {/* Preview */}
      <SubSection
        id="preview"
        title="Preview"
        description="Clique para ver a animação em tela cheia."
      >
        <div className={s.previewContainer}>
          <div className={s.previewFrame}>
            <LoadingScreen />
          </div>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowDemo(true)}
          >
            Ver em tela cheia
          </Button>
        </div>

        {showDemo && (
          <div className={s.fullscreenOverlay} onClick={() => setShowDemo(false)}>
            <LoadingScreen />
            <button
              type="button"
              className={s.closeHint}
              onClick={() => setShowDemo(false)}
            >
              Clique em qualquer lugar para fechar
            </button>
          </div>
        )}
      </SubSection>

      {/* Mensagem customizada */}
      <SubSection
        id="mensagem-customizada"
        title="Mensagem customizada"
        description="A prop message permite personalizar o texto exibido abaixo do logo."
      >
        <div className={s.messagesRow}>
          <div className={s.previewFrame}>
            <LoadingScreen message="Conectando ao servidor..." />
          </div>
          <div className={s.previewFrame}>
            <LoadingScreen message="Preparando sua experiência..." />
          </div>
        </div>
      </SubSection>

      {/* Anatomia */}
      <SubSection
        id="anatomia"
        title="Anatomia"
        description="A animação é composta por duas camadas SVG sobrepostas do símbolo do Bud."
      >
        <div className={s.anatomyList}>
          <div className={s.anatomyItem}>
            <span className={s.anatomyBullet} style={{ background: "var(--color-caramel-200)" }} />
            <div>
              <strong>Silhueta (background)</strong>
              <p>O símbolo em caramel-200, sempre visível como "contorno vazio".</p>
            </div>
          </div>
          <div className={s.anatomyItem}>
            <span className={s.anatomyBullet} style={{ background: "var(--color-orange-500)" }} />
            <div>
              <strong>Preenchimento (liquid fill)</strong>
              <p>O símbolo em orange-500, revelado por clip-path animado left→right→left. Borda ondulada via cubic beziers no SVG.</p>
            </div>
          </div>
          <div className={s.anatomyItem}>
            <span className={s.anatomyBullet} style={{ background: "var(--color-neutral-400)" }} />
            <div>
              <strong>Label</strong>
              <p>Texto com animação pulse sincronizada (1.8s). Acessível via role=&quot;status&quot; + aria-label.</p>
            </div>
          </div>
        </div>
      </SubSection>

      {/* Acessibilidade */}
      <SubSection
        id="acessibilidade-loading"
        title="Acessibilidade"
        description="Boas práticas de acessibilidade do componente."
      >
        <ul className={s.a11yList}>
          <li><code>role=&quot;status&quot;</code> anuncia o estado de loading para screen readers</li>
          <li><code>aria-label</code> com a mensagem para tecnologias assistivas</li>
          <li>SVGs decorativos marcados com <code>aria-hidden</code></li>
          <li>Respeita <code>prefers-reduced-motion</code>: animações desabilitadas, logo mostrado completo</li>
        </ul>
      </SubSection>

      {/* API */}
      <SubSection id="api-loading-screen" title="API">
        <PropsTable rows={[
          { prop: "message", attr: "message", type: "string", default: '"Carregando..."', description: "Texto exibido abaixo do logo" },
          { prop: "className", type: "string", description: "Classe CSS adicional no container" },
        ]} />
      </SubSection>

      {/* Como usar */}
      <SubSection id="como-usar-loading" title="Como usar">
        <FrameworkSwitcher examples={[
          { label: "React", language: "tsx", code: usageCode },
          { label: "HTML", language: "html", code: htmlUsageCode },
        ]} />
      </SubSection>

      {/* Design tokens */}
      <SubSection
        id="tokens-loading"
        title="Tokens utilizados"
        description="Tokens do Design System usados pelo componente."
      >
        <FrameworkOnly framework={0}>
          <CodeSnippet
            code={`/* Cores */
--color-neutral-0     /* Background da tela */
--color-caramel-200   /* Silhueta do logo (vazio) */
--color-orange-500    /* Preenchimento do logo (filled) */
--color-neutral-400   /* Cor do texto/label */

/* Tipografia */
--font-body           /* Família do label */
--text-sm             /* Tamanho do label */

/* Espaçamento */
--sp-lg               /* Gap entre logo e label */

/* Animação */
fillSweep: 1.8s ease-in-out infinite   /* Sweep do clip-path */
pulse: 1.8s ease-in-out infinite       /* Opacidade do label */`}
            language="css"
          />
        </FrameworkOnly>
      </SubSection>
    </DocSection>
  );
}
