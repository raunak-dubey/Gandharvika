import { useCallback, useContext, useEffect } from "react";
import AuthContext from "../context/auth.context";
import { loginApi, registerApi, logoutApi, getMeApi } from "../services/auth.api";
import { useNavigate } from "react-router";

const useAuth = () => {
    const { user, loading, setUser, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = useCallback(async ({ identifier, password }) => {
        setLoading(true);
        try {
            const response = await loginApi(identifier, password);
            setUser(response.user);
            navigate("/");
        } finally {
            setLoading(false);
        }
    }, [setLoading, setUser, navigate]);

    const handleRegister = useCallback(async ({ username, email, password }) => {
        setLoading(true);
        try {
            const response = await registerApi(username, email, password);
            setUser(response.user);
            navigate("/");
        } finally {
            setLoading(false);
        }
    }, [setLoading, setUser, navigate]);

    const handleLogout = useCallback(async () => {
        setLoading(true);
        try {
            await logoutApi();
            setUser(null);
            navigate("/login");
        } finally {
            setLoading(false);
        }
    }, [setLoading, setUser, navigate]);

    const handleGetMe = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getMeApi();
            setUser(response.user);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setUser]);

    useEffect(() => {
        handleGetMe();
    }, [handleGetMe]);

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGetMe
    };
};

export default useAuth;