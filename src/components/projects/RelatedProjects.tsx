import { Link } from 'react-router-dom';
import { useGetRelatedProjects } from '../../api/project';
import { useDirection } from '../../hooks/useDirection';
import { FolderKanban } from 'lucide-react';

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
  );

  if (isLoading) {
    return (
      <div className="mt-20 pt-10 border-t border-zinc-900/60 animate-pulse">
        <div className="h-6 w-48 bg-zinc-900 rounded-md mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/3] bg-zinc-900 rounded-xl" />
              <div className="h-4 w-3/4 bg-zinc-900 rounded-md" />
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
            className="group flex flex-col bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 contrast-105 brightness-95"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                  {isRTL ? 'لا توجد صورة' : 'No image'}
                </div>
              )}
              {project.project_number && (
                <span className="absolute top-3 left-3 text-[10px] font-cairo tracking-wider text-zinc-400 bg-black/80 border border-zinc-800/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {project.project_number}
                </span>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-zinc-200 group-hover:text-accent transition-colors line-clamp-1">
                {project.name}
              </h3>
              {project.category && (
                <p className="text-[10px] text-zinc-500 font-medium mt-1 uppercase tracking-wider">
                  {project.category.name}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
