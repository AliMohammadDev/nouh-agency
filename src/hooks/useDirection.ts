import { useTranslation } from "react-i18next";

export function useDirection() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const fontFamily = isRTL ? "'Cairo', sans-serif" : "'DM Sans', sans-serif";

  return { isRTL, dir, fontFamily, lang: i18n.language };
}
