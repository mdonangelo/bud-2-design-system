import { DocSection } from "../DocSection";
import { ColorSwatch } from "../ColorSwatch";
import { colorGroups } from "../tokens";
import s from "./Colors.module.css";

export function Colors() {
  return (
    <DocSection
      id="cores"
      title="Cores"
      description="Paleta de cores extraída do Figma Bud. Cada grupo tem um propósito semântico definido — use os tokens CSS para manter consistência."
    >
      <div className={s.brandIntro}>
        <h3 className={s.subsectionTitle}>Cores de marca</h3>
        <p className={s.brandText}>
          As escalas de cor são derivadas das <strong>3 cores primárias da marca Bud</strong>: Orange{" "}
          (<code>--color-orange-400</code>), Wine (<code>--color-wine-700</code>) e Cream{" "}
          (<code>--color-caramel-100</code>). Na escala abaixo, as cores de marca estão
          sinalizadas com o badge <span className={s.brandInline}>Brand</span>.
        </p>
      </div>

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
