import { useState, useEffect, useCallback } from "react";

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string | null;
}

export interface EngagementPageData {
  version: number;
  events: TimelineEvent[];
}

const STORAGE_PREFIX = "engagement-";
const CURRENT_VERSION = 3;

export function useEngagementData(slug: string, defaults: EngagementPageData) {
  const [data, setData] = useState<EngagementPageData>({
    version: CURRENT_VERSION,
    events: defaults.events,
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

  const addEvent = useCallback(
    (event: TimelineEvent) => {
      setData((prev) => ({
        ...prev,
        events: [...prev.events, event],
      }));
    },
    []
  );

  const updateEvent = useCallback(
    (index: number, patch: Partial<TimelineEvent>) => {
      setData((prev) => {
        const events = [...prev.events];
        events[index] = { ...events[index], ...patch };
        return { ...prev, events };
      });
    },
    []
  );

  const removeEvent = useCallback(
    (index: number) => {
      setData((prev) => ({
        ...prev,
        events: prev.events.filter((_, i) => i !== index),
      }));
    },
    []
  );

  return { data, isEditing, setIsEditing, save, addEvent, updateEvent, removeEvent };
}
