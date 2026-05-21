import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

export default function Hero() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 flex">
        <div className="w-full bg-primary lg:w-1/2" />
        <div className="hidden bg-background lg:block lg:w-1/2" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-24 lg:px-16 lg:py-36">
          <span className="mb-6 inline-block text-xs font-medium uppercase tracking-widest text-accent">
            {t('hero.eyebrow')}
          </span>
          <h1
            className="mb-6 text-5xl font-bold leading-[1.05] text-primary-foreground lg:text-7xl"
            style={{ whiteSpace: 'pre-line' }}
          >
            {t('hero.heading')}
          </h1>
          <p className="mb-10 max-w-md text-base leading-relaxed text-primary-foreground/70">
            {t('hero.sub')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-85"
            >
              {t('hero.cta')}
              <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
            </a>
            <a
              href="#about"
              className="flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground/80 transition hover:border-primary-foreground hover:text-primary-foreground"
            >
              {t('hero.secondary')}
            </a>
          </div>
        </div>

        <div className="hidden items-center justify-center bg-background px-16 py-36 lg:flex">
          <div className="relative grid aspect-square w-full max-w-sm grid-cols-3 grid-rows-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-sm border border-border"
                style={{
                  background:
                    i === 4
                      ? 'var(--accent)'
                      : i % 3 === 0
                        ? 'var(--secondary)'
                        : 'var(--card)',
                  opacity: i === 4 ? 1 : 0.6 + i * 0.04,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex justify-center pb-6 pt-2">
        <ChevronDown
          size={18}
          className="animate-bounce text-muted-foreground"
        />
      </div>
    </section>
  );
}
