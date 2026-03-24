import {
  Leaf,
  Users,
  ChartLineUp,
  Target,
  Bell,
  GearSix,
  CheckCircle,
  ChatCircle,
  CalendarBlank,
  Lightning,
  Trophy,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { DocSection } from "../DocSection";
import { SubSection } from "../SubSection";
import { getCategoryForPage } from "../nav-data";
import { FrameworkSwitcher } from "../FrameworkSwitcher";
import s from "./Icons.module.css";

const sampleIcons = [
  { Icon: Leaf, name: "Leaf" },
  { Icon: Users, name: "Users" },
  { Icon: ChartLineUp, name: "ChartLineUp" },
  { Icon: Target, name: "Target" },
  { Icon: Bell, name: "Bell" },
  { Icon: GearSix, name: "GearSix" },
  { Icon: CheckCircle, name: "CheckCircle" },
  { Icon: ChatCircle, name: "ChatCircle" },
  { Icon: CalendarBlank, name: "CalendarBlank" },
  { Icon: Lightning, name: "Lightning" },
  { Icon: Trophy, name: "Trophy" },
  { Icon: MagnifyingGlass, name: "MagnifyingGlass" },
];

const sizes = [16, 20, 24, 32];

const usageCode = `import { Users, Bell, Target } from "@phosphor-icons/react";

// Sempre peso regular (outline) — padrão do Phosphor
<Users size={24} />
<Bell size={20} />
<Target size={20} />

// Tamanhos recomendados: 16, 20, 24, 32`;

const htmlUsageCode = `<!-- No pacote vanilla, ícones são strings SVG registradas por nome.
     O bundle já inclui ~20 ícones Phosphor (regular weight). -->

<!-- 1. Usar ícones pré-registrados via atributo -->
<bud-button icon-left="plus">Adicionar</bud-button>
<bud-button icon-left="magnifying-glass" icon-right="caret-down">Buscar</bud-button>
<bud-badge icon-left="check" color="success">OK</bud-badge>
<bud-input icon-left="magnifying-glass" placeholder="Buscar..."></bud-input>
<bud-alert variant="error" title="Erro"></bud-alert>  <!-- ícone automático -->

<!-- 2. Ícones pré-registrados (todos Phosphor regular weight):
     plus, x, check, minus, caret-down, caret-up, caret-left,
     caret-right, magnifying-glass, warning-circle, check-circle,
     info, warning, circle-notch, dots-three, arrow-left,
     arrow-right, sort-ascending, sort-descending -->

<!-- 3. Registrar ícone Phosphor adicional -->
<script>
  // O path SVG vem de phosphoricons.com (viewBox 0 0 256 256)
  BudDS.registerIcon("bell",
    '<path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06Z"/>'
  );
</script>
<bud-button icon-left="bell">Notificações</bud-button>

<!-- 4. Diferença React vs HTML:
     React: import { Bell } from "@phosphor-icons/react"
            <Bell size={20} />  (componente React)
     HTML:  icon-left="bell"    (string registrada no registry)

     Em React, qualquer ícone Phosphor funciona direto.
     Em HTML, só os pré-registrados + os que você registrar. -->`;

export function Icons() {
  return (
    <DocSection
      id="icones"
      title="Ícones"
      description="Phosphor Icons 2.1 — biblioteca com 7.400+ ícones. No Bud, todos os ícones usam exclusivamente o peso regular (outline)."
      category={getCategoryForPage("icones")}
    >
      <SubSection
        id="galeria"
        title="Galeria"
        description="Ícones mais usados na plataforma, renderizados em peso regular (outline)."
      >
        <div className={s.gallery}>
          {sampleIcons.map(({ Icon, name }) => (
            <div key={name} className={s.iconItem}>
              <Icon size={24} />
              <span className={s.iconName}>{name}</span>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection
        id="tamanhos"
        title="Tamanhos"
        description="Use 16px em inputs e badges, 20px como padrão, 24px em headers e 32px para destaque."
      >
        <div className={s.sizesRow}>
          {sizes.map((sz) => (
            <div key={sz} className={s.sizeItem}>
              <Users size={sz} />
              <span className={s.sizeLabel}>{sz}px</span>
            </div>
          ))}
        </div>
      </SubSection>

      <SubSection id="como-usar" title="Como usar">
        <FrameworkSwitcher examples={[
          { label: "React", language: "tsx", code: usageCode },
          { label: "HTML", language: "html", code: htmlUsageCode },
        ]} />
      </SubSection>
    </DocSection>
  );
}
