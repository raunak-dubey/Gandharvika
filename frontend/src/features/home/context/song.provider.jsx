import { useMemo, useState } from "react";
import SongContext from "./song.context";

const SongProvider = ({ children }) => {
  // song data
  const [songs, setSongs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [history, setHistory] = useState([]);

  // Ui State
  const [loading, setLoading] = useState(false);
  const [cameraAvailable, setCameraAvailable] = useState(true);

  // Mood State
  const [mood, setMood] = useState(null);
  const [moodLogs, setMoodLogs] = useState([]);

  // Player State
  const [currentSong, setCurrentSong] = useState(null);

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
      moodLogs,

      setSongs,
      setRecommendations,
      setMoodLogs,
      setLikedSongs,
      setHistory,
      setLoading,
      setMood,
      setCurrentSong,
      setCameraAvailable
    }),
    [ songs, recommendations, likedSongs, history, loading, mood, currentSong, cameraAvailable, moodLogs ],
  );
  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};

export default SongProvider;