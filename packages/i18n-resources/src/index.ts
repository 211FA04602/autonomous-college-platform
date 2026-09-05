/**
 * Localization resource registry shared by web and mobile.
 * Extraction architecture: keys are namespaced (`common`, `systemHealth`, ...);
 * new business namespaces are added alongside the feature that needs them —
 * never pre-populated speculatively.
 */
import common from "./locales/en/common.json";
import systemHealth from "./locales/en/systemHealth.json";

export const defaultLocale = "en" as const;

export const supportedLocales = ["en"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const resources = {
  en: {
    common,
    systemHealth,
  },
} as const;

export type Namespace = keyof (typeof resources)["en"];
