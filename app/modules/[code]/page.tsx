import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllModules, getModule, readingMinutes } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { ModuleReader } from "@/components/module-reader";

export function generateStaticParams() {
  return getAllModules().map((m) => ({ code: m.code }));
}

export function generateMetadata({ params }: { params: { code: string } }): Metadata {
  const m = getModule(params.code);
  return { title: m ? `Module ${m.code} — ${m.title} | LogiCours` : "Module introuvable" };
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

          <ModuleReader sections={mod.sections} />

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
