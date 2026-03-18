import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "../../api/user.api";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUserApi,

        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["currentUser"], updatedUser);
        },
    })
};