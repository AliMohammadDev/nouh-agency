import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'motion/react'; // أو 'framer-motion' حسب نسختك

interface StatItem {
  value: string; // مثال: "150+" أو "98%"
  label: string;
}

// مكون فرعي للعداد التصاعدي التفاعلي
function Counter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // استخراج الرقم فقط واللاحقة (مثل + أو %) من النص
  const targetNumber = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // مدة العداد بالملي ثانية (ثانيتين)
    const frameRate = 1000 / 60; // 60 إطار في الثانية
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      // دلالة تسارع ناعمة للعداد (Ease Out)
      const progress = frame / totalFrames;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOutProgress * targetNumber));

      if (frame === totalFrames) {
        clearInterval(counterInterval);
      }
    }, frameRate);

    return () => clearInterval(counterInterval);
  }, [isInView, targetNumber]);

  return (
    <span
      ref={ref}
      className="text-5xl font-light tracking-tight text-primary-foreground md:text-6xl font-mono"
    >
      {count}
      <span className="text-accent ml-1 select-none">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const { t } = useTranslation();

  const rawItems = t('stats.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as StatItem[]) : [];

  return (
    <section className="bg-primary py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <span className="mb-12 block text-center text-xs font-bold uppercase tracking-widest text-accent">
          {t('stats.label')}
        </span>

        <div className="grid grid-cols-2 gap-px border border-primary-foreground/10 bg-primary-foreground/10 lg:grid-cols-4 rounded-xl overflow-hidden shadow-2xl shadow-black/20">
          {items.map((s, index) => (
            <motion.div
              key={s.label || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center gap-3 bg-primary px-6 py-14 text-center group transition-colors duration-500 hover:bg-primary-foreground/[0.02]"
            >
              <Counter value={s.value} />

              <span className="text-xs md:text-sm font-medium text-primary-foreground/60 tracking-wide max-w-[150px] uppercase">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
