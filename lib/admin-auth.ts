import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "kk_admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 14; // 14 Tage, rolling

async function setSessionCookie(token: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC
  });
}

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "[admin-auth] ADMIN_SESSION_SECRET is missing or too short (min 16 chars)."
    );
  }
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function issueSession(): string {
  const payload = `${Date.now()}.${Math.random().toString(36).slice(2)}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = sign(payload);
  const got = parts[2];
  if (expected.length !== got.length) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(got);
  if (!timingSafeEqual(a, b)) return false;
  const issued = parseInt(parts[0], 10);
  if (!Number.isFinite(issued)) return false;
  const ageSec = (Date.now() - issued) / 1000;
  return ageSec >= 0 && ageSec <= MAX_AGE_SEC;
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !input) return false;
  if (expected.length !== input.length) {
    // normalise length to avoid timing leak, but still return false
    return false;
  }
  return timingSafeEqual(Buffer.from(expected), Buffer.from(input));
}

export async function isAdminRequest(): Promise<boolean> {
  const jar = await cookies();
  const c = jar.get(COOKIE_NAME);
  const ok = verifySession(c?.value);
  // Rolling session: bei jedem autorisierten Zugriff die Cookie-Lebenszeit
  // auffrischen, damit Admins nicht mitten in der Arbeit rausgeworfen werden.
  if (ok && c?.value) {
    try {
      await setSessionCookie(c.value);
    } catch {
      /* Request-Phase ohne Response: ignorieren. */
    }
  }
  return ok;
}

export const ADMIN_COOKIE = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = MAX_AGE_SEC;
