import "../../styles/music-grid.scss";
import useSong from "../../hooks/useSong";
import { useEffect } from "react";
import MusicSection from "./MusicSection";

const MusicGrid = () => {
  const {
    songs,
    recommendations,
    loading,
    handleRecommendations,
    cameraAvailable,
  } = useSong();

  useEffect(() => {
    handleRecommendations();
  }, [handleRecommendations]);

  if (loading) {
    return <p>Loading songs...</p>;
  }

  return (
    <section className="music-grid">
      {cameraAvailable ? (
        <MusicSection title="Mood Songs" songs={songs} />
      ) : (
        <p className="camera-disabled" style={{marginBottom: '2rem'}}>
          Mood-based songs require camera access.
        </p>
      )}

      <MusicSection title="Recommended For You" songs={recommendations} />
    </section>
  );
};

export default MusicGrid;
