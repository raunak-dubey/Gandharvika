import { useQuery } from "@tanstack/react-query";
import { getSessionsApi } from "../../api/session.api";

export const useCurrentSession = () => {
    return useQuery({
        queryKey: ["currentSession"],
        queryFn: getSessionsApi,
        retry: false,
        staleTime: 1000 * 60 * 10,
    })
};