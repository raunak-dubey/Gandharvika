import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], data.user);
      navigate("/");
    },
  });
};