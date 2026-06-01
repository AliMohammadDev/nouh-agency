import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'motion/react';

const SLIDES = [
  {
    id: 1,
    bgImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    i18nKey: 'architecture',
  },
  {
    id: 2,
    bgImage:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    i18nKey: 'interior',
  },
  {
    id: 3,
    bgImage:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=80',
    i18nKey: 'digital',
  },
];

export default function Hero() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: isRTL ? 'rtl' : 'ltr',
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);

    const autoPlay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(autoPlay);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="relative h-full w-full flex-[0_0_100%]"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src={slide.bgImage}
                alt={t(`hero.slides.${slide.i18nKey}.heading`)}
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl text-white"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-accent bg-accent/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {t(`hero.slides.${SLIDES[selectedIndex].i18nKey}.eyebrow`)}
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
              {t(`hero.slides.${SLIDES[selectedIndex].i18nKey}.heading`)}
            </h1>

            <p className="mb-10 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              {t(`hero.slides.${SLIDES[selectedIndex].i18nKey}.sub`)}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="work"
                className="flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 shadow-lg"
              >
                {t('hero.cta')}
                <ArrowRight
                  size={16}
                  className={`transition-transform ${isRTL ? 'rotate-180' : ''}`}
                />
              </a>
              <a
                href="work"
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition hover:border-white hover:bg-white/20"
              >
                {t('hero.secondary')}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-16 left-6 right-6 flex justify-center gap-3 lg:left-16 lg:right-auto">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
        <ChevronDown size={24} className="animate-bounce text-white/70" />
      </div>
    </section>
  );
}
