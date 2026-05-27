"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import vi from "@/i18n/vi.json";
import en from "@/i18n/en.json";

type Lang = "vi" | "en";
type Translations = typeof vi;

interface LangContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
}

const translations: Record<Lang, Translations> = { vi, en };

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  const t = translations[lang];

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === "vi" ? "en" : "vi"));
  }, []);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  return (
    <LangContext.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
