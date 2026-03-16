import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "../../api/song.api";

const useRecommendation = () => {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: () => fetchRecommendations(),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
  });
};

export default useRecommendation;