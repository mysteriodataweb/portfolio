import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Linkedin, Twitter, Pencil, Save, X } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useBlogPost, useBlogPosts } from "@/hooks/use-blog";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/api/client";
import { toast } from "sonner";
import profilePhoto from "@/assets/profile-photo.jpg";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug || "");
  const { data: blogPosts = [] } = useBlogPosts();
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "" });

  if (isLoading) {
    return <div className="py-32 text-center"><p className="text-[#6B6B6B]">Chargement...</p></div>;
  }

  if (!post) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground">Article non trouve</h1>
        <Link to="/blog" className="text-accent mt-4 inline-block">← Retour au blog</Link>
      </div>
    );
  }

  const startEdit = () => {
    setForm({ title: post.title, excerpt: post.excerpt || "", content: post.content });
    setEditing(true);
  };

  const saveEdit = async () => {
    try {
      await api.put(`/admin/blog/${post.id}`, form);
      toast.success("Article mis à jour !");
      setEditing(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Erreur");
    }
  };

  const currentIdx = blogPosts.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const next = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return <h2 key={i} className="text-2xl font-heading font-semibold text-foreground mt-10 mb-4">{block.replace("## ", "")}</h2>;
      }
      if (block.startsWith("### ")) {
        return <h3 key={i} className="text-xl font-heading font-medium text-foreground mt-8 mb-3">{block.replace("### ", "")}</h3>;
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter(Boolean);
        return (
          <ul key={i} className="space-y-2 mb-6 ml-4">
            {items.map((item, j) => (
              <li key={j} className="text-muted-foreground leading-relaxed flex gap-2">
                <span className="text-primary mt-1.5 text-xs">●</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>') }} />
              </li>
            ))}
          </ul>
        );
      }
      if (block.startsWith("1. ")) {
        const items = block.split("\n").filter(Boolean);
        return (
          <ol key={i} className="space-y-2 mb-6 ml-4 list-decimal list-inside">
            {items.map((item, j) => (
              <li key={j} className="text-muted-foreground leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              </li>
            ))}
          </ol>
        );
      }
      return (
        <p key={i} className="text-muted-foreground leading-[1.8] mb-6" dangerouslySetInnerHTML={{
          __html: block
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
        }} />
      );
    });
  };

  return (
    <>
      {/* Hero */}
      <div className="relative h-[450px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-10">
          <p className="text-sm text-white/70 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {" > "}
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            {" > "}
            <span className="text-white">{editing ? form.title : post.title}</span>
          </p>
          <span className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full bg-white text-foreground mb-4">
            {post.category}
          </span>
          {editing ? (
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full text-3xl md:text-4xl font-heading font-bold bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl px-4 py-3 mb-4" />
          ) : (
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 max-w-3xl">{post.title}</h1>
          )}
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span className="inline-flex items-center gap-1"><Calendar size={14} /> {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="inline-flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
          {isAdmin && (
            <div className="mt-4">
              {editing ? (
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="pill-btn text-sm">
                    <Save className="h-4 w-4 mr-2" /> Enregistrer
                  </button>
                  <button onClick={() => setEditing(false)} className="pill-btn-outline text-sm border-white text-white hover:bg-white hover:text-foreground">
                    <X className="h-4 w-4 mr-2" /> Annuler
                  </button>
                </div>
              ) : (
                <button onClick={startEdit} className="pill-btn-outline text-sm border-white text-white hover:bg-white hover:text-foreground">
                  <Pencil className="h-4 w-4 mr-2" /> Modifier
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <article className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {editing ? (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Extrait</label>
                  <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full h-20 px-4 py-3 rounded-xl border border-border bg-white text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Contenu (Markdown supporte)</label>
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full h-[400px] px-4 py-3 rounded-xl border border-border bg-white text-foreground font-mono text-sm" />
                </div>
              </div>
            ) : (
              <AnimatedSection>
                {renderContent(post.content)}
              </AnimatedSection>
            )}

            {/* Share */}
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-4">Partager cet article</p>
              <div className="flex gap-3">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-foreground/5 text-foreground hover:bg-foreground hover:text-white transition-all" aria-label="Partager sur Twitter">
                  <Twitter size={18} />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-foreground/5 text-foreground hover:bg-foreground hover:text-white transition-all" aria-label="Partager sur LinkedIn">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Author */}
            <div className="mt-10 p-6 bg-white border border-border rounded-2xl flex gap-5 items-center">
              <img src={profilePhoto} alt="Alfred Mysteriowebdata" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="font-heading font-semibold text-foreground">Alfred Mysteriowebdata</p>
                <p className="text-sm text-[#6B6B6B]">Data Scientist & Fullstack Developer passionne par l'IA et le developpement web moderne.</p>
              </div>
            </div>

            {/* Nav */}
            <div className="flex justify-between mt-16 pt-8 border-t border-border">
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="group flex items-center gap-3 text-[#6B6B6B] hover:text-foreground transition-colors">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs text-[#6B6B6B]">Precedent</p>
                    <p className="text-sm font-medium">{prev.title}</p>
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/blog/${next.slug}`} className="group flex items-center gap-3 text-right text-[#6B6B6B] hover:text-foreground transition-colors">
                  <div>
                    <p className="text-xs text-[#6B6B6B]">Suivant</p>
                    <p className="text-sm font-medium">{next.title}</p>
                  </div>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;
