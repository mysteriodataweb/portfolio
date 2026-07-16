import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="font-heading text-xl font-bold text-white">
              Alfred<span className="text-accent">.</span>Mysteriowebdata
            </Link>
            <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">
              Data Scientist & Fullstack Developer passionne par l'IA, le machine learning et les applications web modernes.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Navigation</h4>
            <div className="flex flex-col gap-3">
              {["Projets", "Competences", "Blog", "CV", "A propos", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace("a propos", "about").replace("competences", "competences")}`}
                  className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="https://github.com/Mysteriowebdata" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-2" aria-label="GitHub">
                <Github size={16} /> GitHub <ArrowUpRight size={12} />
              </a>
              <a href="https://linkedin.com/in/AlfredMysteriowebdata" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-2" aria-label="LinkedIn">
                <Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
              </a>
              <a href="mailto:fredbiam9@gmail.com" className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-2" aria-label="Email">
                <Mail size={16} /> Email <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Alfred.Mysteriowebdata — Tous droits reserves
          </p>
          <div className="flex gap-1 text-xs text-white/30">
            <span className="text-accent">●</span> Made with passion
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
