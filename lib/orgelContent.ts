export type DispositionGroup = {
  heading: string;
  stops: string[];
};

export type OrgelSection = {
  eyebrow?: string;
  title: string;
  defaultOpen?: boolean;
  paragraphs?: string[];
  quote?: string;
  disposition?: DispositionGroup[];
  listing?: { date: string; lines: string[] }[];
  footnote?: string;
};

export type OrgelChapter = {
  lead?: string;
  sections: OrgelSection[];
};

export const ORGEL_CONTENT: Record<string, OrgelChapter> = {
  "stumm-1861": {
    lead: "Die erste Orgel der Lisdorfer Pfarrkirche wurde 1861 aus Wallerfangen erworben. Ein Werk aus der Werkstatt der Gebrüder Stumm, einer der berühmtesten Orgelbauerdynastien Deutschlands.",
    sections: [
      {
        eyebrow: "Herkunft",
        title: "Aus Wallerfangen nach Lisdorf",
        defaultOpen: true,
        paragraphs: [
          "In den Archiven der Lisdorfer Kirchengemeinde und des Bistums Trier ist belegt, dass im Jahre 1861, also fast 100 Jahre nach dem Neubau der Lisdorfer Kirche, eine Orgel von der Kirchengemeinde Wallerfangen erworben wurde, die diese im Jahre 1841 bei der bekannten Orgelwerkstatt der Gebr. Stumm in Auftrag gegeben hatte.",
          "Durch den Neubau der Wallerfanger Pfarrkirche musste im Jahre 1861 die alte Kirche abgerissen werden. Laut einem Bericht im Pfarrbrief der Pfarrgemeinde bestand keine Möglichkeit, die Orgel für den Zeitraum des Neubaus zu lagern. Zudem „sei die Orgel für die neue Kirche zu klein“.",
          "Es war der Lisdorfer Pfarrer Gotthard Prinz, der in diesem Zeitraum dringend für die Lisdorfer Kirche ein passendes Orgelwerk suchte. Ein Glücksfall für Lisdorf, dass die Stumm-Orgel aus Wallerfangen zur Disposition stand. Mit dem dortigen Pfarrer Josef Schmitt verhandelte er den Kauf der inzwischen 18 Jahre alten Orgel. Der Kaufpreis in Höhe von 450 Thaler wurde laut nachstehender Empfangsbestätigung in bar entrichtet."
        ]
      },
      {
        eyebrow: "Die Orgelbauerdynastie",
        title: "Die Familie Stumm",
        paragraphs: [
          "Die Familie Stumm gehört zu den berühmtesten Orgelbauerdynastien Deutschlands. In sieben Generationen sind nach heutigem Forschungsstand über 370 Orgeln (davon 140 größtenteils bis heute erhalten) errichtet worden. Die Familie stammte aus Rhaunen-Sulzbach im Hunsrück. Von dort aus prägte sie über einen Zeitraum von fast zwei Jahrhunderten nachhaltig den mittelrheinischen Orgelbau. Konzentrierte sich das Wirkungsgebiet anfänglich auf den Hunsrück, reichte es schließlich vom Kölner Raum bis Saarbrücken, von Luxemburg bis in den Odenwald.",
          "Zum Zeitpunkt des Wallerfanger Orgelbaus wurde das Familienunternehmen in 4. Generation von Carl Stumm (Sohn von Philipp) und Franz Heinrich Stumm (Sohn von Friedrich Carl) geleitet.",
          "Die am 13.12.1840 erstellte Orgeldisposition umfasste 12 Register. Der Aufbau erfolgte im Jahre 1843. Der Kaufpreis betrug 760 Thaler."
        ]
      },
      {
        eyebrow: "Pfarrer Gotthard Prinz",
        title: "Der Lisdorfer Seelsorger",
        paragraphs: [
          "Pfarrer Gotthard Prinz wurde am 30. Dezember 1826 in St. Matthias bei Trier geboren. Nach der Priesterweihe im Jahre 1851 wirkte er als Kaplan in Vallendar und in Saarlouis. Seine erste Pfarrstelle erhielt er 1855 in Kastellaun, bevor er 1860 als Pfarrer der Kirchengemeinde Lisdorf-Ensdorf berufen wurde.",
          "Pfarrer Prinz war mit ganzem Herzen Priester. Die Zierde und Ausschmückung der ihm anvertrauten Gotteshäuser war für ihn eine Selbstverständlichkeit und bereitete ihm eine große Freude. So war es für ihn für die festliche Untermalung der Gottesdienste unerlässlich, den Kirchenraum möglichst bald, anstelle eines Harmoniums, mit einer Orgel auszustatten.",
          "Pfarrer Gotthard Prinz wurde im Jahre 1869 nach neunjährigem segensreichem Wirken in Lisdorf die Pfarrstelle in Ehrang übertragen. 1887 wurde er zum Direktor des Emeritenhauses ernannt. Er starb nach mehrjähriger Krankheit am 2. Februar 1893."
        ]
      },
      {
        eyebrow: "Aufbau 1861",
        title: "Johann Schlaad aus Waldlaubersheim",
        paragraphs: [
          "Am 16. März 1861 vereinbarte Pfarrer Gotthard Prinz mit dem Orgelbaumeister Johann Schlaad durch die Zahlung von 150 Thaler den ersten Lisdorfer Orgelaufbau. Die Orgelbaufirma stammte aus Waldlaubersheim am Mittelrhein. Das damalige Einzugsgebiet des angesehenen Unternehmens ist in etwa mit dem heutigen Gebiet von Rheinland-Pfalz und dem Saarland vergleichbar.",
          "Dem Firmenchef Johann Schlaad werden 76 Orgelneubauten zugeschrieben, unter anderem in Merzig, Schwalbach, Beckingen und Differten. Allein zwischen 1860 und 1870 entstanden 20 neue Orgelwerke. Durch die solide Bauweise der Orgeln und die Qualität der verwendeten Materialien sind bis heute noch 40 Werke des Orgelbauers erhalten. Orgelbaumeister Schlaad, an den noch ein Gedenkstein in Waldlaubersheim erinnert, starb 1892 im Alter von 70 Jahren."
        ]
      },
      {
        eyebrow: "Chorarbeit",
        title: "Der Männergesangverein und Michael Ritter",
        paragraphs: [
          "Zwei Jahre vor dem ersten Lisdorfer Orgelbau wurde im Jahre 1859 der Männergesangverein Lisdorf gegründet. In der Vereinschronik ist festgehalten, dass „als Geschenk von Pastor Gotthard Prinz im Jahre 1861 eine Kirchenorgel für Lisdorf beschaffen wurde“.",
          "Dirigent und Mitbegründer des Männergesangverein war Hauptlehrer Michael Ritter, der seit 1858 in Lisdorf tätig war. Weiter ist aus der Chronik zu erfahren, dass im Jahre 1862 Lehrer Ritter von Pfarrer Prinz die Organistenstelle angeboten wurde. Durch Verfügung der Königlichen Regierung zu Trier wurde Michael Ritter offiziell das Amt des Organisten und Chordirigenten übertragen, welches er bis zum Jahre 1885 ausübte.",
          "Durch diese Doppelfunktion des Chorleiters übernahmen der Männergesangverein und der Knabenchor des Vereins ab diesem Zeitpunkt auch die Funktion eines Kirchenchores."
        ]
      }
    ]
  },

  "stumm-erweiterung-1905": {
    lead: "Nach 43 Jahren Dienst wurde die Stumm-Orgel 1905 durch die renommierte Orgelbauanstalt Dalstein & Haerpfer aus Bolchen in Lothringen umgebaut und zu einem Werk mit 15 Registern auf zwei Manualen und Pedalwerk erweitert.",
    sections: [
      {
        eyebrow: "Nachfolge",
        title: "Pfarrer Karl Wehn und die Entscheidung zum Umbau",
        defaultOpen: true,
        paragraphs: [
          "Nachfolger von Pfarrer Gotthard Prinz wurde Pfarrer Karl Wehn, der sodann 37 Jahre lang die Geschicke der Pfarrgemeinde leitete. Pfarrer Wehn war es mit den Entscheidungsgremien der Kirchengemeinde vorbehalten, für den Umbau und die Erweiterung des im Jahre 1861 erworbenen und in die Jahre gekommenen Orgelinstrumentes zu sorgen.",
          "43 Jahre lang hatte das von der Pfarrgemeinde Wallerfangen erworbene Instrument der Lisdorfer Kirchengemeinde treue Dienste geleistet."
        ]
      },
      {
        eyebrow: "Dalstein & Haerpfer",
        title: "Der Auftrag an die Orgelbauanstalt in Bolchen",
        paragraphs: [
          "Die Orgelbauanstalt Dalstein & Haerpfer aus Bolchen (Lothringen) erhielt im Jahre 1904 den Auftrag zur Ausführung. Das Gebiet Lothringen mit seiner mehrheitlich deutschsprachigen Bevölkerung gehörte zu diesem Zeitpunkt zum Deutschen Reich.",
          "Die Orgelmanufacture wurde 1863 durch Johann Karl Haerpfer und Nicolas-Etienne Dalstein gegründet. Haerpfer erlernte bei der Firma Steinmeyer den Beruf des Orgelbauers und arbeitete danach bei den Firmen Walcker in Ludwigsburg und Haas in Luzern. Dalstein war bei der angesehenen Firma Cavaillé-Coll in Paris beschäftigt.",
          "Zum Zeitpunkt der Lisdorfer Auftragserteilung bestand die Firma Dalstein & Haerpfer schon über 40 Jahre und war als eines der gefragtesten Orgelbauunternehmen der damaligen Zeit hoch angesehen. Laut Firmenangaben wurden in diesem Zeitraum 175 Orgelwerke in ihrer Werkstatt gebaut und ausgeliefert, darunter große Orgelneubauten in Nancy, Luxemburg, Mühlhausen, Forbach und Metz.",
          "Der Auftrag beinhaltete den Umbau und die Erweiterung der vorhandenen Stumm-Orgel unter Verwendung der noch brauchbaren Teile zu einem 15 Register umfassenden Instrument auf 2 Manualen und einem Pedalwerk.",
          "Entsprechend des Dispositions- und Kostenanschlags vom 31. Oktober 1904 und dem Nachtrag vom 30. Juni 1905, der auch die Neuanschaffung eines Orgelgehäuses beinhaltete, betrugen die Gesamtkosten des Umbaus und der Erweiterung 5.135 Mark."
        ]
      },
      {
        eyebrow: "Erster Weltkrieg",
        title: "Beschlagnahme der Prospektpfeifen 1917",
        paragraphs: [
          "Die Amtszeit von Pfarrer Karl Wehn endete 1906. Ihm folgte Pfarrer Nikolaus Höffling, der bis 1915 der Pfarrgemeinde vorstand und schließlich von Pfarrer Joseph Spengler in der seelsorgerisch schwierigen Zeit des 1. Weltkrieges abgelöst wurde.",
          "Aus einem von ihm erstellten handschriftlichen Vermerk vom 1. April 1917 ist zu ersehen, warum Kriegszeiten auch für Orgelpfeifen keine guten Zeiten waren. Das Material von Orgelpfeifen wurde für Kriegszwecke benötigt und so wurden auch die Lisdorfer Prospektpfeifen beschlagnahmt."
        ],
        quote: "Am 28. März 1917 wurden durch die Orgelbauanstalt Dalstein & Haerpfer, Bolchen (Lothringen) infolge militärischer Beschlagnahme die Prospektpfeifen der Kirchenorgel (Prinzipal 8 und Octave 4) ausgebaut (dafür 34 M ausgezahlt) und an das Lager der Sammelstelle der Orgelbauanstalt Firma Hock, Saarlouis eingeliefert. Das Gewicht der Pfeifen betrug 61,5 kg; ihr Einheitspreis 6,30 M, ausbezahlt 387,45 M. Feste einmalige Vergütung 35 M, also Gesamtbetrag 422,45 M, welche an Kreissparkasse Saarlouis unter Sparkassenbuch Sammelfonds angelegt wurde."
      },
      {
        eyebrow: "Pfarrer Josef Spengler",
        title: "Engagement und Ehrenbürgerschaft",
        paragraphs: [
          "Pfarrer Josef Spengler war ein engagierter Priester. 1880 in Wüschheim / Hunsrück geboren, empfing er 1903 die Priesterweihe. Nach seiner Kaplanszeit in Wehrden / Saar wurde er zum Pfarrer von Lieg im Kreis Cochem ernannt. Von 1915 bis 1954 war er Pfarrer und Dechant in Saarlouis-Lisdorf.",
          "Aufgrund seiner großen Verdienste wurde ihm die Ehrenbürgerschaft der Stadt Saarlouis verliehen."
        ]
      },
      {
        eyebrow: "Disposition 1905",
        title: "Register der Dalstein & Haerpfer-Orgel",
        disposition: [
          {
            heading: "I. Manual",
            stops: [
              "1. Principal 8′",
              "2. Bourdon 16′ (neu)",
              "3. Flöte 8′",
              "4. Salicional 8′ (neu)",
              "5. Rohrflöte 4′",
              "6. Octave 4′",
              "7. Octave 2′"
            ]
          },
          {
            heading: "II. Manual",
            stops: [
              "8. Viola di Gamba 8′",
              "9. Vox-Coelestis 8′ (neu)",
              "10. Lieblich Gedeckt 8′",
              "11. Traversflöte 4′",
              "12. Trompete 8′"
            ]
          },
          {
            heading: "Pedal",
            stops: [
              "13. Subbass 16′",
              "14. Octavbass 8′",
              "15. Violonbass 8′"
            ]
          }
        ]
      }
    ]
  },

  "haerpfer-1944": {
    lead: "Im Zweiten Weltkrieg entschied sich die Gemeinde für einen Neubau durch die Firma Fritz Haerpfer aus Bolchen. Die Orgel mit 31 klingenden und 2 transmittierten Stimmen wurde am 6. Februar 1944 geweiht.",
    sections: [
      {
        eyebrow: "Beschluss 1941",
        title: "Der Auftrag an Fritz Haerpfer",
        defaultOpen: true,
        paragraphs: [
          "Der 20-köpfige Kirchenvorstand fasste unter dem Vorsitz von Pfarrer Josef Spengler am 21. Dezember 1941 den Beschluss, gemäß des Kostenanschlages vom 2. November 1941 der Orgelbaufirma Fritz Haerpfer aus Bolchen (Lothringen) eine Orgel mit 31 klingenden und 2 transmittierten Stimmen zum Preise von 20.177,14 Reichsmark anzuschaffen."
        ],
        quote: "Die vorhandene Orgel mit 15 Registern ist im Jahre 1905 umgebaut worden. Es wurden die noch brauchbaren Register von der alten Orgel übernommen. Ein Register musste, weil verfault, herausgenommen werden. Der Spieltisch ist, wie vom Orgelbauer Reimsbach aus Wallerfangen festgestellt wurde, vom Wurm zerfressen und kann jeden Tag unbrauchbar werden. Die Pfarrkirche ist wesentlich vergrößert worden und die vorhandene Orgel reicht für eine gefüllte Kirche nicht aus. Die Orgel ist so aufgestellt, dass die Raumverhältnisse für den Kirchenchor ungünstig sind."
      },
      {
        eyebrow: "Finanzierung",
        title: "Grundsteuer, Vermögenssteuer und Anleihe",
        paragraphs: [
          "Aus dem Vorstandsbeschluss geht hervor, dass 9.800 RM zur Finanzierung vorhanden sind und 6.000 RM aus Einnahmen des Jahres 1941 aufgrund von Grundsteuer-Messbeträgen, der Vermögenssteuer und aus dem Kirchgeld beglichen werden. Der Restbetrag von 4.300 RM soll durch eine Anleihe bei der hiesigen Spar- und Darlehnskasse aufgenommen und im Etatsjahr 1942 abgetragen werden.",
          "Das bischöfliche Generalvikariat Trier stimmte am 5. Januar 1942 den Beschlüssen zum Orgelbau durch die Firma Fritz Haerpfer zu. Die Orgel-Disposition wurde von dem Trierer Domkapellmeister Johannes Klassen (1904 bis 1957) geprüft und aufgrund seiner Anregung um ein Register und 2 Transmissionsstimmen erweitert."
        ]
      },
      {
        eyebrow: "Verzögerung",
        title: "Zwei Jahre Wartezeit bis zur Fertigstellung",
        paragraphs: [
          "Die Kirchengemeinde hatte im Vertrag mit dem Orgelbauer eine Lieferzeit von „voraussichtlich 6 bis 8 Monaten“ vereinbart. Eine Garantie konnte aber „wegen der Kriegsereignisse“ nicht übernommen werden.",
          "Tatsächlich mussten sich die Lisdorfer noch über zwei Jahre bis zur Fertigstellung der Orgel gedulden. Aus einem Brief von Pfarrer Spengler an den Orgelbauer unter dem Datum vom 30. August 1943 wird die Ungeduld und die Verärgerung über die Verzögerung des Orgelbaus deutlich.",
          "Aus dem Schreiben geht hervor, dass im Frühjahr die alte Lisdorfer Orgel von der Firma Haerpfer abgebaut und nach Piesbach „geschafft und dort aufgebaut wurde“. Zugesagt war aber, zuerst die Lisdorfer Orgel aufzubauen. Entgegen dieser Abmachung und trotz der vielfachen Versprechungen des Orgelbauers mussten die Lisdorfer Gläubigen lange auf den Orgelklang verzichten."
        ]
      },
      {
        eyebrow: "Orgelweihe",
        title: "6. Februar 1944, mitten im Krieg",
        paragraphs: [
          "Endlich war es dann soweit, dass am 6. Februar 1944 die Orgelweihe im Rahmen eines Kirchenkonzertes durch den Domvikar Dr. Schwickerath, Trier stattfinden konnte. Konzertmitwirkende waren die Sopranistin Maria Comes-Strauß, Trier, der Trierer Domchor unter der Leitung von Domkapellmeister Johannes Klassen und der Organist Heinrich Weber, Aachen."
        ]
      },
      {
        eyebrow: "Kriegsschäden",
        title: "Granatsplitter und Reparaturen",
        paragraphs: [
          "Die in den Wirren des II. Weltkrieges erbaute Orgel blieb vor Kriegsschäden nicht verschont. Dieses belegt ein Kollektenaufruf von Pfarrer Joseph Spengler."
        ],
        quote: "Nächsten Sonntag ist eine Hauskollekte, vor allem für die Reparatur der Orgel. Neben den Schäden durch allzu große Hitze 1947 und 1949 und durch allzu große Feuchtigkeit im Winter 1948 sind bei den Reparaturen eine ganze Reihe von Schäden durch Granatsplitter gefunden worden, die viele Pfeifen durchschlagen haben. Die Gläubigen werden dringend gebeten, soweit es in ihren Kräften steht, diese Kollekte für die Reparatur der Orgel in besonderer Weise bedenken zu wollen."
      },
      {
        eyebrow: "Nachkriegsjahre",
        title: "Brüchige Membranen und fehlende Eidotter",
        paragraphs: [
          "Die Orgel hatte auch in den Folgejahren umfangreiche Reparaturen zu überstehen. Im letzten Jahr seines Lisdorfer Wirkens schloss Pfarrer Spengler im Mai 1954 noch einen umfangreichen Wartungsvertrag mit der Orgelbaufirma Haerpfer & Erman ab. Im Herbst des gleichen Jahres stellten die Orgelbauer fest, dass sämtliche Membranen der rund 2000 Pfeifen umfassenden Orgel brüchig sind und ersetzt werden müssen.",
          "Begründet wurden die gravierenden Mängel damit, dass für die fachgerechte Gerbung des Schafspaltleders in den Kriegsjahren die Eidotter fehlten."
        ]
      },
      {
        eyebrow: "Pfarrer Alois Löw",
        title: "Deckeneinsturz und Renovierung durch Hugo Mayer",
        paragraphs: [
          "Nachfolger von Pfarrer und Dechant Josef Spengler wurde Pfarrer Alois Löw, der in Lisdorf bis 1966 tätig war. Er stammte aus Labach und wirkte vor der Amtsübernahme in Lisdorf in Oberkirchen und Wallhausen.",
          "Nach dem teilweisen Einsturz der Kirchendecke am 19. Dezember 1959 hatte Pfarrer Löw mit den kirchlichen Gremien die riesige Verantwortung, die architektonische Umgestaltung des Kircheninnenraumes durchzuführen. Die durch den Deckeneinsturz verursachten Schäden waren sowohl im Kirchenraum, als auch an der Orgel erheblich. Der gesamte Kirchenraum konnte erstmals wieder ab dem 15. August 1961 genutzt werden.",
          "Ein Jahr länger dauerte es, bis am 5. August 1962 nochmals die stark in Mitleidenschaft gezogene Orgel erklingen konnte. Der Kirchenvorstand beauftragte den Orgelbaumeister Hugo Mayer aus Heusweiler mit der Renovierung. Hugo Mayer, 1912 in Wengen / Allgäu geboren, legte 1948 die Meisterprüfung ab und gründete 1952 seine eigene Werkstatt in Brebach / Saar. Im Jahre 1957 wurde diese in größere Räume nach Heusweiler, dem heutigen Firmensitz, verlagert.",
          "Beim Orgelabbau stellte Hugo Mayer einen starken Holzwurmbefall fest. Zur Verhinderung eines Fortschreitens des Insektenfraßes war es notwendig, die Holzteile mit einem Holzschutzmittel zu imprägnieren. Der Renovierungsauftrag umfasste auch den Einbau einer elektrischen Traktur und die Erneuerung des Spieltisches."
        ]
      },
      {
        eyebrow: "Ab 1968",
        title: "Pfarrer Ernst Seiwert und das Ende der Haerpfer-Orgel",
        paragraphs: [
          "Wenige Jahre später zeigte sich, dass die im Kirchenraum im Jahre 1961 eingebaute Holzdecke der Orgel weitere Schäden zufügte. Aufgrund der tiefen Abhängung fehlte über dem Orgelwerk ein ausreichender Luftzirkulationsraum. Die Umstellung der Kirchenraumbeheizung auf Ölfeuerung führte zu einer nochmaligen Reduzierung der Luftfeuchtigkeit. Die Folge war eine starke Rissbildung an den Holzteilen der Orgel.",
          "Diesem Problem stellte sich ab dem Jahre 1968 der Nachfolger von Pfarrer Löw, Pfarrer Ernst Seiwert. Der aus Saarlouis-Roden stammende Geistliche hatte 1951 im Trierer Dom die Priesterweihe empfangen, war 6 Jahre Kaplan in Mühlheim bei Koblenz und 9 Jahre Pfarrer von Biebern / Hunsrück. Am 11. Dezember 1966 kam er als Pfarrherr nach Lisdorf.",
          "Er erbat 1968 von drei Orgelbaufirmen und dem Orgelreferat des Bistums deren Einschätzung zum Zustand der im Jahre 1944 erbauten Orgel. Das Hauptproblem lag bei den Windladen, die als Taschenladen vorhanden massive Rissbildungen zeigten. Eine kostenintensive Reparatur schien nicht empfehlenswert. Dieses übereinstimmende Ergebnis wurde vom Orgelsachverständigen des Bistums Wolfgang Oehms bestätigt.",
          "Im Jahre 1970 entschied der Kirchenvorstand, vordringlich die fachgerechte Entlüftung des Kirchenraumes in Angriff zu nehmen und die anstehende Sanierung des Innenraumes der Pfarrkirche zügig anzugehen. Die Orgelbaufirma Haerpfer & Erman wurde beauftragt, „einige Register“ der Orgel bespielbar zu machen.",
          "Dennoch sollte es noch über 10 Jahre dauern, bis die substanzerhaltende Renovierung der Pfarrkirche abgeschlossen werden konnte und die räumlichen und klimatechnischen Voraussetzungen für das Funktionieren eines Orgelinstrumentes gegeben waren. Im Rahmen der Kirchensanierung musste 1975 die Orgelempore erneuert werden, das Orgelwerk abgebaut und vorübergehend in einer Scheune in Lisdorf gelagert werden. Im Februar 1979 wurde das Orgelwerk für eine eventuell in Frage kommende Restaurierung zur Orgelbaufirma Haerpfer nach Boulay verbracht.",
          "Eine dort durchgeführte nochmalige Bestandsanalyse brachte die Erkenntnis, dass das Orgelwerk mit enormen Materialschäden versehen war und ein Wiederaufbau, auch aufgrund der mangelhaften Technik, bei einer sinnvollen Sanierung praktisch einem Neubau gleich käme und daher nicht ratsam schien."
        ]
      },
      {
        eyebrow: "Disposition",
        title: "Registratur unter Verwendung der alten Pfeifen",
        disposition: [
          {
            heading: "I. Manual",
            stops: [
              "1. Principal 8′",
              "2. Bourdon Gedeckt 16′",
              "3. Flöte 8′",
              "4. Salicional 8′",
              "5. Gedeckt 8′",
              "6. Octave 4′",
              "7. Rohrflöte 4′",
              "8. Oktave 2′",
              "9. Mixtur, Kornett",
              "10. Trompete 8′"
            ]
          },
          {
            heading: "II. Manual",
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
              "21. Cymbel Mixtur 4 bis 5 fach",
              "22. Fagott 16′",
              "23. Trompete 8′",
              "24. Trompete 4′"
            ]
          },
          {
            heading: "Pedal",
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
    lead: "1982 fasste der Verwaltungsrat den mutigen Beschluss, aus eigenen Kräften eine neue Orgel zu bauen. Fünf Jahre später, am 23. Oktober 1987, erklang die MAYER-Orgel zum ersten Mal.",
    sections: [
      {
        eyebrow: "1982",
        title: "Der Entschluss und die Gründung des Orgelbaufördervereins",
        defaultOpen: true,
        paragraphs: [
          "Nach langer Zeit des Überlegens fasste der Verwaltungsrat Anfang 1982 den mutigen Entschluss, aus eigenen Kräften, vertrauend auf die Opferbereitschaft der Lisdorfer Gemeinde, eine neue Orgel zu bauen. Finanzielle Grundlage hierfür war eine großzügige Spende, die zweckbestimmt für den Orgelbau zur Verfügung stand. Aber auch die Tatsache, dass das Vorhaben bereits in der Diskussionsphase von vielen Lisdorfern ideell begeistert mitgetragen wurde, erleichterte dem Beschlussgremium die Entscheidung.",
          "Der eigens dafür am 22. April 1982 gegründete Orgelbauförderverein der Kath. Kirchengemeinde Lisdorf übernahm engagiert die Aufgabe, für die Gesamtfinanzierung des Orgelbaus Sorge zu tragen. Die Zahl der Mitglieder wuchs stetig, sodass die mittelfristige Finanzierbarkeit des Orgelwerkes bereits nach kurzer Zeit wahrscheinlich wurde."
        ]
      },
      {
        eyebrow: "Planung",
        title: "Prof. Paul Schneider, Werner Glesner und die Ausschreibung",
        paragraphs: [
          "Die Gemeinde konnte sich glücklich schätzen, sowohl mit dem Orgel-Professor Paul Schneider, Saarbrücken als auch mit Dipl.-Ing. Werner Glesner, techn. Direktor beim Saarländischen Rundfunk, über zwei unabhängige Ratgeber zu verfügen. Werner Glesner erstellte in enger Abstimmung mit Prof. Paul Schneider, Pastor Ernst Seiwert und Vertretern des Verwaltungsrates die Ausschreibung für ein 36-Register umfassendes Orgelwerk.",
          "Nach unzähligen Diskussionsabenden, Skizzierungen, Kostenkalkulationen, Finanzierungsmodellen und Orgelbesichtigungen war es dann möglich, das Lisdorfer Orgelwerk am 10. September 1984 auszuschreiben.",
          "Bereits im Dezember 1984 konnten die Entscheidungsträger über drei Angebote aus Deutschland und je eine Offerte aus Frankreich und der Schweiz verfügen. Für alle Anbieter war es eine Herausforderung und Ansporn zugleich, für den bedeutenden sakralen Kirchenraum ein Orgelwerk zu schaffen, das sowohl optisch als auch akustisch allen Erfordernissen gerecht wird. Die Entscheidung des Verwaltungsrates fiel nach eingehender Prüfung und Bewertung der Angebotsunterlagen im Dezember 1984 zugunsten der saarländischen Orgelbaufirma Hugo Mayer, Heusweiler."
        ]
      },
      {
        eyebrow: "Hugo Mayer, Heusweiler",
        title: "Die Orgelmanufaktur von Gerd Mayer",
        paragraphs: [
          "Diese Orgelmanufaktur wird seit dem Jahre 1974 vom Sohn des Firmengründers, Herrn Gerd Mayer, geleitet. Er trat 1957 als Auszubildender in die Werkstatt seines Vaters ein. Nach der Gesellenprüfung war er unter anderem in Frankreich und Amerika tätig. Er legte 1966 als jüngster deutscher Orgelbauer die Meisterprüfung vor der Handwerkskammer in Stuttgart ab.",
          "Nach dem Verwaltungsratsbeschluss wurde in engstem Zusammenwirken zwischen dem Orgelbauer, den ehrenamtlichen Ratgebern Prof. Schneider und Dipl.-Ing. Glesner, dem Architekten Tibor Kugelmann sowie den Vertretern der Kirchengemeinde das endgültige Klangbild der neu zu erbauenden Orgel und die Gestaltung des Orgelprospektes entwickelt."
        ]
      },
      {
        eyebrow: "Disposition",
        title: "Drei weitere Register durch spontane Spenden",
        paragraphs: [
          "In einer dieser Arbeitssitzungen, bei der es hauptsächlich um die Disposition der Registrierung ging, wurde nachhaltig zur Verbesserung des Klangbildes dafür plädiert, drei Register zusätzlich einzuplanen. Hierfür konnte aus Kostengründen seitens der Kirchengemeinde keine Zusage gemacht werden. Spontan spendeten daraufhin zwei der anwesenden Sitzungsteilnehmer die finanziellen Gegenwerte der drei Register, sodass ein Orgelwerk mit insgesamt 39 klingenden Registern in Auftrag gegeben wurde. Der Orgelbauer wurde auch beauftragt, die Möglichkeit für den späteren Einbau von nochmals vier weiteren Registern vorzusehen.",
          "Nach der Bewilligung der bischöflichen Behörde vom 22. April 1985 erteilte die Kirchengemeinde am 27. April 1985 den verbindlichen Auftrag zur Erstellung des Orgelwerkes, noch ohne Schnitzwerk, der saarländischen Orgelbaufirma Hugo Mayer aus Heusweiler.",
          "Laut Werklieferungsvertrag betrug die Fertigungszeit 24 Monate. Im Hinblick auf den 1700. Todestag der Schutzpatrone Crispinus und Crispinianus am 25. Oktober 1987 beabsichtigte die Kirchengemeinde, das Fest der Orgelweihe zusammen mit diesem für die Pfarrei wichtigen Ereignis zu feiern."
        ]
      },
      {
        eyebrow: "Künstlerischer Anspruch",
        title: "Harmonie von Raum und Instrument",
        paragraphs: [
          "Der künstlerische Wert einer Orgel setzt ein harmonisches Zusammenspiel von Architektur, Prospektgestaltung, Disposition und letztlich einer vollendeten Intonation voraus. Bei der Planung der Lisdorfer Orgel galt es im Besonderen, das neue Orgelwerk harmonisch dem barocken Charakter des Innenraumes der Kirche so anzupassen, dass eine homogene Einheit und eine Wechselbeziehung zwischen Raum und dem Orgelwerk entstehen.",
          "Die dafür erforderlichen Überlegungen und Grundlagen waren immer wieder zwingende Bestandteile der einzelnen Planungsschritte. Insbesondere ist es Pastor Ernst Seiwert zu danken, dass dieser Grundsatz in Lisdorf zur Realität wurde. Für ihn war der Orgelbau, baulich gesehen, der krönende Abschluss seines priesterlichen Wirkens in Lisdorf.",
          "Pfarrer Ernst Seiwert wurde am 5. September 1986 im Rahmen eines großen Pfarrfestes, dessen Erlös dem Orgelbaufonds zufloss, nach 20-jähriger segensreicher Tätigkeit in Lisdorf in den wohlverdienten Ruhestand verabschiedet. Er hinterließ der Pfarrei ein gut funktionierendes Pfarrzentrum, das die Kirchengemeinde heute noch auszeichnet.",
          "Sein Nachfolger Pfarrer Karl Detemple, der am 29. März 1987 als neuer Seelsorger in Lisdorf eingeführt wurde, begleitete die Orgelfertigstellung. Die hoch qualifizierten Mitarbeiter der Orgelbaumanufaktur Hugo Mayer schafften es in der vorgegebenen Bauzeit ein Instrument zu bauen, das bis heute von Orgelkennern sehr geschätzt wird."
        ]
      },
      {
        eyebrow: "23. Oktober 1987",
        title: "Die Orgelweihe durch Regionaldekan Albert André",
        paragraphs: [
          "Die würdige und eindrucksvolle Orgelweihe durch Regionaldekan Albert André (Mitzelebranten waren Dechant Anton Heidger, Pfarrer Karl Detemple sowie die ehemaligen Lisdorfer Pfarrherren Alois Löw und Ernst Seiwert) erfolgte am 23. Oktober 1987 im Rahmen der Feierlichkeiten zum 1700. Todestag der Schutzpatrone der Pfarrkirche „St. Crispinus und Crispinianus“.",
          "Eindrucksvoll war auch die orgelmusikalische Gestaltung dieser Feierstunde durch Prof. Paul Schneider und den Lisdorfer Kirchenchor. Somit konnte bereits nach 5-jähriger Planungs- und Bauzeit der erste große Bauabschnitt des Lisdorfer Orgelneubaus erfolgreich abgeschlossen werden.",
          "Am 25. Oktober 1987 lockte das erste Orgelkonzert viele Besucher aus nah und fern an. Andreas Arand, einem gebürtigen Lisdorfer, wurde die Ehre zuteil, die neue Orgel „einzuspielen“. Andreas Arand studierte bei Prof. Paul Schneider (Musikhochschule Saarbrücken) und Prof. Michael Schneider (Musikhochschule Köln). Er war 18 Jahre Organist der Kreuzbergkirche in Bonn und ist Lehrbeauftragter an der Musikhochschule in Saarbrücken."
        ]
      },
      {
        eyebrow: "Prospekt",
        title: "Barockes Gehäuse und Schnitzwerk von Mrziglod",
        paragraphs: [
          "Nach der Orgelweihe begann die Entscheidungsphase über das Aussehen und die Gestaltung des Orgelprospektes. Nach langen und schwierigen Überlegungen der kirchlichen Gremien, dem Architekten und Orgelbauer entschied man sich für ein Orgelgehäuse mit barockem Prospekt, getreu den Vorbildern der bekannten Meister.",
          "Die notwendige Abstimmung mit dem bischöflichen Amt für Denkmalpflege und dem Diözesanarchitekt war schwierig. Nach Ansicht der bischöflichen Behörde war es nicht sinnvoll, eine neue Orgel mit einem neu zu rekonstruierenden Barockprospekt zu umbauen. Dennoch kam man zum Ergebnis, der Kirchengemeinde die Zustimmung zur Ausführung nicht zu versagen, „wenn von ihr die Verantwortung im oben beschriebenen Sinne getragen werden kann“. Die baufachliche Zustimmung für die von der Kirchengemeinde geplante Ausführung des Orgelprospektes wurde am 21. Februar 1989 vom Bistum erteilt.",
          "So wurde nach den Wünschen der Gemeinde, des Orgelbauers und des Architekten ein Orgelprospekt mit schweren geschwungenen Gesimsen und Profilen in starkem Eichenholz konzipiert, das trotzdem einen leichten und grazilen Gesamteindruck macht.",
          "Zu Beginn des Jahres 1990 war es soweit, dass durch die Orgelbaufirma Mayer die noch fehlenden, aber bereits eingeplanten vier Register eingebaut wurden. Weiterhin konnte die saarländische Restauratorenfirma Günter Mrziglod, Tholey mit der Herstellung des barocken Schnitzwerkes beauftragt werden. 34 prunkvolle Schleierbretter und Zapfen, aus Zirbelholz von Spezialisten in Südtirol handgeschnitzt, zieren seit Juni 1990 das Lisdorfer Orgelwerk.",
          "Die Fertigstellung der Gesamtmaßnahme rückte nun in greifbare Nähe. Trotzdem dauerte es bis zur Vollendung der farblichen Gestaltung des Orgelprospekts, die in Anpassung an die vorgegebenen Farbbilder des Altars, der Kanzel und der Beichtstühle erfolgte, noch über zwei Jahre. Im November 1992 war es dann soweit, dass das vor rund 10 Jahren begonnene Werk vollendet wurde."
        ]
      },
      {
        eyebrow: "Finanzierung",
        title: "815.898,62 DM aus eigener Kraft",
        paragraphs: [
          "Die Planung und die Ausführung des Orgelwerkes erforderte Mut, Verhandlungsgeschick, Ausdauer und das Überwinden zahlreicher Hürden. Manche Hürden hat die Gemeinde schnell genommen, andere haben ihr Kopfzerbrechen bereitet. Ein Orgelbau dieser Größenordnung ist für eine 3000 Seelen umfassende Gemeinde nicht selbstverständlich. Anderenorts werden oftmals, wenn überhaupt, nur Minimalprogramme verwirklicht. Lisdorf, eine engagierte Gemeinde, hat sich für ein Maximalprogramm entschieden.",
          "Als Glücksgriff erwies sich die Gründung des Orgelbauvereins, der souverän den sich selbst gegebenen Satzungsauftrag, nämlich für die Finanzierung des Instrumentes Sorge zu tragen, innerhalb von 10 Jahren erfüllte. Die Bemühungen des aktiven und ideenreichen Vorstandes und der 230 Vereinsmitglieder wurden durch eine große Zahl von Einzelspendern gefördert.",
          "Besonders erwähnenswert ist die tatkräftige Unterstützung der Lisdorfer Vereine, ohne deren Mitwirken die Lösung der großen Gemeinschaftsaufgabe wesentlich schwieriger gewesen wäre. Aufbauend auf deren großer Verlässlichkeit wurden drei attraktive Zeltveranstaltungen durchgeführt, deren Erlöse jeweils dem Orgelbaufond zuflossen.",
          "Die vom Orgelbauförderverein im Jahre 1984 ins Leben gerufene Konzertreihe „Klingende Kirche“ wurde sehr gut angenommen. Hier waren es hauptsächlich die kulturellen Vereine Lisdorf, die für beachtliche Konzerterlöse sorgten, die dem Orgelbau zugute kamen.",
          "Am Schluss aller Bemühungen war es geschafft, den für den Orgelbau erforderlichen Finanzierungsbetrag in Höhe von insgesamt 815.898,62 DM zu erwirtschaften. Bemerkenswert ist, dass dabei Beträge der Kirchengemeinde und des Bistums nicht zur Verfügung standen und die Zuschussanträge seitens der Kommunen jeweils abgelehnt wurden."
        ]
      },
      {
        eyebrow: "1993",
        title: "Gründung des Fördervereins „Klingende Kirche“",
        paragraphs: [
          "Der Lisdorfer Orgelbauförderverein löste sich im Januar 1993 wegen Erreichung des Vereinszweckes auf. Der Vorstand und die 230 Mitglieder begriffen dieses Ende jedoch nicht als Schlusspunkt ihres Engagements. Sie gründeten den Förderverein „Klingende Kirche der Kath. Kirchengemeinde Lisdorf e.V.“, mit der Zielsetzung, ein Forum zu schaffen, das die lange Tradition der Kirchenmusik in Lisdorf lebendig hält, aber auch Impulse für das Entstehen neuer musikalischer Entwicklungen gibt.",
          "Satzungszweck des Vereins ist, die Kirchenmusik in der Pfarrkirche Crispinus und Crispinianus in Saarlouis-Lisdorf zu fördern sowie das wertvolle Orgelwerk zu pflegen und zu unterhalten. Dieses Ziel wird zwischenzeitlich von 330 Mitgliedern ideell und finanziell begleitet.",
          "Innerhalb der Konzertreihe der Lisdorfer „Klingenden Kirche“ wurden seither 157 Konzerte durchgeführt. Aufgrund der Vereinsinitiativen wurden aber auch bedeutende orgelspezifische Veranstaltungen wie der Internationale Saarlouiser Orgel-Kompositionswettbewerb, die Saarlouiser Orgeltage und die Europäische Orgelakademie geschaffen. Dadurch ist die Lisdorfer Pfarrkirche mit ihrer bemerkenswerten Orgel zu einem Markenzeichen anspruchsvoller Orgelmusik und kirchenmusikalischen Veranstaltungen geworden."
        ]
      },
      {
        eyebrow: "Pflege und Erweiterung",
        title: "2006 Registererweiterung, 2011 Generalreinigung",
        paragraphs: [
          "Der Förderverein „Klingende Kirche“ hat entscheidend zu dem hohen Stellenwert beigetragen, den die Stadt Saarlouis im Bereich der Kirchenmusik genießt. Der Pflege und Unterhaltung des Orgelwerkes kommt innerhalb des Vereinszweckes eine besondere Bedeutung zu.",
          "So konnte im Jahre 2006, ausschließlich mit Mitteln des Vereins, die Orgel um den Einbau von zwei Registern sowie einer elektronischen Setzeranlage und Doppelregistratur erweitert werden. Mit der im Jahre 2011 erfolgten Generalreinigung des Orgelwerkes sind die besten Voraussetzungen einer künftigen hervorragenden orgelmusikalischen Nutzung geschaffen worden.",
          "Die Lisdorfer Orgel setzt klingende Zeichen. Möge sie uns noch viele Jahre in Freud und Leid begleiten und unsere Verbundenheit zur Kirche auch den kommenden Generationen künden."
        ],
        footnote: "Manfred Boßmann"
      },
      {
        eyebrow: "Gebet",
        title: "Aus der Liturgie der Orgelweihe",
        quote: "Großer Gott, unsere Orgel ertöne zu Deiner Ehre und hebe unsere Herzen zu Dir empor. Wie die vielen Pfeifen sich in einem Klang vereinen, so lass uns als Glieder Deiner Kirche in gegenseitiger Liebe und Brüderlichkeit verbunden sein."
      },
      {
        eyebrow: "Disposition",
        title: "Die klingende Gestalt der MAYER-Orgel",
        disposition: [
          {
            heading: "I. Manual C bis g3 · Positiv",
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
              "Tremulant"
            ]
          },
          {
            heading: "II. Manual C bis g3 · Hauptwerk",
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
            heading: "III. Manual C bis g3 · Schwellwerk",
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
              "Carillon mit 29 Bronzeglocken",
              "Tremulant"
            ]
          },
          {
            heading: "Pedalwerk C bis f1",
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
        eyebrow: "Technik",
        title: "Effektregister, Trakturen und Koppeln",
        paragraphs: [
          "III/P/46+2 Effektregister · Rossignol · Baujahr 1987, Opus 267 · Cymbelstern · mechanische Trakturen.",
          "Setzerkombination mit 6.336 Einzelkombinationen und USB-Stick-Speichermöglichkeit.",
          "Gehäuse: massive Eiche, marmoriert und vergoldet.",
          "Elektrische Koppeln: I/P, II/P, III/P, I/II, III/II, III/I · 16′ III/III, 16′ III/II, 16′ III/I · 4′ III/III, 4′ III/II, 4′ III/I, 4′ III/P."
        ]
      }
    ]
  },

  "organisten-1987-2017": {
    lead: "Konzertorganisten, die die Lisdorfer MAYER-Orgel von der Einspielung 1987 bis zum Jahr 2017 zum Klingen brachten.",
    sections: [
      {
        eyebrow: "Chronik",
        title: "Konzerte 1987 bis 2017",
        defaultOpen: true,
        listing: [
          { date: "25.10.1987", lines: ["Prof. Paul Schneider, Saarbrücken"] },
          { date: "02.11.1987", lines: ["Bernhard Welsch, Gerlfangen"] },
          { date: "01.03.1992", lines: ["Werner Glesner, Bischmisheim"] },
          { date: "05.09.1993", lines: ["Prof. Theo Brandmüller, Saarbrücken"] },
          { date: "14.08.1994", lines: ["Alexander Meyer, Saarbrücken"] },
          { date: "13.06.1996", lines: ["Kirchenmusikdirektor Friedrich Fröschle, Ulm"] },
          { date: "15.06.1996", lines: ["Prof. Oleg Jantchenko, Moskau"] },
          { date: "18.10.1996", lines: ["Martin Folz, Schwalbach-Elm"] },
          { date: "01.07.1998", lines: ["Prof. Marie-Claire Alain, Paris"] },
          {
            date: "22.10.1999",
            lines: [
              "Domorganist Carlo Hommel, Luxemburg",
              "Bernhard Leonardy, Saarbrücken",
              "Philippe Delacour, Metz"
            ]
          },
          {
            date: "24.10.1999",
            lines: ["Dieter Buwen, Wintersdorf", "Hans-Peter Hoffmann, Violine"]
          },
          { date: "03.07.2000", lines: ["Andreas Arand, Bonn"] },
          {
            date: "04.07.2000",
            lines: [
              "Domorganist Gereon Krahforst, Paderborn",
              "Andreas Arand, Bonn",
              "Michael Johannes, Düsseldorf"
            ]
          },
          {
            date: "28.06.2002",
            lines: ["Verene Guthy-Gomolka, Beilstein", "Jörg-Hannes Hahn, Stuttgart"]
          },
          {
            date: "08.09.2002",
            lines: [
              "Domorganist Hans-Jürgen Scholze, Dresden",
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
              "Veit Stolzenberger, Oboe",
              "Naomi Grundke, Sopran"
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
          { date: "20.09.2006", lines: ["Prof. Guy Bovet, Schweiz"] },
          { date: "25.02.2007", lines: ["Prof. Andreas Rothkopf, Saarbrücken"] },
          {
            date: "07.05.2007",
            lines: ["Ignace Miechiels, Brügge", "Schlubeck, Wuppertal"]
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
          { date: "14.08.2016", lines: ["Prof. Martin Gester, Straßburg (F)"] },
          { date: "06.11.2016", lines: ["Christian Schmitt, Erbringen / Saar"] },
          { date: "29.04.2017", lines: ["Prof. Daniel Roth, Paris (F)"] },
          {
            date: "18.10.2017",
            lines: ["Andreas Hoffmann, Bous", "Markus Uhl, Heidelberg"]
          },
          { date: "22.10.2017", lines: ["Darko Pleli, Wien (A)"] },
          { date: "25.10.2017", lines: ["Wayne Marshall, London (GB)"] }
        ]
      }
    ]
  },

  "organisten-2018-2025": {
    lead: "Konzertorganisten an der Lisdorfer MAYER-Orgel in den Jahren 2018 bis 2025.",
    sections: [
      {
        eyebrow: "Chronik",
        title: "Konzerte 2018 bis 2025",
        defaultOpen: true,
        listing: [
          { date: "25.02.2018", lines: ["Prof. Andreas Rothkopf, Saarbrücken"] },
          {
            date: "26.09.2018",
            lines: [
              "Eröffnung der 11. Orgelakademie",
              "Prof. Michael Radulescu, Wien"
            ]
          },
          { date: "29.09.2018", lines: ["Abschlusskonzert der Kursteilnehmer"] },
          { date: "10.03.2019", lines: ["Zuzana Ferjencikova, Slowenien"] },
          {
            date: "25.09.2019",
            lines: [
              "Eröffnung der 11. Orgelakademie",
              "Prof. Michael Radulescu, Wien"
            ]
          },
          { date: "28.09.2019", lines: ["Abschlusskonzert der Kursteilnehmer"] },
          {
            date: "27.09.2020",
            lines: [
              "Preisträgerkonzert 9. Int. Kompositions-Wettbewerb",
              "Pavol Valásek, Prag"
            ]
          },
          {
            date: "28.09.2022",
            lines: ["Eröffnung der 12. Orgelakademie", "Prof. Vincent Dubois, Paris"]
          },
          { date: "01.10.2022", lines: ["Abschlusskonzert der Kursteilnehmer"] },
          {
            date: "17.09.2023",
            lines: [
              "Eröffnungskonzert der 10. Saarlouiser Orgeltage",
              "Prof. Jörg Abbing, Saarbrücken"
            ]
          },
          { date: "22.09.2023", lines: ["Orgelnacht", "Prof. Vincent Dubois, Paris"] },
          {
            date: "25.09.2024",
            lines: ["Eröffnung der 14. Orgelakademie", "Prof. Vincent Dubois, Paris"]
          },
          { date: "28.10.2024", lines: ["Abschlusskonzert der Kursteilnehmer"] },
          { date: "29.12.2024", lines: ["Jahresschlusskonzert", "Markus Schaubel, Saarlouis"] },
          {
            date: "16.02.2025",
            lines: [
              "Orgelkonzert",
              "Tobias Rihm, Wallerfangen",
              "Markus Schaubel, Saarlouis"
            ]
          },
          {
            date: "30.03.2025",
            lines: ["Junge Künstler, Festliche Klänge", "Ioan Salaru, Mainz"]
          },
          {
            date: "06.07.2025",
            lines: [
              "Gedenkkonzert Albert Schweitzer",
              "Prof. Bernhard Leonardy, Saarbrücken",
              "Prof. Vincent Dubois, Paris",
              "Markus Schaubel, Saarlouis"
            ]
          },
          {
            date: "12.10.2025",
            lines: ["Eröffnung der 15. Orgelakademie", "Prof. Vincent Dubois, Paris"]
          },
          { date: "15.10.2025", lines: ["Abschlusskonzert der Kursteilnehmer"] },
          { date: "21.12.2025", lines: ["Jahresschlusskonzert", "Tobias Rihm, Wallerfangen"] }
        ]
      }
    ]
  }
};
