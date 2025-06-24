import { useCallback, useEffect, useState } from "react";

import { aboutContentService } from "@modules/content/services/about-content-service";

export const useAboutContent = (section = "homepage") => {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAboutContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let content;
      if (section === "homepage") {
        content = await aboutContentService.getAboutSectionContent();
      } else {
        content = await aboutContentService.getAboutPageContent();
      }

      setAboutContent(content);
    } catch (error_) {
      console.error("Failed to fetch about content:", error_);
      setError(error_.message);
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    fetchAboutContent();
  }, [fetchAboutContent]);

  return {
    aboutContent,
    loading,
    error,
    refetch: fetchAboutContent,
  };
};
