import Link from "next/link";
import { getModuleByCode, module100Series } from "../theory/data";

export default function TheoryModulePage({ params }: { params: { moduleId: string } }) {
  const module = getModuleByCode(params.moduleId);

  if (!module) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-800 bg-red-950/20 p-8 text-center">
          <h1 className="text-2xl font-bold text-white">Module introuvable</h1>
          <p className="mt-3 text-slate-300">Ce sous-module n'existe pas dans la série 100.</p>
          <Link
            href="/theory"
            className="mt-6 inline-block rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300"
          >
            Retour à la théorie
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Module {module.code}</p>
            <h1 className="mt-2 text-3xl font-bold text-white">{module.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/theory"
              className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
            >
              ← Retour aux modules
            </Link>
            <Link
              href={`/theory-falc?module=${module.code}`}
              className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
            >
              Passer en mode FALC
            </Link>
          </div>
        </header>

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-lg leading-8 text-slate-300">{module.summary}</p>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            {module.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-8">
          {module.theory.map((section) => (
            <section key={section.heading} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-slate-300">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-8">{paragraph}</p>
                ))}
              </div>

              {section.bullets && (
                <ul className="mt-5 space-y-3 text-sm text-slate-300">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {module100Series.map((item) => (
            <Link
              key={item.code}
              href={`/theory/${item.code}`}
              className={`rounded-full border px-3 py-2 text-sm ${
                item.code === module.code
                  ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                  : "border-slate-700 bg-slate-800 text-slate-300"
              }`}
            >
              Module {item.code}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
