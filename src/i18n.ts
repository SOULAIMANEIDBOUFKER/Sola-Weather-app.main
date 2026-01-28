import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import de from "./locales/de/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      de: { common: de },
    },
    supportedLngs: ["en", "de"],
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common"],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
