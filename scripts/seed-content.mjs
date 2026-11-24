// Seed-Script: befüllt news/galleries/partners/board_members/members_list
// einmalig mit den aktuellen hartcodierten Werten aus lib/data.ts. Idempotent
// durch ON CONFLICT DO NOTHING bzw. Count-Check.
//
// Nutzung:
//   node --env-file=.env.local scripts/seed-content.mjs
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL nicht gesetzt.");
  process.exit(1);
}
const sql = neon(url);

async function countRows(table) {
  const rows = await sql.query(`SELECT COUNT(*)::int AS c FROM ${table}`);
  return rows[0]?.c ?? 0;
}

// ---------------------------------------------------------------------------
// Partners
// ---------------------------------------------------------------------------
const PARTNERS = [
  {
    name: "Landkreis Saarlouis",
    logo: "/images/partners/01-landkreis-saarlouis.png"
  },
  {
    name: "Kreisstadt Saarlouis",
    logo: "/images/partners/02-kreisstadt-saarlouis.jpg"
  },
  {
    name: "Stadtverband der kulturellen Vereine Saarlouis e.V.",
    logo: "/images/partners/03-stadtverband-kulturelle-vereine.jpg"
  },
  {
    name: "Katholische Kirchengemeinde Saarlouis",
    logo: "/images/partners/04-katholische-kirchengemeinde-saarlouis.jpg"
  },
  {
    name: "Gesellschaft für Bildung und Kultur im Landkreis Saarlouis mbH",
    logo: "/images/partners/05-gesellschaft-bildung-kultur.jpg"
  },
  {
    name: "Kreismusikschule Saarlouis",
    logo: "/images/partners/06-kreismusikschule-saarlouis.jpg"
  },
  {
    name: "Musikfestspiele Saar",
    logo: "/images/partners/07-musikfestspiele-saar.jpg"
  },
  {
    name: "Hugo Mayer Orgelbau GmbH",
    logo: "/images/partners/08-hugo-mayer-orgelbau.jpg",
    note: "Orgelbaumeister des Lisdorfer Instruments"
  },
  {
    name: "Bistum Trier",
    logo: "/images/partners/09-bistum-trier.jpg"
  }
];

if ((await countRows("partners")) === 0) {
  console.log("→ Partners seeden …");
  for (let i = 0; i < PARTNERS.length; i++) {
    const p = PARTNERS[i];
    await sql`
      INSERT INTO partners (name_de, logo_url, note_de, sort_order)
      VALUES (${p.name}, ${p.logo}, ${p.note ?? null}, ${i})
    `;
  }
  console.log(`   ${PARTNERS.length} Partner angelegt`);
} else {
  console.log("→ Partners bereits vorhanden, Skip");
}

// ---------------------------------------------------------------------------
// Board members
// ---------------------------------------------------------------------------
const BOARD = [
  { role: "1. Vorsitzender", name: "Manfred Boßmann" },
  { role: "2. Vorsitzender", name: "N.N." },
  { role: "Geschäftsführer", name: "N.N." },
  { role: "Schatzmeisterin", name: "N.N." },
  { role: "Künstlerische Leitung", name: "Regionalkantor Markus Schaubel" },
  { role: "Schriftführer", name: "N.N." }
];

if ((await countRows("board_members")) === 0) {
  console.log("→ Vorstand seeden …");
  for (let i = 0; i < BOARD.length; i++) {
    const b = BOARD[i];
    await sql`
      INSERT INTO board_members (role_de, name, sort_order)
      VALUES (${b.role}, ${b.name}, ${i})
    `;
  }
  console.log(`   ${BOARD.length} Einträge`);
} else {
  console.log("→ Vorstand bereits vorhanden, Skip");
}

// ---------------------------------------------------------------------------
// Members lists 2026
// ---------------------------------------------------------------------------
const NEW_2026 = [
  "Ernst Schmitt, Ensdorf",
  "Dr. Cordelia Rose, Schwanewede",
  "Helga Koster, Saarlouis",
  "Jann Endrik Rose, Schwanewede",
  "Gertrud Pillon, Bous",
  "Margarete Strauß, Bous",
  "Sabine Recktenwald, Spiesen-Elversberg",
  "Gerd Mosel, Saarlouis",
  "Prof. Violeta Dinescu, Oldenburg",
  "Prof. Pier Damiano Peretti, Wien",
  "Prof. Daniel Glaus, Bern",
  "Markus Comtesse, Saarlouis",
  "Stefan Bost, Lisdorf",
  "Volker Schwartz, Schwalbach",
  "Gerald Purucker, Saarlouis",
  "Monika Comtesse, Nessetal",
  "Pfr. Dr. Ulrich Graf von Plattenberg"
];
const DECEASED_2026 = [
  "Burkhardt Pracht, Saarlouis-Lisdorf",
  "Dorothea Comtesse, Saarlouis",
  "Rita Wagner, Saarlouis-Lisdorf"
];

