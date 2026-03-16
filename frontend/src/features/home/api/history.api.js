import axiosInstance from '@shared/api/axios';

// ? history
export const fetchHistory = async () => {
    const { data } = await axiosInstance.get(`/history`);
    return data;
};

export const logSongPlay = async (songId, mood) => {
    const { data } = await axiosInstance.post(`/history/play/${songId}`, { mood });
    return data;
};