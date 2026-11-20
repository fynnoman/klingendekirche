import { neon } from "@neondatabase/serverless";

let _sql: ReturnType<typeof neon> | null = null;

export function sql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "[db] DATABASE_URL is not set. Add it in .env.local or your Vercel environment."
    );
  }
  _sql = neon(url);
  return _sql;
}
