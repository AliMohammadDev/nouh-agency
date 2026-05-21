import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

export default function CTABand() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <section
      id="contact"
      className="border-t border-border bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
          {t('cta.heading')}
        </h2>
        <p className="mx-auto mb-10 max-w-md text-base text-muted-foreground">
          {t('cta.sub')}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition hover:opacity-85"
        >
          {t('cta.button')}
          <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
        </a>
      </div>
    </section>
  );
}
