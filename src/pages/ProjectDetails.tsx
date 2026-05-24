import { useState } from 'react';
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
} from 'lucide-react';
import { useDirection } from '../hooks/useDirection';
import { useGetProject } from '../api/project';
import { AnimatePresence } from 'motion/react';

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
  project_number: string;
  image: string | null;
  image_vr: string | null;
  all_images: string[];
  all_images_vr: string[];
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

  const [viewMode, setViewMode] = useState<'normal' | 'vr'>('normal');
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const imagesToShow =
    viewMode === 'normal'
      ? project?.all_images || []
      : project?.all_images_vr || [];
  const currentMainImage =
    activeImage ||
    (viewMode === 'normal' ? project?.image : project?.image_vr) ||
    imagesToShow[0];

  const handleModeChange = (mode: 'normal' | 'vr') => {
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
        <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          {isRTL ? 'تعذر العثور على المشروع المطلوبة' : 'PROJECT NOT FOUND'}
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
          onClick={() => navigate(-1)}
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
                onClick={() => handleModeChange('normal')}
                className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${viewMode === 'normal' ? 'bg-zinc-900 text-accent border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <ImageIcon size={12} />
                {isRTL ? 'الصور العادية' : 'Normal View'}
              </button>
              {(project.image_vr || project.all_images_vr?.length > 0) && (
                <button
                  onClick={() => handleModeChange('vr')}
                  className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${viewMode === 'vr' ? 'bg-zinc-900 text-accent border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Box size={12} />
                  {isRTL ? 'معاينة VR' : 'VR Rendering'}
                </button>
              )}
            </div>

            <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-950 border border-zinc-900 rounded-2xl group shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <img
                src={currentMainImage || ''}
                alt={project.name}
                className="w-full h-full object-cover transition-all duration-700 contrast-105 brightness-95"
              />
              <button
                onClick={() => setLightboxImage(currentMainImage || null)}
                className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/80 border border-zinc-800/60 text-zinc-400 hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {imagesToShow.length > 1 && (
              <div className="flex flex-wrap gap-2.5 pt-1">
                {imagesToShow.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-[4/3] w-20 overflow-hidden rounded-lg bg-zinc-950 border transition-all duration-300 cursor-pointer ${currentMainImage === img ? 'border-accent scale-[0.97]' : 'border-zinc-900 hover:border-zinc-700 opacity-60 hover:opacity-100'}`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.category && (
                  <span className="text-[9px] font-bold tracking-widest text-accent uppercase bg-accent/5 border border-accent/10 px-2 py-0.5 rounded">
                    {project.category.name}
                  </span>
                )}
                {project.project_number && (
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 bg-zinc-900 border border-zinc-800/60 px-2 py-0.5 rounded">
                    #{project.project_number}
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
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase block">
                  {isRTL ? 'الأسلوب و الخصائص' : 'Project tags'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-[9px] font-medium font-cairo bg-zinc-950 border border-zinc-900 text-zinc-400 px-3 py-1 rounded-md"
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
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <img
              src={lightboxImage}
              alt="Project zoomed"
              className="max-w-full max-h-[85vh] object-contain rounded-xl border border-zinc-900 shadow-2xl"
            />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
