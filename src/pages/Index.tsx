import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import { getFeaturedProjects } from "@/data/projects";
import { blogPosts } from "@/data/blog-posts";
import profilePhoto from "@/assets/profile-photo.jpg";

const Index = () => {
  const featured = getFeaturedProjects().slice(0, 4);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-primary font-medium mb-4"
              >
                Bonjour, je suis
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-4"
              >
                Alex Martin
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl font-heading font-medium gradient-text mb-6"
              >
                Data Scientist & Fullstack Developer
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed"
              >
                Je transforme les données en insights actionnables et les idées en applications web performantes. Passionné par l'IA et le développement moderne.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/projets"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Voir mes projets <ArrowRight size={18} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  Me contacter
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 flex justify-center"
            >
              <div className="relative group">
                <img
                  src={profilePhoto}
                  alt="Alex Martin - Data Scientist & Fullstack Developer"
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-gradient glow-blue transition-all duration-300 group-hover:scale-105 group-hover:glow-blue-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Projets sélectionnés</h2>
            <p className="text-muted-foreground mb-12">Une sélection de mes travaux les plus récents.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-12 text-center">
            <Link to="/projets" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              Voir tous les projets <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Du blog</h2>
            <p className="text-muted-foreground mb-12">Réflexions et tutoriels sur la data science et le développement.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-12 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              Voir tous les articles <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Travaillons ensemble</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Vous avez un projet en tête ? Discutons de comment je peux vous aider à le concrétiser.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Discutons de votre projet <ArrowRight size={18} />
            </Link>
            <div className="flex justify-center gap-6 mt-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="mailto:contact@alex.dev" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail size={22} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Index;
