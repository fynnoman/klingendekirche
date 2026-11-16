import { EVENTS, NEWS, GALLERIES, PARTNERS, ORGEL_HISTORY, EVENT_CATEGORY_LABEL } from "./data";
import { l, type Lang } from "./i18n";

export type SearchDoc = {
  id: string;
  title: string;
  snippet: string;
  category: string;
  href: string;
};

type StaticPage = {
  id: string;
  title: { de: string; en: string };
  snippet: { de: string; en: string };
  category: { de: string; en: string };
  href: string;
};

const STATIC_PAGES: StaticPage[] = [
  {
    id: "page-home",
    title: { de: "Startseite", en: "Home" },
    snippet: {
      de: "Aktuelles Konzert, kommende Termine, Mitgliedschaft und Orgel auf einen Blick.",
      en: "The next concert, upcoming events, membership and organ at a glance."
    },
    category: { de: "Seite", en: "Page" },
    href: "/"
  },
  {
    id: "page-termine",
    title: { de: "Termine", en: "Events" },
    snippet: {
      de: "Alle kommenden Konzerte, Orgelvespern und besonderen Veranstaltungen.",
      en: "All upcoming concerts, organ vespers and special events."
    },
    category: { de: "Seite", en: "Page" },
    href: "/termine"
  },
  {
    id: "page-mitgliedschaft",
    title: { de: "Mitgliedschaft", en: "Membership" },
    snippet: {
      de: "Mitglied werden im Förderverein. Beitrittserklärung, Beitrag, Spendenkonto.",
      en: "Join the association. Declaration, membership fee, donation account."
    },
    category: { de: "Seite", en: "Page" },
    href: "/mitgliedschaft"
  },
  {
    id: "page-beitritt",
    title: {
      de: "Beitrittserklärung (PDF)",
      en: "Membership declaration (PDF)"
    },
    snippet: {
      de: "Aufnahmeantrag als PDF herunterladen, ausfüllen und einsenden.",
      en: "Download, fill in and submit the membership form as PDF."
    },
    category: { de: "Download", en: "Download" },
    href: "/downloads/beitrittserklaerung.pdf"
  },
  {
    id: "page-neue-mitglieder",
    title: { de: "Neue Mitglieder", en: "New members" },
    snippet: {
      de: "Wir begrüßen die neuen Mitglieder des Fördervereins im Jahr 2026.",
      en: "We welcome the new members of the association in 2026."
    },
    category: { de: "Mitglieder", en: "Members" },
    href: "/neue-mitglieder"
  },
  {
    id: "page-nachruf",
    title: { de: "Nachruf", en: "In memoriam" },
    snippet: {
      de: "Wir gedenken unserer verstorbenen Vereinsmitglieder.",
      en: "In memory of our deceased members."
    },
    category: { de: "Mitglieder", en: "Members" },
    href: "/nachruf"
  },
  {
    id: "page-orgel",
    title: {
      de: "MAYER-Orgel Lisdorf",
      en: "MAYER organ Lisdorf"
    },
    snippet: {
      de: "Die große MAYER-Orgel der Pfarrkirche St. Crispinus und Crispinianus.",
      en: "The great MAYER organ of St. Crispinus and Crispinianus parish church."
    },
    category: { de: "Orgel", en: "Organ" },
    href: "/orgel"
  },
  {
    id: "page-verein",
    title: { de: "Der Verein", en: "The association" },
    snippet: {
      de: "Vorstand, Satzung und Geschichte des Fördervereins seit 1993.",
      en: "Board, statutes and history of the association since 1993."
    },
    category: { de: "Seite", en: "Page" },
    href: "/verein"
  },
  {
    id: "page-partner",
    title: { de: "Partner und Förderer", en: "Partners and supporters" },
    snippet: {
      de: "Unser Netzwerk aus Kommune, Kirche, Kultur und Handwerk.",
      en: "Our network of municipalities, church, culture and craft."
    },
    category: { de: "Seite", en: "Page" },
    href: "/partner"
  },
  {
    id: "page-kontakt",
    title: { de: "Kontakt", en: "Contact" },
    snippet: {
      de: "So erreichen Sie den Förderverein.",
      en: "How to reach the association."
    },
    category: { de: "Seite", en: "Page" },
    href: "/kontakt"
  },
  {
    id: "page-galerien",
    title: { de: "Galerien", en: "Galleries" },
    snippet: {
      de: "Rückblicke auf Konzerte und Veranstaltungen.",
      en: "Reviews of concerts and events."
    },
    category: { de: "Seite", en: "Page" },
    href: "/galerien"
  },
  {
    id: "page-archiv",
    title: { de: "Archiv", en: "Archive" },
    snippet: {
      de: "Vergangene Programme und Berichte.",
      en: "Past programmes and reports."
    },
    category: { de: "Seite", en: "Page" },
    href: "/archiv"
  }
];

export function buildIndex(lang: Lang): SearchDoc[] {
  const pages: SearchDoc[] = STATIC_PAGES.map((p) => ({
    id: p.id,
    title: l(p.title, lang),
    snippet: l(p.snippet, lang),
    category: l(p.category, lang),
    href: p.href
  }));

  const events: SearchDoc[] = EVENTS.map((e) => ({
    id: `event-${e.id}`,
    title: l(e.title, lang),
    snippet:
      `${l(e.dateLabel, lang)}${e.time ? " · " + l(e.time, lang) : ""}` +
      (e.subtitle ? ` · ${l(e.subtitle, lang)}` : ""),
    category: `${lang === "en" ? "Event" : "Termin"} · ${l(EVENT_CATEGORY_LABEL[e.category], lang)}`,
    href: `/termine#${e.id}`
  }));

  const news: SearchDoc[] = NEWS.map((n) => ({
    id: `news-${n.id}`,
    title: l(n.title, lang),
    snippet: l(n.excerpt, lang),
    category: `${lang === "en" ? "News" : "News"} · ${l(n.category, lang)}`,
    href: `/news/${n.id}`
  }));

  const galleries: SearchDoc[] = GALLERIES.map((g) => ({
    id: `gallery-${g.id}`,
    title: l(g.title, lang),
    snippet: `${l(g.dateLabel, lang)} · ${l(g.subtitle, lang)}`,
    category: lang === "en" ? "Gallery" : "Galerie",
    href: `/galerien#${g.id}`
  }));

  const partners: SearchDoc[] = PARTNERS.map((p) => ({
    id: `partner-${l(p.name, "de")}`,
    title: l(p.name, lang),
    snippet: p.note
      ? l(p.note, lang)
      : lang === "en"
        ? "Partner and supporter of the Klingende Kirche."
        : "Partner und Förderer der Klingenden Kirche.",
    category: lang === "en" ? "Partner" : "Partner",
    href: "/partner"
  }));

  const orgelHistory: SearchDoc[] = ORGEL_HISTORY.map((h) => ({
    id: `orgel-${h.slug}`,
    title: `${l(h.title, lang)}${h.year ? ` (${l(h.year, lang)})` : ""}`,
    snippet:
      lang === "en"
        ? "Chapter from the history of the Lisdorf organs."
        : "Kapitel aus der Geschichte der Lisdorfer Orgeln.",
    category: lang === "en" ? "Organ" : "Orgel",
    href: `/orgel/${h.slug}`
  }));

  return [...pages, ...events, ...news, ...galleries, ...partners, ...orgelHistory];
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

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 25)
    .map((s) => s.doc);
}
