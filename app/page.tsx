import Link from "next/link";

const theoryHighlights = [
  {
    title: "Theory Library",
    description: "Core logistics knowledge structured by module and block.",
    href: "/theory",
  },
  {
    title: "Glossary",
    description: "Key terms and definitions used across the logistics curriculum.",
    href: "/glossary",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Educational Platform</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Logistics Academy</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/theory"
              className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Theory
            </Link>
            <Link
              href="/glossary"
              className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20"
            >
              Glossary
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Active Students", value: "2,847" },
            { label: "Courses Available", value: "24" },
            { label: "Completion Rate", value: "82.3%" },
            { label: "Avg. Assessment Score", value: "7.8/10" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/20">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Theory & Knowledge Base</h2>
              <p className="mt-1 text-sm text-slate-400">Structured logistics theory and glossary content</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {theoryHighlights.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-cyan-500/50 hover:bg-slate-950"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Knowledge</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Featured Courses</h2>
              <Link href="/courses" className="text-sm text-cyan-400 hover:text-cyan-300">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { id: 1, title: "Supply Chain Fundamentals", progress: 75, students: 124, instructor: "Dr. Smith" },
                { id: 2, title: "Warehouse Management Systems", progress: 60, students: 98, instructor: "Prof. Johnson" },
                { id: 3, title: "Last-Mile Delivery Optimization", progress: 45, students: 87, instructor: "Dr. Williams" },
                { id: 4, title: "International Trade & Customs", progress: 90, students: 156, instructor: "Prof. Davis" },
              ].map((course) => (
                <div key={course.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 hover:border-cyan-700/50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-white">{course.title}</p>
                      <p className="mt-1 text-sm text-slate-400">Instructor: {course.instructor}</p>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                      {course.students} students
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
            <h2 className="text-xl font-semibold text-white">Interactive Case Studies</h2>
            <div className="mt-5 space-y-4">
              {[
                { id: "CS-001", title: "Amazon's Logistics Network", difficulty: "Intermediate", duration: "2 hours", students: 342 },
                { id: "CS-002", title: "Port Operations Management", difficulty: "Advanced", duration: "3 hours", students: 215 },
                { id: "CS-003", title: "Demand Forecasting Crisis", difficulty: "Beginner", duration: "1.5 hours", students: 178 },
                { id: "CS-004", title: "Last-Mile Route Optimization", difficulty: "Advanced", duration: "2.5 hours", students: 156 },
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
                        (study.difficulty === "Beginner"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : study.difficulty === "Intermediate"
                            ? "bg-amber-500/15 text-amber-300"
                            : "bg-rose-500/15 text-rose-300")
                      }
                    >
                      {study.difficulty}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[12px] text-slate-400">
                    <span>{study.duration}</span>
                    <span>{study.students} enrolled</span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="mt-5 block w-full rounded-lg border border-amber-600/50 bg-amber-500/10 py-2.5 text-center text-sm font-medium text-amber-300 transition hover:bg-amber-500/20"
            >
              Explore All Case Studies
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}

