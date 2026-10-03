export type TheoryModule = {
  code: string;
  title: string;
  summary: string;
  points: string[];
  theory: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  falc: {
    heading: string;
    text: string;
    points: string[];
  }[];
};

export const module100Series: TheoryModule[] = [
  {
    code: "101",
    title: "Histoire de la logistique",
    summary:
      "La logistique s'appuie sur des activités anciennes : approvisionnement, transport, stockage et distribution. Elle a évolué avec les guerres, les routes commerciales, les pyramides, les grands ports et l'industrialisation.",
    points: [
      "La chaîne logistique de base : chasser, transformer, consommer, puis approvisionner, produire et distribuer.",
      "Les routes commerciales comme la Route de la Soie ont favorisé le développement des échanges internationaux.",
      "Les innovations majeures ont été la palette, le conteneur, le code-barres, la gestion informatique et le suivi des flux.",
    ],
    theory: [
      {
        heading: "Origines de la logistique",
        paragraphs: [
          "La logistique n'est pas une invention récente. Elle existe depuis que les hommes ont dû déplacer des ressources, des marchandises et des biens dans des territoires parfois difficiles.",
          "À l'origine, la logistique servait surtout à nourrir les populations, à organiser le transport des produits et à sécuriser les échanges entre communautés.",
        ],
        bullets: [
          "Les civilisations anciennes ont développé des routes pour le commerce, la guerre et la distribution alimentaire.",
          "Les armées ont souvent été à l'origine de grands efforts d'organisation pour déplacer les hommes, les matériels et les vivres.",
          "Les marchés et les ports ont aussi structuré les échanges commerciaux de longue distance.",
        ],
      },
      {
        heading: "Évolution historique",
        paragraphs: [
          "Au fil du temps, la logistique a évolué avec les technologies. L'apparition des routes commerciales, des entrepôts, des bateaux et des moyens de transport a permis d'accroître les volumes échangés.",
          "L'industrialisation a renforcé la nécessité d'organiser les flux de matières premières et de produits finis, ainsi que la production et la distribution.",
        ],
        bullets: [
          "Les trains, les camions et les conteneurs ont permis de standardiser et d'accélérer les déplacements de marchandises.",
          "L'informatique a transformé la planification, le suivi des stocks et le pilotage des flux.",
          "Les systèmes modernes de traçabilité rendent la logistique plus fiable, plus rapide et plus transparente.",
        ],
      },
    ],
    falc: [
      {
        heading: "En simple",
        text: "La logistique existe depuis très longtemps. Avant, on transportait des marchandises à pied, à cheval, en bateau ou par chariot. Aujourd'hui, on le fait avec des camions, des conteneurs, des réseaux et des ordinateurs.",
        points: [
          "Avant, le transport était plus lent et plus compliqué.",
          "Aujourd'hui, la logistique permet de livrer les produits partout plus vite.",
          "Les inventions comme le conteneur et le code-barres ont changé la logistique.",
        ],
      },
      {
        heading: "À retenir",
        text: "La logistique est l'art de bien organiser les mouvements de marchandises, d'informations et de ressources.",
        points: [
          "Les routes commerciales ont marqué le début du commerce organisé.",
          "L'industrie a intensifié les besoins de stockage et de transport.",
          "La technologie rend la logistique plus précise et plus performante.",
        ],
      },
    ],
  },
  {
    code: "102",
    title: "Structure de la logistique",
    summary:
      "La logistique moderne est liée à la mondialisation, au supply chain management, aux flux de marchandises, d'informations et de valeurs, ainsi qu'à la coordination des acteurs de la chaîne.",
    points: [
      "La mondialisation favorise les échanges internationaux et les réseaux de production complexes.",
      "La logistique moderne regroupe le stockage, le transport, l'emballage, l'information et le dernier kilomètre.",
      "La chaîne logistique comprend des acteurs multiples : fournisseurs, fabricants, entrepôts, distributeurs, clients.",
    ],
    theory: [
      {
        heading: "Définition moderne",
        paragraphs: [
          "La logistique moderne est l'organisation de la circulation des biens, des informations et des ressources depuis la source jusqu'au client final.",
          "Elle inclut plusieurs sous-disciplines : approvisionnement, stockage, transport, emballage, gestion des informations et service client.",
        ],
        bullets: [
          "L'objectif est de fournir le bon produit, au bon moment, au bon endroit, au bon coût.",
          "La logistique s'inscrit dans une chaîne de valeur qui transforme des matières premières en produits finis.",
          "La coordination entre les acteurs améliore la qualité du service et réduit les pertes.",
        ],
      },
      {
        heading: "Logistique et SCM",
        paragraphs: [
          "La logistique est une fonction essentielle de la supply chain. Elle concerne l'organisation des flux physiques et d'information.",
          "Le Supply Chain Management (SCM) est plus large : il comprend l'ensemble des relations et des décisions entre les fournisseurs, les usines, les entrepôts et les clients.",
        ],
        bullets: [
          "La logistique vise l'efficience opérationnelle.",
          "Le SCM vise aussi la stratégie, la collaboration et la performance globale.",
          "Les flux de marchandises, d'informations et de valeurs doivent être cohérents.",
        ],
      },
    ],
    falc: [
      {
        heading: "En simple",
        text: "La logistique moderne est la manière de faire circuler les produits de manière organisée, du fournisseur jusqu'au client.",
        points: [
          "On doit gérer les produits, le stock et l'information.",
          "Tout le monde dans la chaîne doit travailler ensemble.",
          "Le but est de livrer sans retard et sans erreur.",
        ],
      },
      {
        heading: "À retenir",
        text: "La logistique touche tous les niveaux de la chaîne : approvisionnement, transport, stockage et livraison.",
        points: [
          "Les entreprises vivent avec des flux de marchandises et d'informations.",
          "Une bonne organisation évite les pertes et les retards.",
          "Le client attend une livraison rapide et fiable.",
        ],
      },
    ],
  },
  {
    code: "103",
    title: "Tâches et objectifs",
    summary:
      "La fonction logistique vise à livrer le bon produit, au bon endroit, au bon moment, avec la bonne qualité et au coût optimal.",
    points: [
      "L'objectif principal est de répondre à la demande client efficacement et avec fiabilité.",
      "Les coûts, délais, qualité, sécurité et satisfaction client sont des priorités logistiques.",
      "Les activités de logistique doivent être cohérentes entre approvisionnement, production, transport et distribution.",
    ],
    theory: [
      {
        heading: "Les grands objectifs",
        paragraphs: [
          "La logistique cherche à satisfaire le client avec le bon produit, au bon endroit, au bon moment, en respectant les normes de qualité et les coûts prévus.",
          "Toute activité logistique doit être pensée sur le long terme pour créer de la valeur et limiter les gaspillages.",
        ],
        bullets: [
          "La qualité assure la satisfaction du client et limite les retours.",
          "Le service client dépend aussi de la fiabilité des délais.",
          "Les coûts logistiques doivent rester maîtrisés pour rester compétitif.",
        ],
      },
      {
        heading: "Les tâches logistiques",
        paragraphs: [
          "Les tâches logistiques couvrent l'approvisionnement, le stockage, le transport, la gestion des stocks, l'emballage, l'expédition et le suivi des commandes.",
          "Le rôle logistique consiste à coordonner le flux de manière fluide entre les différents maillons de la chaîne.",
        ],
        bullets: [
          "Le bon niveau de stock évite les ruptures et les surstocks.",
          "La préparation de commandes doit être rapide et précise.",
          "La gestion des délais permet d'améliorer la qualité du service.",
        ],
      },
    ],
    falc: [
      {
        heading: "En simple",
        text: "La logistique agit pour que les produits arrivent au bon endroit, au bon moment, sans erreur et sans trop dépenser.",
        points: [
          "Le client veut un produit de qualité et une livraison fiable.",
          "L'entreprise veut limiter les coûts et les pertes.",
          "Le travail est de bien organiser les flux.",
        ],
      },
      {
        heading: "À retenir",
        text: "Une bonne logistique, c'est la combinaison de qualité, rapidité, coût et fiabilité.",
        points: [
          "Le client doit être satisfait.",
          "Le coût ne doit pas exploser.",
          "Le produit doit arriver en bon état et à temps.",
        ],
      },
    ],
  },
];

export function getModuleByCode(code: string) {
  return module100Series.find((module) => module.code === code);
}

export const theoryOverviewTitle = "Module 100 – Fondements de la logistique";
