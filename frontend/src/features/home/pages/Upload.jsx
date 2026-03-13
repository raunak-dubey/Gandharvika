import { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/music/MusicPlayer";
import "../styles/upload.scss";
import useSong from "../hooks/useSong";

const Upload = () => {
  const [mood, setMood] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const audioInputRef = useRef(null);

  const { handleUploadSong, loading } = useSong();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = audioInputRef.current.files[0];

    if (!file) {
      alert("Please upload an audio file");
      return;
    }

    await handleUploadSong(file, mood, tags);

    setSelectedFileName("");
    setMood("");
    setTags("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      alert("Only audio files allowed");
      e.target.value = "";
      setSelectedFileName("");
      return;
    }

    setSelectedFileName(file.name);
  };

  return (
    <>
      <div className="upload-container">
        <h1 className="page-title">Upload Song</h1>

        <form className="upload-card" onSubmit={handleSubmit}>
          <label className="upload-file-label" htmlFor="songFile">
            {selectedFileName
              ? `Selected: ${selectedFileName}`
              : "Click to upload your audio file"}
          </label>

          <input
            ref={audioInputRef}
            onChange={handleFileChange}
            hidden
            type="file"
            id="songFile"
            accept="audio/*"
          />
          <div className="form-group">
            <label>Mood</label>

            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="">Select mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="neutral">Neutral</option>
              <option value="angry">Angry</option>
              <option value="surprised">Surprised</option>
              <option value="fearful">Fearful</option>
              <option value="disgusted">Disgusted</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tags</label>

            <input
              type="text"
              placeholder="lofi, chill, focus"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button className="upload-btn">
            {loading ? "Uploading..." : "Upload Song"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;
