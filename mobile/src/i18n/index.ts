/**
 * Localization bootstrap. Resources are the single shared source of truth
 * in `@acplatform/i18n-resources` (constitution rule 15: localization is a
 * first-class, from-day-one constraint, not a later pass) — this file only
 * wires that shared registry into `react-i18next`. New namespaces are
 * added to the shared package alongside their owning feature, never here.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLocale, resources, supportedLocales } from '@acplatform/i18n-resources';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    supportedLngs: [...supportedLocales],
    defaultNS: 'common',
    ns: ['common', 'systemHealth'],
    interpolation: {
      // React already escapes output; i18next's own escaping would double-escape.
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
