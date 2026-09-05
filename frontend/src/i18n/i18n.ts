/**
 * Localization bootstrap. Namespaces `common` and `systemHealth` come from
 * the shared `@acplatform/i18n-resources` package (kept in sync with
 * mobile); `app` is a frontend-only namespace for shell/navigation strings
 * that haven't been promoted into the shared package yet (e.g. because
 * they're web-shell specific). Every UI string in this app is looked up
 * through `useTranslation()` — never hardcoded — so future locales are
 * additive, not a retrofit (ADR-005, constitution rule 15).
 */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLocale, resources as sharedResources, supportedLocales } from "@acplatform/i18n-resources";

import appEn from "./locales/en/app.json";

const resources = {
  en: {
    ...sharedResources.en,
    app: appEn,
  },
} as const;

void i18next.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  supportedLngs: [...supportedLocales],
  defaultNS: "common",
  ns: ["common", "systemHealth", "app"],
  interpolation: {
    escapeValue: false, // React already escapes.
  },
  returnNull: false,
});

export default i18next;
