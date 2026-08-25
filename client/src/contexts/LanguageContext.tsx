import React, { createContext, useContext, useState } from "react";
import content from "@/content.json";

export type Language = "nl" | "en" | "sw";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  /** Translated string for a dotted key, e.g. "home.hero.title". */
  t: (key: string) => string;
  /**
   * The content.json path for that key in the current language, for
   * data-cms-field. Editing in the CMS therefore changes the language the
   * client is looking at, which is the only one they can see to check.
   */
  field: (key: string) => string;
}

/**
 * Copy lives in content.json so it can be edited and published from the Mirantic
 * CMS. Keys are nested there rather than flat ("home.hero.title" as
 * home → hero → title) because the CMS addresses values by dotted path, and a
 * literal dotted key would be unreachable.
 */
const translations = content as Record<Language, unknown>;

function lookup(root: unknown, key: string): string | undefined {
  let cur: unknown = root;
  for (const part of key.split(".")) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "string" ? cur : undefined;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  field: (key) => `en.${key}`,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  // Dutch is the fallback, as before: a key missing a translation still renders
  // real copy rather than its own name.
  const t = (key: string): string =>
    lookup(translations[lang], key) ?? lookup(translations.nl, key) ?? key;

  const field = (key: string): string => `${lang}.${key}`;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, field }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
