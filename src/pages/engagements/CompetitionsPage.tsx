import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedScroll from "@/components/ui/animated-scroll";
import type { ScrollPage } from "@/components/ui/animated-scroll";

const pages: ScrollPage[] = [
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Compétitions",
      description:
        "Formuler un problème, explorer les données, comparer des approches et apprendre de chaque itération. C'est ça, le vrai moteur.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Data Science Challenge",
      description:
        "Participation à des challenges Kaggle et hackathons data. XGBoost, feature engineering, optimisation bayésienne : chaque compétition est un laboratoire.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Algorithmique",
      description:
        "Structures de données, complexité, optimisation. Les compétitions d'algorithmique affûtent la rigueur et la capacité à résoudre des problèmes sous contrainte.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Esprit d'équipe",
      description:
        "Les meilleures solutions naissent de la collaboration. Travailler en équipe, defender ses choix, adapter son approche : la compétition forge autant que le résultat final.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Toujours progresser",
      description:
        "Chaque défaite est une leçon. Chaque victoire, une confirmation que le processus fonctionne. L'important, c'est de revenir.",
    },
  },
];

export default function CompetitionsPage() {
  return (
    <div className="relative">
      <Link
        to="/engagements"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur hover:bg-black/80 transition-colors"
      >
        <ArrowLeft size={16} /> Retour
      </Link>
      <AnimatedScroll pages={pages} />
    </div>
  );
}
