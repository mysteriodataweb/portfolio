import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Briefcase,
  Camera,
  CheckCircle2,
  Compass,
  Database,
  FlaskConical,
  Github,
  Globe,
  GraduationCap,
  Hammer,
  HandHeart,
  Lightbulb,
  Linkedin,
  Mic,
  Pencil,
  Rocket,
  Save,
  Search,
  Sparkles,
  TrendingUp,
  Trophy,
  Twitter,
  X,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ImageUpload from "@/components/ImageUpload";
import { useAdmin } from "@/contexts/AdminContext";
import { usePublicProfile } from "@/hooks/use-public-profile";
import { useUpdateProfile } from "@/hooks/use-admin-profile";
import { useCVData } from "@/hooks/use-admin-cv";
import { useStats } from "@/hooks/use-stats";
import { toast } from "sonner";

const FALLBACK_BIO = [
  "Passionné par les données et le code depuis toujours, j'ai débuté mon parcours en explorant la programmation par curiosité avant d'en faire mon métier. Diplômé en informatique avec une spécialisation en science des données, j'ai rapidement compris que la vraie magie se produisait à l'intersection de l'analyse de données et du développement logiciel.",
  "Aujourd'hui, je me définis comme un Data Scientist et Fullstack Developer — un profil hybride qui me permet de concevoir des solutions de bout en bout. De l'exploration des données brutes à la mise en production d'un modèle de machine learning, en passant par le développement d'interfaces utilisateur élégantes, j'aime maîtriser chaque étape de la chaîne.",
  "Ma philosophie est simple : la technologie doit servir l'humain. Chaque ligne de code, chaque modèle entraîné, chaque interface designée doit résoudre un problème concret et apporter une valeur tangible. C'est cette conviction qui guide mes choix techniques et mes approches de résolution de problèmes.",
  "Quand je ne code pas, j'écris des articles pour partager mes découvertes, je contribue à des projets open-source, et j'explore les dernières avancées en intelligence artificielle. Je crois fermement que le partage de connaissances est le meilleur moyen de faire progresser notre communauté.",
];

const badges = [
  "Intelligence Artificielle",
  "Data Science",
  "Full Stack",
  "Afrique & Innovation",
];

const motivations = [
  {
    icon: Brain,
    title: "L'intelligence artificielle",
    desc: "Concevoir des systèmes qui apprennent, raisonnent et aident à prendre de meilleures décisions.",
  },
  {
    icon: Database,
    title: "La donnée",
    desc: "Donner du sens aux données brutes pour éclairer des décisions concrètes et mesurables.",
  },
  {
    icon: Globe,
    title: "Des solutions pour l'Afrique",
    desc: "Construire des outils utiles au quotidien des gens, pensés pour les réalités du terrain.",
  },
  {
    icon: Rocket,
    title: "Un impact concret",
    desc: "Un projet ne vaut que s'il améliore réellement la vie de celles et ceux qui l'utilisent.",
  },
];

const engagements = [
  {
    icon: Trophy,
    title: "Compétitions",
    desc: "Relever des défis data et algorithmiques pour se dépasser et apprendre toujours plus.",
  },
  {
    icon: Mic,
    title: "Conférences & meetups",
    desc: "Partager, échanger et apprendre au sein de la communauté tech.",
  },
  {
    icon: HandHeart,
    title: "Bénévolat & mentorat",
    desc: "Transmettre ce que j'ai appris et accompagner les autres dans leur progression.",
  },
  {
    icon: FlaskConical,
    title: "Recherche & veille",
    desc: "Suivre les avancées scientifiques et expérimenter sans cesse de nouvelles approches.",
  },
];

const workflow = [
  {
    icon: Search,
    title: "Comprendre",
    desc: "Cerner le problème, les besoins et le contexte réel avant toute ligne de code.",
  },
  {
    icon: Compass,
    title: "Explorer",
    desc: "Tester, comparer et prototyper rapidement les approches possibles.",
  },
  {
    icon: Hammer,
    title: "Construire",
    desc: "Développer proprement, avec une architecture simple et maintenable.",
  },
  {
    icon: CheckCircle2,
    title: "Tester",
    desc: "Valider chaque brique, mesurer les résultats et recueillir le feedback.",
  },
  {
    icon: TrendingUp,
    title: "Améliorer",
    desc: "Itérer, optimiser et faire évoluer la solution en continu.",
  },
];

const personalMoments = [
  { caption: "Voyages & découvertes" },
  { caption: "Sport & défi" },
  { caption: "Famille & amis" },
  { caption: "Lectures & écriture" },
];

