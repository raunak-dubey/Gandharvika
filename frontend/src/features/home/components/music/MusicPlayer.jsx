import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import "../../styles/music/music-player.scss";
import { useEffect, useRef, useState } from "react";
import useSong from "../../hooks/useSong";

const MusicPlayer = () => {
  const { currentSong, playNext, playPrev } = useSong();
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    const audio = audioRef.current;
    audio.src = currentSong.audioUrl;
    audio.load();

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
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

    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const current = audio.currentTime;
    const duration = audio.duration;

    if (!duration || isNaN(duration)) return;

    setCurrentTime(current);
    setDuration(duration);
    setProgress((current / duration) * 100);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const value = Number(e.target.value);
    const time = (value / 100) * audio.duration;

    audio.currentTime = time;
    setProgress(value);
  };

  const handleVolume = (e) => {
    const value = Number(e.target.value);
    audioRef.current.volume = value;
    setVolume(value);
  };

  if (!currentSong) return null;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
      />

      <div className="song-info">
        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
          className="cover-small"
        />

        <div className="song-text">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button onClick={playPrev} disabled={!currentSong}>
            <SkipBack size={18} />
          </button>

          <button
            className={`play-btn ${playing ? "active" : ""}`}
            onClick={togglePlay}
          >
            {playing ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button onClick={playNext} disabled={!currentSong}>
            <SkipForward size={18} />
          </button>
        </div>

        <div className="progress-wrapper">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
          />
          <span>{formatTime(duration)}</span>
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
