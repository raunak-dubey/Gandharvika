import { useContext } from "react";
import SongContext from "../context/song.context";

const useSongState = () => {
  return useContext(SongContext);
};

export default useSongState;