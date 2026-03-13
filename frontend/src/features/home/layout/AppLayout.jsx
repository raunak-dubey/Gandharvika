import useSongInit from "../hooks/useSongInit";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import MusicPlayer from "../components/music/MusicPlayer";
import '../styles/appLayout.scss'

const AppLayout = () => {
  useSongInit();

  return (
    <div className="app-page">
      <Sidebar />

      <main className="app-main">
        <Outlet />
      </main>

      <MusicPlayer />
    </div>
  );
};

export default AppLayout;