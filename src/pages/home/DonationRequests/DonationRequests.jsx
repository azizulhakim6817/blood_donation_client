import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import logo from "../../../assets/logo.png";
import { FaEye } from "react-icons/fa";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch pending donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/get-pending/donation-request?status=pending",
      );
      return Array.isArray(res.data) ? res.data : [res.data]; // ensure array
    },
  });

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <h1 className="my-4 flex items-center justify-center gap-3 text-xl md:text-2xl font-bold text-primary">
        <span>
          <img className="h-6 w-6" src={logo} alt="logo" />
        </span>
        All Donation Requests
        <span className="badge badge-secondary text-white">
          {requests?.length || 0}
        </span>
      </h1>
      {/* table------------ */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className=" px-4 py-2">#</th>
            <th className=" px-4 py-2">Recipient Name</th>
            <th className=" px-4 py-2">Location</th>
            <th className=" px-4 py-2">Request Date</th>
            <th className=" px-4 py-2">Donation Date</th>
            <th className=" px-4 py-2">Blood Group</th>
            <th className=" px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={req._id} className="hover:bg-gray-50">
              {/* Serial */}
              <td className="text-center px-4 py-2 text-center">{index + 1}</td>

              {/* Recipient Name */}
              <td className="text-center px-4 py-2">{req.recipientName}</td>

              {/* Location */}
              <td className="text-center px-4 py-2">
                {req.recipientDistrict}, {req.recipientUpazila}
              </td>

              {/* Request Date */}
              <td className="text-center px-4 py-2">
                {new Date(req.createdAt).toLocaleDateString()}
              </td>

              {/* Donation Date */}
              <td className=" text-center px-4 py-2">{req.donationDate}</td>

              {/* Blood Group */}
              <td className=" text-center px-4 py-2">{req.bloodGroup}</td>

              {/* Actions */}
              <td className="px-4 py-2 text-center">
                <Link
                  to={`/blood-donation-reqests-details/${req._id}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded hover:bg-accent transition"
                >
                  <FaEye size={20} />
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {requests.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No pending donation requests found.
        </p>
      )}
    </div>
  );
};

export default DonationRequests;
