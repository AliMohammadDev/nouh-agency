import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; 
import { motion, Variants } from 'motion/react';
import { Heart, Loader2, ArrowUpRight } from 'lucide-react';
import { useDirection } from '../../hooks/useDirection';
import { useGetTopLikedProjects } from '../../api/project';
import { Project } from '@/src/types/project';

export default function TopLikedProjects() {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const navigate = useNavigate(); 

  const { data: topProjects, isLoading } = useGetTopLikedProjects() as {
    data: Project[] | undefined;
    isLoading: boolean;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-zinc-950 text-white flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <span className="text-xs tracking-widest text-zinc-500 uppercase font-cairo">
            {t('topLiked.loading')}
          </span>
        </div>
      </section>
    );
  }

  if (!topProjects || topProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-b border-accent/10 font-cairo">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-accent)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-16 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-accent/10 pb-6">
          <div className="max-w-2xl">
            <span className="text-accent text-sm font-bold tracking-wider uppercase block mb-2">
              {t('topLiked.tagline')}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl !leading-tight text-white font-cairo">
              {t('topLiked.title')}
            </h2>
            <p className="mt-3 text-base text-zinc-400 font-cairo max-w-xl">
              {t('topLiked.subtitle')}
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {topProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/work/project/${project.id}`)}
              className="group relative border border-accent/10 bg-black/40 transition-all duration-500 hover:border-accent/30 hover:bg-black/80 rounded-none overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-accent/20 opacity-70 group-hover:border-accent group-hover:w-4 group-hover:h-4 transition-all duration-300 z-20" />
              <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-accent/20 opacity-70 group-hover:border-accent group-hover:w-4 group-hover:h-4 transition-all duration-300 z-20" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-accent/20 opacity-70 group-hover:border-accent group-hover:w-4 group-hover:h-4 transition-all duration-300 z-20" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-accent/20 opacity-70 group-hover:border-accent group-hover:w-4 group-hover:h-4 transition-all duration-300 z-20" />

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.main_image || ''}
                  alt={project.name}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-full shadow-lg">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                  <span className="text-xs font-bold text-white">
                    {project.likes_count || 0}
                  </span>
                </div>

                {project.categories && (
                  <div className="absolute bottom-4 left-4 bg-accent/90 text-black text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider">
                    {project.categories.name}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between border-t border-accent/5">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300 font-cairo mb-2">
                    {project.name}
                  </h3>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {project.description || t('topLiked.defaultDesc')}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-zinc-900 flex items-center justify-between">
                  <span className="text-[18px] text-zinc-500 font-cairo">
                    {project.project_number || project.id}
                  </span>
                  <div className="text-accent/60 group-hover:text-accent transition-colors duration-300 flex items-center gap-1 text-xs font-bold">
                    <span>{t('topLiked.viewProject')}</span>
                    <ArrowUpRight
                      size={14}
                      className={`transition-transform ${isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
