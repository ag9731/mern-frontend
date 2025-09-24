import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard2 = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <div>Dashboard Content</div>;
};

export default Dashboard2;
