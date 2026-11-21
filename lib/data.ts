import type { TR } from "./i18n";

export const SITE = {
  name: "Förderverein Klingende Kirche",
  nameLong: {
    de: "Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.",
    en: "Klingende Kirche Association Saarlouis-Lisdorf e.V."
  } as TR,
  short: "Klingende Kirche",
  tagline: {
    de: "Kirchenmusik aus Lisdorf. Seit 1993.",
    en: "Sacred music from Lisdorf. Since 1993."
  } as TR,
  phone: "0 68 31 / 12 22 20",
  phoneHref: "+4968311222200",
  fax: "0 68 31 / 12 32 60",
  email: "info@klingende-kirche.de",
  address: {
    chair: {
      de: "Manfred Boßmann, 1. Vorsitzender",
      en: "Manfred Boßmann, Chairman"
    } as TR,
    street: "Weißdornflur 9",
    city: "66740 Saarlouis-Lisdorf"
  },
  church: {
    name: {
      de: "Kath. Pfarrkirche St. Crispinus und Crispinianus",
      en: "Catholic parish church St. Crispinus and Crispinianus"
    } as TR,
    street: "Großstraße",
    city: "66740 Saarlouis-Lisdorf"
  },
  bank: {
    name: "Kreissparkasse Saarlouis",
    holder: {
      de: "Förderverein Klingende Kirche Saarlouis-Lisdorf e.V.",
      en: "Klingende Kirche Association Saarlouis-Lisdorf e.V."
    } as TR,
    iban: "DE04 5935 0110 0074 3005 00",
    bic: "KRSADE55XXX"
  },
  foundedYear: 1993,
  members: 288,
  concertsSince1993: 240
};

export const NAV: { labelKey: string; href: string }[] = [
  { labelKey: "nav.start", href: "/" },
  { labelKey: "nav.termine", href: "/termine" },
  { labelKey: "nav.mitgliedschaft", href: "/mitgliedschaft" },
  { labelKey: "nav.orgel", href: "/orgel" },
  { labelKey: "nav.verein", href: "/verein" },
  { labelKey: "nav.partner", href: "/partner" },
  { labelKey: "nav.kontakt", href: "/kontakt" }
];

// EVENTS: jetzt vollständig in der events-Tabelle (siehe lib/tickets/queries.ts).
// EventCategory/Labels sind lokal in Komponenten gehalten.


export type NewsItem = {
  id: string;
  date: string;
  dateLabel: TR;
  category: TR;
  title: TR;
  excerpt: TR;
  body: TR[];
  image?: string;
};

