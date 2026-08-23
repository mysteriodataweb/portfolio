import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedScroll from "@/components/ui/animated-scroll";
import type { ScrollPage } from "@/components/ui/animated-scroll";

const pages: ScrollPage[] = [
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Conférences & Meetups",
      description:
        "Prendre la parole, partager un retour d'expérience, écouter la communauté. Les rencontres nourrissent toujours mes idées.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Partage de connaissances",
      description:
        "Présenter un projet devant un public technique : expliquer les choix d'architecture, montrer les résultats, et surtout les limites. C'est dans l'honnêteté qu'on apprend le plus.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Meetups tech",
      description:
        "Assister à un meetup, c'est sortir de sa zone de confort. Découvrir des perspectives différentes, poser des questions, et parfois realizing qu'on n'est pas seul face à un problème.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Networking authentique",
      description:
        "Les meilleurs échanges ne viennent pas des cartes de visite, mais des conversations autour d'un café après une conférence. Construire des liens authentiques, pas des contacts superficiels.",
    },
  },
  {
    leftBgImage:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&auto=format&fit=crop&q=60",
    rightContent: {
      heading: "Retour sur scène",
      description:
        "L'objectif : contribuer davantage à la communauté en partageant davantage. Chaque conférence donnée est un pas vers une tech plus ouverte et plus accessible.",
    },
  },
];

export default function ConferencesPage() {
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
