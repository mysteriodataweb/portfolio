import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Users, Zap, Heart, Pencil, Save, X } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ImageUpload from "@/components/ImageUpload";
import { useAdmin } from "@/contexts/AdminContext";
import { useProfile, useUpdateProfile } from "@/hooks/use-admin-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AboutPage = () => {
  const { isAdmin } = useAdmin();
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: "", title: "", bio: "", photo: "" });

  useEffect(() => {
    if (profile) {
      setForm({ fullName: profile.fullName || "", title: profile.title || "", bio: profile.bio || "", photo: profile.photo || "" });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(form);
      toast.success("Profil mis à jour !");
      setEditing(false);
      window.location.reload();
    } catch { toast.error("Erreur"); }
  };

  const values = [
    { icon: <Lightbulb size={24} />, title: "Curiosité", desc: "Explorer sans cesse de nouvelles technologies et méthodologies pour rester à la pointe." },
    { icon: <Zap size={24} />, title: "Excellence", desc: "Livrer du code propre, performant et maintenable. La qualité n'est pas négociable." },
    { icon: <Users size={24} />, title: "Collaboration", desc: "Les meilleurs résultats naissent du travail d'équipe et du partage de connaissances." },
    { icon: <Heart size={24} />, title: "Impact", desc: "Chaque projet doit apporter une valeur réelle et mesurable aux utilisateurs." },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-start justify-between mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">À propos de moi</h1>
              <p className="text-lg text-muted-foreground">La personne derrière le code.</p>
            </div>
            {isAdmin && !editing && (
              <button onClick={() => setEditing(true)} className="pill-btn-outline text-sm">
                <Pencil className="h-4 w-4 mr-2" /> Modifier
              </button>
            )}
            {editing && (
              <div className="flex gap-2">
                <button onClick={handleSave} disabled={updateProfile.isPending} className="pill-btn text-sm">
                  <Save className="h-4 w-4 mr-2" /> Enregistrer
                </button>
                <button onClick={() => setEditing(false)} className="pill-btn-outline text-sm">
                  <X className="h-4 w-4 mr-2" /> Annuler
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
          <AnimatedSection className="lg:col-span-3 space-y-6">
            {editing ? (
              <div className="space-y-4">
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full h-64 px-3 py-2 rounded-md border border-border bg-background text-foreground" />
              </div>
            ) : (
              <>
                <p className="text-muted-foreground leading-[1.8] text-lg">
                  Passionné par les données et le code depuis toujours, j'ai débuté mon parcours en explorant la programmation par curiosité avant d'en faire mon métier. Diplômé en informatique avec une spécialisation en science des données, j'ai rapidement compris que la vraie magie se produisait à l'intersection de l'analyse de données et du développement logiciel.
                </p>
                <p className="text-muted-foreground leading-[1.8] text-lg">
                  Aujourd'hui, je me définis comme un Data Scientist et Fullstack Developer — un profil hybride qui me permet de concevoir des solutions de bout en bout. De l'exploration des données brutes à la mise en production d'un modèle de machine learning, en passant par le développement d'interfaces utilisateur élégantes, j'aime maîtriser chaque étape de la chaîne.
                </p>
                <p className="text-muted-foreground leading-[1.8] text-lg">
                  Ma philosophie est simple : la technologie doit servir l'humain. Chaque ligne de code, chaque modèle entraîné, chaque interface designée doit résoudre un problème concret et apporter une valeur tangible. C'est cette conviction qui guide mes choix techniques et mes approches de résolution de problèmes.
                </p>
                <p className="text-muted-foreground leading-[1.8] text-lg">
                  Quand je ne code pas, j'écris des articles pour partager mes découvertes, je contribue à des projets open-source, et j'explore les dernières avancées en intelligence artificielle. Je crois fermement que le partage de connaissances est le meilleur moyen de faire progresser notre communauté.
                </p>
              </>
            )}
          </AnimatedSection>
          <AnimatedSection className="lg:col-span-2 flex justify-center" delay={0.2}>
            {editing ? (
              <div className="space-y-4 w-full max-w-sm">
                <label className="text-sm font-medium">Photo de profil</label>
                <ImageUpload value={form.photo} onChange={(url) => setForm({ ...form, photo: url })} />
              </div>
            ) : (
              <img
                src={form.photo || "/placeholder.svg"}
                alt={form.fullName || "Alfred"}
                className="w-full max-w-sm rounded-2xl object-cover border-gradient glow-blue"
              />
            )}
          </AnimatedSection>
        </div>

        {/* Values */}
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-10">Valeurs & Principes</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                <div className="text-primary mb-4">{v.icon}</div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Envie de discuter ?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Me contacter <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutPage;
