import { defaultLang } from "./ui";

export type Locale = "en" | "nl";

/**
 * Get the current locale from the URL pathname
 */
export function getLocaleFromUrl(url: URL): Locale {
  const pathname = url.pathname;
  const localeMatch = pathname.match(/^\/([a-z]{2})\//);

  if (localeMatch) {
    const locale = localeMatch[1];
    if (locale === "en" || locale === "nl") {
      return locale;
    }
  }

  return defaultLang;
}

/**
 * Get translations for a specific page
 */
export function useTranslations<T extends Record<Locale, any>>(
  url: URL,
  translations: T
): T[Locale] {
  const locale = getLocaleFromUrl(url);
  return translations[locale];
}

/**
 * Get a localized path - adds language prefix if not default locale
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLang) {
    return path;
  }
  return `/${locale}${path}`;
}
