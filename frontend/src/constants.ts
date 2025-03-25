export const API_BASE_URL = "http://localhost:3001";

export const API_ENDPOINTS = {
  CREATE_URL: `${API_BASE_URL}/api/urls`,
  REDIRECT: (slug: string) => `${API_BASE_URL}/${slug}`,
} as const;
