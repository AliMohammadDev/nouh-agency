import { Link } from 'react-router-dom';
import { useGetRelatedProjects } from '../../api/project';
import { useDirection } from '../../hooks/useDirection';
import { FolderKanban, Heart, MapPin } from 'lucide-react';
import { Project } from '../../types/project';

interface RelatedProjectsProps {
  categoryId: number | undefined;
  currentProjectId: number | string | undefined;
}

export default function RelatedProjects({
  categoryId,
  currentProjectId,
}: RelatedProjectsProps) {
  const { isRTL } = useDirection();

  const { data: relatedProjects, isLoading } = useGetRelatedProjects(
    categoryId,
    currentProjectId
  ) as { data: Project[] | undefined; isLoading: boolean };

  if (isLoading) {
    return (
      <div className="mt-20 pt-10 border-t border-zinc-900/60 animate-pulse">
        <div className="h-6 w-48 bg-zinc-900 rounded-md mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/3] bg-zinc-900 rounded-xl" />
              <div className="h-4 w-3/4 bg-zinc-900 rounded-md" />
              <div className="h-3 w-1/2 bg-zinc-900 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!relatedProjects || relatedProjects.length === 0) return null;

  return (
    <div className="mt-20 pt-10 border-t border-zinc-900/60 relative z-10">
      <div className="flex items-center gap-2 mb-8">
        <FolderKanban size={16} className="text-accent" />
        <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
          {isRTL ? 'مشاريع ذات صلة' : 'Related Projects'}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProjects.map((project) => (
          <Link
            key={project.id}
            to={`/work/project/${project.id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col bg-zinc-950/20 border border-zinc-900/80 hover:border-zinc-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
              {project.main_image ? (
                <img
                  src={project.main_image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 contrast-105 brightness-95"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                  {isRTL ? 'لا توجد صورة' : 'No image'}
                </div>
              )}

              {project.project_number && (
                <span className="absolute top-3 left-3 text-[10px] font-mono tracking-wider text-zinc-300 bg-black/70 border border-zinc-800/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {project.project_number}
                </span>
              )}

              {project.likes_count !== undefined && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 border border-zinc-800/40 px-2 py-0.5 rounded-md backdrop-blur-sm text-[10px] text-zinc-300">
                  <Heart size={10} className="text-red-500 fill-red-500" />
                  <span>{project.likes_count}</span>
                </div>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-accent transition-colors line-clamp-1">
                  {project.name}
                </h3>

                {project.description && (
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-light leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-900/40 mt-1">
                {project.categories ? (
                  <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                    {project.categories.name}
                  </span>
                ) : (
                  <span />
                )}

                {project.country && (
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                    <MapPin size={10} className="text-zinc-500" />
                    <span className="truncate max-w-[80px]">
                      {project.country}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
