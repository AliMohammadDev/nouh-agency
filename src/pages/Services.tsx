import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Layers, Sparkles, Layout } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';
import { useGetMajors } from '../api/major';
import { motion } from 'motion/react'; // أو 'framer-motion' حسب نسختك

export default function Services() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const { data: majors, isLoading } = useGetMajors();

  // تأثير الهياكل المؤقتة (Skeleton Loading) لجمالية الـ UX أثناء جلب البيانات
  if (isLoading) {
    return (
      <section className="pt-36 pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="h-4 w-24 bg-muted animate-pulse rounded-full mb-4" />
          <div className="h-12 w-2/3 bg-muted animate-pulse rounded-xl mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-36 pb-24 bg-background text-foreground relative overflow-hidden">
      {/* خطوط هندسية جمالية بالخلفية مستوحاة من مخططات الـ Blueprint */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        {/* رأس الصفحة المطور بنصوص مخصصة للخدمات */}
        <div className="max-w-3xl mb-20">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
            {t('nav.links.services')}
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl !leading-tight">
            {t(
              'services.heading',
              'تخصصات متكاملة تصنع الفارق لعلامتك ولمساحتك'
            )}
          </h1>
        </div>

        {/* شبكة الخدمات (Grid) الفاخرة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {majors?.map((major, index) => (
            <motion.div
              key={major.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between p-8 rounded-2xl border border-border/70 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-card hover:shadow-2xl hover:shadow-accent/5"
            >
              <div>
                {/* الجزء العلوي: الرقم والأيقونة المتفاعلة وسهم الانطلاق */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-sm font-bold text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* سهم صاعد بزاوية (ArrowUpRight) يعطي إيحاء بالفخامة ومفهوم استوديوهات العمارة العالمية */}
                  <div className="p-2 rounded-lg bg-secondary text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <ArrowUpRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        isRTL
                          ? 'group-hover:-translate-x-1 group-hover:translate-y-0'
                          : 'group-hover:translate-x-1 group-hover:-translate-y-1'
                      }`}
                    />
                  </div>
                </div>

                {/* اسم الخدمة ووصفها */}
                <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-accent transition-colors duration-300">
                  {major.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 mb-8">
                  {major.description}
                </p>
              </div>

              {/* الأقسام الفرعية (Categories) المعروضة كعلامات (Tags) هندسية أنيقة */}
              <div className="mt-auto pt-6 border-t border-border/40">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60 mb-3">
                  {isRTL ? 'التخصصات الفرعية' : 'Sub-Specialties'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {major.categories?.map((cat) => (
                    <span
                      key={cat.id}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-secondary border border-border/40 text-foreground/80 transition-colors duration-300 group-hover:bg-background group-hover:border-accent/20"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
