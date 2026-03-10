import "../../styles/music-player.scss";
import { useState } from "react";

const MusicPlayer = () => {

  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div className="music-player">

      <div className="song-info">

        <div className="cover-small"></div>

        <div>
          <h4>Song Title</h4>
          <p>Artist</p>
        </div>

      </div>

      <div className="player-controls">

        <button>⏮</button>

        <button
          className="play-btn"
          onClick={togglePlay}
        >
          {playing ? "⏸" : "▶"}
        </button>

        <button>⏭</button>

      </div>

      <div className="progress-bar">

        <input type="range" min="0" max="100" />

      </div>

    </div>
  );
};

export default MusicPlayer;