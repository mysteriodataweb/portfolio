import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedScroll from "@/components/ui/animated-scroll";
import type { ScrollPage } from "@/components/ui/animated-scroll";

const pages: ScrollPage[] = [
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Bénévolat & Mentorat",
      description:
        "Accompagner des débutants, contribuer à des projets communautaires et rendre la tech plus accessible. C'est un engagement au quotidien.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Mentorat",
      description:
        "Guider un débutant dans son premier projet, c'est revivre ses propres débuts et réaliser à quel point le partage transforme les deux côtés de l'équation.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Projets communautaires",
      description:
        "Contribuer à des initiatives open source ou des projets à impact social. La tech a le pouvoir de résoudre des problèmes concrets, à condition qu'elle soit accessible à tous.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Accessibilité",
      description:
        "Rendre la tech plus accessible, c'est aussi démystifier le jargon, créer des ressources claires et montrer que tout le monde peut apprendre à coder, peu importe son parcours.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Impact durable",
      description:
        "Le bénévolat n'est pas un sprint, c'est un marathon. Construire quelque chose de durable, former les formateurs, et créer un cercle vertueux de transmission des connaissances.",
    },
  },
];

export default function BenevolatPage() {
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
