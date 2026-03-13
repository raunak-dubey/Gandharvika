import useSong from "../hooks/useSong";
import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/music/MusicPlayer";
import "../styles/music/liked-song.scss";
import MusicSection from "../components/music/MusicSection";

const LikedSongs = () => {
  const { likedSongs } = useSong();

  return (
    <>
      <div className="liked-container">
        {likedSongs.length === 0 ? (
          <div className="liked-empty">
            <h3>No liked songs yet</h3>
            <p>Like songs to see them here.</p>
          </div>
        ) : (
          <MusicSection title="Liked Songs" songs={likedSongs} />
        )}
      </div>
    </>
  );
};

export default LikedSongs;
