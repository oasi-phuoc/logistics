import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

export function generateStaticParams() {
  return fs
    .readdirSync(path.join(process.cwd(), "docs"))
    .filter((f) => f.endsWith(".pdf"))
    .map((file) => ({ file }));
}

export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const name = path.basename(params.file);
  const full = path.join(process.cwd(), "docs", name);
  if (!name.endsWith(".pdf") || !fs.existsSync(full)) {
    return new Response("Introuvable", { status: 404 });
  }
  return new Response(fs.readFileSync(full), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="${name}"` },
  });
}
