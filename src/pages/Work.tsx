import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCategories } from '../api/category';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers, Layout } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';

interface TagData {
  id: number;
  name: string;
}

interface ProjectData {
  id: number;
  project_number: string;
  name: string;
  description: string;
  image_url: string | null;
  tags?: TagData[];
}

interface CategoryWithProjects {
  id: number;
  name: string;
  description: string;
  projects?: ProjectData[];
}

export default function Work() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const navigate = useNavigate();

  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const { data: categories, isLoading } = useGetCategories() as {
    data: CategoryWithProjects[] | undefined;
    isLoading: boolean;
  };
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

  useEffect(() => {
    if (!categories || categories.length === 0) return;
    if (!categorySlug) {
      setActiveCategory('all');
      return;
    }

    const matchedCategory = categories.find((cat) => {
      const nameLower = cat.name.toLowerCase();
      if (
        categorySlug === 'architecture' &&
        (nameLower.includes('عمار') || nameLower.includes('arch'))
      )
        return true;
      if (
        categorySlug === 'graphic-design' &&
        (nameLower.includes('جرافيك') || nameLower.includes('graphic'))
      )
        return true;
      if (
        categorySlug === 'web-development' &&
        (nameLower.includes('ويب') || nameLower.includes('web'))
      )
        return true;
      return false;
    });

    if (matchedCategory) {
      setActiveCategory(matchedCategory.id);
    } else {
      setActiveCategory('all');
    }
  }, [categorySlug, categories]);

  const handleCategoryChange = (id: number | 'all') => {
    if (id === 'all') {
      navigate('/work');
    } else {
      const catObj = categories?.find((c) => c.id === id);
      if (catObj) {
        const nameLower = catObj.name.toLowerCase();
        if (nameLower.includes('عمار') || nameLower.includes('arch'))
          navigate('/work/architecture');
        else if (nameLower.includes('جرافيك') || nameLower.includes('graphic'))
          navigate('/work/graphic-design');
        else if (nameLower.includes('ويب') || nameLower.includes('web'))
          navigate('/work/web-development');
        else navigate(`/work/${id}`);
      }
    }
  };

  const allProjects =
    categories?.reduce<Array<ProjectData & { categoryId: number }>>(
      (acc, cat) => {
        const catProjects =
          cat.projects?.map((p) => ({ ...p, categoryId: cat.id })) || [];
        return [...acc, ...catProjects];
      },
      []
    ) || [];

  const displayedProjects =
    activeCategory === 'all'
      ? allProjects
      : categories?.find((c) => c.id === activeCategory)?.projects || [];

  if (isLoading) {
    return (
      <section className="pt-36 pb-24 bg-zinc-950 min-h-screen relative overflow-hidden">
        {/* المخطط الهندسي أثناء التحميل */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="h-12 w-48 bg-zinc-900 animate-pulse rounded-xl mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full aspect-[16/10] rounded-2xl bg-zinc-900 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-36 pb-24 bg-black text-zinc-100 min-h-screen relative overflow-hidden font-cairo">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white uppercase">
            {t('nav.links.work', 'المشاريع الإبداعية')}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-zinc-800 pb-5 mb-16">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-md border backdrop-blur-md ${
              activeCategory === 'all'
                ? 'bg-accent text-black border-accent font-black shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]'
                : 'border-zinc-800 text-zinc-400 bg-zinc-950/40 hover:text-white hover:border-zinc-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <Layers size={13} />
              {isRTL ? 'كافة الأعمال' : 'ALL INDEX'}
            </span>
          </button>

          {categories?.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-md border backdrop-blur-md ${
                  isCurrent
                    ? 'bg-accent text-black border-accent font-black shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]'
                    : 'border-zinc-800 text-zinc-400 bg-zinc-950/40 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => {
              const projectImg =
                project.image_url ||
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="group flex flex-col cursor-pointer bg-zinc-950/30 border border-zinc-900/80 p-4 rounded-2xl hover:border-accent/30 transition-all duration-500 hover:bg-zinc-950/80"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl">
                    <img
                      src={projectImg}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-90 transition-all duration-750 ease-out group-hover:scale-105 group-hover:opacity-100 filter grayscale-[20%] group-hover:grayscale-0"
                      loading="lazy"
                    />

                    {project.project_number && (
                      <div className="absolute top-4 right-4 left-4 font-mono text-[9px] w-fit bg-black/85 text-accent border border-accent/20 px-2 py-0.5 rounded tracking-widest backdrop-blur-md">
                        {project.project_number}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                      <div className="p-4 rounded-full bg-accent text-black shadow-2xl scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <ArrowUpRight
                          size={22}
                          className={`transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-0.5 group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-start gap-4 px-2">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-accent sm:text-2xl line-clamp-1">
                        {project.name}
                      </h2>
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-md line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-zinc-900 px-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-[10px] font-mono tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md uppercase group-hover:border-zinc-700 transition-colors"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {!isLoading && displayedProjects.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-center border border-dashed border-zinc-800 rounded-2xl p-8 mt-6 bg-zinc-950/20">
            <span className="text-sm font-mono text-zinc-500 tracking-widest">
              {isRTL
                ? 'EMPTY_INDEX // لا توجد مشاريع حالياً'
                : 'EMPTY_INDEX // NO PROJECTS AVAILABLE'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
