import s from "./LoadingScreen.module.css";

/* ——— Types ——— */

export interface LoadingScreenProps {
  /** Mensagem exibida abaixo do logo (default: "Carregando...") */
  message?: string;
  /** Classe CSS adicional */
  className?: string;
}

/* ——— Logo path (Bud symbol) ——— */

const SYMBOL_PATH =
  "M239.986 44.8463C239.406 21.0338 220.559 1.4407 196.862 0.0776031C189.718 -0.333 182.901 0.900098 176.753 3.43709V3.43451L155.54 12.2361C153.849 12.9376 151.913 12.6686 150.476 11.532L148.329 9.83555C140.532 3.67521 130.693 0.000373357 119.999 0.000373357C113.82 0.000373357 107.926 1.22832 102.545 3.45511V3.45253L6.85696 43.3789L6.85439 43.3802L6.50423 43.5269L6.47217 43.5398V43.5411C5.14977 44.1216 3.9659 44.9634 2.98469 45.9983C1.13641 47.947 0 50.5831 0 53.4869C0 56.3882 1.13385 59.0243 2.9834 60.9756C4.41226 62.4816 6.26695 63.5757 8.35507 64.0648L8.37816 64.0712L107.653 90.31C111.58 91.4105 115.722 91.9987 119.999 91.9987C130.693 91.9987 140.53 88.3239 148.329 82.1635C148.969 81.6577 149.595 81.1364 150.207 80.5984C151.668 79.3138 153.718 78.9521 155.513 79.7012L176.325 88.3844L176.755 88.5646C182.124 90.7785 188.003 92 194.166 92C214.255 92 231.327 79.0306 237.515 60.9782C239.243 55.9364 240.124 50.5046 239.986 44.8463ZM148.33 46.2827V46.3342C148.33 46.3754 148.33 46.4166 148.329 46.4565C148.245 51.7789 146.704 56.7447 144.087 60.9743C141.591 65.0083 138.118 68.3678 133.998 70.7207C129.87 73.0788 125.094 74.4264 120.004 74.4264C115.121 74.4264 110.528 73.1869 106.52 71.0052C102.178 68.6419 98.5204 65.1731 95.9217 60.9743C94.498 58.6729 93.3924 56.1539 92.6664 53.4754C92.02 51.0915 91.6762 48.5854 91.6762 45.997C91.6762 43.3287 92.0418 40.7441 92.7293 38.2946C94.5083 31.9335 98.4383 26.4734 103.683 22.7586C108.297 19.4879 113.927 17.5675 120.006 17.5675C125.053 17.5675 129.792 18.892 133.897 21.2153C142.39 26.019 148.167 35.0947 148.33 45.5387C148.331 45.5799 148.331 45.6198 148.331 45.6597V45.7112C148.334 45.8065 148.334 45.9017 148.334 45.997C148.333 46.0922 148.333 46.1875 148.33 46.2827ZM218.252 60.9743C213.256 69.05 204.338 74.4264 194.169 74.4264C187.602 74.4264 181.558 72.1829 176.755 68.4205C174.119 66.3572 171.857 63.8344 170.087 60.9743C167.396 56.625 165.842 51.4931 165.842 45.9983C165.842 36.8878 170.113 28.7774 176.755 23.576C181.558 19.8123 187.602 17.5701 194.169 17.5701C209.814 17.5701 222.498 30.2975 222.498 45.9995C222.497 51.4931 220.943 56.6237 218.252 60.9743Z";

const VB_W = 240;
const VB_H = 92;

/* ——— LoadingScreen ——— */

/**
 * Tela de loading fullscreen com animação liquid fill no logo do Bud.
 *
 * Usada no boot da aplicação enquanto os dados iniciais são carregados.
 * A animação preenche o símbolo do Bud com um sweep left→right,
 * simulando um líquido com borda ondulada via cubic beziers.
 *
 * @example
 * ```tsx
 * import { LoadingScreen } from "@getbud-co/buds";
 *
 * // Uso padrão
 * <LoadingScreen />
 *
 * // Com mensagem customizada
 * <LoadingScreen message="Conectando ao servidor..." />
 * ```
 */
export function LoadingScreen({
  message = "Carregando...",
  className,
}: LoadingScreenProps) {
  const cls = [s.screen, className].filter(Boolean).join(" ");

  return (
    <div className={cls} role="status" aria-label={message}>
      <div className={s.logoContainer}>
        {/* Grey silhouette — the empty shape */}
        <svg
          className={s.logoBackground}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          width={96}
          height={37}
          aria-hidden
        >
          <path d={SYMBOL_PATH} fill="currentColor" />
        </svg>

        {/* Orange layer — revealed by animated clip rect sweeping left→right */}
        <svg
          className={s.logoFilled}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          width={96}
          height={37}
          aria-hidden
        >
          <defs>
            <clipPath id="bud-liquid">
              <path
                className={s.liquidRect}
                d={`
                  M -${VB_W} -10
                  L ${VB_W - 4} -10
                  C ${VB_W + 4} 10, ${VB_W - 4} 20, ${VB_W} 30
                  C ${VB_W + 4} 40, ${VB_W - 4} 52, ${VB_W} 62
                  C ${VB_W + 4} 72, ${VB_W - 4} 82, ${VB_W} 102
                  L -${VB_W} 102
                  Z
                `}
              />
            </clipPath>
          </defs>
          <path
            d={SYMBOL_PATH}
            fill="currentColor"
            clipPath="url(#bud-liquid)"
          />
        </svg>
      </div>

      <span className={s.label}>{message}</span>
    </div>
  );
}
