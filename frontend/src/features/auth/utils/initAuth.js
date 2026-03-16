import axiosInstance, { setAccessToken } from "@/shared/api/axios";

export const initAuth = async () => {
    try {
        const { data } = await axiosInstance.post("/auth/refresh");
        setAccessToken(data.accessToken);
        return true;
    } catch {
        setAccessToken(null);
        return false;
    }
};