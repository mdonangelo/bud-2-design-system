import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { NAV_GROUPS } from "./nav-data";
import s from "./SearchModal.module.css";

const SEARCH_KEYWORDS: Record<string, string[]> = {
  "visao-geral": ["overview", "início", "introdução"],
  "acessibilidade": ["a11y", "aria", "teclado", "foco", "wcag", "screen reader"],
  "contrato-overlays": ["overlay", "modal", "drawer", "escape", "focus trap", "click outside", "z-index"],
  logos: ["marca", "brand", "logotipo", "símbolo"],
  cores: ["colors", "paleta", "palette", "hex", "rgb", "tema"],
  tipografia: ["fonts", "fontes", "text", "heading", "título"],
  espacamento: ["spacing", "gap", "padding", "margin"],
  "border-radius": ["arredondamento", "cantos", "rounded"],
  sombras: ["shadows", "elevação", "elevation"],
  icones: ["icons", "phosphor", "pictograma"],
  botoes: ["buttons", "cta", "ação", "action"],
  checkboxes: ["checkbox", "marcar", "seleção"],
  "choice-boxes": ["choice", "opção", "card"],
  "date-picker": ["data", "calendário", "calendar"],
  inputs: ["campo", "field", "formulário", "form", "texto"],
  radios: ["radio", "opção", "alternativa"],
  "scale-inputs": ["escala", "nps", "likert", "rating", "avaliação", "nota"],
  selects: ["dropdown", "lista", "combobox"],
  "sortable-lists": ["ordenar", "ranking", "drag", "arrastar", "reordenar", "prioridade"],
  textareas: ["textarea", "texto longo", "multiline"],
  toggles: ["switch", "ligar", "desligar", "on off"],
  avatars: ["foto", "imagem", "perfil", "user"],
  badges: ["tag", "etiqueta", "status", "label"],
  breadcrumbs: ["navegação", "caminho", "path"],
  charts: ["gráfico", "chart", "dados", "visualização"],
  "overlays-utilitarios": [
    "notification panel",
    "command palette",
    "overlay",
    "atalho",
    "produtividade",
    "notificacao",
  ],
  "componentes-avancados": [
    "notification panel",
    "command palette",
    "overlay",
  ],
  "goal-progress": ["meta", "progresso", "objetivo", "okr"],
  popovers: ["popover", "tooltip", "flutuante"],
  modals: ["modal", "dialog", "diálogo", "popup"],
  toasts: ["toast", "notificação", "alerta", "snackbar"],
  "ai-assistant": ["ia", "inteligência artificial", "copilot", "assistente"],
};

interface FlatItem {
  id: string;
  label: string;
  groupLabel: string;
}

function getAllItems(): FlatItem[] {
  const items: FlatItem[] = [];
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      items.push({ id: item.id, label: item.label, groupLabel: group.label });
    }
  }
  return items;
}

function matchesQuery(item: FlatItem, q: string): boolean {
  if (item.label.toLowerCase().includes(q)) return true;
  if (item.groupLabel.toLowerCase().includes(q)) return true;
  const kws = SEARCH_KEYWORDS[item.id];
  if (kws && kws.some((kw) => kw.toLowerCase().includes(q))) return true;
  return false;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function SearchModal({ open, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allItems = useMemo(() => getAllItems(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((item) => matchesQuery(item, q));
  }, [query, allItems]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filtered]);

  useEffect(() => {
    if (!listRef.current) return;
    const els = listRef.current.querySelectorAll("[data-search-item]");
    els[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!open) return null;

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
        break;
      case "Enter":
        if (filtered.length > 0) {
          e.preventDefault();
          onNavigate(filtered[selectedIndex].id);
        }
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  }

  // Group filtered items
  const groups: { label: string; items: { item: FlatItem; flatIndex: number }[] }[] = [];
  let currentGroup: string | null = null;
  let flatIndex = 0;
  for (const item of filtered) {
    if (item.groupLabel !== currentGroup) {
      currentGroup = item.groupLabel;
      groups.push({ label: currentGroup, items: [] });
    }
    groups[groups.length - 1].items.push({ item, flatIndex });
    flatIndex++;
  }

  return createPortal(
    <div
      className={s.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div className={s.container}>
        <div className={s.inputRow}>
          <MagnifyingGlass size={16} className={s.inputIcon} />
          <input
            ref={inputRef}
            className={s.input}
            type="text"
            placeholder="Buscar no Design System..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={s.list} ref={listRef}>
          {filtered.length === 0 ? (
            <div className={s.empty}>Nenhum resultado encontrado</div>
          ) : (
            groups.map((group) => (
              <div key={group.label || "root"}>
                {group.label && (
                  <div className={s.groupLabel}>{group.label}</div>
                )}
                {group.items.map(({ item, flatIndex: fi }) => (
                  <button
                    key={item.id}
                    type="button"
                    data-search-item
                    className={`${s.item} ${fi === selectedIndex ? s.itemSelected : ""}`}
                    onMouseEnter={() => setSelectedIndex(fi)}
                    onClick={() => onNavigate(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>

        <div className={s.footer}>
          <span>
            <kbd className={s.kbd}>↑</kbd> <kbd className={s.kbd}>↓</kbd>{" "}
            navegar
          </span>
          <span>
            <kbd className={s.kbd}>↵</kbd> abrir
          </span>
          <span>
            <kbd className={s.kbd}>esc</kbd> sair
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
