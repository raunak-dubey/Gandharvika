import { RouterProvider } from "react-router";
import router from "./app.route";
import AuthProvider from "../features/auth/context/auth.provider";
import SongProvider from '../features/home/context/song.provider'

const App = () => {
  return (
    <AuthProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </AuthProvider>
  );
};

export default App;
