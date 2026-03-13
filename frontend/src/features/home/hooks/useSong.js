import useSongs from "./useSongs";
import usePlayer from "./usePlayer";
import useLikes from "./useLikes";
import useHistory from "./useHistory";
import useSongState from "./useState";

const useSong = () => {
  const state = useSongState();
  const songs = useSongs();
  const player = usePlayer();
  const likes = useLikes();
  const history = useHistory();

  return {
    ...state,
    ...songs,
    ...player,
    ...likes,
    ...history,
  }
};

export default useSong;