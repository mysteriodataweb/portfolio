import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="font-heading text-xl font-bold text-foreground">
             Alfred.Mysteriowebdata
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Data Scientist & Fullstack Developer passionné par l'IA, le machine learning et les applications web modernes.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              {["Projets", "Compétences", "Blog", "À propos", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace("à propos", "about").replace("compétences", "competences")}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex gap-4">
              <a href="https://github.com/Mysteriowebdata" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/AlfredMysteriowebdata" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:fredbiam9@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Alfred.Mysteriowebdata — Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default Footer;
