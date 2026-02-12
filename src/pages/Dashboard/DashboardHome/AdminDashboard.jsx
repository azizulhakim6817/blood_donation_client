import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { RiAdminFill } from "react-icons/ri";
import Loading from "../../../components/Loading/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { FaHandHoldingHeart, FaTint, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dashboardStatus, setDashboardStatus] = useState(null);

  //! get user by email --------------------
  const {
    data: donorRequest = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-user?email=${user?.email}`);
      return res.data;
    },
  });

  //! get--donor-request-/dashboard/donor/count/stats------
  useEffect(() => {
    axiosSecure.get(`/dashboard/donor/count/stats`).then((res) => {
      setDashboardStatus(res.data);
    });
  }, [axiosSecure]);

  return (
    <div>
      <h1 className=" mt-3 flex gap-2 justify-center text-primary text-xl md:text-2xl font-bold text-center">
        Welcome,
        <span className="text-secondary">{donorRequest?.displayName}</span>!
        <span className="text-accent">
          <RiAdminFill />
        </span>
      </h1>

      {/* Dashboard-get--admin-all-views---------------- */}
      <div className="p-6">
        {/* funding cards--------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div className="card bg-base-200 shadow p-6 text-center">
            <FaUsers className="text-4xl mx-auto text-primary" />
            <h3 className="text-xl font-semibold mt-2">Admin</h3>
            <p className="text-3xl font-bold">{dashboardStatus?.totalAdmins}</p>
          </div>
          <div className="card bg-base-200 shadow p-6 text-center">
            <FaUsers className="text-4xl mx-auto text-primary" />
            <h3 className="text-xl font-semibold mt-2">Voluneers</h3>
            <p className="text-3xl font-bold">{dashboardStatus?.totalVolunteers}</p>
          </div>
          <div className="card bg-base-200 shadow p-6 text-center">
            <FaUsers className="text-4xl mx-auto text-primary" />
            <h3 className="text-xl font-semibold mt-2">Donors</h3>
            <p className="text-3xl font-bold">{dashboardStatus?.totalDonors}</p>
          </div>

          <div className="card bg-base-200 shadow p-6 text-center">
            <FaHandHoldingHeart className="text-4xl mx-auto text-success" />
            <h3 className="text-xl font-semibold mt-2">Funding</h3>
            <p className="text-3xl font-bold">
              ৳ {dashboardStatus?.totalFunding}
            </p>
          </div>

          <div className="card bg-base-200 shadow p-6 text-center">
            <FaTint className="text-4xl mx-auto text-error" />
            <h3 className="text-xl font-semibold mt-2">Donation Requests</h3>
            <p className="text-3xl font-bold">
              {dashboardStatus?.totalRequests}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
