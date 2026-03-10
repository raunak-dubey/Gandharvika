import { useCallback, useContext } from "react";
import SongContext from "../context/song.context";
import { fetchSongs } from "../services/song.api";

const useSong = () => {
  const { songs, loading, setSongs, setLoading, mood, setMood, currentSong, setCurrentSong } = useContext(SongContext);

  const handleFetchSongs = useCallback(async (detectedMood) => {
    setLoading(true);
    setMood(detectedMood);
    try {
      const { songs } = await fetchSongs(detectedMood);
      setSongs(songs);

      if (songs.length) {
        setCurrentSong(songs[0]);
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setSongs, setCurrentSong, setMood]);

  const playNext = () => {
    if (!songs.length) return;

    const index = songs.findIndex((s) => s._id === currentSong._id);

    const nextIndex = (index + 1) % songs.length;

    setCurrentSong(songs[nextIndex]);
  };

  const playPrev = () => {
    if (!songs.length) return;

    const index = songs.findIndex((s) => s._id === currentSong._id);

    const prevIndex = (index - 1 + songs.length) % songs.length;

    setCurrentSong(songs[prevIndex]);
  };

  return { songs, loading, mood, currentSong, setCurrentSong, handleFetchSongs, playNext, playPrev };
};

export default useSong;