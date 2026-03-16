import { RouterProvider } from "react-router";
import router from "./app.route";
import QueryProvider from "./providers/QueryProvider";
import { useState } from "react";
import { useEffect } from "react";
import { initAuth } from "@/features/auth/utils/initAuth";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const start = async () => {
      await initAuth();
      setIsAuth(true);
    };
    start();
  }, []);

  if (!isAuth) {
    return <div>Loading...</div>;
  }

  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
};

export default App;
