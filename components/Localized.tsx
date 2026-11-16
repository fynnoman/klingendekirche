"use client";
import { useLang } from "./LanguageProvider";
import type { UI } from "@/lib/i18n";
import { l, type TR } from "@/lib/i18n";

export function L({ value }: { value: string | TR | undefined }) {
  const { lang } = useLang();
  if (value === undefined) return null;
  return <>{l(value, lang)}</>;
}

export function T({ k }: { k: keyof typeof UI }) {
  const { t } = useLang();
  return <>{t(k)}</>;
}

export function useL() {
  const { lang } = useLang();
  return (value: string | TR | undefined): string => {
    if (value === undefined) return "";
    return l(value, lang);
  };
}
