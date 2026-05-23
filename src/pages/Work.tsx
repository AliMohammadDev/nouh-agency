import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Layers, Layout, Search, X } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';
import { useGetMajors } from '../api/major';

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

interface Category {
  id: number;
  name: string;
  description: string;
  projects?: ProjectData[];
}

interface Major {
  id: number;
  name: string;
  description: string;
  categories: Category[];
}

export default function Work() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDirection();
  const navigate = useNavigate();

  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const { data: majors, isLoading } = useGetMajors() as {
    data: Major[] | undefined;
    isLoading: boolean;
  };

  const [currentMajor, setCurrentMajor] = useState<Major | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (!majors || majors.length === 0) return;

    const slug = categorySlug || 'architecture';

    const matched = majors.find((m) => {
      const nameLower = m.name.toLowerCase();
      if (
        slug === 'architecture' &&
        (nameLower.includes('عمار') || nameLower.includes('arch'))
      )
        return true;
      if (
        slug === 'graphic-design' &&
        (nameLower.includes('جرافيك') || nameLower.includes('graphic'))
      )
        return true;
      if (
        slug === 'web-development' &&
        (nameLower.includes('ويب') || nameLower.includes('web'))
      )
        return true;
      return false;
    });

    if (matched) {
      setCurrentMajor(matched);
      setActiveCategory('all');
      setSearchQuery('');
    }
  }, [categorySlug, majors]);

  const allProjectsOfMajor =
    currentMajor?.categories?.reduce<ProjectData[]>((acc, cat) => {
      const catProjects = cat.projects || [];
      return [...acc, ...catProjects];
    }, []) || [];

  const displayedProjects =
    activeCategory === 'all'
      ? allProjectsOfMajor
      : currentMajor?.categories?.find((c) => c.id === activeCategory)
          ?.projects || [];

  const filteredProjects = displayedProjects.filter((project) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesSearch;
  });

  if (isLoading) {
    return (
      <section className="pt-36 pb-24 bg-zinc-950 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="h-12 w-48 bg-zinc-900 animate-pulse rounded-xl mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
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
          <div className="inline-flex items-center gap-2 mb-4 p-1 px-3 bg-zinc-900 border border-zinc-800 rounded-md">
            <Layout size={12} className="text-accent animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent/90">
              {currentMajor ? currentMajor.name : 'STUDIO_ARCHIVES //'}
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white uppercase">
            {currentMajor?.name}
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl">
            {currentMajor?.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-16">
          <div className="flex flex-wrap items-center gap-3 order-2 md:order-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`relative px-5 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer rounded-md border backdrop-blur-md ${
                activeCategory === 'all'
                  ? 'bg-accent text-black border-accent font-black shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]'
                  : 'border-zinc-800 text-zinc-400 bg-zinc-950/40 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Layers size={13} />
                {isRTL ? 'كافة أعمال القسم' : 'ALL SECTIONS'}
              </span>
            </button>

            {currentMajor?.categories?.map((cat) => {
              const isCurrent = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer rounded-md border backdrop-blur-md ${
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

          <div className="w-full md:w-80 order-1 md:order-2 relative group">
            <div
              className={`absolute inset-0 bg-accent/10 rounded-md blur-md transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}
            />
            <div
              className={`relative flex items-center bg-zinc-950/80 border rounded-md transition-all duration-300 ${isSearchFocused ? 'border-accent' : 'border-zinc-800 hover:border-zinc-700'}`}
            >
              <div
                className={`p-3 ${isRTL ? 'pl-2' : 'pr-2'} text-zinc-500 transition-colors ${isSearchFocused ? 'text-accent' : 'group-hover:text-zinc-400'}`}
              >
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder={
                  isRTL ? 'ابحث عن اسم المشروع...' : 'Search project name...'
                }
                className={`w-full bg-transparent py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none font-medium ${isRTL ? 'pl-10 font-cairo' : 'pr-10 font-sans'}`}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery('')}
                    className={`absolute p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer ${isRTL ? 'left-2' : 'right-2'}`}
                  >
                    <X size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
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
                      className="w-full h-full object-cover opacity-90 transition-all duration-750 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                      loading="lazy"
                    />
                    {project.project_number && (
                      <div className="absolute top-4 right-4 left-4 font-mono text-[9px] w-fit bg-black/85 text-accent border border-accent/20 px-2 py-0.5 rounded tracking-widest">
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
                          className="text-[10px] font-mono tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md uppercase"
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

        {!isLoading && filteredProjects.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-center border border-dashed border-zinc-800 rounded-2xl p-8 mt-6 bg-zinc-950/20">
            <span className="text-sm font-mono text-zinc-500 tracking-widest uppercase">
              {searchQuery
                ? isRTL
                  ? `NO_RESULTS // لم نجد نتائج لـ "${searchQuery}"`
                  : `NO_RESULTS // NO MATCHES FOR "${searchQuery}"`
                : isRTL
                  ? 'EMPTY_INDEX // لا توجد مشاريع مضافة هنا بعد'
                  : 'EMPTY_INDEX // NO PROJECTS IN THIS CATEGORY YET'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
