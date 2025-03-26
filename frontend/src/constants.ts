export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  CREATE_URL: `${API_BASE_URL}/api/urls`,
  MY_URLS: `${API_BASE_URL}/api/urls/my-urls`,
  REDIRECT: (slug: string) => `${API_BASE_URL}/${slug}`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
} as const;
