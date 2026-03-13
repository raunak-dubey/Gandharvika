import { useCallback, useEffect, useRef, useState } from "react";
import { detectFaceExpression } from "../utils/faceDetect.utils";
import "../styles/expression.scss";
import useSong from "../hooks/useSong";
import { loadFaceModels } from "../utils/faceApi.utils";
import { startCamera, stopCamera } from "../utils/camera.utils";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const { handleFetchSongs, setCameraAvailable, songs } = useSong();

  const handleDetect = useCallback(async () => {
    if (!videoRef.current) return;
    setLoading(true);

    try {
      const mood = await detectFaceExpression(videoRef.current);
      if (mood) {
        await handleFetchSongs(mood);
      }
    } catch (err) {
      console.error("Detection failed", err);
    }
    setLoading(false);
  }, [handleFetchSongs]);

  useEffect(() => {
    const init = async () => {
      await loadFaceModels();

      if (!songs.length) await handleFetchSongs("neutral");

      try {
        const stream = await startCamera(videoRef.current);
        streamRef.current = stream;
        setCameraAvailable(true);
      } catch {
        setCameraError(true);
        setCameraAvailable(false);
      }
    };
    init();

    return () => stopCamera(streamRef.current);
  }, [songs.length, handleFetchSongs, setCameraAvailable]);

  return (
    <section className="expression-section">
      {cameraError ? (
        <p className="camera-warning">
          Camera not detected. Mood detection unavailable. You can still explore
          music.
        </p>
      ) : (
        <>
          <div className="expression-preview">
            <video
              ref={videoRef}
              className="expression-image"
              autoPlay
              muted
              playsInline
            />
          </div>
          <div className="expression-controls">
            <h2 className="heading">Detect Your Mood</h2>

            <p className="sub-text">
              Detect your facial expression and get music recommendations.
            </p>
            <button
              className={`detect-btn ${loading ? "loading" : ""}`}
              onClick={handleDetect}
            >
              {loading ? "Detecting..." : "Detect Expression"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default FaceExpression;
