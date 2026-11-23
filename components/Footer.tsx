"use client";
import Link from "next/link";
import Image from "next/image";
import { SITE, NAV } from "@/lib/data";
import { useLang } from "./LanguageProvider";
import { l } from "@/lib/i18n";

export default function Footer() {
  const { lang, t } = useLang();
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
              {t("footer.about")}
            </p>
            <div className="mt-6 text-sm text-neutral-700">
              <div className="font-medium text-royal-800">
                {l(SITE.address.chair, lang)}
              </div>
              <div>{SITE.address.street}</div>
              <div>{SITE.address.city}</div>
              <div className="mt-3">
                {t("header.phone")}:{" "}
                <a className="link-underline" href={`tel:${SITE.phoneHref}`}>
                  {SITE.phone}
                </a>
              </div>
              <div>
                {t("footer.email_label")}:{" "}
                <a className="link-underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">{t("footer.nav")}</div>
            <ul className="space-y-2.5 text-sm text-neutral-700">
              {NAV.map((item) => (
                <li key={item.labelKey}>
                  <Link href={item.href} className="hover:text-royal-700">
                    {t(item.labelKey as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-4">{t("footer.join")}</div>
            <ul className="space-y-2.5 text-sm text-neutral-700">
              <li>
                <Link href="/mitgliedschaft" className="hover:text-royal-700">
                  {t("footer.become_member")}
                </Link>
              </li>
              <li>
                <a
                  href="/downloads/beitrittserklaerung.pdf"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-royal-700"
                >
                  {t("footer.declaration_pdf")}
                </a>
              </li>
              <li>
                <Link href="/neue-mitglieder" className="hover:text-royal-700">
                  {t("footer.new_members")}
                </Link>
              </li>
              <li>
                <Link href="/nachruf" className="hover:text-royal-700">
                  {t("footer.obituary")}
                </Link>
              </li>
              <li>
                <Link href="/partner" className="hover:text-royal-700">
                  {t("footer.partners")}
                </Link>
              </li>
              <li>
                <Link href="/suche" className="hover:text-royal-700">
                  {t("footer.search")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-ornament my-10 text-xs uppercase tracking-[0.4em] text-gold-600">
          Soli Deo Gloria
        </div>

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-neutral-500 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} {l(SITE.nameLong, lang)}
          </div>
          <div className="flex items-center gap-5">
            <Link href="/impressum" className="hover:text-royal-700">
              {t("footer.imprint")}
            </Link>
            <Link href="/datenschutz" className="hover:text-royal-700">
              {t("footer.privacy")}
            </Link>
            <Link href="/disclaimer" className="hover:text-royal-700">
              {t("footer.disclaimer")}
            </Link>
            <span aria-hidden className="text-neutral-300">·</span>
            <Link href="/admin/login" className="hover:text-royal-700">
              {t("footer.admin")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
