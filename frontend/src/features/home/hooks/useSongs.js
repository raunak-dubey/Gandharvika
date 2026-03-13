import { useCallback } from "react";
import { fetchRecommendations, fetchSongs, uploadSong } from "../services/song.api";
import useSongState from "./useState";

const useSongs = () => {
  const {
    mood,
    setSongs,
    setRecommendations,
    setLoading,
    setMood,
    setCurrentSong,
  } = useSongState();

  // ? Fetch songs based on mood
  const handleFetchSongs = useCallback(async (detectedMood) => {
    setLoading(true);

    try {
      setMood(detectedMood);

      const data = await fetchSongs(detectedMood);
      const songsList = data?.songs || [];
      setSongs(songsList);

      if (songsList.length > 0) {
        setCurrentSong(songsList[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setSongs, setCurrentSong, setMood]);

  // ? Fetch recommendations based on mood
  const handleRecommendations = useCallback(async () => {
    if (!mood) return;
    setLoading(true);

    try {
      const data = await fetchRecommendations(mood);
      const songsList = data?.songs || [];

      setRecommendations(songsList.map(song => song));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [mood, setRecommendations, setLoading]);

  const handleUploadSong = useCallback(async (file, mood, tags) => {
    setLoading(true);
    try {
      const data = await uploadSong(file, mood, tags);
      setSongs((prev) => [data.song, ...prev]);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setSongs]);

  return {
    mood,
    setCurrentSong,

    handleFetchSongs,
    handleRecommendations,
    handleUploadSong,
  };
};

export default useSongs;