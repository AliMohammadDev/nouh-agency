import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useDirection } from "../hooks/useDirection";

export default function NotFound() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <section className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">404</p>
        <h1 className="mb-4 text-6xl font-bold lg:text-8xl">
          {isRTL ? "الصفحة غير موجودة" : "Page not found"}
        </h1>
        <p className="mb-10 text-base text-muted-foreground">
          {isRTL
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "The page you are looking for doesn't exist or has been moved."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-80"
        >
          {isRTL ? "العودة للرئيسية" : "Back to Home"}
          <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
        </Link>
      </div>
    </section>
  );
}
