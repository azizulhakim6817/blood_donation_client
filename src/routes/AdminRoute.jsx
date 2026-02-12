import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "./../components/forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (role !== "admin" && role !== "volunteer") {
    return <Forbidden />;
  }

  return <>{children}</>;
};

export default AdminRoute;
