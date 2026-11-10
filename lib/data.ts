export const SITE = {
  name: "Förderverein Klingende Kirche",
  nameLong: "Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.",
  short: "Klingende Kirche",
  tagline: "Kirchenmusik aus Lisdorf. Seit 1993.",
  phone: "0 68 31 / 12 22 20",
  phoneHref: "+4968311222200",
  fax: "0 68 31 / 12 32 60",
  email: "info@klingende-kirche.de",
  address: {
    chair: "Manfred Boßmann, 1. Vorsitzender",
    street: "Weißdornflur 9",
    city: "66740 Saarlouis"
  },
  church: {
    name: "Kath. Pfarrkirche St. Crispinus und Crispinianus",
    street: "Großstraße",
    city: "66740 Saarlouis-Lisdorf"
  },
  foundedYear: 1993,
  members: 275,
  concertsSince1993: 240
};

export const NAV: { label: string; href: string }[] = [
  { label: "Startseite", href: "/" },
  { label: "Termine & Neues", href: "/" },
  { label: "Galerien", href: "/" },
  { label: "Verein", href: "/" },
  { label: "Archiv", href: "/" },
  { label: "Partner", href: "/" },
  { label: "Kontakt", href: "/" }
];

export type EventItem = {
  id: string;
  date: string; // ISO
  dateLabel: string;
  time?: string;
  title: string;
  subtitle?: string;
  venue: string;
  category: "Konzert" | "Orgel" | "Vortrag" | "Chor" | "Besonderes";
  description: string;
  ticket?: string;
  highlight?: boolean;
};

export const EVENTS: EventItem[] = [
  {
    id: "adventskonzert-2026",
    date: "2026-12-07",
    dateLabel: "So, 07. Dezember 2026",
    time: "17:00 Uhr",
    title: "Festliches Adventskonzert",
    subtitle: "Chorgemeinschaft MGV 1859 Lisdorf · Orchester · Orgel",
    venue: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    category: "Konzert",
    description:
      "Ein Abend aus Werken von Bach, Händel und Rutter. Chor, Streicher und die große MAYER-Orgel führen durch die Adventszeit. Kartenverkauf an der Abendkasse und online.",
    ticket: "/kontakt",
    highlight: true
  },
  {
    id: "jahresschluss-2026",
    date: "2026-12-30",
    dateLabel: "Di, 30. Dezember 2026",
    time: "19:30 Uhr",
    title: "Jahresschlusskonzert",
    subtitle: "Chor, Orgel und Gregoriusbass 32′",
    venue: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    category: "Konzert",
    description:
      "Zum Ausklang des Jahres erklingen große Werke der Chorliteratur, begleitet vom erweiterten Orgelregister. Ein Abend aus Licht, Wärme und Gemeinschaft.",
    highlight: true
  },
  {
    id: "orgelvesper-januar",
    date: "2027-01-19",
    dateLabel: "Di, 19. Januar 2027",
    time: "18:00 Uhr",
    title: "Orgelvesper im Winter",
    subtitle: "Kurze Andacht mit Werken von César Franck",
    venue: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    category: "Orgel",
    description:
      "Eine halbe Stunde Orgelmusik zur Winterzeit. Eintritt frei, um eine Spende wird gebeten."
  },
  {
    id: "orgelakademie-2027",
    date: "2027-03-14",
    dateLabel: "So, 14. März 2027",
    time: "15:00 Uhr",
    title: "Eröffnung Europäische Orgelakademie",
    subtitle: "Internationale Dozierende und Teilnehmer aus neun Ländern",
    venue: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    category: "Besonderes",
    description:
      "Die Akademie öffnet ihre Pforten mit einem Eröffnungskonzert und einer Einführung in die Kursarbeit der kommenden Woche."
  },
  {
    id: "kompositionswettbewerb",
    date: "2027-05-08",
    dateLabel: "Sa, 08. Mai 2027",
    time: "19:00 Uhr",
    title: "12. Internationaler Orgel-Kompositionswettbewerb",
    subtitle: "Preisträgerkonzert und Uraufführungen",
    venue: "Kath. Pfarrkirche St. Crispinus und Crispinianus, Lisdorf",
    category: "Orgel",
    description:
      "Die prämierten Werke des diesjährigen Wettbewerbs erklingen in Uraufführung. Eine Jury aus Kirchenmusikern und Komponisten begleitet den Abend."
  }
];

