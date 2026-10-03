"""Complète la théorie FALC des modules 101–110 là où le guide est incomplet.

Complète à partir de la théorie PDF, en gardant le style FALC (phrases courtes).
Usage : python3 scripts/complete-falc-100.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FALC = ROOT / "content" / "falc"


def load(code: str) -> dict:
    return json.loads((FALC / f"{code}.json").read_text(encoding="utf-8"))


def save(mod: dict) -> None:
    mod["words"] = count_words(mod)
    (FALC / f"{mod['code']}.json").write_text(
        json.dumps(mod, ensure_ascii=False, indent=1) + "\n",
        encoding="utf-8",
    )
    print(mod["code"], "sections", len(mod["sections"]), "words", mod["words"], "quiz", len(mod["quiz"]))


def count_words(mod: dict) -> int:
    words = 0
    for s in mod["sections"]:
        for b in s["blocks"]:
            if b["t"] == "p":
                words += len(b["text"].split())
            elif b["t"] == "ul":
                words += sum(len(i.split()) for i in b["items"])
            elif b["t"] == "glossary":
                words += sum(len(e["term"].split()) + len(e["definition"].split()) for e in b["entries"])
            elif b["t"] == "note":
                words += len((b.get("text") or "").split())
                words += sum(len(i.split()) for i in b.get("items") or [])
            elif b["t"] == "table":
                words += sum(len(str(c).split()) for row in b.get("rows", []) for c in row)
                words += sum(len(str(h).split()) for h in b.get("headers", []))
    words += sum(len(g.split()) for g in mod.get("goals", []))
    return words


def slugify(text: str, used: set[str]) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", text.lower())
    base = re.sub(r"-+", "-", base).strip("-") or "section"
    sid = base[:60]
    n = 2
    while sid in used:
        sid = f"{base[:50]}-{n}"
        n += 1
    used.add(sid)
    return sid


def used_ids(mod: dict) -> set[str]:
    return {s["id"] for s in mod["sections"]}


def find_section(mod: dict, title_part: str):
    for i, s in enumerate(mod["sections"]):
        if title_part.lower() in s["title"].lower():
            return i, s
    return None, None


def upsert_section(mod: dict, title: str, level: int, blocks: list, after_title: str | None = None, before_title: str | None = None):
    ids = used_ids(mod)
    idx, existing = find_section(mod, title)
    if existing is not None and existing["title"].lower() == title.lower():
        existing["blocks"] = blocks
        existing["level"] = level
        return existing
    section = {"id": slugify(title, ids), "title": title, "level": level, "blocks": blocks}
    insert_at = len(mod["sections"])
    if after_title:
        i, _ = find_section(mod, after_title)
        if i is not None:
            insert_at = i + 1
    if before_title:
        i, _ = find_section(mod, before_title)
        if i is not None:
            insert_at = i
    mod["sections"].insert(insert_at, section)
    return section


def complete_101(mod: dict):
    _, sec = find_section(mod, "Les grandes dates")
    if not sec:
        return
    sec["blocks"] = [
        {"t": "p", "text": "La logistique a changé très vite. Voici les dates importantes."},
        {
            "t": "ul",
            "items": [
                "1804 : la locomotive démarre.",
                "1875 : le premier moteur à essence.",
                "1896 : le premier camion transporte des marchandises.",
                "1907 : naissance des services de colis.",
                "1944 : les palettes en bois et les chariots élévateurs arrivent en Europe.",
                "1948 : ouverture de l’aéroport de Kloten, en Suisse.",
                "1949 : invention du code-barres.",
                "1953 : début du « juste à temps ».",
                "1955 : le mot « logistique » est utilisé dans l’économie aux États-Unis.",
                "1956 : Malcom McLean présente le conteneur.",
                "1960 : le mot « logistique » arrive dans les pays germanophones.",
                "1980 : ouverture du tunnel routier du Gothard, en Suisse.",
                "1992 : vote sur la NLFA. Mise en service définitive en 2020.",
            ],
        },
        {
            "t": "note",
            "kind": "remember",
            "label": "À retenir",
            "items": [
                "Les palettes, le conteneur et le code-barres ont changé la logistique.",
                "En Suisse, le Gothard et la NLFA sont des dates importantes.",
            ],
        },
    ]
    # glossary terms for these inventions
    _, first = find_section(mod, "La logistique existe depuis toujours")
    if first:
        gloss = next((b for b in first["blocks"] if b["t"] == "glossary"), None)
        extra = [
            {"term": "Palette", "definition": "Une planche pour porter et déplacer des marchandises."},
            {"term": "Conteneur", "definition": "Une grande caisse standard pour transporter des marchandises."},
            {"term": "Code-barres", "definition": "Des traits noirs qui identifient un produit."},
            {"term": "Juste à temps", "definition": "Livrer exactement quand on a besoin, sans stock inutile."},
        ]
        if gloss:
            have = {e["term"].lower() for e in gloss["entries"]}
            for e in extra:
                if e["term"].lower() not in have:
                    gloss["entries"].append(e)
    # expand quiz
    mod["quiz"] = [
        {"question": "Depuis quand la logistique existe-t-elle ?", "answer": "Depuis la préhistoire."},
        {"question": "En quelle année le mot « logistique » est-il utilisé dans l’économie ?", "answer": "En 1955, aux États-Unis."},
        {"question": "Qui a présenté le modèle du conteneur ?", "answer": "Malcom McLean, en 1956."},
        {"question": "Qu’est-ce qui a beaucoup changé la logistique depuis les années 1960 ?", "answer": "L’informatique."},
    ]


def complete_102(mod: dict):
    _, types = find_section(mod, "Les types de logistique")
    if types:
        types["blocks"] = [
            {"t": "p", "text": "La logistique a plusieurs domaines. Voici les plus importants."},
            {
                "t": "ul",
                "items": [
                    "Approvisionnement : acheter et faire arriver ce dont on a besoin.",
                    "Production : organiser les flux dans l’usine.",
                    "Stockage : choisir l’entrepôt et bien l’organiser.",
                    "Transport : déplacer les marchandises par route, rail, air ou eau.",
                    "Distribution : apporter les produits aux clients.",
                    "Élimination : gérer les déchets et le retour des emballages.",
                    "Intralogistique : tous les mouvements dans un même site.",
                    "Emballage : choisir les emballages et les jeter correctement.",
                    "Information : savoir à tout moment où est la marchandise.",
                    "Succursales : remplir les magasins d’une chaîne.",
                    "Dernier kilomètre : la livraison jusque chez le client.",
                ],
            },
            {
                "t": "note",
                "kind": "remember",
                "label": "À retenir",
                "items": [
                    "La logistique ne sert pas seulement au transport.",
                    "Elle regroupe plusieurs métiers et plusieurs étapes.",
                ],
            },
        ]
    mod["quiz"] = [
        {"question": "Que veut dire « mondialisation » ?", "answer": "Le monde entier est relié."},
        {
            "question": "Cite 4 flux que la logistique planifie et contrôle.",
            "answer": "Marchandises, informations, valeurs (argent), personnes (et aussi l’énergie).",
        },
        {
            "question": "Que veut dire SCM ?",
            "answer": "Supply Chain Management : la gestion de la chaîne d’approvisionnement.",
        },
        {
            "question": "Qu’est-ce qu’une interface dans la chaîne ?",
            "answer": "L’endroit où deux entreprises ou services se rencontrent. Une erreur peut arriver là.",
        },
    ]


def complete_103(mod: dict):
    idx, intro = find_section(mod, "Introduction")
    if intro and intro["blocks"] and intro["blocks"][0].get("kind") == "reflect":
        intro["title"] = "Réfléchis"
        intro["id"] = "reflechis"
    mod["quiz"] = [
        {
            "question": "Cite les 6 « B » de la logistique.",
            "answer": "Bonne marchandise, bonne quantité, bonne qualité, bon moment, bon endroit, bon prix.",
        },
        {
            "question": "Que veut dire « efficace » ?",
            "answer": "On atteint le but à temps.",
        },
        {
            "question": "Que veut dire « efficient » ?",
            "answer": "On atteint le but sans gaspiller.",
        },
        {
            "question": "Quel est le but de la logistique ?",
            "answer": "Assurer le meilleur flux possible de marchandises et de données.",
        },
    ]


def complete_104(mod: dict):
    mod["quiz"] = [
        {"question": "Que veut dire TTS ?", "answer": "Transport, Transbordement, Stockage."},
        {
            "question": "Quelles sont les grandes étapes de la chaîne de processus ?",
            "answer": "Approvisionnement, production, distribution, élimination des déchets.",
        },
        {
            "question": "Qu’est-ce qu’un flux de marchandises ?",
            "answer": "Le mouvement des marchandises d’un point à un autre.",
        },
        {
            "question": "Quelle est la différence entre petite et grande logistique ?",
            "answer": "La petite logistique est locale ou interne. La grande logistique couvre de longues distances et souvent plusieurs pays.",
        },
    ]


def complete_105(mod: dict):
    idx, intro = find_section(mod, "Introduction")
    if intro and intro["blocks"] and intro["blocks"][0].get("kind") == "reflect":
        intro["title"] = "Réfléchis"
        intro["id"] = "reflechis"
    # enrich temperatures if short
    _, temp = find_section(mod, "Les bonnes températures")
    if temp:
        texts = " ".join(b.get("text", "") for b in temp["blocks"] if b["t"] == "p")
        if "surgel" not in texts.lower():
            temp["blocks"] = [
                {"t": "p", "text": "Certaines marchandises ont besoin d’une température précise."},
                {
                    "t": "ul",
                    "items": [
                        "Produits surgelés : moins de −18 °C.",
                        "Produits frais (viande, poisson, lait) : environ 0 à 5 °C.",
                        "Produits sensibles à la chaleur : au frais, à l’abri du soleil.",
                    ],
                },
                {
                    "t": "note",
                    "kind": "warn",
                    "label": "Attention",
                    "text": "Si la température n’est pas bonne, la marchandise peut se gâter ou devenir dangereuse.",
                },
            ]
    mod["quiz"] = [
        {
            "question": "Quels sont les 3 degrés de transformation ?",
            "answer": "Matière première, produit semi-fini, produit fini.",
        },
        {
            "question": "À quelle température range-t-on les produits surgelés ?",
            "answer": "À moins de −18 °C.",
        },
        {
            "question": "Qu’est-ce qu’une marchandise périssable ?",
            "answer": "Une marchandise qui se gâte vite.",
        },
        {
            "question": "Que veut dire manutention ?",
            "answer": "Déplacer et manipuler des marchandises.",
        },
    ]


def complete_106(mod: dict):
    upsert_section(
        mod,
        "Les 3 voies d’élimination",
        2,
        [
            {"t": "p", "text": "En Suisse, il y a 3 grandes voies pour éliminer les déchets."},
            {
                "t": "ul",
                "items": [
                    "La mise en décharge",
                    "L’incinération",
                    "Le recyclage",
                ],
            },
            {
                "t": "note",
                "kind": "remember",
                "label": "À retenir",
                "items": [
                    "La meilleure solution est d’éviter les déchets.",
                    "Ensuite vient le recyclage. Puis l’incinération. La décharge est le dernier choix.",
                ],
            },
        ],
        before_title="1. La mise en décharge",
    )
    mod["quiz"] = [
        {
            "question": "Quelles sont les 3 voies d’élimination des déchets en Suisse ?",
            "answer": "La mise en décharge, l’incinération et le recyclage.",
        },
        {
            "question": "Quelle est la meilleure façon de traiter les déchets ?",
            "answer": "Éviter d’en produire.",
        },
        {
            "question": "Que veut dire UIOM ?",
            "answer": "Usine d’incinération des ordures ménagères.",
        },
        {
            "question": "Que veut dire littering ?",
            "answer": "Jeter ses déchets dans la rue ou la nature.",
        },
    ]


def complete_107(mod: dict):
    upsert_section(
        mod,
        "Les 7 mesures de précaution",
        3,
        [
            {"t": "p", "text": "Avec les déchets spéciaux, tu dois être très prudent."},
            {"t": "p", "text": "Voici 7 règles simples."},
            {"t": "p", "text": "Pendant la manutention :"},
            {
                "t": "ul",
                "items": [
                    "1. N’ouvre pas le contenant.",
                    "2. Fais très attention : ne renverse pas, n’abîme pas, évite la poussière.",
                    "3. Ne touche pas le produit à mains nues. Porte des gants. Lave-toi les mains. Porte des lunettes s’il y a un risque de projection.",
                ],
            },
            {"t": "p", "text": "Pendant le stockage :"},
            {
                "t": "ul",
                "items": [
                    "4. Protège le produit. Le lieu de stockage doit pouvoir se fermer à clé.",
                    "5. Ne range pas ensemble des substances inconnues.",
                    "6. Stocke à l’abri de la pluie et du soleil.",
                    "7. Utilise des contenants étanches. Mets des bacs de rétention pour les liquides.",
                ],
            },
            {
                "t": "note",
                "kind": "warn",
                "label": "Attention",
                "text": "En cas de doute, traite la substance comme dangereuse.",
            },
        ],
        before_title="Qui peut éliminer des déchets spéciaux",
    )
    mod["quiz"] = [
        {
            "question": "Quelles sont les 4 catégories de déchets en Suisse ?",
            "answer": "Déchets de chantier, déchets urbains, déchets spéciaux, boues d’épuration.",
        },
        {
            "question": "Que règle l’ordonnance OMoD ?",
            "answer": "Les mouvements de déchets, surtout les déchets spéciaux.",
        },
        {
            "question": "Peux-tu ouvrir le contenant d’un déchet spécial ?",
            "answer": "Non. C’est interdit.",
        },
        {
            "question": "Qui donne l’autorisation pour recevoir des déchets spéciaux ?",
            "answer": "Le canton.",
        },
    ]


def complete_108(mod: dict):
    mod["quiz"] = [
        {
            "question": "Que veut dire SME ?",
            "answer": "Système de management environnemental.",
        },
        {
            "question": "Que certifie la norme ISO 14001 ?",
            "answer": "Les systèmes de management environnemental (SME).",
        },
        {
            "question": "Combien d’objectifs a l’Agenda 2030 ?",
            "answer": "17 objectifs de développement durable.",
        },
        {
            "question": "Cite 3 problèmes de l’environnement.",
            "answer": "Par exemple : changement climatique, pénurie d’eau, pollution de l’air, déforestation, déchets plastiques.",
        },
    ]
    # enrich ISO 20121 if thin
    _, iso = find_section(mod, "ISO 20121")
    if iso and len(iso["blocks"]) <= 2:
        iso["blocks"].append(
            {
                "t": "note",
                "kind": "remember",
                "label": "À retenir",
                "items": [
                    "ISO 20121 sert aux grands événements.",
                    "Elle aide à organiser un événement plus respectueux de l’environnement.",
                ],
            }
        )


def complete_109(mod: dict):
    mod["quiz"] = [
        {
            "question": "Peux-tu ouvrir un courrier « personnel / confidentiel » ?",
            "answer": "Non, jamais.",
        },
        {
            "question": "Combien de caractères au minimum pour un bon mot de passe ?",
            "answer": "Au moins 8.",
        },
        {
            "question": "Que protège le secret postal ?",
            "answer": "Le contenu du courrier, et aussi qui écrit à qui.",
        },
        {
            "question": "Que dois-tu faire si tu perds un badge ?",
            "answer": "Tu le signales tout de suite.",
        },
    ]


def complete_110(mod: dict):
    # Enrich static/dynamic data
    _, data = find_section(mod, "Les données statiques et dynamiques")
    if data:
        data["blocks"] = [
            {"t": "p", "text": "Quand on crée un nouvel article dans le système (l’ERP), il y a 2 sortes de données."},
            {"t": "p", "text": "Les données de base sont statiques. Elles changent peu."},
            {
                "t": "ul",
                "items": [
                    "Numéro d’article",
                    "Nom de l’article",
                    "Unité : pièce, kg, litre, mètre",
                    "Place de stockage",
                    "Fournisseur",
                    "Poids et volume",
                ],
            },
            {"t": "p", "text": "Les données de mouvement sont dynamiques. Elles changent tout le temps."},
            {
                "t": "ul",
                "items": [
                    "Stock",
                    "Consommation",
                    "Commandes",
                    "Factures",
                ],
            },
            {
                "t": "note",
                "kind": "warn",
                "label": "Attention",
                "text": "Les données de mouvement se basent sur les données de base. Les deux doivent être justes.",
            },
            {
                "t": "glossary",
                "entries": [
                    {"term": "ERP", "definition": "Le logiciel de gestion de l’entreprise."},
                    {"term": "Statique", "definition": "Qui ne change presque pas."},
                    {"term": "Dynamique", "definition": "Qui change tout le temps."},
                ],
            },
        ]

    upsert_section(
        mod,
        "La logistique interne",
        2,
        [
            {"t": "p", "text": "La logistique interne, c’est tout ce qui bouge dans l’entreprise."},
            {
                "t": "ul",
                "items": [
                    "Préparer les commandes",
                    "Déplacer les marchandises d’un endroit à un autre",
                    "Choisir le bon engin de manutention",
                ],
            },
            {
                "t": "note",
                "kind": "remember",
                "label": "À retenir",
                "items": [
                    "Une bonne logistique interne fait gagner du temps.",
                    "Elle évite les longs trajets et les stocks inutiles.",
                ],
            },
        ],
        before_title="La préparation des commandes",
    )

    # Keep full revision quiz but ensure key 110 question is present
    have_q = {q["question"] for q in mod["quiz"]}
    extras = [
        {
            "question": "Comment calcule-t-on le besoin net ?",
            "answer": "Besoins totaux − stock − commandes en cours.",
        },
        {
            "question": "Que veut dire KPI ?",
            "answer": "Key Performance Indicator : un chiffre clé pour mesurer la performance.",
        },
        {
            "question": "Que veut dire make or buy ?",
            "answer": "On fabrique soi-même ou on achète.",
        },
    ]
    for q in extras:
        if q["question"] not in have_q:
            mod["quiz"].append(q)


COMPLETERS = {
    "101": complete_101,
    "102": complete_102,
    "103": complete_103,
    "104": complete_104,
    "105": complete_105,
    "106": complete_106,
    "107": complete_107,
    "108": complete_108,
    "109": complete_109,
    "110": complete_110,
}


if __name__ == "__main__":
    for code, fn in COMPLETERS.items():
        mod = load(code)
        fn(mod)
        save(mod)
    # refresh shared quiz union
    shared = {"glossary": [], "quiz": [], "modules": []}
    all_quiz = []
    glossary = []
    for code in COMPLETERS:
        mod = load(code)
        shared["modules"].append(code)
        if mod.get("glossary") and not glossary:
            glossary = mod["glossary"]
        for q in mod.get("quiz", []):
            if q not in all_quiz:
                all_quiz.append(q)
    shared["glossary"] = glossary
    shared["quiz"] = all_quiz
    (FALC / "_shared.json").write_text(json.dumps(shared, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print("shared quiz", len(all_quiz))
