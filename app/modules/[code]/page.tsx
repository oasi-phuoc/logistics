import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllModules, getModule, readingMinutes, type Block } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";

export function generateStaticParams() {
  return getAllModules().map((m) => ({ code: m.code }));
}

export function generateMetadata({ params }: { params: { code: string } }): Metadata {
  const m = getModule(params.code);
  return { title: m ? `Module ${m.code} — ${m.title} | LogiCours` : "Module introuvable" };
}

const NOTE_STYLES: Record<string, string> = {
  note: "border-teal-200 bg-teal-50 text-teal-900",
  ref: "border-slate-200 bg-slate-50 text-slate-800",
  tip: "border-sky-200 bg-sky-50 text-sky-900",
  law: "border-violet-200 bg-violet-50 text-violet-900",
  warn: "border-amber-300 bg-amber-50 text-amber-900",
  good: "border-emerald-200 bg-emerald-50 text-emerald-900",
  bad: "border-rose-200 bg-rose-50 text-rose-900",
};

function renderBlock(b: Block, i: number) {
  if (b.t === "p") return <p key={i}>{b.text}</p>;
  if (b.t === "ul")
    return (
      <ul key={i} className="list-disc pl-6 marker:text-teal-600">
        {b.items.map((it, j) => (
          <li key={j} className="mt-1">{it}</li>
        ))}
      </ul>
    );
  return (
    <aside key={i} className={`rounded-lg border-l-4 px-4 py-3 text-[0.95rem] ${NOTE_STYLES[b.kind] ?? NOTE_STYLES.note}`}>
      <p className="text-xs font-bold uppercase tracking-wider opacity-70">{b.label}</p>
      <p className="mt-1">{b.text}</p>
    </aside>
  );
}

export default function ModulePage({ params }: { params: { code: string } }) {
  const mod = getModule(params.code);
  if (!mod) notFound();
  const all = getAllModules();
  const idx = all.findIndex((m) => m.code === mod.code);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      <SiteHeader />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[16rem_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto">
          <details className="rounded-xl border border-slate-200 bg-white p-4 lg:open:block" open>
            <summary className="cursor-pointer text-sm font-bold">Sommaire</summary>
            <nav aria-label="Sommaire du module" className="mt-3">
              <ul className="flex flex-col gap-1 text-sm">
                {mod.sections.map((s) => (
                  <li key={s.id} style={{ paddingLeft: `${(s.level - 1) * 0.75}rem` }}>
                    <a href={`#${s.id}`} className="block rounded px-2 py-1 text-slate-600 hover:bg-teal-50 hover:text-teal-800">
                      {s.number && <span className="mr-1 font-medium text-slate-400">{s.number}</span>}
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </aside>

        <article className="min-w-0">
          <Link href={`/#domaine-${mod.domain}`} className="text-sm font-medium text-teal-700 hover:underline">
            ← Domaine {mod.domain}
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-teal-700">Module {mod.code}</p>
          <h1 className="mt-1 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{mod.title}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>{readingMinutes(mod.words)} min de lecture</span>
            <a href={`/docs/${mod.pdf}`} target="_blank" rel="noreferrer" className="font-medium text-teal-700 hover:underline">
              Ouvrir le PDF original
            </a>
          </p>

          <div className="mt-8 flex flex-col gap-10">
            {mod.sections.map((s) => {
              const Heading = s.level === 1 ? "h2" : s.level === 2 ? "h3" : "h4";
              const size = s.level === 1 ? "text-2xl" : s.level === 2 ? "text-xl" : "text-base";
              return (
                <section key={s.id} id={s.id} className="scroll-mt-6">
                  <Heading className={`${size} font-bold tracking-tight`}>
                    {s.number && <span className="mr-2 text-teal-700">{s.number}</span>}
                    {s.title}
                  </Heading>
                  <div className="mt-3 flex max-w-[70ch] flex-col gap-3 leading-7 text-slate-700">
                    {s.blocks.map(renderBlock)}
                  </div>
                </section>
              );
            })}
          </div>

          <nav aria-label="Navigation entre modules" className="mt-14 flex justify-between gap-4 border-t border-slate-200 pt-6 text-sm">
            {prev ? (
              <Link href={`/modules/${prev.code}`} className="rounded-lg border border-slate-200 bg-white px-4 py-3 hover:border-teal-300">
                ← {prev.code} {prev.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/modules/${next.code}`} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-right hover:border-teal-300">
                {next.code} {next.title} →
              </Link>
            ) : <span />}
          </nav>
        </article>
      </div>
    </main>
  );
}
