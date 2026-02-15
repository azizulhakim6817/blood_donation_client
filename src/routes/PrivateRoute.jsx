import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "./../components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user) {
    return <>{children}</>;
  }

  return (
    <Navigate
      to="/login"
      state={{ from: location }} 
      replace
    />
  );
};

export default PrivateRoute;
