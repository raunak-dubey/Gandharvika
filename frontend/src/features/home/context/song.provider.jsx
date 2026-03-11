import { useEffect, useMemo, useState } from "react";
import SongContext from "./song.context";
import { fetchLikedSong } from "../services/song.api";

const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);

  const [currentSong, setCurrentSong] = useState(null);
  const [cameraAvailable, setCameraAvailable] = useState(true);

  useEffect(() => {
    const loadLikedSongs = async () => {
      try {
        const data = await fetchLikedSong();
        setLikedSongs(data?.songs || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadLikedSongs();
  }, []);

  const value = useMemo(
    () => ({
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
    }),
    [ songs, recommendations, likedSongs, history, loading, mood, currentSong, cameraAvailable ],
  );
  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};

export default SongProvider;