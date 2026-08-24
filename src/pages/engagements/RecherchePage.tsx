import EngagementTimeline from "./EngagementTimeline";
import type { EngagementPageData } from "@/hooks/use-engagement-data";

const DEFAULTS: EngagementPageData = {
  version: 3,
  events: [
    {
      date: "Exploration & Innovation",
      title: "Recherche & Veille",
      description: "Tester de nouveaux modèles, explorer les dernières avancées en IA et documenter ce que j'apprends pour le partager.",
    },
  ],
};

export default function RecherchePage() {
  return (
    <EngagementTimeline
      slug="recherche"
      title="Recherche & Veille"
      subtitle="Exploration & Innovation"
      defaults={DEFAULTS}
    />
  );
}
