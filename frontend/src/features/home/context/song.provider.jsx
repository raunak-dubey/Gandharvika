import { useMemo, useState } from "react";
import SongContext from "./song.context";

const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const value = useMemo(
    () => ({
      songs,
      loading,
      mood,
      currentSong,
      setSongs,
      setLoading,
      setMood,
      setCurrentSong,
    }),
    [songs, loading, mood, currentSong],
  );
  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
};

export default SongProvider;
