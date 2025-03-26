import React from "react";
import {
  ClipboardIcon,
  CheckIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";

interface UrlData {
  id: string;
  originalUrl: string;
  slug: string;
  shortUrl: string;
  visits: number;
  createdAt: string;
  isCopied?: boolean;
}

interface UrlShortenerViewProps {
  url: string;
  setUrl: (url: string) => void;
  customSlug: string;
  setCustomSlug: (slug: string) => void;
  shortenedUrl: UrlData | null;
  error: string;
  loading: boolean;
  userUrls: UrlData[];
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCopyToClipboard: (urlToCopy: string, urlId: string) => void;
  onCopyNewUrlToClipboard: () => void;
}

const UrlShortenerView: React.FC<UrlShortenerViewProps> = ({
  url,
  setUrl,
  customSlug,
  setCustomSlug,
  shortenedUrl,
  error,
  loading,
  userUrls,
  onSubmit,
  onCopyToClipboard,
  onCopyNewUrlToClipboard,
}) => {
  const { handleLogout } = useAuth();

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
          <form onSubmit={onSubmit} className="space-y-4">
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
                  onClick={onCopyNewUrlToClipboard}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  title="Copy to clipboard"
                >
                  {shortenedUrl.isCopied ? (
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
                      onClick={() => onCopyToClipboard(url.shortUrl, url.id)}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors ml-2"
                      title="Copy to clipboard"
                    >
                      {url.isCopied ? (
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
};

export default UrlShortenerView;
