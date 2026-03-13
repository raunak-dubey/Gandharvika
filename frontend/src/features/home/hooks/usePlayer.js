import useHistory from "./useHistory";
import useSongState from "./useState";

const usePlayer = () => {
  const { songs, currentSong, setCurrentSong } = useSongState();
  const { logPlay } = useHistory();

  const playSong = async (song) => {
    if (!song) return;
    setCurrentSong(song);
    await logPlay(song);
  };

  const playNext = () => {
    if (!songs.length || !currentSong) return;

    const index = songs.findIndex(s => s._id === currentSong._id);
    const nextIndex = (index + 1) % songs.length;

    playSong(songs[nextIndex]);
  };

  const playPrev = () => {
    if (!songs.length || !currentSong) return;

    const index = songs.findIndex(s => s._id === currentSong._id);
    const prevIndex = (index - 1 + songs.length) % songs.length;

    playSong(songs[prevIndex]);
  };

  return { playSong, playNext, playPrev };
};

export default usePlayer;