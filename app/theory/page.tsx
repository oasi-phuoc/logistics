const theoryModules = [
  {
    section: "Foundation",
    modules: [
      {
        code: "101",
        title: "Histoire de la logistique",
        summary:
          "La logistique s'appuie sur des activités anciennes : approvisionnement, transport, stockage et distribution. Elle a évolué avec les guerres, les routes commerciales, les pyramides et les grandes avancées industrielles.",
        points: [
          "La chaîne logistique de base : chasser, transformer, consommer → approvisionner, produire, distribuer.",
          "Les routes commerciales : Route de la Soie, route de l'Ambre, échanges entre continents.",
          "Les grandes étapes : camion, palette, code-barres, conteneur, informatique.",
        ],
      },
      {
        code: "102",
        title: "Structure de la logistique",
        summary:
          "La logistique moderne est fortement liée à la mondialisation, au Supply Chain Management et aux flux de marchandises, d'informations et de valeurs.",
        points: [
          "Mondialisation et réseaux économiques internationaux.",
          "Définition moderne de la logistique et ses sous-disciplines : stockage, transport, emballage, information, dernier kilomètre.",
          "Chaîne de processus et distinction entre logistique et SCM.",
        ],
      },
      {
        code: "103",
        title: "Tâches et objectifs",
        summary:
          "La fonction logistique vise à livrer le bon produit, au bon endroit, au bon moment, avec la bonne qualité et au coût optimal.",
        points: [
          "Objectif principal : répondre à la demande client efficacement.",
          "Coûts, délais, qualité, sécurité et service client sont des objectifs clés.",
          "Les activités logistiques doivent être cohérentes entre approvisionnement, production et distribution.",
        ],
      },
    ],
  },
  {
    section: "Customer Service",
    modules: [
      {
        code: "201",
        title: "Le client",
        summary:
          "Le client est au centre de la logistique : il attend fiabilité, rapidité, qualité et communication claire.",
        points: [
          "Comprendre les attentes et les besoins du client.",
          "Le service client influence la fidélisation et la réputation.",
          "Le bon traitement des commandes réduit les erreurs et les retours.",
        ],
      },
      {
        code: "202",
        title: "L'attitude personnelle / apparence",
        summary:
          "En logistique, la communication, la propreté, l'apparence et la posture influencent la confiance et le professionnalisme.",
        points: [
          "Le comportement professionnel impacte le service au client.",
          "La tenue et l'attitude renforcent la crédibilité.",
          "La gestion de soi améliore la performance en équipe.",
        ],
      },
      {
        code: "206",
        title: "La communication",
        summary:
          "La communication est essentielle entre partenaires, fournisseurs, clients et collaborateurs.",
        points: [
          "Une bonne communication limite les erreurs de livraison.",
          "Le support client depend d'un échange clair et rapide.",
          "Les outils numériques accélèrent le suivi des commandes et des incidents.",
        ],
      },
    ],
  },
  {
    section: "Procurement Management",
    modules: [
      {
        code: "301",
        title: "La logistique d'approvisionnement",
        summary:
          "L'approvisionnement consiste à obtenir les bons produits, au bon moment, en respectant qualité, coûts et délais.",
        points: [
          "Choix des fournisseurs et négociation des conditions.",
          "Planification des achats et gestion des délais.",
          "Réception et contrôle des marchandises.",
        ],
      },
      {
        code: "302",
        title: "L'achat de marchandises",
        summary:
          "L'achat est un acte stratégique : il détermine la qualité, le coût et la disponibilité des produits.",
        points: [
          "Analyse du besoin et des fournisseurs.",
          "Contrôle des prix, des conditions et des volumes.",
          "Évaluation de la qualité du produit et des risques.",
        ],
      },
      {
        code: "309",
        title: "Le contrôle de la qualité",
        summary:
          "Le contrôle de la qualité vérifie que les marchandises reçues correspondent aux exigences et aux normes.",
        points: [
          "Réception, inspection et validation des livraisons.",
          "Détection des défauts et traitement des anomalies.",
          "Réduction des coûts liés aux marchandises défectueuses.",
        ],
      },
    ],
  },
  {
    section: "Logistics",
    modules: [
      {
        code: "401",
        title: "Le rôle du stockage",
        summary:
          "Le stockage sert à sécuriser les marchandises, stabiliser l'approvisionnement et faciliter la préparation des commandes.",
        points: [
          "Le stock garantit la continuité des livraisons.",
          "L'entrepôt doit être organisé selon le flux matériel.",
          "Le stock doit être contrôlé pour éviter surstock et rupture.",
        ],
      },
      {
        code: "406",
        title: "Les principes de stockage",
        summary:
          "Un bon système de stockage repose sur l'accessibilité, la sécurité, la qualité et la simplicité de la gestion.",
        points: [
          "Classement logique des marchandises.",
          "Optimisation de l'espace et des déplacements.",
          "Protection des produits contre les dommages et les pertes.",
        ],
      },
      {
        code: "407",
        title: "Les moyens de transport",
        summary:
          "Le transport permet de déplacer les marchandises entre fournisseurs, entrepôts, clients et points de vente.",
        points: [
          "Transport routier, ferroviaire, aérien et maritime.",
          "Choix du mode selon coûts, délais et type de marchandise.",
          "Coordination des livraisons et optimisation des itinéraires.",
        ],
      },
    ],
  },
  {
    section: "Production",
    modules: [
      {
        code: "501",
        title: "La production",
        summary:
          "La production transforme les matières premières en produits finis, en tenant compte des délais, des coûts et de la qualité.",
        points: [
          "Planification de la production et gestion des flux.",
          "Contrôle de la qualité et suivi des performances.",
          "Coordination entre approvisionnement et distribution.",
        ],
      },
      {
        code: "505",
        title: "Planification et contrôle de la production (PCP)",
        summary:
          "Le PCP vise à organiser la production pour répondre à la demande en minimisant les pertes et les retards.",
        points: [
          "Planification des volumes et des capacités.",
          "Suivi des délais et des écarts de production.",
          "Amélioration de la fiabilité du processus.",
        ],
      },
    ],
  },
  {
    section: "Support and Distribution",
    modules: [
      {
        code: "601",
        title: "La préparation de commandes",
        summary:
          "La préparation de commandes consiste à sélectionner, contrôler et expédier les articles demandés par le client.",
        points: [
          "Réception de la commande et validation des données.",
          "Picking, contrôle qualité et emballage.",
          "Expédition rapide et traçabilité des colis.",
        ],
      },
      {
        code: "602",
        title: "Les emballages",
        summary:
          "L'emballage protège les marchandises pendant le transport et influence l'image de marque et les coûts logistiques.",
        points: [
          "Protection contre les chocs, l'humidité et les dommages.",
          "Choix du matériel selon le type de produit.",
          "Optimisation des volumes et des coûts d'expédition.",
        ],
      },
      {
        code: "606",
        title: "Le transport routier",
        summary:
          "Le transport routier est l'un des modes les plus utilisés pour la distribution locale et internationale.",
        points: [
          "Flexibilité et couverture du réseau routier.",
          "Importance des itinéraires et du chargement.",
          "Coordination entre transporteurs, entrepôts et clients.",
        ],
      },
    ],
  },
  {
    section: "FICO",
    modules: [
      {
        code: "701",
        title: "L'inventaire",
        summary:
          "L'inventaire permet de mesurer les quantités de marchandises disponibles et de maîtriser les écarts.",
        points: [
          "Suivi du stock physique et du stock théorique.",
          "Contrôle des rotations et des ruptures.",
          "Impact sur la rentabilité et la satisfaction client.",
        ],
      },
      {
        code: "702",
        title: "Les coûts de stockage",
        summary:
          "Le stockage a un coût direct et indirect : espace, manutention, sécurité, maintenance et immobilisation du capital.",
        points: [
          "Le stock coûte de l'argent même lorsqu'il n'est pas vendu.",
          "L'optimisation du stock améliore la performance financière.",
          "Le niveau de stock doit être aligné avec la demande.",
        ],
      },
    ],
  },
  {
    section: "ICT",
    modules: [
      {
        code: "804",
        title: "Fondation Microsoft 365",
        summary:
          "Les outils numériques permettent de gérer les commandes, les stocks, les tableaux de bord et la documentation logistique.",
        points: [
          "Utilisation de Word, Excel et OneNote pour le suivi.",
          "Tableaux de bord et analyse de données.",
          "Communication, documentation et traçabilité.",
        ],
      },
      {
        code: "806",
        title: "Excel Microsoft 365",
        summary:
          "Excel est un outil central pour l'analyse des données, les indicateurs de performance et les prévisions logistiques.",
        points: [
          "Tableaux de suivi, indicateurs et rapports de performance.",
          "Calculs et simulation de scénarios.",
          "Aide à la décision et à la planification.",
        ],
      },
    ],
  },
  {
    section: "Integrate",
    modules: [
      {
        code: "901",
        title: "Planifier et évaluer les projets logistiques",
        summary:
          "Les projets logistiques doivent être planifiés, suivis et évalués pour garantir des gains de performance et une alignment stratégique.",
        points: [
          "Objectifs, budgets, délais et ressources.",
          "Mesure de la performance à partir d'indicateurs clés.",
          "Amélioration continue des processus.",
        ],
      },
    ],
  },
];

const glossaryTerms = [
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
];

export default function TheoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Logistics Academy</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Theory</h1>
          </div>
          <div className="flex gap-2">
            <a 
              href="/theory-falc" 
              className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
              title="Easy to Read and Understand Mode"
            >
              📖 FALC Mode
            </a>
            <a href="/glossary" className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 hover:bg-violet-500/20">
              Glossary
            </a>
          </div>
        </header>

        <div className="mb-8 rounded-2xl border border-emerald-800 bg-emerald-950/20 p-4">
          <p className="text-sm text-emerald-200">
            💡 <strong>Tip:</strong> Looking for easier explanations? Click the <strong>📖 FALC Mode</strong> button above for accessible, simple language version!
          </p>
        </div>

        <div className="space-y-8">
          {theoryModules.map((block) => (
            <section key={block.section} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-5 text-2xl font-semibold text-white">{block.section}</h2>
              <div className="space-y-6">
                {block.modules.map((module) => (
                  <article key={module.code} className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Module {module.code}</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">{module.title}</h3>
                      </div>
                    </div>

                    <p className="text-sm leading-7 text-slate-300">{module.summary}</p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-300">
                      {module.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
