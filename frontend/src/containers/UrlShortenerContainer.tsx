import React from "react";
import { useUrl } from "../contexts/UrlContext";
import UrlShortenerView from "../views/UrlShortenerView";

const UrlShortenerContainer: React.FC = () => {
  const {
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
  } = useUrl();

  return (
    <UrlShortenerView
      url={url}
      setUrl={setUrl}
      customSlug={customSlug}
      setCustomSlug={setCustomSlug}
      shortenedUrl={shortenedUrl}
      error={error}
      loading={loading}
      userUrls={userUrls}
      onSubmit={handleSubmit}
      onCopyToClipboard={copyToClipboard}
      onCopyNewUrlToClipboard={copyNewUrlToClipboard}
    />
  );
};

export default UrlShortenerContainer;
