import { create } from "zustand";

const useCameraStore = create((set) => ({
    cameraAvailable: false,
    mood: null,

    setCameraAvailable: (value) => set({ cameraAvailable: value }),
    setMood: (mood) => set({ mood }),
}));

export default useCameraStore;