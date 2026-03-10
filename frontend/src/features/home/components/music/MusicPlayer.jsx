import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import "../../styles/music-player.scss";
import { useEffect, useRef, useState } from "react";
import useSong from "../../hooks/useSong";

const MusicPlayer = () => {
  const { currentSong, playNext, playPrev } = useSong();
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    const audio = audioRef.current;
    audio.src = currentSong.url;
    audio.play().catch(() => {
      console.warn("Autoplay blocked by browser");
    });
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) audio.play();
    else audio.pause();

    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;

    setProgress((current / duration) * 100);
  };

  const handleSeek = (e) => {
    const time = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setProgress(e.target.value);
  };

  const handleVolume = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value;
    setVolume(value);
  };

  if (!currentSong) return null;

  return (
    <div className="music-player">
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />

      <div className="song-info">
        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
          className="cover-small"
        />

        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="player-center">
      <div className="player-controls">
        <button onClick={playPrev}>
          <SkipBack size={20} />
        </button>

        <button className="play-btn" onClick={togglePlay}>
          {playing ? <Pause size={22} /> : <Play size={22} />}
        </button>

        <button onClick={playNext}>
          <SkipForward size={20} />
        </button>
      </div>

      <div className="progress-bar">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
        />
      </div>
      </div>

      <div className="volume-control">
        <Volume2 size={18} />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
