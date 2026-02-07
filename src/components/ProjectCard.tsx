import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";

const categoryColors: Record<string, string> = {
  "data-science": "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30",
  fullstack: "bg-primary/10 text-primary border-primary/30",
  hybrid: "bg-accent-purple/10 text-accent-purple border-accent-purple/30",
};

const categoryLabels: Record<string, string> = {
  "data-science": "Data Science",
  fullstack: "Fullstack",
  hybrid: "Hybride",
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      to={`/projet/${project.slug}`}
      className="group block bg-card border border-border rounded-xl overflow-hidden card-hover"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className={`absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full border ${categoryColors[project.category]}`}>
          {categoryLabels[project.category]}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {tech}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
          Voir le projet <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
