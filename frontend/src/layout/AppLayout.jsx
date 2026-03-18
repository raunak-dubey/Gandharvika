import { Outlet } from "react-router";
import Sidebar from "@/layout/components/Sidebar";
import MusicPlayer from "@/layout/components/MusicPlayer";
import '@/layout/styles/appLayout.scss';

const AppLayout = () => {

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