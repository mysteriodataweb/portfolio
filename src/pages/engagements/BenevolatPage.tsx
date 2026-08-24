import EngagementTimeline from "./EngagementTimeline";
import type { EngagementPageData } from "@/hooks/use-engagement-data";

const DEFAULTS: EngagementPageData = {
  version: 3,
  events: [
    {
      date: "Transmission & Accessibilité",
      title: "Bénévolat & Mentorat",
      description: "Accompagner des débutants, contribuer à des projets communautaires et rendre la tech plus accessible. C'est un engagement au quotidien.",
    },
    {
      date: "2025 – Aujourd'hui · Côte d'Ivoire",
      title: "Mentorat individuel",
      description: "Accompagnement de 5 étudiants en informatique : de la découverte de Python aux premiers projets data science. Suivi hebdomadaire, code review et guidance sur les choix de carrière.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=60",
    },
    {
      date: "2025 · Ouagadougou & Abidjan",
      title: "Ateliers communautaires",
      description: "Animation d'ateliers de initiation à la programmation pour des lycéens et étudiants. Découverte du web, de la logique algorithmique et des métiers de la tech.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=60",
    },
    {
      date: "Contributions",
      title: "Open Source",
      description: "Contribuer à des projets open source et des initiatives à impact social. La tech a le pouvoir de résoudre des problèmes concrets, à condition qu'elle soit accessible à tous.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&auto=format&fit=crop&q=60",
    },
    {
      date: "Vision long terme",
      title: "Impact durable",
      description: "Le bénévolat n'est pas un sprint, c'est un marathon. Construire quelque chose de durable, former les formateurs, et créer un cercle vertueux de transmission des connaissances.",
    },
  ],
};

export default function BenevolatPage() {
  return (
    <EngagementTimeline
      slug="benevolat"
      title="Bénévolat & Mentorat"
      subtitle="Transmission & Accessibilité"
      defaults={DEFAULTS}
    />
  );
}
