import axiosInstance from "@/shared/api/axios";

export const getSessionsApi = async () => {
    const { data } = await axiosInstance.get("/session/get-sessions");
    return data.sessions;
};

export const logoutSessionApi = async (id) => {
    const { data } = await axiosInstance.post("/session/logout-session/" + id);
    return data.message;
};