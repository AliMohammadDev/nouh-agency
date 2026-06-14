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
import SafePannellum from '../components/projects/SafePannellum';
import RelatedProjects from '../components/projects/RelatedProjects';
import { AnimatePresence } from 'framer-motion';

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
  name: string;
  url: string;
}

interface GalleryImage {
  original: string;
  thumbnail: string;
}

interface GalleryAlbum {
  id: number;
  album_name: string;
  images: GalleryImage[];
}

interface Project {
  id: number;
  name: string;
  description: string;
  likes_count: number;
  country: string | null;
  project_number: string;
  main_image: string | null;
  design_galleries: GalleryAlbum[];
  vr_galleries: GalleryAlbum[];
  real_galleries: GalleryAlbum[];
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

  // نستخدم string للتحكم بالتبويب النشط: إما 'all' أو معرف الألبوم كـ string
  const [activeSubTab, setActiveSubTab] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // 1. تحديد مصفوفة الألبومات الحالية بناءً على وضع العرض النشط
  const currentGalleries =
    viewMode === 'design'
      ? project?.design_galleries
      : viewMode === 'real'
        ? project?.real_galleries
        : project?.vr_galleries;

  // 2. عند تغيير وضع العرض الرئيسي، نعود افتراضياً لخيار "الكل"
  useEffect(() => {
    setActiveSubTab('all');
    setActiveImage(null);
  }, [viewMode, project, id]);

  // 3. بناء مصفوفة الصور ومصفوفة الكائنات المصغرة بناءً على التبويب المحدد
  let imagesToShow: string[] = [];
  let thumbnailsToShow: GalleryImage[] = [];

  if (currentGalleries) {
    if (activeSubTab === 'all') {
      // تجميع كافة الصور من كافة الألبومات في القسم النشط
      currentGalleries.forEach((album) => {
        album.images.forEach((img) => {
          imagesToShow.push(img.original);
          thumbnailsToShow.push(img);
        });
      });
    } else {
      // جلب صور ألبوم محدد بناءً على معرفه الفريد (ID)
      const activeAlbum = currentGalleries.find(
        (g) => g.id === Number(activeSubTab)
      );
      if (activeAlbum) {
        imagesToShow = activeAlbum.images.map((img) => img.original);
        thumbnailsToShow = activeAlbum.images;
      }
    }
  }

  // الصورة الكبيرة المعروضة حالياً بالواجهة
  const currentMainImage =
    activeImage || imagesToShow[0] || project?.main_image || '';

  useEffect(() => {
    setLightboxImage(null);
    window.scrollTo(0, 0);
  }, [id]);

  const { mutate: likeProject, isPending } = useLikeProject();

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

  const hasDesignImages =
    project.design_galleries && project.design_galleries.length > 0;
  const hasRealImages =
    project.real_galleries && project.real_galleries.length > 0;
  const hasVrImages = project.vr_galleries && project.vr_galleries.length > 0;

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
          <div className="lg:col-span-7 space-y-6">
            {/* أزرار التبديل الرئيسية للأقسام */}
            <div className="inline-flex p-1 bg-zinc-950 border border-zinc-900 rounded-xl gap-1">
              {hasDesignImages && (
                <button
                  onClick={() => handleModeChange('design')}
                  className={`flex items-center gap-1.5 cursor-pointer px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${viewMode === 'design' ? 'bg-zinc-900 text-accent' : 'text-zinc-500'}`}
                >
                  <ImageIcon size={12} /> {isRTL ? 'صور التصميم' : 'Design'}
                </button>
              )}
              {hasRealImages && (
                <button
                  onClick={() => handleModeChange('real')}
                  className={`flex items-center gap-1.5 cursor-pointer px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${viewMode === 'real' ? 'bg-zinc-900 text-accent' : 'text-zinc-500'}`}
                >
                  <ImageIcon size={12} />{' '}
                  {isRTL ? 'صور التنفيذ' : 'Real Photos'}
                </button>
              )}
              {hasVrImages && (
                <button
                  onClick={() => handleModeChange('vr')}
                  className={`flex items-center gap-1.5 cursor-pointer px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${viewMode === 'vr' ? 'bg-zinc-900 text-accent' : 'text-zinc-500'}`}
                >
                  <Box size={12} /> {isRTL ? 'معاينة 360°' : '360° View'}
                </button>
              )}
            </div>

            {/* التبويبات الفرعية مع إدراج خيار "الكل" في البداية */}
            {currentGalleries && currentGalleries.length > 0 && (
              <div className="flex flex-wrap gap-2 border-b border-zinc-900/60 pb-3">
                {/* زر الكل الثابت */}
                <button
                  onClick={() => {
                    setActiveSubTab('all');
                    setActiveImage(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                    activeSubTab === 'all'
                      ? 'bg-accent/10 border-accent/30 text-accent'
                      : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isRTL ? 'الكل' : 'All'}
                </button>

                {/* بقية الألبومات القادمة من الـ API */}
                {currentGalleries.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => {
                      setActiveSubTab(String(album.id));
                      setActiveImage(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                      activeSubTab === String(album.id)
                        ? 'bg-accent/10 border-accent/30 text-accent'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {album.album_name}
                  </button>
                ))}
              </div>
            )}

            {/* مساحة عرض الصورة الرئيسية الكبيرة أو مشغّل البانوراما */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-950 border border-zinc-900 rounded-2xl">
              {viewMode === 'vr' ? (
                <SafePannellum imageUrl={currentMainImage} isRTL={isRTL} />
              ) : (
                <>
                  {currentMainImage && (
                    <img
                      src={currentMainImage}
                      className="w-full h-full object-cover animate-fade-in"
                      alt=""
                    />
                  )}
                  {currentMainImage && (
                    <button
                      onClick={() => setLightboxImage(currentMainImage)}
                      className="absolute bottom-4 right-4 cursor-pointer p-3 bg-black/80 rounded-xl hover:text-accent"
                    >
                      <Maximize2 size={16} />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* شريط الصور المصغرة التابعة للخيار الحالي النشط */}
            {imagesToShow.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {thumbnailsToShow.map((imgObj, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgObj.original)}
                    className={`w-20 aspect-[4/3] rounded-lg border transition-all overflow-hidden ${currentMainImage === imgObj.original ? 'border-accent scale-95' : 'border-zinc-900 hover:border-zinc-700'}`}
                  >
                    <img
                      src={imgObj.thumbnail || imgObj.original}
                      className="w-full h-full object-cover rounded-md"
                      alt=""
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* تفاصيل ومعلومات المشروع الجانبية */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-8">
            <div className="space-y-3">
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

              <h1 className="text-4xl font-black text-white leading-tight">
                {project.name}
              </h1>

              <p className="text-sm text-zinc-400 leading-7 border-l-2 border-zinc-800 pl-4">
                {project.description}
              </p>
            </div>

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

            {project.links?.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-zinc-900">
                <span className="text-xs uppercase tracking-widest text-zinc-500">
                  {isRTL ? 'روابط ومعلومات إضافية' : 'External Links'}
                </span>

                <div className="space-y-2">
                  {project.links.map((link) => {
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-accent/30 hover:bg-zinc-900 transition group"
                      >
                        <span className="text-sm text-zinc-300 group-hover:text-white">
                          {link.name}
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

        <RelatedProjects
          categoryId={project?.category?.id}
          currentProjectId={project?.id}
        />
      </div>

      {/* نافذة معاينة الصور المكبرة (Lightbox) */}
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
