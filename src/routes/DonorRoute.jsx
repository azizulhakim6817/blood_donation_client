import Loading from "../components/Loading/Loading";
import Forbidden from "../components/forbidden/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DonorRoute = () => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (role !== "donor") {
    return <Forbidden></Forbidden>;
  }

  return <>{children}</>;
};

export default DonorRoute;
