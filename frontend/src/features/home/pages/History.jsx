import { useEffect } from "react";
import useSong from "../hooks/useSong";
import MusicSection from "../components/music/MusicSection";
import "../styles/history.scss";

const History = () => {
  const { history, moodLogs, loadHistoryPage } = useSong();
  const hasHistory = history.length > 0;
  const hasMoodLogs = Array.isArray(moodLogs) && moodLogs.length > 0;

  useEffect(() => {
    loadHistoryPage();
  }, [loadHistoryPage]);

  return (
    <>
      <div className="history-container">
        {!hasHistory && !hasMoodLogs && (
          <div className="history-empty">
            <h3>No activity yet</h3>
            <p>Start listening to songs to build your history.</p>
          </div>
        )}

        {hasHistory && (
          <>
            <MusicSection
              title="Recently Played"
              songs={history.map((h) => h.song)}
            />
          </>
        )}

        {hasMoodLogs && (
          <div className="mood-history">
            <h2>Mood Detection History</h2>

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
          </div>
        )}
      </div>
    </>
  );
};

export default History;
