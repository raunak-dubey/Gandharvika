import axiosInstance, { setAccessToken } from "@/shared/api/axios";

export const getMeApi = async () => {
    const { data } = await axiosInstance.get("/user/get-me");
    return data.user;
};

export const updateUserApi = async ({ username, email, avatarFile }) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);

    if (avatarFile) {
        formData.append("avatar", avatarFile);
    }

    const { data } = await axiosInstance.put("/user/update", formData);

    console.log(data.user);

    return data.user;
};

export const updatePasswordApi = async ({ oldPassword, newPassword }) => {
    const { data } = await axiosInstance.put("/user/update-password", {
        oldPassword,
        newPassword
    });
    return data;
};

export const deleteUserApi = async () => {
    const { data } = await axiosInstance.delete("/user/delete");
    return data.message;
};

export const logoutApi = async () => {
    const { data } = await axiosInstance.post("/user/logout");
    setAccessToken(null);
    return data;
};