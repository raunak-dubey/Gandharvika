import useAuth from "@/features/auth/hooks/useAuth";
import "../../styles/music/header.scss";
import { useState } from "react";

const MusicHeader = () => {
  const [search, setSearch] = useState("");
  const { user } = useAuth();

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
        <img className="profile-avatar" src={user.avatar} alt="avatar" />
      </div>
    </header>
  );
};

export default MusicHeader;
