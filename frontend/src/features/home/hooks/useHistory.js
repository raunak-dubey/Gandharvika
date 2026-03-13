import { useCallback } from "react";
import { fetchHistory, logSongPlay } from "../services/history.api";
import { fetchMoodLogs } from "../services/mood.api";
import useSongState from "./useState";

const useHistory = () => {
  const { mood, setHistory, setMoodLogs } = useSongState();

  const loadHistoryPage = async () => {
    const historyData = await fetchHistory();
    const moodData = await fetchMoodLogs();

    setHistory(historyData?.history || []);
    setMoodLogs(moodData?.logs || []);
  };

  const logPlay = useCallback(async (song) => {
    if (!song) return;
    try {
    await logSongPlay(song._id, mood);
    setHistory((prev) => {
      const existing = prev.find((h) => h.song._id === song._id);
      if (existing) {
        return prev.map(h =>
          h.song._id === song._id
            ? { ...h, plays: (h.plays || 1) + 1 }
            : h
        );
      }
      return [{ song, mood, playedAt: new Date(), plays: 1 }, ...prev];
    });
    } catch (error) {
      console.error(error);
    }
  }, [mood, setHistory]);

  return { loadHistoryPage, logPlay };
};

export default useHistory;