const AboutPage = () => {
  const { isAdmin } = useAdmin();
  const { data: profile } = usePublicProfile();
  const { data: cv } = useCVData();
  const { data: stats } = useStats();
  const updateProfile = useUpdateProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: "", title: "", bio: "", photo: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.fullName || "",
        title: profile.title || "",
        bio: profile.bio || "",
        photo: profile.photo || "",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        fullName: form.full_name,
        title: form.title,
        bio: form.bio,
        photo: form.photo,
      });
      toast.success("Profil mis à jour !");
      setEditing(false);
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const bioParagraphs = profile?.bio
    ? profile.bio.split(/\n\s*\n/).filter(Boolean)
    : FALLBACK_BIO;

  const sectionIcon = (type: string) => {
    if (type === "experience") return <Briefcase size={16} className="text-accent" />;
    if (type === "education") return <GraduationCap size={16} className="text-accent" />;
    return <Sparkles size={16} className="text-accent" />;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {/* Hero — Qui je suis */}
        <AnimatedSection>
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="text-sm font-medium tracking-wide text-accent uppercase mb-3">Qui je suis</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                {form.full_name || "Alfred"}<span className="text-accent">.</span>
              </h1>
              <p className="text-lg text-[#6B6B6B]">{profile?.title || "Data Scientist & Fullstack Developer"}</p>
            </div>
            {isAdmin && !editing && (
              <button onClick={() => setEditing(true)} className="pill-btn-outline text-sm">
                <Pencil className="h-4 w-4 mr-2" /> Modifier
              </button>
            )}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-24">
          <AnimatedSection className="lg:col-span-3 space-y-6">
            {editing ? (
              <div className="space-y-4">
                <label className="text-sm font-medium">Biographie</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full h-64 px-3 py-2 rounded-md border border-border bg-background text-foreground"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={updateProfile.isPending} className="pill-btn text-sm">
                    <Save className="h-4 w-4 mr-2" /> Enregistrer
                  </button>
                  <button onClick={() => setEditing(false)} className="pill-btn-outline text-sm">
                    <X className="h-4 w-4 mr-2" /> Annuler
                  </button>
                </div>
              </div>
            ) : (
              <>
                {bioParagraphs.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-[1.8] text-lg">
                    {p}
                  </p>
                ))}
                <div className="flex flex-wrap gap-2 pt-2">
                  {badges.map((b) => (
                    <span key={b} className="px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent">
                      {b}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-2">
                  {profile?.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-foreground/5 text-foreground hover:text-accent hover:bg-accent/10 transition-colors" aria-label="GitHub">
                      <Github size={18} />
                    </a>
                  )}
                  {profile?.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-foreground/5 text-foreground hover:text-accent hover:bg-accent/10 transition-colors" aria-label="LinkedIn">
                      <Linkedin size={18} />
                    </a>
                  )}
                  {profile?.twitter && (
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-foreground/5 text-foreground hover:text-accent hover:bg-accent/10 transition-colors" aria-label="Twitter / X">
                      <Twitter size={18} />
                    </a>
                  )}
                </div>
              </>
            )}
          </AnimatedSection>

          <AnimatedSection className="lg:col-span-2 flex justify-center" delay={0.2}>
            <div className="w-full max-w-sm space-y-4">
              {editing ? (
                <>
                  <label className="text-sm font-medium">Photo de profil</label>
                  <ImageUpload value={form.photo} onChange={(url) => setForm({ ...form, photo: url })} />
                </>
              ) : (
                <img
                  src={form.photo || "/placeholder.svg"}
                  alt={form.full_name || "Alfred"}
                  className="w-full rounded-2xl object-cover border-gradient glow-blue"
                />
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* Mon parcours */}
        <AnimatedSection className="mb-20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Mon parcours</h2>
          <p className="text-[#6B6B6B] mb-10 max-w-2xl">
            Une trajectoire guidée par la curiosité : de la découverte du code à l'ingénierie des données et de l'IA.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2 space-y-10">
            {cv?.sections?.map((section) => (
              <AnimatedSection key={section.id}>
                <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-6">
                  {sectionIcon(section.type)}
                  {section.title}
                </h3>
                <div className="space-y-8">
                  {section.items?.map((item) => (
                    <div key={item.id} className="relative pl-8 border-l-2 border-accent/30">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-medium text-foreground">{item.title}</h4>
                        <span className="text-sm text-[#6B6B6B] whitespace-nowrap">
                          {item.date_start}{item.date_end ? ` — ${item.date_end}` : ""}
                        </span>
                      </div>
                      {item.subtitle && <p className="text-sm text-accent">{item.subtitle}</p>}
                      {item.description && <p className="text-sm text-[#6B6B6B] mt-1">{item.description}</p>}
                      {item.highlights?.length > 0 && (
                        <ul className="mt-2 text-sm text-[#6B6B6B] space-y-1">
                          {item.highlights.map((h, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span className="text-accent mt-1">•</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="lg:col-span-1" delay={0.15}>
            <div className="bg-card border border-border rounded-2xl p-6 h-full">
              <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
                <Lightbulb size={16} className="text-accent" />
                En bref
              </h3>
              <ul className="space-y-3 text-sm text-[#6B6B6B]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  Diplômé en informatique, spécialité science des données
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  Profil hybride Data Scientist & Fullstack
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  De l'EDA au MLOps, de la donnée brute à l'interface
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  Conviction : la tech doit servir l'humain
                </li>
              </ul>
              <Link to="/cv" className="link-arrow mt-6">
                Voir mon CV complet <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Ce qui me motive */}
        <AnimatedSection className="mb-20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Ce qui me motive</h2>
          <p className="text-[#6B6B6B] mb-10 max-w-2xl">
            Ce qui me pousse à me lever le matin, au-delà des lignes de code.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {motivations.map((m, i) => (
            <AnimatedSection key={m.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-2xl p-6 h-full card-hover">
                <div className="p-2 rounded-xl bg-accent/10 text-accent mb-4 w-fit">
                  <m.icon size={20} />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-[#6B6B6B]">{m.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Je ne fais pas que coder */}
        <AnimatedSection className="section-light rounded-3xl px-6 md:px-12 py-14 mb-20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Je ne fais pas que coder</h2>
          <p className="text-[#6B6B6B] mb-10 max-w-2xl">
            Ma vie tech ne se limite pas aux écrans : compétitions, échanges, transmission et recherche rythment mon quotidien.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagements.map((e, i) => (
              <AnimatedSection key={e.title} delay={i * 0.1}>
                <div className="bg-white border border-border rounded-2xl p-6 h-full card-hover">
                  <div className="p-2 rounded-xl bg-accent/10 text-accent mb-4 w-fit">
                    <e.icon size={20} />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{e.title}</h3>
                  <p className="text-sm text-[#6B6B6B]">{e.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/engagements" className="pill-btn text-sm">
              Découvrir mes engagements <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        {/* Ma manière de travailler */}
        <AnimatedSection className="mb-20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Ma manière de travailler</h2>
          <p className="text-[#6B6B6B] mb-10 max-w-2xl">
            Une méthode simple, du brief au produit final, en passant par chaque itération.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {workflow.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1}>
              <div className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 h-full card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-xl bg-accent/10 text-accent">
                      <step.icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-[#6B6B6B]">Étape {i + 1}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B6B6B]">{step.desc}</p>
                </div>
                {i < workflow.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="hidden lg:block absolute top-1/2 -right-3 translate-x-1/2 -translate-y-1/2 text-accent z-10 bg-background rounded-full"
                  />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Quelques chiffres */}
        <AnimatedSection className="mb-20">
          <div className="bg-[#171717] text-white rounded-3xl px-6 md:px-12 py-14">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">Quelques chiffres</h2>
            <p className="text-white/70 mb-10 max-w-2xl">Des chiffres réels, issus de ce site et de mon activité.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-4xl md:text-5xl font-heading font-bold text-accent mb-1">
                  {stats?.yearsExperience ?? "–"}
                </p>
                <p className="text-sm text-white/70">Années d'expérience</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-heading font-bold text-accent mb-1">
                  {stats?.projectsCount ?? "–"}
                </p>
                <p className="text-sm text-white/70">Projets réalisés</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-heading font-bold text-accent mb-1">
                  {stats?.articlesCount ?? "–"}
                </p>
                <p className="text-sm text-white/70">Articles publiés</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-heading font-bold text-accent mb-1">
                  {stats?.clientsCount ?? "–"}
                </p>
                <p className="text-sm text-white/70">Clients accompagnés</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* En dehors de l'écran */}
        <AnimatedSection className="mb-20">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">En dehors de l'écran</h2>
          <p className="text-[#6B6B6B] mb-10 max-w-2xl">
            La vie ne s'arrête pas au terminal. Voici quelques moments qui m'animent — photos à venir.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {personalMoments.map((p, i) => (
            <AnimatedSection key={p.caption} delay={i * 0.1}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-accent/15 via-accent/5 to-foreground/5 border border-border card-hover">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-4">
                  <div className="p-2 rounded-xl bg-white/70 text-foreground">
                    <Camera size={20} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{p.caption}</p>
                  <p className="text-xs text-[#6B6B6B]">Photo à venir</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA final */}
        <AnimatedSection className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Et maintenant ?</h2>
          <p className="text-[#6B6B6B] text-lg mb-8 max-w-2xl mx-auto">
            Envie de collaborer, d'échanger ou de discuter d'un projet ? Je suis toujours curieux de nouveaux défis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/projets" className="pill-btn">
              Voir mes projets <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="pill-btn-outline">
              Me contacter
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutPage;
