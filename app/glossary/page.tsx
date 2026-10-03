import Link from "next/link";

const terms = [
  ["Approvisionnement", "Ensemble des opérations qui permettent à une organisation d’obtenir les matières, produits ou services nécessaires à son activité."],
  ["Chaîne logistique", "Réseau d’acteurs, de moyens et d’activités qui fait circuler un produit depuis le fournisseur jusqu’au client."],
  ["Flux", "Mouvement de marchandises, d’informations ou de valeurs entre différents points de la chaîne."],
  ["Gestion des stocks", "Organisation des entrées, sorties et niveaux de marchandises afin d’éviter rupture et surstock."],
  ["Logistique", "Organisation des flux physiques et d’information pour livrer le bon produit, au bon endroit et au bon moment."],
  ["Supply Chain Management", "Pilotage global et coordonné des relations entre fournisseurs, production, stockage, distribution et clients."],
  ["Traçabilité", "Capacité à suivre l’histoire, l’utilisation ou la localisation d’un produit à chaque étape."],
];

export default function GlossaryPage() { return <main className="min-h-screen bg-[#f7f8f6] text-slate-900"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><Link href="/" className="text-lg font-bold">Logi<span className="text-teal-700">Cours</span></Link><Link href="/theory" className="text-sm font-medium text-slate-600 hover:text-teal-700">Cours</Link></div></header><div className="mx-auto max-w-4xl px-5 py-12"><p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Référence rapide</p><h1 className="mt-2 text-4xl font-bold tracking-tight">Glossaire logistique</h1><p className="mt-4 text-lg leading-8 text-slate-600">Les notions essentielles pour lire et comprendre les modules.</p><div className="mt-10 grid gap-4">{terms.map(([term, definition]) => <article key={term} className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold text-slate-950">{term}</h2><p className="mt-2 max-w-2xl leading-7 text-slate-600">{definition}</p></article>)}</div></div></main>; }
