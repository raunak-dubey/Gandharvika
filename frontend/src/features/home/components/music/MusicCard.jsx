import "../../styles/music-card.scss";

const MusicCard = ({ song }) => {
  return (
    <div className="music-card">

      <div className="cover">
        <div className="play-overlay">
          ▶
        </div>
      </div>

      <div className="music-info">

        <h3 className="music-title">
          {song.title}
        </h3>

        <p className="music-artist">
          {song.artist}
        </p>

      </div>

    </div>
  );
};

export default MusicCard;