import { useEffect, useRef, useState } from "react";
import { detectFaceExpression } from "../utils/faceDetect.utils";
import "../styles/expression.scss";
import useSong from "../hooks/useSong";
import { loadFaceModels } from "../utils/faceApi.utils";

const FaceExpression = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  const { handleFetchSongs } = useSong();

  useEffect(() => {
    handleFetchSongs("neutral");

    let stream;

    const start = async () => {
      await loadFaceModels();

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        videoRef.current.srcObject = stream;
      } catch {
        setCameraError(true);
        console.warn("Camera not available");
      }
    };

    start();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDetect = async () => {
    setLoading(true);

    const mood = await detectFaceExpression(videoRef);
    if (mood) {
      await handleFetchSongs(mood);
    }

    setLoading(false);
  };

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
              alt="expression source"
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
