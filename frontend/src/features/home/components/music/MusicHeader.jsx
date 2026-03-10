import "../../styles/header.scss";
import { useState } from "react";

const MusicHeader = () => {
  const [search, setSearch] = useState("");

  return (
    <header className="music-header">

      <div className="search-container">
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="profile-section">
        <div className="profile-avatar">R</div>
      </div>

    </header>
  );
};

export default MusicHeader;