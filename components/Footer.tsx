import Link from "next/link";
import Image from "next/image";
import { SITE, NAV, PARTNERS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-royal-700/10 bg-gradient-to-b from-cream-50 to-cream-100">
      <div className="container-wide py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/logo.png"
              alt="Klingende Kirche Lisdorf"
              width={300}
              height={70}
              className="h-[58px] w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-600">
              Der Förderverein pflegt seit 1993 die MAYER-Orgel der Lisdorfer Pfarrkirche und
              gestaltet ein kirchenmusikalisches Programm, das weit über das Saarland
              hinauswirkt.
            </p>
            <div className="mt-6 text-sm text-neutral-700">
              <div className="font-medium text-royal-800">{SITE.address.chair}</div>
              <div>{SITE.address.street}</div>
              <div>{SITE.address.city}</div>
              <div className="mt-3">
                Fon: <a className="link-underline" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
              </div>
              <div>
                E-Mail:{" "}
                <a className="link-underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Navigation</div>
            <ul className="space-y-2.5 text-sm text-neutral-700">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-royal-700">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Partner und Förderer</div>
            <ul className="space-y-2 text-sm text-neutral-700">
              {PARTNERS.slice(0, 7).map((p) => (
                <li key={p.name}>· {p.name}</li>
              ))}
              <li>
                <Link href="/" className="link-underline mt-2 inline-block">
                  Alle Partner ansehen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-ornament my-10 text-xs uppercase tracking-[0.4em] text-gold-600">
          Soli Deo Gloria
        </div>

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Förderverein Klingende Kirche Saarlouis e.V.</div>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-royal-700">
              Impressum
            </Link>
            <Link href="/" className="hover:text-royal-700">
              Datenschutz
            </Link>
            <Link href="/" className="hover:text-royal-700">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
