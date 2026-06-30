import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, animate } from 'motion/react';
import { useDirection } from '../../hooks/useDirection';
import { Compass, ShieldCheck, Landmark } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  desc: string;
}

const STAT_ICONS = [Landmark, Compass, ShieldCheck];

function AnimatedCounter({ value }: { value: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const targetNumber = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, targetNumber, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setCurrent(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [targetNumber, isInView]);

  return (
    <span
      ref={ref}
      className="font-cairo text-4xl sm:text-5xl font-black text-white tracking-tight flex items-center"
      dir="ltr"
    >
      {current}
      <span className="text-accent mx-0.5 select-none">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const rawItems = t('stats.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as StatItem[]) : [];

  return (
    <section className="py-28 bg-zinc-950 text-white relative overflow-hidden border-b border-accent/10 font-cairo">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="absolute top-0 left-1/4 h-full w-[1px] bg-accent/[0.02] pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-full w-[1px] bg-accent/[0.02] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3 p-1.5 px-3 bg-accent/5 border border-accent/10">
            <span className="font-cairo text-[12px] font-bold uppercase tracking-widest text-accent">
              {t('stats.label', 'مؤشرات النجاح الهندسية والرقمية')}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold uppercase text-white tracking-wider sm:text-4xl mt-1 !leading-tight font-cairo">
            {isRTL
              ? 'مخططات هندسبية وتنفيذية متميزة'
              : 'PRECISE DESIGN & EXECUTION MATRIX'}
          </h2>
          <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-cairo max-w-2xl mx-auto">
            {isRTL
              ? 'تفخر وكالة نوح بصناعة بصمات معاصرة ملهمة تمتد من دراسة الفكرة الإنشائية وحتى تخريج الكفاءات الشابة وتسليم الأبراج الفخمة.'
              : 'Nouh Studio delivers elite parameters, nurturing talent while engineering absolute visual perfection.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {items.map((stat, idx) => {
            const IconComponent = STAT_ICONS[idx % STAT_ICONS.length];
            const numericValue =
              parseInt(stat.value.replace(/\D/g, ''), 10) || 0;

            return (
              <motion.div
                key={stat.label || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative bg-black/40 border border-accent/10 p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 group hover:bg-black/80"
              >
                <div className="absolute top-0 left-0 w-3 h-[1px] bg-accent/20 group-hover:bg-accent transition-colors duration-300" />
                <div className="absolute top-0 left-0 w-[1px] h-3 bg-accent/20 group-hover:bg-accent transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-accent/20 group-hover:bg-accent transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-accent/20 group-hover:bg-accent transition-colors duration-300" />

                <div>
                  <div className="mb-6 h-12 w-12 rounded-none border font-cairo border-accent/10 flex items-center justify-center bg-accent/[0.02] text-accent group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                    <IconComponent className="h-5 w-5 animate-pulse" />
                  </div>

                  <div className="flex items-baseline gap-1">
                    <AnimatedCounter value={stat.value} />
                  </div>

                  <h3 className="font-cairo text-base font-bold text-white uppercase mt-5 tracking-wide group-hover:text-accent transition-colors duration-300">
                    {stat.label}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-light font-cairo">
                    {stat.desc ||
                      (isRTL
                        ? 'مواصفات قياسية وتصميمات مخصصة تضمن أعلى معايير الجودة والاستدامة.'
                        : 'Standard parameters engineered to guarantee maximum quality and visual prestige.')}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-accent/5">
                  <div className="w-full h-[1.5px] bg-zinc-900 overflow-hidden relative">
                    <motion.div
                      className="absolute top-0 bottom-0 bg-accent/30 group-hover:bg-accent shadow-[0_0_8px_var(--color-accent)] transition-all duration-1000 ease-out"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(numericValue, 100)}%` }}
                      viewport={{ once: true }}
                      style={{
                        right: isRTL ? 0 : 'auto',
                        left: isRTL ? 'auto' : 0,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
