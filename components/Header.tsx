"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40">
      {/* Top info bar */}
      <div className="hidden bg-royal-800 text-cream-50 md:block">
        <div className="container-wide flex items-center justify-between py-2 text-[12px] tracking-wide">
          <span className="opacity-90">{SITE.nameLong}</span>
          <div className="flex items-center gap-5 opacity-90">
            <span>Fon: {SITE.phone}</span>
            <a href={`mailto:${SITE.email}`} className="hover:text-gold-200">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
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
              const active = item.label === "Startseite" && pathname === "/";
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-full px-3 py-2 text-[13px] font-medium tracking-wide transition ${
                    active
                      ? "text-royal-800"
                      : "text-neutral-700 hover:text-royal-800"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-gold-400 transition-transform ${
                      active ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <Link href="/" className="btn-primary ml-4">
              Karten bestellen
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-royal-700/15 bg-white/60 p-2.5 lg:hidden"
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

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden">
            <div className="container-wide pb-5">
              <nav className="flex flex-col divide-y divide-royal-700/10 rounded-2xl border border-royal-700/10 bg-white shadow-card">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-5 py-3 text-sm font-medium text-neutral-800 hover:bg-cream-100 hover:text-royal-800"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="px-5 py-3 text-sm font-medium text-royal-700"
                >
                  Fon: {SITE.phone}
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
