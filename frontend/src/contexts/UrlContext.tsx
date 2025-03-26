import React, { createContext, useContext, useState, useEffect } from "react";
import { isURL } from "validator";
import AuthService from "../services/auth.service";
import { API_ENDPOINTS } from "../constants";

interface UrlData {
  id: string;
  originalUrl: string;
  slug: string;
  shortUrl: string;
  visits: number;
  createdAt: string;
  isCopied?: boolean;
}

interface UrlContextType {
  url: string;
  setUrl: (url: string) => void;
  customSlug: string;
  setCustomSlug: (slug: string) => void;
  shortenedUrl: UrlData | null;
  error: string;
  loading: boolean;
  userUrls: UrlData[];
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  copyToClipboard: (urlToCopy: string, urlId: string) => void;
  copyNewUrlToClipboard: () => void;
  fetchUserUrls: () => Promise<void>;
}

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<UrlData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userUrls, setUserUrls] = useState<UrlData[]>([]);

  const validateUrl = (url: string) => {
    return isURL(url, {
      protocols: ["http", "https"],
      require_protocol: true,
    });
  };

  const fetchUserUrls = async () => {
    try {
      const authHeader = AuthService.getAuthHeader();
      if (!authHeader) return;

      const response = await fetch(API_ENDPOINTS.MY_URLS, {
        headers: {
          ...authHeader,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          AuthService.logout();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch URLs");
      }

      const data = await response.json();
      if (!data.data) {
        throw new Error("Invalid response format from server");
      }

      setUserUrls(
        data.data.map((item: { attributes: UrlData; id: string }) => ({
          ...item.attributes,
          id: item.id,
        }))
      );
    } catch (err) {
      console.error("Error fetching URLs:", err);
      setUserUrls([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortenedUrl(null);

    if (!validateUrl(url)) {
      setError("Please enter a valid URL including http:// or https://");
      return;
    }

    setLoading(true);

    try {
      const authHeader = AuthService.getAuthHeader();
      if (!authHeader) return;

      const response = await fetch(API_ENDPOINTS.CREATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({
          originalUrl: url,
          customSlug: customSlug || undefined,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          AuthService.logout();
          return;
        }
        const error = await response.json();
        throw new Error(error.message || "Failed to shorten URL");
      }

      const data = await response.json();
      setShortenedUrl(data.data.attributes);
      fetchUserUrls();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (urlToCopy: string, urlId: string) => {
    navigator.clipboard.writeText(urlToCopy);
    setUserUrls((prevUrls) =>
      prevUrls.map((url) =>
        url.id === urlId ? { ...url, isCopied: true } : url
      )
    );
    setTimeout(() => {
      setUserUrls((prevUrls) =>
        prevUrls.map((url) =>
          url.id === urlId ? { ...url, isCopied: false } : url
        )
      );
    }, 2000);
  };

  const copyNewUrlToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl.shortUrl);
      setShortenedUrl((prev) => (prev ? { ...prev, isCopied: true } : null));
      setTimeout(() => {
        setShortenedUrl((prev) => (prev ? { ...prev, isCopied: false } : null));
      }, 2000);
    }
  };

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      fetchUserUrls();
    }
  }, []);

  return (
    <UrlContext.Provider
      value={{
        url,
        setUrl,
        customSlug,
        setCustomSlug,
        shortenedUrl,
        error,
        loading,
        userUrls,
        handleSubmit,
        copyToClipboard,
        copyNewUrlToClipboard,
        fetchUserUrls,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => {
  const context = useContext(UrlContext);
  if (context === undefined) {
    throw new Error("useUrl must be used within a UrlProvider");
  }
  return context;
};
