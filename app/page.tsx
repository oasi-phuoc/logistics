import Link from "next/link";
import { DOMAINS, getAllModules, getModulesByDomain, readingMinutes } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  const total = getAllModules().length;
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
        <section className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            Théorie du manuel
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Toute la théorie de la logistique, <span className="text-teal-700">module par module.</span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {total} modules issus des PDF du cours, affichés tels quels : chaque chapitre, chaque titre et chaque encadré.
            Le PDF original reste disponible sur chaque module.
          </p>
        </section>

        <div className="mt-14 flex flex-col gap-14">
          {DOMAINS.map((domain) => {
            const modules = getModulesByDomain(domain.code);
            return (
              <section key={domain.code} id={`domaine-${domain.code}`} aria-labelledby={`h-${domain.code}`}>
                <div className="mb-5 flex items-baseline gap-4 border-b border-slate-200 pb-4">
                  <span className="text-3xl font-bold text-teal-700">{domain.code}</span>
                  <div>
                    <h2 id={`h-${domain.code}`} className="text-xl font-bold">{domain.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">{domain.description}</p>
                  </div>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {modules.map((m) => (
                    <li key={m.code}>
                      <Link
                        href={`/modules/${m.code}`}
                        className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Module {m.code}</span>
                        <span className="mt-1 font-semibold leading-snug">{m.title}</span>
                        <span className="mt-auto pt-4 text-xs text-slate-500">
                          {m.sections.length} sections · {readingMinutes(m.words)} min de lecture
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
