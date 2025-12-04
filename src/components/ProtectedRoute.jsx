import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wrap a route element with <ProtectedRoute> to require authentication.
 * Optionally pass requiredRole="admin" to restrict to admins.
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Not logged in -> go to login, remember where they were trying to go.
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (requiredRole && role !== requiredRole) {
    // Logged in but not allowed -> send them home with a message.
    return (
      <Navigate
        to="/"
        replace
        state={{ message: "Access denied – admin only." }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;


