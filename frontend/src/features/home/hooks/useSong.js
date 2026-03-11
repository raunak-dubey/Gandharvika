import { useCallback, useContext } from "react";
import SongContext from "../context/song.context";
import { fetchRecommendations, fetchSongs, likeSong, fetchHistory, fetchLikedSong, logSongPlay } from "../services/song.api";

const useSong = () => {
  const {
    songs,
    recommendations,
    likedSongs,
    history,
    loading,
    mood,
    currentSong,
    cameraAvailable,

    setSongs,
    setRecommendations,
    setLikedSongs,
    setHistory,
    setLoading,
    setMood,
    setCurrentSong,
    setCameraAvailable
  } = useContext(SongContext);

  // ? Fetch songs based on mood
  const handleFetchSongs = useCallback(async (detectedMood) => {
    setLoading(true);

    try {
      setMood(detectedMood);

      const data = await fetchSongs(detectedMood);
      const songsList = data?.songs || [];
      setSongs(songsList.map(song => song));

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

  // ? Like a Song
  const handleLikeSong = useCallback(async (songId) => {
    const song =
      songs.find((s) => s._id === songId) ||
      recommendations.find((s) => s._id === songId);

    if (!song) return;

    const isLiked = likedSongs.some((s) => s._id === songId);

    setLikedSongs(prev => {
      if (isLiked) {
        return prev.filter((s) => s._id !== songId);
      }
      return [...prev, song];
    });

    try {
      await likeSong(songId);
    } catch (error) {
      console.error(error);

      setLikedSongs((prev) => {
      if (isLiked) {
        return [song, ...prev];
      }
      return prev.filter((s) => s._id !== songId);
    });

    }
  }, [setLikedSongs, songs, recommendations, likedSongs]);

  // ? get liked songs
  const getLikedSongs = useCallback(async () => {
    try {
      const data = await fetchLikedSong();
      const songsList = data?.songs || [];

      setLikedSongs(songsList.map(song => song));

    } catch (error) {
      console.error(error);
    }
  }, [setLikedSongs]);

  // ? get listening history
  const getHistory = useCallback(async () => {
    try {
      const data = await fetchHistory();
      const historyList = data?.history || [];

      setHistory(historyList);

    } catch (error) {
      console.error(error);
    }
  }, [setHistory]);

  // ? Play song and log history
  const playSong = useCallback(async (song) => {
    if (!song) return;
    setCurrentSong(song);

    try {
      await logSongPlay(song._id, mood);
    } catch (error) {
      console.error(error);
    }
  }, [setCurrentSong, mood]);

  // ? Play next song
  const playNext = () => {
    if (!songs.length || !currentSong) return;

    const index = songs.findIndex((s) => s._id === currentSong._id);
    const nextIndex = (index + 1) % songs.length;

    setCurrentSong(songs[nextIndex]);
  };

  // ? Play previous song
  const playPrev = () => {
    if (!songs.length || !currentSong) return;

    const index = songs.findIndex((s) => s._id === currentSong._id);
    const prevIndex = (index - 1 + songs.length) % songs.length;

    setCurrentSong(songs[prevIndex]);
  };

  return {
    songs,
    recommendations,
    likedSongs,
    history,
    loading,
    mood,
    currentSong,
    cameraAvailable,

    setCurrentSong,
    setCameraAvailable,

    handleFetchSongs,
    handleRecommendations,

    handleLikeSong,
    getLikedSongs,

    getHistory,

    playSong,
    playNext,
    playPrev
  };
};

export default useSong;