export const NEWS: NewsItem[] = [
  {
    id: "spendenaktion-orgelerweiterung",
    date: "2026-11-02",
    dateLabel: { de: "02. November 2026", en: "2 November 2026" },
    category: { de: "Spendenaktion", en: "Fundraising" },
    title: {
      de: "Situationsbericht zur Spendenaktion „Erweiterung der Lisdorfer Orgel“",
      en: "Status report on the fundraising campaign “Expansion of the Lisdorf organ”"
    },
    excerpt: {
      de: "Endspurt bei der Finanzierung des neuen 32′-Registers. Ein Dank an alle, die bereits mitgetragen haben.",
      en: "Final stretch in financing the new 32′ stop. Thanks to everyone who has already supported us."
    },
    body: [
      {
        de: "Liebe Vereinsmitglieder, sehr verehrte Musikfreunde, sehr geehrte Damen und Herren,",
        en: "Dear members, dear friends of music, dear ladies and gentlemen,"
      },
      {
        de: "mit dem feierlichen Erklingen des neuen Gregoriusbass 32′-Registers ist ein lange getragener Wunsch des Fördervereins Wirklichkeit geworden. Der Dank gilt allen Spenderinnen und Spendern, die diese Erweiterung über die vergangenen Monate möglich gemacht haben.",
        en: "With the first sounding of the new Gregoriusbass 32′ stop, a long-held wish of the association has become reality. We thank every donor whose contribution over the past months made this expansion possible."
      },
      {
        de: "Für die abschließende Finanzierung bitten wir Sie weiterhin um Ihre Unterstützung. Jeder Beitrag, ob klein oder groß, hilft dabei, die Lisdorfer Orgel in ihrer neuen klanglichen Tiefe dauerhaft zu erhalten.",
        en: "For the final financing we continue to ask for your support. Every gift, small or large, helps preserve the Lisdorf organ in its new tonal depth for the long term."
      }
    ]
  },
  {
    id: "orgel-32-fuss-register",
    date: "2026-10-12",
    dateLabel: { de: "12. Oktober 2026", en: "12 October 2026" },
    category: { de: "Orgel", en: "Organ" },
    title: {
      de: "Förderverein erweitert Lisdorfer Orgel um 32′-Register",
      en: "Association expands the Lisdorf organ with a 32′ stop"
    },
    excerpt: {
      de: "Ein bleibendes Geschenk für die Lisdorfer Orgel: das neue Gregoriusbass-Register erschließt eine neue klangliche Dimension.",
      en: "A lasting gift for the Lisdorf organ: the new Gregoriusbass stop opens up a new tonal dimension."
    },
    body: [
      {
        de: "Der Förderverein Klingende Kirche Saarlouis-Lisdorf e.V. hat den Einbau eines 32-Fuß-Registers für die MAYER-Orgel der Lisdorfer Kirche beschlossen und umgesetzt.",
        en: "The Klingende Kirche Association Saarlouis-Lisdorf e.V. has decided upon and installed a 32-foot stop for the MAYER organ of the Lisdorf church."
      },
      {
        de: "Mit dieser bedeutenden Erweiterung erhält das Instrument ein neues Fundament im Bassbereich. Der tiefe Grundton trägt das gesamte Pleno und eröffnet neue Möglichkeiten für die Konzert- und Liturgiepraxis.",
        en: "With this important addition the instrument gains a new foundation in the bass. The deep fundamental tone carries the whole plenum and opens new possibilities for concert and liturgical use."
      },
      {
        de: "Die Weihe des Gregoriusbass 32′-Registers fand im Oktober 2026 in einem festlichen Konzert mit zahlreichen Gästen statt.",
        en: "The consecration of the Gregoriusbass 32′ stop took place in October 2026 in a festive concert with many guests."
      }
    ]
  },
  {
    id: "wir-suchen-sie",
    date: "2026-09-18",
    dateLabel: { de: "18. September 2026", en: "18 September 2026" },
    category: { de: "Mitmachen", en: "Get involved" },
    title: { de: "Wir suchen SIE …", en: "We are looking for YOU …" },
    excerpt: {
      de: "Freundinnen und Freunde der Kirchenmusik gesucht: unterstützen Sie den Förderverein als Mitglied oder ehrenamtlich.",
      en: "Friends of sacred music wanted: support the association as a member or volunteer."
    },
    body: [
      {
        de: "Der Förderverein Klingende Kirche Saarlouis-Lisdorf e.V. lebt vom ehrenamtlichen Engagement seiner Mitglieder.",
        en: "The Klingende Kirche Association Saarlouis-Lisdorf e.V. thrives on the voluntary commitment of its members."
      },
      {
        de: "Wir suchen Menschen, die unsere Konzerte, die Orgelakademie und den Kompositionswettbewerb mittragen möchten. Ob als Mitglied, als Helferin bei Konzerten oder als Freundin im Hintergrund: jede Unterstützung zählt.",
        en: "We are looking for people who wish to support our concerts, the organ academy and the composition competition. As a member, as a helper at concerts or as a friend behind the scenes: every bit of support counts."
      },
      {
        de: "Sprechen Sie uns an. Wir freuen uns auf Ihre Nachricht.",
        en: "Please get in touch. We look forward to hearing from you."
      }
    ]
  }
];

export type GalleryItem = {
  id: string;
  date: string;
  dateLabel: TR;
  title: TR;
  subtitle: TR;
  excerpt: TR;
  cover: string;
};

