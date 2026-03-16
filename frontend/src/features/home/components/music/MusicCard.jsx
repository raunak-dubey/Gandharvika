import useLikeSong from "../../hooks/mutations/useLikeSong";
import useLikedSongs from "../../hooks/queries/useLikedSongs";
import usePlayer from "../../store/player.store";
import "../../styles/music/music-card.scss";
import { Heart } from "lucide-react";

const MusicCard = ({ song, songs }) => {
  const { playSong } = usePlayer();
  const likeSong = useLikeSong();
  const { data } = useLikedSongs();

  const likedSongs = data?.songs ?? [];
  const liked = likedSongs?.some((s) => s._id === song._id);

  return (
    <div className="music-card" onClick={() => playSong(song, songs)} style={{marginBottom: '2rem'}}>
      <div className="cover">
        <img src={song.thumbnail} alt={song.title} />
        <div className="play-overlay">▶</div>
      </div>

      <button
        disabled={likeSong.isPending}
        className={`like-btn ${liked ? "liked" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          likeSong.mutate(song._id);
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
