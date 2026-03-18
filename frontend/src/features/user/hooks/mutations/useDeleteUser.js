import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../../api/user.api";
import { useNavigate } from "react-router";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: deleteUserApi,

        onSuccess: () => {
            queryClient.clear()
            navigate("/login");
        },
    })
};