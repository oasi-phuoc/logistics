import Link from "next/link";
import { module100Series } from "./data";

export default function TheoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Logistics Academy</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Théorie</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/theory-falc"
              className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
            >
              Mode FALC
            </Link>
            <Link
              href="/glossary"
              className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 hover:bg-violet-500/20"
            >
              Glossaire
            </Link>
          </div>
        </header>

        <section className="mb-8 rounded-2xl border border-cyan-800 bg-cyan-950/20 p-5">
          <p className="text-lg font-semibold text-cyan-200">Module 100</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Fondements de la logistique</h2>
          <p className="mt-2 text-slate-300">
            Sélectionnez un sous-module pour consulter la théorie complète puis passer en mode FALC.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {module100Series.map((module) => (
            <Link
              key={module.code}
              href={`/theory/${module.code}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500/60 hover:bg-slate-800"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Module {module.code}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{module.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{module.summary}</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {module.points.slice(0, 2).map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 inline-flex items-center text-sm font-medium text-cyan-300 group-hover:text-cyan-200">
                Ouvrir le module →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
