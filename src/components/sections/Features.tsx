import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Compass, PenTool, Layout, Layers } from 'lucide-react';

interface FeatureItem {
  number: string;
  title: string;
  body: string;
}

const ICONS = [Compass, Layers, PenTool, Layout];

export default function Features() {
  const { t } = useTranslation();

  const rawItems = t('features.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as FeatureItem[]) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <div className="max-w-2xl mb-16">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-accent">
            {t('features.label')}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground !leading-tight">
            {t('features.heading')}
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];

            return (
              <motion.div
                key={item.number || index}
                variants={itemVariants}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/60 bg-background transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-secondary text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                      <IconComponent size={22} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-mono font-bold text-muted-foreground/50 group-hover:text-accent/60 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>

                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
