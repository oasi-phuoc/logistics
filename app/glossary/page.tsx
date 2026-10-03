import Link from "next/link";

const stats = [
  { label: "Étudiants actifs", value: "2 847" },
  { label: "Cours disponibles", value: "24" },
  { label: "Taux de réussite", value: "82,3 %" },
  { label: "Score moyen", value: "7,8 / 10" },
];

const theoryHighlights = [
  {
    title: "Bibliothèque de théorie",
    description: "Connaissances de base sur la logistique, organisées par module et sous-module.",
    href: "/theory",
  },
  {
    title: "Glossaire",
    description: "Termes clés et définitions pour la logistique et la chaîne d'approvisionnement.",
    href: "/glossary",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Plateforme éducative</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Académie de la logistique</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/theory"
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Théorie
            </Link>
            <Link
              href="/glossary"
              className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20"
            >
              Glossaire
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/20">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Théorie et base de connaissances</h2>
              <p className="mt-1 text-sm text-slate-400">Contenu structuré sur la théorie logistique</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {theoryHighlights.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-cyan-500/50 hover:bg-slate-950"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Connaissance</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Cours à la une</h2>
              <Link href="/courses" className="text-sm text-cyan-400 hover:text-cyan-300">
                Voir tout
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { id: 1, title: "Fondamentaux de la chaîne logistique", progress: 75, students: 124, instructor: "Dr. Smith" },
                { id: 2, title: "Systèmes de gestion d'entrepôt", progress: 60, students: 98, instructor: "Prof. Johnson" },
                { id: 3, title: "Optimisation de la dernière livraison", progress: 45, students: 87, instructor: "Dr. Williams" },
                { id: 4, title: "Commerce international et douanes", progress: 90, students: 156, instructor: "Prof. Davis" },
              ].map((course) => (
                <div key={course.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 hover:border-cyan-700/50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-white">{course.title}</p>
                      <p className="mt-1 text-sm text-slate-400">Formateur : {course.instructor}</p>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                      {course.students} étudiants
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-sm text-slate-400">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">Études de cas interactives</h2>
            <div className="mt-5 space-y-4">
              {[
                { id: "CS-001", title: "Réseau logistique d'Amazon", difficulty: "Intermédiaire", duration: "2 heures", students: 342 },
                { id: "CS-002", title: "Gestion des opérations portuaires", difficulty: "Avancé", duration: "3 heures", students: 215 },
                { id: "CS-003", title: "Crise de prévision de la demande", difficulty: "Débutant", duration: "1,5 heure", students: 178 },
                { id: "CS-004", title: "Optimisation de la livraison du dernier kilomètre", difficulty: "Avancé", duration: "2,5 heures", students: 156 },
              ].map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="block rounded-xl border border-slate-800 bg-slate-950/50 p-3 hover:border-amber-600/50 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-white">{study.title}</p>
                    <span
                      className={
                        "rounded px-2 py-0.5 text-[10px] font-semibold " +
                        (study.difficulty === "Débutant"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : study.difficulty === "Intermédiaire"
                            ? "bg-amber-500/15 text-amber-300"
                            : "bg-rose-500/15 text-rose-300")
                      }
                    >
                      {study.difficulty}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[12px] text-slate-400">
                    <span>{study.duration}</span>
                    <span>{study.students} inscrits</span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="mt-5 block w-full rounded-lg border border-amber-600/50 bg-amber-500/10 py-2.5 text-center text-sm font-medium text-amber-300 transition hover:bg-amber-500/20"
            >
              Explorer toutes les études de cas
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}
