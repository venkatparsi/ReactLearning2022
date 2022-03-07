import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importing translation files
import translationEN from "./locales/en/translation.json";
import translationHE from "./locales/hn/translation.json";
import translationTE from "./locales/te/translation.json";

const resources = {
    en: { translation: translationEN },
    hn: { translation: translationHE },
    te: { translation: translationTE },
  };

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng:"en",
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: resources
  });

export default i18n;