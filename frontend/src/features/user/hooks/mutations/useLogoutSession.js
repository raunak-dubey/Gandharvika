import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutSessionApi } from "../../api/session.api";

export const useLogoutSession = () => {
    const queryClient = useQueryClient();

    const logoutSessionMutation = useMutation({
        mutationFn: logoutSessionApi,
        onSuccess: () => {
            queryClient.invalidateQueries(["currentSession"]);
        },
        onError: () => {
            queryClient.invalidateQueries(["currentSession"]);
        }
    });

    return logoutSessionMutation;
};