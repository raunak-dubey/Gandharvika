import { useUpdateUser } from "../mutations/useUpdateUser";
import { useUpdatePassword } from "../mutations/useUpdatePassword";
import { useDeleteUser } from "../mutations/useDeleteUser";
import { useLogoutSession } from "../mutations/useLogoutSession";

import { useCurrentUser } from "./useCurrentUser";
import { useCurrentSession } from "./useCurrentSession";
import { useLogout } from "./useLogout";

const useUser = () => {
    const updateUser = useUpdateUser();
    const updatePassword = useUpdatePassword();
    const deleteUser = useDeleteUser();
    const logoutSession = useLogoutSession();
    
    const userQuery = useCurrentUser();
    const currentSession = useCurrentSession();
    const logoutUser = useLogout();

    return {
        user: userQuery.data ?? null,
        loading: userQuery.isLoading,
        error: userQuery.error,

        updateUser,
        updatePassword,
        deleteUser,
        logoutUser,

        sessions: currentSession.data ?? [],
        isLoading: currentSession.isLoading,
        logoutSession
    };
};

export default useUser;