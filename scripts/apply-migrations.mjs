// Spielt alle *.sql-Dateien aus scripts/migrations/ in alphabetischer
// Reihenfolge gegen die DATABASE_URL ein. Idempotent: die Migrations müssen
// selbst IF NOT EXISTS / IF NOT NULL-safe sein.
//
// Nutzung:
//   node --env-file=.env.local scripts/apply-migrations.mjs
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { neon } from "@neondatabase/serverless";

const here = dirname(fileURLToPath(import.meta.url));
const dir = resolve(here, "migrations");

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL (oder DATABASE_URL_UNPOOLED) nicht gesetzt.");
  process.exit(1);
}

const sql = neon(url);
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

for (const f of files) {
  console.log(`\n== ${f} ==`);
  const raw = await readFile(join(dir, f), "utf8");
  const cleaned = raw
    .split("\n")
    .filter((line) => !/^\s*--/.test(line))
    .join("\n");
  const statements = cleaned
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  for (const stmt of statements) {
    console.log("→", stmt.split("\n")[0].slice(0, 80), "…");
    await sql.query(stmt);
  }
}
console.log(`\nAlle ${files.length} Migrationen durchgelaufen.`);
