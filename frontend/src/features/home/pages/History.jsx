import { useEffect } from "react";
import useSong from "../hooks/useSong";
import MusicSection from "../components/music/MusicSection";
import "../styles/history.scss";
import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/music/MusicPlayer";

const History = () => {
  const { history, moodLogs, getHistoryPageData } = useSong();

  useEffect(() => {
    getHistoryPageData();
  }, [getHistoryPageData]);

  return (
    <div className="history-page">
      <Sidebar />

      <main className="history-main">
        <div className="history-container">
          {history.length === 0 ? (
            <div className="history-empty">
              <h3>No listening history yet</h3>
              <p>Listen to some songs to see them here.</p>
            </div>
          ) : (
            <MusicSection
              title="Recently Played"
              songs={history.map((h) => h.song)}
            />
          )}

          <div className="mood-history">
            <h2>Mood Detection History</h2>

            {Array.isArray(moodLogs) && moodLogs.length > 0 ? (
              <div className="mood-grid">
                {moodLogs.map((log) => (
                  <div
                    key={log._id}
                    className={`mood-card mood-${log.detectedMood}`}
                  >
                    <div className="mood-name">{log.detectedMood}</div>

                    <div className="mood-time">
                      {new Date(log.detectedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mood-empty">
                <p>No mood detections yet.</p>
                <span>
                  Use the camera feature to detect mood while listening.
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default History;
