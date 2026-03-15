import { useCurrentUser } from "./useCurrentUser";
import { useLogin } from "./useLogin";
import { useRegister } from "./useRegister";
import { useLogout } from "./useLogout";

const useAuth = () => {
  const userQuery = useCurrentUser();

  return {
    user: userQuery.data ?? null,
    loading: userQuery.isPending,

    login: useLogin(),
    register: useRegister(),
    logout: useLogout(),
  };
};

export default useAuth;