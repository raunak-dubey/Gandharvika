import useSong from "../../hooks/useSong";
import "../../styles/music-card.scss";

const MusicCard = ({ song }) => {
  const { setCurrentSong } = useSong();
  return (
    <div className="music-card" onClick={() => setCurrentSong(song)}>
      <div className="cover">
        <img src={song.thumbnail} alt={song.title} />
        <div className="play-overlay">▶</div>
      </div>

      <div className="music-info">
        <h3 className="music-title">{song.title}</h3>

        <p className="music-artist">{song.artist}</p>
      </div>
    </div>
  );
};

export default MusicCard;
