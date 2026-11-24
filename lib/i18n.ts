export type Lang = "de" | "en";

export type TR = { de: string; en: string };

export function l(value: string | TR, lang: Lang): string {
  if (typeof value === "string") return value;
  return value[lang] ?? value.de;
}

// UI dictionary: short, reusable strings used across the site.
export const UI: Record<string, TR> = {
  // header / nav
  "nav.start": { de: "Start", en: "Home" },
  "nav.termine": { de: "Termine", en: "Events" },
  "nav.mitgliedschaft": { de: "Mitgliedschaft", en: "Membership" },
  "nav.orgel": { de: "Orgel", en: "Organ" },
  "nav.verein": { de: "Verein", en: "Association" },
  "nav.partner": { de: "Partner", en: "Partners" },
  "nav.kontakt": { de: "Kontakt", en: "Contact" },

  "header.phone": { de: "Fon", en: "Phone" },
  "header.search": { de: "Suche", en: "Search" },
  "header.menu": { de: "Menü", en: "Menu" },
  "header.tickets": { de: "Karten bestellen", en: "Book tickets" },

  "lang.banner": {
    de: "Deutsche Version aktiv.",
    en: "English version is active across the site."
  },

  // footer
  "footer.nav": { de: "Navigation", en: "Navigation" },
  "footer.join": { de: "Mitmachen", en: "Get involved" },
  "footer.become_member": { de: "Mitglied werden", en: "Become a member" },
  "footer.declaration_pdf": {
    de: "Beitrittserklärung (PDF)",
    en: "Membership declaration (PDF)"
  },
  "footer.new_members": { de: "Neue Mitglieder", en: "New members" },
  "footer.obituary": { de: "Nachruf", en: "In memoriam" },
  "footer.partners": { de: "Partner und Förderer", en: "Partners and supporters" },
  "footer.search": { de: "Suche", en: "Search" },
  "footer.imprint": { de: "Impressum", en: "Imprint" },
  "footer.privacy": { de: "Datenschutz", en: "Privacy" },
  "footer.disclaimer": { de: "Disclaimer", en: "Disclaimer" },
  "footer.admin": { de: "Login", en: "Login" },
  "footer.about": {
    de: "Der Förderverein pflegt seit 1993 die MAYER-Orgel der Lisdorfer Pfarrkirche und gestaltet ein kirchenmusikalisches Programm, das weit über das Saarland hinauswirkt.",
    en: "Since 1993 the association has cared for the MAYER organ of the Lisdorf parish church and curates a sacred music programme that reaches far beyond the Saarland."
  },
  "footer.email_label": { de: "E-Mail", en: "Email" },

  // home / hero
  "home.next_concert_eyebrow": {
    de: "Nächstes Konzert · Lisdorf",
    en: "Next concert · Lisdorf"
  },
  "home.about_us": { de: "Über uns", en: "About us" },
  "home.book_tickets": { de: "Karten bestellen", en: "Book tickets" },
  "home.upcoming": { de: "Kommende Veranstaltungen", en: "Upcoming events" },
  "home.all_events": { de: "Alle Termine", en: "All events" },
  "home.details": { de: "Details", en: "Details" },
  "home.organ_eyebrow": { de: "MAYER-Orgel · Lisdorf", en: "MAYER organ · Lisdorf" },
  "home.organ_title_a": { de: "Das Herzstück", en: "At the heart" },
  "home.organ_title_b": { de: "unseres Vereins.", en: "of our association." },
  "home.organ_lead": {
    de: "Die große MAYER-Orgel der Pfarrkirche St. Crispinus und Crispinianus ist das klingende Zentrum unserer Arbeit. Erfahren Sie mehr über das Instrument, die Erweiterung um den Gregoriusbass 32′ und seine Geschichte.",
    en: "The great MAYER organ of St. Crispinus and Crispinianus parish church is the sounding centre of our work. Learn more about the instrument, the addition of the Gregoriusbass 32′ and its history."
  },
  "home.to_organ": { de: "Zur Orgel", en: "To the organ" },
  "home.about_association": { de: "Über den Verein", en: "About the association" },
  "home.membership_eyebrow": { de: "Mitgliedschaft", en: "Membership" },
  "home.membership_title_a": { de: "Werden Sie Teil", en: "Become part" },
  "home.membership_title_b": {
    de: "der Klingenden Kirche.",
    en: "of the Klingende Kirche."
  },
  "home.membership_lead": {
    de: "Unser Verein lebt von 288 Freundinnen und Freunden der Kirchenmusik. Schon ab 2,50 € im Monat tragen Sie die Konzerte, die Orgelakademie und die Pflege der MAYER-Orgel mit.",
    en: "Our association is carried by 288 friends of sacred music. From as little as 2.50 € per month you support the concerts, the organ academy and the care of the MAYER organ."
  },
  "home.become_member": { de: "Mitglied werden", en: "Become a member" },
  "home.pdf_declaration": {
    de: "Beitrittserklärung (PDF)",
    en: "Membership declaration (PDF)"
  },
  "home.new_members_card_title": { de: "Neue Mitglieder", en: "New members" },
  "home.new_members_card_lead": {
    de: "Wir begrüßen alle Menschen, die 2026 Teil unseres Vereins wurden.",
    en: "We welcome everyone who joined our association in 2026."
  },
  "home.obituary_card_title": { de: "Nachruf", en: "In memoriam" },
  "home.obituary_card_lead": {
    de: "Wir gedenken unserer verstorbenen Vereinsmitglieder.",
    en: "We remember our deceased members."
  },
  "home.view": { de: "Ansehen", en: "View" },
  "home.in_memoriam": { de: "In Gedenken", en: "In memoriam" },
  "home.founded_signature": {
    de: "Förderverein Klingende Kirche",
    en: "Klingende Kirche Association"
  },
  "home.since": { de: "Seit", en: "Since" },

  // generic
  "common.back_to_organ": { de: "Zurück zur Orgel", en: "Back to the organ" },
  "common.all_chapters": { de: "Alle Kapitel", en: "All chapters" },
  "common.previous_chapter": { de: "Vorheriges Kapitel", en: "Previous chapter" },
  "common.next_chapter": { de: "Nächstes Kapitel", en: "Next chapter" },
  "common.chapter_content": {
    de: "Inhalt dieses Kapitels",
    en: "Chapter contents"
  },
  "common.expand_all": { de: "Alle ausklappen", en: "Expand all" },
  "common.collapse_all": { de: "Alle einklappen", en: "Collapse all" },
  "common.decade": { de: "Jahrzehnt", en: "Decade" },
  "common.total_concerts_1": { de: "Insgesamt", en: "In total" },
  "common.total_concerts_2": { de: "Konzerte", en: "concerts" },
  "common.one_concert": { de: "Konzert", en: "concert" },
  "common.many_concerts": { de: "Konzerte", en: "concerts" },
  "common.work": { de: "Werk", en: "Division" },
  "common.disposition": { de: "Disposition", en: "Specification" },
  "common.key_facts": { de: "Kennzahlen", en: "Key facts" },
  "common.in_preparation": { de: "In Vorbereitung", en: "Coming soon" },
  "common.content_follows": { de: "Inhalt folgt", en: "Content to follow" },
  "common.breadcrumb_organ": { de: "Orgel", en: "Organ" },
  "common.partner": { de: "Partner", en: "Partner" },
  "common.event": { de: "Termin", en: "Event" },
  "common.news": { de: "News", en: "News" },
  "common.gallery": { de: "Galerie", en: "Gallery" },
  "common.page": { de: "Seite", en: "Page" },
  "common.download": { de: "Download", en: "Download" },
  "common.members": { de: "Mitglieder", en: "members" },
  "common.era_history": {
    de: "Lisdorfer Orgelgeschichte",
    en: "Lisdorf organ history"
  },
  "common.era_organists": {
    de: "Organisten an der MAYER-Orgel",
    en: "Organists at the MAYER organ"
  },
  "common.images_in_prep": {
    de: "Foto-Material in Vorbereitung",
    en: "Photo material coming soon"
  },
  "common.figure": { de: "Abbildung", en: "Figure" },
  "common.read_more": { de: "Weiter lesen", en: "Read more" },

  // search
  "search.title": {
    de: "Finden Sie, was Sie suchen",
    en: "Find what you are looking for"
  },
  "search.subtitle": {
    de: "Durchsuchen Sie Konzerte, Mitgliedschaft, Orgel und Informationen aus dem Verein.",
    en: "Search concerts, membership, organ and association information."
  },
  "search.placeholder": {
    de: "z. B. Adventskonzert, Mitgliedschaft, Orgel …",
    en: "e.g. Advent concert, membership, organ …"
  },
  "search.min_chars": {
    de: "Geben Sie mindestens 2 Zeichen ein, um Ergebnisse zu sehen.",
    en: "Enter at least 2 characters to see results."
  },
  "search.no_hits_prefix": { de: "Keine Treffer für", en: "No results for" },
  "search.overlay_placeholder": {
    de: "Was suchen Sie? z. B. Konzert, Orgel, Mitgliedschaft …",
    en: "What are you looking for? e.g. concert, organ, membership …"
  },
  "search.overlay_hint": {
    de: "Geben Sie mindestens 2 Zeichen ein.",
    en: "Enter at least 2 characters."
  },
  "search.overlay_empty": {
    de: "Keine Treffer. Versuchen Sie z. B. „Adventskonzert\" oder „Beitritt\".",
    en: "No results. Try for example “Advent concert” or “join”."
  }
};

export function t(key: keyof typeof UI, lang: Lang): string {
  return UI[key]?.[lang] ?? UI[key]?.de ?? String(key);
}
