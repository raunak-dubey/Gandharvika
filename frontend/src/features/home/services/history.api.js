import axios from 'axios'
const historyApi = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true
})

const handleError = (err, fallback) => {
    if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
    }

    throw new Error(fallback);
};

// ? history
export const fetchHistory = async () => {
  try {
    const response = await historyApi.get(`/history`);
    return response.data
  } catch (err) {
    handleError(err, 'Failed to fetch history')
  }
};

export const logSongPlay = async (songId, mood) => {
  try {
    const response = await historyApi.post(`/history/play/${songId}`, {mood});
    return response.data
  } catch (err) {
    handleError(err, 'Failed to log song play')
  }
};