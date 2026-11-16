"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/data";
import { LanguageSwitch, useLang } from "./LanguageProvider";
import SearchOverlay from "./SearchOverlay";
import { l } from "@/lib/i18n";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { lang, t } = useLang();

  useEffect(() => {
    let ticking = false;
    let lastState = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 10;
        if (next !== lastState) {
          lastState = next;
          setScrolled(next);
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden bg-royal-800 text-cream-50 md:block">
        <div className="container-wide flex items-center justify-between py-2 text-[12px] tracking-wide">
          <span className="opacity-90">{l(SITE.nameLong, lang)}</span>
          <div className="flex items-center gap-5 opacity-90">
            <span>
              {t("header.phone")}: {SITE.phone}
            </span>
            <a href={`mailto:${SITE.email}`} className="hover:text-gold-200">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`transition-colors duration-200 ${
          scrolled
            ? "bg-cream-50 border-b border-royal-700/10 shadow-[0_8px_24px_-18px_rgba(10,20,50,0.35)]"
            : "bg-cream-50/95"
        }`}
      >
        <div className="container-wide flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Klingende Kirche Lisdorf"
              width={240}
              height={60}
              priority
              className="h-[46px] w-auto sm:h-[54px]"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active =
                (item.href === "/" && pathname === "/") ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.labelKey}
                  href={item.href}
                  className={`relative rounded-full px-3 py-2 text-[13px] font-medium tracking-wide transition ${
                    active
                      ? "text-royal-800"
                      : "text-neutral-700 hover:text-royal-800"
                  }`}
                >
                  {t(item.labelKey as any)}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-center bg-gold-400 transition-transform ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}

            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Suche öffnen"
              className="ml-3 flex items-center gap-2 rounded-full border border-royal-700/15 bg-white/60 px-3 py-2 text-[12px] text-neutral-600 hover:text-royal-800"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" strokeLinecap="round" />
              </svg>
              {t("header.search")}
              <span className="rounded border border-royal-700/15 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
                ⌘K
              </span>
            </button>

            <LanguageSwitch className="ml-2" />

            <Link href="/termine" className="btn-primary ml-3">
              {t("header.tickets")}
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Suche öffnen"
              className="rounded-full border border-royal-700/15 bg-white/60 p-2.5"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-royal-800"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" strokeLinecap="round" />
              </svg>
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-royal-700/15 bg-white/60 p-2.5"
              aria-label="Menü"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-royal-800"
              >
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3 6h14" strokeLinecap="round" />
                    <path d="M3 10h14" strokeLinecap="round" />
                    <path d="M3 14h14" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden">
            <div className="container-wide pb-5">
              <nav className="flex flex-col divide-y divide-royal-700/10 rounded-2xl border border-royal-700/10 bg-white shadow-card">
                {NAV.map((item) => (
                  <Link
                    key={item.labelKey}
                    href={item.href}
                    className="px-5 py-3 text-sm font-medium text-neutral-800 hover:bg-cream-100 hover:text-royal-800"
                  >
                    {t(item.labelKey as any)}
                  </Link>
                ))}
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="px-5 py-3 text-sm font-medium text-royal-700"
                >
                  {t("header.phone")}: {SITE.phone}
                </a>
              </nav>
              <div className="mt-4 flex items-center justify-between">
                <LanguageSwitch />
                <Link href="/termine" className="btn-primary">
                  {t("header.tickets")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
