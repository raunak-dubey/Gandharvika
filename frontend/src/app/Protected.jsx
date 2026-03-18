import { Navigate } from "react-router";
import useUser from "@/features/user/hooks/queries/useUser";

const Protected = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <h1>Loading...</h1>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default Protected;