export const GALLERIES: GalleryItem[] = [
  {
    id: "grundschulkinder-orgeltage",
    date: "2026-10-22",
    dateLabel: { de: "22. Oktober 2026", en: "22 October 2026" },
    title: {
      de: "Über 500 Grundschulkinder zu Gast in der Lisdorfer Kirche",
      en: "Over 500 primary school children visit the Lisdorf church"
    },
    subtitle: {
      de: "Musikgeschichte zum Staunen bei den Saarlouiser Orgeltagen",
      en: "Music history to marvel at during the Saarlouis Organ Days"
    },
    excerpt: {
      de: "Was für eine beeindruckende Begegnung. Über 500 Grundschülerinnen und Grundschüler kamen bei den Saarlouiser Orgeltagen in die Lisdorfer Kirche, um Johann Sebastian Bach, einen der größten Komponisten der Musikgeschichte, zu entdecken.",
      en: "What an impressive gathering. More than 500 primary school children came to the Lisdorf church during the Saarlouis Organ Days to discover Johann Sebastian Bach, one of the greatest composers in history."
    },
    cover:
      "https://images.unsplash.com/photo-1619285732886-fbee05fbb1d4?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "wayne-marshall-eroeffnung",
    date: "2026-10-18",
    dateLabel: { de: "18. Oktober 2026", en: "18 October 2026" },
    title: {
      de: "Fulminante Eröffnung der 11. Saarlouiser Orgeltage",
      en: "Brilliant opening of the 11th Saarlouis Organ Days"
    },
    subtitle: {
      de: "Weltstar Wayne Marshall an der MAYER-Orgel",
      en: "Wayne Marshall at the MAYER organ"
    },
    excerpt: {
      de: "Ein unvergesslicher Abend: Wayne Marshall eröffnete die 11. Saarlouiser Orgeltage mit einem atemberaubenden Programm aus Klassik und Improvisation.",
      en: "An unforgettable evening: Wayne Marshall opened the 11th Saarlouis Organ Days with a breathtaking programme of classical repertoire and improvisation."
    },
    cover:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "gregoriusbass-premiere",
    date: "2026-10-11",
    dateLabel: { de: "11. Oktober 2026", en: "11 October 2026" },
    title: {
      de: "Klangvolle Premiere des Gregoriusbass-Registers",
      en: "Resounding premiere of the Gregoriusbass stop"
    },
    subtitle: {
      de: "Historischer Moment für die Kirchenmusik in der Region",
      en: "A historic moment for sacred music in the region"
    },
    excerpt: {
      de: "Am Sonntag, dem 11. Oktober 2026, kamen zahlreiche Besucher in die Lisdorfer Kirche, um einem festlichen Konzert anlässlich der Einweihung einer monumentalen Orgelregister-Erweiterung beizuwohnen.",
      en: "On Sunday, 11 October 2026, many visitors came to the Lisdorf church to attend a festive concert for the inauguration of a monumental organ expansion."
    },
    cover:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1400&q=60"
  },
  {
    id: "weihe-gregoriusbass",
    date: "2026-10-10",
    dateLabel: { de: "10. Oktober 2026", en: "10 October 2026" },
    title: {
      de: "Festliche Weihe des Gregoriusbass 32′-Registers",
      en: "Festive consecration of the Gregoriusbass 32′ stop"
    },
    subtitle: {
      de: "Ein neues Klangelement für die Lisdorfer Orgel",
      en: "A new sonic element for the Lisdorf organ"
    },
    excerpt: {
      de: "Ein feierlicher Gottesdienst und ein anschließendes Konzert markierten die Weihe des neuen 32-Fuß-Registers. Die Resonanz der Besucher war außergewöhnlich.",
      en: "A solemn service and a subsequent concert marked the consecration of the new 32-foot stop. The response from visitors was outstanding."
    },
    cover:
      "https://images.unsplash.com/photo-1465225314224-587cd83d322b?auto=format&fit=crop&w=1400&q=60"
  }
];

export type PartnerLogo = {
  name: TR;
  logo: string;
  note?: TR;
  href?: string;
};

export const PARTNERS: PartnerLogo[] = [
  {
    name: { de: "Landkreis Saarlouis", en: "District of Saarlouis" },
    logo: "/images/partners/01-landkreis-saarlouis.png"
  },
  {
    name: { de: "Kreisstadt Saarlouis", en: "City of Saarlouis" },
    logo: "/images/partners/02-kreisstadt-saarlouis.jpg"
  },
  {
    name: {
      de: "Stadtverband der kulturellen Vereine Saarlouis e.V.",
      en: "Association of cultural societies Saarlouis e.V."
    },
    logo: "/images/partners/03-stadtverband-kulturelle-vereine.jpg"
  },
  {
    name: {
      de: "Katholische Kirchengemeinde Saarlouis",
      en: "Catholic parish of Saarlouis"
    },
    logo: "/images/partners/04-katholische-kirchengemeinde-saarlouis.jpg"
  },
  {
    name: {
      de: "Gesellschaft für Bildung und Kultur im Landkreis Saarlouis mbH",
      en: "Society for Education and Culture in the Saarlouis district"
    },
    logo: "/images/partners/05-gesellschaft-bildung-kultur.jpg"
  },
  {
    name: {
      de: "Kreismusikschule Saarlouis",
      en: "District Music School Saarlouis"
    },
    logo: "/images/partners/06-kreismusikschule-saarlouis.jpg"
  },
  {
    name: { de: "Musikfestspiele Saar", en: "Saar Music Festival" },
    logo: "/images/partners/07-musikfestspiele-saar.jpg"
  },
  {
    name: { de: "Hugo Mayer Orgelbau GmbH", en: "Hugo Mayer Organ Building" },
    logo: "/images/partners/08-hugo-mayer-orgelbau.jpg",
    note: {
      de: "Orgelbaumeister des Lisdorfer Instruments",
      en: "Master builder of the Lisdorf instrument"
    }
  },
  {
    name: { de: "Bistum Trier", en: "Diocese of Trier" },
    logo: "/images/partners/09-bistum-trier.jpg"
  }
];

