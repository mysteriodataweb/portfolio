import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedScroll from "@/components/ui/animated-scroll";
import type { ScrollPage } from "@/components/ui/animated-scroll";
import { useEngagementData } from "@/hooks/use-engagement-data";
import EngagementSectionEditor from "@/components/EngagementSectionEditor";
import { useAdmin } from "@/contexts/AdminContext";

const DEFAULTS = {
  sections: [
    {
      heading: "Bénévolat & Mentorat",
      subtitle: "Transmission & Accessibilité",
      description: "Accompagner des débutants, contribuer à des projets communautaires et rendre la tech plus accessible. C'est un engagement au quotidien.",
      leftImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&auto=format&fit=crop&q=60",
      rightImage: null,
    },
    {
      heading: "Mentorat individuel",
      subtitle: "2025 – Aujourd'hui · Côte d'Ivoire",
      description: "Accompagnement de 5 étudiants en informatique : de la découverte de Python aux premiers projets data science. Suivi hebdomadaire, code review et guidance sur les choix de carrière.",
      leftImage: null,
      rightImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Ateliers communautaires",
      subtitle: "2025 · Ouagadougou & Abidjan",
      description: "Animation d'ateliers de initiation à la programmation pour des lycéens et étudiants. Découverte du web, de la logique algorithmique et des métiers de la tech.",
      leftImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=60",
      rightImage: null,
    },
    {
      heading: "Open Source",
      subtitle: "Contributions",
      description: "Contribuer à des projets open source et des initiatives à impact social. La tech a le pouvoir de résoudre des problèmes concrets, à condition qu'elle soit accessible à tous.",
      leftImage: null,
      rightImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Impact durable",
      subtitle: "Vision long terme",
      description: "Le bénévolat n'est pas un sprint, c'est un marathon. Construire quelque chose de durable, former les formateurs, et créer un cercle vertueux de transmission des connaissances.",
      leftImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&auto=format&fit=crop&q=60",
      rightImage: null,
    },
  ],
};

export default function BenevolatPage() {
  const { isAdmin } = useAdmin();
  const { data, isEditing, setIsEditing, save, updateSection } = useEngagementData("benevolat", DEFAULTS);

  const pages: ScrollPage[] = data.sections.map((s) => ({
    leftImage: s.leftImage || null,
    rightImage: s.rightImage || null,
    heading: s.heading,
    subtitle: s.subtitle,
    description: s.description,
  }));

  return (
    <div className="relative">
      <Link
        to="/engagements"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/80 text-white text-sm font-medium backdrop-blur hover:bg-foreground transition-colors"
      >
        <ArrowLeft size={16} /> Retour
      </Link>

      <AnimatedScroll pages={pages} backTo="/engagements" />

      {isAdmin && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold shadow-lg hover:bg-accent/80 transition-colors"
        >
          Modifier les sections
        </button>
      )}

      {isAdmin && isEditing && (
        <>
          {data.sections.map((section, i) => (
            <EngagementSectionEditor key={i} section={section} index={i} onSave={updateSection} />
          ))}
          <button
            onClick={() => save(data)}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white text-sm font-semibold shadow-lg hover:bg-green-700 transition-colors"
          >
            Tout enregistrer
          </button>
        </>
      )}
    </div>
  );
}
