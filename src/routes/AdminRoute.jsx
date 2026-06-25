import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  let user = null;

  // Check if userData exists AND isn't the literal string "undefined"
  if (userData && userData !== "undefined") {
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      // Optional: Clear out the corrupted item so it doesn't break again
      localStorage.removeItem("user"); 
    }
  }

  // 1. If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. If there is a token but the user isn't an admin, redirect to home
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 3. Authorized! Render protected admin children components
  return children;
};

export default AdminRoute;