import { useEffect } from "react";
import useSong from "../hooks/useSong";
import MusicCard from "./music/MusicCard";

const History = () => {
  const { history, getHistory } = useSong();

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  return (
    <section>

      <h2>Recently Played</h2>

      <div className="music-list">
        {history.map((item) => (
          <MusicCard key={item._id} song={item.song} />
        ))}
      </div>

    </section>
  );
};

export default History;