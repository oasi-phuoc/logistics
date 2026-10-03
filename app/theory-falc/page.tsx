import Link from "next/link";
import { getModuleByCode, module100Series } from "../theory/data";

export default function FalcTheoryPage({
  searchParams,
}: {
  searchParams?: { module?: string | string[] };
}) {
  const requestedModule = Array.isArray(searchParams?.module)
    ? searchParams.module[0]
    : searchParams?.module;

  const module = getModuleByCode(requestedModule ?? "101") ?? module100Series[0];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">Mode FALC</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Module {module.code}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/theory/${module.code}`}
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Retour à la théorie standard
            </Link>
            <Link
              href="/theory"
              className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
            >
              Voir les modules
            </Link>
          </div>
        </header>

        <section className="mb-8 rounded-2xl border border-emerald-800 bg-emerald-950/20 p-6">
          <h2 className="text-2xl font-semibold text-emerald-200">{module.title}</h2>
          <p className="mt-3 text-slate-300">{module.summary}</p>
        </section>

        <div className="mb-8 flex flex-wrap gap-3">
          {module100Series.map((item) => (
            <Link
              key={item.code}
              href={`/theory-falc?module=${item.code}`}
              className={`rounded-full border px-3 py-2 text-sm ${
                item.code === module.code
                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                  : "border-slate-700 bg-slate-800 text-slate-300"
              }`}
            >
              Module {item.code}
            </Link>
          ))}
        </div>

        <div className="space-y-8">
          {module.falc.map((section) => (
            <section key={section.heading} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-2xl font-semibold text-emerald-300">{section.heading}</h3>
              <p className="mt-3 text-base leading-8 text-slate-300">{section.text}</p>

              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
