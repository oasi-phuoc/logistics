import Link from "next/link";
import { DOMAINS } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="LogiCours, accueil">
          <span className="flex size-9 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">LC</span>
          <span className="text-lg font-bold tracking-tight">LogiCours</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex" aria-label="Domaines">
          {DOMAINS.map((d) => (
            <Link key={d.code} href={`/#domaine-${d.code}`} className="hover:text-teal-700">
              {d.code}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
