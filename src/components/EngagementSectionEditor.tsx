import { useState } from "react";
import { Pencil, Save, X, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ImageUpload from "@/components/ImageUpload";
import type { EngagementSection } from "@/hooks/use-engagement-data";

interface EngagementSectionEditorProps {
  section: EngagementSection;
  index: number;
  onSave: (index: number, patch: Partial<EngagementSection>) => void;
}

export default function EngagementSectionEditor({
  section,
  index,
  onSave,
}: EngagementSectionEditorProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(section);

  const handleSave = () => {
    onSave(index, form);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold shadow-lg hover:bg-accent/80 transition-colors"
      >
        <Pencil size={14} /> Modifier la section
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la section {index + 1}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Titre</label>
              <Input
                value={form.heading}
                onChange={(e) => setForm({ ...form, heading: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sous-titre (date / lieu)</label>
              <Input
                value={form.subtitle || ""}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Ex: Mars 2026 · Abidjan, Côte d'Ivoire"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full h-32 px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <ImagePlus size={14} /> Image
              </label>
              <ImageUpload
                value={form.image || ""}
                onChange={(url) => setForm({ ...form, image: url })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X size={14} className="mr-1" /> Annuler
            </Button>
            <Button onClick={handleSave}>
              <Save size={14} className="mr-1" /> Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
