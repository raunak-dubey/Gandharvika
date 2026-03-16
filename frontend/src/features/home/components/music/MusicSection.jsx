import MusicCard from "./MusicCard";
import "../../styles/music/music-grid.scss";

const MusicSection = ({ title, songs }) => {
  if (songs?.length === 0) return null;

  return (
    <section className="music-grid">
      {title && <h2 className="section-title">{title}</h2>}

      <div className="music-list">
        {songs.map((song) => (
          <MusicCard key={song._id} song={song} />
        ))}
      </div>
    </section>
  );
};

export default MusicSection;