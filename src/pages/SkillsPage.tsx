import { Code2, Brain, Monitor, Server, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { skillCategories, certifications } from "@/data/skills";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />,
  Brain: <Brain size={24} />,
  Monitor: <Monitor size={24} />,
  Server: <Server size={24} />,
};

const colorMap: Record<string, string> = {
  primary: "text-primary border-primary/30 bg-primary/5",
  "accent-purple": "text-accent-purple border-accent-purple/30 bg-accent-purple/5",
  "accent-cyan": "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5",
  "accent-blue": "text-accent-blue border-accent-blue/30 bg-accent-blue/5",
};

const barColorMap: Record<string, string> = {
  primary: "bg-primary",
  "accent-purple": "bg-accent-purple",
  "accent-cyan": "bg-accent-cyan",
  "accent-blue": "bg-accent-blue",
};

const SkillsPage = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Compétences & Expertises</h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            Un aperçu de mon stack technique et de mes domaines d'expertise.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={i * 0.1}>
              <div className={`bg-card border rounded-xl p-6 ${colorMap[cat.color]} border`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={colorMap[cat.color]}>
                    {iconMap[cat.icon]}
                  </div>
                  <h2 className="text-xl font-heading font-semibold text-foreground">{cat.name}</h2>
                </div>
                <div className="space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColorMap[cat.color]} transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Certifications */}
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-sm">{cert.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cert.org} · {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center">
          <Link to="/projets" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            Voir mes projets utilisant ces technologies <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SkillsPage;
