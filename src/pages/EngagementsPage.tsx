import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, HandHeart, Mic, Trophy } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const items = [
  {
    icon: Trophy,
    title: "Compétitions",
    desc: "Je participe régulièrement à des compétitions de data science et d'algorithmique. Au-delà du résultat, ce qui compte, c'est le processus : formuler un problème, explorer les données, comparer des approches et apprendre de chaque itération.",
  },
  {
    icon: Mic,
    title: "Conférences & meetups",
    desc: "J'aime prendre la parole et échanger avec la communauté tech. Présenter un projet, partager un retour d'expérience ou simplement écouter, les rencontres nourrissent toujours mes idées.",
  },
  {
    icon: HandHeart,
    title: "Bénévolat & mentorat",
    desc: "Je crois à la transmission. Accompagner des débutants, contribuer à des projets communautaires et rendre la tech plus accessible font partie de mes engagements au quotidien.",
  },
  {
    icon: FlaskConical,
    title: "Recherche & veille",
    desc: "Je consacre du temps à l'expérimentation : tester de nouveaux modèles, explorer les dernières avancées en IA et documenter ce que j'apprends pour le partager.",
  },
];

const EngagementsPage = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="mb-16">
            <p className="text-sm font-medium tracking-wide text-accent uppercase mb-3">Mes engagements</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Je ne fais pas <span className="text-accent">que coder</span>
            </h1>
            <p className="text-lg text-[#6B6B6B] max-w-2xl">
              Compétitions, échanges, transmission et recherche : une vie tech riche, en dehors des écrans.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 h-full card-hover">
                <div className="p-3 rounded-xl bg-accent/10 text-accent mb-5 w-fit">
                  <item.icon size={24} />
                </div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-3">{item.title}</h2>
                <p className="text-[#6B6B6B] leading-[1.7]">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mb-8">
          <p className="text-[#6B6B6B] text-lg mb-8 max-w-2xl mx-auto">
            Une envie d'échanger, de collaborer ou de partager une expérience ?
          </p>
          <Link to="/contact" className="pill-btn">
            Me contacter <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default EngagementsPage;
