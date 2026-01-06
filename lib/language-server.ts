import { cookies } from "next/headers";
import { Locale } from "./i18n-shared";

const LANGUAGE_COOKIE = "language";

export async function getLanguage(): Promise<Locale> {
  const cookieStore = await cookies();
  const language = cookieStore.get(LANGUAGE_COOKIE)?.value as Locale;
  return language || "ml";
}

export async function setLanguageCookie(language: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(LANGUAGE_COOKIE, language, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60, // 1 year
  });
}
