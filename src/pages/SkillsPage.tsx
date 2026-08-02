import { useState } from "react";
import {
  Code,
  Monitor,
  Server,
  Brain,
  BrainCircuit,
  Sparkles,
  Cloud,
  Award,
  Pencil,
  Plus,
  Trash2,
  Orbit,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";
import { useSkills } from "@/hooks/use-skills";
import { useAdmin } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { api } from "@/api/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const toolSlugs = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "java",
  "react",
  "nextdotjs",
  "tailwindcss",
  "vuejs",
  "d3dotjs",
  "nodedotjs",
  "express",
  "fastapi",
  "postgresql",
  "redis",
  "mongodb",
  "docker",
  "kubernetes",
  "nginx",
  "amazonaws",
  "vercel",
  "github",
  "git",
  "gitlab",
  "linux",
  "openai",
  "pytorch",
  "tensorflow",
  "scikitlearn",
  "pandas",
  "numpy",
  "huggingface",
  "jupyter",
  "langchain",
];

const FALLBACK_LEVELS: Record<string, number> = {
  React: 92,
  "Next.js": 85,
  TypeScript: 90,
  Python: 95,
  "Node.js": 88,
  PostgreSQL: 88,
  SQL: 88,
  Docker: 82,
  TailwindCSS: 90,
  "Framer Motion": 78,
  "D3.js / Plotly": 78,
  "shadcn/ui": 82,
  FastAPI: 85,
  DuckDB: 78,
  "Git / GitHub Actions": 85,
  "Pandas / NumPy": 95,
  "Matplotlib / Seaborn": 88,
  "Plotly / Dash": 82,
  "Power BI": 78,
  "Statistique & Inference Causale": 85,
  "EDA (Exploratory Data Analysis)": 88,
  "Data Storytelling": 82,
  "Scikit-learn": 92,
  PyTorch: 85,
  TensorFlow: 80,
  "XGBoost / LightGBM": 88,
  SHAP: 80,
  "Feature Engineering": 82,
  MLOps: 75,
  "OpenAI / GPT API": 85,
  "HuggingFace Transformers": 82,
  "LangChain / LLM Orchestration": 78,
  "RAG (Retrieval Augmented Generation)": 80,
  "Prompt Engineering": 85,
  "Pinecone / Vector DB": 75,
  "GROQ AI": 72,
  "CI/CD": 80,
  "AWS / Cloud": 75,
};

