import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getMeApi,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
};