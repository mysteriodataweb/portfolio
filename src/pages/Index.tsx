import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import MorphButton from "@/components/MorphButton";
import IdentityCard from "@/components/IdentityCard";
import { useFeaturedProjects } from "@/hooks/use-projects";
import { useBlogPosts } from "@/hooks/use-blog";

const Index = () => {
  const { data: featured = [] } = useFeaturedProjects();
  const { data: allPosts = [] } = useBlogPosts();
  const featuredSliced = featured.slice(0, 4);
  const latestPosts = allPosts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #171717 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#6B6B6B] font-medium mb-4"
              >
                Bonjour, je suis
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-4 leading-tight"
              >
                Alfred <span className="text-accent">Mysterio</span>WebData
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl font-heading font-medium text-foreground mb-6"
              >
                Data Scientist & <span className="text-accent">Fullstack Developer</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-[#6B6B6B] max-w-lg mb-10 leading-relaxed"
              >
                Je transforme les donnees en insights actionnables et les idees en applications web performantes. Passionne par l'IA et le developpement moderne.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <MorphButton to="/projets">Voir mes projets</MorphButton>
                <Link to="/contact" className="pill-btn-outline">
                  Contact Me
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 flex justify-center items-center"
            >
              <IdentityCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <div className="stats-band">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">5<span className="text-accent">+</span></p>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">Annees d'experience</p>
            </div>
            <div className="w-px h-10 bg-white/20 hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">30<span className="text-accent">+</span></p>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">Projets realises</p>
            </div>
            <div className="w-px h-10 bg-white/20 hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">15<span className="text-accent">+</span></p>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">Clients satisfaits</p>
            </div>
            <div className="w-px h-10 bg-white/20 hidden md:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">10<span className="text-accent">+</span></p>
              <p className="text-xs text-white/60 mt-1 uppercase tracking-wider">Articles publies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Projets <span className="text-accent">selectionnes</span></h2>
            <p className="text-[#6B6B6B] mb-12">Une selection de mes travaux les plus recents.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredSliced.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-12 text-center">
            <Link to="/projets" className="link-arrow">
              Voir tous les projets <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Du <span className="text-accent">blog</span></h2>
            <p className="text-[#6B6B6B] mb-12">Reflexions et tutoriels sur la data science et le developpement.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-12 text-center">
            <Link to="/blog" className="link-arrow">
              Voir tous les articles <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div className="container mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Travaillons <span className="text-accent">ensemble</span></h2>
            <p className="text-white/60 max-w-lg mx-auto mb-10">
              Vous avez un projet en tete ? Discutons de comment je peux vous aider a le concretiser.
            </p>
            <Link to="/contact" className="pill-btn" style={{ background: "#E07B39" }}>
              Discutons de votre projet
            </Link>
            <div className="flex justify-center gap-6 mt-10">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="GitHub">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="mailto:contact@alex.dev" className="text-white/50 hover:text-white transition-colors" aria-label="Email">
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
