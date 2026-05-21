import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';
import { useGetMajors } from '../api/major';

export default function Services() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDirection();

  const { data: majors, isLoading } = useGetMajors();

  if (isLoading) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent">
            {t('nav.links.services')}
          </span>

          <h1 className="text-5xl font-bold lg:text-6xl">
            {t('features.heading')}
          </h1>
        </div>

        {/* MAJORS LIST */}
        <div className="grid grid-cols-1 border border-border">
          {majors?.map((major) => (
            <div
              key={major.id}
              className="group flex items-start gap-8 border-b border-border p-8 transition hover:bg-secondary lg:items-center"
            >
              <span className="font-mono text-xs text-accent w-8 shrink-0">
                #{major.id}
              </span>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{major.name}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {major.description}
                </p>

                {/* CATEGORIES */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {major.categories?.map((cat) => (
                    <span
                      key={cat.id}
                      className="text-xs px-2 py-1 bg-secondary rounded"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowRight
                size={18}
                className={`shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100 ${
                  isRTL ? 'rotate-180' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
