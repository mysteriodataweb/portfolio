import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message envoyé avec succès ! Je vous répondrai rapidement.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">Travaillons ensemble</h1>
          <p className="text-lg text-muted-foreground mb-16 max-w-2xl">
            Vous avez un projet ? Une question ? Discutons-en.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="neo-field pt-4">
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="neo-input"
                  />
                  <label htmlFor="name" className="neo-label">Nom *</label>
                </div>
                <div className="neo-field pt-4">
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="neo-input"
                  />
                  <label htmlFor="email" className="neo-label">Email *</label>
                </div>
              </div>
              <div className="neo-field pt-4">
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="neo-input"
                />
                <label htmlFor="subject" className="neo-label">Sujet</label>
              </div>
              <div className="neo-field pt-4">
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="neo-textarea"
                />
                <label htmlFor="message" className="neo-label">Message *</label>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending ? "Envoi en cours..." : "Envoyer le message"} <Send size={16} />
              </button>
            </form>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection className="lg:col-span-2" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">Contact direct</h3>
                <div className="space-y-4">
                  <a href="mailto:fredbiam9@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Mail size={18} /> fredbiam9@gmail.com
                  </a>
                  <a href="https://github.com/Mysteriowebdata" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Github size={18} /> github.com/Mysteriowebdata
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin size={18} /> linkedin.com/in/AlfredMysteriowebdata
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">Disponibilité</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-foreground">Disponible pour de nouveaux projets</span>
                </div>
                <p className="text-sm text-muted-foreground">Réponse sous 24-48h en moyenne.</p>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-foreground mb-4">Localisation</h3>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} /> Maroc Casablanca , Bouskoura ville verte
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
