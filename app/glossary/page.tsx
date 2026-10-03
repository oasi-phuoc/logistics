export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-violet-400">Logistics Academy</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Glossary</h1>
          </div>
          <a href="/theory" className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-500/20">
            Theory
          </a>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { term: "Approvisionnement", definition: "Ensemble des activités visant à obtenir les biens et services nécessaires au fonctionnement de l'entreprise." },
            { term: "Intralogistique", definition: "Gestion des flux internes au sein d'un site : réception, stockage, préparation de commandes et expédition." },
            { term: "Stock", definition: "Ensemble des marchandises disponibles à un instant donné pour répondre à la demande." },
            { term: "Supply Chain Management", definition: "Gestion de la chaîne d'approvisionnement, incluant fournisseurs, production, distribution et service client." },
            { term: "Logistique", definition: "Organisation des flux de marchandises, d'informations et de valeurs de manière efficace et rentable." },
            { term: "Transport", definition: "Déplacement physique des marchandises d'un lieu à un autre selon le mode de transport choisi." },
            { term: "Préparation de commande", definition: "Étape consistant à sélectionner, vérifier et emballer les produits commandés." },
            { term: "Inventaire", definition: "Contrôle et suivi des quantités stockées ainsi que des disparités entre stock réel et stock théorique." },
            { term: "Distribution", definition: "Mise à disposition des produits chez le client final ou dans les points de vente." },
            { term: "Flux de marchandises", definition: "Mouvement des produits depuis l'approvisionnement jusqu'à la livraison finale." },
            { term: "Conteneur", definition: "Unité de transport standardisée pour le déplacement de marchandises par voie maritime, routière ou ferroviaire." },
            { term: "Code-barres", definition: "Représentation lisible automatiquement d'un produit pour son identification et son suivi." },
            { term: "Juste à temps", definition: "Approche visant à réduire les stocks et livrer les biens au moment exact où ils sont nécessaires." },
            { term: "Entrepôt", definition: "Site de stockage, d'organisation et de préparation des marchandises." },
            { term: "Traçabilité", definition: "Capacité à suivre l'historique et l'emplacement d'un produit ou d'une commande." },
            { term: "Rupture de stock", definition: "Situation où la quantité disponible est insuffisante pour répondre à la demande." },
            { term: "Surstock", definition: "Quantité de stock supérieure aux besoins réels, générant des coûts supplémentaires." },
            { term: "Qualité", definition: "Conformité d'un produit ou d'un service aux exigences, normes et attentes." },
            { term: "Dernier kilomètre", definition: "Dernière étape de livraison entre le centre de distribution et le client final." },
            { term: "Service client", definition: "Ensemble des actions destinées à informer, aider et satisfaire les clients." },
            { term: "Mondialisation", definition: "Mise en réseau économique et commerciale entre les pays, générant des flux internationaux de biens et d'informations." },
          ].map((item) => (
            <article key={item.term} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-lg font-semibold text-white">{item.term}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.definition}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

