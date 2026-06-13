import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Box,
  Image as ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Heart,
} from 'lucide-react';
import { useDirection } from '../hooks/useDirection';
import { useGetProject, useLikeProject } from '../api/project';
import { AnimatePresence } from 'motion/react';
import SafePannellum from '../components/projects/SafePannellum';
import RelatedProjects from '../components/projects/RelatedProjects';

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

interface ProjectLink {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  url: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  likes_count: number;
  country: string | null;
  project_number: string;
  image: string | null;
  image_vr: string | null;
  all_images: string[];
  all_images_vr: string[];
  all_images_real: string[];
  category: Category | null;
  tags: Tag[];
  links: ProjectLink[];
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isRTL } = useDirection();
  const { i18n } = useTranslation();

  const {
    data: project,
    isLoading,
    error,
  } = useGetProject(id || '') as {
    data: Project | undefined;
    isLoading: boolean;
    error: any;
  };

  const [viewMode, setViewMode] = useState<'design' | 'vr' | 'real'>('design');
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    setViewMode('design');
    setActiveImage(null);
    setLightboxImage(null);
    window.scrollTo(0, 0);
  }, [id]);

  const { mutate: likeProject, isPending } = useLikeProject();

  const imagesToShow =
    viewMode === 'design'
      ? project?.all_images || []
      : viewMode === 'real'
        ? project?.all_images_real || []
        : project?.all_images_vr || [];

  const currentMainImage = activeImage || imagesToShow[0] || '';

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!imagesToShow.length || !lightboxImage) return;
    const currentIndex = imagesToShow.indexOf(lightboxImage);
    const nextIndex = (currentIndex + 1) % imagesToShow.length;
    setLightboxImage(imagesToShow[nextIndex]);
    setActiveImage(imagesToShow[nextIndex]);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!imagesToShow.length || !lightboxImage) return;
    const currentIndex = imagesToShow.indexOf(lightboxImage);
    const prevIndex =
      (currentIndex - 1 + imagesToShow.length) % imagesToShow.length;
    setLightboxImage(imagesToShow[prevIndex]);
    setActiveImage(imagesToShow[prevIndex]);
  };

  const handleModeChange = (mode: 'design' | 'vr' | 'real') => {
    setViewMode(mode);
    setActiveImage(null);
  };

  if (isLoading) {
    return (
      <section className="pt-36 pb-24 bg-black text-zinc-100 min-h-screen relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-16 animate-pulse">
          <div className="h-6 w-32 bg-zinc-900 rounded-md mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="w-full aspect-video bg-zinc-900 rounded-2xl" />
              <div className="flex gap-3">
                <div className="w-20 h-14 bg-zinc-900 rounded-md" />
                <div className="w-20 h-14 bg-zinc-900 rounded-md" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-10 w-3/4 bg-zinc-900 rounded-md" />
              <div className="h-24 w-full bg-zinc-900 rounded-md" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="pt-36 pb-24 bg-black text-zinc-100 min-h-screen flex items-center justify-center">
        <p className="text-xs font-cairo tracking-widest text-zinc-500 uppercase">
          {isRTL ? 'تعذر العثور على المشروع المطلوب' : 'PROJECT NOT FOUND'}
        </p>
      </section>
    );
  }

  return (
    <section className="pt-36 pb-24 bg-black text-zinc-100 min-h-screen relative font-cairo overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="mx-auto max-w-6xl px-6 lg:px-16 relative z-10">
        <button
          onClick={() => navigate('/work/project')}
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-white border border-transparent hover:border-zinc-900 hover:bg-zinc-950/50 px-3 py-1.5 rounded-lg transition-all mb-10 group cursor-pointer"
        >
          {isRTL ? (
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          ) : (
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          )}
          {isRTL ? 'العودة للمشاريع' : 'Back to works'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex p-1 bg-zinc-950 border border-zinc-900 rounded-xl gap-1">
              <button
                onClick={() => handleModeChange('design')}
                className={`flex items-center gap-1.5 cursor-pointer px-4 py-2 text-[10px] font-black uppercase rounded-lg ${viewMode === 'design' ? 'bg-zinc-900 text-accent' : 'text-zinc-500'}`}
              >
                <ImageIcon size={12} /> {isRTL ? 'صور التصميم' : 'Design'}
              </button>
              {project.all_images_real?.length > 0 && (
                <button
                  onClick={() => handleModeChange('real')}
                  className={`flex items-center gap-1.5 cursor-pointer px-4 py-2 text-[10px] font-black uppercase rounded-lg ${viewMode === 'real' ? 'bg-zinc-900 text-accent' : 'text-zinc-500'}`}
                >
                  <ImageIcon size={12} />{' '}
                  {isRTL ? 'صور التنفيذ' : 'Real Photos'}
                </button>
              )}
              {project.all_images_vr?.length > 0 && (
                <button
                  onClick={() => handleModeChange('vr')}
                  className={`flex items-center gap-1.5 cursor-pointer px-4 py-2 text-[10px] font-black uppercase rounded-lg ${viewMode === 'vr' ? 'bg-zinc-900 text-accent' : 'text-zinc-500'}`}
                >
                  <Box size={12} /> {isRTL ? 'معاينة 360°' : '360° View'}
                </button>
              )}
            </div>

            <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-950 border border-zinc-900 rounded-2xl">
              {viewMode === 'vr' ? (
                <SafePannellum imageUrl={currentMainImage} isRTL={isRTL} />
              ) : (
                <>
                  <img
                    src={currentMainImage}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setLightboxImage(currentMainImage)}
                    className="absolute bottom-4 right-4 cursor-pointer p-3 bg-black/80 rounded-xl hover:text-accent"
                  >
                    <Maximize2 size={16} />
                  </button>
                </>
              )}
            </div>

            {imagesToShow.length > 1 && (
              <div className="flex flex-wrap gap-2.5">
                {imagesToShow.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 aspect-[4/3] rounded-lg border ${currentMainImage === img ? 'border-accent' : 'border-zinc-900'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isPending) likeProject(project.id);
                  }}
                  disabled={isPending}
                  className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg border border-zinc-800 transition-all ${
                    isPending
                      ? 'opacity-50 cursor-not-allowed bg-zinc-900'
                      : 'hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-500 bg-zinc-900/50'
                  }`}
                >
                  <Heart
                    size={18}
                    className={`${isPending ? 'animate-pulse' : ''} ${
                      project.links && project.links.length > 0
                        ? 'text-red-500 fill-red-500'
                        : 'text-zinc-400'
                    }`}
                  />
                  <span className="text-xs font-bold font-cairo">
                    {project.likes_count}
                  </span>
                </button>

                {project.category && (
                  <span className="text-1xl font-bold tracking-widest text-accent uppercase bg-accent/5 border border-accent/10 px-2 py-0.5 rounded">
                    {project.category.name}
                  </span>
                )}
                {project.project_number && (
                  <span className="text-2xl font-cairo tracking-widest text-zinc-500 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded">
                    {project.project_number}
                  </span>
                )}

                {project.country && (
                  <span className="inline-flex items-center gap-1 text-2xl font-cairo tracking-widest text-zinc-400 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded">
                    <Globe size={12} className="text-zinc-500" />
                    {project.country}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                {project.name}
              </h1>

              <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-normal whitespace-pre-line border-l-2 border-zinc-900 pl-4">
                {project.description}
              </p>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase block font-cairo">
                  {isRTL ? 'المواصفات والسمات' : 'Project Attributes'}
                </span>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-[11px] font-medium font-cairo bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 hover:border-accent/40 text-zinc-400 hover:text-accent px-3.5 py-1.5 rounded-full transition-all duration-300 ease-out cursor-default select-none shadow-sm whitespace-nowrap"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <div className="pt-4 border-t border-zinc-900/60 space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase block">
                  {isRTL ? 'روابط ومعلومات إضافية' : 'External Links'}
                </span>
                <div className="flex flex-col gap-2">
                  {project.links.map((link) => {
                    const currentLang =
                      (i18n.language?.split('-')[0] as 'ar' | 'en') || 'en';
                    const linkName =
                      typeof link.name === 'object'
                        ? link.name[currentLang] || link.name['en']
                        : link.name;

                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 p-3 rounded-xl text-xs text-zinc-300 hover:text-accent transition-all duration-300 group"
                      >
                        <span className="font-medium">{linkName}</span>
                        <ExternalLink
                          size={12}
                          className="text-zinc-600 group-hover:text-accent transition-colors"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div> */}

          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-8">
            {/* Header */}
            <div className="space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 items-center">
                {project.category && (
                  <span className="text-1xl font-bold tracking-widest text-accent uppercase bg-accent/5 border border-accent/10 px-2 py-0.5 rounded">
                    {project.category.name}
                  </span>
                )}

                {project.country && (
                  <span className="inline-flex items-center gap-1 text-2xl font-cairo tracking-widest text-zinc-400 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded">
                    <Globe size={12} className="text-zinc-500" />
                    {project.country}
                  </span>
                )}

                {project.project_number && (
                  <span className="text-2xl font-cairo tracking-widest text-zinc-500 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded">
                    {project.project_number}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black text-white leading-tight">
                {project.name}
              </h1>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-7 border-l-2 border-zinc-800 pl-4">
                {project.description}
              </p>
            </div>

            {/* Likes */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isPending) likeProject(project.id);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/40 transition"
            >
              <Heart className="text-red-500 fill-red-500" size={18} />
              <span className="text-sm font-bold">{project.likes_count}</span>
            </button>

            {/* Tags */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                {isRTL ? 'المواصفات والسمات' : 'Project Attributes'}
              </span>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-xs rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-accent/40 hover:text-accent transition"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {project.links?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-zinc-900">
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  {isRTL ? 'روابط ومعلومات إضافية' : 'External Links'}
                </span>

                <div className="space-y-2">
                  {project.links.map((link) => {
                    const lang = i18n.language?.startsWith('ar') ? 'ar' : 'en';
                    const linkName = link.name?.[lang] ?? link.name.en;

                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-accent/30 hover:bg-zinc-900 transition group"
                      >
                        <span className="text-sm text-zinc-300 group-hover:text-white">
                          {linkName}
                        </span>

                        <ExternalLink
                          size={14}
                          className="text-zinc-500 group-hover:text-accent"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Projects */}
        <RelatedProjects
          categoryId={project?.category?.id}
          currentProjectId={project?.id}
        />
      </div>

      <AnimatePresence>
        {lightboxImage && viewMode !== 'vr' && (
          <div
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center cursor-zoom-out select-none w-screen h-screen overflow-hidden"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-black/60 hover:bg-zinc-900/90 text-zinc-300 hover:text-white transition-all cursor-pointer z-[10000] backdrop-blur-md border border-zinc-800/40 shadow-lg"
            >
              <X size={22} />
            </button>

            {imagesToShow.length > 1 && (
              <>
                <button
                  onClick={isRTL ? handleNextImage : handlePrevImage}
                  className="absolute left-4 md:left-6 p-2.5 md:p-4 rounded-full bg-black/40 hover:bg-black/80 text-white border border-zinc-800/30 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer z-[10000] shadow-2xl"
                >
                  <ChevronLeft className="w-4 h-4 md:w-7 md:h-7" />
                </button>

                <button
                  onClick={isRTL ? handlePrevImage : handleNextImage}
                  className="absolute right-4 md:right-6 p-2.5 md:p-4 rounded-full bg-black/40 hover:bg-black/80 text-white border border-zinc-800/30 backdrop-blur-sm transition-all hover:scale-105 cursor-pointer z-[10000] shadow-2xl"
                >
                  <ChevronRight className="w-4 h-4 md:w-7 md:h-7" />
                </button>
              </>
            )}

            <img
              src={lightboxImage}
              alt="Project zoomed"
              className="w-full h-full max-w-[95vw] max-h-[92vh] object-contain pointer-events-none absolute inset-0 m-auto z-10"
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
