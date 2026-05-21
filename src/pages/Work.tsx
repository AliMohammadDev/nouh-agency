import { useTranslation } from "react-i18next";

const projects = [
  { id: "01", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&auto=format", category: "Web Design", year: "2026" },
  { id: "02", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&auto=format", category: "Branding", year: "2025" },
  { id: "03", image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&h=500&fit=crop&auto=format", category: "Mobile App", year: "2025" },
  { id: "04", image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=500&fit=crop&auto=format", category: "Dashboard", year: "2024" },
];

export default function Work() {
  const { t } = useTranslation();

  return (
    <section className="pt-32 pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-widest text-accent">
            {t("nav.links.work")}
          </span>
          <h1 className="text-5xl font-bold lg:text-6xl">{t("features.heading")}</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.id}
              href="#"
              className="group relative overflow-hidden rounded-sm border border-border bg-secondary"
            >
              <div className="aspect-[16/9] overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.category}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">{p.id}</span>
                  <span className="text-sm font-medium">{p.category}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
