import fs from "node:fs";
import path from "node:path";

export type Block =
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "note"; kind: string; label: string; text: string };

export type Section = {
  id: string;
  number: string;
  title: string;
  level: number;
  blocks: Block[];
};

export type ModuleData = {
  code: string;
  title: string;
  domain: string;
  pdf: string;
  pages: number;
  words: number;
  sections: Section[];
};

export const DOMAINS = [
  { code: "100", title: "Fondamentaux", description: "Histoire, mondialisation, flux, marchandises, déchets et gestion des marchandises." },
  { code: "200", title: "Clients, communication & marketing", description: "Relation client, attitude, communication, marketing et services avant, pendant et après la vente." },
  { code: "300", title: "Approvisionnement", description: "Commande, réception, contrôle des livraisons, emballages et concepts d'approvisionnement." },
  { code: "400", title: "Entreposage", description: "Rôle et formes de stockage, sécurité, principes, organisation, engins et convoyeurs." },
  { code: "500", title: "Production & flux", description: "Production, organisation, flux de matériel, planification et assurance qualité." },
  { code: "600", title: "Transport & distribution", description: "Transport, distribution, réglementation et organisation des opérations." },
  { code: "700", title: "Gestion & pilotage", description: "Gestion des activités, indicateurs, coûts et amélioration des résultats." },
  { code: "800", title: "Systèmes & qualité", description: "Systèmes d'information, qualité, sécurité et performance logistique." },
  { code: "900", title: "Professionnalisation", description: "Compétences professionnelles, projets et mise en pratique." },
] as const;

const MODULES_DIR = path.join(process.cwd(), "content", "modules");

let cache: ModuleData[] | null = null;

export function getAllModules(): ModuleData[] {
  if (!cache) {
    cache = fs
      .readdirSync(MODULES_DIR)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .map((f) => JSON.parse(fs.readFileSync(path.join(MODULES_DIR, f), "utf-8")) as ModuleData);
  }
  return cache;
}

export function getModule(code: string): ModuleData | undefined {
  return getAllModules().find((m) => m.code === code);
}

export function getModulesByDomain(domain: string): ModuleData[] {
  return getAllModules().filter((m) => m.domain === domain);
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200));
}
