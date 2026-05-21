import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent">
              {t("nav.links.about")}
            </span>
            <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
              {t("hero.heading")}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("hero.sub")}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {[
              { year: "2018", event: t("features.items.0.title"), detail: t("features.items.0.body") },
              { year: "2020", event: t("features.items.1.title"), detail: t("features.items.1.body") },
              { year: "2023", event: t("features.items.2.title"), detail: t("features.items.2.body") },
              { year: "2026", event: t("features.items.3.title"), detail: t("features.items.3.body") },
            ].map((item) => (
              <div key={item.year} className="flex gap-6 border-t border-border pt-6">
                <span className="font-mono text-sm text-accent w-12 shrink-0">{item.year}</span>
                <div>
                  <p className="font-semibold mb-1">{item.event}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
