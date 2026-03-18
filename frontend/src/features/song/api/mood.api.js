import axiosInstance from '@shared/api/axios';

// ? Mood logs
export const fetchMoodLogs = async () => {
    const { data } = await axiosInstance.get(`/mood/log`);
    return data;
};