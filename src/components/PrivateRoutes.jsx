import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
const PrivateRoute = ({ children, roles }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />; 
  }

  if (roles) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!roles.includes(payload.role)) {
        return <Navigate to="/" replace />; 
      }
    } catch (error) {
      console.error("Error al decodificar token:", error);
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
