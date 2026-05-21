import { useTranslation } from 'react-i18next';

interface StatItem {
  value: string;
  label: string;
}

export default function Stats() {
  const { t } = useTranslation();
  const items = t('stats.items', { returnObjects: true }) as StatItem[];

  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <span className="mb-10 block text-center text-xs font-semibold uppercase tracking-widest text-accent">
          {t('stats.label')}
        </span>
        <div className="grid grid-cols-2 gap-px border border-primary-foreground/10 bg-primary-foreground/10 lg:grid-cols-4">
          {items.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-2 bg-primary px-6 py-12 text-center"
            >
              <span className="text-5xl font-bold text-primary-foreground">
                {s.value}
              </span>
              <span className="text-sm text-primary-foreground/60">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
