import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '../../hooks/useDirection';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface ShowcaseImage {
  id: string;
  url: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  locationEn: string;
  locationAr: string;
  coordinates: string;
}

const ARCH_IMAGES: ShowcaseImage[] = [
  {
    id: 'arch-1',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=90',
    titleEn: 'Vanguard Nouh Residence',
    titleAr: 'إقامة نوح الريادية',
    subtitleEn: 'Cantilevered Modern Exterior Design',
    subtitleAr: 'تصميم خارجي حديث بكتل كابولية معلقة',
    descEn:
      'A structural statement of luxury, combining suspended fair-faced concrete volumes, double-height glazing, and Amber twilight ambient backlighting.',
    descAr:
      'عمل فخم صاخب يدمج الكتل الخرسانية المعلقة والجدران الزجاجية الشاهقة، مضافاً إليها لمسات ممتدة من الإضاءة الليلية الدافئة.',
    locationEn: 'Aleppo, Waddah Al-Yamamah',
    locationAr: 'حلب الجمالية، شارع وضاح اليمامة',
    coordinates: '36.2132° N, 37.1354° E',
  },
  {
    id: 'arch-2',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90',
    titleEn: 'W40 Luxury Apartment',
    titleAr: 'تصميم الشقة السكنية W40',
    subtitleEn: 'Premium Spatial Composition',
    subtitleAr: 'التوزيع الفراغي وتصميم الديكور الداخلي',
    descEn:
      'Blending rich natural walnut wood cladding with structural matte black metal frames to craft a warm yet highly minimalist modern lounge.',
    descAr:
      'توليفة راقية تدمج ألواح خشب الجوز الطبيعي دافئ الملمس مع إطارات معدنية سوداء داكنة تبرز الهندسة المعاصرة.',
    locationEn: 'Damascus Royal District',
    locationAr: 'مشروع دمر السكني الفاخر، دمشق',
    coordinates: '33.5138° N, 36.2765° E',
  },
  {
    id: 'arch-3',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=90',
    titleEn: 'W40 Brutalist Art Gallery',
    titleAr: 'صالة معرض W40 الفنية',
    subtitleEn: 'Minimalist Exhibition Design',
    subtitleAr: 'تصميم فضاءات متاحف ومعارض ريادية',
    descEn:
      'Featuring structural columns of reinforced cast-in-place concrete, specialized neon light strips, and custom acoustic zoning.',
    descAr:
      'مساحات معمارية مخصصة للأعمال الفخرية، تتميز بأعمدة خرسانية خام، وعناصر معزولة، ومصادر إضاءة نيون مستترة.',
    locationEn: 'Beirut Downtown Front',
    locationAr: 'شاطئ بيروت، وسط المدينة التجاري',
    coordinates: '33.8938° N, 35.5018° E',
  },
  {
    id: 'arch-4',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90',
    titleEn: 'W42 Premium Penthouse Suite',
    titleAr: 'جناح البنتهاوس الراق W42',
    subtitleEn: 'High-End Residential Masterpiece',
    subtitleAr: 'تحفة سكنية معمارية مخصصة للنخبة',
    descEn:
      'Designed with panoramic floor-to-ceiling windows, high-fidelity indirect dynamic illumination, and premium Italian marble finishing.',
    descAr:
      'شقة علوية واسعة بإطلالة كاملة كاشفة، مصممة بألواح الرخام الإيطالي الفاتح وتوزيع إنارة ديناميكية غاية في الرقي.',
    locationEn: 'Aleppo West Quarters',
    locationAr: 'المناطق الغربية الفاخرة، حلب',
    coordinates: '36.2061° N, 37.1094° E',
  },
  {
    id: 'arch-5',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=90',
    titleEn: 'Amber Horizon Villa',
    titleAr: 'فيلا الأفق العنبري',
    subtitleEn: 'Elevated Cantilevered Glass Pavilion',
    subtitleAr: 'أجنحة معلقة وجدران زجاجية متناغمة مع الأفق',
    descEn:
      'A dramatic luxury pavilion overlooking the rolling landscape, designed with thermal steel profiles, automated sliding window panels, and rich stone claddings.',
    descAr:
      'جناح معلق مذهل يشرف على الطبيعة الخضراء، مجهز بمسارات واجهة فولاذية ذكية، لوحات زجاج منزلقة مؤتمتة، وأناقة الأحجار الطبيعية.',
    locationEn: 'Duma Slopes, Rural Damascus',
    locationAr: 'مرتفعات دوما الجبلية الواعدة، ريف دمشق',
    coordinates: '33.5684° N, 36.4150° E',
  },
];

