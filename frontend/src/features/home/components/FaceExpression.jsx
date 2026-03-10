import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { detectFaceExpression } from "../utils/faceDetect.utils";
import "../styles/expression.scss";

const FaceExpression = () => {
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };

    start();
  }, []);

  const handleDetect = async () => {
    setLoading(true);

    await detectFaceExpression(imageRef);
    setLoading(false);
  };

  return (
    <section className="expression-section">
      <div className="expression-preview">
        <img
          ref={imageRef}
          src="/seedheMaut.png"
          width="300"
          height="300"
          alt="expression source"
          className="expression-image"
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
    </section>
  );
};

export default FaceExpression;
