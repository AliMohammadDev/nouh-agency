import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Layers, Layout, Search, X, Grid } from 'lucide-react';
import { useDirection } from '../hooks/useDirection';
import { useGetMajors } from '../api/major';
import { useGetProjects } from '../api/project';
import { ProjectGrid } from './ProjectGrid';
import { motion } from 'motion/react';

interface TagData {
  id: number;
  name: string;
}

interface ProjectData {
  id: number;
  project_number: string;
  name: string;
  description: string;
  image: string | null;
  image_vr?: string;
  category?: {
    id: number;
    name: string;
    description: string;
  };
  tags?: TagData[];
}

interface Major {
  id: number;
  name: string;
  description: string;
  categories: {
    id: number;
    name: string;
    description: string;
  }[];
}

const MAJOR_MAP: Record<string, number> = {
  architecture: 1,
  'graphic-design': 2,
  'web-development': 3,
};

export default function Work() {
  const { t, i18n } = useTranslation();
  const { isRTL } = useDirection();
  const navigate = useNavigate();
  const { categorySlug } = useParams<{ categorySlug?: string }>();

  const { data: majors, isLoading: isMajorsLoading } = useGetMajors() as {
    data: Major[] | undefined;
    isLoading: boolean;
  };
  const { data: projects, isLoading: isProjectsLoading } = useGetProjects() as {
    data: ProjectData[] | undefined;
    isLoading: boolean;
  };

  const [currentMajor, setCurrentMajor] = useState<Major | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (!majors || majors.length === 0) return;

    if (!categorySlug) {
      setCurrentMajor(null);
      setActiveCategory('all');
      setSearchQuery('');
      return;
    }

    const targetId = MAJOR_MAP[categorySlug];
    const matched = majors.find((m) => m.id === targetId);

    if (matched) {
      setCurrentMajor(matched);
      setActiveCategory('all');
      setSearchQuery('');
    }
  }, [categorySlug, majors]);

  const getFilteredProjects = (): ProjectData[] => {
    if (!projects) return [];

    return projects.filter((project) => {
      if (currentMajor) {
        const isBelongsToMajor = currentMajor.categories.some(
          (cat) => cat.id === project.category?.id
        );
        if (!isBelongsToMajor) return false;
      }

      if (categorySlug && activeCategory !== 'all') {
        if (project.category?.id !== activeCategory) return false;
      }

      const query = searchQuery.toLowerCase().trim();
      if (query !== '') {
        const matchesName = project.name?.toLowerCase().includes(query);
        const matchesDesc = project.description?.toLowerCase().includes(query);
        const matchesNum = project.project_number?.includes(query);
        const matchesTags = project.tags?.some((tag) =>
          tag.name.toLowerCase().includes(query)
        );

        if (!matchesName && !matchesDesc && !matchesNum && !matchesTags)
          return false;
      }

      return true;
    });
  };

  const filteredProjects = getFilteredProjects();
  const isLoading = isMajorsLoading || isProjectsLoading;

  const handleMajorFilterClick = (slug: string | null) => {
    if (!slug) {
      navigate('/work');
    } else {
      navigate(`/work/${slug}`);
    }
  };

  if (isLoading) {
    return (
      <section className="pt-36 pb-24 bg-zinc-950 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="h-12 w-48 bg-zinc-900 animate-pulse rounded-xl mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full aspect-[4/3] rounded-xl bg-zinc-900 animate-pulse"
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
              {currentMajor
                ? currentMajor.name
                : isRTL
                  ? 'معرض الأعمال الكامل '
                  : 'FULL PORTFOLIO '}
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-white uppercase">
            {currentMajor
              ? currentMajor.name
              : isRTL
                ? 'مشاريعنا الإبداعية'
                : 'OUR WORKS'}
          </h1>
          <p className="text-xs text-zinc-400 mt-2 max-w-xl">
            {currentMajor
              ? currentMajor.description
              : isRTL
                ? 'نستعرض هنا كافة المشاريع والأعمال التي قمنا بتطويرها وتصميمها عبر كافة الأقسام.'
                : 'Explore all the projects we have designed and developed across all creative sectors.'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-12">
          <div className="flex flex-wrap items-center gap-2 order-2 md:order-1">
            <button
              onClick={() => handleMajorFilterClick(null)}
              className={`relative px-4 py-2 text-[11px] font-bold transition-all duration-300 cursor-pointer rounded-md border backdrop-blur-md ${
                !categorySlug
                  ? 'bg-accent text-black border-accent font-black shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.25)]'
                  : 'border-zinc-800 text-zinc-400 bg-zinc-950/40 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Grid size={12} />
                {isRTL ? 'كل المشاريع' : 'ALL WORKS'}
              </span>
            </button>

            {!categorySlug &&
              majors?.map((m) => {
                const slugTarget =
                  Object.keys(MAJOR_MAP).find(
                    (key) => MAJOR_MAP[key] === m.id
                  ) || 'architecture';

                return (
                  <button
                    key={m.id}
                    onClick={() => handleMajorFilterClick(slugTarget)}
                    className="border-zinc-800 text-zinc-400 bg-zinc-950/40 hover:text-white hover:border-zinc-700 relative px-4 py-2 text-[11px] font-bold transition-all duration-300 cursor-pointer rounded-md border backdrop-blur-md"
                  >
                    {m.name}
                  </button>
                );
              })}

            {categorySlug && (
              <>
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`relative px-4 py-2 text-[11px] font-bold transition-all duration-300 cursor-pointer rounded-md border backdrop-blur-md ${
                    activeCategory === 'all'
                      ? 'bg-accent text-black border-accent font-black shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.25)]'
                      : 'border-zinc-800 text-zinc-400 bg-zinc-950/40 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Layers size={12} />
                    {isRTL ? 'كافة أعمال القسم' : 'ALL SECTIONS'}
                  </span>
                </button>

                {currentMajor?.categories?.map((cat) => {
                  const isCurrent = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative px-4 py-2 text-[11px] font-bold transition-all duration-300 cursor-pointer rounded-md border backdrop-blur-md ${
                        isCurrent
                          ? 'bg-accent text-black border-accent font-black shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.25)]'
                          : 'border-zinc-800 text-zinc-400 bg-zinc-950/40 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </>
            )}
          </div>

          <div className="w-full md:w-72 order-1 md:order-2 relative group">
            <div
              className={`absolute inset-0 bg-accent/10 rounded-md blur-md transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}
            />
            <div
              className={`relative flex items-center bg-zinc-950/80 border rounded-md transition-all duration-300 ${isSearchFocused ? 'border-accent' : 'border-zinc-800 hover:border-zinc-700'}`}
            >
              <div
                className={`p-2.5 ${isRTL ? 'pl-2' : 'pr-2'} text-zinc-500 transition-colors ${isSearchFocused ? 'text-accent' : 'group-hover:text-zinc-400'}`}
              >
                <Search size={14} />
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
                className={`w-full bg-transparent py-2 text-[11px] text-white placeholder-zinc-500 focus:outline-none font-medium ${isRTL ? 'pl-8 font-cairo' : 'pr-8 font-sans'}`}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery('')}
                    className={`absolute p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer ${isRTL ? 'left-1.5' : 'right-1.5'}`}
                  >
                    <X size={12} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <ProjectGrid
          projects={filteredProjects}
          isRTL={isRTL}
          onProjectClick={(id) => navigate(`/work/project/${id}`)}
        />

        {!isLoading && filteredProjects.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center text-center border border-dashed border-zinc-900 rounded-xl p-8 mt-6 bg-zinc-950/10">
            <span className="text-xs font-cairo text-zinc-500 tracking-widest uppercase">
              {searchQuery
                ? isRTL
                  ? `NO_RESULTS  لم نجد نتائج لـ "${searchQuery}"`
                  : `NO_RESULTS  NO MATCHES FOR "${searchQuery}"`
                : isRTL
                  ? '  لا توجد مشاريع مضافة هنا بعد'
                  : '  NO PROJECTS IN THIS CATEGORY YET'}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
