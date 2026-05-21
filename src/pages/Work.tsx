import { useTranslation } from 'react-i18next';
import { useGetProjects } from '../api/project';

export default function Work() {
  const { t } = useTranslation();
  const { data: projects, isLoading } = useGetProjects();

  if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h1 className="text-5xl font-bold mb-12">{t('nav.links.work')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project) => (
            <div key={project.id} className="border border-border p-4">
              <img src={project.image} className="w-full h-60 object-cover" />

              <h2 className="text-xl font-semibold mt-4">{project.name}</h2>

              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>

              <div className="flex gap-2 mt-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs bg-secondary px-2 py-1 rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
