import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useDirection } from "../hooks/useDirection";

interface FeatureItem {
  number: string;
  title: string;
  body: string;
}

export default function Services() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const items = t("features.items", { returnObjects: true }) as FeatureItem[];

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent">
            {t("nav.links.services")}
          </span>
          <h1 className="text-5xl font-bold lg:text-6xl">{t("features.heading")}</h1>
        </div>

        <div className="grid grid-cols-1 gap-0 border border-border">
          {items.map((item, i) => (
            <div
              key={item.number}
              className="group flex items-start gap-8 border-b border-border p-8 transition last:border-b-0 hover:bg-secondary lg:items-center"
            >
              <span className="font-mono text-xs text-accent w-8 shrink-0">{item.number}</span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
              <ArrowRight
                size={18}
                className={`shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100 ${isRTL ? "rotate-180" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
