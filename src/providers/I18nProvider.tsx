import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language || 'en';

    const cleanLang = currentLang.startsWith('ar') ? 'ar' : 'en';

    if (currentLang !== cleanLang) {
      i18n.changeLanguage(cleanLang);
      return;
    }

    const dir = cleanLang === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', cleanLang);

    document.documentElement.style.fontFamily =
      cleanLang === 'ar' ? "'Cairo', sans-serif" : "'DM Sans', sans-serif";
  }, [i18n.language, i18n]);

  return <>{children}</>;
}
