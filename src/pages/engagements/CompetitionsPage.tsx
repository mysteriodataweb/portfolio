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
      heading: "Compétitions",
      subtitle: "Data Science & Algorithmique",
      description: "Formuler un problème, explorer les données, comparer des approches et apprendre de chaque itération. C'est ça, le vrai moteur.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Data Science Challenge",
      subtitle: "Kaggle & Hackathons",
      description: "Participation à des challenges Kaggle et hackathons data. XGBoost, feature engineering, optimisation bayésienne : chaque compétition est un laboratoire.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Algorithmique",
      subtitle: "Structures de données & Complexité",
      description: "Les compétitions d'algorithmique affûtent la rigueur et la capacité à résoudre des problèmes sous contrainte.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Esprit d'équipe",
      subtitle: "Collaboration & Leadership",
      description: "Les meilleures solutions naissent de la collaboration. Travailler en équipe, défendre ses choix, adapter son approche : la compétition forge autant que le résultat final.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Toujours progresser",
      subtitle: "Résilience & Apprentissage",
      description: "Chaque défaite est une leçon. Chaque victoire, une confirmation que le processus fonctionne. L'important, c'est de revenir.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=60",
    },
  ],
};

export default function CompetitionsPage() {
  const { isAdmin } = useAdmin();
  const { data, isEditing, setIsEditing, save, updateSection } = useEngagementData("competitions", DEFAULTS);

  const pages: ScrollPage[] = data.sections.map((s) => ({
    leftBgImage: s.image || null,
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      heading: s.heading,
      subtitle: s.subtitle,
      description: s.description,
    },
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
            <EngagementSectionEditor
              key={i}
              section={section}
              index={i}
              onSave={updateSection}
            />
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
