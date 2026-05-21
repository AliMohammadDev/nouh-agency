import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useDirection } from "../hooks/useDirection";

export default function Contact() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent">
              {t("nav.links.contact")}
            </span>
            <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
              {t("cta.heading")}
            </h1>
            <p className="mb-10 text-base leading-relaxed text-muted-foreground">
              {t("cta.sub")}
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span>hello@brand.com</span>
              <span>+1 (555) 000-0000</span>
            </div>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder={isRTL ? "الاسم الكامل" : "Full name"}
                className="w-full border border-border bg-input-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
              />
              <input
                type="email"
                placeholder={isRTL ? "البريد الإلكتروني" : "Email address"}
                className="w-full border border-border bg-input-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
              />
            </div>
            <input
              type="text"
              placeholder={isRTL ? "الموضوع" : "Subject"}
              className="w-full border border-border bg-input-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
            <textarea
              rows={5}
              placeholder={isRTL ? "رسالتك..." : "Your message..."}
              className="w-full resize-none border border-border bg-input-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground"
            />
            <button
              type="submit"
              className="flex items-center gap-2 self-start rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-85"
            >
              {t("cta.button")}
              <ArrowRight size={14} className={isRTL ? "rotate-180" : ""} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
