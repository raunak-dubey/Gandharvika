import { RouterProvider } from "react-router";
import router from "./app.route";
import SongProvider from "@/features/home/context/song.provider";
import QueryProvider from "./providers/QueryProvider";

const App = () => {
  return (
    <QueryProvider>
      <SongProvider>
        <RouterProvider router={router} />
      </SongProvider>
    </QueryProvider>
  );
};

export default App;
