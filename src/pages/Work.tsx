import { useTranslation } from 'react-i18next';
import { useGetProjects } from '../api/project';
import { motion } from 'motion/react'; // أو 'framer-motion' حسب نسختك
import { ArrowUpRight } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';

export default function Work() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const { data: projects, isLoading } = useGetProjects();

  // هيكل التحميل المؤقت (Skeleton Loading) الفاخر للمشاريع
  if (isLoading) {
    return (
      <section className="pt-36 pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="h-12 w-48 bg-muted animate-pulse rounded-xl mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="w-full aspect-[16/10] rounded-2xl bg-muted animate-pulse" />
                <div className="h-6 w-1/3 bg-muted animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-36 pb-24 bg-background text-foreground relative overflow-hidden">
      {/* شبكة هندسية ناعمة جداً تتماشى مع طابع الرسم الهندسي */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        {/* رأس الصفحة الفخم */}
        <div className="mb-16">
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-accent">
            {t('work.sub_label', 'معرض أعمالنا')}
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t('nav.links.work')}
          </h1>
        </div>

        {/* شبكة المشاريع المعمارية والرقمية المتطورة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col cursor-pointer"
            >
              {/* حاوية الصورة بتأثير التكبير والقص الهندسي المنتظم */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-muted border border-border/40 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-accent/5">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* طبقة حجب خفيفة تظهر عند الـ Hover مع زر السهم الصاعد */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-background/90 text-foreground shadow-2xl scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 backdrop-blur-sm">
                    <ArrowUpRight
                      size={22}
                      className={`transition-transform duration-300 ${
                        isRTL
                          ? 'group-hover:-translate-x-0.5 group-hover:translate-y-0.5'
                          : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* تفاصيل المشروع النصية في الأسفل */}
              <div className="mt-6 flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                    {project.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* تصنيفات ووسوم المشروع (Tags) */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
                {project.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-[11px] font-medium tracking-wide bg-secondary border border-border/60 text-foreground/80 px-3 py-1 rounded-lg uppercase"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
