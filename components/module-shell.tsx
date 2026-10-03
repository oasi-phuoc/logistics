"use client";

import { useState, type ReactNode } from "react";
import type { FalcModule, Section } from "@/lib/content";
import { ModuleReader } from "@/components/module-reader";

type Props = {
  sections: Section[];
  falc?: FalcModule | null;
  header: ReactNode;
  footer?: ReactNode;
};

export function ModuleShell({ sections, falc, header, footer }: Props) {
  const [easy, setEasy] = useState(false);
  const toc =
    easy && falc
      ? [
          ...falc.sections.map((section) => ({
            id: `falc-${section.id}`,
            number: "",
            title: section.title,
            level: section.level,
          })),
          ...(falc.quiz.length ? [{ id: "falc-quiz", number: "", title: "Teste-toi", level: 2 }] : []),
          ...(falc.glossary.length
            ? [{ id: "falc-glossary", number: "", title: "Les mots difficiles", level: 2 }]
            : []),
        ]
      : sections.map((section) => ({
          id: section.id,
          number: section.number,
          title: section.title,
          level: section.level,
        }));

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[16rem_1fr] lg:px-8">
      <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto">
        <details className="rounded-xl border border-slate-200 bg-white p-4 lg:open:block" open>
          <summary className="cursor-pointer text-sm font-bold">
            Sommaire{easy && falc ? " (mode facile)" : ""}
          </summary>
          <nav aria-label="Sommaire du module" className="mt-3">
            <ul className="flex flex-col gap-1 text-sm">
              {toc.map((item) => (
                <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}>
                  <a href={`#${item.id}`} className="block rounded px-2 py-1 text-slate-600 hover:bg-teal-50 hover:text-teal-800">
                    {item.number && <span className="mr-1 font-medium text-slate-400">{item.number}</span>}
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </aside>

      <article className="min-w-0">
        {header}
        <ModuleReader sections={sections} falc={falc} easy={easy} onEasyChange={setEasy} />
        {footer}
      </article>
    </div>
  );
}
