"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { UI, type Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof UI) => string;
};

const LanguageContext = createContext<Ctx>({
  lang: "de",
  setLang: () => {},
  t: (k) => UI[k]?.de ?? String(k)
});

const STORAGE_KEY = "kk-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "de") setLangState(stored);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        document.documentElement.lang = lang;
      } catch {}
    }
  }, [lang, hydrated]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  const t = useCallback(
    (key: keyof typeof UI) => UI[key]?.[lang] ?? UI[key]?.de ?? String(key),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
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
          lang === "de"
            ? "bg-royal-800 text-cream-50"
            : "text-neutral-700 hover:text-royal-800"
        }`}
        aria-pressed={lang === "de"}
      >
        DE
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 transition ${
          lang === "en"
            ? "bg-royal-800 text-cream-50"
            : "text-neutral-700 hover:text-royal-800"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
