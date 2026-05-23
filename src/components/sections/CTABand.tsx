import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import { motion } from 'motion/react';

export default function CTABand() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  return (
    <section
      id="cta-section"
      className="relative overflow-hidden bg-primary py-28 text-primary-foreground border-t border-primary-foreground/10"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-1/2 -left-1/4 w-[1007px] h-[1000px] rounded-full bg-gradient-to-tr from-accent to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-gradient-to-bl from-accent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
            {t('cta.tagline', "Let's Create Together")}
          </span>

          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight text-white">
            {t('cta.heading')}
          </h2>

          <p className="mx-auto mb-12 max-w-xl text-base md:text-lg text-primary-foreground/70 leading-relaxed">
            {t('cta.sub')}
          </p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-accent px-10 py-4 text-sm font-bold text-accent-foreground shadow-2xl shadow-accent/20 transition-all duration-300 hover:bg-accent/90 group"
            >
              {t('cta.button')}
              <ArrowRight
                size={16}
                className={`transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
