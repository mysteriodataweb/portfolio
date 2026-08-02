import { useState } from "react";
import {
  Code2,
  Brain,
  Monitor,
  Server,
  Sparkles,
  BarChart3,
  Award,
  Pencil,
  Save,
  X,
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
import { Code, BrainCircuit, Cloud } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />,
  Brain: <Brain size={24} />,
  Sparkles: <Sparkles size={24} />,
  Monitor: <Monitor size={24} />,
  Server: <Server size={24} />,
  BarChart3: <BarChart3 size={24} />,
};

const colorMap: Record<string, string> = {
  primary: "text-foreground border-foreground/10 bg-foreground/5",
  "accent-purple": "text-purple-600 border-purple-600/20 bg-purple-600/10",
  "accent-orange": "text-accent border-accent/20 bg-accent/10",
  "accent-cyan": "text-cyan-600 border-cyan-600/20 bg-cyan-600/10",
  "accent-blue": "text-blue-600 border-blue-600/20 bg-blue-600/10",
  "accent-green": "text-emerald-600 border-emerald-600/20 bg-emerald-600/10",
};

const barColorMap: Record<string, string> = {
  primary: "bg-foreground",
  "accent-purple": "bg-purple-600",
  "accent-orange": "bg-accent",
  "accent-cyan": "bg-cyan-600",
  "accent-blue": "bg-blue-600",
  "accent-green": "bg-emerald-600",
};

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

const expertiseTimeline = [
  {
    id: 1,
    title: "Full Stack",
    date: "2018 →",
    content:
      "Développement d'applications web complètes de bout en bout : React/Next.js au frontend, Node.js/Express au backend et PostgreSQL pour la donnée.",
    category: "Fullstack",
    icon: Code,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Frontend & UI",
    date: "2018 →",
    content:
      "Interfaces modernes et performantes : React, Next.js, TailwindCSS, Framer Motion et visualisations D3.js.",
    category: "Frontend",
    icon: Monitor,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Backend & APIs",
    date: "2018 →",
    content:
      "APIs REST robustes, architecture microservices, bases de données relationnelles et services cloud.",
    category: "Backend",
    icon: Server,
    relatedIds: [1, 7],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 4,
    title: "Data Science",
    date: "2020 →",
    content:
      "Analyse exploratoire, statistiques, feature engineering et storytelling data pour des décisions éclairées.",
    category: "Data",
    icon: Brain,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 5,
    title: "Machine Learning",
    date: "2021 →",
    content:
      "Modèles scikit-learn, XGBoost, LightGBM et deep learning PyTorch / TensorFlow, interprétables grâce à SHAP.",
    category: "ML",
    icon: BrainCircuit,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 6,
    title: "AI Engineering",
    date: "2023 →",
    content:
      "LLMs, agents et RAG : LangChain, OpenAI, fine-tuning HuggingFace et bases vectorielles Pinecone.",
    category: "AI",
    icon: Sparkles,
    relatedIds: [5, 7],
    status: "in-progress" as const,
    energy: 82,
  },
  {
    id: 7,
    title: "MLOps & Cloud",
    date: "2023 →",
    content:
      "Docker, CI/CD, AWS et industrialisation des modèles en production avec monitoring continu.",
    category: "DevOps",
    icon: Cloud,
    relatedIds: [3, 6],
    status: "in-progress" as const,
    energy: 75,
  },
];

