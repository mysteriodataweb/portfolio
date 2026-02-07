import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Linkedin, Twitter } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";
import profilePhoto from "@/assets/profile-photo.jpg";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground">Article non trouvé</h1>
        <Link to="/blog" className="text-primary mt-4 inline-block">← Retour au blog</Link>
      </div>
    );
  }

  const currentIdx = blogPosts.findIndex((p) => p.slug === slug);
  const prev = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const next = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  // Parse markdown-like content to HTML
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-10">
          <p className="text-sm text-muted-foreground mb-3">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            {" > "}
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            {" > "}
            <span className="text-foreground">{post.title}</span>
          </p>
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 max-w-3xl">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar size={14} /> {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="inline-flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
        </div>
      </div>

      <article className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              {renderContent(post.content)}
            </AnimatedSection>

            {/* Share */}
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-4">Partager cet article</p>
              <div className="flex gap-3">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary transition-colors" aria-label="Partager sur Twitter">
                  <Twitter size={18} />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary transition-colors" aria-label="Partager sur LinkedIn">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Author */}
            <div className="mt-10 p-6 bg-card border border-border rounded-xl flex gap-5 items-center">
              <img src={profilePhoto} alt="Alex Martin" className="w-16 h-16 rounded-full object-cover border-gradient" />
              <div>
                <p className="font-heading font-semibold text-foreground">Alex Martin</p>
                <p className="text-sm text-muted-foreground">Data Scientist & Fullstack Developer passionné par l'IA et le développement web moderne.</p>
              </div>
            </div>

            {/* Nav */}
            <div className="flex justify-between mt-16 pt-8 border-t border-border">
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs text-muted-foreground">Précédent</p>
                    <p className="text-sm font-medium">{prev.title}</p>
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/blog/${next.slug}`} className="group flex items-center gap-3 text-right text-muted-foreground hover:text-foreground transition-colors">
                  <div>
                    <p className="text-xs text-muted-foreground">Suivant</p>
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
