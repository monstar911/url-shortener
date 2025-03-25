import { useState, useEffect } from "react";
import { isURL } from "validator";
import {
  ClipboardIcon,
  CheckIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { API_ENDPOINTS } from "./constants";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";

interface UrlData {
  id: string;
  originalUrl: string;
  slug: string;
  shortUrl: string;
  visits: number;
  createdAt: string;
}

interface JsonApiResponse {
  data: {
    id: string;
    type: string;
    attributes: UrlData;
  }[];
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<UrlData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userUrls, setUserUrls] = useState<UrlData[]>([]);

  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated());
    if (AuthService.isAuthenticated()) {
      fetchUserUrls();
    } else {
      setUserUrls([]);
    }
  }, [isAuthenticated]);

  const fetchUserUrls = async () => {
    try {
      const authHeader = AuthService.getAuthHeader();
      if (!authHeader) {
        setIsAuthenticated(false);
        return;
      }

      console.log("Fetching URLs with headers:", authHeader);
      const response = await fetch(API_ENDPOINTS.MY_URLS, {
        headers: {
          ...authHeader,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          AuthService.logout();
          setIsAuthenticated(false);
          return;
        }
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(errorData.message || "Failed to fetch URLs");
      }

      const data = await response.json();
      console.log("Server response:", data);

      if (!data.data) {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format from server");
      }

      // Transform JSON:API response to UrlData array
      setUserUrls(
        data.data.map((item: { attributes: UrlData }) => item.attributes)
      );
    } catch (err) {
      console.error("Error fetching URLs:", err);
      setUserUrls([]);
    }
  };

  const validateUrl = (url: string) => {
    return isURL(url, {
      protocols: ["http", "https"],
      require_protocol: true,
    });
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
      if (!authHeader) {
        setIsAuthenticated(false);
        return;
      }

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
          // Token expired or invalid
          AuthService.logout();
          setIsAuthenticated(false);
          return;
        }
        const error = await response.json();
        throw new Error(error.message || "Failed to shorten URL");
      }

      const data = await response.json();
      // Handle JSON:API response format
      setShortenedUrl(data.data.attributes);
      fetchUserUrls();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    // Clear all states
    setUrl("");
    setCustomSlug("");
    setShortenedUrl(null);
    setError("");
    setLoading(false);
    setCopied(false);
    setUserUrls([]);
    // Logout
    AuthService.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {showLogin ? (
          <Login
            key="login"
            onSuccess={() => setIsAuthenticated(true)}
            onSwitchToRegister={() => setShowLogin(false)}
          />
        ) : (
          <Register
            key="register"
            onSuccess={() => setIsAuthenticated(true)}
            onSwitchToLogin={() => setShowLogin(true)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">URL Shortener</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter a long URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very/long/url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="customSlug"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Custom slug (optional)
              </label>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="my-custom-slug"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {shortenedUrl && (
            <div className="mt-4">
              <div className="p-3 bg-green-50 text-green-700 rounded-md mb-3">
                Success! Here's your short URL:
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shortenedUrl.shortUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-white"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <ClipboardIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your URLs
          </h2>
          {userUrls.length === 0 ? (
            <p className="text-gray-500">No URLs created yet.</p>
          ) : (
            <div className="space-y-4">
              {userUrls.map((url) => (
                <div
                  key={url.id}
                  className="border rounded-md p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Original URL:</p>
                      <p className="text-sm break-all">{url.originalUrl}</p>
                      <p className="text-sm text-gray-500 mt-2">Short URL:</p>
                      <p className="text-sm break-all">{url.shortUrl}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Visits: {url.visits}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(url.shortUrl);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors ml-2"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      ) : (
                        <ClipboardIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
