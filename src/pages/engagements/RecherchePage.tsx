import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedScroll from "@/components/ui/animated-scroll";
import type { ScrollPage } from "@/components/ui/animated-scroll";

const pages: ScrollPage[] = [
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Recherche & Veille",
      description:
        "Tester de nouveaux modèles, explorer les dernières avancées en IA et documenter ce que j'apprends pour le partager.",
    },
  },
];

export default function RecherchePage() {
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
