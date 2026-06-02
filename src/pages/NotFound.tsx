import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';

export default function NotFound() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <section className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-background select-none">
      <div className="text-center px-6">
        <p className="mb-4 font-cairo text-6xl font-black uppercase tracking-widest text-accent">
          404
        </p>

        <h1 className="mb-4 text-4xl font-bold lg:text-7xl text-foreground font-cairo">
          {t('not_found.title')}
        </h1>

        <p className="m-6 text-base text-muted-foreground max-w-md mx-auto font-cairo">
          {t('not_found.description')}
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary font-cairo px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 cursor-pointer shadow-lg"
        >
          {t('not_found.back_home')}
          <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
        </Link>
      </div>
    </section>
  );
}
