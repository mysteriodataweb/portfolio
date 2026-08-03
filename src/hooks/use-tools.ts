import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface Tool {
  id: string;
  name: string;
  image: string;
  sortOrder: number;
}

export function useTools() {
  return useQuery({
    queryKey: ["tools"],
    queryFn: () => api.get<Tool[]>("/tools"),
  });
}
