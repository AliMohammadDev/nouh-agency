import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "../locales/en/translation.json";
import arTranslation from "../locales/ar/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    load: "languageOnly", // 💡 تجبر i18next على تنظيف الرموز مثل en-US لتصبح en فقط
    returnObjects: true,  // تفعيل جلب المصفوفات والكائنات في التطبيق بالكامل
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;