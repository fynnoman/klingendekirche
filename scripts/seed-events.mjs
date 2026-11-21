// Spielt die EVENTS aus lib/data.ts initial in die events-Tabelle ein und
// übernimmt vorhandene ticket_events-Werte (Preis, Kapazität, Verkauf aktiv).
// Idempotent: existierende Einträge werden anhand von id geUPSERTet.
//
// Usage:  node --env-file=.env.local scripts/seed-events.mjs
import { neon } from "@neondatabase/serverless";

// Minimal Event-Katalog (DE), spiegelt den aktuellen Stand aus lib/data.ts
// wider. Nach dem Seed wird der Admin die Konzerte direkt in der DB verwalten.
const EVENTS = [
  {
    id: "adventskonzert-2026",
    title_de: "Festliches Adventskonzert",
    title_en: "Festive Advent Concert",
    subtitle_de: "Chorgemeinschaft MGV 1859 Lisdorf · Orchester · Orgel",
    subtitle_en: "Choir MGV 1859 Lisdorf · Orchestra · Organ",
    date: "2026-12-07",
    time: "17:00 Uhr",
    venue_de: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    venue_en: "Parish church St. Crispinus and Crispinianus, Lisdorf",
    description_de:
      "Ein Abend aus Werken von Bach, Händel und Rutter. Chor, Streicher und die große MAYER-Orgel führen durch die Adventszeit. Kartenverkauf an der Abendkasse und online.",
    description_en:
      "An evening of works by Bach, Händel and Rutter. Choir, strings and the great MAYER organ lead through Advent. Tickets at the box office and online.",
    category: "Konzert",
    highlight: true
  },
  {
    id: "jahresschluss-2026",
    title_de: "Jahresschlusskonzert",
    title_en: "Year’s End Concert",
    subtitle_de: "Chor, Orgel und Gregoriusbass 32′",
    subtitle_en: "Choir, organ and Gregoriusbass 32′",
    date: "2026-12-30",
    time: "19:30 Uhr",
    venue_de: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    venue_en: "Parish church St. Crispinus and Crispinianus, Lisdorf",
    description_de:
      "Zum Ausklang des Jahres erklingen große Werke der Chorliteratur, begleitet vom erweiterten Orgelregister. Ein Abend aus Licht, Wärme und Gemeinschaft.",
    description_en:
      "To close the year, major works of choral literature are heard, accompanied by the expanded organ. An evening of light, warmth and community.",
    category: "Konzert",
    highlight: true
  },
  {
    id: "orgelvesper-januar",
    title_de: "Orgelvesper im Winter",
    title_en: "Winter Organ Vespers",
    subtitle_de: "Kurze Andacht mit Werken von César Franck",
    subtitle_en: "A short devotion with works by César Franck",
    date: "2027-01-19",
    time: "18:00 Uhr",
    venue_de: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    venue_en: "Parish church St. Crispinus and Crispinianus, Lisdorf",
    description_de:
      "Eine halbe Stunde Orgelmusik zur Winterzeit. Eintritt frei, um eine Spende wird gebeten.",
    description_en:
      "Half an hour of organ music in winter. Free admission, donations welcome.",
    category: "Orgel"
  },
  {
    id: "orgelakademie-2027",
    title_de: "Eröffnung Europäische Orgelakademie",
    title_en: "Opening of the European Organ Academy",
    subtitle_de: "Internationale Dozierende und Teilnehmer aus neun Ländern",
    subtitle_en: "International teachers and participants from nine countries",
    date: "2027-03-14",
    time: "15:00 Uhr",
    venue_de: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    venue_en: "Parish church St. Crispinus and Crispinianus, Lisdorf",
    description_de:
      "Die Akademie öffnet ihre Pforten mit einem Eröffnungskonzert und einer Einführung in die Kursarbeit der kommenden Woche.",
    description_en:
      "The academy opens with a concert and an introduction to the coming week of courses.",
    category: "Besonderes"
  },
  {
    id: "kompositionswettbewerb",
    title_de: "12. Internationaler Orgel-Kompositionswettbewerb",
    title_en: "12th International Organ Composition Competition",
    subtitle_de: "Preisträgerkonzert und Uraufführungen",
    subtitle_en: "Prize winners’ concert and premieres",
    date: "2027-05-08",
    time: "19:00 Uhr",
    venue_de: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    venue_en: "Parish church St. Crispinus and Crispinianus, Lisdorf",
    description_de:
      "Die prämierten Werke des diesjährigen Wettbewerbs erklingen in Uraufführung. Eine Jury aus Kirchenmusikern und Komponisten begleitet den Abend.",
    description_en:
      "The awarded works of this year’s competition are given their premieres. A jury of church musicians and composers accompanies the evening.",
    category: "Orgel"
  }
];

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL nicht gesetzt.");
  process.exit(1);
}
const sql = neon(url);

// Vorhandene ticket_events-Werte laden (Preis/Kapazität/aktiv)
let legacyTicketEvents = new Map();
try {
  const rows = await sql`SELECT event_id, price_cents, capacity, seats_sold, active FROM ticket_events`;
  for (const r of rows) legacyTicketEvents.set(r.event_id, r);
  console.log(`→ ${rows.length} bestehende ticket_events gefunden`);
} catch {
  console.log("→ Keine ticket_events-Tabelle, sauberer Start");
}

for (const e of EVENTS) {
  const legacy = legacyTicketEvents.get(e.id);
  const priceCents = legacy?.price_cents ?? 0;
  const capacity = legacy?.capacity ?? 0;
  const seatsSold = legacy?.seats_sold ?? 0;
  const saleActive = legacy?.active ?? false;
  const highlight = e.highlight ?? false;

  await sql`
    INSERT INTO events (
      id, title_de, title_en, subtitle_de, subtitle_en,
      date, time, venue_de, venue_en, description_de, description_en,
      category, price_cents, capacity, seats_sold, sale_active, highlight,
      archived, created_at, updated_at
    ) VALUES (
      ${e.id}, ${e.title_de}, ${e.title_en}, ${e.subtitle_de}, ${e.subtitle_en},
      ${e.date}, ${e.time}, ${e.venue_de}, ${e.venue_en},
      ${e.description_de}, ${e.description_en},
      ${e.category}, ${priceCents}, ${capacity}, ${seatsSold}, ${saleActive}, ${highlight},
      FALSE, NOW(), NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      title_de = EXCLUDED.title_de,
      title_en = EXCLUDED.title_en,
      subtitle_de = EXCLUDED.subtitle_de,
      subtitle_en = EXCLUDED.subtitle_en,
      date = EXCLUDED.date,
      time = EXCLUDED.time,
      venue_de = EXCLUDED.venue_de,
      venue_en = EXCLUDED.venue_en,
      description_de = EXCLUDED.description_de,
      description_en = EXCLUDED.description_en,
      category = EXCLUDED.category,
      -- Preis, Kapazität, Verkauf, Highlight NUR setzen wenn noch Defaults
      updated_at = NOW()
  `;
  console.log(
    `✓ ${e.id}  (Preis ${priceCents}¢, ${capacity} Plätze, verkauf=${saleActive})`
  );
}

console.log(`\nGeseedet: ${EVENTS.length} Events`);
console.log("Hinweis: ticket_events-Tabelle wird jetzt nicht mehr gebraucht.");
console.log("  Zum Aufräumen später: DROP TABLE ticket_events;");