const SkillsPage = () => {
  const { data, isLoading, refetch } = useSkills();
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [editedSkills, setEditedSkills] = useState<any[]>([]);

  // Skill dialog
  const [showSkillDialog, setShowSkillDialog] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [skillForm, setSkillForm] = useState({ name: "", level: 50, category_id: "" });

  // Certification dialog
  const [showCertDialog, setShowCertDialog] = useState(false);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [certForm, setCertForm] = useState({ name: "", org: "", year: new Date().getFullYear() });

  const skillCategories = data?.skillCategories || [];
  const certifications = data?.certifications || [];

  const startEdit = () => {
    setEditedSkills(skillCategories.map((cat) => ({ ...cat, skills: cat.skills.map((s) => ({ ...s })) })));
    setEditing(true);
  };

  const updateSkillLevel = (catIdx: number, skillIdx: number, level: number) => {
    const updated = [...editedSkills];
    updated[catIdx].skills[skillIdx].level = level;
    setEditedSkills(updated);
  };

  const saveEdit = async () => {
    try {
      for (const cat of editedSkills) {
        for (const skill of cat.skills) {
          await api.put(`/admin/skills/${skill.id}`, { name: skill.name, level: skill.level, category_id: cat.id });
        }
      }
      toast.success("Compétences mises à jour !");
      setEditing(false);
      refetch();
    } catch (err: any) { toast.error(err.message || "Erreur"); }
  };

  // Skills CRUD
  const openAddSkill = (categoryId: string) => {
    setEditingSkill(null);
    setSkillForm({ name: "", level: 50, category_id: categoryId });
    setShowSkillDialog(true);
  };

  const openEditSkill = (skill: any) => {
    setEditingSkill(skill);
    setSkillForm({ name: skill.name, level: skill.level, category_id: skill.category_id });
    setShowSkillDialog(true);
  };

  const saveSkill = async () => {
    try {
      if (editingSkill) {
        await api.put(`/admin/skills/${editingSkill.id}`, skillForm);
        toast.success("Compétence mise à jour !");
      } else {
        await api.post("/admin/skills", skillForm);
        toast.success("Compétence ajoutée !");
      }
      setShowSkillDialog(false);
      refetch();
    } catch (err: any) { toast.error(err.message || "Erreur"); }
  };

  const deleteSkill = async (skill: any) => {
    if (!confirm(`Supprimer "${skill.name}" ?`)) return;
    try {
      await api.delete(`/admin/skills/${skill.id}`);
      toast.success("Compétence supprimée !");
      refetch();
    } catch (err: any) { toast.error(err.message || "Erreur"); }
  };

  // Certifications CRUD
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

  const displayCategories = editing ? editedSkills : skillCategories;

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-start justify-between mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Competences & <span className="text-accent">Expertises</span></h1>
              <p className="text-lg text-[#6B6B6B] max-w-2xl">Developpeur full stack, data scientist & AI engineer — decouvrez mon univers technique.</p>
            </div>
            <div className="flex gap-2">
              {isAdmin && !editing && (
                <button onClick={startEdit} className="pill-btn-outline text-sm">
                  <Pencil className="h-4 w-4 mr-2" /> Modifier
                </button>
              )}
              {editing && (
                <>
                  <button onClick={saveEdit} className="pill-btn text-sm">
                    <Save className="h-4 w-4 mr-2" /> Enregistrer
                  </button>
                  <button onClick={() => setEditing(false)} className="pill-btn-outline text-sm">
                    <X className="h-4 w-4 mr-2" /> Annuler
                  </button>
                </>
              )}
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {displayCategories.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={i * 0.1}>
              <div className="bg-white border border-border rounded-2xl p-6 card-hover">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${colorMap[cat.color]}`}>{iconMap[cat.icon] || iconMap.Code2}</div>
                    <h2 className="text-xl font-heading font-semibold text-foreground">{cat.name}</h2>
                  </div>
                  {isAdmin && !editing && (
                    <button className="p-2 rounded-full hover:bg-foreground/5 transition-colors" onClick={() => openAddSkill(cat.id)}>
                      <Plus size={16} className="text-[#6B6B6B]" />
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {cat.skills.map((skill: any, j: number) => (
                    <div key={skill.name} className="group/skill">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        {editing ? (
                          <div className="flex items-center gap-2">
                            <input type="range" min="0" max="100" value={skill.level} onChange={(e) => updateSkillLevel(i, j, Number(e.target.value))} className="w-20" />
                            <span className="text-xs text-[#6B6B6B] w-8">{skill.level}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#6B6B6B]">{skill.level}%</span>
                            {isAdmin && (
                              <div className="flex gap-1 opacity-0 group-hover/skill:opacity-100 transition-opacity">
                                <button className="p-1 rounded hover:bg-foreground/5" onClick={() => openEditSkill(skill)}><Pencil size={12} className="text-[#6B6B6B]" /></button>
                                <button className="p-1 rounded hover:bg-red-50" onClick={() => deleteSkill(skill)}><Trash2 size={12} className="text-red-500" /></button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${barColorMap[cat.color]} transition-all duration-1000`} style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Orbital expertise */}
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-[#171717] text-white px-4 py-14 md:px-8 mb-20">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-white/80 border border-white/15 mb-5">
                Parcours d'expertise
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Un profil <span className="bg-gradient-to-r from-accent via-sky-400 to-teal-400 bg-clip-text text-transparent">full stack, data & IA</span></h2>
              <p className="text-white/60 text-sm md:text-base">
                Cliquez sur un noeud pour explorer un domaine. Les liaisons montrent les connexions entre chaque expertise.
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

      {/* Skill Dialog */}
      <Dialog open={showSkillDialog} onOpenChange={setShowSkillDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingSkill ? "Modifier" : "Ajouter"} une compétence</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><label className="text-sm font-medium">Nom *</label><Input value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="rounded-full" /></div>
            <div><label className="text-sm font-medium">Niveau ({skillForm.level}%)</label><input type="range" min="0" max="100" value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })} className="w-full" /></div>
          </div>
          <DialogFooter>
            <button onClick={() => setShowSkillDialog(false)} className="pill-btn-outline text-sm">Annuler</button>
            <button onClick={saveSkill} disabled={!skillForm.name} className="pill-btn text-sm">{editingSkill ? "Mettre a jour" : "Ajouter"}</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
