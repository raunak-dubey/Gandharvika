import axiosInstance from '@shared/api/axios';

// ? Get all songs
export const fetchSongs = async (mood) => {
  const { data } = await axiosInstance.get(`/song?mood=${mood}`);
  return data;
}

// ? Recommend songs based on mood
export const fetchRecommendations = async () => {
  const { data } = await axiosInstance.get(`/song/recommend`);
  return data;
};

// ? Like Song
export const likeSong = async (songId) => {
  const { data } = await axiosInstance.post(`/song/like/${songId}`);
  return data;
};

export const fetchLikedSong = async () => {
  const { data } = await axiosInstance.get(`/song/liked`);
  return data;
};

export const uploadSong = async (file, mood, tags) => {
  const formData = new FormData();

  formData.append("song", file);
  formData.append("mood", mood);
  formData.append("tags", tags);

  const { data } = await axiosInstance.post(`/song`, formData);
  return data;
};