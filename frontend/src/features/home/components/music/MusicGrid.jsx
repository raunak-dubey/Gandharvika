import "../../styles/music/music-grid.scss";
import MusicSection from "./MusicSection";
import useCameraStore from "../../store/camera.store";
import useSongs from "../../hooks/queries/useSongs";
import useRecommendation from "../../hooks/queries/useRecommendation";

const MusicGrid = () => {
  const { mood, cameraAvailable } = useCameraStore();
  const { data: songsData, isLoading } = useSongs(mood);
  const { data: recommendationsData } = useRecommendation();

  const songs = songsData?.songs ?? [];
  const recommendations = recommendationsData?.songs ?? [];

  return (
    <section className="music-grid">
      {cameraAvailable ? (
        isLoading ? (
          <p>Loading songs...</p>
        ) : (
          <MusicSection title="Mood Songs" songs={songs} />
        )
      ) : (
        <p className="camera-disabled" style={{ marginBottom: "2rem" }}>
          Mood-based songs require camera access.
        </p>
      )}
      {isLoading ? (
        <p>Loading recommendations...</p>
      ) : (
        <MusicSection title="Recommended For You" songs={recommendations} />
      )}
    </section>
  );
};

export default MusicGrid;
