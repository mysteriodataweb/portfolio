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
      heading: "Conférences & Meetups",
      subtitle: "Partage & Échanges",
      description: "Prendre la parole, partager un retour d'expérience, écouter la communauté. Les rencontres nourrissent toujours mes idées.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Data Science Summit",
      subtitle: "Mars 2026 · Abidjan, Côte d'Ivoire",
      description: "Présentation d'un projet de prédiction de churn client devant un public de 200+ data scientists. Explication du pipeline ML, des choix d'architecture et des résultats obtenus en production.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "AI/ML Meetup Ouaga",
      subtitle: "Janvier 2026 · Ouagadougou, Burkina Faso",
      description: "Retour d'expérience sur l'intégration de LLMs en production : défis de latence, coûts, et stratégies de fallback. Échange animé avec la communauté locale.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Hackathon Tech4Good",
      subtitle: "Novembre 2025 · Dakar, Sénégal",
      description: "Participation à un hackathon sur les solutions tech pour le développement durable. Équipe de 4, projet sur l'optimisation de la distribution d'eau potable.",
      image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=900&auto=format&fit=crop&q=60",
    },
    {
      heading: "Contribuer davantage",
      subtitle: "L'objectif",
      description: "L'objectif : contribuer davantage à la communauté en partageant davantage. Chaque conférence donnée est un pas vers une tech plus ouverte et plus accessible.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&auto=format&fit=crop&q=60",
    },
  ],
};

export default function ConferencesPage() {
  const { isAdmin } = useAdmin();
  const { data, isEditing, setIsEditing, save, updateSection } = useEngagementData("conferences", DEFAULTS);

  const pages: ScrollPage[] = data.sections.map((s) => ({
    image: s.image || null,
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
