import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Github, ExternalLink, Calendar, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getProjectBySlug, projects } from "@/data/projects";

const categoryLabels: Record<string, string> = {
  "data-science": "Data Science",
  fullstack: "Fullstack",
  hybrid: "Hybride",
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");

  if (!project) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground">Projet non trouvé</h1>
        <Link to="/projets" className="text-primary mt-4 inline-block">← Retour aux projets</Link>
      </div>
    );
  }

  const currentIdx = projects.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const next = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;

  return (
    <>
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
          <p className="text-sm text-muted-foreground mb-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            {" > "}
            <Link to="/projets" className="hover:text-primary transition-colors">Projets</Link>
            {" > "}
            <span className="text-foreground">{project.title}</span>
          </p>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground">{project.title}</h1>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Contexte</h2>
                <p className="text-muted-foreground leading-relaxed">{project.context}</p>
              </AnimatedSection>
              <AnimatedSection>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Approche & Méthodologie</h2>
                <p className="text-muted-foreground leading-relaxed">{project.approach}</p>
              </AnimatedSection>
              <AnimatedSection>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Résultats</h2>
                <p className="text-muted-foreground leading-relaxed">{project.results}</p>
              </AnimatedSection>
              <AnimatedSection>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">Défis & Apprentissages</h2>
                <p className="text-muted-foreground leading-relaxed">{project.challenges}</p>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 bg-card border border-border rounded-xl p-6 space-y-6">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Catégorie</span>
                  <p className="font-medium text-foreground">{categoryLabels[project.category]}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Date</span>
                  <p className="font-medium text-foreground">{project.date}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Technologies</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((t) => (
                      <span key={t} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors">
                      <Github size={16} /> Voir le code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                      <ExternalLink size={16} /> Démo live
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Nav */}
          <div className="flex justify-between mt-20 pt-10 border-t border-border">
            {prev ? (
              <Link to={`/projet/${prev.slug}`} className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-xs text-muted-foreground">Précédent</p>
                  <p className="text-sm font-medium">{prev.title}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/projet/${next.slug}`} className="group flex items-center gap-3 text-right text-muted-foreground hover:text-foreground transition-colors">
                <div>
                  <p className="text-xs text-muted-foreground">Suivant</p>
                  <p className="text-sm font-medium">{next.title}</p>
                </div>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Vous avez un projet similaire ?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Discutons-en <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ProjectDetailPage;
