import axiosInstance, { setAccessToken } from '@shared/api/axios';

export const loginApi = async ({ identifier, password }) => {
    const { data } = await axiosInstance.post('/auth/login', {
        identifier, password
    });
    setAccessToken(data.accessToken);
    return data;
};

export const registerApi = async ({ username, email, password }) => {
  const { data } = await axiosInstance.post("/auth/register", {
    username,
    email,
    password,
  });
  setAccessToken(data.accessToken);
  return data;
};

export const logoutApi = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  setAccessToken(null);
  return data;
};

export const getMeApi = async () => {
  const { data } = await axiosInstance.get("/auth/get-me");
  return data.user;
};