import { useCurrentUser } from "./useCurrentUser";
import { useLogin } from "./useLogin";
import { useRegister } from "./useRegister";
import { useLogout } from "./useLogout";

const useAuth = () => {
  const userQuery = useCurrentUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  return {
    user: userQuery.data ?? null,
    loading: userQuery.isLoading,
    error: userQuery.error,

    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
};

export default useAuth;