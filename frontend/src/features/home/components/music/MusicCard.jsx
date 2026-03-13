import useSong from "../../hooks/useSong";
import "../../styles/music/music-card.scss";
import { Heart } from "lucide-react";

const MusicCard = ({ song }) => {
  const { playSong, handleLikeSong, likedSongs } = useSong();

  const liked = likedSongs?.some((s) => s._id === song._id);

  return (
    <div className="music-card" onClick={() => playSong(song)} style={{marginBottom: '2rem'}}>
      <div className="cover">
        <img src={song.thumbnail} alt={song.title} />
        <div className="play-overlay">▶</div>
      </div>

      <button
        className={`like-btn ${liked ? "liked" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleLikeSong(song._id);
        }}
      >
        <Heart size={20} fill={liked ? "#ff4d6d" : "none"} />
      </button>

      <div className="music-info">
        <h3 className="music-title">{song.title}</h3>
        <p className="music-artist">{song.artist}</p>
      </div>
    </div>
  );
};

export default MusicCard;
