const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: getAuthHeaders(),
    ...options,
  });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("admin_token");
    throw new Error("Session expirée");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Erreur réseau" }));
    throw new Error(error.error || `Erreur ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string) => fetchApi<T>(endpoint),

  post: <T>(endpoint: string, data: unknown) =>
    fetchApi<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data?: unknown) =>
    fetchApi<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    fetchApi<T>(endpoint, {
      method: "DELETE",
    }),

  upload: async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: "Erreur réseau" }));
      throw new Error(error.error || `Erreur ${res.status}`);
    }

    return res.json();
  },
};
