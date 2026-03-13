import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "./Protected";
import Home from "../features/home/pages/Home";
import LikedSongs from "../features/home/pages/LikedSong";
import History from "../features/home/pages/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/liked",
    element: (
      <Protected>
        <LikedSongs />
      </Protected>
    ),
  },
  {
    path: "/history",
    element: (
      <Protected>
        <History />
      </Protected>
    ),
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);

export default router;
