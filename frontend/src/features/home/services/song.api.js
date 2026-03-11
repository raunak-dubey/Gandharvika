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

// ? Get all songs
export const fetchSongs = async (mood) => {
  try {
    const response = await songApi.get(`/song?mood=${mood}`);
    return response.data

  } catch (err) {
    handleError(err, 'Failed to fetch songs')
  }
}

// ? Recommend songs based on mood
export const fetchRecommendations = async (mood) => {
  try {
    const response = await songApi.get(`/song/recommend?mood=${mood}`);
    return response.data

  } catch (err) {
    handleError(err, 'Failed to fetch songs')
  }
};

// ? Like Song
export const likeSong = async (songId) => {
  try {
    const response = await songApi.post(`/song/like/${songId}`);
    return response.data

  } catch (err) {
    handleError(err, 'Failed to like song')
  }
};

export const fetchLikedSong = async () => {
  try {
    const response = await songApi.get(`/song/liked`);
    return response.data

  } catch (err) {
    handleError(err, 'Failed to like song')
  }
};

// ? history
export const fetchHistory = async () => {
  try {
    const response = await songApi.get(`/history`);
    return response.data

  } catch (err) {
    handleError(err, 'Failed to fetch history')
  }
};

export const logSongPlay = async (songId, mood) => {
  try {
    const response = await songApi.post(`/history/play/${songId}`, {mood});
    return response.data

  } catch (err) {
    handleError(err, 'Failed to log song play')
  }
};