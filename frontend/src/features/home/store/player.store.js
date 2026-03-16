import { create } from "zustand";
import { persist } from 'zustand/middleware'

const usePlayerStore = create(persist((set, get) => ({
    currentSong: null,
    queue: [],
    index: 0,

    shuffle: false,
    repeat: 'off',

    playSong: (song, queue = []) => {
        const newQueue = queue.length ? queue : [song];
        const index = newQueue.findIndex(s => s._id === song._id);

        set({
            currentSong: song, queue: newQueue,
            index: index === -1 ? 0 : index
        });
    },

    playNext: () => {
        const { queue, index, shuffle, repeat } = get();

        if (!queue.length) return;

        // repeat one
        if (repeat === 'one') {
            set({ currentSong: queue[index] });
            return;
        }

        let nextIndex;

        if (shuffle) {
            do {
                nextIndex = Math.floor(Math.random() * queue.length);
            } while (nextIndex === index && queue.length > 1);
        } else {
            nextIndex = index + 1;
        }

        // repeat all
        if (nextIndex >= queue.length) {
            if (repeat === 'all') {
                nextIndex = 0;
            } else {
                return;
            }
        }

        set({
            currentSong: queue[nextIndex],
            index: nextIndex
        });
    },

    playPrev: () => {
        const { queue, index } = get();

        if (!queue.length) return;

        const prevIndex = index - 1;

        if (prevIndex < 0) return;

        set({
            currentSong: queue[prevIndex],
            index: prevIndex,
        });
    },

    toggleShuffle: () =>
        set((state) => ({
            shuffle: !state.shuffle,
        })),

    toggleRepeat: () =>
        set((state) => {
            const modes = ["off", "all", "one"];
            const next = modes[(modes.indexOf(state.repeat) + 1) % modes.length];

            return { repeat: next };
        }),

    addToQueue: (song) =>
        set((state) => ({
            queue: [...state.queue, song],
        })),

    clearQueue: () =>
        set({
            queue: [],
            currentSong: null,
            index: 0,
        }),
}),
    {
        name: 'ganharvika-storage'
    }
));

export default usePlayerStore;