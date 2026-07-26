import { useCVData } from "@/hooks/use-admin-cv";
import { Download, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

export default function PublicCVPage() {
  const { data: cv, isLoading } = useCVData();

  if (isLoading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-[#6B6B6B]">Chargement...</div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-2">Mon <span className="text-accent">CV</span></h1>
              <p className="text-[#6B6B6B]">Telechargez mon CV en PDF ou consultez la version HTML.</p>
            </div>
            <div className="flex gap-3">
              <a href={`${API_BASE}/cv/html`} target="_blank" rel="noopener noreferrer" className="pill-btn-outline text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Voir HTML
              </a>
              <a href={`${API_BASE}/cv/pdf`} download className="pill-btn text-sm">
                <Download className="h-4 w-4 mr-2" />
                Telecharger PDF
              </a>
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {cv?.sections?.map((section, i) => (
            <AnimatedSection key={section.id} delay={i * 0.05}>
              <div className="bg-white border border-border rounded-2xl p-6">
                <h2 className="text-xl font-heading font-bold text-foreground mb-6 text-accent">{section.title}</h2>
                <div className="space-y-6">
                  {section.items?.map((item) => (
                    <div key={item.id} className="relative pl-6 border-l-2 border-accent/30">
                      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-accent" />
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{item.title}</h3>
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
                        <span className="text-sm text-[#6B6B6B] whitespace-nowrap">
                          {item.date_start}{item.date_end ? ` - ${item.date_end}` : ""}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
