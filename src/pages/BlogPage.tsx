import { useState } from "react";
import { Search, Plus, Pencil, Archive, ArchiveRestore } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BlogCard from "@/components/BlogCard";
import ImageUpload from "@/components/ImageUpload";
import { useBlogPosts, useArchiveBlogPost, useUnarchiveBlogPost } from "@/hooks/use-blog";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { api } from "@/api/client";
import { toast } from "sonner";

const categories = ["Tous", "IA/ML", "Fullstack", "Data Science", "Tutoriels"];

const emptyPost = {
  title: "", slug: "", excerpt: "", category: "Data Science", tags: "",
  image: "/placeholder.svg", date: new Date().toISOString().split("T")[0],
  readTime: "5 min", content: "",
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const { data: filtered = [], isLoading } = useBlogPosts(activeCategory, search);
  const { isAdmin } = useAdmin();
  const [showDialog, setShowDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyPost);
  const [saving, setSaving] = useState(false);
  const archivePost = useArchiveBlogPost();
  const unarchivePost = useUnarchiveBlogPost();

  const openAdd = () => {
    setEditingPost(null);
    setForm(emptyPost);
    setShowDialog(true);
  };

  const openEdit = (post: any) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      category: post.category || "Data Science",
      tags: (post.tags || []).join(", "),
      image: post.image || "",
      date: post.date || "",
      readTime: post.readTime || "5 min",
      content: post.content || "",
    });
    setShowDialog(true);
  };

  const savePost = async () => {
    setSaving(true);
    try {
      const payload = { ...form, tags: form.tags.split(",").map((s: string) => s.trim()).filter(Boolean) };
      if (editingPost) {
        await api.put(`/admin/blog/${editingPost.id}`, payload);
        toast.success("Article mis à jour !");
      } else {
        await api.post("/admin/blog", payload);
        toast.success("Article créé !");
      }
      setShowDialog(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async (post: any) => {
    if (!confirm(`Archiver "${post.title}" ? Il sera supprimé automatiquement dans 3 jours.`)) return;
    try {
      await archivePost.mutateAsync(post.id);
      toast.success("Article archivé. Suppression dans 3 jours.");
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    }
  };

  const handleUnarchive = async (post: any) => {
    try {
      await unarchivePost.mutateAsync(post.id);
      toast.success("Article restauré !");
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Blog</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Réflexions sur la data science, le développement et la tech.
              </p>
            </div>
            {isAdmin && (
              <button onClick={openAdd} className="pill-btn text-sm">
                <Plus className="h-4 w-4 mr-2" /> Nouvel article
              </button>
            )}
          </div>
          <div className="relative max-w-md mb-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
            <input
              type="text" placeholder="Rechercher un article..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-border rounded-full pl-12 pr-4 py-3 text-foreground placeholder:text-[#6B6B6B] focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === c ? "bg-foreground text-white" : "bg-foreground/5 text-[#6B6B6B] hover:text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <AnimatedSection key={post.id} delay={i * 0.05}>
              <div className={`relative group/card ${post.archived ? "opacity-50" : ""}`}>
                <BlogCard post={post} />
                {post.archived && (
                  <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    Archivé
                  </div>
                )}
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-10 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => { e.preventDefault(); openEdit(post); }}>
                      <Pencil size={14} />
                    </Button>
                    {post.archived ? (
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => { e.preventDefault(); handleUnarchive(post); }}>
                        <ArchiveRestore size={14} />
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={(e) => { e.preventDefault(); handleArchive(post); }}>
                        <Archive size={14} />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">Aucun article trouvé.</p>}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? "Modifier l'article" : "Nouvel article"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Titre *</label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><label className="text-sm font-medium">Slug *</label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            </div>
            <div><label className="text-sm font-medium">Extrait</label><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full h-20 px-3 py-2 rounded-md border border-border bg-background text-foreground" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Catégorie</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground">
                  {categories.filter(c => c !== "Tous").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="text-sm font-medium">Date</label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Temps de lecture</label><Input value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} placeholder="5 min" /></div>
              <div><label className="text-sm font-medium">Tags (séparés par virgules)</label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, TypeScript, IA" /></div>
            </div>
            <div><label className="text-sm font-medium">Image</label><ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} /></div>
            <div><label className="text-sm font-medium">Contenu (Markdown supporté)</label><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full h-[300px] px-3 py-2 rounded-md border border-border bg-background text-foreground font-mono text-sm" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Annuler</Button>
            <Button onClick={savePost} disabled={saving || !form.title || !form.slug}>{saving ? "Enregistrement..." : "Enregistrer"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BlogPage;
