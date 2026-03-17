import MusicHeader from "../components/music/MusicHeader";
import MusicGrid from "../components/music/MusicGrid";
import FaceExpression from "../components/FaceExpression";

import "../styles/home.scss";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <MusicHeader />
        <FaceExpression />
        <MusicGrid />
      </div>
    </>
  );
};

export default Home;
