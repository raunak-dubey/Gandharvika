import { useMutation } from "@tanstack/react-query";
import { updatePasswordApi } from "../../api/user.api";

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: updatePasswordApi,
    })
};