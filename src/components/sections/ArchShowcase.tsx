import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDirection } from '../../hooks/useDirection';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useGetProjects } from '../../api/project';

interface ProjectData {
  id: number;
  name: string;
  description: string;
  project_number: string;
  is_featured: boolean;
  image: string | null;
  image_vr?: string;
  category?: {
    id: number;
    name: string;
    description: string;
  };
}

type AnimStyle = '3D-flip' | 'zoom-elastic' | 'warp-slide' | 'cine-fade';

export default function ArchShowcase() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const { data: projects, isLoading } = useGetProjects() as {
    data: ProjectData[] | undefined;
    isLoading: boolean;
  };

  const [featuredProjects, setFeaturedProjects] = useState<ProjectData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animStyle, setAnimStyle] = useState<AnimStyle>('3D-flip');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (projects) {
      const filtered = projects.filter(
        (project) => project.is_featured === true
      );
      setFeaturedProjects(filtered);
      setActiveIndex(0);
    }
  }, [projects]);

  useEffect(() => {
    if (!isAutoplay || featuredProjects.length <= 1) return;
    const interval = setInterval(() => {
      setDirection('next');
      setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay, featuredProjects]);

  useEffect(() => {
    if (featuredProjects.length === 0) return;
    const styles: AnimStyle[] = [
      '3D-flip',
      'zoom-elastic',
      'warp-slide',
      'cine-fade',
    ];
    const nextStyle = styles[activeIndex % styles.length];
    setAnimStyle(nextStyle);
  }, [activeIndex, featuredProjects]);

  const handleNext = () => {
    if (featuredProjects.length <= 1) return;
    setIsAutoplay(false);
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const handlePrev = () => {
    if (featuredProjects.length <= 1) return;
    setIsAutoplay(false);
    setDirection('prev');
    setActiveIndex(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
    );
  };

  const triggerSelect = (idx: number) => {
    setIsAutoplay(false);
    setDirection(idx > activeIndex ? 'next' : 'prev');
    setActiveIndex(idx);
  };

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

  if (isLoading) {
    return (
      <section className="py-28 bg-zinc-950 text-white flex items-center justify-center min-h-[600px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <span className="text-xs tracking-widest text-zinc-500 uppercase font-cairo">
            {isRTL
              ? 'جاري جلب المشاريع المميزة...'
              : 'Loading featured projects...'}
          </span>
        </div>
      </section>
    );
  }

  if (featuredProjects.length === 0) {
    return (
      <section className="py-28 bg-zinc-950 text-white flex items-center justify-center min-h-[400px]">
        <span className="text-xs font-cairo text-zinc-500 tracking-widest uppercase">
          {isRTL
            ? 'لا توجد مشاريع مميزة لعرضها حالياً'
            : 'NO FEATURED PROJECTS TO DISPLAY YET'}
        </span>
      </section>
    );
  }

  const activeImage = featuredProjects[activeIndex];

  return (
    <section className="py-28 bg-zinc-950 text-white relative overflow-hidden border-b border-accent/10 font-cairo">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-accent/10 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl !leading-tight text-white font-cairo">
              {isRTL ? 'معرض أعمالنا المميزة' : 'OUR FEATURED MASTERPIECES'}
            </h2>
            <p className="mt-4 text-base leading-relaxed max-w-xl text-zinc-400 font-cairo">
              {isRTL
                ? 'نستعرض هنا نخبة من المشاريع والتحف المعمارية التي تم تمييزها لتبين مدى دقة وجودة تنفيذ تفاصيلنا الإبداعية.'
                : 'A curated showcase of our ultimate architectural masterpieces highlighted to reflect our peak creative execution.'}
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
            onClick={() =>
              activeImage.image && setFullscreenImage(activeImage.image)
            }
            style={{ perspective: 1200 }}
          >
            <div className="absolute top-4 left-4 text-[10px] text-white z-20 bg-black/80 py-1.5 px-3 border border-white/10 shadow-lg select-none flex items-center gap-1.5 backdrop-blur-sm font-cairo">
              <Eye className="h-3 w-3 text-accent" />
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
                className="absolute inset-0 h-full w-full flex items-center justify-center overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={activeImage.image || ''}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none select-none"
                />

                <img
                  src={activeImage.image || ''}
                  alt={activeImage.name}
                  referrerPolicy="no-referrer"
                  className="relative z-10 max-h-full max-w-full object-contain select-none transition-all duration-700 ease-out brightness-95 group-hover:brightness-100 group-hover:scale-[1.005]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 pt-4 border-t border-accent/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-md font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                  #{activeImage.project_number}
                </span>
                {activeImage.category && (
                  <span className="text-[11px] font-medium text-zinc-400">
                    {activeImage.category.name}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white mt-1 font-cairo">
                {activeImage.name}
              </h3>
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

              <div className="px-2 text-xs font-cairo font-bold text-white flex items-center">
                <span>0{activeIndex + 1}</span>
                <span className="text-zinc-600 px-1.5">/</span>
                <span className="text-zinc-600">
                  0{featuredProjects.length}
                </span>
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
          {featuredProjects.map((img, idx) => (
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
                src={img.image || ''}
                alt={img.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover brightness-50 hover:brightness-90 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-2">
                <span className="text-[9px] uppercase text-zinc-400 truncate block">
                  {img.project_number}
                </span>
                <span className="text-[10px] font-bold text-white truncate block uppercase font-cairo">
                  {img.name}
                </span>
              </div>
              <span className="absolute top-1.5 right-1.5 text-[8px] font-cairo bg-accent/20 text-accent px-1.5 py-0.5 font-bold border border-accent/30">
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
            <div className="relative max-w-6xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
              <img
                src={fullscreenImage}
                alt="Fullscreen architecture render"
                className="w-full h-full object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-6 bg-black/80 px-4 py-1.5 text-[11px] text-accent border border-white/10 font-cairo">
                {isRTL ? 'اضغط في أي مكان للإغلاق' : 'CLICK ANYWHERE TO CLOSE'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
