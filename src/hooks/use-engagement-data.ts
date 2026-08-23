import { useState, useEffect, useCallback } from "react";

export interface EngagementSection {
  heading: string;
  subtitle?: string;
  description: string;
  image?: string;
}

export interface EngagementPageData {
  sections: EngagementSection[];
}

const STORAGE_PREFIX = "engagement-";

export function useEngagementData(slug: string, defaults: EngagementPageData) {
  const [data, setData] = useState<EngagementPageData>(defaults);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PREFIX + slug);
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch {
      /* ignore */
    }
  }, [slug]);

  const save = useCallback(
    (newData: EngagementPageData) => {
      setData(newData);
      localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(newData));
      setIsEditing(false);
    },
    [slug]
  );

  const updateSection = useCallback(
    (index: number, patch: Partial<EngagementSection>) => {
      setData((prev) => {
        const sections = [...prev.sections];
        sections[index] = { ...sections[index], ...patch };
        return { ...prev, sections };
      });
    },
    []
  );

  return { data, isEditing, setIsEditing, save, updateSection };
}
