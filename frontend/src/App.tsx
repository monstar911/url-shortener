import { useState } from "react";
import { isURL } from "validator";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import { API_ENDPOINTS } from "./constants";

interface UrlData {
  originalUrl: string;
  slug: string;
  shortUrl: string;
}

function App() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<UrlData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
      const response = await fetch(API_ENDPOINTS.CREATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url,
          customSlug: customSlug || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to shorten URL");
      }

      setShortenedUrl(data);
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          URL Shortener
        </h1>

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
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Your shortened URL
            </h2>
            <div className="flex items-center">
              <input
                type="text"
                value={shortenedUrl.shortUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-r-md"
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
    </div>
  );
}

export default App;
