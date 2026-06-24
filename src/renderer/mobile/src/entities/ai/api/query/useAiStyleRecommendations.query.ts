import { useQuery } from "@tanstack/react-query";
import { getAiStyleRecommendations } from "@/entities/ai/api/aiStyleRecommendationApi";

export const useAiStyleRecommendationsQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["aiStyleRecommendations"],
    queryFn: getAiStyleRecommendations,
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isError, isLoading };
};
