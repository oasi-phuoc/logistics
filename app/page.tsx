import Link from "next/link";

const courses = [
  { id: 1, title: "Supply Chain Fundamentals", progress: 75, students: 124, instructor: "Dr. Smith" },
  { id: 2, title: "Warehouse Management Systems", progress: 60, students: 98, instructor: "Prof. Johnson" },
  { id: 3, title: "Last-Mile Delivery Optimization", progress: 45, students: 87, instructor: "Dr. Williams" },
  { id: 4, title: "International Trade & Customs", progress: 90, students: 156, instructor: "Prof. Davis" },
];

const caseStudies = [
  { id: "CS-001", title: "Amazon's Logistics Network", difficulty: "Intermediate", duration: "2 hours", students: 342 },
  { id: "CS-002", title: "Port Operations Management", difficulty: "Advanced", duration: "3 hours", students: 215 },
  { id: "CS-003", title: "Demand Forecasting Crisis", difficulty: "Beginner", duration: "1.5 hours", students: 178 },
  { id: "CS-004", title: "Last-Mile Route Optimization", difficulty: "Advanced", duration: "2.5 hours", students: 156 },
];

const stats = [
  { label: "Active Students", value: "2,847" },
  { label: "Courses Available", value: "24" },
  { label: "Completion Rate", value: "82.3%" },
  { label: "Avg. Assessment Score", value: "7.8/10" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Educational Platform</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Logistics Academy</h1>
          </div>
          <Link
            href="/explore"
            className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Explore Courses
          </Link>
        </header>

        {/* Stats Section */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/20">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Main Content Grid */}
        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Featured Courses */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Featured Courses</h2>
              <Link href="/courses" className="text-sm text-cyan-400 hover:text-cyan-300">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 hover:border-cyan-700/50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-white">{course.title}</p>
                      <p className="text-sm text-slate-400 mt-1">Instructor: {course.instructor}</p>
                    </div>
                    <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                      {course.students} students
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Studies Sidebar */}
          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">Interactive Case Studies</h2>
            <div className="mt-5 space-y-4">
              {caseStudies.map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="block rounded-xl border border-slate-800 bg-slate-950/50 p-3 hover:border-amber-600/50 transition"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-medium text-white text-sm">{study.title}</p>
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

        {/* Learning Modules Section */}
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Learning Modules</h2>
            <p className="mt-1 text-sm text-slate-400">Master key logistics concepts</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Supply Chain Design", icon: "🔗", color: "from-blue-500 to-cyan-500" },
              { title: "Inventory Management", icon: "📦", color: "from-emerald-500 to-teal-500" },
              { title: "Transportation Networks", icon: "🚚", color: "from-amber-500 to-orange-500" },
              { title: "Distribution Centers", icon: "🏭", color: "from-purple-500 to-pink-500" },
            ].map((module) => (
              <Link
                key={module.title}
                href={`/modules/${module.title.toLowerCase().replace(/ /g, "-")}`}
                className={`rounded-xl bg-gradient-to-br ${module.color} p-6 text-white transition hover:shadow-lg hover:shadow-slate-950/50`}
              >
                <div className="text-3xl mb-3">{module.icon}</div>
                <h3 className="font-semibold">{module.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
