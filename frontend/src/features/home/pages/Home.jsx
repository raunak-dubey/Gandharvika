import Sidebar from "../components/Sidebar";
import MusicHeader from "../components/music/MusicHeader";
import MusicGrid from "../components/music/MusicGrid";
import MusicPlayer from "../components/music/MusicPlayer";
import FaceExpression from "../components/FaceExpression";

import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <Sidebar />

      <main className="home-main">
        <div className="home-container">

          <MusicHeader />

          <FaceExpression />

          <MusicGrid />

        </div>
      </main>

      <MusicPlayer />
    </div>
  );
};

export default Home;