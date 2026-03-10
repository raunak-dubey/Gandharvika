import MusicCard from "./MusicCard";
import "../../styles/music-grid.scss";
import useSong from "../../hooks/useSong";

const MusicGrid = () => {
  const { songs, loading } = useSong();

  if (loading) {
    return <p>Loading songs...</p>;
  }

  return (
    <section className="music-grid">

      <h2 className="section-title">Recommended</h2>

      <div className="music-list">
        {songs.map((song) => (
          <MusicCard key={song._id} song={song} thumbnail={song.thumbnail}/>
        ))}
      </div>
    </section>
  );
};

export default MusicGrid;