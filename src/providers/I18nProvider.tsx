import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    const lang = i18n.language;
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.style.fontFamily =
      lang === "ar" ? "'Cairo', sans-serif" : "'DM Sans', sans-serif";
  }, [i18n.language]);

  return <>{children}</>;
}
