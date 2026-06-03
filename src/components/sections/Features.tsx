import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  Compass,
  PenTool,
  Layout,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';

interface PillarItem {
  number: string;
  title: string;
  body: string;
  code: string;
  bullets: string[];
}

const ICONS = [Compass, PenTool, Layout];

const PILLAR_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
];

export default function Features() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const rawItems = t('features.items', { returnObjects: true });
  const pillarsData = Array.isArray(rawItems) ? (rawItems as PillarItem[]) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 70,
      },
    },
  };

  return (
    <section className="py-28 bg-zinc-950 text-white relative overflow-hidden border-b border-accent/10 font-cairo">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2"></div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl !leading-tight text-white font-cairo">
              {t('features.heading')}
            </h2>
            <p className="mt-4 text-base leading-relaxed max-w-xl text-zinc-400 font-cairo">
              {t('features.subheading')}
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {pillarsData.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            const bgImage = PILLAR_IMAGES[index % PILLAR_IMAGES.length];

            return (
              <motion.div
                key={item.number || index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 border border-accent/10 bg-black/50 transition-all duration-500 hover:border-accent/40 hover:bg-black/80 min-h-[530px] rounded-none cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center opacity-0 group-hover:opacity-[0.14] scale-100 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                  style={{ backgroundImage: `url(${bgImage})` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-accent/20 opacity-70 group-hover:border-accent group-hover:w-5 group-hover:h-5 transition-all duration-300 z-20" />
                <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-accent/20 opacity-70 group-hover:border-accent group-hover:w-5 group-hover:h-5 transition-all duration-300 z-20" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-accent/20 opacity-70 group-hover:border-accent group-hover:w-5 group-hover:h-5 transition-all duration-300 z-20" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-accent/20 opacity-70 group-hover:border-accent group-hover:w-5 group-hover:h-5 transition-all duration-300 z-20" />

                <div className="relative z-20">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex h-12 w-12 items-center justify-center border border-accent/20 bg-accent/5 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-black">
                      <IconComponent size={20} strokeWidth={1.5} />
                    </div>
                    <span className="font-cairo text-3xl font-bold text-zinc-800 group-hover:text-accent/30 transition-colors duration-300">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-4 tracking-tight text-white group-hover:text-accent transition-colors duration-300 font-cairo">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-cairo">
                    {item.body}
                  </p>
                </div>

                <div className="border-t border-accent/10 pt-5 mt-auto relative z-20">
                  <span className="block font-cairo text-[11px] font-bold uppercase tracking-wider text-accent mb-4">
                    {t('features.deliverables_label')}
                  </span>
                  <ul className="space-y-3">
                    {item.bullets &&
                      item.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-zinc-300 group-hover:text-white transition-colors font-cairo"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                          <span className="leading-normal">{bullet}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* <div className="mt-8 pt-4 flex items-center justify-between font-cairo text-[9px] text-zinc-600 border-t border-dashed border-zinc-900 group-hover:text-accent/60 transition-colors duration-350 relative z-20">
                  <div className="text-accent/40 group-hover:text-accent transition-colors duration-300 flex items-center gap-1 font-cairo">
                    <span className="text-[10px] font-cairo">
                      {t('features.explore_more')}
                    </span>
                    <ArrowUpRight
                      size={10}
                      className={`transition-transform ${isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                    />
                  </div>
                </div> */}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
