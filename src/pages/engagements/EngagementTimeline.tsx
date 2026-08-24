import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { useEngagementData } from "@/hooks/use-engagement-data";
import type { EngagementPageData, TimelineEvent } from "@/hooks/use-engagement-data";
import { useAdmin } from "@/contexts/AdminContext";
import EngagementEventEditor from "@/components/EngagementEventEditor";

interface Props {
  slug: string;
  title: string;
  subtitle: string;
  defaults: EngagementPageData;
}

export default function EngagementTimeline({ slug, title, subtitle, defaults }: Props) {
  const { isAdmin } = useAdmin();
  const { data, isEditing, setIsEditing, save, addEvent, updateEvent, removeEvent } =
    useEngagementData(slug, defaults);
  const [adding, setAdding] = useState(false);

  const handleSave = () => {
    save(data);
    setAdding(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <Link
          to="/engagements"
          className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={16} /> Retour aux engagements
        </Link>

        <div className="mb-16">
          <p className="text-sm font-medium tracking-wide text-accent uppercase mb-3">{subtitle}</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">{title}</h1>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {data.events.map((event, i) => (
            <TimelineItem
              key={i}
              event={event}
              index={i}
              isAdmin={isAdmin && isEditing}
              onUpdate={(patch) => updateEvent(i, patch)}
              onRemove={() => removeEvent(i)}
            />
          ))}

          {isAdmin && isEditing && adding && (
            <div className="relative mb-12">
              <div className="md:ml-[52%] ml-12">
                <EngagementEventEditor
                  event={{ date: "", title: "", description: "", image: null }}
                  onSave={(e) => { addEvent(e); setAdding(false); }}
                  onCancel={() => setAdding(false)}
                />
              </div>
            </div>
          )}
        </div>

        {isAdmin && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold shadow-lg hover:bg-accent/80 transition-colors"
          >
            <Pencil size={14} /> Modifier la timeline
          </button>
        )}

        {isAdmin && isEditing && (
          <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
            <button
              onClick={() => { setAdding(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold shadow-lg hover:bg-accent/80 transition-colors"
            >
              <Plus size={14} /> Ajouter
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-sm font-semibold shadow-lg hover:bg-green-700 transition-colors"
            >
              <Save size={14} /> Enregistrer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineItem({
  event,
  index,
  isAdmin,
  onUpdate,
  onRemove,
}: {
  event: TimelineEvent;
  index: number;
  isAdmin: boolean;
  onUpdate: (patch: Partial<TimelineEvent>) => void;
  onRemove: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div className="relative mb-12 md:mb-16">
      <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-1.5 md:-translate-x-[5px] mt-2 z-10" />

      <div className={`md:flex ${isLeft ? "" : "md:flex-row-reverse"}`}>
        <div className="md:w-[45%] ml-12 md:ml-0">
          {editing ? (
            <EngagementEventEditor
              event={event}
              onSave={(e) => { onUpdate(e); setEditing(false); }}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-xs font-medium text-accent uppercase tracking-wider mb-2">
                {event.date}
              </p>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                {event.description}
              </p>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="mt-4 w-full h-48 object-cover rounded-lg"
                />
              )}
              {isAdmin && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="text-xs text-accent hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={onRemove}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:block md:w-[10%]" />
        <div className="hidden md:block md:w-[45%]" />
      </div>
    </div>
  );
}
