import { useEffect } from "react";
import { fetchLikedSong } from "../services/song.api";
import useSongState from "./useState";

const useSongInit = () => {
  const { setLikedSongs } = useSongState();

  useEffect(() => {
    const loadLikedSongs = async () => {
      try {
        const data = await fetchLikedSong();
        setLikedSongs(data?.songs || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadLikedSongs();
  }, [setLikedSongs]);
};

export default useSongInit;