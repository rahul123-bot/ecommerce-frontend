import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");

  if (user || token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;