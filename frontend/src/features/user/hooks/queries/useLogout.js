import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../api/user.api";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries(["currentUser"]);
      navigate("/login");
    },
  });
};