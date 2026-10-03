"use client";

import { useMemo, useState } from "react";
import type { Block, Section } from "@/lib/content";

type Props = { sections: Section[] };

function simplify(text: string) {
  return text
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*;\s*/g, ". ")
    .trim();
}

function falcBlocks(blocks: Block[]) {
  return blocks.map((block) => {
    if (block.t === "p") return { ...block, text: simplify(block.text) };
    if (block.t === "ul") return { ...block, items: block.items.map(simplify) };
    return { ...block, text: simplify(block.text) };
  });
}

export function ModuleReader({ sections }: Props) {
  const [falc, setFalc] = useState(false);
  const readableSections = useMemo(
    () => (falc ? sections.map((section) => ({ ...section, blocks: falcBlocks(section.blocks) })) : sections),
    [falc, sections],
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-teal-200 bg-teal-50 p-4">
        <div>
          <p className="font-bold text-teal-950">Mode de lecture</p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-teal-900">
            Le mode Facile à lire et à comprendre présente l&apos;essentiel avec des phrases courtes et une organisation simple.
          </p>
        </div>
        <button
          type="button"
          aria-pressed={falc}
          onClick={() => setFalc((value) => !value)}
          className="rounded-lg border border-teal-700 bg-white px-4 py-2 text-sm font-bold text-teal-800 shadow-sm transition hover:bg-teal-700 hover:text-white"
        >
          {falc ? "Afficher le texte complet" : "Activer le mode facile"}
        </button>
      </div>
      {falc && (
        <aside className="mb-8 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-sky-950">
          <p className="font-bold">Comment apprendre dans ce mode ?</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Une idée importante est présentée à la fois.</li>
            <li>Les mots difficiles restent expliqués dans le contexte.</li>
            <li>Après chaque partie, reformulez l&apos;idée avec vos propres mots.</li>
          </ul>
        </aside>
      )}
      <div className="mt-8 flex flex-col gap-10">
        {readableSections.map((section) => {
          const Heading = section.level === 1 ? "h2" : section.level === 2 ? "h3" : "h4";
          const size = section.level === 1 ? "text-2xl" : section.level === 2 ? "text-xl" : "text-base";
          return (
            <section key={section.id} id={section.id} className="scroll-mt-6">
              <Heading className={`${size} font-bold tracking-tight`}>
                {section.number && <span className="mr-2 text-teal-700">{section.number}</span>}
                {section.title}
              </Heading>
              <div className="mt-3 flex max-w-[70ch] flex-col gap-3 leading-7 text-slate-700">
                {section.blocks.map((block, index) => {
                  if (block.t === "p") return <p key={index}>{block.text}</p>;
                  if (block.t === "ul") return <ul key={index} className="list-disc pl-6 marker:text-teal-600">{block.items.map((item, itemIndex) => <li key={itemIndex} className="mt-1">{item}</li>)}</ul>;
                  return <aside key={index} className="rounded-lg border-l-4 border-teal-200 bg-teal-50 px-4 py-3 text-[0.95rem] text-teal-900"><p className="text-xs font-bold uppercase tracking-wider opacity-70">{block.label}</p><p className="mt-1">{block.text}</p></aside>;
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
