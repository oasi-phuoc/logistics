import Link from "next/link";

const stats = [
  { label: "Shipments today", value: "1,284" },
  { label: "On-time delivery", value: "96.2%" },
  { label: "Active vehicles", value: "418" },
  { label: "Inventory alerts", value: "12" },
];

const shipments = [
  { id: "LGT-2048", route: "Singapore → Melbourne", status: "In transit", eta: "2h 15m" },
  { id: "LGT-2049", route: "Tokyo → Seoul", status: "Delayed", eta: "4h 10m" },
  { id: "LGT-2050", route: "Dubai → Nairobi", status: "Delivered", eta: "Completed" },
  { id: "LGT-2051", route: "Los Angeles → Dallas", status: "In transit", eta: "1h 40m" },
];

const inventory = [
  { sku: "SKU-2104", name: "Cold-chain pallet", stock: 128, status: "Healthy" },
  { sku: "SKU-2218", name: "Cargo straps", stock: 28, status: "Low" },
  { sku: "SKU-2299", name: "Safety kits", stock: 86, status: "Healthy" },
  { sku: "SKU-2311", name: "Fuel cells", stock: 14, status: "Critical" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Logistics OS</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Operations dashboard</h1>
          </div>
          <Link
            href="#"
            className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
          >
            New dispatch
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/20">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-4 text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Active shipments</h2>
              <button className="text-sm text-cyan-400 hover:text-cyan-300">View all</button>
            </div>

            <div className="space-y-4">
              {shipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-white">{shipment.id}</p>
                    <p className="text-sm text-slate-400">{shipment.route}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-xs font-medium " +
                        (shipment.status === "Delivered"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : shipment.status === "Delayed"
                            ? "bg-amber-500/15 text-amber-300"
                            : "bg-cyan-500/15 text-cyan-300")
                      }
                    >
                      {shipment.status}
                    </span>
                    <span className="text-sm text-slate-300">{shipment.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">Inventory overview</h2>
            <div className="mt-5 space-y-4">
              {inventory.map((item) => (
                <div key={item.sku} className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{item.name}</p>
                    <span
                      className={
                        "rounded-full px-2 py-1 text-[11px] font-medium " +
                        (item.status === "Critical"
                          ? "bg-rose-500/15 text-rose-300"
                          : item.status === "Low"
                            ? "bg-amber-500/15 text-amber-300"
                            : "bg-emerald-500/15 text-emerald-300")
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                    <span>{item.sku}</span>
                    <span>{item.stock} units</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
