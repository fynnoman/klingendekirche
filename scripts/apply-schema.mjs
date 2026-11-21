// Apply scripts/schema.sql to the database defined in DATABASE_URL.
// Usage: node --env-file=.env.local scripts/apply-schema.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { neon } from "@neondatabase/serverless";

const here = dirname(fileURLToPath(import.meta.url));
const sqlFile = resolve(here, "schema.sql");

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL (oder DATABASE_URL_UNPOOLED) nicht gesetzt.");
  process.exit(1);
}

const sql = neon(url);
const raw = await readFile(sqlFile, "utf8");

// Strip full-line SQL comments, then split on `;`
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
console.log(`Applied ${statements.length} statements.`);