type AnimStyle = '3D-flip' | 'zoom-elastic' | 'warp-slide' | 'cine-fade';

export default function ArchShowcase() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animStyle, setAnimStyle] = useState<AnimStyle>('3D-flip');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setDirection('next');
      setActiveIndex((prev) => (prev + 1) % ARCH_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  useEffect(() => {
    const styles: AnimStyle[] = [
      '3D-flip',
      'zoom-elastic',
      'warp-slide',
      'cine-fade',
    ];
    const nextStyle = styles[activeIndex % styles.length];
    setAnimStyle(nextStyle);
  }, [activeIndex]);

  const handleNext = () => {
    setIsAutoplay(false);
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % ARCH_IMAGES.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setDirection('prev');
    setActiveIndex(
      (prev) => (prev - 1 + ARCH_IMAGES.length) % ARCH_IMAGES.length
    );
  };

  const triggerSelect = (idx: number) => {
    setIsAutoplay(false);
    setDirection(idx > activeIndex ? 'next' : 'prev');
    setActiveIndex(idx);
  };

  const activeImage = ARCH_IMAGES[activeIndex];

  const getAnimationVariants = () => {
    const isNext = direction === 'next';
    switch (animStyle) {
      case '3D-flip':
        return {
          initial: {
            opacity: 0,
            rotateY: isNext ? 65 : -65,
            scale: 0.9,
            z: -100,
          },
          animate: {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            z: 0,
            transition: {
              duration: 0.7,
              type: 'spring',
              damping: 25,
              stiffness: 120,
            },
          },
          exit: {
            opacity: 0,
            rotateY: isNext ? -65 : 65,
            scale: 0.9,
            z: -100,
            transition: { duration: 0.5 },
          },
        };
      case 'zoom-elastic':
        return {
          initial: { opacity: 0, scale: isNext ? 0.7 : 1.3 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.8,
              type: 'spring',
              damping: 15,
              stiffness: 100,
            },
          },
          exit: {
            opacity: 0,
            scale: isNext ? 1.3 : 0.7,
            transition: { duration: 0.5 },
          },
        };
      case 'warp-slide':
        return {
          initial: {
            opacity: 0,
            x: isNext ? '100%' : '-100%',
            skewX: isNext ? -12 : 12,
          },
          animate: {
            opacity: 1,
            x: 0,
            skewX: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
          },
          exit: {
            opacity: 0,
            x: isNext ? '-100%' : '100%',
            skewX: isNext ? 12 : -12,
            transition: { duration: 0.5, ease: 'easeIn' },
          },
        };
      case 'cine-fade':
      default:
        return {
          initial: { opacity: 0, filter: 'blur(8px)' },
          animate: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.9, ease: 'easeInOut' },
          },
          exit: {
            opacity: 0,
            filter: 'blur(8px)',
            transition: { duration: 0.6, ease: 'easeInOut' },
          },
        };
    }
  };

  return (
    <section className="py-28 bg-zinc-950 text-white relative overflow-hidden border-b border-accent/10 font-cairo">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-accent/10 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl !leading-tight text-white font-cairo">
              {isRTL
                ? 'معرض تحف معمارية مصممة بدقة فائقة'
                : 'PREMIUM ARCHITECTURAL MASTERPIECE VIEWPORT'}
            </h2>
            <p className="mt-4 text-base leading-relaxed max-w-xl text-zinc-400 font-cairo">
              {isRTL
                ? 'إليك تصفحاً بصرياً فخماً لأبرز تصاميم الفلل المعمارية المعاصرة، الشقق الملكية والأبنية الخدمية الحاصلة على ثقة النخبة من عملاء وكالة نوح.'
                : 'A luxurious multi-visual experience presenting contemporary luxury mansions, royal estates, and boutique spaces crafted by Nouh Agency.'}
            </p>
          </div>
        </div>

        <div className="border border-accent/10 bg-black/50 p-3 sm:p-5 relative overflow-hidden flex flex-col justify-between min-h-[500px] sm:min-h-[580px] rounded-none shadow-2xl backdrop-blur-sm">
          <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-accent/20 z-20" />
          <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-accent/20 z-20" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-accent/20 z-20" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-accent/20 z-20" />

          <div
            className="relative flex-grow aspect-[16/9] lg:aspect-[21/9] w-full bg-black overflow-hidden border border-accent/10 cursor-zoom-in group"
            onClick={() => setFullscreenImage(activeImage.url)}
            style={{ perspective: 1200 }}
          >
            <div className="absolute top-4 left-4 text-[10px] text-white z-20 bg-black/80 py-1.5 px-3 border border-white/10 shadow-lg select-none flex items-center gap-1.5 backdrop-blur-sm font-mono">
              <Eye className="h-3 w-3 text-accent font-ca" />
              <span>
                {isRTL ? 'انقر لتكبير الشاشة' : 'CLICK TO FULLSCREEN'}
              </span>
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeImage.id}
                custom={direction}
                variants={getAnimationVariants() as any}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={activeImage.url}
                  alt={isRTL ? activeImage.titleAr : activeImage.titleEn}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover select-none transition-all duration-700 ease-out brightness-90 group-hover:brightness-100 group-hover:scale-[1.01]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 pt-4 border-t border-accent/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  {isRTL ? activeImage.subtitleAr : activeImage.subtitleEn}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white mt-1 font-cairo">
                {isRTL ? activeImage.titleAr : activeImage.titleEn}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mt-1 border-s-2 border-accent/30 ps-3 font-cairo">
                {isRTL ? activeImage.descAr : activeImage.descEn}
              </p>
            </div>

            <div className="flex items-center gap-1.5 self-end md:self-center bg-black/40 border border-accent/10 p-1">
              <button
                onClick={handlePrev}
                className="h-9 w-10 bg-zinc-900 hover:bg-accent border border-accent/10 text-white hover:text-black transition-all flex items-center justify-center cursor-pointer"
                title="Previous"
              >
                {isRTL ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>

              <div className="px-2 text-xs font-mono font-bold text-white flex items-center">
                <span>0{activeIndex + 1}</span>
                <span className="text-zinc-600 px-1.5">/</span>
                <span className="text-zinc-600">0{ARCH_IMAGES.length}</span>
              </div>

              <button
                onClick={handleNext}
                className="h-9 w-10 bg-zinc-900 hover:bg-accent border border-accent/10 text-white hover:text-black transition-all flex items-center justify-center cursor-pointer"
                title="Next"
              >
                {isRTL ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {ARCH_IMAGES.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => triggerSelect(idx)}
              className={`relative h-20 w-full overflow-hidden border transition-all duration-300 cursor-pointer text-start ${
                activeIndex === idx
                  ? 'border-accent'
                  : 'border-accent/10 opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.id}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover brightness-50 hover:brightness-90 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-2">
                <span className="text-[9px] uppercase text-zinc-400 truncate block">
                  {isRTL ? img.locationAr : img.locationEn}
                </span>
                <span className="text-[10px] font-bold text-white truncate block uppercase font-cairo">
                  {isRTL ? img.titleAr : img.titleEn}
                </span>
              </div>
              <span className="absolute top-1.5 right-1.5 text-[8px] font-mono bg-accent/20 text-accent px-1.5 py-0.5 font-bold border border-accent/30">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md cursor-zoom-out select-none"
            onClick={() => setFullscreenImage(null)}
          >
            <div className="relative max-w-6xl w-full max-h-[85vh] border border-white/10 overflow-hidden shadow-2xl">
              <img
                src={fullscreenImage}
                alt="Fullscreen architecture render"
                className="w-full h-full object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-black/80 px-4 py-1.5 text-[11px] text-accent border border-white/10 font-cairo">
                {isRTL ? 'اضغط في أي مكان للإغلاق' : 'CLICK ANYWHERE TO CLOSE'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
