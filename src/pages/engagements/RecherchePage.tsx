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
      heading: "Recherche & Veille",
      subtitle: "Exploration & Innovation",
      description: "Tester de nouveaux modèles, explorer les dernières avancées en IA et documenter ce que j'apprends pour le partager.",
      leftImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=60",
      rightImage: null,
    },
  ],
};

export default function RecherchePage() {
  const { isAdmin } = useAdmin();
  const { data, isEditing, setIsEditing, save, updateSection } = useEngagementData("recherche", DEFAULTS);

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
