"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Lang = "de" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<Ctx>({ lang: "de", setLang: () => {} });

const STORAGE_KEY = "kk-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "de") setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {lang === "en" && (
        <div className="bg-royal-800 text-cream-50 text-center text-[13px] py-2 px-4">
          English version is coming soon. Currently all content is available in German.
        </div>
      )}
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex items-center overflow-hidden rounded-full border border-royal-700/15 bg-white/60 text-[11px] font-semibold tracking-wider ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("de")}
        className={`px-3 py-1.5 transition ${
          lang === "de" ? "bg-royal-800 text-cream-50" : "text-neutral-700 hover:text-royal-800"
        }`}
        aria-pressed={lang === "de"}
      >
        DE
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 transition ${
          lang === "en" ? "bg-royal-800 text-cream-50" : "text-neutral-700 hover:text-royal-800"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
