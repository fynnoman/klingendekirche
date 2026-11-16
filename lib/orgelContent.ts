import type { TR } from "./i18n";

export type LString = string | TR;

export type DispositionGroup = {
  heading: LString;
  stops: LString[];
};

export type OrgelSection = {
  eyebrow?: LString;
  title: LString;
  defaultOpen?: boolean;
  paragraphs?: LString[];
  quote?: LString;
  disposition?: DispositionGroup[];
  listing?: { date: string; lines: LString[] }[];
  footnote?: LString;
};

export type KeyFact = { label: LString; value: LString };

export type OrgelChapter = {
  lead?: LString;
  era?: LString;
  heroYear?: string;
  keyFacts?: KeyFact[];
  sections: OrgelSection[];
};

const ERA_HISTORY: TR = { de: "Lisdorfer Orgelgeschichte", en: "Lisdorf organ history" };
const ERA_ORGANISTS: TR = {
  de: "Organisten an der MAYER-Orgel",
  en: "Organists at the MAYER organ"
};

export const ORGEL_CONTENT: Record<string, OrgelChapter> = {
  "stumm-1861": {
    lead: {
      de: "Die erste Orgel der Lisdorfer Pfarrkirche wurde 1861 aus Wallerfangen erworben. Ein Werk aus der Werkstatt der Gebrüder Stumm, einer der berühmtesten Orgelbauerdynastien Deutschlands.",
      en: "The first organ of the Lisdorf parish church was acquired from Wallerfangen in 1861. A work from the Stumm brothers’ workshop, one of the most famous organ-building dynasties in Germany."
    },
    era: ERA_HISTORY,
    heroYear: "1861",
    keyFacts: [
      {
        label: { de: "Orgelbauer", en: "Builder" },
        value: { de: "Gebr. Stumm, Rhaunen-Sulzbach", en: "Stumm brothers, Rhaunen-Sulzbach" }
      },
      {
        label: { de: "Baujahr", en: "Year built" },
        value: { de: "1841 (Wallerfangen)", en: "1841 (Wallerfangen)" }
      },
      {
        label: { de: "Register", en: "Stops" },
        value: { de: "12", en: "12" }
      },
      {
        label: { de: "Kaufpreis", en: "Purchase price" },
        value: { de: "450 Thaler", en: "450 thalers" }
      },
      {
        label: { de: "Aufbau in Lisdorf", en: "Installation in Lisdorf" },
        value: {
          de: "Johann Schlaad, Waldlaubersheim",
          en: "Johann Schlaad, Waldlaubersheim"
        }
      },
      {
        label: { de: "Erster Organist", en: "First organist" },
        value: {
          de: "Hauptlehrer Michael Ritter (ab 1862)",
          en: "Headmaster Michael Ritter (from 1862)"
        }
      }
    ],
    sections: [
      {
        eyebrow: { de: "Herkunft", en: "Origin" },
        title: {
          de: "Aus Wallerfangen nach Lisdorf",
          en: "From Wallerfangen to Lisdorf"
        },
        defaultOpen: true,
        paragraphs: [
          {
            de: "In den Archiven der Lisdorfer Kirchengemeinde und des Bistums Trier ist belegt, dass im Jahre 1861, also fast 100 Jahre nach dem Neubau der Lisdorfer Kirche, eine Orgel von der Kirchengemeinde Wallerfangen erworben wurde, die diese im Jahre 1841 bei der bekannten Orgelwerkstatt der Gebr. Stumm in Auftrag gegeben hatte.",
            en: "The archives of the Lisdorf parish and the diocese of Trier document that in 1861, almost 100 years after the construction of the Lisdorf church, an organ was purchased from the parish of Wallerfangen, which had commissioned it from the renowned Stumm brothers’ workshop in 1841."
          },
          {
            de: "Durch den Neubau der Wallerfanger Pfarrkirche musste im Jahre 1861 die alte Kirche abgerissen werden. Laut einem Bericht im Pfarrbrief der Pfarrgemeinde bestand keine Möglichkeit, die Orgel für den Zeitraum des Neubaus zu lagern. Zudem „sei die Orgel für die neue Kirche zu klein“.",
            en: "The construction of a new Wallerfangen parish church in 1861 required the demolition of the old church. According to a report in the parish newsletter, there was no possibility of storing the organ during the construction period. Moreover, “the organ was too small for the new church”."
          },
          {
            de: "Es war der Lisdorfer Pfarrer Gotthard Prinz, der in diesem Zeitraum dringend für die Lisdorfer Kirche ein passendes Orgelwerk suchte. Ein Glücksfall für Lisdorf, dass die Stumm-Orgel aus Wallerfangen zur Disposition stand. Mit dem dortigen Pfarrer Josef Schmitt verhandelte er den Kauf der inzwischen 18 Jahre alten Orgel. Der Kaufpreis in Höhe von 450 Thaler wurde laut nachstehender Empfangsbestätigung in bar entrichtet.",
            en: "The Lisdorf pastor Gotthard Prinz was at that time urgently looking for a suitable organ for the Lisdorf church. A stroke of luck for Lisdorf that the Stumm organ from Wallerfangen became available. He negotiated with the Wallerfangen pastor Josef Schmitt the purchase of the by then 18-year-old organ. The purchase price of 450 thalers was paid in cash, according to the receipt below."
          }
        ]
      },
      {
        eyebrow: { de: "Die Orgelbauerdynastie", en: "The organ building dynasty" },
        title: { de: "Die Familie Stumm", en: "The Stumm family" },
        paragraphs: [
          {
            de: "Die Familie Stumm gehört zu den berühmtesten Orgelbauerdynastien Deutschlands. In sieben Generationen sind nach heutigem Forschungsstand über 370 Orgeln (davon 140 größtenteils bis heute erhalten) errichtet worden. Die Familie stammte aus Rhaunen-Sulzbach im Hunsrück. Von dort aus prägte sie über einen Zeitraum von fast zwei Jahrhunderten nachhaltig den mittelrheinischen Orgelbau. Konzentrierte sich das Wirkungsgebiet anfänglich auf den Hunsrück, reichte es schließlich vom Kölner Raum bis Saarbrücken, von Luxemburg bis in den Odenwald.",
            en: "The Stumm family is among the most famous organ building dynasties in Germany. Over seven generations, according to current research, more than 370 organs were built, of which about 140 are largely preserved today. The family came from Rhaunen-Sulzbach in the Hunsrück region. From there, over almost two centuries, they decisively shaped organ building in the middle Rhine area. Their region, initially focused on the Hunsrück, eventually reached from the Cologne area to Saarbrücken, from Luxembourg to the Odenwald."
          },
          {
            de: "Zum Zeitpunkt des Wallerfanger Orgelbaus wurde das Familienunternehmen in 4. Generation von Carl Stumm (Sohn von Philipp) und Franz Heinrich Stumm (Sohn von Friedrich Carl) geleitet.",
            en: "At the time of the Wallerfangen organ project the family business was led in the fourth generation by Carl Stumm (son of Philipp) and Franz Heinrich Stumm (son of Friedrich Carl)."
          },
          {
            de: "Die am 13.12.1840 erstellte Orgeldisposition umfasste 12 Register. Der Aufbau erfolgte im Jahre 1843. Der Kaufpreis betrug 760 Thaler.",
            en: "The organ specification of 13 December 1840 comprised 12 stops. The organ was installed in 1843. The purchase price was 760 thalers."
          }
        ]
      },
      {
        eyebrow: { de: "Pfarrer Gotthard Prinz", en: "Pastor Gotthard Prinz" },
        title: {
          de: "Der Lisdorfer Seelsorger",
          en: "The Lisdorf pastor"
        },
        paragraphs: [
          {
            de: "Pfarrer Gotthard Prinz wurde am 30. Dezember 1826 in St. Matthias bei Trier geboren. Nach der Priesterweihe im Jahre 1851 wirkte er als Kaplan in Vallendar und in Saarlouis. Seine erste Pfarrstelle erhielt er 1855 in Kastellaun, bevor er 1860 als Pfarrer der Kirchengemeinde Lisdorf-Ensdorf berufen wurde.",
            en: "Pastor Gotthard Prinz was born on 30 December 1826 in St. Matthias near Trier. After his ordination in 1851 he served as curate in Vallendar and Saarlouis. He received his first parish in 1855 in Kastellaun, before being appointed in 1860 as pastor of the parish of Lisdorf-Ensdorf."
          },
          {
            de: "Pfarrer Prinz war mit ganzem Herzen Priester. Die Zierde und Ausschmückung der ihm anvertrauten Gotteshäuser war für ihn eine Selbstverständlichkeit und bereitete ihm eine große Freude. So war es für ihn für die festliche Untermalung der Gottesdienste unerlässlich, den Kirchenraum möglichst bald, anstelle eines Harmoniums, mit einer Orgel auszustatten.",
            en: "Pastor Prinz was a priest with his whole heart. Adorning the churches entrusted to him was a matter of course for him and brought him great joy. For the festive accompaniment of services, it was essential for him to equip the church as soon as possible with an organ rather than a harmonium."
          },
          {
            de: "Pfarrer Gotthard Prinz wurde im Jahre 1869 nach neunjährigem segensreichem Wirken in Lisdorf die Pfarrstelle in Ehrang übertragen. 1887 wurde er zum Direktor des Emeritenhauses ernannt. Er starb nach mehrjähriger Krankheit am 2. Februar 1893.",
            en: "In 1869, after nine years of fruitful ministry in Lisdorf, Pastor Prinz was transferred to the parish of Ehrang. In 1887 he was appointed director of the Emeritenhaus. After several years of illness he died on 2 February 1893."
          }
        ]
      },
      {
        eyebrow: { de: "Aufbau 1861", en: "Installation 1861" },
        title: {
          de: "Johann Schlaad aus Waldlaubersheim",
          en: "Johann Schlaad from Waldlaubersheim"
        },
        paragraphs: [
          {
            de: "Am 16. März 1861 vereinbarte Pfarrer Gotthard Prinz mit dem Orgelbaumeister Johann Schlaad durch die Zahlung von 150 Thaler den ersten Lisdorfer Orgelaufbau. Die Orgelbaufirma stammte aus Waldlaubersheim am Mittelrhein. Das damalige Einzugsgebiet des angesehenen Unternehmens ist in etwa mit dem heutigen Gebiet von Rheinland-Pfalz und dem Saarland vergleichbar.",
            en: "On 16 March 1861 Pastor Prinz agreed with the organ builder Johann Schlaad, on payment of 150 thalers, on the first Lisdorf installation. The firm came from Waldlaubersheim on the middle Rhine. Its catchment area at that time roughly corresponded to today’s Rhineland-Palatinate and the Saarland."
          },
          {
            de: "Dem Firmenchef Johann Schlaad werden 76 Orgelneubauten zugeschrieben, unter anderem in Merzig, Schwalbach, Beckingen und Differten. Allein zwischen 1860 und 1870 entstanden 20 neue Orgelwerke. Durch die solide Bauweise der Orgeln und die Qualität der verwendeten Materialien sind bis heute noch 40 Werke des Orgelbauers erhalten. Orgelbaumeister Schlaad, an den noch ein Gedenkstein in Waldlaubersheim erinnert, starb 1892 im Alter von 70 Jahren.",
            en: "Johann Schlaad is credited with 76 new organs, including in Merzig, Schwalbach, Beckingen and Differten. Between 1860 and 1870 alone, 20 new instruments were built. Thanks to the solid construction and the quality of the materials used, 40 of his works survive today. Master organ builder Schlaad, remembered by a commemorative stone in Waldlaubersheim, died in 1892 at the age of 70."
          }
        ]
      },
      {
        eyebrow: { de: "Chorarbeit", en: "Choral work" },
        title: {
          de: "Der Männergesangverein und Michael Ritter",
          en: "The men’s choir and Michael Ritter"
        },
        paragraphs: [
          {
            de: "Zwei Jahre vor dem ersten Lisdorfer Orgelbau wurde im Jahre 1859 der Männergesangverein Lisdorf gegründet. In der Vereinschronik ist festgehalten, dass „als Geschenk von Pastor Gotthard Prinz im Jahre 1861 eine Kirchenorgel für Lisdorf beschaffen wurde“.",
            en: "Two years before the first Lisdorf organ installation, in 1859, the men’s choir of Lisdorf was founded. The chronicle of the choir records that “as a gift from Pastor Gotthard Prinz, a church organ was procured for Lisdorf in 1861”."
          },
          {
            de: "Dirigent und Mitbegründer des Männergesangverein war Hauptlehrer Michael Ritter, der seit 1858 in Lisdorf tätig war. Weiter ist aus der Chronik zu erfahren, dass im Jahre 1862 Lehrer Ritter von Pfarrer Prinz die Organistenstelle angeboten wurde. Durch Verfügung der Königlichen Regierung zu Trier wurde Michael Ritter offiziell das Amt des Organisten und Chordirigenten übertragen, welches er bis zum Jahre 1885 ausübte.",
            en: "The conductor and co-founder of the men’s choir was headmaster Michael Ritter, who had been teaching in Lisdorf since 1858. The chronicle also reports that in 1862 Pastor Prinz offered Ritter the position of organist. By decree of the Royal Government in Trier, Ritter was officially entrusted with the office of organist and choirmaster, which he held until 1885."
          },
          {
            de: "Durch diese Doppelfunktion des Chorleiters übernahmen der Männergesangverein und der Knabenchor des Vereins ab diesem Zeitpunkt auch die Funktion eines Kirchenchores.",
            en: "Through this dual role of the choirmaster, from that point on the men’s choir and its boys’ choir also acted as the parish choir."
          }
        ]
      }
    ]
  },

  "stumm-erweiterung-1905": {
    lead: {
      de: "Nach 43 Jahren Dienst wurde die Stumm-Orgel 1905 durch die renommierte Orgelbauanstalt Dalstein & Haerpfer aus Bolchen in Lothringen umgebaut und zu einem Werk mit 15 Registern auf zwei Manualen und Pedalwerk erweitert.",
    en: "After 43 years of service, in 1905 the Stumm organ was rebuilt by the renowned firm Dalstein & Haerpfer of Bolchen in Lorraine and expanded to an instrument with 15 stops over two manuals and pedal."
    },
    era: ERA_HISTORY,
    heroYear: "1905",
    keyFacts: [
      {
        label: { de: "Orgelbauer", en: "Builder" },
        value: {
          de: "Dalstein & Haerpfer, Bolchen (Lothringen)",
          en: "Dalstein & Haerpfer, Bolchen (Lorraine)"
        }
      },
      {
        label: { de: "Auftrag", en: "Commission" },
        value: { de: "Umbau und Erweiterung", en: "Rebuild and expansion" }
      },
      {
        label: { de: "Register", en: "Stops" },
        value: {
          de: "15 · zwei Manuale und Pedal",
          en: "15 · two manuals and pedal"
        }
      },
      {
        label: { de: "Gesamtkosten", en: "Total cost" },
        value: { de: "5.135 Mark", en: "5,135 marks" }
      },
      {
        label: { de: "Pfarrer", en: "Pastors" },
        value: {
          de: "Karl Wehn, Nikolaus Höffling, Josef Spengler",
          en: "Karl Wehn, Nikolaus Höffling, Josef Spengler"
        }
      },
      {
        label: { de: "Besonderheit", en: "Noteworthy" },
        value: {
          de: "1917 Prospektpfeifen militärisch beschlagnahmt",
          en: "In 1917 the façade pipes were requisitioned by the military"
        }
      }
    ],
    sections: [
      {
        eyebrow: { de: "Nachfolge", en: "Succession" },
        title: {
          de: "Pfarrer Karl Wehn und die Entscheidung zum Umbau",
          en: "Pastor Karl Wehn and the decision to rebuild"
        },
        defaultOpen: true,
        paragraphs: [
          {
            de: "Nachfolger von Pfarrer Gotthard Prinz wurde Pfarrer Karl Wehn, der sodann 37 Jahre lang die Geschicke der Pfarrgemeinde leitete. Pfarrer Wehn war es mit den Entscheidungsgremien der Kirchengemeinde vorbehalten, für den Umbau und die Erweiterung des im Jahre 1861 erworbenen und in die Jahre gekommenen Orgelinstrumentes zu sorgen.",
            en: "Pastor Karl Wehn succeeded Pastor Prinz and then led the fortunes of the parish for 37 years. It fell to him, together with the parish bodies, to arrange the rebuild and expansion of the organ acquired in 1861, which by then had aged."
          },
          {
            de: "43 Jahre lang hatte das von der Pfarrgemeinde Wallerfangen erworbene Instrument der Lisdorfer Kirchengemeinde treue Dienste geleistet.",
            en: "For 43 years the instrument acquired from the Wallerfangen parish had served the Lisdorf community faithfully."
          }
        ]
      },
      {
        eyebrow: { de: "Dalstein & Haerpfer", en: "Dalstein & Haerpfer" },
        title: {
          de: "Der Auftrag an die Orgelbauanstalt in Bolchen",
          en: "The commission to the Bolchen organ workshop"
        },
        paragraphs: [
          {
            de: "Die Orgelbauanstalt Dalstein & Haerpfer aus Bolchen (Lothringen) erhielt im Jahre 1904 den Auftrag zur Ausführung. Das Gebiet Lothringen mit seiner mehrheitlich deutschsprachigen Bevölkerung gehörte zu diesem Zeitpunkt zum Deutschen Reich.",
            en: "The organ workshop Dalstein & Haerpfer of Bolchen (Lorraine) received the commission in 1904. Lorraine, with its largely German-speaking population, at that time belonged to the German Empire."
          },
          {
            de: "Die Orgelmanufacture wurde 1863 durch Johann Karl Haerpfer und Nicolas-Etienne Dalstein gegründet. Haerpfer erlernte bei der Firma Steinmeyer den Beruf des Orgelbauers und arbeitete danach bei den Firmen Walcker in Ludwigsburg und Haas in Luzern. Dalstein war bei der angesehenen Firma Cavaillé-Coll in Paris beschäftigt.",
            en: "The firm was founded in 1863 by Johann Karl Haerpfer and Nicolas-Etienne Dalstein. Haerpfer trained as an organ builder at Steinmeyer and then worked for Walcker in Ludwigsburg and Haas in Lucerne. Dalstein had been employed at the renowned Cavaillé-Coll workshop in Paris."
          },
          {
            de: "Zum Zeitpunkt der Lisdorfer Auftragserteilung bestand die Firma Dalstein & Haerpfer schon über 40 Jahre und war als eines der gefragtesten Orgelbauunternehmen der damaligen Zeit hoch angesehen. Laut Firmenangaben wurden in diesem Zeitraum 175 Orgelwerke in ihrer Werkstatt gebaut und ausgeliefert, darunter große Orgelneubauten in Nancy, Luxemburg, Mühlhausen, Forbach und Metz.",
            en: "By the time of the Lisdorf commission, Dalstein & Haerpfer had existed for more than 40 years and was highly regarded as one of the most sought-after organ builders of the period. According to their own records, 175 instruments had been built and delivered by that time, including major new organs in Nancy, Luxembourg, Mulhouse, Forbach and Metz."
          },
          {
            de: "Der Auftrag beinhaltete den Umbau und die Erweiterung der vorhandenen Stumm-Orgel unter Verwendung der noch brauchbaren Teile zu einem 15 Register umfassenden Instrument auf 2 Manualen und einem Pedalwerk.",
            en: "The commission involved rebuilding and expanding the existing Stumm organ, using still usable parts, into an instrument of 15 stops on two manuals and a pedal division."
          },
          {
            de: "Entsprechend des Dispositions- und Kostenanschlags vom 31. Oktober 1904 und dem Nachtrag vom 30. Juni 1905, der auch die Neuanschaffung eines Orgelgehäuses beinhaltete, betrugen die Gesamtkosten des Umbaus und der Erweiterung 5.135 Mark.",
            en: "According to the specification and cost estimate of 31 October 1904 and the supplement of 30 June 1905, which also included a new organ case, the total cost of the rebuild and expansion was 5,135 marks."
          }
        ]
      },
      {
        eyebrow: { de: "Erster Weltkrieg", en: "First World War" },
        title: {
          de: "Beschlagnahme der Prospektpfeifen 1917",
          en: "Requisition of the façade pipes in 1917"
        },
        paragraphs: [
          {
            de: "Die Amtszeit von Pfarrer Karl Wehn endete 1906. Ihm folgte Pfarrer Nikolaus Höffling, der bis 1915 der Pfarrgemeinde vorstand und schließlich von Pfarrer Joseph Spengler in der seelsorgerisch schwierigen Zeit des 1. Weltkrieges abgelöst wurde.",
            en: "Pastor Wehn’s tenure ended in 1906. He was succeeded by Pastor Nikolaus Höffling, who led the parish until 1915 and was then replaced by Pastor Josef Spengler during the pastorally difficult period of the First World War."
          },
          {
            de: "Aus einem von ihm erstellten handschriftlichen Vermerk vom 1. April 1917 ist zu ersehen, warum Kriegszeiten auch für Orgelpfeifen keine guten Zeiten waren. Das Material von Orgelpfeifen wurde für Kriegszwecke benötigt und so wurden auch die Lisdorfer Prospektpfeifen beschlagnahmt.",
            en: "A handwritten note of 1 April 1917 by Pastor Spengler shows that wartime was no good time for organ pipes either. The metal of organ pipes was needed for war production, and so the Lisdorf façade pipes were requisitioned too."
          }
        ],
        quote: {
          de: "Am 28. März 1917 wurden durch die Orgelbauanstalt Dalstein & Haerpfer, Bolchen (Lothringen) infolge militärischer Beschlagnahme die Prospektpfeifen der Kirchenorgel (Prinzipal 8 und Octave 4) ausgebaut (dafür 34 M ausgezahlt) und an das Lager der Sammelstelle der Orgelbauanstalt Firma Hock, Saarlouis eingeliefert. Das Gewicht der Pfeifen betrug 61,5 kg; ihr Einheitspreis 6,30 M, ausbezahlt 387,45 M. Feste einmalige Vergütung 35 M, also Gesamtbetrag 422,45 M, welche an Kreissparkasse Saarlouis unter Sparkassenbuch Sammelfonds angelegt wurde.",
          en: "On 28 March 1917 the façade pipes of the church organ (Principal 8′ and Octave 4′) were removed by the firm Dalstein & Haerpfer, Bolchen (Lorraine), due to military requisition (34 M were paid for the dismantling) and delivered to the collection point of the Hock firm in Saarlouis. The pipes weighed 61.5 kg; their unit price 6.30 M, paid out 387.45 M. A one-off fixed compensation of 35 M brought the total to 422.45 M, which was deposited with the Kreissparkasse Saarlouis under the Sammelfonds savings book."
        }
      },
      {
        eyebrow: { de: "Pfarrer Josef Spengler", en: "Pastor Josef Spengler" },
        title: {
          de: "Engagement und Ehrenbürgerschaft",
          en: "Commitment and honorary citizenship"
        },
        paragraphs: [
          {
            de: "Pfarrer Josef Spengler war ein engagierter Priester. 1880 in Wüschheim / Hunsrück geboren, empfing er 1903 die Priesterweihe. Nach seiner Kaplanszeit in Wehrden / Saar wurde er zum Pfarrer von Lieg im Kreis Cochem ernannt. Von 1915 bis 1954 war er Pfarrer und Dechant in Saarlouis-Lisdorf.",
            en: "Pastor Josef Spengler was a dedicated priest. Born in 1880 in Wüschheim in the Hunsrück, he was ordained in 1903. After his time as curate in Wehrden / Saar, he was appointed pastor of Lieg in the Cochem district. From 1915 to 1954 he was pastor and dean in Saarlouis-Lisdorf."
          },
          {
            de: "Aufgrund seiner großen Verdienste wurde ihm die Ehrenbürgerschaft der Stadt Saarlouis verliehen.",
            en: "For his great merits he was awarded honorary citizenship of the city of Saarlouis."
          }
        ]
      },
      {
        eyebrow: { de: "Disposition 1905", en: "Specification 1905" },
        title: {
          de: "Register der Dalstein & Haerpfer-Orgel",
          en: "Stops of the Dalstein & Haerpfer organ"
        },
        disposition: [
          {
            heading: { de: "I. Manual", en: "Great" },
            stops: [
              "1. Principal 8′",
              { de: "2. Bourdon 16′ (neu)", en: "2. Bourdon 16′ (new)" },
              "3. Flöte 8′",
              { de: "4. Salicional 8′ (neu)", en: "4. Salicional 8′ (new)" },
              "5. Rohrflöte 4′",
              "6. Octave 4′",
              "7. Octave 2′"
            ]
          },
          {
            heading: { de: "II. Manual", en: "Second manual" },
            stops: [
              "8. Viola di Gamba 8′",
              { de: "9. Vox-Coelestis 8′ (neu)", en: "9. Vox-Coelestis 8′ (new)" },
              "10. Lieblich Gedeckt 8′",
              "11. Traversflöte 4′",
              "12. Trompete 8′"
            ]
          },
          {
            heading: { de: "Pedal", en: "Pedal" },
            stops: ["13. Subbass 16′", "14. Octavbass 8′", "15. Violonbass 8′"]
          }
        ]
      }
    ]
  },

  "haerpfer-1944": {
    lead: {
      de: "Im Zweiten Weltkrieg entschied sich die Gemeinde für einen Neubau durch die Firma Fritz Haerpfer aus Bolchen. Die Orgel mit 31 klingenden und 2 transmittierten Stimmen wurde am 6. Februar 1944 geweiht.",
      en: "During the Second World War the parish decided on a new instrument by Fritz Haerpfer of Bolchen. The organ, with 31 speaking stops and 2 transmitted voices, was consecrated on 6 February 1944."
    },
    era: ERA_HISTORY,
    heroYear: "1944",
    keyFacts: [
      {
        label: { de: "Orgelbauer", en: "Builder" },
        value: {
          de: "Fritz Haerpfer, Bolchen (Lothringen)",
          en: "Fritz Haerpfer, Bolchen (Lorraine)"
        }
      },
      {
        label: { de: "Beschluss", en: "Decision" },
        value: { de: "21. Dezember 1941", en: "21 December 1941" }
      },
      {
        label: { de: "Register", en: "Stops" },
        value: {
          de: "31 klingend, 2 transmittiert",
          en: "31 speaking, 2 transmitted"
        }
      },
      {
        label: { de: "Kosten", en: "Cost" },
        value: { de: "20.177,14 Reichsmark", en: "20,177.14 Reichsmark" }
      },
      {
        label: { de: "Orgelweihe", en: "Consecration" },
        value: { de: "6. Februar 1944", en: "6 February 1944" }
      },
      {
        label: { de: "Renovierung", en: "Renovation" },
        value: {
          de: "1962 durch Hugo Mayer, Heusweiler",
          en: "1962 by Hugo Mayer, Heusweiler"
        }
      }
    ],
    sections: [
      {
        eyebrow: { de: "Beschluss 1941", en: "Resolution 1941" },
        title: {
          de: "Der Auftrag an Fritz Haerpfer",
          en: "The commission to Fritz Haerpfer"
        },
        defaultOpen: true,
        paragraphs: [
          {
            de: "Der 20-köpfige Kirchenvorstand fasste unter dem Vorsitz von Pfarrer Josef Spengler am 21. Dezember 1941 den Beschluss, gemäß des Kostenanschlages vom 2. November 1941 der Orgelbaufirma Fritz Haerpfer aus Bolchen (Lothringen) eine Orgel mit 31 klingenden und 2 transmittierten Stimmen zum Preise von 20.177,14 Reichsmark anzuschaffen.",
            en: "On 21 December 1941 the 20-member parish council, chaired by Pastor Spengler, resolved to acquire from the Fritz Haerpfer organ company of Bolchen (Lorraine), according to the estimate of 2 November 1941, an organ with 31 speaking and 2 transmitted stops at a price of 20,177.14 Reichsmark."
          }
        ],
        quote: {
          de: "Die vorhandene Orgel mit 15 Registern ist im Jahre 1905 umgebaut worden. Es wurden die noch brauchbaren Register von der alten Orgel übernommen. Ein Register musste, weil verfault, herausgenommen werden. Der Spieltisch ist, wie vom Orgelbauer Reimsbach aus Wallerfangen festgestellt wurde, vom Wurm zerfressen und kann jeden Tag unbrauchbar werden. Die Pfarrkirche ist wesentlich vergrößert worden und die vorhandene Orgel reicht für eine gefüllte Kirche nicht aus. Die Orgel ist so aufgestellt, dass die Raumverhältnisse für den Kirchenchor ungünstig sind.",
          en: "The existing organ with 15 stops was rebuilt in 1905. The still usable stops of the old organ were retained. One stop had to be removed because it had decayed. According to the organ builder Reimsbach of Wallerfangen, the console is worm-eaten and may become unusable any day. The parish church has been considerably enlarged and the existing organ is insufficient for a full church. The organ is placed in a way that makes conditions unfavourable for the parish choir."
        }
      },
      {
        eyebrow: { de: "Finanzierung", en: "Financing" },
        title: {
          de: "Grundsteuer, Vermögenssteuer und Anleihe",
          en: "Property tax, wealth tax and a loan"
        },
        paragraphs: [
          {
            de: "Aus dem Vorstandsbeschluss geht hervor, dass 9.800 RM zur Finanzierung vorhanden sind und 6.000 RM aus Einnahmen des Jahres 1941 aufgrund von Grundsteuer-Messbeträgen, der Vermögenssteuer und aus dem Kirchgeld beglichen werden. Der Restbetrag von 4.300 RM soll durch eine Anleihe bei der hiesigen Spar- und Darlehnskasse aufgenommen und im Etatsjahr 1942 abgetragen werden.",
            en: "The council resolution notes that 9,800 RM were available for financing and 6,000 RM would be paid from the 1941 income from property tax assessments, wealth tax and church dues. The remaining 4,300 RM were to be raised by a loan from the local savings and loan bank and repaid in the budget year 1942."
          },
          {
            de: "Das bischöfliche Generalvikariat Trier stimmte am 5. Januar 1942 den Beschlüssen zum Orgelbau durch die Firma Fritz Haerpfer zu. Die Orgel-Disposition wurde von dem Trierer Domkapellmeister Johannes Klassen (1904 bis 1957) geprüft und aufgrund seiner Anregung um ein Register und 2 Transmissionsstimmen erweitert.",
            en: "On 5 January 1942 the episcopal vicariate general in Trier approved the decisions for the organ project by Fritz Haerpfer. The specification was reviewed by the cathedral music director Johannes Klassen (1904 to 1957) in Trier and, on his suggestion, extended by one stop and two transmission voices."
          }
        ]
      },
      {
        eyebrow: { de: "Verzögerung", en: "Delay" },
        title: {
          de: "Zwei Jahre Wartezeit bis zur Fertigstellung",
          en: "Two years of waiting until completion"
        },
        paragraphs: [
          {
            de: "Die Kirchengemeinde hatte im Vertrag mit dem Orgelbauer eine Lieferzeit von „voraussichtlich 6 bis 8 Monaten“ vereinbart. Eine Garantie konnte aber „wegen der Kriegsereignisse“ nicht übernommen werden.",
            en: "The parish had agreed with the organ builder a delivery time of “probably 6 to 8 months” in the contract. A guarantee, however, could not be given “because of the war”."
          },
          {
            de: "Tatsächlich mussten sich die Lisdorfer noch über zwei Jahre bis zur Fertigstellung der Orgel gedulden. Aus einem Brief von Pfarrer Spengler an den Orgelbauer unter dem Datum vom 30. August 1943 wird die Ungeduld und die Verärgerung über die Verzögerung des Orgelbaus deutlich.",
            en: "In fact the people of Lisdorf had to wait more than two more years until the organ was completed. A letter from Pastor Spengler to the organ builder dated 30 August 1943 makes clear the impatience and anger at the delay."
          },
          {
            de: "Aus dem Schreiben geht hervor, dass im Frühjahr die alte Lisdorfer Orgel von der Firma Haerpfer abgebaut und nach Piesbach „geschafft und dort aufgebaut wurde“. Zugesagt war aber, zuerst die Lisdorfer Orgel aufzubauen. Entgegen dieser Abmachung und trotz der vielfachen Versprechungen des Orgelbauers mussten die Lisdorfer Gläubigen lange auf den Orgelklang verzichten.",
            en: "The letter notes that in the spring the old Lisdorf organ had been dismantled by the Haerpfer firm and “taken and installed in Piesbach”. However, it had been agreed to install the Lisdorf organ first. Contrary to this agreement, and despite the organ builder’s many promises, the Lisdorf faithful had to do without the organ sound for a long time."
          }
        ]
      },
      {
        eyebrow: { de: "Orgelweihe", en: "Organ consecration" },
        title: {
          de: "6. Februar 1944, mitten im Krieg",
          en: "6 February 1944, in the middle of the war"
        },
        paragraphs: [
          {
            de: "Endlich war es dann soweit, dass am 6. Februar 1944 die Orgelweihe im Rahmen eines Kirchenkonzertes durch den Domvikar Dr. Schwickerath, Trier stattfinden konnte. Konzertmitwirkende waren die Sopranistin Maria Comes-Strauß, Trier, der Trierer Domchor unter der Leitung von Domkapellmeister Johannes Klassen und der Organist Heinrich Weber, Aachen.",
            en: "At last, on 6 February 1944, the organ was consecrated during a church concert by the cathedral vicar Dr. Schwickerath of Trier. The performers were the soprano Maria Comes-Strauß of Trier, the Trier cathedral choir under cathedral music director Johannes Klassen and the organist Heinrich Weber of Aachen."
          }
        ]
      },
      {
        eyebrow: { de: "Kriegsschäden", en: "War damage" },
        title: {
          de: "Granatsplitter und Reparaturen",
          en: "Shrapnel and repairs"
        },
        paragraphs: [
          {
            de: "Die in den Wirren des II. Weltkrieges erbaute Orgel blieb vor Kriegsschäden nicht verschont. Dieses belegt ein Kollektenaufruf von Pfarrer Joseph Spengler.",
            en: "The organ, built in the turmoil of the Second World War, was not spared war damage. This is attested by an appeal for collections by Pastor Spengler."
          }
        ],
        quote: {
          de: "Nächsten Sonntag ist eine Hauskollekte, vor allem für die Reparatur der Orgel. Neben den Schäden durch allzu große Hitze 1947 und 1949 und durch allzu große Feuchtigkeit im Winter 1948 sind bei den Reparaturen eine ganze Reihe von Schäden durch Granatsplitter gefunden worden, die viele Pfeifen durchschlagen haben. Die Gläubigen werden dringend gebeten, soweit es in ihren Kräften steht, diese Kollekte für die Reparatur der Orgel in besonderer Weise bedenken zu wollen.",
          en: "Next Sunday there will be a house collection, above all for the repair of the organ. In addition to the damage caused by excessive heat in 1947 and 1949 and by excessive dampness in the winter of 1948, during the repairs a whole series of damages caused by shrapnel were found, which pierced many pipes. The faithful are earnestly asked, as far as is in their power, to think of this collection for the repair of the organ in a special way."
        }
      },
      {
        eyebrow: { de: "Nachkriegsjahre", en: "Post-war years" },
        title: {
          de: "Brüchige Membranen und fehlende Eidotter",
          en: "Brittle membranes and missing egg yolks"
        },
        paragraphs: [
          {
            de: "Die Orgel hatte auch in den Folgejahren umfangreiche Reparaturen zu überstehen. Im letzten Jahr seines Lisdorfer Wirkens schloss Pfarrer Spengler im Mai 1954 noch einen umfangreichen Wartungsvertrag mit der Orgelbaufirma Haerpfer & Erman ab. Im Herbst des gleichen Jahres stellten die Orgelbauer fest, dass sämtliche Membranen der rund 2000 Pfeifen umfassenden Orgel brüchig sind und ersetzt werden müssen.",
            en: "In the following years the organ had to endure extensive repairs. In the last year of his ministry in Lisdorf, in May 1954, Pastor Spengler concluded a comprehensive maintenance contract with the organ building firm Haerpfer & Erman. In the autumn of the same year, the builders determined that all the membranes of the approximately 2,000 pipes of the organ were brittle and needed to be replaced."
          },
          {
            de: "Begründet wurden die gravierenden Mängel damit, dass für die fachgerechte Gerbung des Schafspaltleders in den Kriegsjahren die Eidotter fehlten.",
            en: "The severe defects were attributed to the fact that during the war years the egg yolks required for the proper tanning of the sheep split leather had been missing."
          }
        ]
      },
      {
        eyebrow: { de: "Pfarrer Alois Löw", en: "Pastor Alois Löw" },
        title: {
          de: "Deckeneinsturz und Renovierung durch Hugo Mayer",
          en: "Ceiling collapse and renovation by Hugo Mayer"
        },
        paragraphs: [
          {
            de: "Nachfolger von Pfarrer und Dechant Josef Spengler wurde Pfarrer Alois Löw, der in Lisdorf bis 1966 tätig war. Er stammte aus Labach und wirkte vor der Amtsübernahme in Lisdorf in Oberkirchen und Wallhausen.",
            en: "Pastor Alois Löw succeeded Pastor and Dean Josef Spengler and served in Lisdorf until 1966. He came from Labach and before taking office in Lisdorf had worked in Oberkirchen and Wallhausen."
          },
          {
            de: "Nach dem teilweisen Einsturz der Kirchendecke am 19. Dezember 1959 hatte Pfarrer Löw mit den kirchlichen Gremien die riesige Verantwortung, die architektonische Umgestaltung des Kircheninnenraumes durchzuführen. Die durch den Deckeneinsturz verursachten Schäden waren sowohl im Kirchenraum, als auch an der Orgel erheblich. Der gesamte Kirchenraum konnte erstmals wieder ab dem 15. August 1961 genutzt werden.",
            en: "After the partial collapse of the church ceiling on 19 December 1959, Pastor Löw, together with the parish bodies, bore the huge responsibility for the architectural redesign of the church interior. The damage caused by the collapse was substantial both in the church and to the organ. The whole interior could not be used again until 15 August 1961."
          },
          {
            de: "Ein Jahr länger dauerte es, bis am 5. August 1962 nochmals die stark in Mitleidenschaft gezogene Orgel erklingen konnte. Der Kirchenvorstand beauftragte den Orgelbaumeister Hugo Mayer aus Heusweiler mit der Renovierung. Hugo Mayer, 1912 in Wengen / Allgäu geboren, legte 1948 die Meisterprüfung ab und gründete 1952 seine eigene Werkstatt in Brebach / Saar. Im Jahre 1957 wurde diese in größere Räume nach Heusweiler, dem heutigen Firmensitz, verlagert.",
            en: "A further year passed before, on 5 August 1962, the heavily damaged organ sounded again. The parish council commissioned master organ builder Hugo Mayer of Heusweiler with the renovation. Born in 1912 in Wengen / Allgäu, Hugo Mayer passed his master craftsman’s examination in 1948 and founded his own workshop in Brebach / Saar in 1952. In 1957 this was relocated to larger premises in Heusweiler, where the firm has its seat today."
          },
          {
            de: "Beim Orgelabbau stellte Hugo Mayer einen starken Holzwurmbefall fest. Zur Verhinderung eines Fortschreitens des Insektenfraßes war es notwendig, die Holzteile mit einem Holzschutzmittel zu imprägnieren. Der Renovierungsauftrag umfasste auch den Einbau einer elektrischen Traktur und die Erneuerung des Spieltisches.",
            en: "When dismantling the organ, Hugo Mayer discovered severe woodworm infestation. To prevent further insect damage it was necessary to impregnate the wooden parts with a wood preservative. The renovation commission also included the installation of an electric action and the renewal of the console."
          }
        ]
      },
      {
        eyebrow: { de: "Ab 1968", en: "From 1968" },
        title: {
          de: "Pfarrer Ernst Seiwert und das Ende der Haerpfer-Orgel",
          en: "Pastor Ernst Seiwert and the end of the Haerpfer organ"
        },
        paragraphs: [
          {
            de: "Wenige Jahre später zeigte sich, dass die im Kirchenraum im Jahre 1961 eingebaute Holzdecke der Orgel weitere Schäden zufügte. Aufgrund der tiefen Abhängung fehlte über dem Orgelwerk ein ausreichender Luftzirkulationsraum. Die Umstellung der Kirchenraumbeheizung auf Ölfeuerung führte zu einer nochmaligen Reduzierung der Luftfeuchtigkeit. Die Folge war eine starke Rissbildung an den Holzteilen der Orgel.",
            en: "A few years later it became clear that the wooden ceiling installed in the church in 1961 was causing further damage to the organ. Due to the low suspension, there was not enough space for air circulation above the instrument. The switch to oil heating in the church further reduced the humidity. The result was severe cracking in the wooden parts of the organ."
          },
          {
            de: "Diesem Problem stellte sich ab dem Jahre 1968 der Nachfolger von Pfarrer Löw, Pfarrer Ernst Seiwert. Der aus Saarlouis-Roden stammende Geistliche hatte 1951 im Trierer Dom die Priesterweihe empfangen, war 6 Jahre Kaplan in Mühlheim bei Koblenz und 9 Jahre Pfarrer von Biebern / Hunsrück. Am 11. Dezember 1966 kam er als Pfarrherr nach Lisdorf.",
            en: "From 1968 onwards this problem was taken up by Pastor Löw’s successor, Pastor Ernst Seiwert. Born in Saarlouis-Roden, he had been ordained in Trier Cathedral in 1951, served for 6 years as curate in Mühlheim near Koblenz and for 9 years as pastor of Biebern / Hunsrück. On 11 December 1966 he came to Lisdorf as pastor."
          },
          {
            de: "Er erbat 1968 von drei Orgelbaufirmen und dem Orgelreferat des Bistums deren Einschätzung zum Zustand der im Jahre 1944 erbauten Orgel. Das Hauptproblem lag bei den Windladen, die als Taschenladen vorhanden massive Rissbildungen zeigten. Eine kostenintensive Reparatur schien nicht empfehlenswert. Dieses übereinstimmende Ergebnis wurde vom Orgelsachverständigen des Bistums Wolfgang Oehms bestätigt.",
            en: "In 1968 he asked three organ building firms and the diocesan organ office for their assessment of the state of the organ built in 1944. The main problem lay with the windchests, built as pouch chests, which showed massive cracking. A costly repair seemed inadvisable. This unanimous conclusion was confirmed by the diocesan organ expert Wolfgang Oehms."
          },
          {
            de: "Im Jahre 1970 entschied der Kirchenvorstand, vordringlich die fachgerechte Entlüftung des Kirchenraumes in Angriff zu nehmen und die anstehende Sanierung des Innenraumes der Pfarrkirche zügig anzugehen. Die Orgelbaufirma Haerpfer & Erman wurde beauftragt, „einige Register“ der Orgel bespielbar zu machen.",
            en: "In 1970 the parish council decided to address the proper ventilation of the church as a priority and to pursue the renovation of the interior energetically. The firm Haerpfer & Erman was commissioned to make “a few stops” of the organ playable."
          },
          {
            de: "Dennoch sollte es noch über 10 Jahre dauern, bis die substanzerhaltende Renovierung der Pfarrkirche abgeschlossen werden konnte und die räumlichen und klimatechnischen Voraussetzungen für das Funktionieren eines Orgelinstrumentes gegeben waren. Im Rahmen der Kirchensanierung musste 1975 die Orgelempore erneuert werden, das Orgelwerk abgebaut und vorübergehend in einer Scheune in Lisdorf gelagert werden. Im Februar 1979 wurde das Orgelwerk für eine eventuell in Frage kommende Restaurierung zur Orgelbaufirma Haerpfer nach Boulay verbracht.",
            en: "Nevertheless, more than 10 years would pass before the substance-preserving renovation of the church was completed and the spatial and climatic conditions for a functioning organ were in place. In the course of the restoration, the organ loft had to be renewed in 1975, the instrument dismantled and temporarily stored in a barn in Lisdorf. In February 1979 the organ was taken to the Haerpfer firm in Boulay for a possible restoration."
          },
          {
            de: "Eine dort durchgeführte nochmalige Bestandsanalyse brachte die Erkenntnis, dass das Orgelwerk mit enormen Materialschäden versehen war und ein Wiederaufbau, auch aufgrund der mangelhaften Technik, bei einer sinnvollen Sanierung praktisch einem Neubau gleich käme und daher nicht ratsam schien.",
            en: "A renewed condition analysis there concluded that the organ was subject to enormous material damage and that a reconstruction, also due to its outdated technology, would, in a sensible restoration, be practically equivalent to a new build and therefore did not seem advisable."
          }
        ]
      },
      {
        eyebrow: { de: "Disposition", en: "Specification" },
        title: {
          de: "Registratur unter Verwendung der alten Pfeifen",
          en: "Stop list using the old pipes"
        },
        disposition: [
          {
            heading: { de: "I. Manual", en: "Great" },
            stops: [
              "1. Principal 8′",
              "2. Bourdon Gedeckt 16′",
              "3. Flöte 8′",
              "4. Salicional 8′",
              "5. Gedeckt 8′",
              "6. Octave 4′",
              "7. Rohrflöte 4′",
              "8. Oktave 2′",
              { de: "9. Mixtur, Kornett", en: "9. Mixture, Cornet" },
              "10. Trompete 8′"
            ]
          },
          {
            heading: { de: "II. Manual", en: "Second manual" },
            stops: [
              "11. Principal 8′",
              "12. Flöte Harmonic 8′",
              "13. Viola di Gamba 8′",
              "14. Vox-Coelestis 8′",
              "15. Aeoline 8′",
              "16. Lieblich Gedeckt 8′",
              "17. Principal 4′",
              "18. Traversflöte 4′",
              "19. Nazat 2 2/3",
              "20. Waldflöte 2′",
              { de: "21. Cymbel Mixtur 4 bis 5 fach", en: "21. Cymbel Mixtur IV–V" },
              "22. Fagott 16′",
              "23. Trompete 8′",
              "24. Trompete 4′"
            ]
          },
          {
            heading: { de: "Pedal", en: "Pedal" },
            stops: [
              "25. Violonbaß 16′",
              "26. Subbass 16′",
              "27. Gedeckt 16′",
              "28. Oktavbass 8′",
              "29. Gedecktbass 8′",
              "30. Gedecktbass 4′",
              "31. Choralbass 4′",
              "32. Cornett 2′",
              "33. Posaune 16′"
            ]
          }
        ]
      }
    ]
  },

  "mayer-1987": {
    lead: {
      de: "1982 fasste der Verwaltungsrat den mutigen Beschluss, aus eigenen Kräften eine neue Orgel zu bauen. Fünf Jahre später, am 23. Oktober 1987, erklang die MAYER-Orgel zum ersten Mal.",
      en: "In 1982 the parish council took the courageous decision to build a new organ by its own means. Five years later, on 23 October 1987, the MAYER organ sounded for the first time."
    },
    era: ERA_HISTORY,
    heroYear: "1987",
    keyFacts: [
      {
        label: { de: "Orgelbauer", en: "Builder" },
        value: {
          de: "Hugo Mayer Orgelbau, Heusweiler / Saar",
          en: "Hugo Mayer Orgelbau, Heusweiler / Saar"
        }
      },
      {
        label: { de: "Register", en: "Stops" },
        value: { de: "39 klingend, Opus 267", en: "39 speaking, opus 267" }
      },
      {
        label: { de: "Werke", en: "Divisions" },
        value: {
          de: "Positiv · Hauptwerk · Schwellwerk · Pedal",
          en: "Positiv · Great · Swell · Pedal"
        }
      },
      {
        label: { de: "Traktur", en: "Action" },
        value: { de: "mechanisch", en: "mechanical" }
      },
      {
        label: { de: "Orgelweihe", en: "Consecration" },
        value: {
          de: "23. Oktober 1987 durch Regionaldekan Albert André",
          en: "23 October 1987 by regional dean Albert André"
        }
      },
      {
        label: { de: "Gesamtkosten", en: "Total cost" },
        value: { de: "815.898,62 DM", en: "815,898.62 DM" }
      },
      {
        label: { de: "Prospekt-Schnitzwerk", en: "Case carvings" },
        value: {
          de: "Günter Mrziglod, Tholey (vollendet 1992)",
          en: "Günter Mrziglod, Tholey (completed 1992)"
        }
      },
      {
        label: { de: "Setzeranlage", en: "Combination system" },
        value: {
          de: "6.336 Einzelkombinationen · USB-Speicher",
          en: "6,336 individual combinations · USB storage"
        }
      }
    ],
    sections: [
      {
        eyebrow: { de: "1982", en: "1982" },
        title: {
          de: "Der Entschluss und die Gründung des Orgelbaufördervereins",
          en: "The decision and the founding of the organ building association"
        },
        defaultOpen: true,
        paragraphs: [
          {
            de: "Nach langer Zeit des Überlegens fasste der Verwaltungsrat Anfang 1982 den mutigen Entschluss, aus eigenen Kräften, vertrauend auf die Opferbereitschaft der Lisdorfer Gemeinde, eine neue Orgel zu bauen. Finanzielle Grundlage hierfür war eine großzügige Spende, die zweckbestimmt für den Orgelbau zur Verfügung stand. Aber auch die Tatsache, dass das Vorhaben bereits in der Diskussionsphase von vielen Lisdorfern ideell begeistert mitgetragen wurde, erleichterte dem Beschlussgremium die Entscheidung.",
            en: "After a long period of deliberation, in early 1982 the parish council took the courageous decision to build a new organ by its own means, trusting in the willingness of the Lisdorf community to give generously. The financial basis was a generous donation earmarked for the organ. The fact that many people in Lisdorf had enthusiastically supported the project already in the discussion phase made the decision easier for the council."
          },
          {
            de: "Der eigens dafür am 22. April 1982 gegründete Orgelbauförderverein der Kath. Kirchengemeinde Lisdorf übernahm engagiert die Aufgabe, für die Gesamtfinanzierung des Orgelbaus Sorge zu tragen. Die Zahl der Mitglieder wuchs stetig, sodass die mittelfristige Finanzierbarkeit des Orgelwerkes bereits nach kurzer Zeit wahrscheinlich wurde.",
            en: "The organ building association of the Catholic parish of Lisdorf, founded for this purpose on 22 April 1982, took on with commitment the task of ensuring the overall financing of the project. The number of members grew steadily, so that the medium-term financing of the instrument became likely within a short time."
          }
        ]
      },
      {
        eyebrow: { de: "Planung", en: "Planning" },
        title: {
          de: "Prof. Paul Schneider, Werner Glesner und die Ausschreibung",
          en: "Prof. Paul Schneider, Werner Glesner and the tender"
        },
        paragraphs: [
          {
            de: "Die Gemeinde konnte sich glücklich schätzen, sowohl mit dem Orgel-Professor Paul Schneider, Saarbrücken als auch mit Dipl.-Ing. Werner Glesner, techn. Direktor beim Saarländischen Rundfunk, über zwei unabhängige Ratgeber zu verfügen. Werner Glesner erstellte in enger Abstimmung mit Prof. Paul Schneider, Pastor Ernst Seiwert und Vertretern des Verwaltungsrates die Ausschreibung für ein 36-Register umfassendes Orgelwerk.",
            en: "The parish was fortunate to have two independent advisers in organ professor Paul Schneider of Saarbrücken and the engineer Werner Glesner, technical director of Saarländischer Rundfunk. Glesner, in close consultation with Prof. Schneider, Pastor Ernst Seiwert and representatives of the council, drew up the tender for an organ of 36 stops."
          },
          {
            de: "Nach unzähligen Diskussionsabenden, Skizzierungen, Kostenkalkulationen, Finanzierungsmodellen und Orgelbesichtigungen war es dann möglich, das Lisdorfer Orgelwerk am 10. September 1984 auszuschreiben.",
            en: "After countless evenings of discussion, sketches, cost calculations, financing models and organ visits, the Lisdorf organ was finally put out to tender on 10 September 1984."
          },
          {
            de: "Bereits im Dezember 1984 konnten die Entscheidungsträger über drei Angebote aus Deutschland und je eine Offerte aus Frankreich und der Schweiz verfügen. Für alle Anbieter war es eine Herausforderung und Ansporn zugleich, für den bedeutenden sakralen Kirchenraum ein Orgelwerk zu schaffen, das sowohl optisch als auch akustisch allen Erfordernissen gerecht wird. Die Entscheidung des Verwaltungsrates fiel nach eingehender Prüfung und Bewertung der Angebotsunterlagen im Dezember 1984 zugunsten der saarländischen Orgelbaufirma Hugo Mayer, Heusweiler.",
            en: "By December 1984 the decision-makers had three offers from Germany and one each from France and Switzerland. For all bidders it was both a challenge and an incentive to create an instrument for the important sacred space that would meet all visual and acoustic requirements. After thorough examination and evaluation of the tenders, the council decided in December 1984 in favour of the Saar-based organ building firm Hugo Mayer, Heusweiler."
          }
        ]
      },
      {
        eyebrow: { de: "Hugo Mayer, Heusweiler", en: "Hugo Mayer, Heusweiler" },
        title: {
          de: "Die Orgelmanufaktur von Gerd Mayer",
          en: "The organ workshop of Gerd Mayer"
        },
        paragraphs: [
          {
            de: "Diese Orgelmanufaktur wird seit dem Jahre 1974 vom Sohn des Firmengründers, Herrn Gerd Mayer, geleitet. Er trat 1957 als Auszubildender in die Werkstatt seines Vaters ein. Nach der Gesellenprüfung war er unter anderem in Frankreich und Amerika tätig. Er legte 1966 als jüngster deutscher Orgelbauer die Meisterprüfung vor der Handwerkskammer in Stuttgart ab.",
            en: "This workshop has been led since 1974 by the founder’s son, Gerd Mayer. He entered his father’s workshop as an apprentice in 1957. After his journeyman’s examination he worked, among other places, in France and America. In 1966, as the youngest German organ builder, he passed his master craftsman’s examination before the chamber of crafts in Stuttgart."
          },
          {
            de: "Nach dem Verwaltungsratsbeschluss wurde in engstem Zusammenwirken zwischen dem Orgelbauer, den ehrenamtlichen Ratgebern Prof. Schneider und Dipl.-Ing. Glesner, dem Architekten Tibor Kugelmann sowie den Vertretern der Kirchengemeinde das endgültige Klangbild der neu zu erbauenden Orgel und die Gestaltung des Orgelprospektes entwickelt.",
            en: "After the council’s decision, the final tonal concept of the new organ and the design of the case were developed in close cooperation between the organ builder, the voluntary advisers Prof. Schneider and Glesner, the architect Tibor Kugelmann and representatives of the parish."
          }
        ]
      },
      {
        eyebrow: { de: "Disposition", en: "Specification" },
        title: {
          de: "Drei weitere Register durch spontane Spenden",
          en: "Three more stops through spontaneous donations"
        },
        paragraphs: [
          {
            de: "In einer dieser Arbeitssitzungen, bei der es hauptsächlich um die Disposition der Registrierung ging, wurde nachhaltig zur Verbesserung des Klangbildes dafür plädiert, drei Register zusätzlich einzuplanen. Hierfür konnte aus Kostengründen seitens der Kirchengemeinde keine Zusage gemacht werden. Spontan spendeten daraufhin zwei der anwesenden Sitzungsteilnehmer die finanziellen Gegenwerte der drei Register, sodass ein Orgelwerk mit insgesamt 39 klingenden Registern in Auftrag gegeben wurde. Der Orgelbauer wurde auch beauftragt, die Möglichkeit für den späteren Einbau von nochmals vier weiteren Registern vorzusehen.",
            en: "In one of these working meetings, which focused mainly on the specification, there were strong arguments for adding three more stops to improve the sound. For cost reasons the parish could not commit to this. Spontaneously, two of those present at the meeting donated the equivalent cost of the three stops, so that an instrument of 39 speaking stops was commissioned. The builder was also asked to prepare for the later installation of four further stops."
          },
          {
            de: "Nach der Bewilligung der bischöflichen Behörde vom 22. April 1985 erteilte die Kirchengemeinde am 27. April 1985 den verbindlichen Auftrag zur Erstellung des Orgelwerkes, noch ohne Schnitzwerk, der saarländischen Orgelbaufirma Hugo Mayer aus Heusweiler.",
            en: "After approval by the episcopal authority on 22 April 1985, the parish placed the binding order for the organ, still without carvings, with the Saar firm Hugo Mayer in Heusweiler on 27 April 1985."
          },
          {
            de: "Laut Werklieferungsvertrag betrug die Fertigungszeit 24 Monate. Im Hinblick auf den 1700. Todestag der Schutzpatrone Crispinus und Crispinianus am 25. Oktober 1987 beabsichtigte die Kirchengemeinde, das Fest der Orgelweihe zusammen mit diesem für die Pfarrei wichtigen Ereignis zu feiern.",
            en: "According to the delivery contract, the production time was 24 months. In view of the 1700th anniversary of the deaths of the patron saints Crispinus and Crispinianus on 25 October 1987, the parish intended to celebrate the organ consecration together with this important event."
          }
        ]
      },
      {
        eyebrow: { de: "Künstlerischer Anspruch", en: "Artistic ambition" },
        title: {
          de: "Harmonie von Raum und Instrument",
          en: "Harmony of space and instrument"
        },
        paragraphs: [
          {
            de: "Der künstlerische Wert einer Orgel setzt ein harmonisches Zusammenspiel von Architektur, Prospektgestaltung, Disposition und letztlich einer vollendeten Intonation voraus. Bei der Planung der Lisdorfer Orgel galt es im Besonderen, das neue Orgelwerk harmonisch dem barocken Charakter des Innenraumes der Kirche so anzupassen, dass eine homogene Einheit und eine Wechselbeziehung zwischen Raum und dem Orgelwerk entstehen.",
            en: "The artistic value of an organ requires a harmonious interplay of architecture, case design, specification and, ultimately, perfect voicing. In planning the Lisdorf organ it was especially important to adapt the new instrument harmoniously to the baroque character of the church interior, so that a homogeneous unity and an interplay between space and instrument would emerge."
          },
          {
            de: "Die dafür erforderlichen Überlegungen und Grundlagen waren immer wieder zwingende Bestandteile der einzelnen Planungsschritte. Insbesondere ist es Pastor Ernst Seiwert zu danken, dass dieser Grundsatz in Lisdorf zur Realität wurde. Für ihn war der Orgelbau, baulich gesehen, der krönende Abschluss seines priesterlichen Wirkens in Lisdorf.",
            en: "The considerations and foundations required for this were repeatedly an integral part of each planning step. Particular thanks are due to Pastor Ernst Seiwert that this principle became reality in Lisdorf. For him the organ project was, architecturally speaking, the crowning achievement of his priestly ministry in Lisdorf."
          },
          {
            de: "Pfarrer Ernst Seiwert wurde am 5. September 1986 im Rahmen eines großen Pfarrfestes, dessen Erlös dem Orgelbaufonds zufloss, nach 20-jähriger segensreicher Tätigkeit in Lisdorf in den wohlverdienten Ruhestand verabschiedet. Er hinterließ der Pfarrei ein gut funktionierendes Pfarrzentrum, das die Kirchengemeinde heute noch auszeichnet.",
            en: "On 5 September 1986, during a great parish feast whose proceeds went to the organ fund, Pastor Ernst Seiwert was sent into well-earned retirement after 20 years of fruitful ministry in Lisdorf. He left behind a well-functioning parish centre that still distinguishes the community today."
          },
          {
            de: "Sein Nachfolger Pfarrer Karl Detemple, der am 29. März 1987 als neuer Seelsorger in Lisdorf eingeführt wurde, begleitete die Orgelfertigstellung. Die hoch qualifizierten Mitarbeiter der Orgelbaumanufaktur Hugo Mayer schafften es in der vorgegebenen Bauzeit ein Instrument zu bauen, das bis heute von Orgelkennern sehr geschätzt wird.",
            en: "His successor, Pastor Karl Detemple, who was installed on 29 March 1987 as the new pastor in Lisdorf, accompanied the completion of the organ. The highly qualified staff of the Hugo Mayer workshop succeeded, within the agreed build time, in creating an instrument that is still highly regarded by organ connoisseurs today."
          }
        ]
      },
      {
        eyebrow: { de: "23. Oktober 1987", en: "23 October 1987" },
        title: {
          de: "Die Orgelweihe durch Regionaldekan Albert André",
          en: "The consecration by regional dean Albert André"
        },
        paragraphs: [
          {
            de: "Die würdige und eindrucksvolle Orgelweihe durch Regionaldekan Albert André (Mitzelebranten waren Dechant Anton Heidger, Pfarrer Karl Detemple sowie die ehemaligen Lisdorfer Pfarrherren Alois Löw und Ernst Seiwert) erfolgte am 23. Oktober 1987 im Rahmen der Feierlichkeiten zum 1700. Todestag der Schutzpatrone der Pfarrkirche „St. Crispinus und Crispinianus“.",
            en: "The dignified and impressive consecration of the organ by regional dean Albert André (concelebrants were dean Anton Heidger, Pastor Karl Detemple and the former Lisdorf pastors Alois Löw and Ernst Seiwert) took place on 23 October 1987 during the celebrations of the 1700th anniversary of the deaths of the parish patrons “St. Crispinus and Crispinianus”."
          },
          {
            de: "Eindrucksvoll war auch die orgelmusikalische Gestaltung dieser Feierstunde durch Prof. Paul Schneider und den Lisdorfer Kirchenchor. Somit konnte bereits nach 5-jähriger Planungs- und Bauzeit der erste große Bauabschnitt des Lisdorfer Orgelneubaus erfolgreich abgeschlossen werden.",
            en: "The musical setting of this celebration by Prof. Paul Schneider and the Lisdorf parish choir was equally impressive. After just five years of planning and construction, the first major phase of the Lisdorf organ project was successfully completed."
          },
          {
            de: "Am 25. Oktober 1987 lockte das erste Orgelkonzert viele Besucher aus nah und fern an. Andreas Arand, einem gebürtigen Lisdorfer, wurde die Ehre zuteil, die neue Orgel „einzuspielen“. Andreas Arand studierte bei Prof. Paul Schneider (Musikhochschule Saarbrücken) und Prof. Michael Schneider (Musikhochschule Köln). Er war 18 Jahre Organist der Kreuzbergkirche in Bonn und ist Lehrbeauftragter an der Musikhochschule in Saarbrücken.",
            en: "On 25 October 1987 the first organ concert drew many visitors from near and far. Andreas Arand, a native of Lisdorf, had the honour of “breaking in” the new organ. He studied with Prof. Paul Schneider (Music Academy Saarbrücken) and Prof. Michael Schneider (Music Academy Cologne). He was organist of the Kreuzbergkirche in Bonn for 18 years and is a lecturer at the Music Academy in Saarbrücken."
          }
        ]
      },
      {
        eyebrow: { de: "Prospekt", en: "Case" },
        title: {
          de: "Barockes Gehäuse und Schnitzwerk von Mrziglod",
          en: "Baroque case and carvings by Mrziglod"
        },
        paragraphs: [
          {
            de: "Nach der Orgelweihe begann die Entscheidungsphase über das Aussehen und die Gestaltung des Orgelprospektes. Nach langen und schwierigen Überlegungen der kirchlichen Gremien, dem Architekten und Orgelbauer entschied man sich für ein Orgelgehäuse mit barockem Prospekt, getreu den Vorbildern der bekannten Meister.",
            en: "After the consecration, the decision phase on the appearance and design of the organ case began. After long and difficult deliberation among the church bodies, the architect and the organ builder, an organ case with a baroque façade was chosen, faithful to the models of the well-known masters."
          },
          {
            de: "Die notwendige Abstimmung mit dem bischöflichen Amt für Denkmalpflege und dem Diözesanarchitekt war schwierig. Nach Ansicht der bischöflichen Behörde war es nicht sinnvoll, eine neue Orgel mit einem neu zu rekonstruierenden Barockprospekt zu umbauen. Dennoch kam man zum Ergebnis, der Kirchengemeinde die Zustimmung zur Ausführung nicht zu versagen, „wenn von ihr die Verantwortung im oben beschriebenen Sinne getragen werden kann“. Die baufachliche Zustimmung für die von der Kirchengemeinde geplante Ausführung des Orgelprospektes wurde am 21. Februar 1989 vom Bistum erteilt.",
            en: "The necessary coordination with the episcopal office for monument protection and the diocesan architect was difficult. In the view of the episcopal authority it did not make sense to clothe a new organ with a newly reconstructed baroque façade. Nevertheless, it was concluded that the parish’s approval to proceed should not be withheld, “if the responsibility, as described, can be borne by it”. The building approval for the façade planned by the parish was granted by the diocese on 21 February 1989."
          },
          {
            de: "So wurde nach den Wünschen der Gemeinde, des Orgelbauers und des Architekten ein Orgelprospekt mit schweren geschwungenen Gesimsen und Profilen in starkem Eichenholz konzipiert, das trotzdem einen leichten und grazilen Gesamteindruck macht.",
            en: "Thus, following the wishes of the parish, the organ builder and the architect, an organ façade was designed with heavy curved cornices and mouldings in solid oak, which nevertheless gives an overall impression of lightness and grace."
          },
          {
            de: "Zu Beginn des Jahres 1990 war es soweit, dass durch die Orgelbaufirma Mayer die noch fehlenden, aber bereits eingeplanten vier Register eingebaut wurden. Weiterhin konnte die saarländische Restauratorenfirma Günter Mrziglod, Tholey mit der Herstellung des barocken Schnitzwerkes beauftragt werden. 34 prunkvolle Schleierbretter und Zapfen, aus Zirbelholz von Spezialisten in Südtirol handgeschnitzt, zieren seit Juni 1990 das Lisdorfer Orgelwerk.",
            en: "At the beginning of 1990 the still missing but already planned four stops were installed by the Mayer firm. The Saarland restoration workshop of Günter Mrziglod in Tholey was commissioned to produce the baroque carvings. 34 ornate pipe shades and cones, hand-carved by specialists in South Tyrol from stone pine, have adorned the Lisdorf organ since June 1990."
          },
          {
            de: "Die Fertigstellung der Gesamtmaßnahme rückte nun in greifbare Nähe. Trotzdem dauerte es bis zur Vollendung der farblichen Gestaltung des Orgelprospekts, die in Anpassung an die vorgegebenen Farbbilder des Altars, der Kanzel und der Beichtstühle erfolgte, noch über zwei Jahre. Im November 1992 war es dann soweit, dass das vor rund 10 Jahren begonnene Werk vollendet wurde.",
            en: "The completion of the overall project was now within reach. Even so, it took more than two more years to finish the colour design of the façade, which was adapted to the given colour scheme of the altar, the pulpit and the confessionals. In November 1992 the work, begun about 10 years earlier, was at last complete."
          }
        ]
      },
      {
        eyebrow: { de: "Finanzierung", en: "Financing" },
        title: {
          de: "815.898,62 DM aus eigener Kraft",
          en: "815,898.62 DM raised by our own strength"
        },
        paragraphs: [
          {
            de: "Die Planung und die Ausführung des Orgelwerkes erforderte Mut, Verhandlungsgeschick, Ausdauer und das Überwinden zahlreicher Hürden. Manche Hürden hat die Gemeinde schnell genommen, andere haben ihr Kopfzerbrechen bereitet. Ein Orgelbau dieser Größenordnung ist für eine 3000 Seelen umfassende Gemeinde nicht selbstverständlich. Anderenorts werden oftmals, wenn überhaupt, nur Minimalprogramme verwirklicht. Lisdorf, eine engagierte Gemeinde, hat sich für ein Maximalprogramm entschieden.",
            en: "The planning and realisation of the organ required courage, negotiating skill, perseverance and the overcoming of many hurdles. Some the community overcame quickly, others gave it headaches. An organ project of this size is not a matter of course for a parish of 3,000 souls. In other places only minimal programmes, if any, are carried out. Lisdorf, a committed community, chose a maximum programme."
          },
          {
            de: "Als Glücksgriff erwies sich die Gründung des Orgelbauvereins, der souverän den sich selbst gegebenen Satzungsauftrag, nämlich für die Finanzierung des Instrumentes Sorge zu tragen, innerhalb von 10 Jahren erfüllte. Die Bemühungen des aktiven und ideenreichen Vorstandes und der 230 Vereinsmitglieder wurden durch eine große Zahl von Einzelspendern gefördert.",
            en: "The founding of the organ building association proved to be a stroke of luck, fulfilling the self-imposed statutory task of financing the instrument within 10 years. The efforts of the active and inventive board and the 230 members were supported by a large number of individual donors."
          },
          {
            de: "Besonders erwähnenswert ist die tatkräftige Unterstützung der Lisdorfer Vereine, ohne deren Mitwirken die Lösung der großen Gemeinschaftsaufgabe wesentlich schwieriger gewesen wäre. Aufbauend auf deren großer Verlässlichkeit wurden drei attraktive Zeltveranstaltungen durchgeführt, deren Erlöse jeweils dem Orgelbaufond zuflossen.",
            en: "Particularly noteworthy is the active support of the Lisdorf clubs and societies, without which the great communal task would have been much more difficult. Based on their great reliability, three attractive marquee events were organised, whose proceeds each went to the organ fund."
          },
          {
            de: "Die vom Orgelbauförderverein im Jahre 1984 ins Leben gerufene Konzertreihe „Klingende Kirche“ wurde sehr gut angenommen. Hier waren es hauptsächlich die kulturellen Vereine Lisdorf, die für beachtliche Konzerterlöse sorgten, die dem Orgelbau zugute kamen.",
            en: "The concert series “Klingende Kirche” launched by the association in 1984 was very well received. Here it was mainly the cultural clubs of Lisdorf who achieved considerable concert revenues that benefited the organ project."
          },
          {
            de: "Am Schluss aller Bemühungen war es geschafft, den für den Orgelbau erforderlichen Finanzierungsbetrag in Höhe von insgesamt 815.898,62 DM zu erwirtschaften. Bemerkenswert ist, dass dabei Beträge der Kirchengemeinde und des Bistums nicht zur Verfügung standen und die Zuschussanträge seitens der Kommunen jeweils abgelehnt wurden.",
            en: "At the end of all these efforts, the total of 815,898.62 DM required for the organ was raised. Remarkably, no contributions from the parish or the diocese were available, and all applications for grants from the municipalities were rejected."
          }
        ]
      },
      {
        eyebrow: { de: "1993", en: "1993" },
        title: {
          de: "Gründung des Fördervereins „Klingende Kirche“",
          en: "Founding of the Klingende Kirche association"
        },
        paragraphs: [
          {
            de: "Der Lisdorfer Orgelbauförderverein löste sich im Januar 1993 wegen Erreichung des Vereinszweckes auf. Der Vorstand und die 230 Mitglieder begriffen dieses Ende jedoch nicht als Schlusspunkt ihres Engagements. Sie gründeten den Förderverein „Klingende Kirche der Kath. Kirchengemeinde Lisdorf e.V.“, mit der Zielsetzung, ein Forum zu schaffen, das die lange Tradition der Kirchenmusik in Lisdorf lebendig hält, aber auch Impulse für das Entstehen neuer musikalischer Entwicklungen gibt.",
            en: "The Lisdorf organ building association dissolved itself in January 1993 because its purpose had been achieved. The board and the 230 members, however, did not understand this ending as a full stop to their engagement. They founded the association “Klingende Kirche of the Catholic parish of Lisdorf e.V.”, with the aim of creating a forum that keeps the long tradition of sacred music in Lisdorf alive while also giving impulses for new musical developments."
          },
          {
            de: "Satzungszweck des Vereins ist, die Kirchenmusik in der Pfarrkirche Crispinus und Crispinianus in Saarlouis-Lisdorf zu fördern sowie das wertvolle Orgelwerk zu pflegen und zu unterhalten. Dieses Ziel wird zwischenzeitlich von 330 Mitgliedern ideell und finanziell begleitet.",
            en: "The purpose of the association, according to its statutes, is to promote sacred music at the parish church of Crispinus and Crispinianus in Saarlouis-Lisdorf and to care for and maintain the valuable organ. Today this goal is supported both morally and financially by 330 members."
          },
          {
            de: "Innerhalb der Konzertreihe der Lisdorfer „Klingenden Kirche“ wurden seither 157 Konzerte durchgeführt. Aufgrund der Vereinsinitiativen wurden aber auch bedeutende orgelspezifische Veranstaltungen wie der Internationale Saarlouiser Orgel-Kompositionswettbewerb, die Saarlouiser Orgeltage und die Europäische Orgelakademie geschaffen. Dadurch ist die Lisdorfer Pfarrkirche mit ihrer bemerkenswerten Orgel zu einem Markenzeichen anspruchsvoller Orgelmusik und kirchenmusikalischen Veranstaltungen geworden.",
            en: "Within the concert series of the Lisdorf Klingende Kirche, 157 concerts have since been held. Thanks to the association’s initiatives, significant organ-specific events were also created, such as the International Saarlouis Organ Composition Competition, the Saarlouis Organ Days and the European Organ Academy. As a result, the Lisdorf parish church, with its remarkable organ, has become a hallmark of ambitious organ music and sacred musical events."
          }
        ]
      },
      {
        eyebrow: { de: "Pflege und Erweiterung", en: "Care and expansion" },
        title: {
          de: "2006 Registererweiterung, 2011 Generalreinigung",
          en: "Stop extension in 2006, general cleaning in 2011"
        },
        paragraphs: [
          {
            de: "Der Förderverein „Klingende Kirche“ hat entscheidend zu dem hohen Stellenwert beigetragen, den die Stadt Saarlouis im Bereich der Kirchenmusik genießt. Der Pflege und Unterhaltung des Orgelwerkes kommt innerhalb des Vereinszweckes eine besondere Bedeutung zu.",
            en: "The Klingende Kirche association has contributed decisively to the high standing that the city of Saarlouis enjoys in the field of sacred music. The care and maintenance of the organ has a special significance within the purpose of the association."
          },
          {
            de: "So konnte im Jahre 2006, ausschließlich mit Mitteln des Vereins, die Orgel um den Einbau von zwei Registern sowie einer elektronischen Setzeranlage und Doppelregistratur erweitert werden. Mit der im Jahre 2011 erfolgten Generalreinigung des Orgelwerkes sind die besten Voraussetzungen einer künftigen hervorragenden orgelmusikalischen Nutzung geschaffen worden.",
            en: "In 2006, financed exclusively by the association, the organ was extended with the installation of two further stops as well as an electronic combination system and a double registration. With the general cleaning of the instrument in 2011, the best conditions were created for an outstanding musical use in the future."
          },
          {
            de: "Die Lisdorfer Orgel setzt klingende Zeichen. Möge sie uns noch viele Jahre in Freud und Leid begleiten und unsere Verbundenheit zur Kirche auch den kommenden Generationen künden.",
            en: "The Lisdorf organ makes sounding statements. May it accompany us for many more years in joy and sorrow and proclaim our bond with the church also to the coming generations."
          }
        ],
        footnote: "Manfred Boßmann"
      },
      {
        eyebrow: { de: "Gebet", en: "Prayer" },
        title: {
          de: "Aus der Liturgie der Orgelweihe",
          en: "From the liturgy of the organ consecration"
        },
        quote: {
          de: "Großer Gott, unsere Orgel ertöne zu Deiner Ehre und hebe unsere Herzen zu Dir empor. Wie die vielen Pfeifen sich in einem Klang vereinen, so lass uns als Glieder Deiner Kirche in gegenseitiger Liebe und Brüderlichkeit verbunden sein.",
          en: "Great God, may our organ sound to your honour and lift our hearts to you. As the many pipes unite in a single sound, so let us, as members of your Church, be bound together in mutual love and brotherhood."
        }
      },
      {
        eyebrow: { de: "Disposition", en: "Specification" },
        title: {
          de: "Die klingende Gestalt der MAYER-Orgel",
          en: "The sounding form of the MAYER organ"
        },
        disposition: [
          {
            heading: {
              de: "I. Manual C bis g3 · Positiv",
              en: "Manual I, C to g3 · Positive"
            },
            stops: [
              "Holzgedackt 8′",
              "Quintade 8′",
              "Principal 4′",
              "Traversflöte 4′",
              "Doublette 2′",
              "Sesquialter 2f",
              "Larigot 1 1/3′",
              "Scharf 4f 1′",
              "Cromorne 8′",
              { de: "Tremulant", en: "Tremulant" }
            ]
          },
          {
            heading: {
              de: "II. Manual C bis g3 · Hauptwerk",
              en: "Manual II, C to g3 · Great"
            },
            stops: [
              "Bourdon 16′",
              "Principal 8′",
              "Holzflöte 8′",
              "Gemshorn 8′",
              "Octave 4′",
              "Rohrflöte 4′",
              "Quinte 2 2/3′",
              "Principal 2′",
              "Mixtur 5f 1 1/3′",
              "Cornet 5f",
              "Bombarde 16′",
              "Trompete 8′"
            ]
          },
          {
            heading: {
              de: "III. Manual C bis g3 · Schwellwerk",
              en: "Manual III, C to g3 · Swell"
            },
            stops: [
              "Offenflöte 8′",
              "Salicional 8′",
              "Vox coelestis 8′",
              "Principal 4′",
              "Blockflöte 4′",
              "Nazard 2 2/3′",
              "Waldflöte 2′",
              "Terz 1 3/5′",
              "Acuta 4f 2′",
              "Fagott 16′",
              "Trompete harm. 8′",
              "Hautbois 8′",
              "Clairon 4′",
              {
                de: "Carillon mit 29 Bronzeglocken",
                en: "Carillon with 29 bronze bells"
              },
              { de: "Tremulant", en: "Tremulant" }
            ]
          },
          {
            heading: {
              de: "Pedalwerk C bis f1",
              en: "Pedal, C to f1"
            },
            stops: [
              "Principalbaß 16′",
              "Subbaß 16′",
              "Quintbaß 10 2/3′",
              "Principalflöte 8′",
              "Pommer 8′",
              "Choralbaß 4′",
              "Hintersatz 4f 2 2/3′",
              "Kontra-Posaune 32′",
              "Posaune 16′",
              "Trompete 8′",
              "Kopftrompete 4′"
            ]
          }
        ]
      },
      {
        eyebrow: { de: "Technik", en: "Technology" },
        title: {
          de: "Effektregister, Trakturen und Koppeln",
          en: "Effect stops, action and couplers"
        },
        paragraphs: [
          {
            de: "III/P/46+2 Effektregister · Rossignol · Baujahr 1987, Opus 267 · Cymbelstern · mechanische Trakturen.",
            en: "III/P/46+2 effect stops · Rossignol · built 1987, opus 267 · Zimbelstern · mechanical action."
          },
          {
            de: "Setzerkombination mit 6.336 Einzelkombinationen und USB-Stick-Speichermöglichkeit.",
            en: "Combination system with 6,336 individual combinations and USB stick storage."
          },
          {
            de: "Gehäuse: massive Eiche, marmoriert und vergoldet.",
            en: "Case: solid oak, marbled and gilded."
          },
          {
            de: "Elektrische Koppeln: I/P, II/P, III/P, I/II, III/II, III/I · 16′ III/III, 16′ III/II, 16′ III/I · 4′ III/III, 4′ III/II, 4′ III/I, 4′ III/P.",
            en: "Electric couplers: I/P, II/P, III/P, I/II, III/II, III/I · 16′ III/III, 16′ III/II, 16′ III/I · 4′ III/III, 4′ III/II, 4′ III/I, 4′ III/P."
          }
        ]
      }
    ]
  },

  "organisten-1987-2017": {
    lead: {
      de: "Konzertorganisten, die die Lisdorfer MAYER-Orgel von der Einspielung 1987 bis zum Jahr 2017 zum Klingen brachten.",
      en: "Concert organists who brought the Lisdorf MAYER organ to life from its inauguration in 1987 to the year 2017."
    },
    era: ERA_ORGANISTS,
    heroYear: "1987 – 2017",
    sections: [
      {
        eyebrow: { de: "Chronik", en: "Chronicle" },
        title: { de: "Konzerte 1987 bis 2017", en: "Concerts 1987 to 2017" },
        defaultOpen: true,
        listing: [
          { date: "25.10.1987", lines: ["Prof. Paul Schneider, Saarbrücken"] },
          { date: "02.11.1987", lines: ["Bernhard Welsch, Gerlfangen"] },
          { date: "01.03.1992", lines: ["Werner Glesner, Bischmisheim"] },
          { date: "05.09.1993", lines: ["Prof. Theo Brandmüller, Saarbrücken"] },
          { date: "14.08.1994", lines: ["Alexander Meyer, Saarbrücken"] },
          {
            date: "13.06.1996",
            lines: [
              {
                de: "Kirchenmusikdirektor Friedrich Fröschle, Ulm",
                en: "Director of church music Friedrich Fröschle, Ulm"
              }
            ]
          },
          { date: "15.06.1996", lines: ["Prof. Oleg Jantchenko, Moskau"] },
          { date: "18.10.1996", lines: ["Martin Folz, Schwalbach-Elm"] },
          { date: "01.07.1998", lines: ["Prof. Marie-Claire Alain, Paris"] },
          {
            date: "22.10.1999",
            lines: [
              {
                de: "Domorganist Carlo Hommel, Luxemburg",
                en: "Cathedral organist Carlo Hommel, Luxembourg"
              },
              "Bernhard Leonardy, Saarbrücken",
              "Philippe Delacour, Metz"
            ]
          },
          {
            date: "24.10.1999",
            lines: [
              "Dieter Buwen, Wintersdorf",
              { de: "Hans-Peter Hoffmann, Violine", en: "Hans-Peter Hoffmann, violin" }
            ]
          },
          { date: "03.07.2000", lines: ["Andreas Arand, Bonn"] },
          {
            date: "04.07.2000",
            lines: [
              {
                de: "Domorganist Gereon Krahforst, Paderborn",
                en: "Cathedral organist Gereon Krahforst, Paderborn"
              },
              "Andreas Arand, Bonn",
              "Michael Johannes, Düsseldorf"
            ]
          },
          {
            date: "28.06.2002",
            lines: [
              "Verene Guthy-Gomolka, Beilstein",
              "Jörg-Hannes Hahn, Stuttgart"
            ]
          },
          {
            date: "08.09.2002",
            lines: [
              {
                de: "Domorganist Hans-Jürgen Scholze, Dresden",
                en: "Cathedral organist Hans-Jürgen Scholze, Dresden"
              },
              "Prof. Peter Daum, Dresden"
            ]
          },
          { date: "13.10.2002", lines: ["Christian Brembeck, München"] },
          { date: "15.10.2002", lines: ["Prof. Michael Felix, Freiburg"] },
          {
            date: "18.10.2002",
            lines: [
              "Peter Maas, Merzig",
              "Andreas Mehs, Völklingen",
              "Michael Johannes, Lisdorf"
            ]
          },
          { date: "24.10.2002", lines: ["Andreas Cavelius, Krefeld"] },
          {
            date: "27.10.2002",
            lines: [
              "Jörg Abbing, Saarbrücken",
              { de: "Veit Stolzenberger, Oboe", en: "Veit Stolzenberger, oboe" },
              { de: "Naomi Grundke, Sopran", en: "Naomi Grundke, soprano" }
            ]
          },
          { date: "27.02.2005", lines: ["Prof. Joel Bacon, USA"] },
          { date: "10.04.2005", lines: ["Barbara Dennerlein, München"] },
          { date: "18.10.2005", lines: ["Thomas Gabriel, Seligenstadt"] },
          {
            date: "28.10.2005",
            lines: ["Prof. Karl-Ludwig Kreutz, Konz", "Rainer Oster, Saarbrücken"]
          },
          { date: "07.05.2006", lines: ["Armin Lamar, Lisdorf"] },
          {
            date: "20.09.2006",
            lines: [{ de: "Prof. Guy Bovet, Schweiz", en: "Prof. Guy Bovet, Switzerland" }]
          },
          { date: "25.02.2007", lines: ["Prof. Andreas Rothkopf, Saarbrücken"] },
          {
            date: "07.05.2007",
            lines: [
              { de: "Ignace Miechiels, Brügge", en: "Ignace Miechiels, Bruges" },
              "Schlubeck, Wuppertal"
            ]
          },
          { date: "10.10.2007", lines: ["Prof. Michael Radulescu, Wien"] },
          {
            date: "26.09.2008",
            lines: ["Detlef Helmer, Schwetzingen", "Josef Still, Trier"]
          },
          { date: "28.09.2008", lines: ["Dominic Susteck, Köln"] },
          { date: "02.04.2011", lines: ["Prof. Wolfgang Seifen, Berlin"] },
          {
            date: "23.09.2011",
            lines: ["Dominique Sauer, Osnabrück", "Christian Barthen, Saarbrücken"]
          },
          {
            date: "25.09.2011",
            lines: ["Prof. Jörg Abbing, Saarbrücken", "Ekkehard Rössle, Stuttgart"]
          },
          { date: "26.10.2012", lines: ["Armin Lamar", "Joel Schwarz"] },
          {
            date: "17.03.2013",
            lines: ["Rainer Oster", "Sabine Becker", "Gabriele May"]
          },
          {
            date: "22.05.2014",
            lines: [
              "Prof. Loïc Mallié, Lyon",
              "Dr. Thomas Daniel Schlee, Wien",
              "Prof. Rudolf Jungwirth, Eferding"
            ]
          },
          { date: "14.09.2014", lines: ["Lukas Stollhof, Oberwesel"] },
          {
            date: "14.08.2016",
            lines: [
              {
                de: "Prof. Martin Gester, Straßburg (F)",
                en: "Prof. Martin Gester, Strasbourg (F)"
              }
            ]
          },
          { date: "06.11.2016", lines: ["Christian Schmitt, Erbringen / Saar"] },
          { date: "29.04.2017", lines: ["Prof. Daniel Roth, Paris (F)"] },
          {
            date: "18.10.2017",
            lines: ["Andreas Hoffmann, Bous", "Markus Uhl, Heidelberg"]
          },
          {
            date: "22.10.2017",
            lines: [{ de: "Darko Pleli, Wien (A)", en: "Darko Pleli, Vienna (A)" }]
          },
          {
            date: "25.10.2017",
            lines: [{ de: "Wayne Marshall, London (GB)", en: "Wayne Marshall, London (GB)" }]
          }
        ]
      }
    ]
  },

  "organisten-2018-2025": {
    lead: {
      de: "Konzertorganisten an der Lisdorfer MAYER-Orgel in den Jahren 2018 bis 2025.",
      en: "Concert organists at the Lisdorf MAYER organ in the years 2018 to 2025."
    },
    era: ERA_ORGANISTS,
    heroYear: "2018 – 2025",
    sections: [
      {
        eyebrow: { de: "Chronik", en: "Chronicle" },
        title: { de: "Konzerte 2018 bis 2025", en: "Concerts 2018 to 2025" },
        defaultOpen: true,
        listing: [
          { date: "25.02.2018", lines: ["Prof. Andreas Rothkopf, Saarbrücken"] },
          {
            date: "26.09.2018",
            lines: [
              {
                de: "Eröffnung der 11. Orgelakademie",
                en: "Opening of the 11th organ academy"
              },
              "Prof. Michael Radulescu, Wien"
            ]
          },
          {
            date: "29.09.2018",
            lines: [
              {
                de: "Abschlusskonzert der Kursteilnehmer",
                en: "Final concert of the course participants"
              }
            ]
          },
          {
            date: "10.03.2019",
            lines: [
              {
                de: "Zuzana Ferjencikova, Slowenien",
                en: "Zuzana Ferjencikova, Slovenia"
              }
            ]
          },
          {
            date: "25.09.2019",
            lines: [
              {
                de: "Eröffnung der 11. Orgelakademie",
                en: "Opening of the 11th organ academy"
              },
              "Prof. Michael Radulescu, Wien"
            ]
          },
          {
            date: "28.09.2019",
            lines: [
              {
                de: "Abschlusskonzert der Kursteilnehmer",
                en: "Final concert of the course participants"
              }
            ]
          },
          {
            date: "27.09.2020",
            lines: [
              {
                de: "Preisträgerkonzert 9. Int. Kompositions-Wettbewerb",
                en: "Winners’ concert of the 9th International Composition Competition"
              },
              "Pavol Valásek, Prag"
            ]
          },
          {
            date: "28.09.2022",
            lines: [
              {
                de: "Eröffnung der 12. Orgelakademie",
                en: "Opening of the 12th organ academy"
              },
              "Prof. Vincent Dubois, Paris"
            ]
          },
          {
            date: "01.10.2022",
            lines: [
              {
                de: "Abschlusskonzert der Kursteilnehmer",
                en: "Final concert of the course participants"
              }
            ]
          },
          {
            date: "17.09.2023",
            lines: [
              {
                de: "Eröffnungskonzert der 10. Saarlouiser Orgeltage",
                en: "Opening concert of the 10th Saarlouis Organ Days"
              },
              "Prof. Jörg Abbing, Saarbrücken"
            ]
          },
          {
            date: "22.09.2023",
            lines: [
              { de: "Orgelnacht", en: "Organ night" },
              "Prof. Vincent Dubois, Paris"
            ]
          },
          {
            date: "25.09.2024",
            lines: [
              {
                de: "Eröffnung der 14. Orgelakademie",
                en: "Opening of the 14th organ academy"
              },
              "Prof. Vincent Dubois, Paris"
            ]
          },
          {
            date: "28.10.2024",
            lines: [
              {
                de: "Abschlusskonzert der Kursteilnehmer",
                en: "Final concert of the course participants"
              }
            ]
          },
          {
            date: "29.12.2024",
            lines: [
              { de: "Jahresschlusskonzert", en: "Year’s end concert" },
              "Markus Schaubel, Saarlouis"
            ]
          },
          {
            date: "16.02.2025",
            lines: [
              { de: "Orgelkonzert", en: "Organ recital" },
              "Tobias Rihm, Wallerfangen",
              "Markus Schaubel, Saarlouis"
            ]
          },
          {
            date: "30.03.2025",
            lines: [
              {
                de: "Junge Künstler, Festliche Klänge",
                en: "Young artists, festive sounds"
              },
              "Ioan Salaru, Mainz"
            ]
          },
          {
            date: "06.07.2025",
            lines: [
              {
                de: "Gedenkkonzert Albert Schweitzer",
                en: "Memorial concert for Albert Schweitzer"
              },
              "Prof. Bernhard Leonardy, Saarbrücken",
              "Prof. Vincent Dubois, Paris",
              "Markus Schaubel, Saarlouis"
            ]
          },
          {
            date: "12.10.2025",
            lines: [
              {
                de: "Eröffnung der 15. Orgelakademie",
                en: "Opening of the 15th organ academy"
              },
              "Prof. Vincent Dubois, Paris"
            ]
          },
          {
            date: "15.10.2025",
            lines: [
              {
                de: "Abschlusskonzert der Kursteilnehmer",
                en: "Final concert of the course participants"
              }
            ]
          },
          {
            date: "21.12.2025",
            lines: [
              { de: "Jahresschlusskonzert", en: "Year’s end concert" },
              "Tobias Rihm, Wallerfangen"
            ]
          }
        ]
      }
    ]
  }
};
