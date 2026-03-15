import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../api/auth.api";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      navigate("/login");
    },
  });
};