const expertiseDomains = [
  {
    id: 1,
    title: "Full Stack",
    date: "2018 →",
    category: "Fullstack",
    content:
      "Développement d'applications web complètes de bout en bout : React/Next.js au frontend, Node.js/Express au backend et PostgreSQL pour la donnée.",
    icon: Code,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 95,
    skillNames: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: 2,
    title: "Frontend & UI",
    date: "2018 →",
    category: "Frontend",
    content:
      "Interfaces modernes et performantes : React, Next.js, TailwindCSS, Framer Motion et visualisations D3.js.",
    icon: Monitor,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 90,
    skillNames: ["React", "Next.js", "TailwindCSS", "Framer Motion", "D3.js / Plotly", "shadcn/ui"],
  },
  {
    id: 3,
    title: "Backend & APIs",
    date: "2018 →",
    category: "Backend",
    content:
      "APIs REST robustes, architecture microservices, bases de données relationnelles et services cloud.",
    icon: Server,
    relatedIds: [1, 7],
    status: "completed" as const,
    energy: 88,
    skillNames: ["Node.js", "FastAPI", "PostgreSQL", "SQL", "DuckDB", "Git / GitHub Actions"],
  },
  {
    id: 4,
    title: "Data Science",
    date: "2020 →",
    category: "Data",
    content:
      "Analyse exploratoire, statistiques, feature engineering et storytelling data pour des décisions éclairées.",
    icon: Brain,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 92,
    skillNames: [
      "Pandas / NumPy",
      "Matplotlib / Seaborn",
      "Plotly / Dash",
      "Power BI",
      "Statistique & Inference Causale",
      "EDA (Exploratory Data Analysis)",
      "Data Storytelling",
    ],
  },
  {
    id: 5,
    title: "Machine Learning",
    date: "2021 →",
    category: "ML",
    content:
      "Modèles scikit-learn, XGBoost, LightGBM et deep learning PyTorch / TensorFlow, interprétables grâce à SHAP.",
    icon: BrainCircuit,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 88,
    skillNames: [
      "Scikit-learn",
      "PyTorch",
      "TensorFlow",
      "XGBoost / LightGBM",
      "SHAP",
      "Feature Engineering",
      "MLOps",
    ],
  },
  {
    id: 6,
    title: "AI Engineering",
    date: "2023 →",
    category: "AI",
    content:
      "LLMs, agents et RAG : LangChain, OpenAI, fine-tuning HuggingFace et bases vectorielles Pinecone.",
    icon: Sparkles,
    relatedIds: [5, 7],
    status: "in-progress" as const,
    energy: 82,
    skillNames: [
      "OpenAI / GPT API",
      "HuggingFace Transformers",
      "LangChain / LLM Orchestration",
      "RAG (Retrieval Augmented Generation)",
      "Prompt Engineering",
      "Pinecone / Vector DB",
      "GROQ AI",
    ],
  },
  {
    id: 7,
    title: "MLOps & Cloud",
    date: "2023 →",
    category: "DevOps",
    content:
      "Docker, CI/CD, AWS et industrialisation des modèles en production avec monitoring continu.",
    icon: Cloud,
    relatedIds: [3, 6],
    status: "in-progress" as const,
    energy: 75,
    skillNames: ["Docker", "CI/CD", "AWS / Cloud", "Git / GitHub Actions", "Python", "MLOps"],
  },
];

