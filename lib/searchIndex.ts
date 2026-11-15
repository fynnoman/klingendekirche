import { EVENTS, NEWS, GALLERIES, PARTNERS } from "./data";

export type SearchDoc = {
  id: string;
  title: string;
  snippet: string;
  category: string;
  href: string;
};

const STATIC_PAGES: SearchDoc[] = [
  {
    id: "page-home",
    title: "Startseite",
    snippet: "Aktuelles Konzert, kommende Termine, Mitgliedschaft und Orgel auf einen Blick.",
    category: "Seite",
    href: "/"
  },
  {
    id: "page-termine",
    title: "Termine",
    snippet: "Alle kommenden Konzerte, Orgelvespern und besonderen Veranstaltungen.",
    category: "Seite",
    href: "/termine"
  },
  {
    id: "page-mitgliedschaft",
    title: "Mitgliedschaft",
    snippet: "Mitglied werden im Förderverein. Beitrittserklärung, Beitrag, Spendenkonto.",
    category: "Seite",
    href: "/mitgliedschaft"
  },
  {
    id: "page-beitritt",
    title: "Beitrittserklärung (PDF)",
    snippet: "Aufnahmeantrag als PDF herunterladen, ausfüllen und einsenden.",
    category: "Download",
    href: "/downloads/beitrittserklaerung.pdf"
  },
  {
    id: "page-neue-mitglieder",
    title: "Neue Mitglieder",
    snippet: "Wir begrüßen die neuen Mitglieder des Fördervereins im Jahr 2026.",
    category: "Mitglieder",
    href: "/neue-mitglieder"
  },
  {
    id: "page-nachruf",
    title: "Nachruf",
    snippet: "Wir gedenken unserer verstorbenen Vereinsmitglieder.",
    category: "Mitglieder",
    href: "/nachruf"
  },
  {
    id: "page-orgel",
    title: "MAYER-Orgel Lisdorf",
    snippet: "Die große MAYER-Orgel der Pfarrkirche St. Crispinus und Crispinianus.",
    category: "Orgel",
    href: "/orgel"
  },
  {
    id: "page-verein",
    title: "Der Verein",
    snippet: "Vorstand, Satzung und Geschichte des Fördervereins seit 1993.",
    category: "Seite",
    href: "/verein"
  },
  {
    id: "page-partner",
    title: "Partner und Förderer",
    snippet: "Unser Netzwerk aus Kommune, Kirche, Kultur und Handwerk.",
    category: "Seite",
    href: "/partner"
  },
  {
    id: "page-kontakt",
    title: "Kontakt",
    snippet: "So erreichen Sie den Förderverein.",
    category: "Seite",
    href: "/kontakt"
  },
  {
    id: "page-galerien",
    title: "Galerien",
    snippet: "Rückblicke auf Konzerte und Veranstaltungen.",
    category: "Seite",
    href: "/galerien"
  },
  {
    id: "page-archiv",
    title: "Archiv",
    snippet: "Vergangene Programme und Berichte.",
    category: "Seite",
    href: "/archiv"
  }
];

export function buildIndex(): SearchDoc[] {
  const events: SearchDoc[] = EVENTS.map((e) => ({
    id: `event-${e.id}`,
    title: e.title,
    snippet: `${e.dateLabel}${e.time ? " · " + e.time : ""} · ${e.subtitle ?? ""}`.trim(),
    category: `Termin · ${e.category}`,
    href: `/termine#${e.id}`
  }));

  const news: SearchDoc[] = NEWS.map((n) => ({
    id: `news-${n.id}`,
    title: n.title,
    snippet: n.excerpt,
    category: `News · ${n.category}`,
    href: `/news/${n.id}`
  }));

  const galleries: SearchDoc[] = GALLERIES.map((g) => ({
    id: `gallery-${g.id}`,
    title: g.title,
    snippet: `${g.dateLabel} · ${g.subtitle}`,
    category: "Galerie",
    href: `/galerien#${g.id}`
  }));

  const partners: SearchDoc[] = PARTNERS.map((p) => ({
    id: `partner-${p.name}`,
    title: p.name,
    snippet: p.note ?? "Partner und Förderer der Klingenden Kirche.",
    category: "Partner",
    href: "/partner"
  }));

  return [...STATIC_PAGES, ...events, ...news, ...galleries, ...partners];
}

export function search(query: string, index: SearchDoc[]): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored: { doc: SearchDoc; score: number }[] = [];

  for (const doc of index) {
    const haystack = `${doc.title} ${doc.snippet} ${doc.category}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (!haystack.includes(t)) {
        score = 0;
        break;
      }
      if (doc.title.toLowerCase().includes(t)) score += 3;
      else score += 1;
    }
    if (score > 0) scored.push({ doc, score });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 25).map((s) => s.doc);
}