export const BOARD: { role: TR; name: string }[] = [
  { role: { de: "1. Vorsitzender", en: "Chairman" }, name: "Manfred Boßmann" },
  { role: { de: "2. Vorsitzender", en: "Vice Chairman" }, name: "N.N." },
  { role: { de: "Geschäftsführer", en: "Managing Director" }, name: "N.N." },
  { role: { de: "Schatzmeisterin", en: "Treasurer" }, name: "N.N." },
  {
    role: { de: "Künstlerische Leitung", en: "Artistic Direction" },
    name: "Regionalkantor Markus Schaubel"
  },
  { role: { de: "Schriftführer", en: "Secretary" }, name: "N.N." }
];

export const ORGAN_FACTS: { label: TR; value: TR }[] = [
  {
    label: { de: "Orgelbauer", en: "Builder" },
    value: {
      de: "Hugo Mayer Orgelbau, Heusweiler / Saar",
      en: "Hugo Mayer Orgelbau, Heusweiler / Saar"
    }
  },
  {
    label: { de: "Neubau", en: "New build" },
    value: { de: "1987", en: "1987" }
  },
  {
    label: { de: "Register", en: "Stops" },
    value: { de: "45", en: "45" }
  },
  {
    label: { de: "Traktur", en: "Action" },
    value: { de: "mechanische Holztraktur", en: "mechanical wooden action" }
  },
  {
    label: { de: "Orgelweihe", en: "Consecration" },
    value: { de: "25. Oktober 1987", en: "25 October 1987" }
  },
  {
    label: { de: "Prospekt-Schnitzwerk", en: "Case carvings" },
    value: {
      de: "Martin Mrziglod, Tholey / Saar (vollendet 1992)",
      en: "Martin Mrziglod, Tholey / Saar (completed 1992)"
    }
  }
];

export type OrgelInfoItem = {
  slug: string;
  title: TR;
  year?: TR;
};

export const ORGEL_HISTORY: OrgelInfoItem[] = [
  {
    slug: "stumm-1861",
    title: { de: "Die Stumm-Orgel", en: "The Stumm organ" },
    year: { de: "1861", en: "1861" }
  },
  {
    slug: "stumm-erweiterung-1905",
    title: {
      de: "Erweiterung der Stumm-Orgel",
      en: "Expansion of the Stumm organ"
    },
    year: { de: "1905", en: "1905" }
  },
  {
    slug: "haerpfer-1944",
    title: { de: "Die Haerpfer-Orgel", en: "The Haerpfer organ" },
    year: { de: "1944", en: "1944" }
  },
  {
    slug: "mayer-1987",
    title: { de: "Die MAYER-Orgel", en: "The MAYER organ" },
    year: { de: "1987", en: "1987" }
  },
  {
    slug: "organisten-1987-2017",
    title: {
      de: "Organisten an der Lisdorfer MAYER-Orgel",
      en: "Organists at the Lisdorf MAYER organ"
    },
    year: { de: "1987 bis 2017", en: "1987 to 2017" }
  },
  {
    slug: "organisten-2018-2025",
    title: {
      de: "Organisten an der Lisdorfer MAYER-Orgel",
      en: "Organists at the Lisdorf MAYER organ"
    },
    year: { de: "2018 bis 2025", en: "2018 to 2025" }
  }
];

export const ORGEL_GALLERY: { caption: TR }[] = [
  { caption: { de: "Skizze MAYER-Orgel 1987", en: "Sketch MAYER organ 1987" } },
  {
    caption: { de: "Intonateur Patrick Akroud", en: "Voicer Patrick Akroud" }
  },
  {
    caption: {
      de: "Orgelweihe am 25.10.1987",
      en: "Consecration on 25 October 1987"
    }
  },
  {
    caption: { de: "MAYER-Orgel erbaut 1987", en: "MAYER organ built in 1987" }
  },
  { caption: { de: "Spieltisch", en: "Console" } },
  { caption: { de: "Blick zur Orgel", en: "View towards the organ" } }
];

export const NEW_MEMBERS_2026: string[] = [
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

export const DECEASED_MEMBERS_2026: string[] = [
  "Burkhardt Pracht, Saarlouis-Lisdorf",
  "Dorothea Comtesse, Saarlouis",
  "Rita Wagner, Saarlouis-Lisdorf"
];
