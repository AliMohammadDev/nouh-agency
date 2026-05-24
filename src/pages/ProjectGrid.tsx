import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

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

interface ProjectGridProps {
  projects: ProjectData[];
  isRTL: boolean;
  onProjectClick: (id: number) => void;
}

export function ProjectGrid({
  projects,
  isRTL,
  onProjectClick,
}: ProjectGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isRTL={isRTL}
            onClick={() => onProjectClick(project.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

interface ProjectCardProps {
  project: ProjectData;
  isRTL: boolean;
  onClick: () => void;
}

function ProjectCard({ project, isRTL, onClick }: ProjectCardProps) {
  const projectImg =
    project.image ||
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200';

  return (
    <div
      onClick={onClick}
      className="group flex flex-col cursor-pointer bg-zinc-900/10 backdrop-blur-sm border border-zinc-900/80 p-4 rounded-xl transition-all duration-500 ease-out hover:border-accent/30 hover:bg-zinc-900/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.02)]"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-zinc-950 border border-zinc-900 group-hover:border-zinc-800 transition-colors duration-500">
        <img
          src={projectImg}
          alt={project.name}
          className="w-full h-full object-cover opacity-85 transition-all duration-750 ease-out grayscale-100 contrast-115 brightness-90 group-hover:scale-102 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 group-hover:brightness-100"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-end p-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-accent text-black scale-90 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 shadow-lg">
            <ArrowUpRight
              size={18}
              className={`transition-transform duration-300 ${
                isRTL
                  ? 'group-hover:-translate-x-0.5 group-hover:translate-y-0.5'
                  : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex-1 flex flex-col justify-between px-0.5">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-zinc-200 transition-colors duration-300 group-hover:text-accent line-clamp-1 font-cairo">
            {project.name}
          </h2>
          <p className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed line-clamp-2 font-cairo group-hover:text-zinc-400 transition-colors duration-300">
            {project.description}
          </p>
        </div>

        {(project.project_number ||
          (project.tags && project.tags.length > 0)) && (
          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-zinc-900/60">
            {project.project_number && (
              <span className="font-cairo text-2xl tracking-wider text-zinc-600 group-hover:text-accent/60 transition-colors duration-300">
                {project.project_number}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
