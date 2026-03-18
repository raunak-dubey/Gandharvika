import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "./Protected";

import Home from "@/features/song/pages/Home";
import LikedSongs from "@/features/song/pages/LikedSong";
import History from "@/features/song/pages/History";
import Upload from "@/features/song/pages/Upload";
import AppLayout from "@/layout/AppLayout";
import Account from "@/features/user/pages/Account";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
        path: "/upload",
        element: (
          <Protected>
            <Upload />
          </Protected>
        ),
      },
      {
        path: "/account",
        element: (
          <Protected>
            <Account />
          </Protected>
        ),
      },
    ],
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