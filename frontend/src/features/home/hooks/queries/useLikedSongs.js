import { useQuery } from "@tanstack/react-query";
import { fetchLikedSong } from "../../api/song.api";

const useLikedSongs = () => {
  return useQuery({
    queryKey: ["likedSongs"],
    queryFn: fetchLikedSong
  });
};

export default useLikedSongs;