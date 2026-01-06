"use client";

import React, { createContext, useContext } from "react";
import {
  type Locale,
  type Dictionary,
  type TranslationKey,
  type TranslationFunction,
  type PathValue,
  getDictionary,
} from "./i18n-shared";

// Re-export types for convenience
export type { Locale, Dictionary, TranslationKey, TranslationFunction };

interface I18nContextType {
  language: Locale;
  t: TranslationFunction;
}

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined
);

interface I18nProviderProps {
  children: React.ReactNode;
  language: Locale;
}

export const I18nProvider = ({ children, language }: I18nProviderProps) => {
  const currentDict = getDictionary(language);
  const englishDict = getDictionary("en");

  const t: TranslationFunction = (key) => {
    const keys = key.split(".");
    let result: unknown = currentDict;
    let fallback: unknown = englishDict;

    for (const k of keys) {
      result = (result as Record<string, unknown>)?.[k];
      fallback = (fallback as Record<string, unknown>)?.[k];
    }

    return (result || fallback || key) as PathValue<Dictionary, typeof key>;
  };

  return (
    <I18nContext.Provider value={{ language, t }}>
      <div className={language === "ml" ? "font-malayalam" : "font-sans"}>
        {children}
      </div>
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
