import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllModules, getFalcModule, getModule, readingMinutes } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { ModuleShell } from "@/components/module-shell";

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
  const falc = getFalcModule(mod.code) ?? null;
  const all = getAllModules();
  const idx = all.findIndex((m) => m.code === mod.code);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      <SiteHeader />
      <ModuleShell
        sections={mod.sections}
        falc={falc}
        header={
          <>
            <Link href={`/#domaine-${mod.domain}`} className="text-sm font-medium text-teal-700 hover:underline">
              ← Domaine {mod.domain}
            </Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-teal-700">Module {mod.code}</p>
            <h1 className="mt-1 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {falc?.title ?? mod.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span>{readingMinutes(mod.words)} min de lecture</span>
              {falc && (
                <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800">
                  Guide FALC disponible
                </span>
              )}
              <a href={`/docs/${mod.pdf}`} target="_blank" rel="noreferrer" className="font-medium text-teal-700 hover:underline">
                Ouvrir le PDF original
              </a>
            </p>
          </>
        }
        footer={
          <nav aria-label="Navigation entre modules" className="mt-14 flex justify-between gap-4 border-t border-slate-200 pt-6 text-sm">
            {prev ? (
              <Link href={`/modules/${prev.code}`} className="rounded-lg border border-slate-200 bg-white px-4 py-3 hover:border-teal-300">
                ← {prev.code} {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/modules/${next.code}`} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-right hover:border-teal-300">
                {next.code} {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        }
      />
    </main>
  );
}
