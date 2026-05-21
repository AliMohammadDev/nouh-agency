import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface I18nProviderProps {
  children: ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // تأمين جلب اللغة الأساسية باستخدام startsWith
    const currentLang = i18n.language || 'en';
    const lang = currentLang.startsWith('ar') ? 'ar' : 'en';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    // تطبيق الخصائص على الـ DOM
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);

    // تطبيق الخطوط بناءً على اللغة المفعلة
    document.documentElement.style.fontFamily =
      lang === 'ar' ? "'Cairo', sans-serif" : "'DM Sans', sans-serif";
  }, [i18n.language]);

  return <>{children}</>;
}
