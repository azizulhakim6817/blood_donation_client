import useRole from "../../../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import DonorDashboard from "./DonorDashboard";
import Loading from "./../../../components/Loading/Loading";
import NotFund from "../../NotFund/NotFund";
import VolunteerDashboard from "./VolunteerDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "donor":
      return <DonorDashboard />;
    case "volunteer":
      return <VolunteerDashboard />;
    default:
      return <NotFund />;
  }
};

export default DashboardHome;
