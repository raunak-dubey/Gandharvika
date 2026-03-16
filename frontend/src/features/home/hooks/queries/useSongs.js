import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "../../api/song.api";

const useSongs = (mood) => {
  return useQuery({
    queryKey: ["songs", { mood }],
    queryFn: () => fetchSongs(mood),
    enabled: !!mood
  });
};

export default useSongs;