import * as faceapi from "face-api.js";
let modelsLoaded = false;

export const loadFaceModels = async () => {
  if (modelsLoaded) return;
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models")
  ])

  modelsLoaded = true;
};