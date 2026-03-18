import { useLogin } from "./useLogin";
import { useRegister } from "./useRegister";

const useAuth = () => {
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  return {
    login: loginMutation,
    register: registerMutation,
  };
};

export default useAuth;