export const startCamera = async (videoRef) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  if (videoRef.current) {
    videoRef.current.srcObject = stream;
  }

  return stream;
};

export const stopCamera = (stream) => {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
};