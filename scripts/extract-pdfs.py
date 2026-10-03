"""Extrait le texte brut de chaque PDF de docs/ vers content/raw/<code>.json.

Usage : python3 scripts/extract-pdfs.py
Chaque fichier contient la liste des pages avec les lignes de texte (layout conservé).
"""
import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
OUT = ROOT / "content" / "raw"
OUT.mkdir(parents=True, exist_ok=True)
for existing in OUT.glob("*.json"):
    existing.unlink()

for pdf in sorted(DOCS.glob("*.pdf")):
    m = re.search(r"M(\d{3})", pdf.name)
    if not m:
        continue
    suffix = re.search(r"M\d{3}([^.]*)\.pdf$", pdf.name, re.IGNORECASE)
    raw_suffix = suffix.group(1) if suffix else ""
    part = re.search(r"(?:-|_)(\d+)(?:_|$)", raw_suffix)
    code = f"{m.group(1)}-{part.group(1)}" if part else m.group(1)
    reader = PdfReader(str(pdf))
    pages = []
    for page in reader.pages:
        try:
            text = page.extract_text() or ""
        except Exception as exc:  # noqa: BLE001
            print(f"  page error {pdf.name}: {exc}", file=sys.stderr)
            text = ""
        pages.append(text)
    (OUT / f"{code}.json").write_text(
        json.dumps({"code": code, "file": pdf.name, "pages": pages}, ensure_ascii=False),
        encoding="utf-8",
    )
    print(code, len(pages), "pages", sum(len(p) for p in pages), "chars")
