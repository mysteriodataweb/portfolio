export const PROJECT_CATEGORIES = [
  { value: "ia", label: "IA" },
  { value: "data-science", label: "Data Science" },
  { value: "data-engineering", label: "Data Engineering" },
  { value: "data-analyst", label: "Data Analyst" },
  { value: "web-app", label: "Dev Web & App" },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]["value"];

export const categoryLabel = (value: string): string =>
  PROJECT_CATEGORIES.find((c) => c.value === value)?.label ?? value;

export const categoryColors: Record<string, string> = {
  ia: "bg-accent/10 text-accent border-accent/20",
  "data-science": "bg-foreground/5 text-foreground border-foreground/10",
  "data-engineering": "bg-accent/5 text-accent border-accent/15",
  "data-analyst": "bg-foreground/5 text-foreground border-foreground/10",
  "web-app": "bg-accent/10 text-accent border-accent/20",
};
