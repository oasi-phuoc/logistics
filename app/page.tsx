import Link from "next/link";
import { module100Series, theoryOverviewTitle } from "./theory/data";

const domains = [
  { code: "100", title: "Fondamentaux", description: "Comprendre les bases, les flux et les objectifs de la logistique.", count: "10 modules", tone: "bg-teal-50 text-teal-700 border-teal-100" },
  { code: "200", title: "Clients & communication", description: "Développer une relation client professionnelle et efficace.", count: "9 modules", tone: "bg-amber-50 text-amber-700 border-amber-100" },
  { code: "300", title: "Approvisionnement", description: "Piloter les commandes, la réception et le contrôle qualité.", count: "10 modules", tone: "bg-sky-50 text-sky-700 border-sky-100" },
  { code: "400", title: "Entreposage", description: "Organiser les espaces, stocks, équipements et la sécurité.", count: "10 modules", tone: "bg-violet-50 text-violet-700 border-violet-100" },
  { code: "500", title: "Production & flux", description: "Relier production, maintenance, qualité et performance.", count: "6 modules", tone: "bg-rose-50 text-rose-700 border-rose-100" },
];

export default function Home() {
  const current = module100Series[0];
  return (
    <main className="min-h-screen bg-[#f7f8f6] text-slate-900">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="LogiCours, accueil">
            <span className="flex size-10 items-center justify-center rounded-xl bg-teal-700 text-sm font-bold text-white">LC</span>
            <span><span className="block text-lg font-bold tracking-tight">LogiCours</span><span className="block text-xs text-slate-500">Théorie de la logistique</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex" aria-label="Navigation principale">
            <Link className="text-teal-700" href="/">Accueil</Link><Link href="/theory" className="hover:text-teal-700">Cours</Link><Link href="/glossary" className="hover:text-teal-700">Glossaire</Link>
          </nav>
          <Link href="/theory" className="rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">Commencer</Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8 lg:pt-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Parcours de formation</p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">Maîtrisez la logistique, <span className="text-teal-700">un module à la fois.</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Une bibliothèque claire et structurée pour comprendre les métiers, les flux et les méthodes de la logistique.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/theory" className="rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800">Explorer les cours</Link><Link href="/glossary" className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:text-teal-700">Voir le glossaire</Link></div>
            <div className="mt-10 flex gap-8 border-t border-slate-200 pt-6"><div><p className="text-2xl font-bold">45</p><p className="text-sm text-slate-500">modules théoriques</p></div><div><p className="text-2xl font-bold">5</p><p className="text-sm text-slate-500">domaines clés</p></div><div><p className="text-2xl font-bold">100%</p><p className="text-sm text-slate-500">en français</p></div></div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-28px_rgba(15,118,110,.45)] sm:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">À reprendre</p><h2 className="mt-2 text-2xl font-bold">{current.title}</h2></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Module 101</span></div><p className="mt-4 leading-7 text-slate-600">{current.summary}</p><div className="mt-7"><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700">Votre progression</span><span className="font-bold text-teal-700">0%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-full w-0 rounded-full bg-teal-600" /></div></div><Link href="/theory/101" className="mt-7 block rounded-lg bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-800">Ouvrir le module</Link></div>
        </section>

        <section className="mt-20"><div className="mb-7 flex items-end justify-between"><div><p className="text-sm font-semibold text-teal-700">Votre parcours</p><h2 className="mt-1 text-3xl font-bold tracking-tight">Les domaines de la logistique</h2></div><Link href="/theory" className="hidden text-sm font-semibold text-teal-700 hover:text-teal-800 sm:block">Voir tous les cours →</Link></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{domains.map((domain) => <Link href={`/theory?domain=${domain.code}`} key={domain.code} className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-md ${domain.tone}`}><span className="text-3xl font-bold">{domain.code}</span><h3 className="mt-8 text-base font-bold text-slate-900">{domain.title}</h3><p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">{domain.description}</p><p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">{domain.count} <span className="float-right text-lg normal-case opacity-50 transition group-hover:opacity-100">→</span></p></Link>)}</div></section>

        <section className="mt-16 rounded-2xl bg-slate-950 p-7 text-white sm:p-10"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="text-sm font-semibold text-teal-300">Méthode LogiCours</p><h2 className="mt-2 text-2xl font-bold">Apprendre avec une théorie fiable et accessible.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Chaque module suit une structure simple : comprendre les notions, retenir l’essentiel, puis vérifier ses acquis.</p></div><Link href="/theory" className="shrink-0 rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-teal-50">Démarrer le parcours</Link></div></section>
      </div>
    </main>
  );
}
