import { useState } from "react";
import { Plus, Pencil, Archive, ArchiveRestore } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import ImageUpload from "@/components/ImageUpload";
import { useProjects, useAllProjects, useArchiveProject, useUnarchiveProject } from "@/hooks/use-projects";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { api } from "@/api/client";
import { toast } from "sonner";

const filters = [
  { label: "Tous", value: "all" },
  { label: "Data Science", value: "data-science" },
  { label: "Fullstack", value: "fullstack" },
  { label: "Hybrides", value: "hybrid" },
];

const emptyProject = {
  title: "", slug: "", category: "fullstack", shortDescription: "", fullDescription: "",
  image: "/placeholder.svg", techStack: "", demoUrl: "", githubUrl: "", date: new Date().toISOString().split("T")[0],
  featured: false, published: true, context: "", approach: "", results: "", challenges: "",
};

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data: projects = [], isLoading } = useProjects(activeFilter);
  const { data: allProjects = [] } = useAllProjects();
  const { isAdmin } = useAdmin();
  const [showDialog, setShowDialog] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyProject);
  const [saving, setSaving] = useState(false);
  const archiveProject = useArchiveProject();
  const unarchiveProject = useUnarchiveProject();

  const openAdd = () => {
    setEditingProject(null);
    setForm(emptyProject);
    setShowDialog(true);
  };

  const openEdit = (project: any) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      category: project.category,
      shortDescription: project.shortDescription || "",
      fullDescription: project.fullDescription || "",
      image: project.image || "",
      techStack: (project.techStack || []).join(", "),
      demoUrl: project.demoUrl || "",
      githubUrl: project.githubUrl || "",
      date: project.date || "",
      featured: project.featured || false,
      context: project.context || "",
      approach: project.approach || "",
      results: project.results || "",
      challenges: project.challenges || "",
    });
    setShowDialog(true);
  };

  const saveProject = async () => {
    setSaving(true);
    try {
      const payload = { ...form, techStack: form.techStack.split(",").map((s: string) => s.trim()).filter(Boolean) };
      if (editingProject) {
        await api.put(`/admin/projects/${editingProject.id}`, payload);
        toast.success("Projet mis à jour !");
      } else {
        await api.post("/admin/projects", payload);
        toast.success("Projet créé !");
      }
      setShowDialog(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async (project: any) => {
    if (!confirm(`Archiver "${project.title}" ? Il sera supprimé automatiquement dans 3 jours.`)) return;
    try {
      await archiveProject.mutateAsync(project.id);
      toast.success("Projet archivé. Suppression dans 3 jours.");
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    }
  };

  const handleUnarchive = async (project: any) => {
    try {
      await unarchiveProject.mutateAsync(project.id);
      toast.success("Projet restauré !");
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Mes Projets</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Une sélection de mes travaux en data science et développement fullstack.
              </p>
            </div>
            {isAdmin && (
              <button onClick={openAdd} className="pill-btn text-sm">
                <Plus className="h-4 w-4 mr-2" /> Nouveau projet
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mb-12">
            {filters.map((f) => (
              <button key={f.value} onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === f.value ? "bg-foreground text-white" : "bg-foreground/5 text-[#6B6B6B] hover:text-foreground"}`}>
                {f.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.05}>
              <div className={`relative group/card ${project.archived ? "opacity-50" : ""}`}>
                <ProjectCard project={project} />
                {project.archived && (
                  <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    Archivé
                  </div>
                )}
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => { e.preventDefault(); openEdit(project); }}>
                      <Pencil size={14} />
                    </Button>
                    {project.archived ? (
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => { e.preventDefault(); handleUnarchive(project); }}>
                        <ArchiveRestore size={14} />
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => { e.preventDefault(); handleArchive(project); }}>
                        <Archive size={14} />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Titre *</label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><label className="text-sm font-medium">Slug *</label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Catégorie</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground">
                  <option value="data-science">Data Science</option>
                  <option value="fullstack">Fullstack</option>
                  <option value="hybrid">Hybride</option>
                </select>
              </div>
              <div><label className="text-sm font-medium">Date</label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            </div>
            <div><label className="text-sm font-medium">Description courte</label><Input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></div>
            <div><label className="text-sm font-medium">Image</label><ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} /></div>
            <div><label className="text-sm font-medium">Technologies (séparées par virgules)</label><Input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder="React, TypeScript, PostgreSQL" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Demo URL</label><Input value={form.demoUrl} onChange={(e) => setForm({ ...form, demoUrl: e.target.value })} /></div>
              <div><label className="text-sm font-medium">GitHub URL</label><Input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} /></div>
            </div>
            <div><label className="text-sm font-medium">Contexte</label><textarea value={form.context} onChange={(e) => setForm({ ...form, context: e.target.value })} className="w-full h-24 px-3 py-2 rounded-md border border-border bg-background text-foreground" /></div>
            <div><label className="text-sm font-medium">Approche</label><textarea value={form.approach} onChange={(e) => setForm({ ...form, approach: e.target.value })} className="w-full h-24 px-3 py-2 rounded-md border border-border bg-background text-foreground" /></div>
            <div><label className="text-sm font-medium">Résultats</label><textarea value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} className="w-full h-24 px-3 py-2 rounded-md border border-border bg-background text-foreground" /></div>
            <div><label className="text-sm font-medium">Défis</label><textarea value={form.challenges} onChange={(e) => setForm({ ...form, challenges: e.target.value })} className="w-full h-24 px-3 py-2 rounded-md border border-border bg-background text-foreground" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Annuler</Button>
            <Button onClick={saveProject} disabled={saving || !form.title || !form.slug}>{saving ? "Enregistrement..." : "Enregistrer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsPage;
