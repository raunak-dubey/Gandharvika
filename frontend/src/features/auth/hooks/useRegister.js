import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerApi } from "../api/auth.api";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
      navigate("/");
    },
  });
};