import MusicSection from "../components/music/MusicSection";
import useHistory from "../hooks/queries/useHistory";
import useMoodLogs from "../hooks/queries/useMoodLog";
import "../styles/history.scss";

const History = () => {
  const { data: historyData } = useHistory();
  const { data: moodLogsData } = useMoodLogs();

  const history = historyData?.history ?? [];
  const moodLogs = moodLogsData?.logs ?? [];

  const hasHistory = history.length > 0;
  const hasMoodLogs = moodLogs.length > 0;
  console.log('history', history);
  console.log("hasHistory", hasHistory);

  return (
    <div className="history-container">
      {!hasHistory && !hasMoodLogs && (
        <div className="history-empty">
          <h3>No activity yet</h3>
          <p>Start listening to songs to build your history.</p>
        </div>
      )}

      {hasHistory && (
        <MusicSection
          title="Recently Played"
          songs={history.map((h) => h.song)}
        />
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
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;