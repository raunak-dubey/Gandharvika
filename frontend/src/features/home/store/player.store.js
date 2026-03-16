import { create } from "zustand";

const usePlayerStore = create((set) => ({
    currentSong: null,
    queue: [],
    index: 0,

    playSong: (song, queue = []) => {
        set({ 
            currentSong: song, queue: [song, ...queue],
            index: queue.findIndex((s) => s.id === song.id) 
        });
    },

    playNext: () => {
        set((state) => {
            const next = state.queue[state.index + 1];
            if (!next) return state;

            return {
                currentSong: next,
                index: state.index + 1
            };
        });
    },

    playPrev: () => {
        set((state) => {
            const prev = state.queue[state.index - 1];
            if (!prev) return state;

            return {
                currentSong: prev,
                index: state.index - 1
            };
        });
    },
}));

export default usePlayerStore;