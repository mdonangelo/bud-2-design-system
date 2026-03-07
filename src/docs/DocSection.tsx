import type { ReactNode } from "react";
import s from "./DocSection.module.css";

interface DocSectionProps {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function DocSection({ id, title, description, children }: DocSectionProps) {
  return (
    <section id={id} data-section className={s.section}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.description}>{description}</p>
      <div className={s.content}>{children}</div>
    </section>
  );
}