if ((await countRows("members_list")) === 0) {
  console.log("→ Mitgliederlisten 2026 seeden …");
  for (let i = 0; i < NEW_2026.length; i++) {
    await sql`
      INSERT INTO members_list (kind, year, name, sort_order)
      VALUES ('new', 2026, ${NEW_2026[i]}, ${i})
    `;
  }
  for (let i = 0; i < DECEASED_2026.length; i++) {
    await sql`
      INSERT INTO members_list (kind, year, name, sort_order)
      VALUES ('deceased', 2026, ${DECEASED_2026[i]}, ${i})
    `;
  }
  console.log(
    `   ${NEW_2026.length} neue + ${DECEASED_2026.length} verstorbene Mitglieder`
  );
} else {
  console.log("→ Mitgliederlisten bereits vorhanden, Skip");
}

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------
const SITE_SETTINGS = {
  phone: "0 68 31 / 12 22 20",
  phoneHref: "+4968311222200",
  fax: "0 68 31 / 12 32 60",
  email: "info@klingende-kirche.de",
  address_chair_de: "Manfred Boßmann, 1. Vorsitzender",
  address_chair_en: "Manfred Boßmann, Chairman",
  address_street: "Weißdornflur 9",
  address_city: "66740 Saarlouis-Lisdorf",
  church_name_de: "Kath. Pfarrkirche St. Crispinus und Crispinianus",
  church_name_en: "Catholic parish church St. Crispinus and Crispinianus",
  church_street: "Großstraße",
  church_city: "66740 Saarlouis-Lisdorf",
  bank_name: "Kreissparkasse Saarlouis",
  bank_holder_de: "Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.",
  bank_holder_en: "Klingende Kirche Association Saarlouis-Lisdorf e.V.",
  bank_iban: "DE04 5935 0110 0074 3005 00",
  bank_bic: "KRSADE55XXX"
};

if ((await countRows("site_settings")) === 0) {
  console.log("→ Site-Settings seeden …");
  for (const [k, v] of Object.entries(SITE_SETTINGS)) {
    await sql`
      INSERT INTO site_settings (key, value)
      VALUES (${k}, ${JSON.stringify(v)}::jsonb)
    `;
  }
  console.log(`   ${Object.keys(SITE_SETTINGS).length} Einträge`);
} else {
  console.log("→ Site-Settings bereits vorhanden, Skip");
}

// ---------------------------------------------------------------------------
// News (bestehende Artikel aus lib/data.ts)
// ---------------------------------------------------------------------------
const NEWS = [
  {
    id: "spendenaktion-orgelerweiterung",
    date: "2026-11-02",
    category: "Spendenaktion",
    title: "Situationsbericht zur Spendenaktion „Erweiterung der Lisdorfer Orgel"",
    excerpt:
      "Endspurt bei der Finanzierung des neuen 32′-Registers. Ein Dank an alle, die bereits mitgetragen haben.",
    body: [
      "Liebe Vereinsmitglieder, sehr verehrte Musikfreunde, sehr geehrte Damen und Herren,",
      "mit dem feierlichen Erklingen des neuen Gregoriusbass 32′-Registers ist ein lange getragener Wunsch des Fördervereins Wirklichkeit geworden. Der Dank gilt allen Spenderinnen und Spendern, die diese Erweiterung über die vergangenen Monate möglich gemacht haben.",
      "Für die abschließende Finanzierung bitten wir Sie weiterhin um Ihre Unterstützung. Jeder Beitrag, ob klein oder groß, hilft dabei, die Lisdorfer Orgel in ihrer neuen klanglichen Tiefe dauerhaft zu erhalten."
    ]
  },
  {
    id: "orgel-32-fuss-register",
    date: "2026-10-12",
    category: "Orgel",
    title: "Förderverein erweitert Lisdorfer Orgel um 32′-Register",
    excerpt:
      "Ein bleibendes Geschenk für die Lisdorfer Orgel: das neue Gregoriusbass-Register erschließt eine neue klangliche Dimension.",
    body: [
      "Der Förderverein Klingende Kirche Saarlouis-Lisdorf e.V. hat den Einbau eines 32-Fuß-Registers für die MAYER-Orgel der Lisdorfer Kirche beschlossen und umgesetzt.",
      "Mit dieser bedeutenden Erweiterung erhält das Instrument ein neues Fundament im Bassbereich. Der tiefe Grundton trägt das gesamte Pleno und eröffnet neue Möglichkeiten für die Konzert- und Liturgiepraxis.",
      "Die Weihe des Gregoriusbass 32′-Registers fand im Oktober 2026 in einem festlichen Konzert mit zahlreichen Gästen statt."
    ]
  },
  {
    id: "wir-suchen-sie",
    date: "2026-09-18",
    category: "Mitmachen",
    title: "Wir suchen SIE …",
    excerpt:
      "Freundinnen und Freunde der Kirchenmusik gesucht: unterstützen Sie den Förderverein als Mitglied oder ehrenamtlich.",
    body: [
      "Der Förderverein Klingende Kirche Saarlouis-Lisdorf e.V. lebt vom ehrenamtlichen Engagement seiner Mitglieder.",
      "Wir suchen Menschen, die unsere Konzerte, die Orgelakademie und den Kompositionswettbewerb mittragen möchten. Ob als Mitglied, als Helferin bei Konzerten oder als Freundin im Hintergrund: jede Unterstützung zählt.",
      "Sprechen Sie uns an. Wir freuen uns auf Ihre Nachricht."
    ]
  }
];

if ((await countRows("news")) === 0) {
  console.log("→ News seeden …");
  for (const n of NEWS) {
    const html = n.body.map((p) => `<p>${p}</p>`).join("\n");
    await sql`
      INSERT INTO news (id, title_de, excerpt_de, body_de, category_de, published_at)
      VALUES (${n.id}, ${n.title}, ${n.excerpt}, ${html}, ${n.category}, ${n.date})
    `;
  }
  console.log(`   ${NEWS.length} Artikel`);
} else {
  console.log("→ News bereits vorhanden, Skip");
}

console.log("\nSeed abgeschlossen.");
