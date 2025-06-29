import { CACHE_DURATION } from "@config/constants/api-constants";
import strapiService from "@lib/services/strapi-service";
import { useQuery } from "@tanstack/react-query";

export const useHeroContent = () => {
  return useQuery({
    queryKey: ["hero-content"],
    queryFn: strapiService.getHeroContent,
    staleTime: CACHE_DURATION.long,
    cacheTime: CACHE_DURATION.veryLong,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useAboutContent = () => {
  return useQuery({
    queryKey: ["about-content"],
    queryFn: strapiService.getAboutContent,
    staleTime: CACHE_DURATION.long,
    cacheTime: CACHE_DURATION.veryLong,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const usePageConfig = (pageName = "homepage") => {
  return useQuery({
    queryKey: ["page-config", pageName],
    queryFn: () => strapiService.getPageConfig(pageName),
    staleTime: CACHE_DURATION.medium,
    cacheTime: CACHE_DURATION.long,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
