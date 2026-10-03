"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Block, FalcBlock, FalcModule, FalcSection, Section } from "@/lib/content";

type Props = {
  sections: Section[];
  falc?: FalcModule | null;
  easy?: boolean;
  onEasyChange?: (value: boolean) => void;
};

function simplify(text: string) {
  return text
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*;\s*/g, ". ")
    .trim();
}

function falcBlocksFallback(blocks: Block[]) {
  return blocks.map((block) => {
    if (block.t === "p") return { ...block, text: simplify(block.text) };
    if (block.t === "ul") return { ...block, items: block.items.map(simplify) };
    return { ...block, text: simplify(block.text) };
  });
}

function NoteFrame({
  kind,
  label,
  children,
}: {
  kind: string;
  label: string;
  children: ReactNode;
}) {
  const styles =
    kind === "glossary"
      ? "border-violet-400 bg-violet-50 text-violet-950"
      : kind === "remember"
        ? "border-emerald-500 bg-emerald-50 text-emerald-950"
        : kind === "warn"
          ? "border-amber-500 bg-amber-50 text-amber-950"
          : kind === "reflect"
            ? "border-sky-500 bg-sky-50 text-sky-950"
            : "border-teal-200 bg-teal-50 text-teal-900";
  return (
    <aside className={`rounded-lg border-l-4 px-4 py-3 text-[0.95rem] ${styles}`}>
      <p className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</p>
      <div className="mt-1">{children}</div>
    </aside>
  );
}

function FalcBlockView({ block }: { block: FalcBlock }) {
  if (block.t === "p") return <p>{block.text}</p>;
  if (block.t === "ul") {
    return (
      <ul className="list-disc pl-6 marker:text-teal-600">
        {block.items.map((item, itemIndex) => (
          <li key={itemIndex} className="mt-1">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (block.t === "glossary") {
    return (
      <NoteFrame kind="glossary" label="Mots difficiles">
        <dl className="flex flex-col gap-2">
          {block.entries.map((entry) => (
            <div key={entry.term}>
              <dt className="font-semibold">{entry.term}</dt>
              <dd>{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </NoteFrame>
    );
  }
  if (block.t === "note") {
    if (block.items?.length) {
      return (
        <NoteFrame kind={block.kind} label={block.label}>
          <ul className="list-disc pl-5">
            {block.items.map((item, index) => (
              <li key={index} className="mt-1">
                {item}
              </li>
            ))}
          </ul>
        </NoteFrame>
      );
    }
    return (
      <NoteFrame kind={block.kind} label={block.label}>
        <p>{block.text}</p>
      </NoteFrame>
    );
  }
  if (block.t === "table") {
    return (
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          {block.headers.length > 0 && (
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                {block.headers.map((header, index) => (
                  <th key={index} className="px-3 py-2 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-100 align-top">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

function FalcGuideView({ falc }: { falc: FalcModule }) {
  return (
    <div className="mt-8 flex flex-col gap-10">
      {falc.goals.length > 0 && (
        <aside className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800">
          <p className="font-bold">Ce que tu vas apprendre</p>
          <ul className="mt-2 list-disc pl-5">
            {falc.goals.map((goal) => (
              <li key={goal} className="mt-1">
                {goal}
              </li>
            ))}
          </ul>
        </aside>
      )}

      {falc.sections.map((section: FalcSection) => {
        const Heading = section.level === 1 ? "h2" : section.level === 2 ? "h3" : "h4";
        const size = section.level === 1 ? "text-2xl" : section.level === 2 ? "text-xl" : "text-base";
        return (
          <section key={section.id} id={`falc-${section.id}`} className="scroll-mt-6">
            <Heading className={`${size} font-bold tracking-tight`}>{section.title}</Heading>
            <div className="mt-3 flex max-w-[70ch] flex-col gap-3 leading-7 text-slate-700">
              {section.blocks.map((block, index) => (
                <FalcBlockView key={index} block={block} />
              ))}
            </div>
          </section>
        );
      })}

      {falc.quiz.length > 0 && (
        <section id="falc-quiz" className="scroll-mt-6 rounded-xl border border-sky-200 bg-sky-50 p-5">
          <h3 className="text-xl font-bold tracking-tight text-sky-950">Teste-toi</h3>
          <p className="mt-2 text-sm text-sky-900">Réponds d&apos;abord. Les réponses sont juste en dessous.</p>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sky-950">
            {falc.quiz.map((item) => (
              <li key={item.question}>
                <p>{item.question}</p>
                <details className="mt-1 text-sm">
                  <summary className="cursor-pointer font-medium text-sky-800">Voir la réponse</summary>
                  <p className="mt-1 rounded-md bg-white/70 px-3 py-2">{item.answer}</p>
                </details>
              </li>
            ))}
          </ol>
        </section>
      )}

      {falc.glossary.length > 0 && (
        <section id="falc-glossary" className="scroll-mt-6">
          <h3 className="text-xl font-bold tracking-tight">Les mots difficiles</h3>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {falc.glossary.map((entry) => (
              <div key={entry.term} className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-950">
                <dt className="font-semibold">{entry.term}</dt>
                <dd className="mt-1">{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}

export function ModuleReader({ sections, falc, easy: easyProp, onEasyChange }: Props) {
  const [easyState, setEasyState] = useState(false);
  const easy = easyProp ?? easyState;
  const setEasy = onEasyChange ?? setEasyState;
  const hasGuide = Boolean(falc);
  const readableSections = useMemo(
    () =>
      easy && !hasGuide
        ? sections.map((section) => ({ ...section, blocks: falcBlocksFallback(section.blocks) }))
        : sections,
    [easy, hasGuide, sections],
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-teal-200 bg-teal-50 p-4">
        <div>
          <p className="font-bold text-teal-950">Mode de lecture</p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-teal-900">
            {hasGuide
              ? "Le mode Facile à lire et à comprendre affiche la théorie FALC du guide officiel : phrases courtes, cadres colorés et mots expliqués."
              : "Le mode Facile à lire et à comprendre présente l'essentiel avec des phrases courtes et une organisation simple."}
          </p>
        </div>
        <button
          type="button"
          aria-pressed={easy}
          onClick={() => setEasy(!easy)}
          className="rounded-lg border border-teal-700 bg-white px-4 py-2 text-sm font-bold text-teal-800 shadow-sm transition hover:bg-teal-700 hover:text-white"
        >
          {easy ? "Afficher le texte complet" : "Activer le mode facile"}
        </button>
      </div>

      {easy && (
        <aside className="mb-8 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-sky-950">
          <p className="font-bold">Comment apprendre dans ce mode ?</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Une idée importante est présentée à la fois.</li>
            <li>Le cadre violet explique les mots difficiles.</li>
            <li>Le cadre vert résume ce qu&apos;il faut retenir.</li>
            <li>Le cadre orange signale un point important ou un danger.</li>
          </ul>
        </aside>
      )}

      {easy && falc ? (
        <FalcGuideView falc={falc} />
      ) : (
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
                    if (block.t === "ul") {
                      return (
                        <ul key={index} className="list-disc pl-6 marker:text-teal-600">
                          {block.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="mt-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <aside
                        key={index}
                        className="rounded-lg border-l-4 border-teal-200 bg-teal-50 px-4 py-3 text-[0.95rem] text-teal-900"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider opacity-70">{block.label}</p>
                        <p className="mt-1">{block.text}</p>
                      </aside>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </>
  );
}