export type NewsItem = {
  id: string;
  date: string;
  dateLabel: string;
  category: string;
  title: string;
  excerpt: string;
  body: string[];
  image?: string;
};

export const NEWS: NewsItem[] = [
  {
    id: "spendenaktion-orgelerweiterung",
    date: "2026-11-02",
    dateLabel: "02. November 2026",
    category: "Spendenaktion",
    title: "Situationsbericht zur Spendenaktion „Erweiterung der Lisdorfer Orgel“",
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
    dateLabel: "12. Oktober 2026",
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
    dateLabel: "18. September 2026",
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

export type GalleryItem = {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  subtitle: string;
  excerpt: string;
  cover: string;
};

export const GALLERIES: GalleryItem[] = [
  {
    id: "grundschulkinder-orgeltage",
    date: "2026-10-22",
    dateLabel: "22. Oktober 2026",
    title: "Über 500 Grundschulkinder zu Gast in der Lisdorfer Kirche",
    subtitle: "Musikgeschichte zum Staunen bei den Saarlouiser Orgeltagen",
    excerpt:
      "Was für eine beeindruckende Begegnung. Über 500 Grundschülerinnen und Grundschüler kamen bei den Saarlouiser Orgeltagen in die Lisdorfer Kirche, um Johann Sebastian Bach, einen der größten Komponisten der Musikgeschichte, zu entdecken.",
    cover:
      "https://images.unsplash.com/photo-1619285732886-fbee05fbb1d4?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "wayne-marshall-eroeffnung",
    date: "2026-10-18",
    dateLabel: "18. Oktober 2026",
    title: "Fulminante Eröffnung der 11. Saarlouiser Orgeltage",
    subtitle: "Weltstar Wayne Marshall an der MAYER-Orgel",
    excerpt:
      "Ein unvergesslicher Abend: Wayne Marshall eröffnete die 11. Saarlouiser Orgeltage mit einem atemberaubenden Programm aus Klassik und Improvisation.",
    cover:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "gregoriusbass-premiere",
    date: "2026-10-11",
    dateLabel: "11. Oktober 2026",
    title: "Klangvolle Premiere des Gregoriusbass-Registers",
    subtitle: "Historischer Moment für die Kirchenmusik in der Region",
    excerpt:
      "Am Sonntag, dem 11. Oktober 2026, kamen zahlreiche Besucher in die Lisdorfer Kirche, um einem festlichen Konzert anlässlich der Einweihung einer monumentalen Orgelregister-Erweiterung beizuwohnen.",
    cover:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "weihe-gregoriusbass",
    date: "2026-10-10",
    dateLabel: "10. Oktober 2026",
    title: "Festliche Weihe des Gregoriusbass 32′-Registers",
    subtitle: "Ein neues Klangelement für die Lisdorfer Orgel",
    excerpt:
      "Ein feierlicher Gottesdienst und ein anschließendes Konzert markierten die Weihe des neuen 32-Fuß-Registers. Die Resonanz der Besucher war außergewöhnlich.",
    cover:
      "https://images.unsplash.com/photo-1465225314224-587cd83d322b?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "orgelsommer-eroeffnung",
    date: "2026-06-28",
    dateLabel: "28. Juni 2026",
    title: "Eröffnung des Orgelsommers im Landkreis Saarlouis",
    subtitle: "Musikalischer Auftakt in der Lisdorfer Kirche",
    excerpt:
      "Der Orgelsommer im Landkreis Saarlouis wurde mit einem Auftakt der Extraklasse in der katholischen Kirche „St. Crispinus und Crispinianus“ eröffnet.",
    cover:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "orgel-fahrradrunde",
    date: "2026-06-14",
    dateLabel: "14. Juni 2026",
    title: "Dritte Saarlouiser Orgel-Fahrrad-Runde",
    subtitle: "Kulturerlebnis inklusive Fahrradspaß",
    excerpt:
      "Der Lisdorfer Förderverein „Klingende Kirche“ lud zur dritten Fahrradtour von Orgel zu Orgel. Ein geselliger Tag voller Klang und Bewegung.",
    cover:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "gedenkkonzert-schlee",
    date: "2026-05-07",
    dateLabel: "07. Mai 2026",
    title: "Gedenkkonzert in memoriam Thomas Daniel Schlee",
    subtitle: "Ein Abend des Erinnerns",
    excerpt:
      "Die Menschen versammelten sich in der Kirche „St. Crispinus und St. Crispinianus“ zu einem Konzert, das dem verstorbenen Komponisten gewidmet war.",
    cover:
      "https://images.unsplash.com/photo-1465225314224-587cd83d322b?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "kompositionswettbewerb-11",
    date: "2026-04-28",
    dateLabel: "28. April 2026",
    title: "11. Internationaler Orgel-Kompositionswettbewerb",
    subtitle: "Ergebnisse und Preisträger",
    excerpt:
      "Der vom Lisdorfer Förderverein initiierte und organisierte Wettbewerb erlebte seine 11. Auflage mit Unterstützung des Kulturamts.",
    cover:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "jugend-requiem-fackler",
    date: "2026-04-21",
    dateLabel: "21. April 2026",
    title: "Jugend-Ensembles begeistern mit „Deutschem Requiem“",
    subtitle: "Landesweite Berichterstattung in der Saarbrücker Zeitung",
    excerpt:
      "Der Landes-Jugend-Chor und junge Instrumentalisten zogen das Publikum mit einer bewegenden Aufführung in ihren Bann.",
    cover:
      "https://images.unsplash.com/photo-1465225314224-587cd83d322b?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "dichterlesung-koster",
    date: "2026-03-16",
    dateLabel: "16. März 2026",
    title: "Dichterlesung mit Helga Koster",
    subtitle: "Literatur und Orgelmusik im Dialog",
    excerpt:
      "Die Autorin Helga Koster las in der Lisdorfer Kirche, begleitet von Regionalkantor Markus Schaubel an der Orgel.",
    cover:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "jahresschlusskonzert-2025",
    date: "2025-12-30",
    dateLabel: "30. Dezember 2025",
    title: "Glanzvolles Jahresschlusskonzert",
    subtitle: "Chorgemeinschaft MGV 1859 Lisdorf und Freunde",
    excerpt:
      "In einer Zeit, in der die Tage kürzer werden, öffnete das Jahresschlusskonzert Türen zu Wärme, Licht und Gemeinschaft.",
    cover:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "vereinsfahrt-paris",
    date: "2025-10-04",
    dateLabel: "04. Oktober 2025",
    title: "Vereinsfahrt nach Paris",
    subtitle: "Reisebericht des Fördervereins",
    excerpt:
      "27 Teilnehmer aus neun Ländern reisten im Rahmen der Orgelakademie nach Paris. Ein Bericht aus der Hauptstadt der Orgelmusik.",
    cover:
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1400&q=60"
  }
];

export const PARTNERS: { name: string; note?: string }[] = [
  { name: "Landkreis Saarlouis" },
  { name: "Kreisstadt Saarlouis" },
  { name: "Stadtverband Saarbrücken" },
  { name: "Kath. Kirchengemeinde St. Ludwig Saarlouis" },
  { name: "Ministerium für Bildung und Kultur" },
  { name: "KMS – Kulturamt Saarlouis" },
  { name: "Musikfestspiele Saar" },
  { name: "Hugo Mayer Orgelbau GmbH", note: "Orgelbaumeister des Lisdorfer Instruments" },
  { name: "Bistum Trier" }
];

export const BOARD: { role: string; name: string }[] = [
  { role: "1. Vorsitzender", name: "Manfred Boßmann" },
  { role: "2. Vorsitzender", name: "N.N." },
  { role: "Geschäftsführer", name: "N.N." },
  { role: "Schatzmeisterin", name: "N.N." },
  { role: "Künstlerische Leitung", name: "Regionalkantor Markus Schaubel" },
  { role: "Schriftführer", name: "N.N." }
];

export const ORGAN_FACTS: { label: string; value: string }[] = [
  { label: "Orgelbauer", value: "Hugo Mayer Orgelbau" },
  { label: "Manuale", value: "III + Pedal" },
  { label: "Register", value: "38 (seit 2026 inkl. Gregoriusbass 32′)" },
  { label: "Pfeifen", value: "über 2.600" },
  { label: "Trakturen", value: "mechanisch" },
  { label: "Weihe", value: "1993, Erweiterung 2026" }
];
