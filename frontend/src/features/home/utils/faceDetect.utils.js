import * as faceapi from "face-api.js";

export const detectFaceExpression = async (videoRef) => {
    if (!videoRef.current || videoRef.current.readyState !== HTMLMediaElement.HAVE_ENOUGH_DATA) {
        console.log("Video not ready");
        return;
    }

    const detection = await faceapi
        .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }),
        )
        .withFaceLandmarks()
        .withFaceExpressions();

    if (!detection.length) {
        alert("No face detected. Try again.");
        return null;
    }

    const expressions = detection[0].expressions;

    const mood = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b,
    );

    console.log("Detected mood:", mood);
    return mood;
};