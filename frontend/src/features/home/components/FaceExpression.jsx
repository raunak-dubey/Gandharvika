import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";
import { detectFaceExpression } from "../utils/faceDetect.utils";

const FaceExpression = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const start = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };

    start();
  }, []);

  return (
    <>
      <image ref={imageRef} src="/seedheMaut.png" width="400"  height="400" />
      <div className="btn" onClick={() => detectFaceExpression(imageRef)}>
        Detect
      </div>
    </>
  );
};

export default FaceExpression;
