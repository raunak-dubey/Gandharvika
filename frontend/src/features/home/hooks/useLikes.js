import { useCallback } from "react";
import { likeSong, fetchLikedSong } from "../services/song.api";
import useSongState from "./useState";

const useLikes = () => {
  const { songs, recommendations, likedSongs, setLikedSongs } = useSongState();

  const handleLikeSong = useCallback(async (songId) => {
    const song =
      songs.find(s => s._id === songId) ||
      recommendations.find(s => s._id === songId);

    if (!song) return;

    const isLiked = likedSongs.some(s => s._id === songId);

    setLikedSongs(prev =>
      isLiked
        ? prev.filter(s => s._id !== songId)
        : [...prev, song]
    );

    try {
      await likeSong(songId);
    } catch {
      setLikedSongs(prev =>
        isLiked ? [song, ...prev] : prev.filter(s => s._id !== songId)
      );
    }
  }, [songs, recommendations, likedSongs, setLikedSongs]);

  const loadLikedSongs = async () => {
    const data = await fetchLikedSong();
    setLikedSongs(data?.songs || []);
  };

  return { handleLikeSong, loadLikedSongs };
};

export default useLikes;