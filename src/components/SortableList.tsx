import { useCallback, useRef, useState } from "react";
import { DotsSixVertical } from "@phosphor-icons/react";
import s from "./SortableList.module.css";

export interface SortableItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
}

export interface SortableListProps {
  /** Ordered list of items */
  items: SortableItem[];
  /** Called with the reordered items after a drop */
  onChange?: (items: SortableItem[]) => void;
  /** Disables drag-and-drop */
  disabled?: boolean;
  /** Visual size */
  size?: "sm" | "md";
  className?: string;
}

export function SortableList({
  items,
  onChange,
  disabled = false,
  size = "md",
  className,
}: SortableListProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragCounterRef = useRef(0);

  const handleDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(index));
      setDragIndex(index);
    },
    [disabled],
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
    dragCounterRef.current = 0;
  }, []);

  const handleDragEnter = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      dragCounterRef.current++;
      setOverIndex(index);
    },
    [],
  );

  const handleDragLeave = useCallback(() => {
    dragCounterRef.current--;
    if (dragCounterRef.current <= 0) {
      setOverIndex(null);
      dragCounterRef.current = 0;
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      const fromIndex = Number(e.dataTransfer.getData("text/plain"));
      if (isNaN(fromIndex) || fromIndex === dropIndex) {
        handleDragEnd();
        return;
      }

      const reordered = [...items];
      const [moved] = reordered.splice(fromIndex, 1);
      reordered.splice(dropIndex, 0, moved);

      onChange?.(reordered);
      handleDragEnd();
    },
    [items, onChange, handleDragEnd],
  );

  /** Keyboard reordering: Alt+Arrow Up/Down */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (disabled) return;

      let targetIndex: number | null = null;

      if (e.altKey && e.key === "ArrowUp" && index > 0) {
        e.preventDefault();
        targetIndex = index - 1;
      } else if (e.altKey && e.key === "ArrowDown" && index < items.length - 1) {
        e.preventDefault();
        targetIndex = index + 1;
      }

      if (targetIndex !== null) {
        const reordered = [...items];
        const [moved] = reordered.splice(index, 1);
        reordered.splice(targetIndex, 0, moved);
        onChange?.(reordered);

        // Focus the moved item after React re-renders
        requestAnimationFrame(() => {
          const list = e.currentTarget.closest(`.${s.list}`);
          const target = list?.querySelectorAll<HTMLElement>(`.${s.item}`)[targetIndex!];
          target?.focus();
        });
      }
    },
    [disabled, items, onChange],
  );

  const rootClasses = [
    s.list,
    size === "sm" ? s.sm : "",
    disabled ? s.disabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses} role="list" aria-label="Lista reordenável">
      {items.map((item, index) => {
        const isDragging = dragIndex === index;
        const isOver = overIndex === index && dragIndex !== index;

        const itemClasses = [
          s.item,
          isDragging ? s.dragging : "",
          isOver ? s.over : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={item.id}
            role="listitem"
            className={itemClasses}
            draggable={!disabled}
            tabIndex={0}
            aria-label={`${index + 1}. ${item.label}. Use Alt+Setas para reordenar.`}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <span className={s.handle} aria-hidden>
              <DotsSixVertical size={size === "sm" ? 16 : 20} />
            </span>
            <span className={s.number}>{index + 1}</span>
            <span className={s.label}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
