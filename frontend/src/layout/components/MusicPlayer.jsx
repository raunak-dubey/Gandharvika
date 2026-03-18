import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import "@/layout/styles/music-player.scss";
import { useEffect, useRef, useState } from "react";
import usePlayerStore from "@/layout/store/player.store";
import useLogPlay from "@/features/song/hooks/mutations/useLogPlay";
import { Shuffle } from "lucide-react";
import { Repeat } from "lucide-react";

const MusicPlayer = () => {
  const {
    currentSong,
    playNext,
    playPrev,
    toggleShuffle,
    toggleRepeat,
    repeat,
    shuffle,
  } = usePlayerStore();
  const logPlay = useLogPlay();
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
      .then(() => {
        setPlaying(true);

        logPlay.mutate({ songId: currentSong?._id, mood: currentSong?.mood });
      })
      .catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setPlaying(true);
    };

    const handlePause = () => setPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // ? Handle keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }

      if (e.code === "ArrowRight") {
        playNext();
      }

      if (e.code === "ArrowLeft") {
        playPrev();
      }

      if (e.code === "KeyR") {
        toggleRepeat();
      }

      if (e.code === "KeyS") {
        toggleShuffle();
      }

      if (e.code === "ArrowUp") {
        e.preventDefault();
        volumeUp();
      }
      if (e.code === "ArrowDown") {
        e.preventDefault();
        volumeDown();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [playNext, playPrev, toggleShuffle, toggleRepeat]);

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

  const volumeUp = () => {
      const audio = audioRef.current;
      if (!audio) return;

      setVolume((prev) => {
        const newVolume = Math.min(prev + 0.05, 1);
        audio.volume = newVolume;
        return newVolume;
      });
    };

    const volumeDown = () => {
      const audio = audioRef.current;
      if (!audio) return;

      setVolume((prev) => {
        const newVolume = Math.max(prev - 0.05, 0);
        audio.volume = newVolume;
        return newVolume;
      });
    };

  // ? Handle time updates
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

  // ? Format time
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ? Handle seeking
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const value = Number(e.target.value);
    const time = (value / 100) * audio.duration;

    audio.currentTime = time;
    setProgress(value);
  };

  // ? Handle volume changes
  const handleVolume = (e) => {
    const value = Number(e.target.value);
    audioRef.current.volume = value;
    setVolume(value);
  };

  const handleEnded = () => {
    if (repeat === "one") {
      const audio = audioRef.current;
      audio.currentTime = 0;
      audio.play();
    } else {
      playNext();
    }
  };

  if (!currentSong) return null;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
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
          <button className={shuffle ? "active" : ""} onClick={toggleShuffle}>
            <Shuffle size={18} />
          </button>

          <button onClick={playPrev} disabled={!currentSong}>
            <SkipBack size={20} />
          </button>

          <button
            className={`play-btn ${playing ? "active" : ""}`}
            onClick={togglePlay}
          >
            {playing ? <Pause size={26} /> : <Play size={26} />}
          </button>

          <button onClick={playNext} disabled={!currentSong}>
            <SkipForward size={20} />
          </button>

          <button
            className={`repeat-btn ${repeat !== "off" ? "active" : ""}`}
            onClick={toggleRepeat}
          >
            <Repeat size={18} />
            {repeat === "one" && <span className="repeat-one">1</span>}
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
