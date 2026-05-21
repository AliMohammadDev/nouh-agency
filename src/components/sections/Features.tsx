import { useTranslation } from 'react-i18next';

interface FeatureItem {
  number: string;
  title: string;
  body: string;
}

export default function Features() {
  const { t } = useTranslation();
  const items = t('features.items', { returnObjects: true }) as FeatureItem[];

  return (
    <section id="services" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
              {t('features.label')}
            </span>
            <h2 className="text-4xl font-bold lg:text-5xl">
              {t('features.heading')}
            </h2>
          </div>
          <div className="hidden h-px w-40 self-center bg-border lg:block" />
        </div>

        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.number}
              className="group flex flex-col gap-4 bg-background p-8 transition hover:bg-secondary"
            >
              <span className="font-mono text-xs text-accent">
                {item.number}
              </span>
              <h3 className="text-lg font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
