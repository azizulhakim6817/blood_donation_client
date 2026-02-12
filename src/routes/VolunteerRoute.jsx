import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import Forbidden from './../components/forbidden/Forbidden';

const VolunteerRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (role !== "volunteer") {
    return <Forbidden></Forbidden>;
  }

   return <>{children}</>;
};

export default VolunteerRoute;
