import { useState } from "react";
import { Code2, Brain, Monitor, Server, Award, Pencil, Save, X, Plus, Trash2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useSkills } from "@/hooks/use-skills";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { api } from "@/api/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />, Brain: <Brain size={24} />, Monitor: <Monitor size={24} />, Server: <Server size={24} />,
};

const colorMap: Record<string, string> = {
  primary: "text-foreground border-foreground/10 bg-foreground/5",
  "accent-purple": "text-accent border-accent/20 bg-accent/5",
  "accent-cyan": "text-[#6B6B6B] border-[#6B6B6B]/20 bg-[#6B6B6B]/5",
  "accent-blue": "text-foreground border-foreground/10 bg-foreground/5",
};

const barColorMap: Record<string, string> = {
  primary: "bg-foreground",
  "accent-purple": "bg-accent",
  "accent-cyan": "bg-[#6B6B6B]",
  "accent-blue": "bg-foreground",
};

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
              <p className="text-lg text-[#6B6B6B] max-w-2xl">Un apercu de mon stack technique et de mes domaines d'expertise.</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {displayCategories.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={i * 0.1}>
              <div className="bg-white border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-accent">{iconMap[cat.icon]}</div>
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
              <div key={cert.name} className="group/cert bg-white border border-border rounded-2xl p-6 flex items-start gap-4">
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
