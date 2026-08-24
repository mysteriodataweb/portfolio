import { useState, useEffect, useCallback } from "react";

export interface EngagementSection {
  heading: string;
  subtitle?: string;
  description: string;
  leftImage?: string | null;
  rightImage?: string | null;
}

export interface EngagementPageData {
  version: number;
  sections: EngagementSection[];
}

const STORAGE_PREFIX = "engagement-";
const CURRENT_VERSION = 2;

export function useEngagementData(slug: string, defaults: EngagementPageData) {
  const [data, setData] = useState<EngagementPageData>({
    version: CURRENT_VERSION,
    sections: defaults.sections,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_PREFIX + slug);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.version === CURRENT_VERSION) {
          setData(parsed);
        } else {
          localStorage.removeItem(STORAGE_PREFIX + slug);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_PREFIX + slug);
    }
  }, [slug]);

  const save = useCallback(
    (newData: EngagementPageData) => {
      const withVersion = { ...newData, version: CURRENT_VERSION };
      setData(withVersion);
      localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(withVersion));
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
