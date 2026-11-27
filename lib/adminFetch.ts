/**
 * Zentraler Fetch-Helper für alle Admin-Editoren im Browser.
 *
 * - Liest JSON-Antworten
 * - Wirft bei Fehlern eine Error-Message, die der Editor direkt anzeigen kann
 * - Leitet bei 401 (Session abgelaufen oder ungültig) automatisch zur
 *   Login-Seite, damit sich der Admin-User neu einloggen kann statt vor
 *   einem leeren Editor zu sitzen
 */
export class AdminFetchError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminFetchError";
    this.status = status;
  }
}

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const back = encodeURIComponent(
    window.location.pathname + window.location.search
  );
  window.location.href = `/admin/login?back=${back}`;
}

export async function adminFetch<T = unknown>(
  input: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    cache: "no-store",
    ...init,
    headers: {
      ...(init?.body && !(init.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...(init?.headers ?? {})
    }
  });

  if (res.status === 401) {
    redirectToLogin();
    throw new AdminFetchError("Sitzung abgelaufen, bitte neu einloggen.", 401);
  }

  let data: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && "error" in data
        ? String((data as Record<string, unknown>).error ?? "")
        : "") ||
      `HTTP ${res.status}`;
    throw new AdminFetchError(msg, res.status);
  }

  return data as T;
}

export async function adminGet<T = unknown>(url: string): Promise<T> {
  return adminFetch<T>(url);
}

export async function adminPost<T = unknown>(
  url: string,
  body: unknown
): Promise<T> {
  return adminFetch<T>(url, {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body ?? {})
  });
}

export async function adminPatch<T = unknown>(
  url: string,
  body: unknown
): Promise<T> {
  return adminFetch<T>(url, {
    method: "PATCH",
    body: JSON.stringify(body ?? {})
  });
}

export async function adminDelete<T = unknown>(url: string): Promise<T> {
  return adminFetch<T>(url, { method: "DELETE" });
}