const SkillsPage = () => {
  const { data, isLoading, refetch } = useSkills();
  const { isAdmin } = useAdmin();

  // Certification dialog
  const [showCertDialog, setShowCertDialog] = useState(false);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [certForm, setCertForm] = useState({ name: "", org: "", year: new Date().getFullYear() });

  const skillCategories = data?.skillCategories || [];
  const certifications = data?.certifications || [];

  const openAddCert = () => {
    setEditingCert(null);
    setCertForm({ name: "", org: "", year: new Date().getFullYear() });
    setShowCertDialog(true);
  };

  const openEditCert = (cert: any) => {
    setEditingCert(cert);
    setCertForm({ name: cert.name, org: cert.org, year: cert.year });
    setShowCertDialog(true);
  };

  const saveCert = async () => {
    try {
      if (editingCert) {
        await api.put(`/admin/skills/certifications/${editingCert.id}`, certForm);
        toast.success("Certification mise à jour !");
      } else {
        await api.post("/admin/skills/certifications", certForm);
        toast.success("Certification ajoutée !");
      }
      setShowCertDialog(false);
      refetch();
    } catch (err: any) { toast.error(err.message || "Erreur"); }
  };

  const deleteCert = async (cert: any) => {
    if (!confirm(`Supprimer "${cert.name}" ?`)) return;
    try {
      await api.delete(`/admin/skills/certifications/${cert.id}`);
      toast.success("Certification supprimée !");
      refetch();
    } catch (err: any) { toast.error(err.message || "Erreur"); }
  };

  if (isLoading) {
    return <div className="py-32 text-center"><p className="text-[#6B6B6B]">Chargement...</p></div>;
  }

  const levelMap: Record<string, number> = {};
  skillCategories.forEach((cat) =>
    cat.skills.forEach((skill: any) => {
      levelMap[skill.name] = skill.level;
    }),
  );

  const expertiseTimeline = expertiseDomains.map(({ skillNames, ...node }) => ({
    ...node,
    skills: skillNames.map((name) => ({
      name,
      level: levelMap[name] ?? FALLBACK_LEVELS[name] ?? 70,
    })),
  }));

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Competences & <span className="text-accent">Expertises</span></h1>
            <p className="text-lg text-[#6B6B6B] max-w-2xl">Developpeur full stack, data scientist & AI engineer — decouvrez mon univers technique.</p>
          </div>
        </AnimatedSection>

        {/* Tech universe */}
        <AnimatedSection>
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-accent/10 text-accent"><Orbit size={24} /></div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Mon Univers Technique</h2>
                <p className="text-[#6B6B6B] mt-1">Une constellation d'outils manipules au quotidien, du web au machine learning.</p>
              </div>
            </div>
            <div className="relative flex size-full max-w-4xl mx-auto items-center justify-center overflow-hidden rounded-3xl border bg-white px-8 pb-12 pt-4">
              <IconCloud iconSlugs={toolSlugs} />
            </div>
          </div>
        </AnimatedSection>

        {/* Orbital expertise */}
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-[#171717] text-white px-4 py-14 md:px-8 mb-20">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-white/80 border border-white/15 mb-5">
                Parcours d'expertise
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Un profil <span className="bg-gradient-to-r from-accent via-sky-400 to-teal-400 bg-clip-text text-transparent">full stack, data & IA</span></h2>
              <p className="text-white/60 text-sm md:text-base">
                Cliquez sur un domaine pour voir le niveau de chaque competence. Les liaisons montrent les connexions entre expertises.
              </p>
            </div>
            <RadialOrbitalTimeline timelineData={expertiseTimeline} className="h-[520px] sm:h-[600px]" />
          </div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Certifications</h2>
            {isAdmin && (
              <button onClick={openAddCert} className="pill-btn-outline text-sm">
                <Plus className="h-4 w-4 mr-2" /> Ajouter
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {certifications.map((cert) => (
              <div key={cert.name} className="group/cert bg-white border border-border rounded-2xl p-6 flex items-start gap-4 card-hover">
                <div className="p-2 rounded-xl bg-accent/10 text-accent"><Award size={20} /></div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground text-sm">{cert.name}</h3>
                  <p className="text-xs text-[#6B6B6B] mt-1">{cert.org} · {cert.year}</p>
                </div>
                {isAdmin && (
                  <div className="flex gap-1 opacity-0 group-hover/cert:opacity-100 transition-opacity">
                    <button className="p-1 rounded hover:bg-foreground/5" onClick={() => openEditCert(cert)}><Pencil size={12} className="text-[#6B6B6B]" /></button>
                    <button className="p-1 rounded hover:bg-red-50" onClick={() => deleteCert(cert)}><Trash2 size={12} className="text-red-500" /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center">
          <Link to="/projets" className="link-arrow">
            Voir mes projets utilisant ces technologies <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>

      {/* Certification Dialog */}
      <Dialog open={showCertDialog} onOpenChange={setShowCertDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingCert ? "Modifier" : "Ajouter"} une certification</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><label className="text-sm font-medium">Nom *</label><Input value={certForm.name} onChange={(e) => setCertForm({ ...certForm, name: e.target.value })} className="rounded-full" /></div>
            <div><label className="text-sm font-medium">Organisme</label><Input value={certForm.org} onChange={(e) => setCertForm({ ...certForm, org: e.target.value })} className="rounded-full" /></div>
            <div><label className="text-sm font-medium">Annee</label><Input type="number" value={certForm.year} onChange={(e) => setCertForm({ ...certForm, year: Number(e.target.value) })} className="rounded-full" /></div>
          </div>
          <DialogFooter>
            <button onClick={() => setShowCertDialog(false)} className="pill-btn-outline text-sm">Annuler</button>
            <button onClick={saveCert} disabled={!certForm.name} className="pill-btn text-sm">{editingCert ? "Mettre a jour" : "Ajouter"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SkillsPage;
