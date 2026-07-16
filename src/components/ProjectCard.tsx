import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";

const categoryColors: Record<string, string> = {
  "data-science": "bg-accent/10 text-accent border-accent/20",
  fullstack: "bg-foreground/5 text-foreground border-foreground/10",
  hybrid: "bg-accent/5 text-accent border-accent/15",
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
      className="group block bg-card border border-border rounded-2xl overflow-hidden card-hover"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className={`absolute top-4 left-4 text-xs font-semibold px-4 py-1.5 rounded-full border ${categoryColors[project.category]}`}>
          {categoryLabels[project.category]}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#6B6B6B] mb-4 line-clamp-2 leading-relaxed">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs px-3 py-1 rounded-full bg-foreground/5 text-foreground/70 font-medium">
              {tech}
            </span>
          ))}
        </div>
        <span className="link-arrow">
          Voir le projet <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
