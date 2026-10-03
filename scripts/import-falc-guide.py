"""Importe le guide FALC Word (modules 101–110) vers content/falc/<code>.json.

Usage :
  python3 scripts/import-falc-guide.py [chemin.docx]

Par défaut, lit content/source/Guide_FALC_Logistique_Modules_101-110.docx
(ou le fichier uploadé fourni en argument).
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from docx import Document
from docx.document import Document as DocumentClass
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DOCX = ROOT / "content" / "source" / "Guide_FALC_Logistique_Modules_101-110.docx"
OUT = ROOT / "content" / "falc"

FILL_HINT = {
    "F3E8FF": "glossary",
    "DCFCE7": "remember",
    "FEF3C7": "warn",
    "E0F2FE": "reflect",
}

CHAPTER_RE = re.compile(
    r"Chapitre\s+(\d+)\s*[•·]\s*Module\s+(\d+)\s*\n?(.*)",
    re.IGNORECASE | re.S,
)


def cell_fill(cell) -> str | None:
    tc_pr = cell._tc.tcPr
    if tc_pr is None:
        return None
    shd = tc_pr.find(qn("w:shd"))
    if shd is None:
        return None
    return shd.get(qn("w:fill"))


def cell_text(cell) -> str:
    return "\n".join(p.text.strip() for p in cell.paragraphs if p.text.strip())


def iter_block_items(document: DocumentClass):
    for child in document.element.body.iterchildren():
        if child.tag == qn("w:p"):
            yield "p", Paragraph(child, document)
        elif child.tag == qn("w:tbl"):
            yield "tbl", Table(child, document)


def unique_cells(table: Table):
    seen = set()
    out = []
    for row in table.rows:
        for cell in row.cells:
            text = cell_text(cell)
            if not text or text in seen:
                continue
            seen.add(text)
            out.append({"fill": cell_fill(cell), "text": text})
    return out


def split_title_body(text: str):
    lines = [l for l in text.split("\n") if l.strip()]
    if not lines:
        return "", ""
    return lines[0].strip(), "\n".join(lines[1:]).strip()


def parse_glossary_lines(body: str):
    entries = []
    for line in body.split("\n"):
        line = line.strip()
        if not line:
            continue
        if ":" in line:
            term, definition = line.split(":", 1)
            entries.append({"term": term.strip(), "definition": definition.strip()})
        else:
            entries.append({"term": line, "definition": ""})
    return entries


def classify_table(table: Table):
    cells = unique_cells(table)
    joined = "\n".join(c["text"] for c in cells)
    chapter = CHAPTER_RE.match(joined)
    if chapter:
        return {
            "kind": "chapter",
            "chapitre": int(chapter.group(1)),
            "module": chapter.group(2),
            "title": chapter.group(3).strip(),
        }

    fills = {c["fill"] for c in cells if c["fill"]}
    title, body = split_title_body(cells[0]["text"]) if cells else ("", "")
    title_l = title.lower()

    if title_l.startswith("ce que tu vas apprendre"):
        goals = [l.strip() for l in body.split("\n") if l.strip()]
        return {"kind": "goals", "items": goals}

    if title_l.startswith("mots difficiles") or (
        "F3E8FF" in fills and title_l.startswith("mot") is False and ":" in body
    ):
        # Inline glossary box
        if title_l.startswith("mots difficiles"):
            return {"kind": "glossary", "entries": parse_glossary_lines(body)}
        # Fall through if ambiguous

    if "F3E8FF" in fills and (title_l.startswith("mots difficiles") or ":" in joined):
        # Prefer first cell body after title
        if title_l.startswith("mots difficiles"):
            return {"kind": "glossary", "entries": parse_glossary_lines(body)}
        # Whole joined may be one cell
        content = body if title_l.startswith("mots") else joined
        if title_l.startswith("mots"):
            content = body
        else:
            # strip leading label if present
            content = joined
            if content.lower().startswith("mots difficiles"):
                content = "\n".join(content.split("\n")[1:])
        return {"kind": "glossary", "entries": parse_glossary_lines(content)}

    if title_l.startswith("à retenir") or title_l.startswith("bravo"):
        items = [l.strip() for l in body.split("\n") if l.strip()]
        return {"kind": "remember", "title": title, "items": items or ([body] if body else [title])}

    if title_l.startswith("attention"):
        return {"kind": "warn", "title": title, "text": body or title}

    if title_l.startswith("réfléchis") or title_l.startswith("à toi"):
        return {"kind": "reflect", "title": title, "text": body or title}

    if title_l.startswith("cadre "):
        return None  # legend boxes in intro

    # Two-column comparison / data tables
    n_cols = len(table.columns)
    n_rows = len(table.rows)
    if n_cols >= 2 and n_rows >= 1:
        # Build a grid while collapsing horizontally merged duplicates
        grid = []
        for row in table.rows:
            values = []
            for cell in row.cells:
                ct = cell_text(cell)
                if not values or values[-1] != ct:
                    values.append(ct)
            if values and all(v == values[0] for v in values) and n_cols > 1 and len(values) > 1:
                # Fully merged row → keep single value only if truly one logical cell
                pass
            if any(values):
                grid.append(values)

        # Special case: one row, two+ rich cells (Avantages / Inconvénients)
        if len(grid) == 1:
            rich_cols = [c for c in grid[0] if c and "\n" in c]
            if len(rich_cols) >= 2:
                headers = []
                col_items = []
                for col in rich_cols:
                    lines = [l.strip() for l in col.split("\n") if l.strip()]
                    headers.append(lines[0] if lines else "")
                    col_items.append(lines[1:])
                max_len = max((len(c) for c in col_items), default=0)
                rows = [
                    [col_items[c][i] if i < len(col_items[c]) else "" for c in range(len(col_items))]
                    for i in range(max_len)
                ]
                return {"kind": "table", "headers": headers, "rows": rows}

        headers = grid[0] if grid else []
        rows = grid[1:] if len(grid) > 1 else []

        # Final glossary / quiz answer tables often have Mot/Ce que ça veut dire
        if headers and headers[0].strip().lower() in {"mot", "question"} and rows:
            if headers[0].strip().lower() == "mot":
                return {
                    "kind": "glossary_table",
                    "entries": [
                        {"term": r[0].strip(), "definition": r[1].strip() if len(r) > 1 else ""}
                        for r in rows
                        if r and r[0].strip()
                    ],
                }
            return {
                "kind": "quiz_answers",
                "items": [
                    {"question": r[0].strip(), "answer": r[1].strip() if len(r) > 1 else ""}
                    for r in rows
                    if r and r[0].strip()
                ],
            }
        if headers or rows:
            return {"kind": "table", "headers": headers, "rows": rows}

    # Colored note without clear title
    for fill, kind in FILL_HINT.items():
        if fill in fills:
            if kind == "glossary":
                content = body if title_l.startswith("mots") else joined
                if title_l.startswith("mots difficiles"):
                    content = body
                return {"kind": "glossary", "entries": parse_glossary_lines(content)}
            if kind == "remember":
                items = [l.strip() for l in (body or joined).split("\n") if l.strip()]
                return {"kind": "remember", "title": title or "À retenir", "items": items}
            if kind == "warn":
                return {"kind": "warn", "title": title or "Attention", "text": body or joined}
            if kind == "reflect":
                return {"kind": "reflect", "title": title or "Réfléchis", "text": body or joined}

    if joined.strip():
        return {"kind": "box", "text": joined}
    return None


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


def heading_level(style: str) -> int:
    if style == "Heading 1":
        return 1
    if style == "Heading 2":
        return 2
    if style == "Heading 3":
        return 3
    return 0


def flush_list(buf: list[str], blocks: list):
    if buf:
        blocks.append({"t": "ul", "items": buf[:]})
        buf.clear()


def build_modules(docx_path: Path):
    doc = Document(str(docx_path))
    modules: dict[str, dict] = {}
    current = None
    section = None
    used_ids: set[str] = set()
    list_buf: list[str] = []
    intro_done = False
    global_glossary = []
    quiz_questions = []
    quiz_answers = []
    appendix = None  # "glossary" | "quiz" | "answers" | None

    def ensure_section(title: str, level: int):
        nonlocal section, list_buf
        if current is None:
            return
        flush_list(list_buf, section["blocks"] if section else [])
        section = {
            "id": slugify(title, used_ids),
            "title": title,
            "level": level,
            "blocks": [],
        }
        current["sections"].append(section)

    def add_block(block):
        nonlocal section
        if current is None:
            return
        if section is None:
            ensure_section("Introduction", 2)
        section["blocks"].append(block)

    for kind, obj in iter_block_items(doc):
        if kind == "p":
            text = obj.text.strip()
            if not text:
                continue
            style = obj.style.name if obj.style else ""
            level = heading_level(style)

            if level == 1:
                flush_list(list_buf, section["blocks"] if section else [])
                title_l = text.lower()
                if title_l.startswith("les mots difficiles"):
                    appendix = "glossary"
                    current = None
                    section = None
                    continue
                if title_l.startswith("teste-toi"):
                    appendix = "quiz"
                    current = None
                    section = None
                    continue
                if title_l.startswith("les réponses"):
                    appendix = "answers"
                    current = None
                    section = None
                    continue
                # Skip guide intro headings
                appendix = None
                continue

            if appendix == "quiz":
                m = re.match(r"^(\d+)\.\s+(.*)$", text)
                if m:
                    quiz_questions.append({"n": int(m.group(1)), "question": m.group(2).strip()})
                continue
            if appendix in {"glossary", "answers"}:
                continue
            if current is None:
                continue

            if level in {2, 3}:
                ensure_section(text, level)
                continue

            is_list = style == "List Paragraph" or text.startswith(("•", "-", "–"))
            clean = re.sub(r"^[•\-–]\s*", "", text).strip()
            if is_list:
                list_buf.append(clean)
            else:
                flush_list(list_buf, section["blocks"] if section else [])
                add_block({"t": "p", "text": clean})
            continue

        # table
        parsed = classify_table(obj)
        if not parsed:
            continue

        if parsed["kind"] == "chapter":
            flush_list(list_buf, section["blocks"] if section else [])
            code = parsed["module"]
            used_ids = set()
            current = {
                "code": code,
                "chapter": parsed["chapitre"],
                "title": parsed["title"],
                "goals": [],
                "sections": [],
            }
            modules[code] = current
            section = None
            appendix = None
            intro_done = True
            continue

        if parsed["kind"] == "glossary_table":
            global_glossary = parsed["entries"]
            continue
        if parsed["kind"] == "quiz_answers":
            quiz_answers = parsed["items"]
            continue

        if current is None:
            continue

        if parsed["kind"] == "goals":
            current["goals"] = parsed["items"]
            continue

        flush_list(list_buf, section["blocks"] if section else [])

        if parsed["kind"] == "glossary":
            add_block({"t": "glossary", "entries": parsed["entries"]})
        elif parsed["kind"] == "remember":
            add_block({"t": "note", "kind": "remember", "label": parsed.get("title") or "À retenir", "items": parsed["items"]})
        elif parsed["kind"] == "warn":
            add_block({"t": "note", "kind": "warn", "label": parsed.get("title") or "Attention", "text": parsed["text"]})
        elif parsed["kind"] == "reflect":
            add_block({"t": "note", "kind": "reflect", "label": parsed.get("title") or "Réfléchis", "text": parsed["text"]})
        elif parsed["kind"] == "table":
            add_block({"t": "table", "headers": parsed.get("headers") or [], "rows": parsed.get("rows") or []})
        elif parsed["kind"] == "box":
            add_block({"t": "p", "text": parsed["text"].replace("\n", " ")})

    flush_list(list_buf, section["blocks"] if section else [])

    # Attach shared quiz items relevant to each module by chapter order heuristics
    # Keep full quiz on module 110 as revision; all modules get empty quiz by default.
    answer_by_q = {}
    for item in quiz_answers:
        m = re.match(r"^(\d+)\.", item["question"])
        if m:
            answer_by_q[int(m.group(1))] = item["answer"]
    full_quiz = [
        {
            "question": q["question"],
            "answer": answer_by_q.get(q["n"], ""),
        }
        for q in quiz_questions
    ]

    # Approximate mapping of quiz questions to modules (from guide order)
    quiz_map = {
        "101": [1],
        "102": [2],
        "103": [3],
        "104": [4],
        "105": [5, 6],
        "106": [7, 8],
        "107": [],
        "108": [],
        "109": [9, 10],
        "110": [11],
    }

    OUT.mkdir(parents=True, exist_ok=True)
    for code, mod in modules.items():
        # Drop empty trailing sections
        sections = []
        for s in mod["sections"]:
            if s["blocks"]:
                sections.append(s)
        words = 0
        for s in sections:
            for b in s["blocks"]:
                if b["t"] == "p":
                    words += len(b["text"].split())
                elif b["t"] == "ul":
                    words += sum(len(i.split()) for i in b["items"])
                elif b["t"] == "glossary":
                    words += sum(len(e["term"].split()) + len(e["definition"].split()) for e in b["entries"])
                elif b["t"] == "note":
                    if "items" in b:
                        words += sum(len(i.split()) for i in b["items"])
                    else:
                        words += len(b.get("text", "").split())
                elif b["t"] == "table":
                    words += sum(len(str(c).split()) for row in b.get("rows", []) for c in row)
                    words += sum(len(str(h).split()) for h in b.get("headers", []))

        q_nums = quiz_map.get(code, [])
        quiz = [full_quiz[n - 1] for n in q_nums if 1 <= n <= len(full_quiz)]
        # Full revision quiz on last module
        if code == "110":
            quiz = full_quiz

        payload = {
            "code": code,
            "chapter": mod["chapter"],
            "title": mod["title"],
            "goals": mod["goals"],
            "words": words,
            "sections": sections,
            "glossary": global_glossary,
            "quiz": quiz,
            "source": "Guide FALC Logistique Modules 101-110",
        }
        (OUT / f"{code}.json").write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
        print(code, "sections", len(sections), "goals", len(mod["goals"]), "mots", words, "quiz", len(quiz))

    # Shared assets
    (OUT / "_shared.json").write_text(
        json.dumps(
            {
                "glossary": global_glossary,
                "quiz": full_quiz,
                "modules": sorted(modules.keys()),
            },
            ensure_ascii=False,
            indent=1,
        ),
        encoding="utf-8",
    )
    print("shared glossary", len(global_glossary), "quiz", len(full_quiz))


if __name__ == "__main__":
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_DOCX
    if not path.exists():
        # fallback to upload path used by Cloud Agent
        alt = Path("/home/ubuntu/.cursor/projects/workspace/uploads/Guide_FALC_Logistique_Modules_101-110_d740.docx")
        path = alt if alt.exists() else path
    if not path.exists():
        raise SystemExit(f"Fichier introuvable: {path}")
    build_modules(path)
