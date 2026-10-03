import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
import { generateText, Output } from "ai";
import { z } from "zod";

const ROOT = process.cwd();
const IN = path.join(ROOT, "content/modules");
const OUT = path.join(ROOT, "content/falc");
const IMG = path.join(ROOT, "public/falc");
const TEXT_MODEL = "google/gemini-3-flash";
const IMAGE_MODEL = "google/gemini-2.5-flash-image";

const schema = z.object({
  summary: z.string().describe("Résumé en 2 phrases courtes maximum"),
  goals: z.array(z.string()).describe("3 à 4 objectifs commençant par un verbe à l'infinitif (ex: Reconnaître...)"),
  sections: z.array(z.object({
    title: z.string().describe("Titre court et concret (5 mots max)"),
    icon: z.enum(["box", "truck", "warehouse", "users", "shield", "clipboard", "euro", "globe", "recycle", "clock", "search", "tool", "book", "alert", "check", "message", "chart", "package"]),
    points: z.array(z.string()).describe("2 à 5 phrases très courtes, une idée par phrase"),
    example: z.string().optional().describe("Un exemple concret de la vie d'un logisticien"),
    tip: z.string().optional().describe("Un conseil pratique ou point de vigilance"),
    illustration: z.number().int().optional().describe("Index (0 ou 1) de l'illustration à afficher après cette section"),
  })).describe("4 à 7 sections"),
  illustrations: z.array(z.object({
    prompt: z.string().describe("English prompt for a simple flat educational illustration of the key concept, no text"),
    alt: z.string().describe("Description française de l'image"),
    caption: z.string().describe("Légende française courte"),
  })).describe("exactement 2 illustrations"),
  glossary: z.array(z.object({ term: z.string(), definition: z.string() })).describe("4 à 8 mots difficiles"),
  remember: z.array(z.string()).describe("3 à 5 points à retenir"),
  quiz: z.array(z.object({ question: z.string(), answer: z.string() })).describe("3 questions de révision"),
});

function flatten(mod) {
  let out = "";
  for (const s of mod.sections) {
    out += `\n## ${s.number} ${s.title}\n`;
    for (const b of s.blocks) {
      if (b.t === "p") out += b.text + "\n";
      else if (b.t === "ul") out += b.items.map((i) => "- " + i).join("\n") + "\n";
      else out += `[${b.label}] ${b.text}\n`;
    }
  }
  return out.slice(0, 45000);
}

const SYSTEM = `Tu es un spécialiste du Facile à Lire et à Comprendre (FALC) et formateur en logistique suisse.
Tu réécris des cours pour des apprentis logisticiens (CFC), dont certains lisent difficilement le français.
Règles :
- Tu NE recopies PAS le texte : tu reformules et résumes pour garder l'essentiel.
- Phrases courtes (15 mots max), une idée par phrase, sujet-verbe-complément, voix active.
- Mots simples et concrets. Si un mot technique est nécessaire, garde-le et mets-le dans le glossaire.
- Pas de parenthèses, pas de métaphores, pas de négations doubles.
- Garde les chiffres, normes, règles de sécurité et définitions importantes exacts.
- Ignore les exercices à compléter, espaces vides et consignes de cahier : retiens seulement la théorie.
- Utilise "vous" pour t'adresser à l'apprenti.
- Écris en français.`;

async function makeImage(prompt, file) {
  const result = await generateText({
    model: IMAGE_MODEL,
    prompt: `Simple flat vector educational illustration, clean white background, friendly style, limited palette (teal, orange, dark blue, light grey), clear shapes, absolutely NO text, NO letters, NO numbers. Subject: ${prompt}`,
  });
  const f = result.files.find((x) => x.mediaType?.startsWith("image/"));
  if (!f) throw new Error("no image");
  await sharp(Buffer.from(f.uint8Array)).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 78 }).toFile(file);
}

async function processModule(mod, seen) {
  const outFile = path.join(OUT, `${mod.code}.json`);
  if (fs.existsSync(outFile)) return "skip";
  const hash = crypto.createHash("md5").update(JSON.stringify(mod.sections)).digest("hex");
  if (seen.has(hash) && fs.existsSync(path.join(OUT, `${seen.get(hash)}.json`))) {
    fs.copyFileSync(path.join(OUT, `${seen.get(hash)}.json`), outFile);
    return "dup";
  }
  const { output } = await generateText({
    model: TEXT_MODEL,
    system: SYSTEM,
    output: Output.object({ schema }),
    prompt: `Module ${mod.code} : ${mod.title}\n\nCours original :\n${flatten(mod)}\n\nRéécris ce cours en version FALC.`,
  });
  const illustrations = [];
  for (let i = 0; i < output.illustrations.length; i++) {
    const ill = output.illustrations[i];
    const rel = `/falc/${mod.code}-${i + 1}.webp`;
    try {
      await makeImage(ill.prompt, path.join(IMG, `${mod.code}-${i + 1}.webp`));
      illustrations.push({ src: rel, alt: ill.alt, caption: ill.caption });
    } catch (e) {
      try {
        await makeImage(ill.prompt, path.join(IMG, `${mod.code}-${i + 1}.webp`));
        illustrations.push({ src: rel, alt: ill.alt, caption: ill.caption });
      } catch {
        illustrations.push(null);
      }
    }
  }
  const sections = output.sections.map((s) => ({
    ...s,
    illustration: s.illustration != null && illustrations[s.illustration] ? s.illustration : undefined,
  }));
  fs.writeFileSync(outFile, JSON.stringify({ code: mod.code, ...output, sections, illustrations }, null, 1));
  seen.set(hash, mod.code);
  return "ok";
}

const only = process.argv.slice(2);
const mods = fs.readdirSync(IN).filter((f) => f.endsWith(".json")).sort()
  .map((f) => JSON.parse(fs.readFileSync(path.join(IN, f), "utf-8")))
  .filter((m) => only.length === 0 || only.includes(m.code));

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(IMG, { recursive: true });
const seen = new Map();
let idx = 0, done = 0;
async function worker() {
  while (idx < mods.length) {
    const mod = mods[idx++];
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const r = await processModule(mod, seen);
        console.log(`[${++done}/${mods.length}] ${mod.code} ${r}`);
        break;
      } catch (e) {
        console.error(`${mod.code} attempt ${attempt} failed:`, String(e.message).slice(0, 200));
        if (attempt === 3) done++;
      }
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
console.log("finished");
