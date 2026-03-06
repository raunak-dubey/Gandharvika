import { useState, useMemo } from "react";
import AuthContext from "./auth.context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser,
      setLoading,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;