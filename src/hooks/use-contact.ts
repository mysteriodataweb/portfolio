import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export function useContact() {
  return useMutation({
    mutationFn: (data: ContactFormData) => api.post<ContactResponse>("/contact", data),
  });
}
