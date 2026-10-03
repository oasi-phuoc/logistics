"""Transforme content/raw/*.json (texte brut des PDF) en content/modules/<code>.json structuré.

Usage : python3 scripts/build-content.py

Étapes :
1. Les PDF sont des diapositives « progressives » : chaque page reprend le texte de la
   précédente et ajoute la suite. On fusionne ces pages pour ne garder qu'une seule fois le texte.
2. Nettoyage (en-têtes « Module 101 », numéros de page, pictogrammes).
3. Détection des titres numérotés (1. / 1.1 / 1.1.1), paragraphes, listes et encadrés.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "content" / "raw"
OUT = ROOT / "content" / "modules"
OUT.mkdir(parents=True, exist_ok=True)

BULLET_RE = re.compile(r"^\s*([•▪▶●◦·]|[–-]\s|o\s{2,}|\uf0b7|\uf0a7|\uf076|\uf0d8)\s*")
HEADING_RE = re.compile(r"^\s*(\d{1,2}(?:\.\d{1,2}){1,3}|\d{1,2}\.)\s+([A-ZÀ-ÝÉ0-9«\"“].{2,95})$")
EMOJI_LABELS = {
    "👉": ("note", "À retenir"),
    "🔎": ("ref", "Voir aussi"),
    "🔨": ("tip", "En pratique"),
    "📜": ("law", "Base légale"),
    "❗": ("warn", "Attention"),
    "💡": ("tip", "Astuce"),
    "👍": ("good", "Bonne pratique"),
    "✅": ("good", "Bonne pratique"),
    "👎": ("bad", "À éviter"),
    "❌": ("bad", "À éviter"),
}
EMOJI_CHARS = "".join(EMOJI_LABELS) + "👟💰🍴⌛"
PUA_RE = re.compile(r"[\uf000-\uf8ff]")
LIGATURES = {"ﬀ": "ff", "ﬁ": "fi", "ﬂ": "fl", "ﬃ": "ffi", "ﬄ": "ffl"}


TITLE_OVERRIDES = {
    "102": "Mondialisation et jalons de la logistique",
    "303": "Processus de réception des marchandises",
    "501": "Bases de la production",
    "505": "Planification et pilotage de la production",
}


def norm(line: str) -> str:
    return re.sub(r"\s+", "", line)


def clean_line(line: str) -> str:
    for k, v in LIGATURES.items():
        line = line.replace(k, v)
    line = line.replace("\u00a0", " ").replace("\u200b", "")
    return line.rstrip()


def page_lines(text: str):
    lines = [clean_line(l) for l in text.split("\n")]
    # numéro de page isolé en fin de page
    while lines and (not lines[-1].strip() or re.fullmatch(r"\s*\d{1,4}\s*", lines[-1])):
        lines.pop()
    return lines


def extends(prev, new) -> bool:
    """La page `new` reprend-elle le début de `prev` ?"""
    p = [norm(l) for l in prev if norm(l)]
    n = [norm(l) for l in new if norm(l)]
    if not p or not n:
        return False
    k = 0
    for a, b in zip(p, n):
        if a == b:
            k += 1
        elif k == len(p) - 1 and b.startswith(a[: max(5, len(a) - 3)]):
            k += 1  # dernière ligne tronquée
            break
        else:
            break
    return k >= max(2, int(len(p) * 0.8)) or (k == len(p) and len(p) >= 1 and len(n) >= len(p))


def merge_pages(pages):
    blocks = []
    current = None
    for text in pages:
        lines = page_lines(text)
        if not any(l.strip() for l in lines):
            continue
        if current is not None and extends(current, lines):
            current = lines
        else:
            if current is not None:
                blocks.append(current)
            current = lines
    if current is not None:
        blocks.append(current)
    return [l for b in blocks for l in b + [""]]


def strip_markers(line: str):
    """Retourne (marqueur_emoji | None, texte nettoyé)."""
    marker = None
    for ch in line:
        if ch in EMOJI_LABELS:
            marker = marker or ch
    s = line
    for ch in EMOJI_CHARS:
        s = s.replace(ch, "")
    s = PUA_RE.sub("", s) if not BULLET_RE.match(line) else line
    return marker, s


def fix_text(t: str) -> str:
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"\s+([,.;:!?])", r"\1", t)
    t = re.sub(r"(\w)- (\w)", lambda m: m.group(0) if m.group(1).isupper() else m.group(1) + "-" + m.group(2), t)
    return t


def parse_blocks(lines):
    blocks = []
    para = []
    para_marker = None
    items = []

    def flush_para():
        nonlocal para, para_marker
        if para:
            text = fix_text(" ".join(para))
            if text:
                if para_marker:
                    kind, label = EMOJI_LABELS[para_marker]
                    blocks.append({"t": "note", "kind": kind, "label": label, "text": text})
                else:
                    blocks.append({"t": "p", "text": text})
        para, para_marker = [], None

    def flush_items():
        nonlocal items
        if items:
            blocks.append({"t": "ul", "items": [fix_text(i) for i in items if fix_text(i)]})
        items = []

    for raw in lines:
        marker, line = strip_markers(raw)
        if not line.strip():
            if marker and not para:
                para_marker = marker
            if not raw.strip():
                flush_para()
            continue
        bm = BULLET_RE.match(line)
        if bm and len(line.strip()) > 2:
            flush_para()
            items.append(line[bm.end():])
            continue
        if items and not marker and (line.startswith("  ") or line[:1].islower()):
            items[-1] += " " + line.strip()
            continue
        flush_items()
        if marker and para and not para_marker:
            flush_para()
        if marker and not para_marker:
            para_marker = marker
        para.append(line.strip())
    flush_para()
    flush_items()
    return blocks


def build(code: str):
    data = json.loads((RAW / f"{code}.json").read_text(encoding="utf-8"))
    lines = merge_pages(data["pages"])
    header_re = re.compile(rf"^\s*Module\s+{code}\s*$")
    lines = [l for l in lines if not header_re.match(l)]

    title_found = None
    sections = []
    cur = {"id": "intro", "number": "", "title": "Situation initiale", "level": 1, "lines": []}
    for line in lines:
        m = HEADING_RE.match(line)
        stripped = line.strip()
        is_heading = False
        if m:
            title = m.group(2).strip()
            num = m.group(1).rstrip(".")
            chapter = str(int(code[1:]))
            first = num.split(".")[0]
            if first == chapter and not title.endswith((",", ";", ":")) and not re.search(r"[.!?]$", title):
                if not title[0].islower():
                    is_heading = True
        if is_heading and "." not in num:
            if title_found is None and code not in TITLE_OVERRIDES:
                title_found = fix_text(title)
            is_heading = False
            if fix_text(title) == title_found or fix_text(title) == TITLE_OVERRIDES.get(code):
                continue
        if is_heading:
            sections.append(cur)
            level = min(num.count(".") + 1, 3)
            cur = {"id": "s-" + num.replace(".", "-"), "number": num, "title": fix_text(title), "level": level, "lines": []}
        else:
            if stripped == "Situation initiale":
                continue
            cur["lines"].append(line)
    sections.append(cur)

    out_sections = []
    seen = set()
    for s in sections:
        blocks = parse_blocks(s["lines"])
        if not blocks and s["id"] == "intro":
            continue
        sid = s["id"]
        n = 2
        while sid in seen:
            sid = f"{s['id']}-{n}"
            n += 1
        seen.add(sid)
        out_sections.append({"id": sid, "number": s["number"], "title": s["title"], "level": s["level"], "blocks": blocks})

    if out_sections and out_sections[0]["id"] == "intro":
        bl = out_sections[0]["blocks"]
        while bl and bl[0].get("t") == "p" and (bl[0]["text"][:1].islower() or re.match(r"^\d+\.\d+", bl[0]["text"])):
            bl.pop(0)
        if not bl:
            out_sections.pop(0)

    words = sum(len(b.get("text", "").split()) + sum(len(i.split()) for i in b.get("items", [])) for s in out_sections for b in s["blocks"])
    return {
        "code": code,
        "title": TITLE_OVERRIDES.get(code) or title_found or f"Module {code}",
        "domain": code[0] + "00",
        "pdf": data["file"],
        "pages": len(data["pages"]),
        "words": words,
        "sections": out_sections,
    }


if __name__ == "__main__":
    for f in sorted(RAW.glob("*.json")):
        code = f.stem
        mod = build(code)
        (OUT / f"{code}.json").write_text(json.dumps(mod, ensure_ascii=False, indent=1), encoding="utf-8")
        heads = sum(1 for s in mod["sections"] if s["number"])
        print(code, "sections", len(mod["sections"]), "titres", heads, "mots", mod["words"])
