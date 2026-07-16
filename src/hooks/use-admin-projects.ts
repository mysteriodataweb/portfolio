import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface AdminProject {
  id: number;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  full_description: string;
  image: string;
  tech_stack: string[];
  github_url: string;
  demo_url: string;
  date: string;
  featured: boolean;
  published: boolean;
  context: string;
  approach: string;
  results: string;
  challenges: string;
  created_at: string;
  updated_at: string;
}

export function useAdminProjects() {
  return useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => api.get<AdminProject[]>("/admin/projects"),
  });
}

export function useAdminProject(id: number) {
  return useQuery({
    queryKey: ["admin", "projects", id],
    queryFn: () => api.get<AdminProject>(`/admin/projects/${id}`),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminProject>) =>
      api.post<AdminProject>("/admin/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminProject> }) =>
      api.put<AdminProject>(`/admin/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
    },
  });
}
