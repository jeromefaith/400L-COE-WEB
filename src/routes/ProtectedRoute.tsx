import { Navigate } from "react-router";
import { useUserContext } from "../context/userContext";

interface ProtectedRouteProps {
  children: React.JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUserContext();
  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // Otherwise, show the protected page
  return children;
};

export default ProtectedRoute;
