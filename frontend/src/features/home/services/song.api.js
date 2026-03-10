import axios from 'axios'
const songApi = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true
})

const handleError = (err, fallback) => {
    if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
    }

    throw new Error(fallback);
};

export const fetchSongs = async (detectedMood) => {
  try {
    const response = await songApi.get('/song?mood=' + detectedMood)
    return response.data

  } catch (err) {
    return handleError(err, 'Failed to fetch songs')
  }
}