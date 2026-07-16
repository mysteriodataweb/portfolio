import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface AdminBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  date: string;
  read_time: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function useAdminBlog() {
  return useQuery({
    queryKey: ["admin", "blog"],
    queryFn: () => api.get<AdminBlogPost[]>("/admin/blog"),
  });
}

export function useAdminBlogPost(id: number) {
  return useQuery({
    queryKey: ["admin", "blog", id],
    queryFn: () => api.get<AdminBlogPost>(`/admin/blog/${id}`),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AdminBlogPost>) =>
      api.post<AdminBlogPost>("/admin/blog", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AdminBlogPost> }) =>
      api.put<AdminBlogPost>(`/admin/blog/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/admin/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}
