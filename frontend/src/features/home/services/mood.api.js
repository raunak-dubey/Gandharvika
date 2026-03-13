import axios from 'axios'
const moodApi = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true
})

const handleError = (err, fallback) => {
    if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
    }

    throw new Error(fallback);
};

// ? Mood logs
export const fetchMoodLogs = async () => {
  try {
    const response = await moodApi.get(`/mood/log`);
    return response.data
  } catch (err) {
    handleError(err, 'Failed to fetch mood logs')
  }
};