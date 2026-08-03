import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface Stats {
  yearsExperience: number;
  clientsCount: number;
  projectsCount: number;
  articlesCount: number;
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => api.get<Stats>("/stats"),
  });
}
