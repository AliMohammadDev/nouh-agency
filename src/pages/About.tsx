import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { MapPin, Compass, Users, Award } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  body: string;
}

export default function About() {
  const { t } = useTranslation();

  const rawTimeline = t('about.timeline', { returnObjects: true });
  const timelineItems = Array.isArray(rawTimeline)
    ? (rawTimeline as TimelineItem[])
    : [];

  return (
    <section className="pt-32 pb-24 bg-background text-foreground overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-accent">
              {t('nav.links.about')}
            </span>
            <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-foreground">
              {t('about.heading')}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground mb-8 md:text-lg">
              {t('about.sub')}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/60">
              <div className="flex items-start gap-3">
                <Compass className="text-accent shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-sm">
                    {t('about.feats.design.title', 'نهج هندسي')}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('about.feats.design.desc', 'دقة متناهية في التخطيط')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-accent shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-sm">
                    {t('about.feats.team.title', 'فريق متكامل')}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('about.feats.team.desc', 'معماريون، مصممون ومطورون')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8 relative before:absolute before:top-2 before:bottom-2 before:w-[1px] before:bg-border/60 ltr:before:left-[23px] rtl:before:right-[23px]"
          >
            {timelineItems.map((item, index) => (
              <div
                key={item.year || index}
                className="flex gap-6 relative group"
              >
                <span className="font-mono text-xs font-bold text-accent bg-secondary border border-border h-12 w-12 rounded-full flex items-center justify-center shrink-0 z-10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300 shadow-sm">
                  {item.year}
                </span>
                <div className="border-b border-border/40 pb-6 w-full">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-border/60 pt-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-accent">
                {t('about.map.label', 'تفضل بزيارتنا')}
              </span>
              <h2 className="text-2xl font-bold sm:text-3xl">
                {t('about.map.heading', 'مقر الاستوديو الإبداعي')}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card px-4 py-2 rounded-xl border border-border/50">
              <MapPin size={16} className="text-accent" />
              <span>
                {t('about.map.address', 'الشارع الرئيسي، حي التصميم الرقمي')}
              </span>
            </div>
          </div>

          <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-border/80 shadow-xl relative group bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3723472491563!2d34.4534725!3d31.5134625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMwJzQ4LjUiTiAzNMKwMjcnMTIuNSJF!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'grayscale(1) contrast(1.2) opacity(0.85)',
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
