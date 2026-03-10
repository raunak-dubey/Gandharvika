import * as faceapi from "face-api.js";

export const detectFaceExpression = async (imageRef) => {
    if (!imageRef.current || imageRef.current.readyState !== 4) {
        console.log("Video not ready");
        return;
    }

    const detection = await faceapi
        .detectAllFaces(
            imageRef.current,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }),
        )
        .withFaceLandmarks()
        .withFaceExpressions();

    if (!detection.length) {
        console.log("No face detected");
        return;
    }

    const expressions = detection[0].expressions;

    const mood = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b,
    );

    console.log("Detected mood:", mood);
};