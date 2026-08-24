import EngagementTimeline from "./EngagementTimeline";
import type { EngagementPageData } from "@/hooks/use-engagement-data";

const DEFAULTS: EngagementPageData = {
  version: 3,
  events: [
    {
      date: "Partage & Échanges",
      title: "Conférences & Meetups",
      description: "Prendre la parole, partager un retour d'expérience, écouter la communauté. Les rencontres nourrissent toujours mes idées.",
    },
    {
      date: "Mars 2026 · Abidjan, Côte d'Ivoire",
      title: "Data Science Summit",
      description: "Présentation d'un projet de prédiction de churn client devant un public de 200+ data scientists. Explication du pipeline ML, des choix d'architecture et des résultats obtenus en production.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60",
    },
    {
      date: "Janvier 2026 · Ouagadougou, Burkina Faso",
      title: "AI/ML Meetup Ouaga",
      description: "Retour d'expérience sur l'intégration de LLMs en production : défis de latence, coûts, et stratégies de fallback. Échange animé avec la communauté locale.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&auto=format&fit=crop&q=60",
    },
    {
      date: "Novembre 2025 · Dakar, Sénégal",
      title: "Hackathon Tech4Good",
      description: "Participation à un hackathon sur les solutions tech pour le développement durable. Équipe de 4, projet sur l'optimisation de la distribution d'eau potable.",
      image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=900&auto=format&fit=crop&q=60",
    },
    {
      date: "L'objectif",
      title: "Contribuer davantage",
      description: "L'objectif : contribuer davantage à la communauté en partageant davantage. Chaque conférence donnée est un pas vers une tech plus ouverte et plus accessible.",
    },
  ],
};

export default function ConferencesPage() {
  return (
    <EngagementTimeline
      slug="conferences"
      title="Conférences & Meetups"
      subtitle="Partage & Échanges"
      defaults={DEFAULTS}
    />
  );
}
