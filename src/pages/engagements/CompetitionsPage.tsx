import EngagementTimeline from "./EngagementTimeline";
import type { EngagementPageData } from "@/hooks/use-engagement-data";

const DEFAULTS: EngagementPageData = {
  version: 3,
  events: [
    {
      date: "En cours",
      title: "Compétitions",
      description: "Formuler un problème, explorer les données, comparer des approches et apprendre de chaque itération. C'est ça, le vrai moteur.",
    },
    {
      date: "Kaggle & Hackathons",
      title: "Data Science Challenge",
      description: "Participation à des challenges Kaggle et hackathons data. XGBoost, feature engineering, optimisation bayésienne : chaque compétition est un laboratoire.",
    },
    {
      date: "Algorithmique",
      title: "Structures de données & Complexité",
      description: "Les compétitions d'algorithmique affûtent la rigueur et la capacité à résoudre des problèmes sous contrainte. Du dynamic programming au graph theory, chaque problem set est un exercice de style.",
    },
    {
      date: "Collaboration",
      title: "Esprit d'équipe",
      description: "Les meilleures solutions naissent de la collaboration. Travailler en équipe, défendre ses choix, adapter son approche : la compétition forge autant que le résultat final.",
    },
    {
      date: "Vision",
      title: "Toujours progresser",
      description: "Chaque défaite est une leçon. Chaque victoire, une confirmation que le processus fonctionne. L'important, c'est de revenir, encore et encore.",
    },
  ],
};

export default function CompetitionsPage() {
  return (
    <EngagementTimeline
      slug="competitions"
      title="Compétitions"
      subtitle="Data Science & Algorithmique"
      defaults={DEFAULTS}
    />
  );
}
